
import React, { useState } from 'react';
import { Moon, Leaf, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, CheckCircle, BrainCircuit } from 'lucide-react';

export const WellnessContentSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-[#F9F9F4] py-16 border-t border-gardenz-green/10 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gardenz-green/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gardenz-terra/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gardenz-green/10 rounded-full text-gardenz-green mb-4">
                <Moon size={24} />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gardenz-dark mb-4">
                Le CBD pour mieux dormir, <br/><span className="text-gardenz-green">naturellement et sans accoutumance</span>
            </h2>
            <p className="text-lg text-gray-600 italic font-medium">
                Les nuits paisibles, ça commence ici.
            </p>
        </div>

        {/* Content Body */}
        <div className={`prose prose-stone max-w-none text-gray-600 space-y-8 ${isExpanded ? '' : 'max-h-[600px] overflow-hidden relative'}`}>
            
            {/* Intro */}
            <p className="lead text-lg leading-relaxed">
                Dans cette catégorie, tu trouveras les meilleures solutions CBD pour t’aider à retrouver un sommeil profond et réparateur, sans effets secondaires ni accoutumance.
                Que tu préfères quelques gouttes d’huile CBD sous la langue, un gummy savoureux, ou une gélule facile à prendre, chaque produit a été sélectionné pour t’accompagner dans ton rituel du soir.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-gardenz-green/10 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-gardenz-dark mb-2">Notre Promesse</h3>
                    <p className="text-sm">Huiles CBD, gummies CBD, ou gélules CBD, tous ont un point commun : favoriser l’endormissement, diminuer le stress et améliorer la qualité de ton sommeil.</p>
                </div>
                <div className="flex-shrink-0">
                    <button className="bg-gardenz-green text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-gardenz-dark transition-colors">
                        Choisir ma formule idéale
                    </button>
                </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8 flex items-center gap-2">
                <Leaf className="text-gardenz-green" size={20} /> Le CBD, une solution naturelle
            </h3>
            <p>
                Le sommeil est une composante cruciale de notre bien-être global, et de nombreux Français luttent contre des troubles du repos tels que l'insomnie, l'apnée du sommeil, ou simplement des nuits de dodo non réparatrices. Dans cette quête pour améliorer la qualité du repos, le CBD s'est imposé comme une solution naturelle et efficace. Extraite de la plante de chanvre, cette molécule non psychoactive offre des bienfaits apaisants et relaxants.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <div>
                    <h4 className="font-bold text-gardenz-dark mb-2">Qu'est-ce que le CBD ?</h4>
                    <p className="text-sm">Le CBD est un cannabinoïde présent dans la plante de chanvre. Contrairement au THC, il ne possède pas d'effets psychoactifs (pas de "high"). Il agit sur le système endocannabinoïde pour équilibrer divers processus physiologiques.</p>
                </div>
                <div>
                    <h4 className="font-bold text-gardenz-dark mb-2">Action sur le Sommeil</h4>
                    <p className="text-sm">Le CBD aide à réguler le cycle veille-repos en favorisant une relaxation profonde. Il réduit le stress et l'anxiété, permettant à l'organisme de se préparer au repos naturellement.</p>
                </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8">Pourquoi choisir le CBD pour le sommeil ?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="text-gardenz-terra font-bold mb-1 flex items-center gap-2"><CheckCircle size={16}/> Naturel & Sans dépendance</div>
                    <p className="text-xs">Contrairement aux somnifères classiques, le CBD n'entraîne pas de dépendance physique ni d'accoutumance.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="text-gardenz-terra font-bold mb-1 flex items-center gap-2"><BrainCircuit size={16}/> Anti-Stress & Anxiété</div>
                    <p className="text-xs">Il équilibre l'humeur et réduit les pensées anxieuses, favorisant un état de relaxation propice à l'endormissement.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="text-gardenz-terra font-bold mb-1 flex items-center gap-2"><ShieldCheck size={16}/> Sans effets secondaires lourds</div>
                    <p className="text-xs">Pas de somnolence diurne excessive ou de vertiges souvent associés aux médicaments traditionnels.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="text-gardenz-terra font-bold mb-1 flex items-center gap-2"><CheckCircle size={16}/> Effet Anti-douleur</div>
                    <p className="text-xs">Soulage les inflammations et douleurs musculaires pour un repos plus profond et ininterrompu.</p>
                </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8">Les différentes formes de CBD</h3>
            <ul className="space-y-4 list-none pl-0">
                <li className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-gardenz-green/10 text-gardenz-green flex items-center justify-center font-bold text-sm shrink-0">1</span>
                    <div>
                        <strong className="text-gardenz-dark block">Huile de CBD : L'option versatile</strong>
                        <span className="text-sm">Absorption rapide sous la langue. Idéal 30 min avant le coucher. Dosage précis.</span>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-gardenz-green/10 text-gardenz-green flex items-center justify-center font-bold text-sm shrink-0">2</span>
                    <div>
                        <strong className="text-gardenz-dark block">Gummies : Savoureux et pratique</strong>
                        <span className="text-sm">Libération plus lente, parfait pour maintenir un sommeil continu. Facile à emporter.</span>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-gardenz-green/10 text-gardenz-green flex items-center justify-center font-bold text-sm shrink-0">3</span>
                    <div>
                        <strong className="text-gardenz-dark block">Gélules : Dosage précis</strong>
                        <span className="text-sm">Sans goût, facile à intégrer à la routine. Absorption plus lente mais effets durables.</span>
                    </div>
                </li>
            </ul>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8">Comment bien utiliser le CBD ?</h3>
            <div className="bg-gardenz-terra/5 border-l-4 border-gardenz-terra p-6 rounded-r-xl my-6">
                <p className="font-bold text-gardenz-dark mb-2">Le Conseil Gardenz :</p>
                <p className="text-sm mb-4">Commencez par une faible dose (20-25mg) environ 30 à 60 minutes avant le coucher. La régularité est la clé !</p>
                <p className="text-xs text-gray-500 italic">Astuce : Combinez le CBD avec d'autres pratiques relaxantes (bain chaud, lecture, mélatonine) pour un effet synergique.</p>
            </div>

            {/* FAQ Section Embedded */}
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-6 flex items-center gap-2">
                    <HelpCircle className="text-gardenz-green" /> FAQ : Questions Fréquentes
                </h3>
                
                <div className="space-y-4">
                    <details className="group bg-white rounded-lg border border-gray-200 open:border-gardenz-green/50 overflow-hidden transition-all">
                        <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-gardenz-dark group-hover:bg-gray-50">
                            Pourquoi le CBD ne me fait-il pas dormir ?
                            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="p-4 pt-0 text-sm text-gray-600 bg-gray-50/50">
                            Le dosage peut être insuffisant ou la qualité du produit inadéquate. Le stress ou l'alimentation jouent aussi. Essayez d'augmenter la dose progressivement ou de changer de méthode de prise.
                        </div>
                    </details>

                    <details className="group bg-white rounded-lg border border-gray-200 open:border-gardenz-green/50 overflow-hidden transition-all">
                        <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-gardenz-dark group-hover:bg-gray-50">
                            Quelle concentration choisir ?
                            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="p-4 pt-0 text-sm text-gray-600 bg-gray-50/50">
                            Pour des troubles modérés, une huile 10% ou 20% (500-1000mg) est standard. Pour des insomnies sévères, optez pour des concentrations plus élevées (30% ou 40%).
                        </div>
                    </details>

                    <details className="group bg-white rounded-lg border border-gray-200 open:border-gardenz-green/50 overflow-hidden transition-all">
                        <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-gardenz-dark group-hover:bg-gray-50">
                            Puis-je combiner CBD et mélatonine ?
                            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="p-4 pt-0 text-sm text-gray-600 bg-gray-50/50">
                            Oui, c'est une excellente combinaison ! La mélatonine régule le cycle du sommeil tandis que le CBD apaise l'esprit. C'est le duo gagnant pour un repos réparateur.
                        </div>
                    </details>
                </div>
            </div>

            {/* Gradient Overlay for collapsed state */}
            {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F9F9F4] to-transparent flex items-end justify-center pb-4 z-20">
                     <button 
                        onClick={() => setIsExpanded(true)}
                        className="bg-white border border-gardenz-green text-gardenz-green px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-gardenz-green hover:text-white transition-all flex items-center gap-2"
                    >
                        Lire la suite <ChevronDown size={16} />
                    </button>
                </div>
            )}
        </div>

        {isExpanded && (
            <div className="text-center mt-8">
                <button 
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-400 hover:text-gardenz-green text-sm font-medium flex items-center gap-1 mx-auto transition-colors"
                >
                    Réduire le contenu <ChevronUp size={16} />
                </button>
            </div>
        )}

      </div>
    </section>
  );
};
