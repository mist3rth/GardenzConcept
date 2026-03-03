
import React, { useRef, useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Target, Star, Zap, ArrowDown, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface AffiliatePageProps { }

export const AffiliatePage: React.FC<AffiliatePageProps> = () => {
    const formRef = useRef<HTMLDivElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        type: '',
        message: ''
    });

    const [touched, setTouched] = useState({
        name: false,
        company: false,
        email: false,
        type: false,
        message: false
    });

    const [errors, setErrors] = useState({
        name: '',
        company: '',
        email: '',
        type: '',
        message: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Validation Logic
    const validateField = (name: string, value: string) => {
        let error = '';
        switch (name) {
            case 'name':
                if (!value.trim()) error = 'Le nom est requis.';
                break;
            case 'company':
                if (!value.trim()) error = 'La société est requise.';
                break;
            case 'email':
                if (!value.trim()) error = "L'email est requis.";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Format d'email invalide.";
                break;
            case 'type':
                if (!value) error = 'Veuillez sélectionner une option.';
                break;
            case 'message':
                if (!value.trim()) error = 'Le message est requis.';
                break;
        }
        return error;
    };

    // Check Global Validity
    useEffect(() => {
        const newErrors = {
            name: validateField('name', formData.name),
            company: validateField('company', formData.company),
            email: validateField('email', formData.email),
            type: validateField('type', formData.type),
            message: validateField('message', formData.message),
        };

        const isValid =
            !newErrors.name &&
            !newErrors.company &&
            !newErrors.email &&
            !newErrors.type &&
            !newErrors.message &&
            Object.values(formData).every(val => val !== '');

        setIsFormValid(isValid);
    }, [formData]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name as keyof typeof touched]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
            // Reset form
            setFormData({ name: '', company: '', email: '', type: '', message: '' });
            setTouched({ name: false, company: false, email: false, type: false, message: false });
        }, 1500);
    };

    const getBorderClass = (fieldName: keyof typeof errors) => {
        if (touched[fieldName] && errors[fieldName]) return 'border-red-500 focus:border-red-500';
        if (touched[fieldName] && !errors[fieldName]) return 'border-green-500/50 focus:border-gardenz-green';
        return 'border-gray-700 focus:border-white';
    };

    return (
        <div className="bg-gardenz-black min-h-screen font-sans text-white">

            {/* HEADER */}
            <div className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-magenta/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gardenz-cyan/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        MONÉTISEZ VOTRE AUDIENCE ET <br />
                        <span className="text-gardenz-magenta drop-shadow-[0_0_15px_rgba(255,0,255,0.4)]">CRÉEZ DES SYNERGIES</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                        Gardenz recherche des partenaires alignés sur notre éthique de qualité et notre esprit lifestyle pour étendre notre influence et partager notre succès.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-20">

                {/* DEUX BLOCS : AFFILIATION vs MARQUE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">

                    {/* BLOC 1 : Programme d'Affiliation */}
                    <div className="bg-[#151515] border border-gray-800 rounded-3xl p-8 md:p-10 hover:border-gardenz-cyan transition-all group flex flex-col">
                        <div className="w-16 h-16 bg-gardenz-cyan/10 rounded-2xl flex items-center justify-center text-gardenz-cyan mb-6 group-hover:scale-110 transition-transform">
                            <TrendingUp size={32} />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-white mb-2">Programme d'Affiliation</h2>
                        <p className="text-xs font-bold text-gardenz-cyan uppercase tracking-widest mb-6">Pour Webmasters, Influenceurs, Média</p>

                        <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">
                            <strong className="text-white">Le principe :</strong> Intégrez nos bannières ou liens produits uniques sur votre site ou vos réseaux. Vous touchez une commission sur chaque vente générée grâce à votre audience.
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <DollarSign className="text-gardenz-cyan shrink-0" size={20} />
                                <span className="text-sm text-gray-300"><strong>REVENUS attractifs :</strong> Bénéficiez d'un taux de commission compétitif, basé sur la performance.</span>
                            </li>
                            <li className="flex gap-3">
                                <Target className="text-gardenz-cyan shrink-0" size={20} />
                                <span className="text-sm text-gray-300"><strong>UN PRODUIT de niche :</strong> Promouvez un catalogue premium, légal et en pleine croissance.</span>
                            </li>
                            <li className="flex gap-3">
                                <Zap className="text-gardenz-cyan shrink-0" size={20} />
                                <span className="text-sm text-gray-300"><strong>OUTILS de pro :</strong> Accédez à un tableau de bord de suivi en temps réel de vos clics, conversions et gains.</span>
                            </li>
                        </ul>

                        <button onClick={scrollToForm} className="w-full bg-gardenz-cyan text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                            Postuler à l'Affiliation
                        </button>
                    </div>

                    {/* BLOC 2 : Partenariats de Marque */}
                    <div className="bg-[#151515] border border-gray-800 rounded-3xl p-8 md:p-10 hover:border-gardenz-magenta transition-all group flex flex-col">
                        <div className="w-16 h-16 bg-gardenz-magenta/10 rounded-2xl flex items-center justify-center text-gardenz-magenta mb-6 group-hover:scale-110 transition-transform">
                            <Users size={32} />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-white mb-2">Partenariats de Marque</h2>
                        <p className="text-xs font-bold text-gardenz-magenta uppercase tracking-widest mb-6">Pour Marques et Professionnels</p>

                        <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">
                            <strong className="text-white">Le principe :</strong> Nous collaborons avec des professionnels partageant notre vision premium et innovante. Échanges de visibilité, co-branding ou événements exclusifs.
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <Star className="text-gardenz-magenta shrink-0" size={20} />
                                <span className="text-sm text-gray-300"><strong>UNE IMAGE de marque forte :</strong> Associez-vous à un univers lifestyle moderne et assumé.</span>
                            </li>
                            <li className="flex gap-3">
                                <Users className="text-gardenz-magenta shrink-0" size={20} />
                                <span className="text-sm text-gray-300"><strong>ACCÉDEZ à notre communauté :</strong> Touchez une audience engagée et fidèle à l'esprit Gardenz.</span>
                            </li>
                            <li className="flex gap-3">
                                <Zap className="text-gardenz-magenta shrink-0" size={20} />
                                <span className="text-sm text-gray-300"><strong>INNOVEZ ensemble :</strong> Créez des projets uniques et avant-gardistes.</span>
                            </li>
                        </ul>

                        <button onClick={scrollToForm} className="w-full bg-gardenz-magenta text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-gardenz-magenta transition-all shadow-[0_0_20px_rgba(255,0,255,0.2)]">
                            Proposer une Collaboration
                        </button>
                    </div>

                </div>

                {/* FORMULAIRE */}
                <div ref={formRef} className="max-w-3xl mx-auto bg-[#111] border border-gray-800 rounded-3xl p-8 md:p-12 scroll-mt-24 relative overflow-hidden">

                    {isSent ? (
                        <div className="text-center py-12 animate-fade-in">
                            <div className="w-20 h-20 bg-gardenz-green rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_30px_rgba(56,118,29,0.4)]">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="font-display text-3xl font-bold text-white mb-4">Message Reçu !</h3>
                            <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                                Merci de votre intérêt pour Gardenz. Notre équipe partenariats va étudier votre demande et reviendra vers vous sous 48h.
                            </p>
                            <button
                                onClick={() => setIsSent(false)}
                                className="mt-8 text-sm font-bold text-gardenz-green hover:text-white transition-colors underline underline-offset-4"
                            >
                                Envoyer une autre demande
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3 className="font-display text-2xl font-bold text-center mb-2 text-white">REJOIGNEZ LE CREW</h3>
                            <p className="text-center text-gray-500 text-sm mb-8">Parlez-nous de vous et de votre projet.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nom / Contact</label>
                                            {touched.name && errors.name && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</span>}
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Votre nom complet"
                                            className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${getBorderClass('name')}`}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Société / Réseau</label>
                                            {touched.company && errors.company && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.company}</span>}
                                        </div>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Nom de votre marque ou média"
                                            className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${getBorderClass('company')}`}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Pro</label>
                                        {touched.email && errors.email && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</span>}
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="contact@votre-entreprise.com"
                                        className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${getBorderClass('email')}`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nature du Partenariat</label>
                                        {touched.type && errors.type && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.type}</span>}
                                    </div>
                                    <div className="relative">
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none appearance-none cursor-pointer ${formData.type === '' ? 'text-gray-500' : 'text-white'} ${getBorderClass('type')}`}
                                        >
                                            <option value="" disabled>Sélectionnez une option</option>
                                            <option value="affiliation">Candidature Affiliation (Influenceur/Média)</option>
                                            <option value="marque">Collaboration de Marque</option>
                                            <option value="presse">Demande Presse</option>
                                            <option value="autre">Autre projet</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <ArrowDown size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Votre Message</label>
                                        {touched.message && errors.message && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</span>}
                                    </div>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Décrivez votre audience, vos idées ou vos besoins..."
                                        className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors resize-none ${getBorderClass('message')}`}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    className={`w-full font-bold uppercase tracking-widest py-4 rounded-xl transition-all mt-4 shadow-lg flex items-center justify-center gap-2
                                ${isFormValid
                                            ? 'bg-white text-black hover:bg-gardenz-green hover:text-white cursor-pointer transform active:scale-95'
                                            : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                                        }
                            `}
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'ENVOYER MA DEMANDE'}
                                </button>
                            </form>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};
