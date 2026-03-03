
import React from 'react';
import { Instagram, Facebook, Youtube, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCookie } from '../context/CookieContext';

interface FooterProps {
    onNavigate?: (page: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const { resetConsent } = useCookie();

    return (
        <footer className="bg-[#111] text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Colonne 1 : Brand */}
                    <div className="col-span-1">
                        <div className="font-display font-bold text-3xl tracking-tighter mb-6 flex items-center gap-2">
                            GARDENZ
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Dépoussiérer le cannabis légal. <br />Expertise moléculaire & Culture urbaine.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/gardenz.fr/" target="_blank" rel="noopener noreferrer" aria-label="Suivez-nous sur Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gardenz-magenta transition-colors"><Instagram size={18} /></a>
                            <a href="https://www.facebook.com/Gardenz.fr" target="_blank" rel="noopener noreferrer" aria-label="Suivez-nous sur Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook size={18} /></a>
                            <a href="https://www.youtube.com/channel/UCIDm4nERADm5QhyUFHyjRLg" target="_blank" rel="noopener noreferrer" aria-label="Abonnez-vous à notre chaîne YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors"><Youtube size={18} /></a>
                        </div>
                    </div>

                    {/* Colonne 2 : Univers */}
                    <div>
                        <h2 className="font-bold mb-6 text-lg">Univers</h2>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/boutique?filter=wellness" className="hover:text-gardenz-green transition-colors text-left block">Bien-être</Link></li>
                            <li><Link to="/boutique?filter=extreme" className="hover:text-gardenz-cyan transition-colors text-left block">eXtreme Lab</Link></li>
                            <li><Link to="/boutique?filter=lifestyle" className="hover:text-gardenz-green transition-colors text-left block">LifeStyle</Link></li>
                            <li><Link to="/adn" className="hover:text-white transition-colors text-left block">Notre ADN</Link></li>
                            <li><Link to="/boutiques" className="hover:text-gardenz-green transition-colors text-left block">Nos boutiques</Link></li>
                            <li><Link to="/blog" className="hover:text-gardenz-green transition-colors text-left block">Le Journal</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Support */}
                    <div>
                        <h2 className="font-bold mb-6 text-lg">Support</h2>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/tracabilite" className="hover:text-gardenz-cyan transition-colors text-left flex items-center gap-2">Traçabilité & Labo</Link></li>
                            <li><Link to="/faq" className="hover:text-white transition-colors text-left block">FAQ & Aide</Link></li>
                            <li><Link to="/connexion" className="hover:text-white transition-colors text-left block">Suivi de commande</Link></li>
                            <li><Link to="/livraison" className="hover:text-white transition-colors text-left block">Livraison & Retours</Link></li>
                            <li><Link to="/protocole" className="hover:text-white transition-colors text-left block">Protocole Bien-Être</Link></li>
                            <li><Link to="/index-moleculaire" className="hover:text-white transition-colors text-left block">L'index moléculaire</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors text-left block">Contactez un expert</Link></li>
                            <li><Link to="/cgv" className="hover:text-white transition-colors text-left block">CGU & CGV</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 4 : Opportunités */}
                    <div>
                        <h2 className="font-bold mb-6 text-lg">Opportunités</h2>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/fidelite" className="hover:text-gardenz-terra transition-colors text-left block">Fidélité & Parrainage</Link></li>
                            <li><Link to="/affiliation" className="hover:text-gardenz-terra transition-colors text-left block">Programme Affiliation</Link></li>
                            <li><Link to="/pros" className="hover:text-gardenz-terra transition-colors text-left block">Devenir Franchisé</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-600">
                    <div className="order-2 md:order-1 flex flex-col md:flex-row gap-4 items-center md:items-start">
                        <p>&copy; 2025 Gardenz. Tous droits réservés.</p>
                        <div className="hidden md:block w-px h-3 bg-white/10 self-center"></div>
                        <Link to="/cookies" className="hover:text-white transition-colors underline decoration-dotted">Gestion des cookies</Link>
                        <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 order-1 md:order-2 md:pr-20">
                        <div className="flex flex-col items-end gap-0.5">
                            <div className="flex items-center gap-2 text-gray-400 font-bold">
                                <Lock size={14} className="text-gardenz-green" />
                                <span className="uppercase tracking-widest text-[10px]">Paiement 100% Sécurisé</span>
                            </div>
                            <span className="text-[9px] text-gray-600 uppercase tracking-tighter">Transactions chiffrées SSL & 3D Secure</span>
                        </div>

                        <div className="flex gap-2">
                            <div className="h-8 w-12 bg-white rounded-md flex items-center justify-center shadow-sm opacity-90 hover:opacity-100 transition-opacity" title="Visa">
                                <span className="font-display font-bold text-blue-800 text-sm italic tracking-tighter">VISA</span>
                            </div>
                            <div className="h-8 w-12 bg-white rounded-md flex items-center justify-center shadow-sm relative overflow-hidden opacity-90 hover:opacity-100 transition-opacity" title="Mastercard">
                                <div className="flex -space-x-2">
                                    <div className="w-4 h-4 bg-red-600 rounded-full opacity-90"></div>
                                    <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-90"></div>
                                </div>
                            </div>
                            <div className="h-8 w-12 bg-white rounded-md flex items-center justify-center shadow-sm opacity-90 hover:opacity-100 transition-opacity" title="Carte Bancaire">
                                <div className="border border-blue-900 px-1 rounded-sm">
                                    <span className="font-sans font-bold text-blue-900 text-[10px]">CB</span>
                                </div>
                            </div>
                            <div className="h-8 w-12 bg-white rounded-md flex items-center justify-center shadow-sm opacity-90 hover:opacity-100 transition-opacity" title="Apple Pay">
                                <span className="font-sans font-bold text-black text-[10px]">Pay</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4 border-t border-white/5 pt-4">
                    <Link to="/confidentialite" className="text-[10px] text-gray-700 hover:text-gray-500 transition-colors">Politique de Confidentialité</Link>
                </div>
            </div>
        </footer>
    );
};
