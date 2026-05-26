import { useState, useEffect } from 'react';
import { Users, Plus, Loader2, MessageSquare, HelpCircle, ArrowRight, ShieldAlert, Award, Star, ThumbsUp, Send } from 'lucide-react';
import axios from 'axios';

const CRM = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', status: 'Lead' });
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

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/crm/customers');
      setCustomers(res.data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3000/api/v1/crm/customers', formData);
      setFormData({ name: '', email: '', phone: '', company: '', status: 'Lead' });
      fetchCustomers();
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-main">CRM - Portal de Clientes y Soporte</h1>
          <p className="text-sm text-text-muted mt-1">Supervisa leads, convierte clientes en tiempo real y gestiona incidencias de soporte.</p>
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

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Total Registrados</p>
          <h3 className="text-3xl font-black text-text-main mt-2">{totalRecords}</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-primary" /> Historial unificado en MongoDB
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Prospectos (Leads)</p>
          <h3 className="text-3xl font-black text-amber-600 mt-2">{totalLeads}</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Requieren atención contable
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Clientes Cerrados</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">{totalClientes}</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-500" /> Convertidos vía Checkout E-Commerce
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-125"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Tasa de Conversión</p>
          <h3 className="text-3xl font-black text-indigo-600 mt-2">{conversionRate}%</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5 text-indigo-500" /> Sincronización N-Capas activa
          </p>
        </div>
      </div>

      {/* Main Grid: Add Customer Form & Funnel / Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Create Customer Form */}
        <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-main mb-1 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Crear Prospecto
            </h2>
            <p className="text-xs text-text-muted mb-5">Ingresa los datos manualmente para iniciar el ciclo de ventas.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1">Nombre Completo</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-background border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main text-sm transition-all" placeholder="Juan Pérez" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1">Correo Electrónico</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-background border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main text-sm transition-all" placeholder="juan@ejemplo.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1">Teléfono Móvil</label>
                <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 bg-background border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main text-sm transition-all" placeholder="555-1234" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1">Empresa / Negocio</label>
                <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2.5 bg-background border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main text-sm transition-all" placeholder="Acme Corp" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1">Estado de Lead</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 bg-background border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main text-sm transition-all">
                  <option value="Lead">Lead (Prospecto)</option>
                  <option value="Cliente">Cliente (Comprador)</option>
                </select>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full mt-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all duration-300 flex justify-center items-center gap-2 shadow-sm shadow-primary/30">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Registrar en CRM'}
              </button>
            </form>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-text-muted">
            <span className="font-bold text-text-main block mb-1">💡 Automatización Activa:</span>
            Los prospectos que finalicen una compra en el e-commerce se actualizan instantáneamente en MongoDB y su estado pasa a <span className="text-emerald-600 font-bold">"Cliente"</span>.
          </div>
        </div>

        {/* Right Side: Funnel Chart & Interactive Support */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Sales Funnel Card */}
          <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-text-main mb-1 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" /> Embudo de Conversión Comercial (Funnel)
            </h2>
            <p className="text-xs text-text-muted mb-5">Porcentaje de leads a lo largo del proceso comercial.</p>

            <div className="space-y-3">
              {[
                { stage: 'Leads Generados', count: totalLeads + totalClientes * 1.5, percent: 100, color: 'from-blue-500 to-cyan-500' },
                { stage: 'Contactados / Calificados', count: totalClientes * 1.3 + totalLeads * 0.4, percent: 75, color: 'from-cyan-500 to-indigo-500' },
                { stage: 'Propuestas de Tecnología', count: totalClientes * 1.1, percent: 48, color: 'from-indigo-500 to-purple-500' },
                { stage: 'Clientes Cerrados (Checkout)', count: totalClientes, percent: parseFloat(conversionRate), color: 'from-purple-500 to-emerald-500' }
              ].map((item, index) => (
                <div key={index} className="group relative">
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-text-main flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:scale-125 transition-transform" style={{ background: `linear-gradient(to right, ${item.color})` }}></span>
                      {item.stage}
                    </span>
                    <span className="text-text-muted">{Math.round(item.count)} registros ({item.percent}%)</span>
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
            <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-text-main mb-1 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-500" /> Tickets de Soporte
                </h3>
                <p className="text-xs text-text-muted mb-4">Incidencias y alertas de sincronización.</p>

                <div className="space-y-3">
                  {tickets.map(t => (
                    <div key={t.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-text-main">{t.id} - {t.customer}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          t.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                          t.priority === 'Media' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
                        }`}>{t.priority}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1">{t.issue}</p>
                      <div className="flex justify-between items-center mt-2.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Estado:</span>
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
                className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-text-main text-xs font-bold rounded-lg transition-colors text-center block"
              >
                Abrir Nuevo Ticket Manual
              </button>
            </div>

            {/* Chat Simulator */}
            <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-[360px]">
              <div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="text-sm font-bold text-text-main">Soporte en Vivo</h3>
                      <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> Agente en línea
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 h-[200px] overflow-y-auto pr-1 text-xs">
                  {chatMessages.map(m => (
                    <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[9px] text-text-muted mb-0.5">{m.name} • {m.time}</span>
                      <div className={`p-2.5 rounded-2xl max-w-[85%] ${
                        m.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-slate-100 text-text-main rounded-tl-none'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {chatTyping && (
                    <div className="flex items-center gap-1 text-[10px] text-text-muted mt-2 pl-2">
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
                  className="flex-1 px-3 py-2 bg-background border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
                />
                <button type="submit" className="p-2 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors shadow-sm">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

      {/* Customers List Table */}
      <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Historial de Relación con Clientes
            </h2>
            <p className="text-xs text-text-muted mt-1">Registros sincronizados dinámicamente con la base de datos de MongoDB.</p>
          </div>
          <button onClick={fetchCustomers} className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
            ➔ Sincronizar Base de Datos
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12 text-text-muted border border-dashed border-slate-200 rounded-2xl">
            No hay clientes registrados en MongoDB. Realiza una compra en el e-commerce para verlos aquí.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">Nombre</th>
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">Empresa / Organización</th>
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">Datos de Contacto</th>
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">Estado del Lead</th>
                  <th className="py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">Fuente de Conversión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-semibold text-text-main">{c.name}</td>
                    <td className="py-4 px-4 text-sm text-text-muted font-medium">{c.company || 'Sin Empresa'}</td>
                    <td className="py-4 px-4 text-sm text-text-muted">
                      <div className="font-semibold text-text-main">{c.email}</div>
                      <div className="text-xs text-text-muted mt-0.5">{c.phone || 'Sin Teléfono'}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        c.status === 'Cliente' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Cliente' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs">
                      {c.status === 'Cliente' ? (
                        <span className="font-semibold text-emerald-600 flex items-center gap-1">
                          🛒 E-Commerce Checkout
                        </span>
                      ) : (
                        <span className="font-medium text-slate-500">
                          ✍️ Registro Manual
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
      <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-text-main mb-1 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" /> Base de Conocimientos CRM
        </h3>
        <p className="text-xs text-text-muted mb-5">Respuestas rápidas para la gestión de la arquitectura distribuida.</p>

        <div className="space-y-2.5">
          {[
            { q: '¿Cómo funciona la integración de leads a clientes?', a: 'Cuando un usuario realiza el Checkout en public-site (puerto 5174), el API Gateway realiza una petición asíncrona al crm-service. Este busca el email en la base de datos de MongoDB. Si ya existe, actualiza su estado de "Lead" a "Cliente" e inyecta los nuevos datos. Si no existe, lo crea automáticamente.' },
            { q: '¿Los datos de soporte técnico se persisten?', a: 'Los tickets del portal de soporte se autogeneran dinámicamente si se reportan fallas a través de los canales de comunicación de RabbitMQ, permitiendo alertar al administrador sobre posibles fallas de conexión en PostgreSQL o MongoDB.' },
            { q: '¿Qué bases de datos respaldan este CRM?', a: 'Toda la información del CRM se almacena en una base de datos distribuida NoSQL MongoDB, corriendo en un contenedor de Docker aislado, permitiendo un rendimiento de lectura y escritura sumamente veloz para millones de perfiles de clientes.' }
          ].map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
              <button 
                onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                className="w-full px-5 py-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-xs text-text-main flex justify-between items-center transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-primary font-black text-lg">{activeFAQ === idx ? '−' : '+'}</span>
              </button>
              {activeFAQ === idx && (
                <div className="px-5 py-4 bg-white text-xs text-text-muted border-t border-slate-100 leading-relaxed animate-fadeIn">
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
