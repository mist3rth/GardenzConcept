
import React from 'react';
import { Share2, UserPlus, Gift, Copy } from 'lucide-react';

interface ReferralPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const ReferralPage: React.FC<ReferralPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-gardenz-white min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="bg-[#111] pt-32 pb-20 px-6 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gardenz-green/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
         <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                SHARE THE <span className="text-gardenz-green drop-shadow-[0_0_15px_rgba(56,118,29,0.4)]">VIBE</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                Parrainez vos amis : Ils gagnent 10€, vous gagnez 10€. <br/>Simple. Efficace.
            </p>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
            
            {/* Visual Side */}
            <div className="md:w-1/2 bg-gardenz-green/5 relative p-12 flex flex-col justify-center items-center text-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-gardenz-green shadow-lg mb-8 animate-pulse">
                    <Gift size={64} />
                </div>
                <h2 className="font-display text-3xl font-bold text-gardenz-dark mb-2">DONNEZ 10€</h2>
                <h2 className="font-display text-3xl font-bold text-gardenz-green mb-6">RECEVEZ 10€</h2>
                <p className="text-gray-600 text-sm">
                    Pour chaque ami qui passe sa première commande, c'est gagnant-gagnant.
                </p>
            </div>

            {/* Action Side */}
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-8">Comment ça marche ?</h3>
                
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gardenz-dark text-white flex items-center justify-center font-bold shrink-0">1</div>
                        <div>
                            <h4 className="font-bold text-gardenz-dark">Récupérez votre lien</h4>
                            <p className="text-sm text-gray-500">Connectez-vous pour obtenir votre lien unique.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gardenz-dark text-white flex items-center justify-center font-bold shrink-0">2</div>
                        <div>
                            <h4 className="font-bold text-gardenz-dark">Partagez la Vibe</h4>
                            <p className="text-sm text-gray-500">Envoyez-le à vos amis par WhatsApp, SMS ou email.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gardenz-dark text-white flex items-center justify-center font-bold shrink-0">3</div>
                        <div>
                            <h4 className="font-bold text-gardenz-dark">Encaissez</h4>
                            <p className="text-sm text-gray-500">Dès leur commande expédiée, 10€ sont crédités sur votre compte.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <button onClick={() => onNavigate('login')} className="w-full bg-gardenz-green text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gardenz-dark transition-all shadow-lg flex items-center justify-center gap-2">
                        <UserPlus size={20} /> Je me connecte pour parrainer
                    </button>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};
