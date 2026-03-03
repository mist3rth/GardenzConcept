
import React, { useRef, useState, useEffect } from 'react';
import { Store, ShoppingBag, ShieldCheck, MapPin, Search, ArrowRight, ArrowDown, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PartnerPageProps { }

export const PartnerPage: React.FC<PartnerPageProps> = () => {
    const formRef = useRef<HTMLDivElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        email: '',
        phone: '',
        message: ''
    });

    const [touched, setTouched] = useState({
        name: false,
        city: false,
        email: false,
        phone: false,
        message: false
    });

    const [errors, setErrors] = useState({
        name: '',
        city: '',
        email: '',
        phone: '',
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
            case 'city':
                if (!value.trim()) error = 'La ville est requise.';
                break;
            case 'email':
                if (!value.trim()) error = "L'email est requis.";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Format d'email invalide.";
                break;
            case 'phone':
                if (!value.trim()) error = 'Le téléphone est requis.';
                break;
            case 'message':
                if (!value.trim()) error = 'Le message est requis.';
                break;
        }
        return error;
    };

    useEffect(() => {
        const newErrors = {
            name: validateField('name', formData.name),
            city: validateField('city', formData.city),
            email: validateField('email', formData.email),
            phone: validateField('phone', formData.phone),
            message: validateField('message', formData.message),
        };

        const isValid =
            !newErrors.name &&
            !newErrors.city &&
            !newErrors.email &&
            !newErrors.phone &&
            !newErrors.message &&
            Object.values(formData).every(val => val !== '');

        setIsFormValid(isValid);
    }, [formData]);


    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
            setFormData({ name: '', city: '', email: '', phone: '', message: '' });
            setTouched({ name: false, city: false, email: false, phone: false, message: false });
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
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-green/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gardenz-magenta/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        OUVREZ VOTRE <span className="text-gardenz-green drop-shadow-[0_0_15px_rgba(56,118,29,0.4)]">FRANCHISE</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Rejoignez le réseau leader du CBD Premium en France. <br className="hidden md:block" />
                        Un concept clé en main, rentable et accompagné.
                    </p>
                    <button onClick={scrollToForm} className="mt-8 bg-gardenz-green text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-gardenz-green transition-all shadow-[0_0_20px_rgba(56,118,29,0.3)]">
                        Demander la brochure
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-20">

                {/* LES CHIFFRES CLÉS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    <div className="bg-[#151515] border border-gray-800 p-6 rounded-2xl text-center">
                        <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">30+</div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Boutiques</p>
                    </div>
                    <div className="bg-[#151515] border border-gray-800 p-6 rounded-2xl text-center">
                        <div className="text-3xl md:text-4xl font-display font-bold text-gardenz-green mb-2">98%</div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Satisfaction</p>
                    </div>
                    <div className="bg-[#151515] border border-gray-800 p-6 rounded-2xl text-center">
                        <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">45k€</div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Apport Moyen</p>
                    </div>
                    <div className="bg-[#151515] border border-gray-800 p-6 rounded-2xl text-center">
                        <div className="text-3xl md:text-4xl font-display font-bold text-gardenz-magenta mb-2">x3</div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Croissance An.</p>
                    </div>
                </div>

                {/* POURQUOI CHOISIR GARDENZ */}
                <div className="mb-24">
                    <h2 className="font-display text-3xl font-bold text-white text-center mb-16">
                        LE CONCEPT <span className="text-gardenz-green">GARDENZ</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Point 1 */}
                        <div className="flex gap-6 group">
                            <div className="w-16 h-16 bg-gardenz-green/10 rounded-2xl flex items-center justify-center text-gardenz-green shrink-0 group-hover:scale-110 transition-transform">
                                <Store size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Une Identité Forte</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    Bien plus qu'un simple magasin de CBD. Gardenz est une marque Lifestyle, urbaine et premium. Nos boutiques sont des lieux de vie au design soigné qui fidélisent une clientèle exigeante.
                                </p>
                            </div>
                        </div>

                        {/* Point 2 */}
                        <div className="flex gap-6 group">
                            <div className="w-16 h-16 bg-gardenz-cyan/10 rounded-2xl flex items-center justify-center text-gardenz-cyan shrink-0 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Qualité & Formation</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    Nous formons nos franchisés pour devenir de véritables experts (Cannabinologie, Vente, Gestion). De plus, notre centrale d'achat garantit les meilleurs produits du marché, testés et certifiés.
                                </p>
                            </div>
                        </div>

                        {/* Point 3 */}
                        <div className="flex gap-6 group">
                            <div className="w-16 h-16 bg-gardenz-magenta/10 rounded-2xl flex items-center justify-center text-gardenz-magenta shrink-0 group-hover:scale-110 transition-transform">
                                <ShoppingBag size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Centrale d'Achat Puissante</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    Profitez de nos volumes d'achat pour obtenir des marges confortables. Accédez en avant-première à nos innovations (HHCPO, Gummies, Vapes Tech) qui drivent le marché.
                                </p>
                            </div>
                        </div>

                        {/* Point 4 */}
                        <div className="flex gap-6 group">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                                <Search size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Marketing & Visibilité</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    Référencement local, réseaux sociaux, campagnes nationales... Nous vous donnons les clés pour attirer du trafic dès l'ouverture de votre point de vente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FORMULAIRE */}
                <div ref={formRef} className="max-w-3xl mx-auto bg-[#151515] border border-gray-800 rounded-3xl p-8 md:p-12 scroll-mt-24 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gardenz-green/20 rounded-full blur-[60px] pointer-events-none"></div>

                    {isSent ? (
                        <div className="text-center py-12 animate-fade-in">
                            <div className="w-20 h-20 bg-gardenz-green rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_30px_rgba(56,118,29,0.4)]">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="font-display text-3xl font-bold text-white mb-4">Candidature Envoyée !</h3>
                            <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                                Merci de votre intérêt pour la franchise Gardenz. Notre responsable développement prendra contact avec vous très prochainement.
                            </p>
                            <button
                                onClick={() => setIsSent(false)}
                                className="mt-8 text-sm font-bold text-gardenz-green hover:text-white transition-colors underline underline-offset-4"
                            >
                                Nouvelle demande
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-10">
                                <h3 className="font-display text-2xl font-bold text-white mb-2">LANCEZ-VOUS</h3>
                                <p className="text-gray-500 text-sm">Remplissez ce formulaire pour recevoir notre dossier d'information.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nom Complet</label>
                                            {touched.name && errors.name && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</span>}
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Votre Nom"
                                            className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${getBorderClass('name')}`}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Ville Souhaitée</label>
                                            {touched.city && errors.city && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.city}</span>}
                                        </div>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="ex: Lyon, Bordeaux..."
                                            className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${getBorderClass('city')}`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                                            {touched.email && errors.email && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</span>}
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="votre@email.com"
                                            className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${getBorderClass('email')}`}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Téléphone</label>
                                            {touched.phone && errors.phone && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</span>}
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="06 00 00 00 00"
                                            className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${getBorderClass('phone')}`}
                                        />
                                    </div>
                                </div>


                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Votre Projet</label>
                                        {touched.message && errors.message && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</span>}
                                    </div>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Racontez-nous brièvement votre parcours et vos motivations..."
                                        className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors resize-none ${getBorderClass('message')}`}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    className={`w-full font-bold uppercase tracking-widest py-4 rounded-xl transition-all mt-4 shadow-lg flex items-center justify-center gap-2
                                ${isFormValid
                                            ? 'bg-gardenz-green text-white hover:bg-white hover:text-gardenz-green cursor-pointer transform active:scale-95'
                                            : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                                        }
                            `}
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'ENVOYER MA CANDIDATURE'}
                                </button>
                            </form>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};
