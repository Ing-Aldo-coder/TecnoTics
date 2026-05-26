import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ShieldCheck, Loader2, Cpu, Sparkles, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SupportChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCartOpen } = useCart();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola! Bienvenido a TecnoTics. Soy tu asistente de soporte comercial en tiempo real.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 2,
      sender: 'bot',
      text: 'Mi núcleo inteligente está listo para darte respuestas inmediatas sobre existencias, precios y cupones de descuento. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickOptions = [
    { label: '🎟️ Ver cupones activos', value: 'cupones' },
    { label: '🖥️ Sugerir servidores', value: 'servidores' },
    { label: '🚚 ¿Cómo son los envíos?', value: 'envios' },
    { label: '📞 Hablar con asesor', value: 'asesor' }
  ];

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate database lookup latency (CRM-like)
    await new Promise(resolve => setTimeout(resolve, 1000));

    let botResponse = '';
    const cleanText = text.toLowerCase();

    if (cleanText.includes('cupon') || cleanText.includes('descuento') || cleanText.includes('promo') || cleanText === 'cupones') {
      botResponse = 'Tienes dos cupones listos para aplicar en tu compra:\n\n🎟️ **TECNOTICS10**: 10% de descuento en toda la tienda.\n\n🎟️ **PROINFRA**: 15% de descuento especial en compras de infraestructura y redes.\n\n¡Escríbelos directamente en tu Carrito de Compras para activarlos!';
    } else if (cleanText.includes('servidor') || cleanText.includes('rack') || cleanText === 'servidores') {
      botResponse = 'Recomiendo nuestro producto estrella: **Dell PowerEdge R760 Server** (SKU: `SRV-DELL760`). Equipado con Intel Xeon de 16 núcleos, fuentes redundantes y memoria DDR5 ECC. Contamos con disponibilidad y despacho inmediato. ¿Deseas que te guíe al catálogo?';
    } else if (cleanText.includes('envio') || cleanText.includes('entrega') || cleanText.includes('despacho') || cleanText === 'envios') {
      botResponse = '¡Realizamos envíos rápidos a todo el país!\n\n1. **Procesamiento**: Tu pedido se valida y confirma de manera inmediata.\n2. **Preparación**: Seleccionamos y embalamos tus productos con la máxima protección.\n3. **Despacho Express**: Enviamos tu paquete a través de nuestras paqueterías aliadas.\n4. **Entrega**: Recibe tu pedido en un plazo de 24 a 48 horas con garantía de satisfacción total.';
    } else if (cleanText.includes('asesor') || cleanText.includes('contacto') || cleanText.includes('soporte') || cleanText.includes('ayuda') || cleanText.includes('telefono')) {
      botResponse = 'He registrado tu solicitud para que un asesor comercial te contacte lo antes posible. También puedes enviarnos tus requerimientos desde la sección de **Contacto** o llamarnos directamente al **+52 55 4321-0987** (tiempo de respuesta menor a 2 horas).';
    } else if (cleanText.includes('rtx') || cleanText.includes('4090') || cleanText.includes('gpu') || cleanText.includes('nvidia')) {
      botResponse = 'La GPU **NVIDIA GeForce RTX 4090** (SKU: `NV-RTX4090`) cuenta con 24GB GDDR6X y arquitectura Ada Lovelace. Es una de nuestras existencias más solicitadas para estaciones de IA. ¡Agrégala al carrito antes de que se agote!';
    } else if (cleanText.includes('macbook') || cleanText.includes('laptop') || cleanText.includes('m3')) {
      botResponse = 'La **MacBook Pro M3 Max 16"** (SKU: `MBP-M3`) tiene 48GB de memoria unificada y SSD de 1TB. Ofrece la mayor autonomía (22 hrs) y es ideal para uso profesional exigente. La tenemos con despacho gratuito de inmediato.';
    } else if (cleanText.includes('carrito') || cleanText.includes('comprar') || cleanText.includes('pagar')) {
      botResponse = '¡Claro! Puedo abrir tu carrito lateral para que revises tus existencias seleccionadas de inmediato.';
      setCartOpen(true);
    } else {
      botResponse = 'Entendido. Te sugiero explorar nuestro Catálogo de Tecnología en tiempo real o escribirnos directamente en la sección de Contacto para cualquier consulta técnica o cotización personalizada.';
    }

    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: botResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] transition-all cursor-pointer relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border border-[#0a0f1d] animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border border-[#0a0f1d]"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="absolute bottom-18 right-0 w-[350px] sm:w-[380px] h-[500px] rounded-2xl border border-white/10 bg-[#0c1224]/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
          >
            
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary relative border border-primary/20">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#0c1224]"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    Soporte TecnoTics <Sparkles className="w-3 h-3 text-blue-400" />
                  </h4>
                  <span className="text-[10px] text-text-muted font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Asistente Comercial AI
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar bg-slate-950/20">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 text-[10px] font-bold">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                  )}
                  
                  <div 
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-line shadow-sm border ${
                      msg.sender === 'user' 
                      ? 'bg-primary text-white border-primary/30 rounded-br-none' 
                      : 'bg-slate-900/90 text-slate-100 border-white/5 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                    <span className={`block text-[8px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-text-muted'} font-mono`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 flex-shrink-0">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start items-end gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-slate-900/90 border border-white/5 rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center gap-1.5 text-xs text-text-muted">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                    <span>Consultando disponibilidad en tiempo real...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Panel */}
            <div className="p-3 border-t border-white/5 bg-slate-900/30">
              <div className="flex flex-wrap gap-1.5">
                {quickOptions.map((opt, oidx) => (
                  <button
                    key={oidx}
                    onClick={() => handleSend(opt.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-950/60 hover:bg-primary/20 text-slate-300 hover:text-white border border-white/5 hover:border-primary/20 text-[10px] font-bold transition-all cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputText);
              }}
              className="p-3.5 border-t border-white/5 bg-slate-900/50 flex gap-2"
            >
              <input
                type="text"
                placeholder="Escribe tu consulta de tecnología..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                disabled={isTyping}
                className="flex-1 px-4 py-2.5 bg-slate-950/80 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl focus:outline-none text-white text-xs transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SupportChatbot;
