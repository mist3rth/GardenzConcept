import React from 'react';
import { CheckCircle, Heart, FlaskConical, Truck } from 'lucide-react';

export const CommitmentsSection: React.FC = () => {
  return (
    <section className="bg-gardenz-white py-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gardenz-green/10 rounded-full flex items-center justify-center text-gardenz-green mb-6">
                    <FlaskConical size={32} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">Lab Tested</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Chaque lot est analysé par un laboratoire indépendant français. Traçabilité totale et taux de THC légal garanti.
                </p>
            </div>

            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gardenz-terra/10 rounded-full flex items-center justify-center text-gardenz-terra mb-6">
                    <CheckCircle size={32} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">Qualité Premium</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Sélection rigoureuse des meilleurs producteurs européens. Culture organique et respectueuse de l'environnement.
                </p>
            </div>

            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gardenz-magenta/10 rounded-full flex items-center justify-center text-gardenz-magenta mb-6">
                    <Heart size={32} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">Communauté</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Une équipe passionnée à votre écoute. Conseils personnalisés et service client réactif 7j/7.
                </p>
            </div>

            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gardenz-cyan/10 rounded-full flex items-center justify-center text-gardenz-dark mb-6">
                    <Truck size={32} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">Livraison Discrète</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Expédition rapide sous 24h. Emballage neutre et inodore pour une confidentialité absolue.
                </p>
            </div>

        </div>

      </div>
    </section>
  );
};