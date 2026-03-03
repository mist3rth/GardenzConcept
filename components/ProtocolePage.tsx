
import React, { useState, useMemo, useEffect } from 'react';
import {
    Activity, Moon, Sun, ShieldCheck, FlaskConical, Info,
    ChevronRight, CheckCircle, BrainCircuit, Scale,
    Dumbbell, Lightbulb, Zap, Thermometer, Droplet,
    EyeOff, AlertTriangle, Timer, Hourglass, Target, Wind, Utensils
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const ProtocolePage: React.FC = () => {
    const [weight, setWeight] = useState('60-90');
    const [tolerance, setTolerance] = useState('beginner');
    const [goal, setGoal] = useState('sleep');
    const location = useLocation();

    useEffect(() => {
        if (location.state?.anchor) {
            const el = document.getElementById(location.state.anchor);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    // LOGIQUE DE CALCUL DU DOSAGE
    const recommendation = useMemo(() => {
        let baseDrops = 2;
        let concentration = "10%";
        let timing = "30 min avant le coucher";
        let advice = "Divisez la prise en deux : matin et soir.";

        // Ajustement selon Tolérance
        if (tolerance === 'inter') baseDrops = 5;
        if (tolerance === 'expert') {
            baseDrops = 8;
            concentration = "20%";
        }

        // Multiplicateur selon Poids
        let multiplier = 1;
        if (weight === '60-90') multiplier = 1.5;
        if (weight === 'gt90') multiplier = 2.2;

        const minDrops = Math.floor(baseDrops * multiplier);
        const maxDrops = Math.ceil((baseDrops + 2) * multiplier);

        // Personnalisation selon Objectif
        if (goal === 'sleep') {
            timing = "1 prise unique 45 min avant le dodo";
            advice = "Commencez par le palier bas. L'obscurité totale aide à l'activation du CBN.";
        } else if (goal === 'sport') {
            timing = "Post-effort immédiat ou avant le coucher";
            advice = "Idéal pour réduire l'inflammation. Massez aussi les zones sensibles avec un baume.";
        } else if (goal === 'focus') {
            timing = "Le matin à jeun ou avec un café";
            advice = "Le CBG est votre meilleur allié ici. Évitez les dosages trop lourds qui pourraient sédater.";
        }

        return { range: `${minDrops} À ${maxDrops}`, concentration, timing, advice };
    }, [weight, tolerance, goal]);

    return (
        <div className="bg-gardenz-white min-h-screen font-sans">

            {/* 1. HERO SECTION : MANIFESTE */}
            <div className="bg-[#0A1008] pt-40 pb-24 px-6 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gardenz-green/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-gardenz-green/10 border border-gardenz-green/30 text-gardenz-green px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-8 animate-fade-in">
                        <Activity size={14} /> Naturopathie Moderne
                    </div>
                    <h1 className="font-display text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase leading-[0.9]">
                        MAÎTRISEZ VOTRE <br /><span className="text-gardenz-green italic text-outline-white">SWEET SPOT</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Le CBD n'est pas un remède miracle, c'est une science du dosage. <br />
                        <span className="text-white">Ne gâchez pas votre vibe, dosez juste.</span>
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-20 pb-40">

                {/* 2. PHILOSOPHIE : START LOW, GO SLOW */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <div>
                        <h2 className="font-display text-3xl font-bold text-gardenz-dark mb-6 uppercase tracking-tight">
                            1. LA RÈGLE D'OR : <br />
                            <span className="text-gardenz-green italic">"START LOW, GO SLOW"</span>
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Pourquoi votre meilleur ami se sent "chill" avec 2 gouttes alors qu'il vous en faut 5 ? La réponse tient en trois lettres : <strong>SEC</strong> (Système Endocannabinoïde).
                            </p>
                            <p>
                                Ce réseau de récepteurs est unique à chaque individu, comme une empreinte digitale. Il régule votre sommeil, votre humeur et votre douleur. Pour ne pas saturer vos récepteurs, nous prônons l'augmentation progressive.
                            </p>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-8">
                                <h4 className="font-bold text-gardenz-dark mb-2 flex items-center gap-2">
                                    <Target className="text-gardenz-green" size={18} /> Trouver votre Sweet Spot
                                </h4>
                                <p className="text-sm">C’est le dosage exact où vous ressentez les bénéfices optimaux sans gaspiller de produit. Une fois atteint, stagnez : plus n’est pas forcément mieux.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gardenz-green/5 rounded-[3rem] -rotate-3"></div>
                        <div className="relative bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl">
                            <h3 className="font-display font-bold text-xl mb-6 text-center">LE CALENDRIER DE PROGRESSION</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gardenz-green text-white flex items-center justify-center font-bold shrink-0">01</div>
                                    <p className="text-sm"><strong>Jours 1 à 3 :</strong> Dose minimale (ex: 2 gouttes, 2 fois/jour). On observe sans juger.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gardenz-green/20 text-gardenz-green flex items-center justify-center font-bold shrink-0">02</div>
                                    <p className="text-sm"><strong>Jours 4 à 7 :</strong> Si besoin, ajoutez 1 goutte par prise. Stabilisez.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gardenz-green/10 text-gardenz-green flex items-center justify-center font-bold shrink-0">03</div>
                                    <p className="text-sm"><strong>Semaine 2 :</strong> Évaluez votre ressenti. Vous dormez mieux ? Tenez ce dosage.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. SIMULATEUR DE DOSAGE FONCTIONNEL */}
                <div id="dosage-calculator" className="bg-[#111] rounded-[3rem] p-10 md:p-16 text-white mb-32 relative overflow-hidden border border-white/5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gardenz-green/10 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tighter">
                                2. CALCULATEUR DE <span className="text-gardenz-green">PRÉCISION</span>
                            </h2>
                            <p className="text-gray-400 max-w-xl mx-auto text-sm">
                                Définissez votre profil pour obtenir une recommandation basée sur nos protocoles de naturopathie.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            {/* Variable : Poids */}
                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Scale size={14} /> Votre Profil (Poids)
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { id: 'lt60', label: 'Moins de 60kg' },
                                        { id: '60-90', label: '60kg à 90kg' },
                                        { id: 'gt90', label: 'Plus de 90kg' }
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setWeight(item.id)}
                                            className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all transform active:scale-95 ${weight === item.id ? 'bg-gardenz-green border-gardenz-green text-white shadow-[0_0_20px_rgba(56,118,29,0.3)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Variable : Tolérance */}
                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Zap size={14} /> Niveau de Tolérance
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { id: 'beginner', label: 'Débutant (Curieux)' },
                                        { id: 'inter', label: 'Intermédiaire (Habitué)' },
                                        { id: 'expert', label: 'Expert (Le Clan)' }
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setTolerance(item.id)}
                                            className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all transform active:scale-95 ${tolerance === item.id ? 'bg-gardenz-green border-gardenz-green text-white shadow-[0_0_20px_rgba(56,118,29,0.3)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Variable : Objectif */}
                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Lightbulb size={14} /> Votre Objectif
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { id: 'sleep', label: 'Sommeil Profond', icon: <Moon size={14} /> },
                                        { id: 'sport', label: 'Récupération Sportive', icon: <Dumbbell size={14} /> },
                                        { id: 'focus', label: 'Focus & Créativité', icon: <Zap size={14} /> }
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setGoal(item.id)}
                                            className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 transform active:scale-95 ${goal === item.id ? 'bg-gardenz-green border-gardenz-green text-white shadow-[0_0_20px_rgba(56,118,29,0.3)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            {item.icon} {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Résultat Dynamique */}
                        <div key={`${weight}-${tolerance}-${goal}`} className="bg-gardenz-green/20 border border-gardenz-green/40 p-8 md:p-12 rounded-[2.5rem] text-center animate-scale-up relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gardenz-green to-transparent"></div>

                            <h4 className="text-gardenz-green font-bold uppercase tracking-widest text-xs mb-4">Votre recommandation Gardenz</h4>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                                <div>
                                    <div className="text-4xl md:text-6xl font-display font-bold mb-2">
                                        {recommendation.range} <span className="text-lg md:text-2xl text-gardenz-green">GOUTTES / JOUR</span>
                                    </div>
                                    <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold italic">
                                        Basé sur une huile <span className="text-white">CBD {recommendation.concentration}</span>
                                    </p>
                                </div>

                                <div className="h-px w-12 bg-white/10 md:h-12 md:w-px"></div>

                                <div className="text-left space-y-3 max-w-xs">
                                    <div className="flex items-start gap-3">
                                        <Timer size={16} className="text-gardenz-green shrink-0 mt-1" />
                                        <p className="text-sm"><strong className="text-white">Timing :</strong> {recommendation.timing}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Info size={16} className="text-gardenz-green shrink-0 mt-1" />
                                        <p className="text-sm text-gray-300 italic">{recommendation.advice}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gardenz-green hover:text-white transition-all">
                                    Voir les huiles {recommendation.concentration}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. MÉTHODES D'ADMINISTRATION (COMPARATIF) */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-gardenz-dark mb-4 uppercase tracking-tighter">
                            3. MÉTHODES D'ADMINISTRATION
                        </h2>
                        <p className="text-gray-500 italic">Le vecteur change tout : vitesse de ressenti vs durée d'action.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Sublingual (Huiles)",
                                desc: "La méthode de référence. Directement sous la langue pour une absorption par les muqueuses.",
                                start: "15-30 min",
                                duration: "4-6 heures",
                                icon: <Droplet className="text-gardenz-green" />,
                                vibe: "Équilibre & Précision"
                            },
                            {
                                title: "Vaporisation (Fleurs)",
                                desc: "Le pic d'intensité. Passage par les poumons pour une biodisponibilité maximale.",
                                start: "1-5 min",
                                duration: "1-2 heures",
                                icon: <Wind className="text-gardenz-cyan" />,
                                vibe: "Instantané & Puissant"
                            },
                            {
                                title: "Ingestion (Edibles)",
                                desc: "La diffusion lente. Passage par le système digestif et métabolisation par le foie.",
                                start: "45-90 min",
                                duration: "8-12 heures",
                                icon: <Utensils className="text-gardenz-terra" />,
                                vibe: "Durable & Profond"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-lg hover:shadow-xl transition-all group">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="font-display text-xl font-bold mb-2 uppercase">{item.title}</h3>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4 italic">{item.vibe}</span>
                                <p className="text-sm text-gray-500 leading-relaxed mb-8">{item.desc}</p>

                                <div className="space-y-3 pt-6 border-t border-gray-50">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400 flex items-center gap-1"><Timer size={14} /> Ressenti après</span>
                                        <span className="font-bold text-gardenz-dark">{item.start}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400 flex items-center gap-1"><Hourglass size={14} /> Durée totale</span>
                                        <span className="font-bold text-gardenz-dark">{item.duration}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. SÉCURITÉ & CONSERVATION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contre-indications */}
                    <div className="bg-red-50 border border-red-100 rounded-[2.5rem] p-10">
                        <h3 className="font-display text-2xl font-bold text-red-900 mb-6 uppercase flex items-center gap-3">
                            <ShieldCheck size={28} /> SÉCURITÉ & RIGUEUR
                        </h3>
                        <ul className="space-y-4 text-sm text-red-800/80 leading-relaxed">
                            <li className="flex gap-3 items-start">
                                <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                                <span><strong>Interactions Médicamenteuses :</strong> Le CBD peut inhiber certains enzymes hépatiques. Si vous suivez un traitement (anticoagulants, anti-épileptiques), consultez impérativement votre médecin.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <CheckCircle className="shrink-0 mt-0.5" size={16} />
                                <span><strong>Femmes enceintes :</strong> Par principe de précaution, l'usage est déconseillé pendant la grossesse et l'allaitement.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <CheckCircle className="shrink-0 mt-0.5" size={16} />
                                <span><strong>Mineurs :</strong> Vente et consommation strictement interdites aux moins de 18 ans.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Conservation */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gardenz-terra/5 rounded-full blur-3xl"></div>
                        <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-6 uppercase flex items-center gap-3">
                            <FlaskConical size={28} className="text-gardenz-terra" /> CONSERVATION EXPERTE
                        </h3>
                        <p className="text-gray-400 text-sm mb-8 italic">Gardez vos molécules intactes, préservez la puissance.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gardenz-terra"><EyeOff size={20} /></div>
                                <h4 className="font-bold text-[10px] uppercase tracking-widest">Obscurité</h4>
                                <p className="text-[9px] text-gray-400 mt-1">Les UV dégradent les cannabinoïdes.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gardenz-terra"><Thermometer size={20} /></div>
                                <h4 className="font-bold text-[10px] uppercase tracking-widest">Fraîcheur</h4>
                                <p className="text-[9px] text-gray-400 mt-1">Évitez les sources de chaleur directes.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gardenz-terra"><Droplet size={20} /></div>
                                <h4 className="font-bold text-[10px] uppercase tracking-widest">Humidité</h4>
                                <p className="text-[9px] text-gray-400 mt-1">Gardez vos fleurs au sec (mais pas trop).</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};
