
import React, { useState } from 'react';
import { FlaskConical, Brain, Star, TriangleAlert, Zap, ArrowRight, Moon, Wind, Sun, CheckCircle, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, Leaf, Coffee, Smile, Target, BrainCircuit, Activity } from 'lucide-react';

interface AcademySectionProps {
    variant?: 'extreme' | 'wellness';
    topic?: 'thp420' | 'sleep' | 'stress' | 'relaxation' | 'focus';
    molecule?: string;
    showWarning?: boolean;
}

// --- DATA LIBRARY ---
const MOLECULE_LIBRARY: Record<string, any> = {
    // --- SOFT (Wellness) ---
    'CBD': {
        title: "Le Cannabidiol (CBD)",
        subtitle: "L'équilibre au naturel",
        description: "La molécule référence du bien-être. Non psychotrope, elle agit sur l'homéostasie du corps.",
        stats: { type: "Naturel", effect: "Relaxation / Anti-Inflammatoire", public: "Tous publics" },
        tabs: [
            { title: "Définition", content: "Le CBD est un phytocannabinoïde non psychotrope. Il n'entraîne ni euphorie, ni addiction, mais module le système endocannabinoïde." },
            { title: "Effets", content: "Apaisement mental, détente musculaire, réduction du stress et potentiel anti-inflammatoire. Idéal pour le quotidien." },
            { title: "Usage", content: "Huiles, fleurs, cosmétiques. Dosage flexible selon les besoins (matin ou soir)." },
            { title: "Légalité", content: "100% Légal. Non classé comme stupéfiant. Taux de THC < 0.3%." }
        ]
    },
    'CBN': {
        title: "Le Cannabinol (CBN)",
        subtitle: "La molécule du sommeil",
        description: "Issu de l'oxydation du THC, le CBN est reconnu pour ses vertus sédatives puissantes sans l'effet planant.",
        stats: { type: "Naturel", effect: "Sédatif / Sommeil", public: "Insomniaques" },
        tabs: [
            { title: "Définition", content: "Le CBN est souvent appelé le 'cannabinoïde du sommeil'. Il apparaît lorsque le THC vieillit et s'oxyde." },
            { title: "Effets", content: "Propriétés relaxantes très prononcées, favorisant l'endormissement. Effet physique lourd mais esprit clair." },
            { title: "Usage", content: "À privilégier le soir, 30 minutes avant le coucher. Idéal en huile ou infusion." },
            { title: "Légalité", content: "100% Légal. Aucune action psychotrope euphorisante." }
        ]
    },
    'CBG': {
        title: "Le Cannabigérol (CBG)",
        subtitle: "La molécule mère",
        description: "Le précurseur de tous les autres cannabinoïdes. Réputé pour la concentration et la récupération.",
        stats: { type: "Naturel", effect: "Focus / Récupération", public: "Actifs / Sportifs" },
        tabs: [
            { title: "Définition", content: "Le CBG est la 'cellule souche' du cannabis. Il se transforme en CBD ou THC lors de la croissance de la plante." },
            { title: "Effets", content: "Stimule les récepteurs liés à la motivation et à l'appétit. Non sédatif, il favorise la clarté mentale." },
            { title: "Usage", content: "Idéal en journée pour rester productif ou après le sport pour la détente musculaire." },
            { title: "Légalité", content: "100% Légal. Pas d'effet psychotrope." }
        ]
    },
    'H4-CBD': {
        title: "Le H4-CBD",
        subtitle: "Le CBD 2.0 (Hydrogéné)",
        description: "Une version améliorée du CBD, offrant une affinité 100x supérieure pour les récepteurs CB1. Détente profonde.",
        stats: { type: "Semi-Synthétique", effect: "Calmant ++ / Léger Buzz", public: "Initiés" },
        tabs: [
            { title: "Définition", content: "Obtenu par hydrogénation du CBD (ajout d'atomes d'hydrogène). Structure plus stable et biodisponible." },
            { title: "Effets", content: "Souvent décrit comme un 'CBD que l'on sent vraiment'. Détente physique intense et très légère euphorie mentale." },
            { title: "Usage", content: "Pour ceux qui trouvent le CBD classique trop léger. Parfait en fin de journée." },
            { title: "Légalité", content: "Légal. Molécule distincte du THC." }
        ]
    },

    // --- MEDIUM (Extreme Bridge) ---
    'HHC': {
        title: "Le HHC (Hexahydrocannabinol)",
        subtitle: "L'équilibre récréatif",
        description: "Un cannabinoïde hydrogéné offrant une expérience psychoactive claire, euphorique et stable.",
        stats: { type: "Semi-Synthétique", effect: "Euphorie / Détente", public: "Récréatif" },
        tabs: [
            { title: "Définition", content: "Découvert en 1944, c'est une forme hydrogénée du THC. Il est plus stable face à la lumière et la chaleur." },
            { title: "Effets", content: "Similaire au THC mais souvent décrit comme plus 'mental' et moins anxiogène. Environ 70-80% de la puissance du Delta-9." },
            { title: "Usage", content: "Vaporisation ou comestibles. Effets durables (2-4h)." },
            { title: "Précautions", content: "Psychoactif. Ne pas conduire. Déconseillé aux femmes enceintes." }
        ]
    },
    'THCV': {
        title: "Le THCV (Tétrahydrocannabivarine)",
        subtitle: "L'énergie pure",
        description: "Surnommé le 'Diet Weed', il procure un effet énergisant, rapide et clair, sans la fringale.",
        stats: { type: "Naturel (Rare)", effect: "Énergie / Focus", public: "Actifs" },
        tabs: [
            { title: "Définition", content: "Un homologue du THC avec une chaîne carbonée plus courte. Présent naturellement dans certaines Sativa africaines." },
            { title: "Effets", content: "Stimulant, lucide, durée courte. Il coupe la faim contrairement au THC classique." },
            { title: "Usage", content: "Parfait pour la créativité ou les activités sociales en journée." },
            { title: "Précautions", content: "Légèrement psychoactif à haute dose." }
        ]
    },
    'Delta-9-THC': {
        title: "Delta-9 THC (Micro-dosé)",
        subtitle: "La Référence",
        description: "L'étalon-or des cannabinoïdes. Proposé ici dans le strict respect de la limite légale (<0.3%).",
        stats: { type: "Naturel", effect: "Euphorie Classique", public: "Experts" },
        tabs: [
            { title: "Définition", content: "Le principal composant psychoactif du cannabis. Nos produits respectent le ratio légal poids/volume." },
            { title: "Effets", content: "Euphorie, altération sensorielle, relaxation profonde, appétit." },
            { title: "Usage", content: "Réservé aux utilisateurs majeurs avertis. Effet d'entourage maximal." },
            { title: "Légalité", content: "Conforme car < 0.3% dans le produit fini." }
        ]
    },
    'HHCA': {
        title: "Le HHCA (HHC Acétate)",
        subtitle: "Puissance Retardée",
        description: "Une version acétylée du HHC. Plus stable, avec un délai d'activation mais un pic plus intense.",
        stats: { type: "Synthétique", effect: "Intense / Retardé", public: "Initiés" },
        tabs: [
            { title: "Définition", content: "Estérification du HHC. Cette modification chimique améliore la biodisponibilité." },
            { title: "Effets", content: "Environ 100-110% de la puissance du HHC classique. La montée est plus lente (15-30min) mais l'effet dure plus longtemps." },
            { title: "Usage", content: "Attention au redosage (« stack ») à cause du délai d'action." },
            { title: "Précautions", content: "Effet psychoactif marqué." }
        ]
    },

    // --- HARDCORE (Extreme Lab) ---
    'HHC-P': {
        title: "Le HHC-P",
        subtitle: "Le Roi de la Longévité",
        description: "L'un des plus puissants de la lignée HHC. Une expérience psychoactive très forte et très longue.",
        stats: { type: "Synthétique", effect: "Très Puissant / Long", public: "Experts Only" },
        tabs: [
            { title: "Définition", content: "Version hydrogénée du THCP. Sa chaîne latérale à 7 carbones lui permet de se fixer fortement aux récepteurs." },
            { title: "Effets", content: "Estimé à 10x la puissance du THC. Effets corporels et mentaux très intenses pouvant durer jusqu'à 8-12h." },
            { title: "Usage", content: "Micro-dosage impératif. Une seule bouffée suffit souvent." },
            { title: "Warning", content: "Risque de sédation importante. Ne rien prévoir après consommation." }
        ]
    },
    'THCP': {
        title: "Le THCP",
        subtitle: "L'Affinité Maximale",
        description: "La molécule avec l'affinité la plus forte pour les récepteurs CB1 connue à ce jour.",
        stats: { type: "Naturel (Trace)", effect: "Extrême / 30x", public: "Experts Only" },
        tabs: [
            { title: "Définition", content: "Découvert récemment (2019). Possède une chaîne à 7 carbones (contre 5 pour le THC)." },
            { title: "Effets", content: "Jusqu'à 33 fois l'affinité du THC pour les récepteurs. Effet psychotrope immédiat et très puissant." },
            { title: "Usage", content: "Pour les utilisateurs à très haute tolérance uniquement. À mélanger avec du CBD pour tempérer." },
            { title: "Warning", content: "Peut provoquer anxiété ou paranoïa si mal dosé." }
        ]
    },
    'THC-O': {
        title: "Le THC-O (Acétate)",
        subtitle: "L'Esprit Psychédélique",
        description: "Extrêmement puissant, avec un délai d'activation marqué et des effets parfois décrits comme spirituels.",
        stats: { type: "Synthétique", effect: "Introspectif / 300%", public: "Experts Only" },
        tabs: [
            { title: "Définition", content: "Acétate de THC. C'est une prodrogue : elle doit être métabolisée par le foie pour devenir active." },
            { title: "Effets", content: "Environ 3x la puissance du THC. Délai de 30-60 min avant effet. Sensation très 'aérienne' et introspective." },
            { title: "Usage", content: "Ne jamais vaporiser à trop haute température. Préférer les comestibles." },
            { title: "Warning", content: "Délai d'action trompeur. Ne pas redoser avant 2h." }
        ]
    },
    'HHCP-O': {
        title: "Le HHCP-O",
        subtitle: "L'Endurance Absolue",
        description: "Combine la puissance du HHC-P et la biodisponibilité de l'acétate. Effet très puissant et prolongé.",
        stats: { type: "Synthétique", effect: "Longue durée / 200%", public: "Experts Only" },
        tabs: [
            { title: "Définition", content: "Forme acétylée du HHC-P. Résistance accrue à la dégradation." },
            { title: "Effets", content: "Montée lente, plateau très long. Effets résiduels possibles le lendemain." },
            { title: "Usage", content: "Pour les soirs de week-end uniquement." },
            { title: "Warning", content: "La molécule la plus durable du marché actuel." }
        ]
    },
    'THCH': {
        title: "Le THC-H",
        subtitle: "Le Cousin Hexyl",
        description: "Une molécule rare à chaîne hexyle (6 carbones). Un pont entre le THC et le THCP.",
        stats: { type: "Naturel (Trace)", effect: "Puissant / Corporel", public: "Experts" },
        tabs: [
            { title: "Définition", content: "Phytocannabinoïde rare. Sa puissance est estimée à 10-15x celle du THC régulier." },
            { title: "Effets", content: "Très forte relaxation physique ('Body High') accompagnée d'une euphorie joyeuse." },
            { title: "Usage", content: "Idéal pour la relaxation profonde." },
            { title: "Légalité", content: "Molécule distincte, statut légal complexe mais souvent toléré." }
        ]
    },
    'THCB': {
        title: "Le THC-B",
        subtitle: "Le Cousin Butyl",
        description: "Chaîne butyle (4 carbones). Similaire au THC mais potentiellement plus efficace contre la douleur.",
        stats: { type: "Naturel (Trace)", effect: "Rapide / Analgésique", public: "Experts" },
        tabs: [
            { title: "Définition", content: "Homologue du THC. Se lie très efficacement aux récepteurs CB1." },
            { title: "Effets", content: "Action très rapide, puissance similaire ou légèrement supérieure au THC." },
            { title: "Usage", content: "Recherché pour ses effets physiques potentiels." },
            { title: "Légalité", content: "Molécule distincte." }
        ]
    }
};

const DEFAULT_DATA = {
    title: "Analyse Moléculaire",
    subtitle: "Formule Gardenz",
    description: "Une sélection rigoureuse de cannabinoïdes pour une expérience optimale.",
    stats: { type: "Hybride", effect: "Variable", public: "Tous" },
    tabs: [
        { title: "Définition", content: "Produit issu du chanvre certifié européen." },
        { title: "Effets", content: "Dépend de la concentration et des terpènes associés." },
        { title: "Usage", content: "Respecter les conseils d'utilisation sur l'emballage." },
        { title: "Légalité", content: "Produit respectant la législation en vigueur (<0.3% THC)." }
    ]
};

export const AcademySection: React.FC<AcademySectionProps> = ({ variant = 'extreme', topic = 'thp420', molecule = 'CBD', showWarning = true }) => {
    
    // Select Data based on Molecule
    const data = MOLECULE_LIBRARY[molecule] || DEFAULT_DATA;

    // --- RENDER : EXTREME MODE (Dark / Tabbed) ---
    if (variant === 'extreme') {
        return <ExtremeTemplate data={data} showWarning={showWarning} />;
    }

    // --- RENDER : WELLNESS MODE (Light / Scroll) ---
    return <WellnessTemplate topic={topic || 'sleep'} data={data} molecule={molecule} />;
};

// --- SUB-COMPONENT : EXTREME TEMPLATE ---
const ExtremeTemplate = ({ data, showWarning }: { data: any, showWarning: boolean }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="bg-[#111] py-24 relative overflow-hidden text-white border-t border-gray-800">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-cyan/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gardenz-magenta/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
                        <span className="text-gardenz-cyan">{data.title}</span> : {data.subtitle}
                    </h1>
                    
                    {showWarning && (
                        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 animate-pulse">
                            <TriangleAlert size={16} />
                            AVERTISSEMENT : Molécule Puissante. Réservé aux utilisateurs avertis.
                        </div>
                    )}

                    <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center group cursor-pointer">
                        <div className="absolute inset-0 border border-gardenz-cyan/20 rounded-full transition-all duration-500 group-hover:animate-[spin_10s_linear_infinite] group-hover:border-gardenz-cyan group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"></div>
                        <div className="absolute inset-4 border border-gardenz-cyan/40 rounded-full transition-all duration-500 group-hover:animate-[spin_8s_linear_infinite_reverse] group-hover:border-gardenz-cyan group-hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"></div>
                        <div className="relative z-10 transition-transform duration-700 group-hover:animate-bounce">
                            <FlaskConical size={80} className="text-gardenz-cyan transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(0,255,255,0.9)] group-hover:animate-pulse" strokeWidth={1.5} />
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl font-display font-bold text-white mb-8 max-w-2xl mx-auto">
                        {data.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {/* Key Stats */}
                    <div className="bg-[#1A1A1A] border border-gardenz-cyan/30 p-6 rounded-xl text-center group hover:bg-gardenz-cyan/5 transition-colors">
                        <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center text-gardenz-cyan mx-auto mb-4 border border-gardenz-cyan/20 group-hover:scale-110 transition-transform"><FlaskConical size={24} /></div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-2">Type</h3>
                        <p className="font-display font-bold text-white">{data.stats.type}</p>
                    </div>
                    <div className="bg-[#1A1A1A] border border-gardenz-cyan/30 p-6 rounded-xl text-center group hover:bg-gardenz-cyan/5 transition-colors">
                        <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center text-gardenz-cyan mx-auto mb-4 border border-gardenz-cyan/20 group-hover:scale-110 transition-transform"><Brain size={24} /></div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-2">Effet / Intensité</h3>
                        <p className="font-display font-bold text-white">{data.stats.effect}</p>
                    </div>
                    <div className="bg-[#1A1A1A] border border-gardenz-cyan/30 p-6 rounded-xl text-center group hover:bg-gardenz-cyan/5 transition-colors">
                        <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center text-gardenz-cyan mx-auto mb-4 border border-gardenz-cyan/20 group-hover:scale-110 transition-transform"><Star size={24} /></div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-2">Public Cible</h3>
                        <p className="font-display font-bold text-white">{data.stats.public}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-1 space-y-2">
                        {data.tabs.map((tab: any, idx: number) => (
                            <button key={idx} onClick={() => setActiveTab(idx)} className={`w-full text-left px-4 py-3 text-sm font-bold rounded-lg transition-all duration-300 border-l-4 ${activeTab === idx ? 'bg-gardenz-cyan/10 border-gardenz-cyan text-gardenz-cyan' : 'bg-transparent border-gray-800 text-gray-500 hover:text-white hover:bg-[#222]'}`}>{idx + 1}. {tab.title}</button>
                        ))}
                    </div>
                    <div className="lg:col-span-3 bg-[#1A1A1A] border border-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden min-h-[300px]">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                        {/* Tab Content */}
                        <div className="animate-fade-in space-y-6 relative z-10">
                            <h2 className="font-display text-3xl font-bold text-white mb-6">{data.tabs[activeTab].title}</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {data.tabs[activeTab].content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- SUB-COMPONENT : WELLNESS TEMPLATE ---
const WellnessTemplate = ({ topic, data, molecule }: { topic: string, data: any, molecule: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // CONTENT DATA BASED ON USAGE TOPIC
    const topicMap: Record<string, any> = {
        sleep: {
            icon: <Moon size={24} />,
            title: "Mieux Dormir",
            intro: "Retrouver un sommeil profond et réparateur.",
            mainSectionTitle: "Une solution naturelle pour la nuit",
            mainSectionText: "Le CBD aide à réguler le cycle veille-repos en favorisant une relaxation profonde avant le coucher."
        },
        stress: {
            icon: <BrainCircuit size={24} />,
            title: "Gérer le Stress",
            intro: "Apaiser l'esprit et réduire la charge mentale.",
            mainSectionTitle: "Calmer l'esprit sans l'endormir",
            mainSectionText: "Propriétés anxiolytiques reconnues pour aider à gérer les pics de stress sans altérer la vigilance."
        },
        relaxation: {
            icon: <Wind size={24} />,
            title: "Relaxation & Détente",
            intro: "Savoir appuyer sur 'Pause' et lâcher prise.",
            mainSectionTitle: "L'art de la décompression",
            mainSectionText: "Signale au système nerveux qu'il est temps de réduire la pression. Idéal après le travail."
        },
        focus: {
            icon: <Sun size={24} />,
            title: "Focus & Énergie",
            intro: "Clarifier l'esprit et booster la productivité.",
            mainSectionTitle: "Vigilance naturelle",
            mainSectionText: "Contrairement aux excitants, certains cannabinoïdes comme le CBG favorisent un éveil calme."
        }
    };

    const topicData = topicMap[topic] || topicMap['sleep'];

    return (
        <section className="bg-[#F9F9F4] py-16 border-t border-gardenz-green/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gardenz-green/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gardenz-terra/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gardenz-green/10 rounded-full text-gardenz-green mb-4">
                        {topicData.icon}
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-gardenz-dark mb-4">
                        {molecule} & {topicData.title}
                    </h2>
                    <p className="text-lg text-gray-600 italic font-medium">
                        {topicData.intro}
                    </p>
                </div>

                {/* Content */}
                <div className={`prose prose-stone max-w-none text-gray-600 space-y-8 ${isExpanded ? '' : 'max-h-[600px] overflow-hidden relative'}`}>
                    
                    {/* Molecule Focus Box */}
                    <div className="bg-white p-6 rounded-2xl border border-gardenz-green/10 shadow-sm">
                        <h3 className="font-display text-xl font-bold text-gardenz-dark mb-2">Zoom sur : {data.title}</h3>
                        <p className="text-sm italic mb-4">{data.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="font-bold text-gardenz-green block">Type</span>
                                {data.stats.type}
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="font-bold text-gardenz-green block">Action</span>
                                {data.stats.effect}
                            </div>
                        </div>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8 flex items-center gap-2">
                        <Leaf className="text-gardenz-green" size={20} /> {topicData.mainSectionTitle}
                    </h3>
                    <p>{topicData.mainSectionText}</p>
                    
                    {/* Dynamic Tabs Content from Molecule Data */}
                    <div className="space-y-6 mt-8">
                        {data.tabs.map((tab: any, idx: number) => (
                            <div key={idx}>
                                <h4 className="font-bold text-gardenz-dark text-lg mb-2">{tab.title}</h4>
                                <p className="text-sm leading-relaxed">{tab.content}</p>
                            </div>
                        ))}
                    </div>

                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F9F9F4] to-transparent flex items-end justify-center pb-4 z-20">
                            <button onClick={() => setIsExpanded(true)} className="bg-white border border-gardenz-green text-gardenz-green px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-gardenz-green hover:text-white transition-all flex items-center gap-2">
                                Lire la suite <ChevronDown size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {isExpanded && (
                    <div className="text-center mt-8">
                        <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gardenz-green text-sm font-medium flex items-center gap-1 mx-auto transition-colors">
                            Réduire le contenu <ChevronUp size={16} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
