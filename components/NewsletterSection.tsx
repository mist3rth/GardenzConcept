
import React, { useState } from 'react';
import { CheckCircle, ArrowUp } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'new' | 'existing'>('idle');
  const [isHovering, setIsHovering] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'news2@gardenz.fr') {
      setSubscriptionStatus('existing');
    } else {
      setSubscriptionStatus('new');
    }
  };

  const handleReset = () => {
    setSubscriptionStatus('idle');
    setEmail('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-gardenz-black py-24 relative overflow-hidden border-t border-gray-900">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-magenta/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gardenz-cyan/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Left Column: Copywriting (2/3) */}
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 uppercase italic tracking-tighter">
                        NE RATEZ PAS <span className="text-gardenz-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">LA VIBE.</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Drops exclusifs, accès prioritaires aux nouvelles molécules et annonces de nos Live Sessions. Une dose de Gardenz directement dans votre inbox.
                    </p>
                </div>

                {/* Reciprocity Offer */}
                <div 
                    className="inline-flex items-center gap-4 bg-gardenz-green/10 border border-gardenz-green/30 p-5 rounded-xl backdrop-blur-sm cursor-default transition-colors hover:bg-gardenz-green/20"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                     <span className={`text-3xl inline-block ${isHovering ? 'animate-bounce' : ''}`}>🎁</span>
                     <div>
                        <p className="text-gardenz-green font-bold text-lg">
                            "ON VOUS OFFRE -20%"
                        </p>
                        <p className="text-gardenz-green/80 text-sm">
                            Pour votre première commande. Sans minimum d'achat.
                        </p>
                     </div>
                </div>
            </div>

            {/* Right Column: Form (1/3) */}
            <div className="lg:col-span-1">
                <div className="bg-[#222] p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden group hover:border-gray-700 transition-colors min-h-[340px] flex flex-col justify-center">
                    
                    {subscriptionStatus === 'idle' ? (
                        <form onSubmit={handleSubscribe} className="animate-fade-in">
                            {/* Input */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-xs font-bold uppercase text-gray-500 tracking-widest mb-2">Votre adresse email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="vibe@gardenz.fr" 
                                    className="w-full bg-[#111] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gardenz-cyan focus:ring-1 focus:ring-gardenz-cyan transition-all placeholder:text-gray-700"
                                />
                            </div>

                            {/* CTA Button */}
                            <button 
                                type="submit" 
                                className="w-full bg-gardenz-magenta text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white hover:text-gardenz-magenta transition-all duration-300 shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:shadow-[0_0_30px_rgba(255,0,255,0.5)] transform hover:-translate-y-1"
                            >
                                JE REÇOIS LES NEWS
                            </button>

                            {/* Footer Text */}
                            <div className="mt-4 text-center">
                                <p className="text-[10px] text-gray-500 italic mb-1">
                                    *Fréquence : Une Vibe par mois (garanti sans spam).
                                </p>
                                <a href="#" className="text-[10px] text-gray-600 hover:text-gray-400 underline decoration-gray-700 underline-offset-2">
                                    Politique de confidentialité
                                </a>
                                <p className="mt-3 text-[9px] text-gray-600 leading-relaxed">
                                    🧪 Test : <span className="text-gray-500">news1@gardenz.fr</span> (nouvel inscrit) · <span className="text-gray-500">news2@gardenz.fr</span> (déjà inscrit)
                                </p>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center animate-scale-up space-y-6">
                            <div className="w-16 h-16 bg-gardenz-cyan/10 rounded-full flex items-center justify-center text-gardenz-cyan mx-auto mb-2 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                                <CheckCircle size={32} />
                            </div>
                            <div>
                                <h3 className="font-display text-xl font-bold text-white mb-2 uppercase leading-tight">
                                    {subscriptionStatus === 'new' ? 'VOUS FAITES PARTIE DU MOUVEMENT. 🤝' : 'RAVI DE VOUS REVOIR ! 👋'}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {subscriptionStatus === 'new' 
                                        ? "Presque fini ! Vous allez recevoir un email de confirmation pour valider votre inscription (double opt-in). Vérifiez votre boîte mail !" 
                                        : "Vous êtes déjà inscrit à notre newsletter ! Merci de votre fidélité."}
                                </p>
                            </div>
                            <button 
                                onClick={handleReset}
                                className="w-full bg-transparent border-2 border-gardenz-cyan text-gardenz-cyan font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-gardenz-cyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <ArrowUp size={18} /> RETOURNER SUR LE SHOP
                            </button>
                        </div>
                    )}

                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
