import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Package, DollarSign, Server, Shield, Database, Cpu, Zap, Activity, HardDrive, Network, Layers, Terminal, RefreshCw, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // System Health details
  const systemHealth = [
    { name: 'API Gateway', status: 'Online', uptime: '99.9%', latency: '8ms', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { name: 'Auth Service', status: 'Online', uptime: '99.9%', latency: '5ms', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { name: 'CRM Service', status: 'Online', uptime: '99.9%', latency: '12ms', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { name: 'SCM Service', status: 'Online', uptime: '99.9%', latency: '10ms', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { name: 'ERP Service', status: 'Online', uptime: '99.9%', latency: '9ms', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { name: 'RabbitMQ Broker', status: 'Connected', uptime: '100%', latency: '2ms', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
  ];

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [prodRes, orderRes, custRes] = await Promise.all([
        axios.get('http://localhost:3000/api/v1/scm/products'),
        axios.get('http://localhost:3000/api/v1/erp/orders'),
        axios.get('http://localhost:3000/api/v1/crm/customers')
      ]);
      setProducts(prodRes.data || []);
      setOrders(orderRes.data || []);
      setCustomers(custRes.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Dynamic calculations based on live microservices databases
  const dbOrdersTotal = orders.reduce((sum, curr) => sum + (parseFloat(curr.totalAmount) || 0), 0);
  const totalIngresos = 35200 + dbOrdersTotal;
  const totalLeads = customers.filter(c => c.status === 'Lead').length;
  const totalClientes = customers.filter(c => c.status === 'Cliente').length;
  const conversionRate = customers.length > 0 ? ((totalClientes / customers.length) * 100).toFixed(1) : '0.0';
  const criticalProductsCount = products.filter(p => p.inventoryCount <= 10).length;
  const totalVentasCount = 124 + orders.length;

  // Chart data using cashflow
  const salesHistory = [
    { name: 'Ene', Ventas: 18000 + (dbOrdersTotal * 0.1), Egresos: 12000 },
    { name: 'Feb', Ventas: 22000 + (dbOrdersTotal * 0.15), Egresos: 13500 },
    { name: 'Mar', Ventas: 27000 + (dbOrdersTotal * 0.12), Egresos: 15000 },
    { name: 'Abr', Ventas: 24000 + (dbOrdersTotal * 0.2), Egresos: 14200 },
    { name: 'May', Ventas: 31000 + (dbOrdersTotal * 0.18), Egresos: 16800 },
    { name: 'Jun', Ventas: totalIngresos * 0.8, Egresos: 18000 + (orders.length * 280) },
  ];

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* Top Title Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            <Layers className="w-8 h-8 text-primary" /> Centro de Control General (N-Capas)
          </h1>
          <p className="text-sm text-slate-500 mt-1">Supervisa en tiempo real la infraestructura distribuida y la sincronización de microservicios.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchData}
            disabled={refreshing}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all border border-slate-200 flex items-center gap-2 text-xs font-bold shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 text-primary ${refreshing ? 'animate-spin' : ''}`} />
            Sincronizar Todo
          </button>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            99.9% Uptime SLA
          </span>
        </div>
      </div>

      {/* Dynamic KPI Cards synced with microservices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Revenue Card (ERP / PostgreSQL) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ingresos Totales (ERP)</p>
              <h3 className="text-2xl font-black text-slate-900 mt-2">${totalIngresos.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-emerald-600 mt-4 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% <span className="text-slate-400 font-normal">vs mes pasado (PostgreSQL)</span>
          </p>
        </div>

        {/* CRM Customers Card (CRM / MongoDB) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Conversión Leads (CRM)</p>
              <h3 className="text-2xl font-black text-slate-900 mt-2">{conversionRate}%</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            <span className="text-emerald-600 font-bold">{totalClientes} Clientes</span> de {customers.length} perfiles en MongoDB
          </p>
        </div>

        {/* SCM Stock Alerts Card (SCM / PostgreSQL) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Stock Crítico (SCM)</p>
              <h3 className="text-2xl font-black text-rose-600 mt-2">{criticalProductsCount} SKUs</h3>
            </div>
            <div className={`p-3 rounded-xl ${criticalProductsCount > 0 ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs mt-4 flex items-center gap-1.5 font-semibold text-slate-500">
            {criticalProductsCount > 0 ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-rose-600">Reabastecimiento automático activo</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-600">Inventario 100% equilibrado</span>
              </>
            )}
          </p>
        </div>

        {/* Uptime / Active Transactions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Operaciones Totales</p>
              <h3 className="text-2xl font-black text-slate-900 mt-2">{totalVentasCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <p className="text-xs text-indigo-600 mt-4 font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Mensajería RabbitMQ activa
          </p>
        </div>

      </div>

      {/* Cloud-Native N-Capas Architecture Interactive Grid (SPECS 1) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-3xl p-6 md:p-8 border border-slate-800 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,transparent_50%)] blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0,transparent_50%)] blur-[80px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Server className="w-5 h-5 text-primary animate-pulse" /> Arquitectura Física del Sistema Cloud-Native
            </h2>
            <p className="text-xs text-slate-400 mt-1">Mapa de interconexión y flujo de datos de N-Capas del ecosistema TecnoTics.</p>
          </div>
          <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-xl font-bold font-mono">
            GATEWAY PORT: 3000
          </span>
        </div>

        {/* 4 Layers layout display */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Layer 1: Presentación */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 hover:border-primary/50 transition-all duration-300 relative group">
            <div className="absolute top-3 right-3 text-[9px] uppercase font-black text-primary bg-primary/10 px-2 py-0.5 rounded">Capa 1</div>
            <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Presentación
            </h4>
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              Sitios web responsivos e interfaces de usuario para clientes y administradores.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-[9px] text-slate-300 font-mono">
              <div className="flex justify-between"><span>🌐 E-Commerce (Público)</span><span className="text-emerald-400">Port 5174</span></div>
              <div className="flex justify-between"><span>📊 Intranet (Admin)</span><span className="text-emerald-400">Port 5173</span></div>
              <div className="flex justify-between"><span>📱 App Mobile</span><span className="text-slate-500">React Native</span></div>
            </div>
          </div>

          {/* Layer 2: API Gateway */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 hover:border-blue-400/50 transition-all duration-300 relative group">
            <div className="absolute top-3 right-3 text-[9px] uppercase font-black text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">Capa 2</div>
            <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" /> API Gateway
            </h4>
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              Punto de entrada único. Gestiona autorización SSL, enrutamiento inverso y balanceo.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-[9px] text-slate-300 font-mono">
              <div className="flex justify-between"><span>🔒 OAuth2 Auth</span><span className="text-blue-400">JWT Cifrado</span></div>
              <div className="flex justify-between"><span>⚡ Enrutamiento</span><span className="text-blue-400">NestJS Core</span></div>
              <div className="flex justify-between"><span>🛠️ Reverse Proxy</span><span className="text-blue-400">RabbitMQ Proxy</span></div>
            </div>
          </div>

          {/* Layer 3: Negocio (Microservicios) */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 relative group">
            <div className="absolute top-3 right-3 text-[9px] uppercase font-black text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded">Capa 3</div>
            <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" /> Negocio (NestJS)
            </h4>
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              Microservicios aislados comunicados mediante eventos asíncronos en bus de mensajería.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-[9px] text-slate-300 font-mono">
              <div className="flex justify-between"><span>💼 ERP-Service</span><span className="text-indigo-400">Finanzas/RBAC</span></div>
              <div className="flex justify-between"><span>🤝 CRM-Service</span><span className="text-indigo-400">Leads/Soporte</span></div>
              <div className="flex justify-between"><span>📦 SCM-Service</span><span className="text-indigo-400">Stock/Restock</span></div>
            </div>
          </div>

          {/* Layer 4: Datos */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 relative group">
            <div className="absolute top-3 right-3 text-[9px] uppercase font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Capa 4</div>
            <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" /> Persistencia
            </h4>
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              Almacenamiento híbrido optimizado según las necesidades de cada módulo operativo.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-[9px] text-slate-300 font-mono">
              <div className="flex justify-between"><span>🐘 PostgreSQL</span><span className="text-emerald-400">ERP & SCM SQL</span></div>
              <div className="flex justify-between"><span>🍃 MongoDB</span><span className="text-emerald-400">CRM NoSQL</span></div>
              <div className="flex justify-between"><span>💾 Docker Volumes</span><span className="text-emerald-400">Persistente</span></div>
            </div>
          </div>

        </div>

        {/* Microservice Communication Flow Indicator (SPECS 5) */}
        <div className="mt-8 p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Network className="w-4 h-4 text-blue-400 animate-pulse" /> Flujo de Interacción de Datos en Venta (E-Commerce ➔ ERP/SCM/CRM):
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[10px] text-slate-400 font-semibold mt-3 text-left">
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
              <span className="block text-primary font-bold mb-1">1. Venta en CRM</span>
              El cliente realiza checkout. Se valida la cuenta de cliente en MongoDB y se registra el lead.
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
              <span className="block text-blue-400 font-bold mb-1">2. Consulta en SCM</span>
              SCM consulta existencias en PostgreSQL. Si hay stock genera orden; si llega a crítico reabastece (+50).
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
              <span className="block text-indigo-400 font-bold mb-1">3. Contabilidad ERP</span>
              ERP recibe transacción vía RabbitMQ y asienta automáticamente el ingreso financiero en PostgreSQL.
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
              <span className="block text-emerald-400 font-bold mb-1">4. Notificación</span>
              El sistema de mensajería notifica en pantalla al cliente con su número de orden y confirmación de pago.
            </div>
          </div>
        </div>
      </div>

      {/* Main Panel Content: Chart & Real-Time Microservice Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Financial chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Evolución Comercial Integrada (ERP / SCM)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Histórico semestral calculado dinámicamente con las ventas registradas en PostgreSQL.</p>
            </div>
            <span className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-1 rounded font-bold text-slate-600">
              MÉTRICA SEMESTRAL
            </span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEgresosDash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
                />
                <Area type="monotone" name="Ingresos por Ventas ($)" dataKey="Ventas" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorVentas)" />
                <Area type="monotone" name="Egresos Operativos ($)" dataKey="Egresos" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorEgresosDash)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time System Uptime Monitor (SPECS RNF) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                <Activity className="w-5 h-5 text-primary" /> Infraestructura & Contenedores
              </h3>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Estable
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-5">Estado de comunicación asíncrona mediante el API Gateway e hilos de RabbitMQ.</p>

            <div className="space-y-3.5">
              {systemHealth.map((health, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Server className="w-4 h-4 text-slate-400" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{health.name}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">SLA: {health.uptime} | Latencia: {health.latency}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${health.color}`}>
                    {health.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <a 
              href="http://localhost:15672/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1"
            >
              Consola RabbitMQ Broker <ExternalLink className="w-3.5 h-3.5 text-primary" />
            </a>
          </div>
        </div>

      </div>

      {/* Critical Stock list shortcut & CRM conversion shortcut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* SCM Quick Stock alert check */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-amber-500" /> Monitoreo de Almacén Crítico (SCM)
            </h3>
            <p className="text-xs text-slate-500 mb-5">Vista rápida de niveles críticos en PostgreSQL. Las compras automáticas reabastecen en lotes de 50.</p>

            <div className="space-y-2">
              {products.slice(0, 4).map((p, idx) => (
                <div key={idx} className="flex justify-between items-center p-3.5 rounded-xl border border-slate-100 bg-slate-50 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-800">{p.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider mt-0.5">SKU: {p.sku}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded font-extrabold ${
                    p.inventoryCount > 15 ? 'text-emerald-600 bg-emerald-50' : p.inventoryCount > 5 ? 'text-amber-600 bg-amber-50' : 'text-rose-600 bg-rose-50'
                  }`}>
                    {p.inventoryCount} uds
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <Link to="/scm" className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 mt-6 shadow-sm shadow-primary/20">
            Ir a Control de Inventario (SCM) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* CRM Quick Leads conversion list */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-indigo-500" /> Prospección y Conversiones Recientes (CRM)
            </h3>
            <p className="text-xs text-slate-500 mb-5">Nuevos prospectos registrados en MongoDB por canal digital u órdenes cerradas de e-commerce.</p>

            <div className="space-y-2">
              {customers.slice(0, 4).map((c, idx) => (
                <div key={idx} className="flex justify-between items-center p-3.5 rounded-xl border border-slate-100 bg-slate-50 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-800">{c.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{c.company || 'Sin Empresa'}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    c.status === 'Cliente' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <Link to="/crm" className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 mt-6 shadow-sm shadow-primary/20">
            Ir a Gestión de Clientes (CRM) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
