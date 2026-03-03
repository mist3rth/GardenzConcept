
import React from 'react';
import { Gift, Star, Crown, Zap, CheckCircle, ArrowRight } from 'lucide-react';

interface LoyaltyPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const LoyaltyPage: React.FC<LoyaltyPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-gardenz-white min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="bg-[#111] pt-32 pb-20 px-6 text-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-terra/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
         <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                LE CLUB <span className="text-gardenz-terra drop-shadow-[0_0_15px_rgba(224,169,107,0.4)]">GARDENZ</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                Rejoignez le cercle. Cumulez des points. <br/>Débloquez des récompenses exclusives.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* HOW IT WORKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center group hover:border-gardenz-terra transition-all">
                <div className="w-16 h-16 bg-gardenz-terra/10 rounded-full flex items-center justify-center text-gardenz-terra mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Zap size={32} />
                </div>
                <h3 className="font-display text-xl font-bold text-gardenz-dark mb-2">1. Commandez</h3>
                <p className="text-gray-500 text-sm">1€ dépensé = 10 Buds (points).<br/>Cumulez à chaque achat.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center group hover:border-gardenz-terra transition-all">
                <div className="w-16 h-16 bg-gardenz-terra/10 rounded-full flex items-center justify-center text-gardenz-terra mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Star size={32} />
                </div>
                <h3 className="font-display text-xl font-bold text-gardenz-dark mb-2">2. Cumulez</h3>
                <p className="text-gray-500 text-sm">Montez en niveau et débloquez des avantages permanents.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center group hover:border-gardenz-terra transition-all">
                <div className="w-16 h-16 bg-gardenz-terra/10 rounded-full flex items-center justify-center text-gardenz-terra mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Gift size={32} />
                </div>
                <h3 className="font-display text-xl font-bold text-gardenz-dark mb-2">3. Profitez</h3>
                <p className="text-gray-500 text-sm">Échangez vos Buds contre des produits gratuits ou des réductions.</p>
            </div>
        </div>

        {/* TIERS */}
        <h2 className="font-display text-3xl font-bold text-gardenz-dark text-center mb-12">LES STATUTS DU CLUB</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            
            {/* SEED */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-2xl font-bold text-gray-400">SEED</h3>
                    <span className="text-xs font-bold bg-gray-200 px-2 py-1 rounded">0 - 500 pts</span>
                </div>
                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-gray-400"/> Accès aux ventes privées</li>
                    <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-gray-400"/> Cadeau d'anniversaire</li>
                </ul>
            </div>

            {/* FLOWER */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gardenz-terra shadow-xl transform md:-translate-y-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gardenz-terra text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Populaire</div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-2xl font-bold text-gardenz-terra">FLOWER</h3>
                    <span className="text-xs font-bold bg-gardenz-terra/10 text-gardenz-terra px-2 py-1 rounded">500+ pts</span>
                </div>
                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-gray-800 font-medium"><CheckCircle size={16} className="text-gardenz-terra"/> Avantages SEED inclus</li>
                    <li className="flex items-center gap-2 text-sm text-gray-800 font-medium"><CheckCircle size={16} className="text-gardenz-terra"/> Livraison express offerte</li>
                    <li className="flex items-center gap-2 text-sm text-gray-800 font-medium"><CheckCircle size={16} className="text-gardenz-terra"/> Accès anticipé aux drops</li>
                </ul>
            </div>

            {/* HARVEST */}
            <div className="bg-[#111] rounded-2xl p-8 border border-gray-800 text-white">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-2xl font-bold text-gardenz-green flex items-center gap-2"><Crown size={20}/> HARVEST</h3>
                    <span className="text-xs font-bold bg-gardenz-green/20 text-gardenz-green px-2 py-1 rounded">2000+ pts</span>
                </div>
                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle size={16} className="text-gardenz-green"/> Avantages FLOWER inclus</li>
                    <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle size={16} className="text-gardenz-green"/> -10% permanent sur le shop</li>
                    <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle size={16} className="text-gardenz-green"/> Conciergerie WhatsApp dédiée</li>
                </ul>
            </div>

        </div>

        {/* CTA */}
        <div className="text-center">
            <button onClick={() => onNavigate('login')} className="inline-flex items-center gap-2 bg-gardenz-terra text-white px-10 py-4 rounded-full font-display font-bold uppercase tracking-wider hover:bg-gardenz-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Rejoindre le Club Gratuitement <ArrowRight size={20} />
            </button>
            <p className="mt-4 text-xs text-gray-500">Déjà membre ? Connectez-vous pour voir votre solde.</p>
        </div>

      </div>
    </div>
  );
};
