import { useState, useEffect } from 'react';
import { Package, Plus, Loader2, AlertTriangle, Truck, MapPin, CheckCircle, RefreshCw, Star, Phone, ShieldAlert, Award } from 'lucide-react';
import axios from 'axios';

const SCM = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', sku: '', price: '', inventoryCount: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restockingId, setRestockingId] = useState(null);

  // Active Shipment list
  const [shipments, setShipments] = useState([
    { id: 'SHP-9021', route: 'TechSupplier Inc ➔ Almacén Central', product: 'Memoria RAM DDR5', qty: 100, step: 2, status: 'En Tránsito (Aduana)' },
    { id: 'SHP-4402', route: 'GlobalElectronics Ltd ➔ Sucursal Norte', product: 'MacBook Pro 16"', qty: 12, step: 3, status: 'Reparto Local' },
    { id: 'SHP-1288', route: 'AsiaLogistics Group ➔ Almacén Central', product: 'Microprocesadores Intel i9', qty: 50, step: 1, status: 'Procesamiento en Puerto' },
  ]);

  // Suppliers Directory
  const suppliers = [
    { name: 'TechSupplier Inc', contact: 'Alice Vance', email: 'orders@techsupplier.com', phone: '1-800-SUPPLY', rating: 4.9, punctuality: '99.4%', type: 'Chips & Memorias' },
    { name: 'GlobalElectronics Ltd', contact: 'Roberto Gómez', email: 'roberto@globalelectronics.com', phone: '+52 55 4310-99', rating: 4.7, punctuality: '97.8%', type: 'Laptops & Pantallas' },
    { name: 'AsiaLogistics Group', contact: 'Chen Wey', email: 'chen.w@asialogistics.cn', phone: '+86 21 8831', rating: 4.8, punctuality: '98.5%', type: 'Logística de Importación' },
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3000/api/v1/scm/products', {
        ...formData,
        price: parseFloat(formData.price),
        inventoryCount: parseInt(formData.inventoryCount, 10)
      });
      setFormData({ name: '', sku: '', price: '', inventoryCount: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestock = async (product, amount = 50) => {
    setRestockingId(product.id);
    try {
      await axios.post('http://localhost:3000/api/v1/scm/products', {
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: parseFloat(product.price),
        inventoryCount: (parseInt(product.inventoryCount, 10) || 0) + amount
      });
      fetchProducts();
    } catch (error) {
      console.error('Error restocking product:', error);
    } finally {
      setRestockingId(null);
    }
  };

  // Find critical items (stock <= 10)
  const criticalProducts = products.filter(p => p.inventoryCount <= 10);
  const totalStockItems = products.reduce((acc, curr) => acc + (parseInt(curr.inventoryCount, 10) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-main">SCM - Control de Inventario y Cadena de Suministro</h1>
          <p className="text-sm text-text-muted mt-1">Monitorea niveles de stock, realiza compras automáticas a proveedores y rastrea despachos logísticos.</p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            PostgreSQL Sync Active
          </span>
        </div>
      </div>

      {/* SCM KPI Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Total Modelos (SKUs)</p>
          <h3 className="text-3xl font-black text-text-main mt-2">{products.length}</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-primary" /> Productos registrados en catálogo
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Existencias Totales</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">{totalStockItems} u</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-500" /> Unidades disponibles en almacén
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted">SKUs con Stock Bajo</p>
          <h3 className="text-3xl font-black text-rose-600 mt-2">{criticalProducts.length}</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Menos de 10 unidades disponibles
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Despachos Logísticos</p>
          <h3 className="text-3xl font-black text-amber-600 mt-2">{shipments.length}</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-amber-500" /> Envíos activos en ruta
          </p>
        </div>
      </div>

      {/* Critical Stock Alerts Banner */}
      {criticalProducts.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-5 border border-red-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-800">¡Alerta de Inventario Crítico!</h3>
              <p className="text-xs text-red-700 mt-0.5">Existen {criticalProducts.length} productos con existencias por debajo del límite de seguridad. Pueden ocurrir quiebres de stock.</p>
            </div>
          </div>
          <div className="flex gap-2">
            {criticalProducts.slice(0, 2).map((prod) => (
              <button 
                key={prod.id} 
                onClick={() => handleRestock(prod, 50)}
                disabled={restockingId === prod.id}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                {restockingId === prod.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                Reabastecer {prod.sku} (+50)
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Form & Inventory Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Product Creation Form */}
        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-main mb-1 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Agregar Producto
            </h2>
            <p className="text-xs text-text-muted mb-5">Incorpora nuevos SKUs y existencias iniciales al catálogo PostgreSQL.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1">Nombre Comercial</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-background border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main text-sm transition-all" placeholder="Laptop Pro Gamer" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1">SKU Código Único</label>
                <input type="text" required value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full px-4 py-2.5 bg-background border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main text-sm transition-all" placeholder="LP-PRO-001" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1">Precio Unitario ($)</label>
                <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2.5 bg-background border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main text-sm transition-all" placeholder="1299.99" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1">Existencias Iniciales</label>
                <input type="number" required value={formData.inventoryCount} onChange={e => setFormData({...formData, inventoryCount: e.target.value})} className="w-full px-4 py-2.5 bg-background border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main text-sm transition-all" placeholder="100" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full mt-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all duration-300 flex justify-center items-center gap-2 shadow-sm shadow-primary/30">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar en Inventario'}
              </button>
            </form>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-text-muted">
            <span className="font-bold text-text-main block mb-1">📦 Proveedor por Defecto:</span>
            Los reabastecimientos automáticos del e-commerce se despachan desde <span className="text-indigo-600 font-bold">"TechSupplier Inc"</span> en lotes de 50 unidades.
          </div>
        </div>

        {/* Right: SCM Inventory Catalog Table */}
        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" /> Almacén Central - Existencias
              </h2>
              <p className="text-xs text-text-muted mt-1">Inventario físico enlazado a la base de datos relacional de PostgreSQL.</p>
            </div>
            <button onClick={fetchProducts} className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
              ➔ Sincronizar Existencias
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-text-muted border border-dashed border-slate-200 rounded-2xl">
              No hay productos registrados en el inventario. Agrega uno o realiza la sincronización de la base de datos.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">Producto</th>
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">SKU</th>
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">Precio</th>
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">Stock Disponible</th>
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-text-muted text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 text-sm font-semibold text-text-main">{p.name}</td>
                      <td className="py-4 px-4 text-sm text-text-muted font-bold font-mono">{p.sku}</td>
                      <td className="py-4 px-4 text-sm text-text-muted font-semibold">${parseFloat(p.price).toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          p.inventoryCount > 15 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : p.inventoryCount > 5
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            p.inventoryCount > 15 ? 'bg-emerald-500' : p.inventoryCount > 5 ? 'bg-amber-500' : 'bg-red-500 animate-ping'
                          }`}></span>
                          {p.inventoryCount} unidades
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => handleRestock(p, 50)}
                          disabled={restockingId === p.id}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-primary hover:text-white rounded-lg text-xs font-bold text-text-main transition-all inline-flex items-center gap-1.5 border border-slate-200"
                        >
                          {restockingId === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                          Reabastecer +50
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Directory of Suppliers & Active Route Tracking Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Suppliers Directory (Left 2 Columns) */}
        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm md:col-span-2">
          <h3 className="text-xl font-bold text-text-main mb-1 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" /> Directorio de Proveedores Homologados
          </h3>
          <p className="text-xs text-text-muted mb-5">Socios comerciales certificados integrados en la cadena de reabastecimiento automático.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suppliers.map((sup, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-full bg-primary/5 uppercase tracking-wider">{sup.type}</span>
                    <div className="flex items-center text-amber-500 gap-0.5 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" /> {sup.rating}
                    </div>
                  </div>
                  <h4 className="text-base font-extrabold text-text-main mt-2.5">{sup.name}</h4>
                  <p className="text-xs text-text-muted mt-1">Contacto: <span className="text-text-main font-semibold">{sup.contact}</span></p>
                  
                  <div className="text-xs text-text-muted space-y-1 mt-4">
                    <p className="flex items-center gap-1.5">📧 {sup.email}</p>
                    <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {sup.phone}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center text-xs">
                  <span className="text-text-muted">Efectividad Logística:</span>
                  <span className="font-extrabold text-emerald-600">{sup.punctuality}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Logistics Shipping Tracking (Right 1 Column) */}
        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-text-main mb-1 flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-500" /> Rastreo de Despachos Activos
            </h3>
            <p className="text-xs text-text-muted mb-4">Rastreo de envíos en tránsito y aduana.</p>

            <div className="space-y-4">
              {shipments.map((shp) => (
                <div key={shp.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-text-main">{shp.id}</span>
                    <span className="text-primary text-[10px] font-black uppercase tracking-wider">{shp.status}</span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">{shp.route}</p>
                  <p className="text-xs text-text-main font-bold mt-1">{shp.product} (x{shp.qty} uds)</p>
                  
                  {/* Visual pipeline progress dots */}
                  <div className="flex items-center justify-between mt-3 px-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center flex-1 last:flex-initial">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                          step <= shp.step ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {step}
                        </div>
                        {step < 4 && (
                          <div className={`h-1 flex-1 mx-1.5 rounded ${
                            step < shp.step ? 'bg-primary' : 'bg-slate-200'
                          }`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            {/* Visual SVG animated map mockup */}
            <div className="h-28 w-full bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-45"></div>
              
              {/* Route line */}
              <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 200 80">
                <path d="M 20 40 Q 100 10 180 40" fill="transparent" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_5s_linear_infinite]" />
                
                {/* Dots representing node */}
                <circle cx="20" cy="40" r="4" fill="#10b981" />
                <circle cx="180" cy="40" r="4" fill="#3b82f6" />
              </svg>

              <div className="absolute left-1.5 bottom-1.5 text-[8px] text-emerald-400 font-bold flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> Proveedor</div>
              <div className="absolute right-1.5 bottom-1.5 text-[8px] text-blue-400 font-bold flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> Central</div>
              
              <div className="z-10 text-center">
                <span className="text-[10px] text-slate-300 font-bold block mb-1">Ruta Logística Aérea Activa</span>
                <span className="text-[9px] text-slate-500 font-mono">Lat: 19.4326 | Lon: -99.1332</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SCM;
