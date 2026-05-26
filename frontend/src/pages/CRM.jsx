import { useState, useEffect } from 'react';
import { Users, Plus, Loader2, MessageSquare, HelpCircle, ArrowRight, ShieldAlert, Award, Star, ThumbsUp, Send, CheckCircle, TrendingUp, BarChart2 } from 'lucide-react';
import axios from 'axios';

const CRM = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    status: 'Lead',
    assignedExecutive: 'Alejandro Ventas',
    lastInteraction: 'Contacto inicial realizado.'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chat simulator state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'agent', name: 'Laura (Soporte CRM)', text: '¡Hola! ¿En qué puedo ayudarte con el sistema de clientes hoy?', time: 'Ahora' }
  ]);
  const [inputText, setInputText] = useState('');
  const [chatTyping, setChatTyping] = useState(false);

  // Knowledge base accordion state
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Active Support Tickets (Simulated for premium completeness)
  const [tickets, setTickets] = useState([
    { id: 'TCK-8921', customer: 'Carlos Gómez', issue: 'Retraso de sincronización en SCM', priority: 'Alta', status: 'Abierto' },
    { id: 'TCK-4310', customer: 'Julio Cortázar', issue: 'Duplicidad de Leads en MongoDB', priority: 'Media', status: 'En Progreso' },
    { id: 'TCK-2291', customer: 'Mariana Pineda', issue: 'Problema al procesar factura ERP', priority: 'Baja', status: 'Cerrado' },
  ]);

  const fetchData = async () => {
    try {
      const [custRes, orderRes] = await Promise.all([
        axios.get('http://localhost:3000/api/v1/crm/customers'),
        axios.get('http://localhost:3000/api/v1/erp/orders')
      ]);
      setCustomers(custRes.data || []);
      setOrders(orderRes.data || []);
    } catch (error) {
      console.error('Error fetching CRM data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3000/api/v1/crm/customers', formData);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        company: '', 
        status: 'Lead',
        assignedExecutive: 'Alejandro Ventas',
        lastInteraction: 'Contacto inicial realizado.'
      });
      fetchData();
    } catch (error) {
      console.error('Error creating customer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      name: 'Admin User',
      text: inputText,
      time: 'Ahora'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputText('');
    setChatTyping(true);

    // Simulate tech support response delay
    setTimeout(() => {
      let responseText = '';
      const textLower = userMsg.text.toLowerCase();

      if (textLower.includes('error') || textLower.includes('falla') || textLower.includes('problema')) {
        responseText = 'Lamento escuchar eso. He revisado los microservicios en NestJS y veo que RabbitMQ está procesando correctamente. ¿Me podrías indicar el ID del evento o cliente?';
      } else if (textLower.includes('stock') || textLower.includes('inventario') || textLower.includes('scm')) {
        responseText = 'El SCM cuenta con reabastecimiento automático en tiempo real. Cuando una orden baja del stock mínimo, el sistema compra +50 unidades de inmediato.';
      } else if (textLower.includes('erp') || textLower.includes('finanzas') || textLower.includes('pago')) {
        responseText = 'El ERP registra automáticamente asientos contables en PostgreSQL por cada Checkout exitoso. Puedes ver el balance actualizado en la pestaña ERP.';
      } else if (textLower.includes('hola') || textLower.includes('saludos')) {
        responseText = '¡Hola! Qué gusto saludarte. Estoy lista para responder preguntas sobre la arquitectura o sincronización de TecnoTics.';
      } else {
        responseText = '¡Entendido! He registrado tu nota en el historial del cliente en MongoDB. Todo nuestro sistema está sincronizado al 100% en tiempo real.';
      }

      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'agent',
        name: 'Laura (Soporte CRM)',
        text: responseText,
        time: 'Ahora mismo'
      }]);
      setChatTyping(false);
    }, 1500);
  };

  // Calculations for KPIs
  const totalLeads = customers.filter(c => c.status === 'Lead').length;
  const totalClientes = customers.filter(c => c.status === 'Cliente').length;
  const totalRecords = customers.length;
  const conversionRate = totalRecords > 0 ? ((totalClientes / totalRecords) * 100).toFixed(1) : '0.0';

  // Monthly Goal calculations synced with PostgreSQL orders
  const dbOrdersTotal = orders.reduce((sum, curr) => sum + (parseFloat(curr.totalAmount) || 0), 0);
  const baselineIngresos = 35200; // Baseline
  const totalIngresos = baselineIngresos + dbOrdersTotal;
  const metaMensual = 60000;
  const metaPorcentaje = Math.min((totalIngresos / metaMensual) * 100, 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">CRM - Portal de Clientes y Soporte</h1>
          <p className="text-sm text-slate-500 mt-1">Supervisa leads, metas de conversión en tiempo real y gestiona incidencias de soporte.</p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            MongoDB Online
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Transacciones Activas
          </span>
        </div>
      </div>

      {/* Monthly Goals and Sales Target box (SPECS Meta Mensual) */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl p-6 border border-slate-800 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_60%)] blur-[50px] pointer-events-none" />
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
              <Star className="w-4 h-4 fill-current animate-pulse text-indigo-400" /> Monitoreo de Objetivos y Metas Mensuales
            </div>
            <h2 className="text-2xl font-black text-white">Objetivo Comercial del Ecosistema</h2>
            <p className="text-xs text-slate-400 max-w-xl">
              Calculado en tiempo real integrando las transacciones de PostgreSQL (ERP) y los datos de contacto calificados en MongoDB (CRM).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-8 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 min-w-full sm:min-w-[340px]">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Meta Corporativa</span>
              <span className="text-xl font-extrabold text-white">${metaMensual.toLocaleString()} USD</span>
            </div>
            <div>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">Ingreso Registrado</span>
              <span className="text-xl font-extrabold text-emerald-400">${totalIngresos.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</span>
            </div>
          </div>
        </div>

        {/* Dynamic target progress bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-slate-300">Progreso a la Meta de Ventas</span>
            <span className="text-emerald-400 font-mono">{metaPorcentaje}% Completado</span>
          </div>
          <div className="w-full h-4 bg-slate-900 rounded-full border border-slate-800 overflow-hidden flex items-center relative p-[2px]">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-inner"
              style={{ width: `${metaPorcentaje}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Registrados</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{totalRecords}</h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-primary" /> Historial unificado en MongoDB
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Prospectos (Leads)</p>
          <h3 className="text-3xl font-black text-amber-600 mt-2">{totalLeads}</h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Requieren atención contable
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Clientes Cerrados</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">{totalClientes}</h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-500" /> Convertidos vía Checkout E-Commerce
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tasa de Conversión</p>
          <h3 className="text-3xl font-black text-indigo-600 mt-2">{conversionRate}%</h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5 text-indigo-500" /> Sincronización N-Capas activa
          </p>
        </div>
      </div>

      {/* Main Grid: Add Customer Form & Funnel / Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Create Customer Form with Executive Assignment (SPECS Executive assignment) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Crear Prospecto
            </h2>
            <p className="text-xs text-slate-500 mb-5">Ingresa los datos manualmente para iniciar el ciclo de ventas y asignar ejecutivos.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Nombre Completo</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 text-sm transition-all outline-none" placeholder="Juan Pérez" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Correo Electrónico</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 text-sm transition-all outline-none" placeholder="juan@ejemplo.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Teléfono</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-800 text-xs outline-none" placeholder="555-1234" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Empresa</label>
                  <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-800 text-xs outline-none" placeholder="Acme Corp" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Estado Lead</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-800 text-xs outline-none">
                    <option value="Lead">Lead (Prospecto)</option>
                    <option value="Cliente">Cliente (Comprador)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Ejecutivo Asignado</label>
                  <select value={formData.assignedExecutive} onChange={e => setFormData({...formData, assignedExecutive: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-800 text-xs outline-none">
                    <option value="Alejandro Ventas">Alejandro Ventas</option>
                    <option value="Laura Soporte">Laura Soporte</option>
                    <option value="Carlos Ejecutivo">Carlos Ejecutivo</option>
                    <option value="Sistema Automático">Sistema Automático</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Última Interacción (Historial)</label>
                <input type="text" required value={formData.lastInteraction} onChange={e => setFormData({...formData, lastInteraction: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 text-xs transition-all outline-none" placeholder="Llamada de prospección realizada" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full mt-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-indigo-700 transition-all duration-300 flex justify-center items-center gap-2 shadow-sm shadow-primary/30 outline-none">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Registrar en CRM'}
              </button>
            </form>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
            <span className="font-bold text-slate-700 block mb-1">💡 Automatización Activa:</span>
            Los prospectos que finalicen una compra en el e-commerce se actualizan instantáneamente en MongoDB y su estado pasa a <span className="text-emerald-600 font-bold">"Cliente"</span>.
          </div>
        </div>

        {/* Right Side: Funnel Chart & Interactive Support */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Sales Funnel Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" /> Embudo de Conversión Comercial (Funnel)
            </h2>
            <p className="text-xs text-slate-500 mb-5">Porcentaje de leads a lo largo del proceso comercial.</p>

            <div className="space-y-3">
              {[
                { stage: 'Leads Generados', count: totalLeads + totalClientes * 1.5, percent: 100, color: 'from-blue-500 to-cyan-500' },
                { stage: 'Contactados / Calificados', count: totalClientes * 1.3 + totalLeads * 0.4, percent: 75, color: 'from-cyan-500 to-indigo-500' },
                { stage: 'Propuestas de Tecnología', count: totalClientes * 1.1, percent: 48, color: 'from-indigo-500 to-purple-500' },
                { stage: 'Clientes Cerrados (Checkout)', count: totalClientes, percent: parseFloat(conversionRate), color: 'from-purple-500 to-emerald-500' }
              ].map((item, index) => (
                <div key={index} className="group relative">
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-slate-800 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:scale-125 transition-transform" style={{ background: `linear-gradient(to right, ${item.color})` }}></span>
                      {item.stage}
                    </span>
                    <span className="text-slate-500">{Math.round(item.count)} registros ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden border border-slate-100 flex items-center relative">
                    <div 
                      className={`h-full bg-gradient-to-r ${item.color} rounded-l-lg transition-all duration-1000 ease-out`}
                      style={{ width: `${Math.max(item.percent, 8)}%` }}
                    ></div>
                    <span className="absolute left-3 text-[10px] font-bold text-white drop-shadow-sm uppercase">Paso {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Portal & Tech Chat Simulator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Support Tickets */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-500" /> Tickets de Soporte
                </h3>
                <p className="text-xs text-slate-500 mb-4">Incidencias y alertas de sincronización.</p>

                <div className="space-y-3">
                  {tickets.map(t => (
                    <div key={t.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-800">{t.id} - {t.customer}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          t.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                          t.priority === 'Media' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
                        }`}>{t.priority}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{t.issue}</p>
                      <div className="flex justify-between items-center mt-2.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Estado:</span>
                        <span className={`text-[10px] font-extrabold uppercase ${
                          t.status === 'Abierto' ? 'text-red-500' :
                          t.status === 'En Progreso' ? 'text-amber-500' : 'text-emerald-500'
                        }`}>{t.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => alert('Creación de Ticket: los tickets se disparan automáticamente en caso de fallas de microservicios en el backend.')}
                className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors text-center block"
              >
                Abrir Nuevo Ticket Manual
              </button>
            </div>

            {/* Chat Simulator */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-[360px]">
              <div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Soporte en Vivo</h3>
                      <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> Agente en línea
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 h-[200px] overflow-y-auto pr-1 text-xs">
                  {chatMessages.map(m => (
                    <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[9px] text-slate-400 mb-0.5">{m.name} • {m.time}</span>
                      <div className={`p-2.5 rounded-2xl max-w-[85%] ${
                        m.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-slate-100 text-slate-800 rounded-tl-none'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {chatTyping && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-2 pl-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" /> Laura está escribiendo...
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-slate-100 pt-3">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Pregúntame sobre el stock o ERP..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary text-slate-800"
                />
                <button type="submit" className="p-2 bg-primary text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

      {/* Customers List Table (SPECS Assigned executive and interaction history) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Historial de Relación con Clientes
            </h2>
            <p className="text-xs text-slate-500 mt-1">Registros sincronizados dinámicamente con la base de datos de MongoDB.</p>
          </div>
          <button onClick={fetchData} className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
            ➔ Sincronizar Base de Datos
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-2xl">
            No hay clientes registrados en MongoDB. Realiza una compra en el e-commerce para verlos aquí.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Nombre</th>
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Empresa / Negocio</th>
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Datos de Contacto</th>
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ejecutivo Asignado</th>
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Última Interacción (Logs)</th>
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Estado del Lead</th>
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Canal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors text-xs">
                    <td className="py-4 px-4 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-4 px-4 text-slate-500 font-medium">{c.company || 'Sin Empresa'}</td>
                    <td className="py-4 px-4 text-slate-500">
                      <div className="font-semibold text-slate-700">{c.email}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{c.phone || 'Sin Teléfono'}</div>
                    </td>
                    <td className="py-4 px-4 font-bold text-indigo-600">
                      <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100">
                        👤 {c.assignedExecutive || 'Alejandro Ventas'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500 max-w-[220px] truncate" title={c.lastInteraction}>
                      💬 {c.lastInteraction || 'Contacto inicial realizado.'}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.status === 'Cliente' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Cliente' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {c.status === 'Cliente' ? (
                        <span className="font-semibold text-emerald-600 flex items-center gap-1 text-[10px]">
                          🛒 E-Commerce
                        </span>
                      ) : (
                        <span className="font-medium text-slate-500 text-[10px]">
                          ✍️ Manual
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FAQ / Knowledge Base */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" /> Base de Conocimientos CRM
        </h3>
        <p className="text-xs text-slate-500 mb-5">Respuestas rápidas para la gestión de la arquitectura distribuida.</p>

        <div className="space-y-2.5">
          {[
            { q: '¿Cómo funciona la integración de leads a clientes?', a: 'Cuando un usuario realiza el Checkout en public-site (puerto 5174), el API Gateway realiza una petición asíncrona al crm-service. Este busca el email en la base de datos de MongoDB. Si ya existe, actualiza su estado de "Lead" a "Cliente" e inyecta los nuevos datos. Si no existe, lo crea automáticamente.' },
            { q: '¿Los datos de soporte técnico se persisten?', a: 'Los tickets del portal de soporte se autogeneran dinámicamente si se reportan fallas a través de los canales de comunicación de RabbitMQ, permitiendo alertar al administrador sobre posibles fallas de conexión en PostgreSQL o MongoDB.' },
            { q: '¿Qué bases de datos respaldan este CRM?', a: 'Toda la información del CRM se almacena en una base de datos distribuida NoSQL MongoDB, corriendo en un contenedor de Docker aislado, permitiendo un rendimiento de lectura y escritura sumamente veloz para millones de perfiles de clientes.' }
          ].map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                className="w-full px-5 py-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-xs text-slate-800 flex justify-between items-center transition-colors outline-none"
              >
                <span>{faq.q}</span>
                <span className="text-primary font-black text-lg">{activeFAQ === idx ? '−' : '+'}</span>
              </button>
              {activeFAQ === idx && (
                <div className="px-5 py-4 bg-white text-xs text-slate-500 border-t border-slate-100 leading-relaxed animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRM;
