"""
Backend FastAPI para ChatBot Industria 5.0
Integra Google Gemini (GRATIS) + ChromaDB para RAG
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
import chromadb
from chromadb.utils import embedding_functions
import os
from dotenv import load_dotenv
from knowledge_base import get_all_documents, get_all_content_text

# Cargar variables de entorno
load_dotenv()

# Inicializar FastAPI
app = FastAPI(title="Industria 5.0 ChatBot API")

# Configurar CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        # Si usas Vite podrías agregar: "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar Gemini
try:
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    gemini_model = genai.GenerativeModel("gemini-1.5-flash")
    print("✅ Gemini API configurada correctamente")
except Exception as e:
    print(f"⚠️ Warning: Gemini API no configurada. Error: {e}")
    gemini_model = None

# Inicializar ChromaDB (base de datos vectorial)
chroma_client = chromadb.Client()
sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="paraphrase-multilingual-MiniLM-L12-v2"  # Modelo que soporta español
)

# Crear o obtener colección
collection = chroma_client.get_or_create_collection(
    name="industria5_knowledge",
    embedding_function=sentence_transformer_ef,
)

# Modelos Pydantic para request/response
class ChatMessage(BaseModel):
    message: str
    conversation_history: Optional[List[dict]] = []


class ChatResponse(BaseModel):
    response: str
    sources: List[dict] = []
    method: str  # "llm" o "fallback"


# Variable global para el contexto base
KNOWLEDGE_CONTEXT = ""


def initialize_knowledge_base():
    """Inicializa la base de conocimiento en ChromaDB"""
    global KNOWLEDGE_CONTEXT

    documents = get_all_documents()

    # Si la colección ya tiene documentos, no reinsertar
    if collection.count() > 0:
        print(f"✅ Base de conocimiento ya inicializada con {collection.count()} documentos")
        KNOWLEDGE_CONTEXT = get_all_content_text()
        return

    print("📚 Inicializando base de conocimiento en ChromaDB...")

    # Preparar datos para ChromaDB
    ids = [doc["id"] for doc in documents]
    contents = [doc["content"] for doc in documents]
    metadatas = [
        {
            "title": doc["title"],
            "category": doc["metadata"]["category"],
            "keywords": ", ".join(doc["metadata"]["keywords"]),
        }
        for doc in documents
    ]

    # Agregar documentos a ChromaDB
    collection.add(
        ids=ids,
        documents=contents,
        metadatas=metadatas,
    )

    KNOWLEDGE_CONTEXT = get_all_content_text()
    print(f"✅ Base de conocimiento inicializada con {len(documents)} documentos")


def search_relevant_knowledge(query: str, n_results: int = 3):
    """Busca documentos relevantes usando búsqueda semántica"""
    try:
        results = collection.query(
            query_texts=[query],
            n_results=n_results,
        )

        relevant_docs = []
        if results.get("documents") and len(results["documents"]) > 0:
            for i, doc in enumerate(results["documents"][0]):
                distance = None
                if "distances" in results and results["distances"] and len(results["distances"]) > 0:
                    distance = results["distances"][0][i]

                relevant_docs.append(
                    {
                        "content": doc,
                        "metadata": results["metadatas"][0][i],
                        "distance": distance,
                    }
                )

        return relevant_docs
    except Exception as e:
        print(f"❌ Error en búsqueda: {e}")
        return []


def generate_response_with_gemini(
    user_message: str, relevant_context: str, conversation_history: List[dict] = []
):
    """Genera respuesta usando Gemini API con contexto relevante"""

    if not gemini_model:
        raise Exception("Gemini API no está configurada")

    # Prompt / system_instruction más flexible
    system_instruction = f"""Eres Revo5.0 Assistant, un asistente experto en la Quinta Revolución Industrial (**Industria 5.0**) y temas relacionados.

TU ROL:
- Explicar de forma clara y amigable conceptos de **Industria 5.0**, cobots, IA, IoT, gemelos digitales, sostenibilidad industrial y casos de uso.
- Ayudar a estudiantes y profesionales a entender y aplicar estos conceptos en contextos reales.

CONOCIMIENTO BASE (DOCUMENTOS):
{relevant_context}

CÓMO USAR EL CONOCIMIENTO:
- Prioriza siempre la información de los documentos anteriores.
- Si la pregunta no queda completamente resuelta con esos documentos, puedes complementar con tu conocimiento general sobre Industria 5.0 y tecnologías relacionadas.
- Si usas información que no está explícitamente en los documentos, acláralo brevemente al usuario (por ejemplo: "Esto no está directamente en los documentos, pero en general...").

ALCANCE DEL TEMA:
- Estás especializado en Industria 5.0 y su contexto (Industria 4.0, automatización, IA, sostenibilidad, trabajo humano, etc.).
- Si la pregunta es de otro tema, puedes responderla de forma breve solo si tienes una respuesta clara,
  y luego intenta conectar el tema con Industria 5.0 cuando tenga sentido.
- Si no ves relación y no tienes una respuesta útil, dilo con honestidad y sugiere volver al tema de Industria 5.0.

ESTILO DE RESPUESTA:
- Responde siempre en **español**.
- Usa un tono profesional pero cercano y fácil de entender.
- Usa **negrita** para resaltar conceptos clave.
- Organiza la respuesta con listas y subtítulos cuando sea útil.
- Da ejemplos concretos y aplicados al contexto industrial siempre que sea posible.
- Evita respuestas excesivamente cortas cuando el tema lo merece: sé claro, pero no telegráfico.

MANEJO DE INCERTIDUMBRE:
- Si la información es limitada o aproximada, dilo explícitamente.
- No inventes datos numéricos precisos (fechas, porcentajes, cifras) si no estás seguro.
- Si de verdad no tienes información suficiente, admítelo, pero intenta orientar al usuario con lo que sí se sabe de forma general."""

    # Construir el historial de conversación
    conversation_text = ""
    for msg in conversation_history[-4:]:  # Últimos 4 mensajes
        role = "Usuario" if msg.get("role") == "user" else "Asistente"
        conversation_text += f"{role}: {msg.get('content', '')}\n\n"

    # Construir prompt final
    full_prompt = f"""{system_instruction}

HISTORIAL DE CONVERSACIÓN:
{conversation_text}

PREGUNTA ACTUAL DEL USUARIO:
{user_message}

RESPUESTA (usa el conocimiento base proporcionado arriba y sé claro y pedagógico):"""

    try:
        # Llamar a Gemini API (usamos dict en generation_config para evitar problemas de versión)
        response = gemini_model.generate_content(
            full_prompt,
            generation_config={
                "temperature": 0.7,
                "max_output_tokens": 2000,
            },
        )

        return response.text

    except Exception as e:
        print(f"❌ Error llamando a Gemini API: {e}")
        raise


def generate_fallback_response(user_message: str, relevant_docs: List[dict]):
    """Genera respuesta de respaldo usando solo búsqueda semántica (sin LLM)"""

    if not relevant_docs or len(relevant_docs) == 0:
        return (
            "Por el momento no puedo usar el modelo de lenguaje, "
            "y no he encontrado documentos relevantes para tu pregunta.\n\n"
            "Puedo ayudarte con información general sobre:\n\n"
            "• **Conceptos fundamentales** de la Industria 5.0\n"
            "• **Cobots y robótica colaborativa**\n"
            "• **Diferencias** entre Industria 4.0 y 5.0\n"
            "• **Tecnologías clave** (IA, IoT, gemelos digitales)\n"
            "• **Sostenibilidad** y economía circular\n"
            "• **Casos de uso** en sectores como automotriz, logística, salud, etc.\n\n"
            "Si quieres, dime sobre cuál de estos temas te gustaría saber más."
        )

    # Tomar el documento más relevante
    most_relevant = relevant_docs[0]

    response = (
        "Por ahora no puedo generar una respuesta elaborada con el modelo de lenguaje, "
        f"pero encontré este fragmento del documento **{most_relevant['metadata']['title']}** "
        "que puede ayudarte:\n\n"
    )
    response += most_relevant["content"][:800]  # Limitar longitud

    if len(most_relevant["content"]) > 800:
        response += "\n\n¿Te gustaría que te indique en qué parte del documento puedes leer más?"

    return response


@app.on_event("startup")
async def startup_event():
    """Se ejecuta al iniciar el servidor"""
    initialize_knowledge_base()
    print("🚀 Servidor iniciado correctamente")
    print(f"🤖 Gemini configurado: {gemini_model is not None}")


@app.get("/")
async def root():
    """Endpoint raíz para verificar que el API está funcionando"""
    return {
        "message": "Industria 5.0 ChatBot API",
        "status": "online",
        "version": "1.0.0",
        "llm": "Google Gemini 1.5 Flash",
        "llm_available": gemini_model is not None,
    }


@app.get("/health")
async def health_check():
    """Endpoint de health check"""
    return {
        "status": "healthy",
        "documents_loaded": collection.count(),
        "llm_configured": gemini_model is not None,
        "llm_provider": "Google Gemini",
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatMessage):
    """
    Endpoint principal del chat
    Recibe un mensaje y retorna una respuesta usando RAG + LLM
    """
    try:
        user_message = request.message.strip()

        if not user_message:
            raise HTTPException(status_code=400, detail="El mensaje no puede estar vacío")

        # 1. Buscar documentos relevantes (RAG)
        print(f"🔍 Buscando conocimiento relevante para: '{user_message}'")
        relevant_docs = search_relevant_knowledge(user_message, n_results=3)

        # 2. Construir contexto relevante
        if relevant_docs:
            relevant_context = "\n\n---\n\n".join(
                [
                    f"# {doc['metadata']['title']}\n\n{doc['content']}"
                    for doc in relevant_docs
                ]
            )
        else:
            print(
                "ℹ️ No se encontraron documentos muy relevantes, usando KNOWLEDGE_CONTEXT completo"
            )
            relevant_context = KNOWLEDGE_CONTEXT

        # 3. Intentar generar respuesta con LLM
        response_text = ""
        method_used = "fallback"

        if gemini_model:
            try:
                print("🤖 Generando respuesta con Gemini API...")
                response_text = generate_response_with_gemini(
                    user_message, relevant_context, request.conversation_history
                )
                method_used = "llm"
                print("✅ Respuesta generada con Gemini")
            except Exception as e:
                print(f"⚠️ Error con Gemini, usando fallback: {e}")
                response_text = generate_fallback_response(user_message, relevant_docs)
                method_used = "fallback"
        else:
            print("⚠️ Gemini API no disponible, usando fallback")
            response_text = generate_fallback_response(user_message, relevant_docs)

        # 4. Preparar fuentes
        sources = []
        for doc in relevant_docs[:3]:
            distance = doc.get("distance")
            relevance = 1.0
            if distance is not None:
                try:
                    relevance = 1.0 - float(distance)
                except Exception:
                    relevance = 1.0

            sources.append(
                {
                    "title": doc["metadata"]["title"],
                    "category": doc["metadata"]["category"],
                    "relevance": relevance,
                }
            )

        return ChatResponse(
            response=response_text,
            sources=sources,
            method=method_used,
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error en /chat: {e}")
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


@app.get("/search")
async def search_knowledge(query: str, limit: int = 5):
    """Endpoint para buscar en la base de conocimiento"""
    results = search_relevant_knowledge(query, n_results=limit)
    return {
        "query": query,
        "results": results,
    }


@app.post("/test-gemini")
async def test_gemini():
    """Endpoint para probar que Gemini funciona correctamente"""
    if not gemini_model:
        return {"status": "error", "message": "Gemini no está configurado"}

    try:
        response = gemini_model.generate_content(
            "Di 'Hola, estoy funcionando correctamente'",
            generation_config={
                "temperature": 0.4,
                "max_output_tokens": 64,
            },
        )
        return {
            "status": "success",
            "message": "Gemini funciona correctamente",
            "response": response.text,
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error al probar Gemini: {str(e)}",
        }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
