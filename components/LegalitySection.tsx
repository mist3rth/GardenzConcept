
import React from 'react';
import { Scale, FileCheck, Leaf, ShieldCheck } from 'lucide-react';

export const LegalitySection: React.FC = () => {
  return (
    <section className="bg-white py-20 border-t border-gray-100 relative overflow-hidden">
      {/* Decorative background logo outline */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-gray-50 opacity-50 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M12 22v-8" />
             <path d="M12 14c0-3-2-5-2-9 0-1.5.5-2 2-2s2 .5 2 2c0 4-2 6-2 9Z" />
             <path d="M12 14c-3 0-5 2-9 2-1.5 0-2-.5-2-2s.5-2 2-2c4 0 6 2 9 2Z" />
             <path d="M12 14c3 0 5 2 9 2 1.5 0 2-.5 2-2s-.5-2-2-2c-4 0-6 2-9 2Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gardenz-dark mb-4">LÉGALITÉ DES <span className="text-gardenz-green">PRODUITS</span></h2>
            <div className="h-1 w-24 bg-gardenz-green mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
                Avec Gardenz.fr, vous avez la certitude de consommer du CBD légal et de qualité, en toute sérénité.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Block 1: THC compliance */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-gardenz-green mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Scale size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-gardenz-dark">Normes Européennes</h3>
                <p className="text-gray-600 leading-relaxed">
                    Teneur en THC inférieure à <span className="font-bold text-gardenz-dark">0,3 %</span>, conformément aux normes européennes et à la législation française en vigueur.
                </p>
            </div>

            {/* Block 2: Certified Hemp */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-gardenz-green mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Leaf size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-gardenz-dark">Culture Responsable</h3>
                <p className="text-gray-600 leading-relaxed">
                    Chanvre issu de variétés certifiées, cultivé de manière durable et responsable, respectant l'environnement et le produit.
                </p>
            </div>

            {/* Block 3: Lab Analysis */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-gardenz-green mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FileCheck size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-gardenz-dark">Certificats d’Analyse</h3>
                <p className="text-gray-600 leading-relaxed">
                    Analyses par laboratoires indépendants garantissant une composition conforme, sans contaminants, assurant sécurité et pureté.
                </p>
            </div>

        </div>

        <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-gardenz-green/10 text-gardenz-green px-6 py-3 rounded-full font-medium text-sm">
                <ShieldCheck size={20} />
                <span>Garantie 100% Légal & Sécurisé</span>
            </div>
        </div>

      </div>
    </section>
  );
};
