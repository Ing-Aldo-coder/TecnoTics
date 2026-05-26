import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Loader2, Package, Search, Laptop, Cpu, HardDrive, Database, Monitor, Star, SlidersHorizontal, CheckCircle, X, Truck, Calendar, Sparkles, MessageSquare, Award, Clock, Keyboard, MousePointerClick, Headphones } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Filter and Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('default');
  const [filterStock, setFilterStock] = useState('all');

  // Quick View Modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  // Review states
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewCompany, setNewReviewCompany] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState({
    // Seed reviews for primary products
    991: [
      { author: 'Ing. Elena Torres', company: 'Telcel Cloud Labs', rating: 5, comment: 'Excelente rendimiento para compilar contenedores Docker en paralelo. La batería de 22 horas es totalmente real.', date: '2026-05-10' },
      { author: 'Dr. Fernando Medina', company: 'Softtek Systems', rating: 5, comment: 'La pantalla Liquid Retina es impresionante. Una workstation portátil de ensueño para data scientists.', date: '2026-05-08' }
    ],
    993: [
      { author: 'Ing. Lucas Valenzuela', company: 'Cemex AI Ventures', rating: 5, comment: 'La potencia para entrenar modelos de IA generativa locales es increíble. Recomiendo fuente certificada de 1000W.', date: '2026-05-14' }
    ],
    992: [
      { author: 'Lic. Andrés Silva', company: 'Neoris Consultores', rating: 5, comment: 'Gran salto generacional. Control de temperatura mejorado respecto a la serie 13.', date: '2026-05-11' }
    ]
  });

  // Success toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/scm/products');
      setProducts(res.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product, qty = 1) => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    setToastMessage(`¡Añadido al carrito: ${product.name} (x${qty})!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getProductCategory = (product) => {
    const name = product.name.toLowerCase();
    const sku = product.sku?.toLowerCase() || '';
    
    if (name.includes('macbook') || name.includes('laptop') || name.includes('notebook')) return 'Laptops';
    if (name.includes('core') || name.includes('processor') || name.includes('rtx') || name.includes('gpu') || name.includes('nvidia') || name.includes('ram') || name.includes('intel') || sku.includes('int') || sku.includes('nv') || sku.includes('ram')) return 'Componentes';
    if (name.includes('monitor') || name.includes('swift') || name.includes('pantalla') || sku.includes('as-32') || name.includes('oled')) return 'Monitores';
    if (name.includes('server') || name.includes('poweredge') || name.includes('xeon') || sku.includes('srv') || name.includes('proliant') || name.includes('dream machine')) return 'Servidores';
    if (name.includes('ssd') || name.includes('nvme') || name.includes('samsung') || sku.includes('ssd') || name.includes('hard drive') || name.includes('hdd') || name.includes('t700')) return 'Almacenamiento';
    if (name.includes('keychron') || name.includes('keyboard') || name.includes('teclado') || name.includes('mouse') || name.includes('ratón') || name.includes('headset') || name.includes('headphones') || name.includes('audífonos')) return 'Periféricos';
    
    return 'Componentes';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Laptops': return Laptop;
      case 'Componentes': return Cpu;
      case 'Monitores': return Monitor;
      case 'Servidores': return Database;
      case 'Almacenamiento': return HardDrive;
      case 'Periféricos': return Keyboard;
      default: return Package;
    }
  };

  const getProductSpecs = (product) => {
    const category = getProductCategory(product);
    if (category === 'Laptops') {
      return [
        'Procesador Apple M3 Max de 16 núcleos de alto desempeño',
        'Pantalla Liquid Retina XDR de 16.2 pulgadas (120Hz ProMotion)',
        'Memoria Unificada de 48GB | SSD de alta velocidad de 1TB',
        'Batería inteligente con autonomía de hasta 22 horas continuas',
        'Ideal para compilación avanzada, virtualización y entrenamiento ML'
      ];
    }
    if (product.name.includes('rtx') || product.name.includes('4090')) {
      return [
        'Acelerador Gráfico NVIDIA Ada Lovelace RTX 4090 (2.52 GHz)',
        'Memoria dedicada GDDR6X de 24GB con ancho de banda de 384 bits',
        '76.3 TFLOPS de precisión simple | Núcleos Tensor de 4ª gen',
        'Sistema térmico patentado de triple ventilador axial fluido',
        'Alimentación requerida: Conector 12VHPWR (850W mínimo)'
      ];
    }
    if (product.name.includes('i9') || product.name.includes('14900')) {
      return [
        'Frecuencia Max Turbo de 6.0 GHz con Intel Thermal Velocity Boost',
        '24 núcleos físicos (8 Performance-cores + 16 Efficient-cores)',
        '32 subprocesos de procesamiento | 36MB de Intel Smart Cache',
        'Zócalo LGA1700 compatible con tarjetas serie 600 y 700',
        'Soporte integrado para carriles PCIe 5.0 y memorias DDR5'
      ];
    }
    if (category === 'Servidores') {
      return [
        'Arquitectura en Rack 2U Dell PowerEdge | Intel Xeon Silver 16-Core',
        'Configuración SAS RAID 5 integrada por hardware',
        'Fuentes de alimentación redundantes Hot-Swap de 800W (Eficiencia Platinum)',
        'Memoria RAM DDR5 ECC de 64GB con corrección activa de errores',
        'Monitoreo inteligente con controladora iDRAC9 Enterprise activa'
      ];
    }
    if (product.name.includes('Keychron')) {
      return [
        'Teclado mecánico premium inalámbrico Keychron Q1 Pro',
        'Diseño compacto del 75% con cuerpo de aluminio mecanizado CNC',
        'Interruptores mecánicos Keychron K Pro pre-lubricados de fábrica',
        'Retroiluminación RGB de orientación sur totalmente personalizable',
        'Conectividad Bluetooth 5.1 y USB-C cableado (compatible con Mac/Windows)'
      ];
    }
    if (product.name.includes('Logitech')) {
      return [
        'Mouse inalámbrico ultra-liviano Logitech G Pro X Superlight 2',
        'Sensor Hero 2 de próxima generación con hasta 32,000 DPI reales',
        'Interruptores híbridos Lightforce (ópticos y mecánicos a la vez)',
        'Peso ultra-reducido de solo 60 gramos para deslizamiento perfecto',
        'Autonomía de batería de hasta 95 horas con carga USB-C'
      ];
    }
    if (product.name.includes('Sony')) {
      return [
        'Auriculares Sony WH-1000XM5 inalámbricos con cancelación activa de ruido',
        'Procesador integrado V1 y procesador de Noise Cancelling HD QN1',
        '8 micrófonos dedicados para una cancelación de ruido sin precedentes',
        'Driver de 30 mm diseñado especialmente para un sonido natural y claro',
        'Hasta 30 horas de autonomía con carga rápida de 3 min para 3 horas'
      ];
    }
    return [
      'Garantía empresarial de 3 años directo con el fabricante',
      'Cumplimiento con estándares internacionales de eficiencia ecológica',
      'Compatibilidad nativa con sistemas operativos Windows Server y Linux',
      'Embalaje sellado de fábrica en bolsa antiestática de seguridad',
      'Soporte de primer nivel directo con nuestro equipo especializado'
    ];
  };

  const getReviewsForProduct = (productId) => {
    return localReviews[productId] || [
      { author: 'Ing. Carlos Robles', company: 'Acme Corporativo', rating: 5, comment: 'Excelente relación costo-beneficio. Se integró de inmediato en nuestra intranet.', date: '2026-05-18' }
    ];
  };

  const handleAddReview = (e, productId) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev = {
      author: newReviewName,
      company: newReviewCompany || 'Empresa Independiente',
      rating: parseInt(newReviewRating, 10),
      comment: newReviewComment,
      date: new Date().toISOString().split('T')[0]
    };

    setLocalReviews(prev => ({
      ...prev,
      [productId]: [newRev, ...(prev[productId] || [])]
    }));

    setNewReviewName('');
    setNewReviewCompany('');
    setNewReviewComment('');
    setNewReviewRating(5);
  };

  const filteredProducts = products
    .map(p => ({ ...p, category: getProductCategory(p) }))
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
      const matchesStock = filterStock === 'all' 
        ? true 
        : filterStock === 'instock' 
        ? p.inventoryCount > 0 
        : p.inventoryCount <= 0;
      
      return matchesSearch && matchesCategory && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
      if (sortBy === 'stock-asc') return a.inventoryCount - b.inventoryCount;
      return 0; 
    });

  const categories = ['Todas', 'Laptops', 'Componentes', 'Monitores', 'Servidores', 'Almacenamiento', 'Periféricos'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative min-h-screen text-white">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_50%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0,transparent_50%)] blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Catálogo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Tecnología</span></h1>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Explora nuestro inventario en tiempo real. Contamos con amplia disponibilidad y despacho express para todo el país.
        </p>
      </div>

      {/* Control Panel (Search, Filters and Sorting) */}
      <div className="glass-panel p-6 rounded-3xl mb-12 border border-white/5 bg-slate-900/40 relative z-10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Search bar */}
          <div className="lg:col-span-5 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por modelo o SKU (ej. RTX4090, MBP)..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950/60 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 rounded-xl focus:outline-none text-white text-sm transition-all animate-fadeIn"
            />
          </div>

          {/* Sorter */}
          <div className="lg:col-span-3">
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/60 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 rounded-xl focus:outline-none text-slate-300 text-sm transition-all"
            >
              <option value="default">Ordenar por: Relevancia</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="stock-asc">Disponibilidad: Stock Crítico</option>
            </select>
          </div>

          {/* Availability filter */}
          <div className="lg:col-span-4 flex gap-2">
            <button 
              onClick={() => setFilterStock('all')}
              className={`flex-1 py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                filterStock === 'all' 
                ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30' 
                : 'bg-slate-950/40 text-slate-300 border-white/5 hover:bg-slate-950/75'
              }`}
            >
              Todos
            </button>
            <button 
              onClick={() => setFilterStock('instock')}
              className={`flex-1 py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                filterStock === 'instock' 
                ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30' 
                : 'bg-slate-950/40 text-slate-300 border-white/5 hover:bg-slate-950/75'
              }`}
            >
              En Stock
            </button>
          </div>

        </div>

        {/* Categories horizontal tabs */}
        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 text-xs text-text-muted font-bold mb-3 uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Categorías Tecnológicas
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedCategory === cat 
                  ? 'bg-white/10 text-white border-white/20' 
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Cargando catálogo...</span>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="glass-panel rounded-3xl p-20 text-center border border-white/5 relative z-10 animate-fadeIn">
          <Package className="w-16 h-16 text-text-muted mx-auto mb-4 opacity-40 animate-bounce" />
          <h3 className="text-xl font-extrabold text-white mb-2">No se encontraron productos</h3>
          <p className="text-text-muted text-xs max-w-md mx-auto leading-relaxed">Prueba modificando los filtros o realiza búsquedas por modelo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
          {filteredProducts.map((product, i) => {
            const category = getProductCategory(product);
            const CategoryIcon = getCategoryIcon(category);
            
            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.4) }}
                className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Visual Product Image Area */}
                <div 
                  onClick={() => {
                    setSelectedProduct(product);
                    setModalQuantity(1);
                    setActiveTab('specs');
                  }}
                  className="h-44 bg-slate-950/20 flex items-center justify-center border-b border-white/5 relative cursor-pointer group overflow-hidden"
                >
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <CategoryIcon className="w-16 h-16 text-primary/30 group-hover:scale-115 group-hover:text-primary/50 transition-all duration-500" />
                  )}
                  
                  {/* Stock Badges */}
                  <span className={`absolute top-3 right-3 text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider z-10 ${
                    product.inventoryCount > 15 
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/20' 
                    : product.inventoryCount > 5
                    ? 'bg-amber-950/80 text-amber-400 border-amber-500/20'
                    : 'bg-rose-950/80 text-rose-400 border-rose-500/20 animate-pulse'
                  }`}>
                    {product.inventoryCount > 15 ? 'Stock Seguro' : product.inventoryCount > 5 ? 'Ajustado' : 'Stock Crítico'}
                  </span>
                  
                  {/* Rating Stars Overlay */}
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-amber-500 flex items-center gap-0.5 bg-slate-950/70 border border-white/10 px-2 py-0.5 rounded z-10"><Star className="w-3.5 h-3.5 fill-current" /> 4.9</span>
                </div>

                {/* Product Detail Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div 
                    className="cursor-pointer" 
                    onClick={() => {
                      setSelectedProduct(product);
                      setModalQuantity(1);
                      setActiveTab('specs');
                    }}
                  >
                    <div className="text-[10px] text-primary font-bold mb-2 tracking-wider uppercase">{product.sku}</div>
                    <h3 className="text-base font-extrabold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Categoría: {category}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-black text-white">${parseFloat(product.price).toFixed(2)}</span>
                      <span className="text-[10px] font-mono text-text-muted">Almacén: {product.inventoryCount} u</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAddToCart(product, 1)}
                        disabled={product.inventoryCount <= 0}
                        className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-primary/20 cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" /> 
                        {product.inventoryCount > 0 ? 'Comprar' : 'Agotado'}
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedProduct(product);
                          setModalQuantity(1);
                          setActiveTab('specs');
                        }}
                        className="px-3 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        title="Vista Rápida"
                      >
                        👁️
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Upgraded Quick View Modal Component */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel max-w-3xl w-full rounded-3xl p-6 md:p-8 border border-white/10 bg-[#0c1225] relative z-10 overflow-hidden shadow-2xl"
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Visual Area */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="h-52 bg-slate-900/60 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden">
                    {selectedProduct.image ? (
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      (() => {
                        const CategoryIcon = getCategoryIcon(getProductCategory(selectedProduct));
                        return <CategoryIcon className="w-24 h-24 text-primary/40 animate-pulse" />;
                      })()
                    )}
                    <span className="absolute bottom-3 left-3 text-[10px] text-white/90 bg-slate-950/70 border border-white/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 font-mono">
                      SKU: {selectedProduct.sku}
                    </span>
                  </div>
                  
                  {/* Manufacturer guarantee box */}
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-900/20 space-y-2 text-[10px] text-slate-300">
                    <div className="flex items-center gap-1.5 text-primary font-bold uppercase tracking-wider"><Award className="w-3.5 h-3.5" /> Respaldo de Fábrica</div>
                    <p className="leading-relaxed">Garantía oficial extendida de 3 años, soporte en caliente menor a 2 horas y envíos asegurados de origen.</p>
                  </div>
                </div>

                {/* Right Info, Tabs and Actions */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                      {getProductCategory(selectedProduct)}
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-white mt-3 leading-tight">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-1 mt-2 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-text-muted font-normal ml-1">(4.9/5.0 Calidad Certificada)</span>
                    </div>
                  </div>

                  {/* Dynamic Tabs Selectors */}
                  <div className="flex border-b border-white/5 text-xs font-bold uppercase tracking-wider">
                    <button 
                      onClick={() => setActiveTab('specs')}
                      className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      Especificaciones
                    </button>
                    <button 
                      onClick={() => setActiveTab('reviews')}
                      className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      Reseñas ({getReviewsForProduct(selectedProduct.id).length})
                    </button>
                    <button 
                      onClick={() => setActiveTab('logistics')}
                      className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'logistics' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      Envíos y Entregas
                    </button>
                  </div>

                  {/* Tabs Contents */}
                  <div className="min-h-[160px] max-h-[220px] overflow-y-auto pr-2 custom-scrollbar text-xs">
                    
                    {/* Tab 1: Specs */}
                    {activeTab === 'specs' && (
                      <div className="space-y-2 text-slate-300">
                        {getProductSpecs(selectedProduct).map((spec, sidx) => (
                          <div key={sidx} className="flex items-start gap-2 py-0.5">
                            <span className="text-emerald-400 font-extrabold">➔</span>
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 2: Reviews (With live form) */}
                    {activeTab === 'reviews' && (
                      <div className="space-y-4">
                        {/* Add Review Form */}
                        <form 
                          onSubmit={(e) => handleAddReview(e, selectedProduct.id)}
                          className="bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-3"
                        >
                          <span className="font-bold text-white text-[10px] uppercase tracking-wider flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-primary" /> Escribir una reseña del producto</span>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              required
                              placeholder="Nombre (ej. Ing. Carlos Robles)" 
                              value={newReviewName}
                              onChange={e => setNewReviewName(e.target.value)}
                              className="px-3 py-1.5 bg-slate-950 border border-white/5 rounded-lg text-white text-[11px] focus:outline-none"
                            />
                            <input 
                              type="text" 
                              placeholder="Empresa (ej. Pemex Systems)" 
                              value={newReviewCompany}
                              onChange={e => setNewReviewCompany(e.target.value)}
                              className="px-3 py-1.5 bg-slate-950 border border-white/5 rounded-lg text-white text-[11px] focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-text-muted text-[10px] uppercase font-bold">Puntuación:</span>
                            <select 
                              value={newReviewRating}
                              onChange={e => setNewReviewRating(parseInt(e.target.value, 10))}
                              className="bg-slate-950 border border-white/5 rounded-lg text-amber-500 text-xs px-2 py-1 font-bold focus:outline-none"
                            >
                              <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                              <option value="4">⭐⭐⭐⭐ (4/5)</option>
                              <option value="3">⭐⭐⭐ (3/5)</option>
                            </select>
                          </div>

                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              required
                              placeholder="Escribe tu reseña sobre el producto..." 
                              value={newReviewComment}
                              onChange={e => setNewReviewComment(e.target.value)}
                              className="flex-1 px-3 py-2 bg-slate-950 border border-white/5 rounded-lg text-white text-[11px] focus:outline-none"
                            />
                            <button 
                              type="submit" 
                              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              Publicar
                            </button>
                          </div>
                        </form>

                        {/* Reviews list */}
                        <div className="space-y-3">
                          {getReviewsForProduct(selectedProduct.id).map((rev, revIdx) => (
                            <div key={revIdx} className="p-3.5 rounded-xl border border-white/5 bg-slate-900/10 space-y-1.5">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="font-extrabold text-white">{rev.author} <span className="text-primary font-mono ml-1">@{rev.company}</span></span>
                                <span className="text-text-muted font-semibold">{rev.date}</span>
                              </div>
                              <div className="flex text-amber-500 gap-0.5">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-current" />
                                ))}
                              </div>
                              <p className="text-[11px] text-slate-300 leading-relaxed italic">"{rev.comment}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Envíos y Entregas */}
                    {activeTab === 'logistics' && (
                      <div className="space-y-4">
                        {/* SLA Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-xl border border-white/5 bg-slate-900/20 flex items-center gap-2.5">
                            <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                            <div>
                              <span className="text-[9px] text-text-muted font-bold block uppercase">Plazo de Despacho</span>
                              <span className="font-extrabold text-white text-xs">24 - 48 Horas</span>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl border border-white/5 bg-slate-900/20 flex items-center gap-2.5">
                            <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <div>
                              <span className="text-[9px] text-text-muted font-bold block uppercase">Eficiencia de Envío</span>
                              <span className="font-extrabold text-emerald-400 text-xs">99.8% Efectividad</span>
                            </div>
                          </div>
                        </div>

                        {/* Visual Route */}
                        <div className="p-4 rounded-xl border border-white/5 bg-slate-950 space-y-3">
                          <span className="font-bold text-white text-[10px] uppercase tracking-wider block">Ruta de Despacho del Pedido:</span>
                          
                          <div className="flex items-center justify-between text-[9px] text-text-muted font-bold relative px-2">
                            {/* Connector line */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
                            
                            <div className="z-10 bg-slate-950 px-2 py-1 rounded border border-white/5 text-center flex flex-col items-center">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mb-1 animate-ping"></span>
                              <span>ALMACÉN ORIGEN</span>
                              <span className="text-[8px] text-emerald-400">Despacho</span>
                            </div>

                            <div className="z-10 bg-slate-950 px-2 py-1 rounded border border-white/5 text-center flex flex-col items-center">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 mb-1"></span>
                              <span>TECNOTICS CENTRAL</span>
                              <span className="text-[8px] text-blue-400">Distribución</span>
                            </div>

                            <div className="z-10 bg-slate-950 px-2 py-1 rounded border border-white/5 text-center flex flex-col items-center">
                              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 mb-1"></span>
                              <span>TU DIRECCIÓN</span>
                              <span className="text-[8px] text-indigo-400">Entrega Priority</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>

                  {/* Stock Alert Summary */}
                  <div className="space-y-1 bg-slate-900/30 p-3.5 rounded-xl text-xs">
                    <div className="flex justify-between items-center text-[10px] text-text-muted">
                      <span>Existencias en Almacén:</span>
                      <span className={`font-bold ${
                        selectedProduct.inventoryCount > 15 ? 'text-emerald-400' : 'text-rose-400'
                      }`}>{selectedProduct.inventoryCount} unidades disponibles</span>
                    </div>
                  </div>

                  {/* Price and quantity selector row */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wider">Precio del Producto</span>
                      <span className="text-2xl md:text-3xl font-black text-white">${parseFloat(selectedProduct.price).toFixed(2)}</span>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center gap-1.5 bg-slate-900 border border-white/5 px-2 py-1.5 rounded-xl">
                      <button 
                        onClick={() => setModalQuantity(q => Math.max(q - 1, 1))}
                        className="w-8 h-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{modalQuantity}</span>
                      <button 
                        onClick={() => setModalQuantity(q => Math.min(q + 1, selectedProduct.inventoryCount))}
                        className="w-8 h-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Modal action buttons */}
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => {
                        handleAddToCart(selectedProduct, modalQuantity);
                        setSelectedProduct(null);
                        setModalQuantity(1);
                      }}
                      disabled={selectedProduct.inventoryCount <= 0}
                      className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm cursor-pointer"
                    >
                      <ShoppingCart className="w-4.5 h-4.5" /> Añadir al Carrito
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Success Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 glass-panel bg-emerald-950/80 border border-emerald-500/30 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl"
          >
            <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 animate-bounce" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">¡Carrito Actualizado!</h4>
              <p className="text-[11px] text-emerald-300 font-semibold mt-0.5">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Catalog;
