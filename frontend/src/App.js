import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Lightbulb, Sparkles, Zap, Database } from 'lucide-react';

const Industria5ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! 👋 Soy **Revo5.0 Assistant**, tu experto en la Quinta Revolución Industrial potenciado con IA.\n\nPuedo ayudarte con información sobre:\n\n• Conceptos fundamentales de Industria 5.0\n• Diferencias entre Industria 4.0 y 5.0\n• Robots colaborativos (cobots)\n• Sostenibilidad y economía circular\n• Casos de uso y aplicaciones\n• Tecnologías clave (IA, IoT, gemelos digitales)\n\n¿Qué te gustaría saber?',
      method: 'system'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const messagesEndRef = useRef(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  const API_URL = 'http://localhost:8000';

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

  // Verificar estado del backend al cargar
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      if (response.ok) {
        const data = await response.json();
        setBackendStatus(data.llm_configured ? 'connected' : 'no-llm');
        console.log('✅ Backend conectado:', data);
      } else {
        setBackendStatus('error');
      }
    } catch (error) {
      console.error('❌ Backend no disponible:', error);
      setBackendStatus('offline');
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Añadir mensaje del usuario
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Llamar al backend
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversation_history: conversationHistory
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      
      // Añadir respuesta del asistente
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: data.response,
        sources: data.sources,
        method: data.method
      }]);

      // Actualizar historial de conversación
      setConversationHistory([
        ...conversationHistory,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: data.response }
      ]);

      setIsLoading(false);

    } catch (error) {
      console.error('Error al comunicarse con el backend:', error);
      
      // Mensaje de error amigable
      setMessages([...newMessages, {
        role: 'assistant',
        content: '❌ Lo siento, no pude conectarme con el servidor. Por favor verifica que el backend esté corriendo en http://localhost:8000\n\nPara iniciar el backend:\n```\ncd backend\npython main.py\n```',
        method: 'error'
      }]);
      
      setIsLoading(false);
      setBackendStatus('offline');
    }
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

  const getStatusBadge = () => {
    switch (backendStatus) {
      case 'connected':
        return (
          <div className="flex items-center gap-2 bg-green-500/20 text-green-700 px-3 py-1 rounded-full text-xs">
            <Zap className="w-3 h-3" />
            <span>IA Activa (Gemini)</span>
          </div>
        );
      case 'no-llm':
        return (
          <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-700 px-3 py-1 rounded-full text-xs">
            <Database className="w-3 h-3" />
            <span>Modo RAG</span>
          </div>
        );
      case 'offline':
        return (
          <div className="flex items-center gap-2 bg-red-500/20 text-red-700 px-3 py-1 rounded-full text-xs">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span>Backend Offline</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 bg-gray-500/20 text-gray-700 px-3 py-1 rounded-full text-xs">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Verificando...</span>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Revo5.0 Assistant</h1>
                <p className="text-indigo-100 text-sm">Tu experto en la Quinta Revolución Industrial</p>
              </div>
            </div>
            {getStatusBadge()}
          </div>
          <div className="flex gap-2 text-xs mt-3">
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">🤖 Cobots</span>
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">🌱 Sostenible</span>
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">🚀 RAG + LLM</span>
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
              
              <div className="flex flex-col gap-2 max-w-2xl">
                <div
                  className={`rounded-2xl px-4 py-3 shadow-md ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed"
                       dangerouslySetInnerHTML={{
                         __html: message.content
                           .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                           .replace(/```(.*?)```/gs, '<code class="bg-gray-100 px-2 py-1 rounded text-xs">$1</code>')
                           .replace(/• /g, '• ')
                           .replace(/\n/g, '<br/>')
                       }}
                  />
                </div>

                {/* Mostrar método usado y fuentes */}
                {message.role === 'assistant' && message.method && message.method !== 'system' && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 px-2">
                    {message.method === 'llm' && (
                      <>
                        <Zap className="w-3 h-3 text-green-600" />
                        <span>Generado con IA</span>
                      </>
                    )}
                    {message.method === 'fallback' && (
                      <>
                        <Database className="w-3 h-3 text-blue-600" />
                        <span>Base de conocimiento</span>
                      </>
                    )}
                    {message.sources && message.sources.length > 0 && (
                      <span className="ml-2">• {message.sources.length} fuentes consultadas</span>
                    )}
                  </div>
                )}
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
                  <span className="text-sm text-gray-600">
                    {backendStatus === 'connected' ? 'Consultando IA...' : 'Buscando en base de conocimiento...'}
                  </span>
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

      {/* Backend Offline Warning */}
      {backendStatus === 'offline' && (
        <div className="max-w-4xl w-full mx-auto px-4 pb-3">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
            <strong>⚠️ Backend desconectado</strong>
            <p className="mt-1">El servidor backend no está respondiendo. Asegúrate de ejecutar:</p>
            <code className="block mt-2 bg-red-100 p-2 rounded">cd backend && python main.py</code>
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
            Andrés Felipe Galvez - Cristian Camilo González - UN 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Industria5ChatBot;