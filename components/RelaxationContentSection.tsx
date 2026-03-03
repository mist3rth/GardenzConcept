
import React, { useState } from 'react';
import { Wind, Leaf, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, CheckCircle, Smile, Coffee } from 'lucide-react';

export const RelaxationContentSection: React.FC = () => {
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
                <Wind size={24} />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gardenz-dark mb-4">
                Le CBD pour la Relaxation, <br/><span className="text-gardenz-green">l'art du lâcher-prise</span>
            </h2>
            <p className="text-lg text-gray-600 italic font-medium">
                Décompresser après le travail ou simplement profiter de l'instant présent.
            </p>
        </div>

        {/* Content Body */}
        <div className={`prose prose-stone max-w-none text-gray-600 space-y-8 ${isExpanded ? '' : 'max-h-[600px] overflow-hidden relative'}`}>
            
            {/* Intro */}
            <p className="lead text-lg leading-relaxed">
                Dans un monde qui va à 100 à l'heure, savoir appuyer sur "Pause" est devenu un luxe. Cette catégorie rassemble nos meilleures pépites pour t'offrir une bulle de détente instantanée. Que ce soit pour détendre tes muscles après le sport, couper le vélo dans ta tête en rentrant du boulot, ou juste chiller le week-end, le CBD est ton meilleur allié détente.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-gardenz-green/10 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-gardenz-dark mb-2">L'Effet "Chill"</h3>
                    <p className="text-sm">Fleurs aux arômes envoûtants, résines crémeuses ou huiles douces : nous avons sélectionné les variétés les plus "feel good" pour une relaxation physique et mentale, sans somnolence.</p>
                </div>
                <div className="flex-shrink-0">
                    <button className="bg-gardenz-green text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-gardenz-dark transition-colors">
                        Trouver mon produit Chill
                    </button>
                </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8 flex items-center gap-2">
                <Leaf className="text-gardenz-green" size={20} /> Pourquoi le CBD détend-il ?
            </h3>
            <p>
                Le secret réside dans l'homéostasie (l'équilibre du corps). Le CBD interagit avec tes récepteurs pour signaler à ton système nerveux qu'il est temps de réduire la pression. Contrairement à un sédatif qui t'assomme, le CBD pour la relaxation t'aide simplement à évacuer les tensions parasites. Tu restes toi-même, mais en version plus... cool 😎.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <div>
                    <h4 className="font-bold text-gardenz-dark mb-2">Détente Musculaire</h4>
                    <p className="text-sm">Idéal après une séance de sport ou une journée assis au bureau. Le CBD aide à relâcher les contractures et les tensions physiques accumulées.</p>
                </div>
                <div>
                    <h4 className="font-bold text-gardenz-dark mb-2">Apaisement Mental</h4>
                    <p className="text-sm">Il aide à diminuer le flux de pensées incessantes (le fameux "petit vélo"), permettant de profiter pleinement de ton temps libre.</p>
                </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-gardenz-dark mt-8">Les instants parfaits pour le CBD Relax</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="text-gardenz-terra font-bold mb-1 flex items-center gap-2"><Coffee size={16}/> L'After-Work</div>
                    <p className="text-xs">Pour marquer la transition entre la journée de travail et la soirée personnelle.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="text-gardenz-terra font-bold mb-1 flex items-center gap-2"><Smile size={16}/> Le Dimanche Cocooning</div>
                    <p className="text-xs">Un thé, un plaid, une huile relaxante : le combo parfait pour recharger les batteries.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="text-gardenz-terra font-bold mb-1 flex items-center gap-2"><ShieldCheck size={16}/> Avant une réunion</div>
                    <p className="text-xs">Pour aborder un moment social ou pro avec plus de décontraction et d'aisance.</p>
                </div>
