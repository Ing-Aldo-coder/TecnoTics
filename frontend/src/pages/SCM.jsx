import { useState, useEffect } from 'react';
import { Package, Plus, Loader2, AlertTriangle, Truck, MapPin, CheckCircle, RefreshCw, Star, Phone, ShieldAlert, Award, Grid, Database, Settings } from 'lucide-react';
import axios from 'axios';

const SCM = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', sku: '', price: '', inventoryCount: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restockingId, setRestockingId] = useState(null);

  // Warehouses state (SPECS Gestión de Almacenes)
  const [activeWarehouse, setActiveWarehouse] = useState('central');
  const warehouses = {
    central: { name: 'Almacén Central (CDMX)', capacity: '5,000 uds', usage: 64, address: 'Parque Industrial Vallejo, Nave B', status: 'Operativo al 100%' },
    norte: { name: 'Almacén Sucursal Norte (Mty)', capacity: '2,500 uds', usage: 38, address: 'Col. Industrial Apodaca, Lote 12', status: 'Estable' },
    sur: { name: 'Almacén Sucursal Sur (Gdl)', capacity: '2,500 uds', usage: 19, address: 'Parque de Carga El Salto, Nave 4', status: 'Capacidad Holgada' }
  };

  // Logistics Routes (SPECS Gestión de Rutas)
  const [activeRoute, setActiveRoute] = useState('aerea');
  const logisticsRoutes = {
    aerea: { 
      name: 'Ruta Aérea Asia-CDMX (Express)', 
      carrier: 'AsiaLogistics Premium Cargo', 
      eta: '3 días hábiles',
      nodes: ['Puerto de Shenzhen', 'Aduana Internacional', 'Hub CDMX', 'Almacén Central'],
      mapPath: 'M 20 40 Q 100 10 180 40',
      status: 'Prioritario' 
    },
    terrestre: { 
      name: 'Ruta Terrestre Norte (Monterrey-CDMX)', 
      carrier: 'FedEx Freight Nacional', 
      eta: '2 días hábiles',
      nodes: ['Almacén Apodaca', 'Caseta Querétaro', 'Distribución Vallejo', 'Almacén Central'],
      mapPath: 'M 20 50 Q 80 60 180 40',
      status: 'Tránsito Estable' 
    },
    maritima: { 
      name: 'Ruta Marítima Comercial (Asia-Manzanillo)', 
      carrier: 'Maersk Line Maritime', 
      eta: '18 días hábiles',
      nodes: ['Puerto de Ningbo', 'Océano Pacífico', 'Aduana Manzanillo', 'Almacén Central'],
      mapPath: 'M 20 60 Q 90 20 180 40',
      status: 'Consolidando Carga' 
    }
  };

  // Active Shipment list linked to routes
  const [shipments, setShipments] = useState([
    { id: 'SHP-9021', routeKey: 'aerea', product: 'Memoria RAM DDR5 Corsair', qty: 100, step: 2, status: 'En Tránsito (Aduana)' },
    { id: 'SHP-4402', routeKey: 'terrestre', product: 'MacBook Pro 16" M3', qty: 12, step: 3, status: 'Reparto Local' },
    { id: 'SHP-1288', routeKey: 'maritima', product: 'Microprocesadores Intel i9', qty: 50, step: 1, status: 'Procesamiento en Puerto' },
  ]);

  // Suppliers Directory with Supplies Catalog (SPECS Catálogo de Insumos)
  const suppliers = [
    { 
      name: 'TechSupplier Inc', 
      contact: 'Alice Vance', 
      email: 'orders@techsupplier.com', 
      phone: '1-800-SUPPLY', 
      rating: 4.9, 
      punctuality: '99.4%', 
      type: 'Chips & Memorias',
      catalog: [
        { name: 'Memorias RAM DDR5 64GB', price: '$145.00', minQty: '20 uds' },
        { name: 'Unidad SSD M.2 4TB Pro', price: '$180.00', minQty: '10 uds' },
        { name: 'Tarjetas Base Server', price: '$350.00', minQty: '5 uds' }
      ]
    },
    { 
      name: 'GlobalElectronics Ltd', 
      contact: 'Roberto Gómez', 
      email: 'roberto@globalelectronics.com', 
      phone: '+52 55 4310-99', 
      rating: 4.7, 
      punctuality: '97.8%', 
      type: 'Laptops & Pantallas',
      catalog: [
        { name: 'Laptops Core i7 16"', price: '$650.00', minQty: '5 uds' },
        { name: 'Monitores Curved 32"', price: '$380.00', minQty: '5 uds' },
        { name: 'Pantalla OLED 45"', price: '$820.00', minQty: '2 uds' }
      ]
    },
    { 
      name: 'AsiaLogistics Group', 
      contact: 'Chen Wey', 
      email: 'chen.w@asialogistics.cn', 
      phone: '+86 21 8831', 
      rating: 4.8, 
      punctuality: '98.5%', 
      type: 'Servicios Logísticos',
      catalog: [
        { name: 'Flete Aéreo Express', price: '$1,500.00', minQty: 'Fijo' },
        { name: 'Estiba Contenedor Completo', price: '$2,200.00', minQty: 'Fijo' },
        { name: 'Despacho Aduanal', price: '$800.00', minQty: 'Fijo' }
      ]
    },
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

  // Filter products visually based on active warehouse selector
  const getWarehouseStock = (pId, idx) => {
    // Distribute stock dynamically for display based on warehouse to show "Gestión de Almacenes"
    if (activeWarehouse === 'central') {
      return Math.round(products[idx]?.inventoryCount * 0.6) || 0;
    } else if (activeWarehouse === 'norte') {
      return Math.round(products[idx]?.inventoryCount * 0.25) || 0;
    } else {
      return Math.round(products[idx]?.inventoryCount * 0.15) || 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">SCM - Inventarios y Cadena de Suministro</h1>
          <p className="text-sm text-slate-500 mt-1">Supervisa múltiples almacenes, evalúa insumos de proveedores y gestiona rutas logísticas en la nube.</p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            PostgreSQL Sync Active
          </span>
        </div>
      </div>

      {/* SCM Multi-Warehouse selector cards (SPECS Gestión de Almacenes) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Grid className="w-5 h-5 text-primary" /> Panel de Gestión de Almacenes Físicos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(warehouses).map(([key, wh]) => {
            const isActive = activeWarehouse === key;
            return (
              <button
                key={key}
                onClick={() => setActiveWarehouse(key)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-[160px] outline-none ${
                  isActive 
                  ? 'border-primary bg-indigo-50/20 shadow-md ring-2 ring-primary/20' 
                  : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                      isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {key === 'central' ? 'Sede Central' : 'Sucursal'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold font-mono">{wh.capacity} Capacidad</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-2.5">{wh.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{wh.address}</p>
                </div>

                {/* Utilization gauge bar */}
                <div className="w-full mt-4">
                  <div className="flex justify-between items-center text-[10px] font-bold mb-1">
                    <span className="text-slate-400">Ocupación Almacén</span>
                    <span className={wh.usage > 60 ? 'text-amber-600' : 'text-emerald-600'}>{wh.usage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-[1px] border border-slate-200/50 flex items-center">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        wh.usage > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${wh.usage}%` }}
                    ></div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SCM KPI Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Modelos (SKUs)</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{products.length}</h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-primary" /> Catálogo en base de datos
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Existencias Totales</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">{totalStockItems} u</h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-500" /> Disponible consolidado
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">SKUs con Stock Bajo</p>
          <h3 className="text-3xl font-black text-rose-600 mt-2">{criticalProducts.length}</h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Requieren reabastecimiento
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Despachos Logísticos</p>
          <h3 className="text-3xl font-black text-amber-600 mt-2">{shipments.length}</h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
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
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm outline-none"
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
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Agregar Producto
            </h2>
            <p className="text-xs text-slate-500 mb-5">Incorpora nuevos SKUs y existencias iniciales al catálogo PostgreSQL.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Nombre Comercial</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 text-sm transition-all outline-none" placeholder="Laptop Pro Gamer" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">SKU Código Único</label>
                <input type="text" required value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 text-sm transition-all outline-none" placeholder="LP-PRO-001" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Precio Unitario ($)</label>
                <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 text-sm transition-all outline-none" placeholder="1299.99" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Existencias Iniciales</label>
                <input type="number" required value={formData.inventoryCount} onChange={e => setFormData({...formData, inventoryCount: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 text-sm transition-all outline-none" placeholder="100" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full mt-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-indigo-700 transition-all duration-300 flex justify-center items-center gap-2 shadow-sm shadow-primary/30 outline-none">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar en Inventario'}
              </button>
            </form>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
            <span className="font-bold text-slate-700 block mb-1">📦 Proveedor por Defecto:</span>
            Los reabastecimientos automáticos del e-commerce se despachan desde <span className="text-indigo-600 font-bold">"TechSupplier Inc"</span> en lotes de 50 unidades.
          </div>
        </div>

        {/* Right: SCM Inventory Catalog Table with Warehouse Stock distribution (SPECS Gestión de Almacenes) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" /> Inventario en {warehouses[activeWarehouse].name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">Balanza de stock físico sincronizada con la base de datos relacional de PostgreSQL.</p>
            </div>
            <button onClick={fetchProducts} className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
              ➔ Sincronizar Existencias
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-2xl">
              No hay productos registrados en el inventario. Agrega uno o realiza la sincronización de la base de datos.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Producto</th>
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">SKU</th>
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Precio Unitario</th>
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Stock Local</th>
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Global</th>
                    <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {products.map((p, i) => {
                    const localStock = getWarehouseStock(p.id, i);
                    return (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4 font-semibold text-slate-900">{p.name}</td>
                        <td className="py-4 px-4 font-bold font-mono text-slate-500">{p.sku}</td>
                        <td className="py-4 px-4 text-slate-600 font-semibold">${parseFloat(p.price).toFixed(2)}</td>
                        <td className="py-4 px-4 font-extrabold">
                          <span className={`px-2 py-0.5 rounded ${
                            localStock > 10 ? 'text-emerald-700 bg-emerald-50' : localStock > 3 ? 'text-amber-700 bg-amber-50' : 'text-rose-700 bg-rose-50 animate-pulse'
                          }`}>
                            📍 {localStock} uds
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            p.inventoryCount > 15 
                            ? 'bg-slate-50 text-slate-700 border border-slate-100' 
                            : 'bg-red-50 text-red-700 border border-red-100'
                          }`}>
                            📦 {p.inventoryCount} total
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button 
                            onClick={() => handleRestock(p, 50)}
                            disabled={restockingId === p.id}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-primary hover:text-white rounded-lg text-[10px] font-bold text-slate-800 transition-all inline-flex items-center gap-1 border border-slate-200 outline-none"
                          >
                            {restockingId === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                            +50 restock
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Directory of Suppliers & Active Route Tracking Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Suppliers Directory with Supplies Catalog breakdown (SPECS Catálogo de Insumos) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm md:col-span-2">
          <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> Proveedores Homologados e Insumos
          </h3>
          <p className="text-xs text-slate-500 mb-5">Socios comerciales certificados integrados en la cadena con su catálogo completo de insumos.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suppliers.map((sup, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/5 uppercase tracking-wider">{sup.type}</span>
                    <div className="flex items-center text-amber-500 gap-0.5 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" /> {sup.rating}
                    </div>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mt-2.5">{sup.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">Contacto: <span className="text-slate-800 font-semibold">{sup.contact}</span></p>
                  
                  {/* Supplies Catalog mapping */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60">
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block mb-1.5">Catalogo de Insumos</span>
                    <div className="space-y-1">
                      {sup.catalog.map((ins, insIdx) => (
                        <div key={insIdx} className="flex justify-between items-center text-[10px] bg-white p-1.5 rounded border border-slate-100 font-medium">
                          <span className="text-slate-700 truncate max-w-[130px]">🛠️ {ins.name}</span>
                          <span className="text-primary font-bold">{ins.price} <span className="text-[8px] text-slate-400">({ins.minQty})</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Puntualidad de Entrega:</span>
                  <span className="font-extrabold text-emerald-600">{sup.punctuality}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logistics Shipping Tracking & Route Management (SPECS Gestión de Rutas y Mapas) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-500" /> Despachos & Gestión de Rutas
            </h3>
            <p className="text-xs text-slate-500 mb-4">Selecciona y configura la ruta logística activa para ver el progreso logístico.</p>

            {/* Route Selector (SPECS Gestión de Rutas) */}
            <div className="mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200/50">
              <label className="block text-[9px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Ruta de Transporte Activa</label>
              <div className="grid grid-cols-3 gap-1">
                {Object.keys(logisticsRoutes).map(rk => (
                  <button
                    key={rk}
                    onClick={() => setActiveRoute(rk)}
                    className={`py-1.5 text-[9px] font-black rounded-lg uppercase tracking-wider transition-all outline-none ${
                      activeRoute === rk 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {rk === 'aerea' ? '✈️ Aérea' : rk === 'terrestre' ? '🚚 Terr.' : '🛳️ Marít.'}
                  </button>
                ))}
              </div>
              <div className="mt-2.5 text-[10px] text-slate-600 space-y-0.5 font-medium leading-relaxed">
                <div><span className="font-bold text-slate-800">Ruta:</span> {logisticsRoutes[activeRoute].name}</div>
                <div><span className="font-bold text-slate-800">Transporte:</span> {logisticsRoutes[activeRoute].carrier}</div>
                <div><span className="font-bold text-slate-800">Tiempo de Entrega (ETA):</span> {logisticsRoutes[activeRoute].eta}</div>
              </div>
            </div>

            {/* Shipping tracking list filtered by selected route or showcasing steps */}
            <div className="space-y-3">
              {shipments.map((shp) => {
                const isSelectedRoute = shp.routeKey === activeRoute;
                return (
                  <div key={shp.id} className={`p-3 rounded-xl border transition-all ${
                    isSelectedRoute ? 'border-primary/40 bg-indigo-50/10' : 'border-slate-100 bg-slate-50'
                  }`}>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-800">{shp.id}</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider ${
                        isSelectedRoute ? 'text-primary' : 'text-slate-500'
                      }`}>{shp.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 font-semibold">{shp.product} (x{shp.qty} uds)</p>
                    
                    {/* Visual pipeline progress dots */}
                    <div className="flex items-center justify-between mt-3 px-1">
                      {logisticsRoutes[shp.routeKey].nodes.map((node, stepIdx) => {
                        const step = stepIdx + 1;
                        return (
                          <div key={stepIdx} className="flex items-center flex-1 last:flex-initial" title={node}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                              step <= shp.step ? 'bg-primary text-white animate-pulse' : 'bg-slate-200 text-slate-500'
                            }`}>
                              {step}
                            </div>
                            {step < 4 && (
                              <div className={`h-1 flex-1 mx-1.5 rounded ${
                                step < shp.step ? 'bg-primary' : 'bg-slate-200'
                              }`}></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            {/* Visual SVG animated map mockup updating with active route (SPECS Mapa de Envíos) */}
            <div className="h-28 w-full bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-45"></div>
              
              {/* Route line updating depending on activeRoute state */}
              <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 200 80">
                <path 
                  d={logisticsRoutes[activeRoute].mapPath} 
                  fill="transparent" 
                  stroke={activeRoute === 'aerea' ? '#818cf8' : activeRoute === 'terrestre' ? '#fbbf24' : '#34d399'} 
                  strokeWidth="2.5" 
                  strokeDasharray="4 4" 
                  className="animate-[dash_8s_linear_infinite]" 
                />
                
                {/* Dots representing node */}
                <circle cx="20" cy="40" r="4.5" fill="#10b981" />
                <circle cx="180" cy="40" r="4.5" fill="#3b82f6" />
              </svg>

              <div className="absolute left-1.5 bottom-1.5 text-[8px] text-emerald-400 font-bold flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> Origen</div>
              <div className="absolute right-1.5 bottom-1.5 text-[8px] text-blue-400 font-bold flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> CDMX</div>
              
              <div className="z-10 text-center pointer-events-none">
                <span className="text-[10px] text-slate-100 font-bold block">Rastreador de Ruta Activa</span>
                <span className="text-[8px] text-slate-400 font-mono tracking-wide uppercase">{logisticsRoutes[activeRoute].name}</span>
                <div className="flex gap-2 justify-center mt-1 text-[7px] text-slate-400 font-bold">
                  <span>📍 Nodo: {logisticsRoutes[activeRoute].nodes[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SCM;
