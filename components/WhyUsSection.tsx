
import React from 'react';
import {
    BrainCircuit, Library, Sprout,
    MessageCircle, Lock, RefreshCw,
    MapPin, EyeOff, Zap,
    Users, Star, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WhyUsSectionProps {
    // onNavigate removed
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-gardenz-white py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-gardenz-dark mb-4 tracking-tight">
                        REJOIGNEZ LA VIBE : <br className="md:hidden" /> POURQUOI CHOISIR <span className="text-gardenz-green">GARDENZ ?</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="bg-white rounded-3xl p-8 border border-gardenz-green/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gardenz-green/10 rounded-full flex items-center justify-center text-gardenz-green mb-6 group-hover:scale-110 transition-transform">
                            <Star size={24} fill="currentColor" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-6">Qualité & Expertise</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 text-gardenz-green shrink-0"><BrainCircuit size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gardenz-dark text-sm">L'Expertise est Notre Vibe</h4>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Nos spécialistes qualifiés sont formés en continu pour vous fournir un conseil précis.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 text-gardenz-green shrink-0"><Library size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gardenz-dark text-sm">Le Plus Grand Catalogue</h4>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Découvrez la sélection la plus riche et la plus pointue du marché.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 text-gardenz-green shrink-0"><Sprout size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gardenz-dark text-sm">Circuit Court</h4>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Nous sommes le vendeur direct. Cela garantit une traçabilité totale.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#111] rounded-3xl p-8 border border-gardenz-magenta/30 shadow-[0_0_30px_rgba(0,0,0,0.2)] relative overflow-hidden group transform lg:-translate-y-4">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gardenz-magenta/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="w-12 h-12 bg-gardenz-magenta/20 rounded-full flex items-center justify-center text-gardenz-magenta mb-6 border border-gardenz-magenta/50 group-hover:scale-110 transition-transform relative z-10">
                            <Star size={24} fill="currentColor" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white mb-6 relative z-10">Expérience Premium</h3>
                        <ul className="space-y-6 relative z-10">
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 text-gardenz-magenta shrink-0"><MessageCircle size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Support Expert Réactif</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">Une réponse personnelle et complète en moins de 24h.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 text-gardenz-magenta shrink-0"><Lock size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Paiement 100% Sécurisé</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">Transactions protégées par les normes les plus strictes (3D Secure).</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 text-gardenz-magenta shrink-0"><RefreshCw size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Satisfaction Garantie</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">Si la Vibe ne prend pas, retournez le produit sous 14 jours.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-gardenz-cyan/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gardenz-cyan/10 rounded-full flex items-center justify-center text-gardenz-cyan-dark mb-6 group-hover:scale-110 transition-transform">
                            <Star size={24} fill="currentColor" className="text-gardenz-cyan" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-6">Logistique & Discrétion</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 text-gardenz-cyan shrink-0"><MapPin size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gardenz-dark text-sm">Expédition Française</h4>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Tous nos colis partent de France pour une rapidité optimale.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 text-gardenz-cyan shrink-0"><EyeOff size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gardenz-dark text-sm">Discrétion Absolue</h4>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Colis neutres et anonymes pour une confidentialité totale.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 text-gardenz-cyan shrink-0"><Zap size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gardenz-dark text-sm">Livraison Express</h4>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Express Chronopost offert dès 50€ TTC.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden group cursor-default">
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2600&auto=format&fit=crop"
                        alt="Community Vibe"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gardenz-terra/90 to-gardenz-terra/40 mix-blend-multiply"></div>
                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-start gap-6 text-white">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 border border-white/30">
                                <Users size={32} />
                            </div>
                            <div>
                                <h3 className="font-display text-3xl font-bold mb-2">Rejoignez la Vibe Gardenz</h3>
                                <p className="text-white/90 text-sm md:text-base max-w-xl leading-relaxed">
                                    Gagnez des points à chaque commande et partagez votre passion via notre programme de parrainage.
                                </p>
                            </div>
                        </div>
                        <div className="shrink-0">
                            <button
                                onClick={() => navigate('/fidelite')}
                                className="bg-white text-gardenz-terra hover:bg-gardenz-black hover:text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-xl flex items-center gap-2"
                            >
                                Devenir Membre <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
