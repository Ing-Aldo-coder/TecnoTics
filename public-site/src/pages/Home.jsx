import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Server, Shield, Zap, Database, Laptop, HardDrive, Cpu, Terminal, Sparkles, Star, ChevronRight, CheckCircle2, Copy, Check, Quote, Globe, MessageSquare, Tag, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addToCart } = useCart();
  const [copiedCoupon, setCopiedCoupon] = useState('');

  const featuredProducts = [
    { id: 991, name: 'MacBook Pro M3 Max 16"', sku: 'MBP-M3', price: 2499.00, inventoryCount: 15, category: 'Laptops', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80' },
    { id: 992, name: 'Intel Core i9-14900K Processor', sku: 'INT-I9', price: 589.99, inventoryCount: 25, category: 'Componentes', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80' },
    { id: 993, name: 'NVIDIA GeForce RTX 4090 GPU', sku: 'NV-RTX4090', price: 1599.99, inventoryCount: 5, category: 'Componentes', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80' },
    { id: 994, name: 'ASUS ROG Swift PG32UCDM 32"', sku: 'AS-32UCD', price: 1299.00, inventoryCount: 18, category: 'Monitores', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80' },
  ];

  const brandLogos = [
    { name: 'NVIDIA AI', detail: 'Aceleración GPU' },
    { name: 'Intel Xeon', detail: 'Procesamiento' },
    { name: 'Cisco Systems', detail: 'Conectividad L3' },
    { name: 'AMD EPYC', detail: 'Servidores Nube' },
    { name: 'Dell Enterprise', detail: 'Sistemas Rack' },
    { name: 'HP Enterprise', detail: 'Almacenamiento' },
    { name: 'Lenovo Pro', detail: 'Workstations' }
  ];

  const coupons = [
    { code: 'TECNOTICS10', discount: '10% de Descuento', desc: 'Habilitado para todos los productos de hardware, ideal para renovar tu setup personal.', type: 'General' },
    { code: 'PROINFRA', discount: '15% de Descuento', desc: 'Exclusivo para infraestructura y redes: servidores, almacenamiento y switches.', type: 'Especial' }
  ];

  const testimonials = [
    {
      quote: "La atención de TecnoTics con nuestro stock logístico y de distribución es impecable. El reabastecimiento rápido nos salvó de retrasos críticos en el despliegue del data center.",
      author: "Ing. Alejandro Ruiz",
      role: "Director de Infraestructura Nube",
      company: "MercadoLibre Latam",
      rating: 5
    },
    {
      quote: "Buscábamos un servicio ágil para la compra de equipo especializado. TecnoTics sincroniza al instante la facturación digital y el perfil de cliente de forma totalmente automatizada.",
      author: "Dra. Mónica Silva",
      role: "VP de Operaciones Globales",
      company: "Globant Cloud Services",
      rating: 5
    },
    {
      quote: "El sistema de cupones corporativos nos permitió optimizar el presupuesto del departamento de IT en un 15%. Soporte prioritario con tiempo de respuesta real menor a 2 horas.",
      author: "Lic. Carlos Mendoza",
      role: "Jefe de Compras y Suministros IT",
      company: "BBVA México Tech",
      rating: 5
    }
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(''), 3000);
  };

  return (
    <div className="relative overflow-hidden bg-[#0a0f1d] min-h-screen text-white">
      {/* Dynamic Glowing Accents */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18)_0,transparent_50%)] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0,transparent_50%)] blur-[80px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0,transparent_50%)] blur-[60px] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" /> Soluciones Tecnológicas de Alta Fidelidad
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Tecnología de Vanguardia <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-emerald-400">
                al Alcance de Todos
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
              Encuentra los mejores dispositivos, componentes y soluciones de hardware. Ya sea para tu uso personal, gaming de nivel entusiasta, o para escalar la infraestructura de tu negocio, tenemos lo que necesitas con entrega inmediata.
            </p>

            {/* Quick Mini Tech Badge Grid */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5 max-w-lg">
              <div className="flex flex-col">
                <span className="text-xs text-text-muted font-semibold uppercase">Envío Nacional</span>
                <span className="text-sm font-black text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Rápido y Seguro
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-muted font-semibold uppercase">Garantía Real</span>
                <span className="text-sm font-black text-blue-400 mt-1 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> 100% Originales
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-muted font-semibold uppercase">Facturación</span>
                <span className="text-sm font-black text-indigo-400 mt-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Factura Inmediata
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalogo" className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-extrabold transition-all shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] flex items-center justify-center gap-2 group text-sm uppercase tracking-wider cursor-pointer">
                Explorar Catálogo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link to="/contacto" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all text-sm uppercase tracking-wider flex items-center justify-center cursor-pointer">
                Soporte y Contacto
              </Link>
            </div>
          </motion.div>

          {/* Dynamic Interactive Product Showcase & Benefits Card (Hero Graphic) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-slate-900/40 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Beneficios de Compra</span>
                </div>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-black uppercase">
                  Activo
                </span>
              </div>

              {/* Standard Premium Features Grid */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-primary/30 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Envío Rápido y Garantizado</h4>
                      <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                        Compra laptops premium, GPUs y hardware de consumo con envíos express en 24 horas y garantía directa del fabricante.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-emerald-500/30 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Atención y Asesoría Directa</h4>
                      <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                        Accede a precios competitivos, descuentos por volumen y asesoría personalizada para encontrar el equipo ideal para ti.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-indigo-500/30 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Soporte Técnico Especializado</h4>
                      <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                        Asistencia personalizada en chat o correo para ayudarte a resolver tus dudas de configuración o compatibilidad de hardware.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Infinite Scrolling Brands Marquee */}
      <div className="bg-slate-950/40 border-y border-white/5 py-8 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-wider">
          <Globe className="w-4 h-4 text-primary animate-spin-slow" /> Marcas Tecnológicas Disponibles
        </div>
        
        {/* brand ticker */}
        <div className="w-full overflow-hidden flex relative">
          <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1200] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, bidx) => (
              <div key={bidx} className="inline-flex flex-col px-8 py-3 rounded-xl border border-white/5 bg-slate-900/40 min-w-[200px] text-center">
                <span className="font-black text-white text-base tracking-wider">{brand.name}</span>
                <span className="text-[10px] text-primary font-bold uppercase mt-1">{brand.detail}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Corporate Active Discount Coupons Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-extrabold uppercase tracking-wider bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-3">
            <Tag className="w-3.5 h-3.5 animate-pulse" /> Campaña Comercial Activa
          </div>
          <h2 className="text-3xl font-black text-white">Cupones de Descuento Especiales</h2>
          <p className="text-xs text-text-muted mt-2">Optimiza tu presupuesto copiando y aplicando estos cupones especiales en tu pedido.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {coupons.map((coupon, cidx) => (
            <div key={cidx} className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col justify-between hover:border-primary/40 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-white/5 uppercase tracking-wider">
                {coupon.type}
              </div>
              <div>
                <h3 className="text-lg font-black text-emerald-400">{coupon.discount}</h3>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">{coupon.desc}</p>
              </div>
              
              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="font-mono font-black text-white text-lg tracking-wider bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5">{coupon.code}</span>
                <button 
                  onClick={() => copyToClipboard(coupon.code)}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-102"
                >
                  {copiedCoupon === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copiar Código
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-white">Categorías Tecnológicas</h2>
          <p className="text-xs text-text-muted mt-2">Equipamiento tecnológico seleccionado de alto desempeño para tu infraestructura.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Laptop, title: "Laptops Premium", desc: "Estaciones de trabajo portátiles de alto rendimiento para desarrolladores y creativos.", count: "12 Modelos" },
            { icon: Cpu, title: "Componentes & Chips", desc: "Microprocesadores, módulos RAM de última generación y tarjetas de aceleración gráfica.", count: "45 SKUs" },
            { icon: HardDrive, title: "Almacenamiento", desc: "Unidades SSD NVMe de nivel empresarial y sistemas de almacenamiento NAS.", count: "18 Modelos" },
            { icon: Database, title: "Servidores & Redes", desc: "Switches gestionados, servidores en rack e infraestructura de nube privada.", count: "8 Modelos" },
          ].map((cat, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between hover:translate-y-[-4px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{cat.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{cat.desc}</p>
              </div>
              <div className="mt-6 flex justify-between items-center text-xs border-t border-white/5 pt-4">
                <span className="text-text-muted font-semibold">{cat.count}</span>
                <Link to="/catalogo" className="text-primary font-bold flex items-center gap-0.5 group-hover:underline">
                  Ver productos <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-white">Productos Destacados</h2>
            <p className="text-xs text-text-muted mt-2">Los equipos más solicitados para la digitalización corporativa.</p>
          </div>
          <Link to="/catalogo" className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer">
            Ver Catálogo Completo ➔
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <div key={prod.id} className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
              <div className="h-44 bg-slate-950/30 flex items-center justify-center border-b border-white/5 relative overflow-hidden">
                {prod.image ? (
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <Cpu className="w-16 h-16 text-primary/30 group-hover:scale-110 transition-transform duration-500" />
                )}
                <span className="absolute top-3 left-3 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider z-10">Destacado</span>
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[10px] text-text-muted font-bold font-mono tracking-wider mb-2.5">
                    <span>{prod.sku}</span>
                    <span className="flex items-center gap-0.5 text-amber-500"><Star className="w-3 h-3 fill-current" /> 4.9</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-2 line-clamp-1">{prod.name}</h3>
                  <p className="text-xs text-text-muted">Categoría: {prod.category}</p>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-black text-white">${prod.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-text-muted">Stock: {prod.inventoryCount} u</span>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(prod);
                    }}
                    className="w-full py-2.5 bg-white/5 hover:bg-primary text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Architectural Integration (Visual Advantage) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-white">La Ventaja de TecnoTics</h2>
          <p className="text-xs text-text-muted mt-2">Servicio de clase mundial y automatización total para usuarios individuales y grandes corporaciones.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Server, title: "Logística Avanzada y Express", desc: "Monitoreo constante de inventario en tiempo real. Tu pedido se procesa y despacha de forma inmediata desde nuestro almacén central para garantizar los menores tiempos de entrega." },
            { icon: Shield, title: "Facturación y Garantía Inmediata", desc: "Generación automática de comprobantes y facturas fiscales válidas. Todo tu hardware cuenta con póliza de garantía directa con soporte prioritario del fabricante." },
            { icon: Zap, title: "Soporte y Atención Exclusiva", desc: "Atención especializada post-venta. Tienes un asesor asignado para cualquier consulta técnica y soporte de compatibilidad." }
          ].map((feat, idx) => (
            <div key={idx} className="p-8 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{feat.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                • Tu Socio en Tecnología
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-extrabold uppercase tracking-wider bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-3">
            <MessageSquare className="w-3.5 h-3.5" /> Opinión de Expertos
          </div>
          <h2 className="text-3xl font-black text-white">Casos de Éxito de Nuestros Clientes</h2>
          <p className="text-xs text-text-muted mt-2">Descubre por qué los líderes de tecnología en Latinoamérica confían en la precisión digital de TecnoTics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, tidx) => (
            <div key={tidx} className="glass-panel p-8 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col justify-between relative hover:border-primary/30 transition-all hover:scale-102">
              <Quote className="w-10 h-10 text-primary/15 absolute top-6 right-6" />
              <div>
                <div className="flex gap-1 mb-5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">"{test.quote}"</p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/5">
                <h5 className="font-extrabold text-white text-xs">{test.author}</h5>
                <span className="block text-[10px] text-text-muted font-semibold mt-0.5">{test.role}</span>
                <span className="block text-[10px] text-primary font-bold font-mono tracking-wider mt-1">{test.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 bg-slate-950/40 rounded-3xl border border-white/5 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h4 className="text-3xl sm:text-4xl font-black text-primary">99.9%</h4>
            <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">Clientes Satisfechos</p>
          </div>
          <div>
            <h4 className="text-3xl sm:text-4xl font-black text-emerald-400">&lt; 24 hrs</h4>
            <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">Despacho de Pedidos</p>
          </div>
          <div>
            <h4 className="text-3xl sm:text-4xl font-black text-indigo-400">+10,000</h4>
            <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">Equipos Entregados</p>
          </div>
          <div>
            <h4 className="text-3xl sm:text-4xl font-black text-blue-400">100%</h4>
            <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">Pagos y Datos Seguros</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
