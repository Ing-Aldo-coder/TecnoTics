import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, ShoppingBag, CreditCard, Terminal, Cpu, ArrowRight, Tag, HelpCircle, AlertCircle, RefreshCw, Truck, ClipboardList, MapPin } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { 
    cart, 
    subtotal,
    discountAmount,
    discountPercent,
    couponCode,
    total, 
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Coupon input
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Terminal logs simulation
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);

  // Order history
  const [pastOrders, setPastOrders] = useState([]);
  const [tickerTime, setTickerTime] = useState(Date.now());

  // Update order history ticker every few seconds to show live progress
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('tecnotics_orders') || '[]');
    setPastOrders(existing);

    const interval = setInterval(() => {
      setTickerTime(Date.now());
    }, 4000);
    return () => clearInterval(interval);
  }, [success]);

  const handleApplyCouponCheckout = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const result = applyCoupon(couponInput);
    if (result.success) {
      setCouponSuccess(result.message);
      setCouponError('');
      setCouponInput('');
      setTimeout(() => setCouponSuccess(''), 3000);
    } else {
      setCouponError(result.message);
      setCouponSuccess('');
      setTimeout(() => setCouponError(''), 3000);
    }
  };

  const getOrderStatus = (orderTimestamp) => {
    const elapsedSeconds = (tickerTime - orderTimestamp) / 1000;
    if (elapsedSeconds < 10) return { stage: 1, label: 'Pedido Confirmado', desc: 'Tu pago ha sido procesado de manera segura.', color: 'text-blue-400', progress: 25 };
    if (elapsedSeconds < 25) return { stage: 2, label: 'Empacado y Verificado', desc: 'Verificación de almacén e inventario completada con éxito.', color: 'text-amber-400', progress: 50 };
    if (elapsedSeconds < 50) return { stage: 3, label: 'En Ruta de Entrega', desc: 'Tu paquete ha sido despachado con guía de envío express.', color: 'text-indigo-400', progress: 75 };
    return { stage: 4, label: 'Entregado en Destino', desc: 'Tu pedido ha sido recibido y la firma de entrega fue confirmada.', color: 'text-emerald-400', progress: 100 };
  };

  const getCheckoutStepStatus = () => {
    let currentStep = 1;
    let statusText = 'Iniciando procesamiento de compra segura...';

    if (visibleLogs.length > 0) {
      const lastLog = visibleLogs[visibleLogs.length - 1];
      if (lastLog.includes('Browser') || lastLog.includes('Iniciando')) {
        currentStep = 1;
        statusText = 'Verificando información de pago de forma segura...';
      } else if (lastLog.includes('Gateway') || lastLog.includes('API')) {
        currentStep = 1;
        statusText = 'Conexión SSL Segura: Autorizando transacción bancaria...';
      } else if (lastLog.includes('SCM')) {
        currentStep = 2;
        statusText = 'Almacén Central: Reservando tus artículos en el inventario...';
      } else if (lastLog.includes('ERP')) {
        currentStep = 3;
        statusText = 'Facturación: Generando tu comprobante de compra digital...';
      } else if (lastLog.includes('CRM') || lastLog.includes('Cliente')) {
        currentStep = 4;
        statusText = 'Registro de Compra: Confirmando tu perfil de cliente...';
      } else if (lastLog.includes('Broker') || lastLog.includes('RabbitMQ')) {
        currentStep = 5;
        statusText = 'Centro Logístico: Preparando tu paquete para envío prioritario...';
      } else {
        statusText = lastLog.replace(/\[.*?\]\s*➔?\s*/g, '');
      }
    }

    return { currentStep, statusText };
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsSubmitting(true);
    setShowTerminal(true);
    setVisibleLogs([]);

    const generatedOrderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
    
    const initialLogs = [
      `[Browser] ➔ Iniciando transacción de compra segura...`,
      `[Browser] ➔ Datos del cliente validados localmente.`,
      `[Browser] ➔ Código de cupón activo: ${couponCode || 'NINGUNO'}.`,
      `[Browser] ➔ Enviando orden ${generatedOrderNumber} a la Capa de Aplicación (API Gateway)...`
    ];

    for (let i = 0; i < initialLogs.length; i++) {
      await new Promise(r => setTimeout(r, 450));
      setVisibleLogs(prev => [...prev, initialLogs[i]]);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/erp/orders', {
        orderNumber: generatedOrderNumber,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        customerCompany: customerCompany,
        totalAmount: total,
        paymentStatus: 'Pagado',
        items: cart.map(item => ({ sku: item.sku, quantity: item.quantity }))
      });

      const backendLogs = response.data.logs || [];
      
      for (let i = 0; i < backendLogs.length; i++) {
        await new Promise(r => setTimeout(r, 600));
        setVisibleLogs(prev => [...prev, backendLogs[i]]);
      }

      await new Promise(r => setTimeout(r, 1000));
      
      // Save order details to localStorage for persistent order tracking
      const newOrder = {
        orderNumber: generatedOrderNumber,
        customerName,
        customerEmail,
        customerCompany,
        subtotal,
        discountAmount,
        discountPercent,
        couponCode,
        total,
        items: [...cart],
        timestamp: Date.now(),
        dateStr: new Date().toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const existingOrders = JSON.parse(localStorage.getItem('tecnotics_orders') || '[]');
      localStorage.setItem('tecnotics_orders', JSON.stringify([newOrder, ...existingOrders]));

      setOrderNumber(generatedOrderNumber);
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      setVisibleLogs(prev => [...prev, `[API-Gateway] ❌ ERROR DE INTEGRACIÓN: ${error.response?.data?.message || error.message}`]);
      setVisibleLogs(prev => [...prev, `[Browser] ❌ Transacción abortada.`]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-28 text-center text-white">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
          <CheckCircle className="w-12 h-12 text-green-400 animate-pulse" />
        </motion.div>
        
        <h1 className="text-4xl font-extrabold text-white mb-4">¡Pago Completado!</h1>
        <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
          Tu orden <span className="text-primary font-black">{orderNumber}</span> ha sido procesada exitosamente y se encuentra en preparación logística.
        </p>
        
        {/* Short Audit Log recap */}
        <div className="glass-panel text-left max-w-xl mx-auto p-6 rounded-2xl mb-8 border border-green-500/30 bg-green-950/10 shadow-lg">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-green-400">
            <Cpu className="w-4 h-4 text-emerald-400"/> Estatus de Preparación del Pedido
          </h4>
          <ul className="text-xs space-y-3.5 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-extrabold">➔</span> 
              <span><span className="text-white font-bold uppercase tracking-wider text-[10px] bg-blue-900/50 border border-blue-500/30 px-1.5 py-0.5 rounded mr-1.5">FACTURADO</span> Comprobante de compra generado y validado fiscalmente.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-extrabold">➔</span> 
              <span><span className="text-white font-bold uppercase tracking-wider text-[10px] bg-emerald-950/50 border border-emerald-500/30 px-1.5 py-0.5 rounded mr-1.5">PREPARADO</span> Stock físico verificado y reservado para despacho inmediato.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-extrabold">➔</span> 
              <span><span className="text-white font-bold uppercase tracking-wider text-[10px] bg-indigo-900/50 border border-indigo-500/30 px-1.5 py-0.5 rounded mr-1.5">REGISTRADO</span> Garantía extendida y expediente de cliente vinculados.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-extrabold">➔</span> 
              <span><span className="text-white font-bold uppercase tracking-wider text-[10px] bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded mr-1.5">DESPACHADO</span> Guía de envío express generada y en tránsito.</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => setSuccess(false)}
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold border border-white/5 transition-all text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <ClipboardList className="w-4 h-4 text-primary" /> Consultar Rastreo
          </button>
          <Link to="/catalogo" className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all text-xs uppercase tracking-wider flex items-center justify-center cursor-pointer shadow-md shadow-primary/25">
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative text-white">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_50%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0,transparent_50%)] blur-[100px] pointer-events-none" />

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-2">Finalizar <span className="text-primary">Compra</span></h1>
        <p className="text-text-muted">Ingresa tus datos para procesar la compra de forma rápida y segura.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          {showTerminal ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-3xl p-8 border border-white/10 bg-[#0c1225]/90 min-h-[380px] shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Decorative backgrounds */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-white font-extrabold text-xs uppercase tracking-wider">Pasarela de Pago Segura</span>
                </div>
                <span className="text-[10px] text-text-muted font-bold font-mono uppercase tracking-wider bg-slate-950 px-2.5 py-1 rounded border border-white/5">
                  ID: {orderNumber || 'GENERANDO'}
                </span>
              </div>
              
              {/* Spinner & Substatus */}
              <div className="my-8 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary relative">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="absolute inset-[-4px] rounded-2xl border border-dashed border-primary/30 animate-spin-slow"></span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-xs tracking-wider uppercase">Procesando Solicitud</h3>
                  <p className="text-xs text-text-muted mt-1.5 max-w-md animate-pulse">
                    {getCheckoutStepStatus().statusText}
                  </p>
                </div>
              </div>

              {/* Step checklist */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                {[
                  { id: 1, label: 'Verificación SSL', detail: 'Conexión Segura' },
                  { id: 2, label: 'Verificación de Inventario', detail: 'Reserva de Almacén' },
                  { id: 3, label: 'Procesamiento de Pago', detail: 'Factura Contable' },
                  { id: 4, label: 'Registro de Garantía', detail: 'Perfil de Comprador' },
                  { id: 5, label: 'Despacho Express', detail: 'Preparación Logística' }
                ].map((step) => {
                  const { currentStep } = getCheckoutStepStatus();
                  const isDone = currentStep > step.id || (currentStep === 5 && step.id === 5 && !isSubmitting);
                  const isActive = currentStep === step.id && isSubmitting;
                  
                  return (
                    <div 
                      key={step.id} 
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        isDone 
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400' 
                        : isActive
                        ? 'bg-primary/10 border-primary/30 text-primary animate-pulse'
                        : 'bg-slate-950/40 border-white/5 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                          isDone 
                          ? 'bg-emerald-500/20 border-emerald-400'
                          : isActive
                          ? 'bg-primary/20 border-primary'
                          : 'bg-slate-900 border-white/10'
                        }`}>
                          {isDone ? '✓' : step.id}
                        </span>
                        <div className="text-left">
                          <span className="font-bold text-xs block text-white">{step.label}</span>
                          <span className="text-[9px] text-text-muted uppercase tracking-wider block mt-0.5">{step.detail}</span>
                        </div>
                      </div>
                      
                      <span className="text-[9px] font-extrabold uppercase tracking-wider">
                        {isDone ? 'Listo' : isActive ? 'Procesando...' : 'En Espera'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel rounded-3xl p-8 border border-white/5 bg-slate-900/40">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><ShoppingBag className="w-6 h-6 text-primary"/> Resumen de tu Pedido</h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-text-muted font-semibold mb-4">Tu carrito está vacío.</p>
                  <Link to="/catalogo" className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all inline-block uppercase tracking-wider">
                    Ir al Catálogo
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-white/10 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                      <div>
                        <h4 className="font-bold text-white text-base">{item.name}</h4>
                        <p className="text-xs text-text-muted mt-1">SKU: {item.sku} | Cantidad: {item.quantity}</p>
                      </div>
                      <div className="font-bold text-white text-base">${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Coupon addition in Checkout Page */}
          {!showTerminal && cart.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/20">
              {!couponCode ? (
                <form onSubmit={handleApplyCouponCheckout} className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-primary" /> ¿Posees algún cupón de descuento?
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej. TECNOTICS10, PROINFRA"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950/80 border border-white/5 focus:border-primary/50 rounded-xl text-xs focus:outline-none uppercase text-white"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer w-full sm:w-auto h-[44px]"
                  >
                    Aplicar Código
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase block tracking-wider">Cupón Activado Exitosamente</span>
                      <span className="text-white text-xs font-bold">{couponCode} (Descuento de {discountPercent}%)</span>
                    </div>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              )}

              {couponError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold mt-3 animate-fadeIn">
                  <AlertCircle className="w-4 h-4" /> {couponError}
                </div>
              )}
              {couponSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-3 animate-fadeIn">
                  <CheckCircle className="w-4 h-4" /> {couponSuccess}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Side: Customer Info Billing Form */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-3xl p-8 border border-white/5 bg-slate-900/40 sticky top-28">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><CreditCard className="w-6 h-6 text-primary"/> Resumen de Transacción</h2>
            
            <div className="space-y-3 mb-6 text-xs border-b border-white/5 pb-4">
              <div className="flex justify-between text-text-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-white">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Descuento por Cupón (-{discountPercent}%)</span>
                  <span>-${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className="flex justify-between text-text-muted">
                <span>Envío Express Asegurado</span>
                <span className="text-emerald-400 font-bold uppercase text-[10px]">Gratis</span>
              </div>
              <div className="pt-3 flex justify-between text-lg font-black text-white">
                <span>Total Final</span>
                <span className="text-primary">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={customerName} 
                  onChange={e => setCustomerName(e.target.value)} 
                  disabled={showTerminal} 
                  className="w-full px-4 py-3 bg-slate-950/60 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/40 text-xs text-white" 
                  placeholder="Ej. Ana Gómez" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  value={customerEmail} 
                  onChange={e => setCustomerEmail(e.target.value)} 
                  disabled={showTerminal} 
                  className="w-full px-4 py-3 bg-slate-950/60 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/40 text-xs text-white" 
                  placeholder="ana@empresa.com" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Teléfono de Enlace</label>
                <input 
                  type="tel" 
                  required 
                  value={customerPhone} 
                  onChange={e => setCustomerPhone(e.target.value)} 
                  disabled={showTerminal} 
                  className="w-full px-4 py-3 bg-slate-950/60 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/40 text-xs text-white" 
                  placeholder="555-4321" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Empresa / Razón Social (Opcional)</label>
                <input 
                  type="text" 
                  required 
                  value={customerCompany} 
                  onChange={e => setCustomerCompany(e.target.value)} 
                  disabled={showTerminal} 
                  className="w-full px-4 py-3 bg-slate-950/60 border border-white/5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/40 text-xs text-white" 
                  placeholder="Ej. Tech Solutions S.A." 
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting || cart.length === 0 || showTerminal} 
                className="w-full py-3.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-hover transition-all flex justify-center items-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.3)] mt-6 uppercase tracking-wider cursor-pointer"
              >
                Pagar ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })} <ArrowRight className="w-5 h-5"/>
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Persistent Order Tracking Dashboard Section */}
      {pastOrders.length > 0 && (
        <div className="mt-20 border-t border-white/5 pt-16 relative z-10">
          <div className="flex justify-between items-end mb-8">
            <div className="text-left">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Truck className="w-6 h-6 text-primary" /> Rastrear Pedidos
              </h2>
              <p className="text-xs text-text-muted mt-1">Monitorea el progreso de tus órdenes y los plazos de entrega estimados en tiempo real.</p>
            </div>
            <button 
              onClick={() => setTickerTime(Date.now())}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-white/5 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102"
              title="Refrescar Estatus"
            >
              <RefreshCw className="w-3.5 h-3.5 text-primary" /> Recargar Estatus
            </button>
          </div>

          <div className="space-y-6 max-w-5xl">
            {pastOrders.map((order, oidx) => {
              const status = getOrderStatus(order.timestamp);
              
              return (
                <div key={oidx} className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 space-y-5 flex flex-col hover:border-primary/25 transition-all">
                  
                  {/* Order Details Top Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-text-muted font-bold block uppercase">Identificador del Pedido</span>
                      <span className="font-black text-white text-sm">{order.orderNumber}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted font-bold block uppercase">Fecha de Registro</span>
                      <span className="font-semibold text-slate-200">{order.dateStr}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted font-bold block uppercase">Cliente / Empresa</span>
                      <span className="font-bold text-slate-200">{order.customerCompany || order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted font-bold block uppercase">Monto Total</span>
                      <span className="font-black text-primary text-sm">${parseFloat(order.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    {order.couponCode && (
                      <div>
                        <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          Cupón {order.couponCode}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* List of items */}
                  <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
                    <span className="text-[9px] text-text-muted font-extrabold uppercase tracking-wider block mb-2">Equipos Adquiridos:</span>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="bg-slate-900 px-3 py-1.5 rounded-lg border border-white/5 text-[10px] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          <span className="font-bold text-white">{item.name}</span>
                          <span className="text-text-muted">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Progress Tracker */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-muted flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Estado Logístico Actual:</span>
                      <span className={`font-bold uppercase tracking-wider text-[11px] ${status.color} flex items-center gap-1`}>
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span> {status.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-text-muted italic">{status.desc}</p>

                    {/* Progress Bar visual track */}
                    <div className="relative">
                      {/* background track */}
                      <div className="h-2 w-full bg-slate-950 rounded-full border border-white/5 overflow-hidden">
                        {/* fill */}
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500"
                          animate={{ width: `${status.progress}%` }}
                          transition={{ duration: 1.2 }}
                        />
                      </div>
                      
                      {/* Progress Steps Nodes */}
                      <div className="flex justify-between mt-2.5 text-[9px] text-text-muted font-bold uppercase tracking-wider">
                        <div className={`flex flex-col items-start ${status.stage >= 1 ? 'text-blue-400' : 'text-slate-600'}`}>
                          <span>• Factura</span>
                          <span className="text-[8px] text-text-muted">Emitida</span>
                        </div>
                        <div className={`flex flex-col items-center ${status.stage >= 2 ? 'text-amber-400' : 'text-slate-600'}`}>
                          <span>• Empaque</span>
                          <span className="text-[8px] text-text-muted">Listo</span>
                        </div>
                        <div className={`flex flex-col items-center ${status.stage >= 3 ? 'text-indigo-400' : 'text-slate-600'}`}>
                          <span>• En Ruta</span>
                          <span className="text-[8px] text-text-muted">Despachado</span>
                        </div>
                        <div className={`flex flex-col items-end ${status.stage >= 4 ? 'text-emerald-400' : 'text-slate-600'}`}>
                          <span>• Entregado</span>
                          <span className="text-[8px] text-text-muted">Completado</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default Checkout;
