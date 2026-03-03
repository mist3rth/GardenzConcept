
import React, { useState } from 'react';
import { BrainCircuit, Leaf, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, CheckCircle, Smile, Heart } from 'lucide-react';

export const StressContentSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-[#F9F9F4] py-16 border-t border-gardenz-green/10 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gardenz-terra/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gardenz-green/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gardenz-green/10 rounded-full text-gardenz-green mb-4">
                <BrainCircuit size={24} />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gardenz-dark mb-4">
                Le CBD pour le stress, <br/><span className="text-gardenz-green">ton allié naturel pour rester zen</span>
            </h2>
            <p className="text-lg text-gray-600 italic font-medium">
                Stress, surcharge mentale, nervosité ? Respire, t’es au bon endroit.
            </p>
        </div>

        {/* Content Body */}
        <div className={`prose prose-stone max-w-none text-gray-600 space-y-8 ${isExpanded ? '' : 'max-h-[600px] overflow-hidden relative'}`}>
            
            {/* Intro */}
            <p className="lead text-lg leading-relaxed">
                Dans cette catégorie, tu retrouveras tout ce qu’il te faut pour apaiser ton esprit grâce au CBD, sous toutes ses formes les plus efficaces. Huiles CBD relaxantes, gélules CBD anti-stress, tisanes CBD apaisantes, ou encore gummies CBD pour un moment chill et gourmand : à chacun sa méthode pour reprendre le contrôle sur son stress, sans passer par des solutions chimiques !
            </p>

            <div className="bg-white p-6 rounded-2xl border border-gardenz-green/10 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-gardenz-dark mb-2">Sérénité Garantie</h3>
                    <p className="text-sm">Tous nos produits sont rigoureusement sélectionnés pour leur qualité, leur efficacité, et leur capacité à t’accompagner dans ton quotidien… avec sérénité.</p>
                </div>
                <div className="flex-shrink-0">
                    <button className="bg-gardenz-green text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-gardenz-dark transition-colors">
                        Voir les solutions Anti-Stress
                    </button>
                </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8 flex items-center gap-2">
                <Leaf className="text-gardenz-green" size={20} /> Histoire et anecdote du CBD stress 📚
            </h3>
            <p>
                Si le CBD fait aujourd’hui les gros titres, son usage pour apaiser l’esprit stressé ne date pas d’hier. Depuis des millénaires, le chanvre est utilisé dans de nombreuses cultures pour ses propriétés relaxantes. Déjà en Chine ancienne, les herboristes l’utilisaient pour calmer les troubles émotionnels.
            </p>
            <p>
                Mais le CBD, lui, a été identifié plus récemment. C’est dans les années 1940 que des scientifiques commencent à isoler le cannabidiol. Et ce n’est que bien plus tard qu’on découvre ses interactions avec le système endocannabinoïde – cette petite merveille biologique qui aide notre corps à réguler stress, humeur et sommeil 🧬
            </p>
            <p className="text-sm italic bg-white p-4 rounded-lg border-l-4 border-gardenz-terra">
                L’anecdote sympa ? De plus en plus de personnes découvrent que quelques gouttes d’huile de CBD de qualité, c’est parfois plus efficace qu’un énième café ou un scroll infini sur les réseaux pour gérer le stress.
            </p>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8">Les bienfaits du CBD stress 🌿</h3>
            <p>
                Le CBD n’est pas magique, mais presque ✨ S’il fait tant parler de lui, c’est parce que cette molécule naturelle issue du chanvre CBD agit en douceur pour réduire ton stress sans te transformer en zombie 🧟‍♂️
            </p>
            <p>
                Concrètement, le CBD possède des propriétés apaisantes qui aident ton organisme à mieux répondre aux pics de tension, à calmer l’anxiété, et même à favoriser un meilleur sommeil. Autrement dit, c’est le compagnon parfait pour affronter les journées trop pleines… et les nuits trop longues.
            </p>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8">À qui s’adresse le CBD stress 🎯</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="text-gardenz-terra font-bold mb-1 flex items-center gap-2"><CheckCircle size={16}/> Anxiété du quotidien</div>
                    <p className="text-xs">Pour ceux qui stressent pour un rien ou cherchent une solution douce.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="text-gardenz-terra font-bold mb-1 flex items-center gap-2"><BrainCircuit size={16}/> Surcharge mentale</div>
                    <p className="text-xs">Étudiants, parents débordés, pros surmenés : faites une pause mentale.</p>
                </div>
            </div>

             <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8">Effets secondaires du CBD stress ⚠️</h3>
             <p>
                Pas de panique, le CBD sans THC est généralement très bien toléré 💚 Mais comme tout ce qu’on consomme, même naturel, il peut y avoir quelques effets secondaires selon les personnes et le dosage choisi (fatigue passagère, bouche sèche). Pour éviter les mauvaises surprises, l’idéal est de commencer avec une faible concentration de CBD.
             </p>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8">Comment utiliser le CBD stress 🧪</h3>
             <div className="bg-gardenz-terra/5 border-l-4 border-gardenz-terra p-6 rounded-r-xl my-6">
                <p className="font-bold text-gardenz-dark mb-2">Le Conseil Gardenz :</p>
                <p className="text-sm mb-4">
                    Le CBD agit mieux lorsqu’il est pris quotidiennement. Le matin pour préparer ton corps, ou le soir pour favoriser la détente.
                </p>
                <ul className="list-disc pl-5 text-sm space-y-2">
                    <li><strong className="text-gardenz-dark">Huiles CBD :</strong> quelques gouttes sous la langue, effet rapide 🕒</li>
                    <li><strong className="text-gardenz-dark">Gélules CBD :</strong> pratiques pour un dosage précis</li>
                    <li><strong className="text-gardenz-dark">Tisanes CBD :</strong> pour une pause relax à tout moment ☕</li>
                </ul>
            </div>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8">Légalité du CBD stress ⚖️</h3>
            <p>
                Bonne nouvelle : en France, le CBD est légal, tant qu’il respecte une règle d’or ➡️ contenir moins de 0,3 % de THC. Donc oui, tu peux acheter ton huile de CBD anti-stress ou tes gélules relaxantes sans risquer la descente de la brigade des plantes 🌿🚔
            </p>

            {/* FAQ Section Embedded */}
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-6 flex items-center gap-2">
                    <HelpCircle className="text-gardenz-green" /> FAQ : CBD & Stress
                </h3>
                
                <div className="space-y-4">
                    <details className="group bg-white rounded-lg border border-gray-200 open:border-gardenz-green/50 overflow-hidden transition-all">
                        <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-gardenz-dark group-hover:bg-gray-50">
                            Est-ce que le CBD peut vraiment m’aider à gérer le stress ?
                            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="p-4 pt-0 text-sm text-gray-600 bg-gray-50/50">
                            Oui, le CBD agit sur le système endocannabinoïde et peut aider à réguler la réponse au stress, en favorisant la détente sans effets planants 😌
                        </div>
                    </details>

                    <details className="group bg-white rounded-lg border border-gray-200 open:border-gardenz-green/50 overflow-hidden transition-all">
                        <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-gardenz-dark group-hover:bg-gray-50">
                            Combien de gouttes d’huile CBD dois-je prendre par jour ?
                            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="p-4 pt-0 text-sm text-gray-600 bg-gray-50/50">
                             Tout dépend de ta sensibilité, mais on recommande souvent de commencer avec 2 à 4 gouttes, 1 à 2 fois par jour, et d’augmenter progressivement si besoin 💧
                        </div>
                    </details>

                    <details className="group bg-white rounded-lg border border-gray-200 open:border-gardenz-green/50 overflow-hidden transition-all">
                        <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-gardenz-dark group-hover:bg-gray-50">
                             Puis-je utiliser le CBD tous les jours ?
                            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="p-4 pt-0 text-sm text-gray-600 bg-gray-50/50">
                            Absolument ! Une utilisation régulière est même recommandée pour des effets durables. L’important, c’est d’adapter le dosage de CBD à ton rythme de vie 🗓️
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
