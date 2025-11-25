import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, BookOpen, Lightbulb, AlertCircle, Sparkles } from 'lucide-react';

const Industria5ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! 👋 Soy **Revo5.0 Assistant**, tu experto en la Quinta Revolución Industrial. Puedo ayudarte con información sobre:\n\n• Conceptos fundamentales de Industria 5.0\n• Diferencias entre Industria 4.0 y 5.0\n• Robots colaborativos (cobots)\n• Sostenibilidad y economía circular\n• Casos de uso y aplicaciones\n• Tecnologías clave (IA, IoT, gemelos digitales)\n\n¿Qué te gustaría saber?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  // Base de conocimiento sobre Industria 5.0
  const knowledgeBase = {
    definicion: {
      keywords: ['qué es', 'definición', 'concepto', 'significa', 'industria 5.0', 'quinta revolución'],
      content: `La Industria 5.0, conocida como la Quinta Revolución Industrial, es un modelo de desarrollo industrial que combina tecnologías avanzadas con un enfoque centrado en las personas. A diferencia de la Industria 4.0 que priorizaba la automatización y eficiencia, la Industria 5.0 incorpora valores humanos, sociales y medioambientales en el núcleo de la innovación tecnológica.

**Características principales:**
• **Colaboración humano-máquina:** Fusiona las capacidades de computación cognitiva con el ingenio humano
• **Producción personalizada:** Adaptación de productos a necesidades individuales
• **Sostenibilidad:** Procesos más eficientes energéticamente y economía circular
• **Resiliencia:** Mayor capacidad de adaptación ante cambios y crisis
• **Empoderamiento humano:** Los trabajadores realizan tareas más creativas y estratégicas`
    },
    cobots: {
      keywords: ['cobot', 'robot colaborativo', 'robots', 'robótica', 'automatización'],
      content: `Los **cobots** (robots colaborativos) son robots diseñados específicamente para trabajar junto a los seres humanos de manera segura, sin necesidad de barreras de protección.

**Características de los cobots:**
• **Seguridad:** Incorporan sensores y sistemas de parada automática para prevenir colisiones
• **Flexibilidad:** Fáciles de programar y pueden adaptarse rápidamente a diferentes tareas
• **Versatilidad:** Pueden realizar desde tareas repetitivas hasta manipulación de objetos pesados
• **Precisión:** Ejecutan tareas con exactitud constante

**Aplicaciones principales:**
• Industria automotriz: soldadura, ensamblaje, pintura
• Logística: paletizado y despaletizado de cajas
• Alimentación: manipulación de productos delicados
• Manufactura: control de calidad con visión robótica
• Salud: asistencia en transporte de pacientes

**Beneficios:**
• Aumentan la productividad al complementar capacidades humanas
• Reducen riesgos laborales y fatiga física
• Permiten personalización a gran escala
• Liberan a trabajadores para tareas creativas e innovadoras`
    },
    diferencias: {
      keywords: ['diferencia', 'comparación', '4.0', 'industria 4.0', 'vs', 'versus'],
      content: `**Industria 4.0 vs Industria 5.0:**

**INDUSTRIA 4.0:**
• **Enfoque:** Automatización total y digitalización
• **Objetivo principal:** Eficiencia y productividad
• **Tecnologías:** IoT, Big Data, Cloud Computing, robótica autónoma
• **Producción:** Masiva y estandarizada
• **Factor humano:** Los robots reemplazan tareas humanas repetitivas

**INDUSTRIA 5.0:**
• **Enfoque:** Colaboración humano-máquina
• **Objetivo principal:** Bienestar humano, sostenibilidad y resiliencia
• **Tecnologías:** IA, cobots, gemelos digitales, realidad aumentada + tecnologías 4.0
• **Producción:** Personalizada y flexible
• **Factor humano:** Los humanos están en el centro, potenciados por la tecnología

**Pilares de la Industria 5.0:**
1. **Centrada en el ser humano:** La tecnología sirve a las personas, no al revés
2. **Sostenible:** Economía circular y respeto al medio ambiente
3. **Resiliente:** Capacidad de adaptación ante crisis y cambios`
    },
    tecnologias: {
      keywords: ['tecnología', 'herramienta', 'ia', 'inteligencia artificial', 'iot', 'gemelo digital'],
      content: `**Tecnologías clave en la Industria 5.0:**

**1. Inteligencia Artificial (IA):**
• Permite que cobots aprendan y se adapten
• Optimiza procesos en tiempo real
• Mejora la toma de decisiones
• Análisis predictivo de mantenimiento

**2. Internet de las Cosas (IoT):**
• Interconexión de dispositivos y sistemas
• Monitoreo en tiempo real de toda la cadena de producción
• Recopilación de datos para análisis
• Comunicación máquina a máquina

**3. Gemelos Digitales:**
• Réplicas virtuales de procesos o productos físicos
• Simulación y optimización antes de implementación real
• Pruebas sin riesgos
• Mantenimiento predictivo

**4. Realidad Aumentada y Virtual:**
• Formación de trabajadores sin riesgos
• Diseño y prototipado
• Mantenimiento guiado
• Soporte técnico remoto

**5. Big Data y Analytics:**
• Procesamiento de grandes volúmenes de información
• Identificación de patrones y tendencias
• Optimización de recursos
• Personalización de productos

**6. Computación en la Nube:**
• Almacenamiento y procesamiento distribuido
• Acceso remoto a sistemas
• Escalabilidad
• Colaboración global`
    },
    sostenibilidad: {
      keywords: ['sostenible', 'sostenibilidad', 'medio ambiente', 'ecológico', 'circular', 'verde'],
      content: `**Sostenibilidad en la Industria 5.0:**

La Quinta Revolución Industrial coloca la sostenibilidad como eje transversal de todas sus operaciones.

**Economía Circular:**
• Reducción de residuos y desperdicios
• Reutilización y reciclaje de materiales
• Diseño de productos para durabilidad
• Optimización del ciclo de vida completo

**Eficiencia Energética:**
• Los cobots consumen menos energía que robots tradicionales
• Optimización de procesos para reducir consumo
• Integración de energías renovables
• Monitoreo inteligente del uso energético

**Reducción de huella ambiental:**
• Procesos más precisos generan menos desperdicio
• Producción bajo demanda reduce sobreproducción
• Logística optimizada con menos transportes
• Materiales más sostenibles

**Impacto social:**
• Mejores condiciones laborales
• Trabajo más seguro y menos peligroso
• Desarrollo de habilidades humanas
• Balance entre desarrollo económico y bienestar social`
    },
    beneficios: {
      keywords: ['beneficio', 'ventaja', 'mejora', 'por qué', 'importancia'],
      content: `**Beneficios de la Industria 5.0:**

**Para las empresas:**
• Mayor flexibilidad y adaptabilidad
• Personalización de productos sin perder eficiencia
• Reducción de costes operativos
• Mejor capacidad de respuesta ante cambios del mercado
• Resiliencia ante crisis
• Imagen corporativa más responsable

**Para los trabajadores:**
• Empoderamiento y desarrollo profesional
• Tareas más creativas y estratégicas
• Menor riesgo de accidentes laborales
• Reducción de fatiga física
• Mejores condiciones de trabajo
• Mayor satisfacción laboral

**Para la sociedad:**
• Producción más sostenible
• Menor impacto ambiental
• Productos más personalizados
• Mayor bienestar general
• Equilibrio entre tecnología y humanidad
• Creación de nuevos empleos cualificados

**Económicos:**
• Aumento de productividad
• Mayor calidad en productos
• Reducción de desperdicios
• Optimización de recursos
• Retorno de inversión más rápido con cobots asequibles`
    },
    casos: {
      keywords: ['caso', 'ejemplo', 'aplicación', 'uso', 'implementación'],
      content: `**Casos de Uso de la Industria 5.0:**

**1. Sector Automotriz:**
• Cobots asisten en ensamblaje de vehículos personalizados
• Soldadura colaborativa en líneas de producción
• Inspección de calidad con visión robótica
• Ejemplo: BMW utiliza cobots para personalización de interiores

**2. Manufactura de Moda:**
• Diseñadores trabajan con cobots para producción personalizada
• Corte y cosido de prendas únicas
• Entrega mismo día de ropa de diseñador
• Reducción de desperdicio textil

**3. Industria Alimentaria:**
• Manipulación de productos delicados con precisión
• Garantía de higiene en procesos
• Empaquetado personalizado
• Trazabilidad completa del producto

**4. Sector Salud:**
• Asistencia en cirugías de precisión
• Fabricación de prótesis personalizadas
• Transporte de pacientes y materiales
• Dispensación automatizada de medicamentos

**5. Logística:**
• Paletizado inteligente optimizado
• Gestión de almacenes con robots móviles
• Reducción de esfuerzos físicos
• Cadenas de suministro resilientes

**6. Electrónica:**
• Ensamblaje de componentes miniaturizados
• Control de calidad microscópico
• Producción flexible de dispositivos personalizados`
    },
    futuro: {
      keywords: ['futuro', 'tendencia', 'evolución', 'próximo', 'vendrá'],
      content: `**El Futuro con la Industria 5.0:**

**Sociedad 5.0:**
Concepto japonés que busca equilibrar el desarrollo económico con la solución de problemas sociales y ambientales mediante la tecnología.

**Transformaciones esperadas:**
• Mayor integración de IA cognitiva
• Cobots más inteligentes y adaptables
• Producción 100% personalizable
• Fábricas completamente resilientes
• Trabajo remoto en manufactura via realidad virtual
• Economía circular como estándar

**Nuevos empleos:**
• Diseñadores de interacción humano-robot
• Especialistas en sostenibilidad industrial
• Analistas de experiencia de fabricación
• Ingenieros de personalización
• Gestores de resiliencia operacional

**Desafíos:**
• Formación continua de la fuerza laboral
• Inversión en nuevas tecnologías
• Cambio cultural organizacional
• Regulaciones y estándares éticos
• Brecha digital y acceso equitativo

**Visión:**
Un mundo donde la tecnología potencia las capacidades humanas, la producción respeta el planeta, y la industria sirve al bienestar de la humanidad. La Industria 5.0 no es solo el futuro - está sucediendo ahora.`
    }
  };

  const suggestedQuestions = [
    "¿Qué es la Industria 5.0?",
    "¿Cuáles son los beneficios de los cobots?",
    "Diferencias entre Industria 4.0 y 5.0",
    "¿Cómo es la sostenibilidad en Industria 5.0?",
    "Casos de uso reales",
    "Tecnologías clave"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelevantKnowledge = (query) => {
    const lowerQuery = query.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    // Buscar en la base de conocimiento
    Object.entries(knowledgeBase).forEach(([key, section]) => {
      const keywordMatches = section.keywords.filter(keyword => 
        lowerQuery.includes(keyword.toLowerCase())
      ).length;

      if (keywordMatches > highestScore) {
        highestScore = keywordMatches;
        bestMatch = section.content;
      }
    });

    return bestMatch;
  };

  const generateResponse = async (userMessage) => {
    // Buscar conocimiento relevante
    const relevantKnowledge = findRelevantKnowledge(userMessage);

    if (relevantKnowledge) {
      return relevantKnowledge;
    }

    // Respuestas contextuales basadas en patrones
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('saludos')) {
      return '¡Hola! 👋 Estoy aquí para ayudarte con todo lo relacionado a la Industria 5.0. ¿Qué aspecto te gustaría explorar?';
    }

    if (lowerMessage.includes('gracias') || lowerMessage.includes('thank')) {
      return '¡De nada! 😊 Si tienes más preguntas sobre la Quinta Revolución Industrial, estoy aquí para ayudarte.';
    }

    if (lowerMessage.includes('ayuda') || lowerMessage.includes('help') || lowerMessage.includes('puedes')) {
      return `Puedo ayudarte con información sobre:

📚 **Conceptos:** Definiciones y fundamentos de Industria 5.0
🤖 **Cobots:** Robots colaborativos y su papel
⚖️ **Comparaciones:** Diferencias con Industria 4.0
🔧 **Tecnologías:** IA, IoT, gemelos digitales, etc.
🌱 **Sostenibilidad:** Economía circular y medio ambiente
💼 **Aplicaciones:** Casos de uso en diferentes sectores
🔮 **Futuro:** Tendencias y Sociedad 5.0

¿Sobre qué tema te gustaría saber más?`;
    }

    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('inversión')) {
      return `**Costos de implementación en Industria 5.0:**

🤖 **Cobots tradicionales:** €25,000 - €40,000
🤖 **Cobots económicos (plástico alto rendimiento):** ~€5,000 - €8,000

📊 **ROI (Retorno de Inversión):**
• Cobots económicos: 3-6 meses
• Cobots tradicionales: 12-24 meses

💡 Los cobots son mucho más asequibles que robots industriales tradicionales (€100,000+), lo que los hace accesibles para PYMEs.

**Factores que afectan el costo:**
• Grados de libertad (4 vs 6 ejes)
• Capacidad de carga
• Software y programación
• Accesorios específicos (pinzas, visión, etc.)
• Integración con sistemas existentes`;
    }

    // Respuesta por defecto inteligente
    return `Entiendo tu pregunta sobre "${userMessage}". 

Aunque no tengo información específica sobre ese aspecto particular, puedo ayudarte con:

• **Conceptos fundamentales** de la Industria 5.0
• **Cobots y robótica colaborativa**
• **Diferencias** entre revoluciones industriales
• **Tecnologías clave** (IA, IoT, etc.)
• **Sostenibilidad** y economía circular
• **Casos de uso** prácticos

¿Te gustaría que profundice en alguno de estos temas? También puedes hacer clic en una de las preguntas sugeridas abajo. 👇`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Añadir mensaje del usuario
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    // Simular delay de procesamiento
    setTimeout(async () => {
      const response = await generateResponse(userMessage);
      
      setMessages([...newMessages, { role: 'assistant', content: response }]);
      setIsLoading(false);
      
      // Actualizar historial
      setConversationHistory([...conversationHistory, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: response }
      ]);
    }, 800);
  };

  const handleSuggestionClick = (question) => {
    setInput(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Revo5.0 Assistant</h1>
              <p className="text-indigo-100 text-sm">Tu experto en la Quinta Revolución Industrial</p>
            </div>
          </div>
          <div className="flex gap-2 text-xs mt-3">
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">🤖 Cobots</span>
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">🌱 Sostenible</span>
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">🚀 Innovación</span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl w-full mx-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div
                className={`rounded-2xl px-4 py-3 max-w-2xl shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed"
                     dangerouslySetInnerHTML={{
                       __html: message.content
                         .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                         .replace(/• /g, '• ')
                         .replace(/\n/g, '<br/>')
                     }}
                />
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-200">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  <span className="text-sm text-gray-600">Pensando...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="max-w-4xl w-full mx-auto px-4 pb-3">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-gray-700">Preguntas sugeridas:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="text-left text-xs bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 px-3 py-2 rounded-lg transition-all border border-indigo-200 hover:border-indigo-300 hover:shadow"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t bg-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pregunta sobre Industria 5.0, cobots, sostenibilidad..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            💡 Presiona Enter para enviar • Información basada en fuentes académicas y técnicas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Industria5ChatBot;