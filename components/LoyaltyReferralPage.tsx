
import React, { useState } from 'react';
import { Gift, Users, Star, Copy, ChevronDown, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoyaltyReferralPageProps { }

export const LoyaltyReferralPage: React.FC<LoyaltyReferralPageProps> = () => {
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    return (
        <div className="bg-gardenz-white min-h-screen font-sans">
            {/* HEADER */}
            <div className="bg-[#111] pt-32 pb-20 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-green/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gardenz-terra/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        RÉCOMPENSES ET AVANTAGES GARDENZ : <br />
                        <span className="text-gardenz-green drop-shadow-[0_0_15px_rgba(56,118,29,0.4)]">LA VIBE RÉCIPROQUE</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Chez Gardenz, on récompense la fidélité et le partage ! Nos programmes sont faits pour vous offrir plus d'avantages à chaque étape de votre expérience.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* BLOC 1: FIDELITÉ */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-16 flex flex-col md:flex-row">
                    <div className="md:w-2/5 bg-gardenz-green/10 p-10 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-gardenz-green shadow-lg mb-6">
                            <Star size={48} />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-gardenz-dark">Programme de Fidélité</h2>
                        <p className="text-gardenz-green font-bold text-sm mt-2">Vos Points, Vos Cadeaux</p>
                    </div>
                    <div className="md:w-3/5 p-10">
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            <strong className="text-gardenz-dark">Le principe :</strong> Chaque achat effectué sur Gardenz vous rapporte des points de fidélité. Ces points sont ensuite convertibles en bons de réduction ou en produits exclusifs.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <CheckCircle className="text-gardenz-green shrink-0" size={20} />
                                <span className="text-sm text-gray-700"><strong>GAGNEZ plus :</strong> Accumulez 1 point pour chaque euro dépensé.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle className="text-gardenz-green shrink-0" size={20} />
                                <span className="text-sm text-gray-700"><strong>DÉBLOQUEZ vos réductions :</strong> Utilisez vos points pour obtenir des réductions sur vos futures commandes.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle className="text-gardenz-green shrink-0" size={20} />
                                <span className="text-sm text-gray-700"><strong>ACCÉDEZ à l'exclusif :</strong> Recevez des cadeaux et des avantages réservés aux membres fidèles.</span>
                            </li>
                        </ul>
                        <Link to="/connexion" className="bg-gardenz-dark text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gardenz-green transition-all shadow-lg flex items-center gap-2 inline-flex">
                            Accéder à mon espace fidélité <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* BLOC 2: PARRAINAGE */}
                <div className="bg-[#111] rounded-3xl shadow-xl border border-gray-800 overflow-hidden mb-20 flex flex-col md:flex-row-reverse text-white">
                    <div className="md:w-2/5 bg-gardenz-terra/10 p-10 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-[#222] rounded-full flex items-center justify-center text-gardenz-terra shadow-lg mb-6 border border-gardenz-terra/20">
                            <Gift size={48} />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-white">Programme de Parrainage</h2>
                        <p className="text-gardenz-terra font-bold text-sm mt-2">Partagez la Vibe, Gagnez à Deux</p>
                    </div>
                    <div className="md:w-3/5 p-10">
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            <strong className="text-white">Le principe :</strong> Partagez votre amour pour Gardenz avec vos amis ! Vous offrez une réduction à votre filleul lors de sa première commande, et vous êtes récompensé en retour.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <CheckCircle className="text-gardenz-terra shrink-0" size={20} />
                                <span className="text-sm text-gray-300"><strong>FAITES plaisir :</strong> Votre ami reçoit une réduction immédiate sur sa première commande.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle className="text-gardenz-terra shrink-0" size={20} />
                                <span className="text-sm text-gray-300"><strong>SOYEZ récompensé :</strong> Dès que votre filleul passe sa commande, vous recevez un bon d'achat ou un crédit sur votre compte.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle className="text-gardenz-terra shrink-0" size={20} />
                                <span className="text-sm text-gray-300"><strong>CRÉEZ votre communauté :</strong> Plus vous parrainez, plus vous gagnez !</span>
                            </li>
                        </ul>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4 mb-6">
                            <span className="text-gray-400 text-xs font-mono truncate">Connectez-vous pour voir votre lien</span>
                            <Link to="/connexion" className="text-gardenz-terra hover:text-white transition-colors">
                                <Copy size={18} />
                            </Link>
                        </div>

                        <Link to="/connexion" className="bg-gardenz-terra text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-gardenz-terra transition-all shadow-lg flex items-center gap-2 inline-flex">
                            Je me connecte pour parrainer <Users size={16} />
                        </Link>
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-8 text-center">Questions Fréquentes</h3>
                    <div className="space-y-4">
                        {/* FAQ Items */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <button onClick={() => toggleAccordion('q1')} className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 font-bold text-gardenz-dark">
                                Comment les points sont-ils crédités ?
                                <ChevronDown className={`transition-transform ${activeAccordion === 'q1' ? 'rotate-180' : ''}`} />
                            </button>
                            {activeAccordion === 'q1' && (
                                <div className="p-5 bg-gray-50 text-sm text-gray-600 border-t border-gray-200">
                                    Les points sont automatiquement crédités sur votre compte une fois votre commande expédiée. Vous pouvez consulter votre solde à tout moment dans votre espace client.
                                </div>
                            )}
                        </div>
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <button onClick={() => toggleAccordion('q2')} className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 font-bold text-gardenz-dark">
                                Où trouver mon lien de parrainage ?
                                <ChevronDown className={`transition-transform ${activeAccordion === 'q2' ? 'rotate-180' : ''}`} />
                            </button>
                            {activeAccordion === 'q2' && (
                                <div className="p-5 bg-gray-50 text-sm text-gray-600 border-t border-gray-200">
                                    Connectez-vous à votre compte client, rubrique "Parrainage". Vous y trouverez votre lien unique à copier et partager, ainsi que le suivi de vos filleuls.
                                </div>
                            )}
                        </div>
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <button onClick={() => toggleAccordion('q3')} className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 font-bold text-gardenz-dark">
                                Puis-je cumuler points de fidélité et codes promo ?
                                <ChevronDown className={`transition-transform ${activeAccordion === 'q3' ? 'rotate-180' : ''}`} />
                            </button>
                            {activeAccordion === 'q3' && (
                                <div className="p-5 bg-gray-50 text-sm text-gray-600 border-t border-gray-200">
                                    Oui, les bons d'achat générés grâce à vos points de fidélité sont généralement cumulables avec les promotions en cours, sauf mention contraire spécifique.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
