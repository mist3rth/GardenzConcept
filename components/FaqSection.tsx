
import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, FlaskConical, Crown, Scale, AlertTriangle, FileText, Zap, Music, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqSection: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const faqData = [
    {
        id: 'legality-2026',
        title: 'Légalité & Réglementation 2026',
        subtitle: 'Zéro zone grise',
        icon: <Scale size={20} />,
        color: 'cyan',
        borderColor: 'border-gardenz-cyan',
        headerClass: 'bg-gardenz-cyan text-black',
        questions: [
            {
                q: "Est-ce que je risque quelque chose avec la police si je me fais contrôlé ?",
                a: (
                    <div className="space-y-3">
                        <p>Non, tant que vous restez dans le cadre de la loi. En France, la vente et la consommation de produits CBD sont légales si le taux de <strong>THC est inférieur à 0,3%</strong>. Tous nos produits sont certifiés par des laboratoires indépendants.</p>
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                            <li><strong>Conseil :</strong> Gardez toujours l'emballage d'origine et la facture (disponible dans votre compte) pour prouver la provenance licite du produit en cas de contrôle.</li>
                            <li><strong>Facture :</strong> Elle mentionne explicitement la conformité au décret européen.</li>
                        </ul>
                    </div>
                )
            },
            {
                q: "Test salivaire et CBD : Est-ce que je vais perdre mon permis ?",
                a: "C'est la question n°1. Les tests salivaires de la police détectent le THC, pas le CBD. Bien que nos produits respectent le seuil de 0,3%, une consommation importante juste avant de conduire peut déclencher un test positif. La tolérance au volant est de 0%. Pour une sécurité totale, nous conseillons d'attendre 6h après consommation avant de prendre la route."
            },
            {
                q: "Est-ce que les nouvelles molécules comme le THCP sont vraiment légales ?",
                a: "Oui, actuellement. Le THCP et d'autres molécules mineures ne sont pas classés comme stupéfiants par l'ANSM à ce jour. Gardenz effectue une veille juridique hebdomadaire. Si une molécule change de statut réglementaire, elle est retirée de la vente dans l'heure. Vous achetez donc toujours des produits 100% légaux au moment de votre commande."
            }
        ]
    },
    {
        id: 'quality-lab',
        title: 'Qualité Labo & Pureté',
        subtitle: 'L\'envers du décor',
        icon: <FlaskConical size={20} />,
        color: 'green',
        borderColor: 'border-gardenz-green',
        headerClass: 'bg-gardenz-green text-white',
        questions: [
            {
                q: "D'où vient votre chanvre et comment être sûr qu'il n'y a pas de produits chimiques ?",
                a: (
                    <div className="space-y-3">
                        <p>Notre chanvre provient exclusivement de fermes organiques en Europe (France, Italie, Suisse). Nous interdisons l'usage de pesticides, fongicides et métaux lourds.</p>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs">
                            <p className="font-bold mb-1 italic">Le saviez-vous ?</p>
                            <p>Le chanvre est une plante 'dépolluante' qui absorbe les toxines du sol. C'est pourquoi nous testons systématiquement la terre de nos producteurs avant chaque récolte.</p>
                        </div>
                    </div>
                )
            },
            {
                q: "Comment lire vos rapports de labo (CoA) pour vérifier le taux de THC ?",
                a: (
                    <div className="space-y-2">
                        <p>Chaque produit a son <strong>CoA (Certificate of Analysis)</strong> dans l'onglet 'Lab Report'.</p>
                        <p>Cherchez la ligne <strong>'Delta-9 THC'</strong>. Le résultat doit être écrit '&lt; 0.3%' ou 'LOD/LOQ' (Non détecté). Si vous voyez ces mentions, le produit est conforme et sans danger pour la légalité.</p>
                    </div>
                )
            },
            {
                q: "C'est quoi la différence entre spectre complet (Full Spectrum) et Isolat ?",
                a: "Le Full Spectrum contient tous les cannabinoïdes et terpènes de la plante (effet d'entourage pour plus d'efficacité). L'Isolat est une poudre de CBD pure à 99%, sans aucune autre molécule et sans THC du tout. Si vous êtes soumis à des tests réguliers au travail, l'Isolat est votre meilleure option."
            }
        ]
    },
    {
        id: 'the-clan',
        title: 'Le Clan : Lifestyle & Privilèges',
        subtitle: 'Plus qu\'un shop',
        icon: <Crown size={20} />,
        color: 'terra',
        borderColor: 'border-gardenz-terra',
        headerClass: 'bg-gardenz-terra text-white',
        questions: [
            {
                q: "Comment fonctionnent vos points de fidélité 'Buds' et comment les utiliser ?",
                a: "Chaque euro dépensé vous rapporte 10 Buds. Vous pouvez les transformer en bons de réduction directement dans votre panier lors de votre prochain achat. Les Buds n'expirent jamais tant que vous passez au moins une commande par an."
            },
            {
                q: "Comment devenir ambassadeur ou partenaire du Clan Gardenz ?",
                a: (
                    <div className="space-y-2">
                        <p>Nous cherchons toujours des créateurs et des experts. Si vous avez une communauté ou un projet lié au bien-être, rendez-vous sur notre page <strong>Partenaires</strong> ou contactez-nous par mail.</p>
                        <Link to="/pros" className="text-gardenz-green font-bold text-xs hover:underline uppercase">En savoir plus sur l'affiliation &gt;</Link>
                    </div>
                )
            },
            {
                q: "Drops exclusifs : Comment être sûr de ne pas rater les éditions limitées ?",
                a: "Les membres du Clan reçoivent un accès prioritaire via SMS et Email 24h avant l'ouverture publique du Drop. Pour ne rien rater, vérifiez que vous avez bien coché 'Recevoir les offres exclusives' dans les paramètres de votre compte."
            }
        ]
    }
  ];

  return (
    <section className="bg-gardenz-white py-16 border-t border-gray-100 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gardenz-terra/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Navigation Rapide */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gardenz-green via-gardenz-cyan to-gardenz-magenta"></div>
            <h3 className="font-display font-bold text-sm uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                Navigation Thématique
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {faqData.map((section) => (
                    <button 
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all border border-transparent hover:border-gray-200 group h-full"
                    >
                        <span className={`mb-3 p-3 rounded-xl bg-white shadow-md group-hover:scale-110 transition-transform ${
                            section.color === 'cyan' ? 'text-gardenz-cyan' :
                            section.color === 'green' ? 'text-gardenz-green' :
                            'text-gardenz-terra'
                        }`}>
                            {section.icon}
                        </span>
                        <span className="text-xs font-display font-bold text-center text-gardenz-dark uppercase tracking-widest leading-tight">{section.title}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Corps de la FAQ */}
        <div className="space-y-16">
            {faqData.map((section) => (
                <div id={section.id} key={section.id} className="scroll-mt-32">
                    {/* Section Header */}
                    <div className={`flex items-center gap-4 px-8 py-6 rounded-t-[2rem] font-display font-bold text-xl uppercase tracking-tighter border-t border-x ${section.borderColor} ${section.headerClass}`}>
                        {section.icon}
                        <span>{section.title}</span>
                        <span className="opacity-40 text-xs normal-case font-sans hidden sm:inline ml-auto tracking-widest font-bold">/ {section.subtitle}</span>
                    </div>

                    {/* Questions Container */}
                    <div className={`bg-white rounded-b-[2rem] border-x border-b border-gray-200 overflow-hidden shadow-xl`}>
                        {section.questions.map((item, idx) => {
                            const questionId = `${section.id}-${idx}`;
                            const isOpen = activeAccordion === questionId;

                            return (
                                <div key={idx} className="border-b border-gray-50 last:border-0">
                                    <button 
                                        onClick={() => toggleAccordion(questionId)}
                                        className="w-full text-left px-8 py-6 flex justify-between items-start hover:bg-gray-50 transition-colors focus:outline-none group"
                                    >
                                        <span className={`font-display font-bold text-base md:text-lg pr-4 transition-colors leading-tight ${isOpen ? 'text-gardenz-green' : 'text-gardenz-dark group-hover:text-gardenz-green'}`}>
                                            {item.q}
                                        </span>
                                        <div className={`mt-1 p-1 rounded-full transition-all ${isOpen ? 'bg-gardenz-green text-white rotate-180' : 'bg-gray-100 text-gray-400'}`}>
                                            <ChevronDown size={18} />
                                        </div>
                                    </button>
                                    <div 
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="px-8 pb-8 pl-14 text-gray-600 leading-relaxed text-sm relative">
                                            <div className="absolute left-8 top-0 bottom-8 w-0.5 bg-gray-100"></div>
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>

        {/* Bloc de Réassurance Final */}
        <div className="mt-24 bg-gardenz-black border border-white/10 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gardenz-green/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <h3 className="font-display text-3xl font-bold text-white mb-6 tracking-tight uppercase">ENCORE UN DOUTE ? <br/><span className="text-gardenz-green">L'EXPERTISE NE S'ARRÊTE PAS ICI.</span></h3>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg font-medium leading-relaxed">
                Notre équipe de passionnés est disponible 7j/7 pour répondre à vos questions techniques ou réglementaires.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                    to="/contact"
                    className="bg-gardenz-green text-white px-10 py-4 rounded-full font-display font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-gardenz-green transition-all flex items-center justify-center gap-3 shadow-lg transform hover:-translate-y-1 block"
                >
                    <ShieldCheck size={20} /> Parler à un Expert
                </Link>
                <Link 
                    to="/protocole"
                    className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-full font-display font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 block"
                >
                    <FileText size={20} /> Guide du Dosage
                </Link>
            </div>
        </div>

      </div>
    </section>
  );
};
