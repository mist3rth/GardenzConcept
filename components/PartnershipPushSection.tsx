
import React from 'react';
import { ArrowRight, TrendingUp, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PartnershipPushSectionProps { }

export const PartnershipPushSection: React.FC<PartnershipPushSectionProps> = () => {
    return (
        <section className="relative overflow-hidden border-t border-gray-900 py-24 md:py-32">
            {/* Immersive Background */}
            <div className="absolute inset-0">
                <img
                    src="/images/nos-boutiques/franchise-gardenz.webp?v=1"
                    alt="Franchisé Gardenz"
                    className="w-full h-full object-cover filter brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gardenz-black via-gardenz-black/60 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex justify-end">
                {/* Glassmorphism Card */}
                <div className="w-full md:w-2/3 lg:w-1/2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gardenz-green to-gardenz-terra"></div>
                    
                    <div className="flex items-center gap-3 text-gardenz-terra mb-6 font-display uppercase tracking-widest text-xs font-bold">
                        <div className="p-2 bg-gardenz-terra/10 rounded-lg"><TrendingUp size={20} /></div>
                        <span>Opportunité Franchise</span>
                    </div>
                    
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        INVESTISSEZ DANS LA CROISSANCE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gardenz-green to-gardenz-terra">DEVENEZ FRANCHISÉ GARDENZ.</span>
                    </h2>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-10">
                        Capitalisez sur un concept lifestyle premium, un modèle commercial éprouvé, et le support d'un réseau en pleine expansion mondiale.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gardenz-green/10 flex items-center justify-center text-gardenz-green shrink-0 mt-1">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm mb-1">Accompagnement A-Z</h4>
                                <p className="text-gray-400 text-xs">Formation, aménagement et support continu.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#E0A96B] bg-[#E0A96B]/10 shrink-0 mt-1">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm mb-1">Marge Forte & Croissance</h4>
                                <p className="text-gray-400 text-xs">Produits premium à haute rentabilité.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gardenz-cyan/10 flex items-center justify-center text-gardenz-cyan shrink-0 mt-1">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm mb-1">Exclusivité Territoriale</h4>
                                <p className="text-gray-400 text-xs">Garantie sur votre zone de chalandise.</p>
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/pros#candidature"
                        className="inline-flex items-center justify-center w-full md:w-auto gap-3 bg-white text-black px-8 py-4 rounded-xl font-display font-bold uppercase tracking-wider hover:bg-gardenz-green hover:text-white transition-all shadow-lg transform hover:-translate-y-1 group/btn"
                    >
                        Rejoindre le Réseau
                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
