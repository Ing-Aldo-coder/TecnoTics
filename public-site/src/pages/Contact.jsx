import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, MessageSquare, Phone, Mail, MapPin, Clock, Award, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', status: 'Lead' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3000/api/v1/crm/customers', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', status: 'Lead' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative min-h-screen text-white">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_50%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0,transparent_50%)] blur-[100px] pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Contacto de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Negocios</span></h1>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          ¿Tienes alguna duda o requerimiento especial? Escríbenos y un asesor te contactará lo antes posible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left Side: Corporate Contact Info & SLA */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-primary" /> Canales de Atención Directa
            </h3>
            
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-[11px] uppercase tracking-wider">Línea Directa Corporativa</h4>
                  <p className="text-text-muted mt-0.5">+52 55 4321-0987 (Atención al Cliente)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-[11px] uppercase tracking-wider">Correo de Soporte</h4>
                  <p className="text-text-muted mt-0.5">soporte@tecnotics.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-[11px] uppercase tracking-wider">Almacén y Corporativo Central</h4>
                  <p className="text-text-muted mt-0.5">Av. Paseo de la Reforma 250, Ciudad de México, CP 06600</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-[11px] uppercase tracking-wider">Horario de Atención</h4>
                  <p className="text-text-muted mt-0.5">Lunes a Viernes de 9:00 AM a 6:00 PM (Tiempo de respuesta menor a 2 horas)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values / Trust badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/20 text-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Garantía Directa</h4>
              <p className="text-[10px] text-text-muted mt-1 leading-relaxed">Soporte y servicio prioritario.</p>
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/20 text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hardware Original</h4>
              <p className="text-[10px] text-text-muted mt-1 leading-relaxed">Directo del fabricante con respaldo oficial.</p>
            </div>
          </div>

        </div>

        {/* Right Side: Lead capture form */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden border border-white/5 bg-slate-900/40"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-16 space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                    <CheckCircle className="w-10 h-10 text-emerald-400 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-black text-white">¡Mensaje Enviado con Éxito!</h3>
                  <p className="text-text-muted text-xs max-w-sm mx-auto leading-relaxed">
                    Hemos recibido tus datos correctamente. Uno de nuestros asesores comerciales se pondrá en contacto contigo muy pronto para brindarte una atención personalizada.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider mb-6">
                    <MessageSquare className="w-4 h-4 text-primary" /> Formulario de Contacto
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full px-4 py-3 bg-slate-950/60 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 rounded-xl focus:outline-none text-white text-xs transition-all" 
                        placeholder="Ej. Ana Gómez" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Empresa / Negocio</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.company} 
                        onChange={e => setFormData({...formData, company: e.target.value})} 
                        className="w-full px-4 py-3 bg-slate-950/60 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 rounded-xl focus:outline-none text-white text-xs transition-all" 
                        placeholder="Ej. Tech Solutions" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Correo Profesional</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full px-4 py-3 bg-slate-950/60 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 rounded-xl focus:outline-none text-white text-xs transition-all" 
                        placeholder="ana@techsolutions.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Teléfono de Enlace</label>
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                        className="w-full px-4 py-3 bg-slate-950/60 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 rounded-xl focus:outline-none text-white text-xs transition-all" 
                        placeholder="555-9876" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] text-text-muted leading-relaxed mb-4">
                      * Al enviar este formulario, aceptas nuestra política de privacidad y tratamiento de datos personales de forma segura y confidencial.
                    </p>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all flex justify-center items-center gap-2 shadow-md shadow-primary/30 text-xs uppercase tracking-wider"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enviar Mensaje'}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>

    </div>
  );
};

export default Contact;
