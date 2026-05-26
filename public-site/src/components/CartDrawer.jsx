import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, CheckCircle2, AlertCircle, Laptop, Cpu, HardDrive, Database, Monitor, Package, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { 
    cart, 
    cartOpen, 
    setCartOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    total, 
    couponCode, 
    discountPercent, 
    discountAmount, 
    applyCoupon, 
    removeCoupon 
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getProductCategory = (product) => {
    const name = product.name.toLowerCase();
    const sku = product.sku?.toLowerCase() || '';
    
    if (name.includes('macbook') || name.includes('laptop') || name.includes('notebook')) return 'Laptops';
    if (name.includes('core') || name.includes('processor') || name.includes('rtx') || name.includes('gpu') || name.includes('nvidia') || name.includes('ram') || name.includes('intel') || sku.includes('int') || sku.includes('nv')) return 'Componentes';
    if (name.includes('monitor') || name.includes('swift') || sku.includes('as-32')) return 'Monitores';
    if (name.includes('server') || name.includes('poweredge') || name.includes('xeon') || sku.includes('srv')) return 'Servidores';
    if (name.includes('ssd') || name.includes('nvme') || name.includes('samsung') || sku.includes('ssd')) return 'Almacenamiento';
    return 'Componentes';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Laptops': return Laptop;
      case 'Componentes': return Cpu;
      case 'Monitores': return Monitor;
      case 'Servidores': return Database;
      case 'Almacenamiento': return HardDrive;
      default: return Package;
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    
    const result = applyCoupon(couponInput);
    if (result.success) {
      setSuccessMsg(result.message);
      setErrorMsg('');
      setCouponInput('');
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg(result.message);
      setSuccessMsg('');
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  const handleGoToCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md"
            >
              <div className="h-full flex flex-col bg-[#0b101f] border-l border-white/10 shadow-2xl text-white">
                
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-xl text-primary">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-lg tracking-tight">Carrito de Compras</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded-full text-xs text-text-muted font-bold ml-1">
                      {cart.reduce((acc, item) => acc + item.quantity, 0)} u
                    </span>
                  </div>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                      <ShoppingBag className="w-16 h-16 text-slate-500 mb-4 animate-pulse" />
                      <h4 className="font-bold text-white mb-1">Tu carrito está vacío</h4>
                      <p className="text-xs text-text-muted max-w-[240px]">Agrega productos del catálogo de tecnología para iniciar tu compra.</p>
                      <button 
                        onClick={() => setCartOpen(false)}
                        className="mt-6 px-5 py-2.5 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 rounded-xl text-xs font-bold transition-all"
                      >
                        Explorar Catálogo
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => {
                      const category = getProductCategory(item);
                      const Icon = getCategoryIcon(category);
                      
                      return (
                        <div key={item.id} className="p-4 rounded-xl border border-white/5 bg-slate-900/40 hover:border-white/10 transition-all flex gap-4 relative group">
                          
                          {/* Category Thumbnail / Product Image */}
                          <div className="w-14 h-14 rounded-lg bg-slate-950 flex items-center justify-center flex-shrink-0 border border-white/5 overflow-hidden">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                            ) : (
                              <Icon className="w-6 h-6 text-primary/40 group-hover:scale-110 transition-transform" />
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h5 className="font-bold text-white text-xs truncate group-hover:text-primary transition-colors pr-4">{item.name}</h5>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-slate-400 hover:text-red-400 p-0.5 rounded transition-colors absolute top-3 right-3 opacity-0 group-hover:opacity-100"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[10px] text-text-muted font-bold font-mono tracking-wider">{item.sku}</span>
                            
                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity Selector */}
                              <div className="flex items-center gap-1.5 bg-slate-950 border border-white/5 rounded-lg p-0.5">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-white font-bold text-xs"
                                >
                                  −
                                </button>
                                <span className="w-5 text-center text-xs font-bold text-white">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-white font-bold text-xs"
                                >
                                  +
                                </button>
                              </div>
                              
                              {/* Price */}
                              <div className="text-right">
                                <span className="text-xs font-black text-white">${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                {item.quantity > 1 && (
                                  <span className="block text-[9px] text-text-muted">${parseFloat(item.price).toFixed(2)} c/u</span>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer Section */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-white/5 bg-slate-950/40 space-y-4">
                    
                    {/* Coupon Input Form */}
                    {!couponCode ? (
                      <form onSubmit={handleApplyCoupon} className="space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider">
                          <Tag className="w-3 h-3 text-primary" /> ¿Tienes un cupón de descuento?
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Ej. TECNOTICS10, PROINFRA"
                            value={couponInput}
                            onChange={e => setCouponInput(e.target.value)}
                            className="flex-1 px-3 py-2 bg-slate-950/80 border border-white/5 focus:border-primary/50 rounded-lg text-xs focus:outline-none text-white transition-all uppercase"
                          />
                          <button 
                            type="submit"
                            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            Aplicar
                          </button>
                        </div>
                        {errorMsg && (
                          <div className="flex items-center gap-1 text-[10px] text-rose-400 font-semibold mt-1">
                            <AlertCircle className="w-3 h-3" /> {errorMsg}
                          </div>
                        )}
                      </form>
                    ) : (
                      <div className="bg-emerald-950/30 border border-emerald-500/20 p-3.5 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cupón Aplicado
                          </span>
                          <button 
                            onClick={removeCoupon}
                            className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-white/5 transition-all"
                            title="Quitar Cupón"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-extrabold text-white text-xs">{couponCode}</span>
                          <span className="text-emerald-400 font-bold">-{discountPercent}% OFF</span>
                        </div>
                      </div>
                    )}

                    {successMsg && (
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> {successMsg}
                      </div>
                    )}

                    {/* Pricing Sums */}
                    <div className="space-y-2.5 pt-2 border-t border-white/5 text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold text-white">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                      
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400 font-semibold">
                          <span>Ahorro por Cupón ({discountPercent}%)</span>
                          <span>-${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Gastos de Envío</span>
                        <span className="text-emerald-400 font-bold uppercase text-[10px]">Gratis</span>
                      </div>

                      <div className="flex justify-between items-end pt-3 border-t border-white/5">
                        <span className="font-extrabold text-white text-sm">Total Estimado</span>
                        <span className="text-2xl font-black text-primary">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>

                    {/* Checkout Buttons */}
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      <button 
                        onClick={handleGoToCheckout}
                        className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.25)] flex items-center justify-center gap-1.5 uppercase tracking-wider"
                      >
                        Continuar al Checkout <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setCartOpen(false)}
                        className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-bold transition-colors"
                      >
                        Seguir Comprando
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
