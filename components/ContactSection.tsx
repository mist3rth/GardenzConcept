
import React, { useState, useEffect } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [touched, setTouched] = useState({
    firstName: false,
    email: false,
    subject: false,
    message: false
  });

  const [errors, setErrors] = useState({
    firstName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Validation Logic
  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'Le prénom est requis.';
        break;
      case 'email':
        if (!value.trim()) {
          error = "L'email est requis.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Format d'email invalide.";
        }
        break;
      case 'subject':
        if (!value) error = 'Veuillez choisir un sujet.';
        break;
      case 'message':
        if (!value.trim()) error = 'Le message ne peut pas être vide.';
        else if (value.trim().length < 10) error = 'Le message est trop court.';
        break;
    }
    return error;
  };

  // Check Global Validity
  useEffect(() => {
    const newErrors = {
      firstName: validateField('firstName', formState.firstName),
      email: validateField('email', formState.email),
      subject: validateField('subject', formState.subject),
      message: validateField('message', formState.message),
    };

    // Only update errors state if touched (to avoid showing errors on initial load, 
    // but we need to know validity for the button)
    // Actually, we keep internal errors consistent with values for the isFormValid check
    
    const isValid = 
      !newErrors.firstName && 
      !newErrors.email && 
      !newErrors.subject && 
      !newErrors.message &&
      formState.firstName !== '' &&
      formState.email !== '' &&
      formState.subject !== '' &&
      formState.message !== '';

    setIsFormValid(isValid);
  }, [formState]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error immediately when user types if field was touched
    if (touched[name as keyof typeof touched]) {
       setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Simulate sending data (e.g. API call would go here)
    console.log("Form data submitted:", formState);

    // Show success message immediately and permanently
    setIsSent(true);
    
    // Reset form data in background (optional, in case user navigates back later)
    setFormState({ firstName: '', email: '', subject: '', message: '' });
    setTouched({ firstName: false, email: false, subject: false, message: false });
    setErrors({ firstName: '', email: '', subject: '', message: '' });
  };

  // Helper to get input border class
  const getBorderClass = (fieldName: keyof typeof errors) => {
    if (touched[fieldName] && errors[fieldName]) return 'border-red-500 focus:border-red-500 focus:ring-red-500';
    if (touched[fieldName] && !errors[fieldName]) return 'border-green-500/50 focus:border-gardenz-green';
    return 'border-gray-800 focus:border-gardenz-green';
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col justify-center pt-24 pb-12">
      
      {/* I. BACKGROUND / AMBIANCE */}
      <div className="absolute inset-0 bg-[#0A0A0A]"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      {/* Orbs */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-gardenz-green/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gardenz-terra/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10 w-full">
        
        {/* II. TITRE ET SOUS-TITRE */}
        <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                DISCUTONS <span className="text-gardenz-green drop-shadow-[0_0_15px_rgba(56,118,29,0.4)]">UN PEU.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg mx-auto">
                Notre équipe passionnée vous répondra sous 24h.
            </p>
        </div>

        {/* III. LE FORMULAIRE (Bloc Central) */}
        <div className="bg-[#151515]/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            
            {/* Subtle Glow Border */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-transparent group-hover:border-gardenz-green/20 transition-colors pointer-events-none"></div>

            {isSent ? (
                <div className="h-96 flex flex-col items-center justify-center text-center animate-fade-in">
                    <div className="w-20 h-20 bg-gardenz-green rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_30px_rgba(56,118,29,0.4)]">
                        <CheckCircle size={40} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">Message Envoyé !</h3>
                    <p className="text-gray-400">Merci de votre Vibe. On revient vers vous très vite.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    
                    {/* 1. Prénom */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Prénom</label>
                            {touched.firstName && errors.firstName && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12}/> {errors.firstName}</span>}
                        </div>
                        <div className="relative group/input">
                            <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.firstName && errors.firstName ? 'text-red-500' : 'text-gray-500 group-focus-within/input:text-gardenz-green'}`} size={20} />
                            <input 
                                type="text" 
                                name="firstName"
                                value={formState.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Votre prénom" 
                                className={`w-full bg-[#0A0A0A] border text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-1 transition-all placeholder:text-gray-700 ${getBorderClass('firstName')}`}
                            />
                        </div>
                    </div>

                    {/* 2. Email */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                            {touched.email && errors.email && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</span>}
                        </div>
                        <div className="relative group/input">
                            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.email && errors.email ? 'text-red-500' : 'text-gray-500 group-focus-within/input:text-gardenz-green'}`} size={20} />
                            <input 
                                type="email" 
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="vibe@gardenz.fr" 
                                className={`w-full bg-[#0A0A0A] border text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-1 transition-all placeholder:text-gray-700 ${getBorderClass('email')}`}
                            />
                        </div>
                    </div>

                    {/* 3. Sujet */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Sujet</label>
                            {touched.subject && errors.subject && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12}/> {errors.subject}</span>}
                        </div>
                        <div className="relative group/input">
                            <MessageSquare className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.subject && errors.subject ? 'text-red-500' : 'text-gray-500 group-focus-within/input:text-gardenz-green'}`} size={20} />
                            <select 
                                name="subject"
                                value={formState.subject}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full bg-[#0A0A0A] border text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${formState.subject === '' ? 'text-gray-500' : 'text-white'} ${getBorderClass('subject')}`}
                            >
                                <option value="" disabled>Choisissez votre sujet</option>
                                <option value="Question sur une commande">Question sur une commande</option>
                                <option value="Information produit">Information produit</option>
                                <option value="Partenariat / Presse">Partenariat / Presse</option>
                                <option value="Autre demande">Autre demande</option>
                            </select>
                            {/* Custom Arrow */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>

                    {/* 4. Message */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message</label>
                            {touched.message && errors.message && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12}/> {errors.message}</span>}
                        </div>
                        <textarea 
                            name="message"
                            rows={5} 
                            value={formState.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full bg-[#0A0A0A] border text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-1 transition-all placeholder:text-gray-700 resize-none ${getBorderClass('message')}`} 
                            placeholder="Dites-nous tout..."
                        ></textarea>
                    </div>

                    {/* V. ÉLÉMENTS LÉGAUX ET CTA */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={!isFormValid}
                            className={`w-full font-display font-bold uppercase tracking-widest text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn
                                ${isFormValid 
                                    ? 'bg-gardenz-green text-white hover:bg-gardenz-dark shadow-[0_5px_20px_rgba(56,118,29,0.3)] hover:shadow-[0_8px_30px_rgba(56,118,29,0.5)] transform active:scale-[0.98]' 
                                    : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                }
                            `}
                        >
                            Envoyer la Vibe <Send size={20} className={`${isFormValid ? 'group-hover/btn:translate-x-1 transition-transform' : ''}`} />
                        </button>
                        
                        <p className="text-[10px] text-gray-600 text-center mt-4 max-w-sm mx-auto leading-tight">
                            En envoyant ce formulaire, vous acceptez que vos données personnelles soient traitées pour répondre à votre demande, conformément à notre <a href="#" className="underline hover:text-gray-400">Politique de Confidentialité</a>.
                        </p>
                    </div>
                </form>
            )}
        </div>

      </div>
    </section>
  );
};
