import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

const salesData = [
  { name: 'Ene', sales: 4000, expenses: 2400 },
  { name: 'Feb', sales: 3000, expenses: 1398 },
  { name: 'Mar', sales: 2000, expenses: 9800 },
  { name: 'Abr', sales: 2780, expenses: 3908 },
  { name: 'May', sales: 1890, expenses: 4800 },
  { name: 'Jun', sales: 2390, expenses: 3800 },
  { name: 'Jul', sales: 3490, expenses: 4300 },
];

const kpiData = [
  { title: 'Ingresos Mensuales', value: '$45,231.89', change: '+20.1%', icon: DollarSign, trend: 'up' },
  { title: 'Nuevos Clientes (CRM)', value: '+2,350', change: '+180.1%', icon: Users, trend: 'up' },
  { title: 'Stock Bajo (SCM)', value: '12', change: '-2 items', icon: Package, trend: 'down' },
  { title: 'Ventas Activas', value: '+12,234', change: '+19%', icon: TrendingUp, trend: 'up' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Dashboard General</h1>
          <p className="text-sm text-text-muted mt-1">Resumen del negocio y métricas clave en tiempo real.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm shadow-primary/30">
          Descargar Reporte (PDF)
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-text-muted">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-text-main mt-2">{kpi.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${kpi.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {kpi.change}
              </span>
              <span className="text-sm text-text-muted">vs mes pasado</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-text-main mb-6">Resumen Financiero (ERP)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-text-main mb-6">Top Productos (SCM)</h3>
          <div className="space-y-4">
            {[
              { name: 'MacBook Pro 16"', stock: 45, status: 'Normal' },
              { name: 'iPhone 15 Pro Max', stock: 12, status: 'Bajo' },
              { name: 'Monitor Dell 32"', stock: 8, status: 'Crítico' },
              { name: 'Teclado Mecánico', stock: 156, status: 'Normal' },
            ].map((prod, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-main">{prod.name}</h4>
                    <p className="text-xs text-text-muted">{prod.stock} en stock</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                  prod.status === 'Normal' ? 'bg-emerald-50 text-emerald-600' :
                  prod.status === 'Bajo' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                }`}>
                  {prod.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors">
            Ver Inventario Completo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
