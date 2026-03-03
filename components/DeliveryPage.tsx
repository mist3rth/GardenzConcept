
import React from 'react';
import { Zap, EyeOff, Store, MapPin, Truck, Bike, Globe, RefreshCcw, Mail, Phone, ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeliveryPageProps { }

export const DeliveryPage: React.FC<DeliveryPageProps> = () => {
    return (
        <div className="bg-gardenz-white min-h-screen">

            {/* I. HEADER & INTRO (Zone Sombre) */}
            <div className="bg-gardenz-black pt-32 pb-20 px-6 text-center relative overflow-hidden">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-cyan/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        LA LIVRAISON <span className="text-gardenz-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">EXPRESS</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        La Vibe, c'est aussi de la recevoir vite. <br className="hidden md:block" />
                        Choisissez votre mode de réception, on s'occupe du reste.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-24">

                {/* II. SECTION 1 : LA PROMESSE (Cartes Principales) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

                    {/* Carte Chrono */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-gardenz-cyan/30 transition-all group">
                        <div className="flex items-start justify-between mb-6">
                            <div className="bg-gardenz-cyan/10 p-4 rounded-2xl text-gardenz-cyan group-hover:scale-110 transition-transform">
                                <Zap size={32} fill="currentColor" />
                            </div>
                            <span className="bg-gardenz-black text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">
                                Cut-off 15h
                            </span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-3">TOP DÉPART : LE JOUR MÊME</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Si votre commande est validée <strong className="text-gardenz-dark">avant 15h</strong>, elle part avec la tournée du jour. On ne traîne pas !
                        </p>
                        <p className="text-xs text-gray-400 italic">
                            *Les délais peuvent être légèrement allongés en période de folie promotionnelle.
                        </p>
                    </div>

                    {/* Carte Discrétion */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-gardenz-dark/30 transition-all group">
                        <div className="flex items-start justify-between mb-6">
                            <div className="bg-gray-100 p-4 rounded-2xl text-gardenz-dark group-hover:scale-110 transition-transform">
                                <EyeOff size={32} />
                            </div>
                            <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">
                                Discret Max
                            </span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-3">COLIS 100% ANONYME</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Sachet opaque, carton neutre, aucune mention du contenu ou de la marque sur l'extérieur. Votre discrétion est notre priorité absolue.
                        </p>
                    </div>
                </div>

                {/* III. SECTION 2 : LES MODES DE RÉCEPTION */}
                <div className="mb-20">
                    <h2 className="font-display text-3xl font-bold text-gardenz-dark mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gardenz-green rounded-full"></span>
                        FRANCE <span className="text-gray-400 text-lg font-sans font-medium normal-case">- Le Voisinage Proche</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

                        {/* 1. Retrait Boutique */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gardenz-green transition-all relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-gardenz-green text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">GRATUIT</div>
                            <div className="mb-4 text-gardenz-green group-hover:scale-110 transition-transform"><Store size={28} /></div>
                            <h4 className="font-display font-bold text-lg mb-1">Alexandrie Garden</h4>
                            <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wide">Retrait Boutique</p>
                            <p className="text-sm text-gray-600 mb-2">2 rue d'Alexandrie<br />75002 PARIS</p>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <span className="block text-xs font-bold text-gardenz-dark">Délai : Immédiat</span>
                            </div>
                        </div>

                        {/* 2. Chrono Relay */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gardenz-green transition-all relative overflow-hidden group">
                            <div className="mb-4 text-gardenz-dark group-hover:scale-110 transition-transform"><MapPin size={28} /></div>
                            <h4 className="font-display font-bold text-lg mb-1">Chrono Relay</h4>
                            <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wide">Point Relais</p>
                            <div className="text-sm text-gray-600 mb-2 space-y-1">
                                <p>Livraison en point de retrait.</p>
                                <p className="font-bold text-gardenz-green">OFFERT dès 49€</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-gardenz-dark">Délai : 24h</span>
                                <span className="text-sm font-bold">5.00 €</span>
                            </div>
                        </div>

                        {/* 3. Domicile Express */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gardenz-green transition-all relative overflow-hidden group">
                            <div className="mb-4 text-gardenz-dark group-hover:scale-110 transition-transform"><Truck size={28} /></div>
                            <h4 className="font-display font-bold text-lg mb-1">Chronopost Express</h4>
                            <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wide">Domicile</p>
                            <div className="text-sm text-gray-600 mb-2 space-y-1">
                                <p>Livraison main propre.</p>
                                <p className="font-bold text-gardenz-green">OFFERT dès 79€</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-gardenz-dark">Délai : 24h</span>
                                <span className="text-sm font-bold">7.00 €</span>
                            </div>
                        </div>

                        {/* 4. Stuart */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gardenz-cyan transition-all relative overflow-hidden group">
                            <div className="mb-4 text-gardenz-cyan group-hover:scale-110 transition-transform"><Bike size={28} /></div>
                            <h4 className="font-display font-bold text-lg mb-1">Stuart Ultra-Local</h4>
                            <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wide">Paris & Limitrophes</p>
                            <div className="text-sm text-gray-600 mb-2 space-y-1">
                                <p>Livraison par coursier.</p>
                                <p className="italic text-xs">Planifiable sur créneau.</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-gardenz-dark">Délai : ~2h</span>
                                <span className="text-sm font-bold">Variable</span>
                            </div>
                        </div>

                    </div>

                    {/* SECTION MONDE */}
                    <h2 className="font-display text-3xl font-bold text-gardenz-dark mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gardenz-cyan rounded-full"></span>
                        MONDE <span className="text-gray-400 text-lg font-sans font-medium normal-case">- L'Aventure Internationale</span>
                    </h2>
                    <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gardenz-dark shadow-sm flex-shrink-0">
                            <Globe size={40} strokeWidth={1.5} />
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-display text-xl font-bold mb-2">Expéditions Internationales</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Colissimo Signature, Chronopost Monde ou Express. Les tarifs et délais varient selon votre pays de destination. Les options exactes vous seront proposées automatiquement lors de la validation de votre panier.
                            </p>
                        </div>
                    </div>
                </div>

                {/* IV. SECTION 3 : LE RETOUR */}
                <div className="bg-gray-50 rounded-3xl border border-gardenz-green/20 p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gardenz-green"></div>

                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="md:w-1/3">
                            <div className="inline-flex items-center gap-2 text-gardenz-green font-bold uppercase tracking-widest mb-4">
                                <RefreshCcw size={20} /> La Re-Vibe
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-gardenz-dark mb-4">
                                CHILL, MAIS PAS TROP : <br />LES RETOURS
                            </h2>
                            <p className="text-gray-500">
                                Parce qu'on a le droit de changer d'avis (mais avec quelques règles du jeu).
                            </p>
                        </div>

                        <div className="md:w-2/3 space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gardenz-green shadow-sm shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-gardenz-dark mb-1">Conditions</h4>
                                    <p className="text-sm text-gray-600">Produit neuf, scellé, renvoyé sous 14 jours. <span className="text-red-500 font-bold">Attention :</span> Tout produit ouvert ou descellé ne sera pas remboursé.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gardenz-green shadow-sm shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-gardenz-dark mb-1">Procédure</h4>
                                    <p className="text-sm text-gray-600 mb-2">Contactez-nous avant tout renvoi en indiquant Nom, Prénom et N° de commande.</p>
                                    <div className="flex flex-wrap gap-4 text-xs font-bold">
                                        <span className="flex items-center gap-1 bg-white px-3 py-1 rounded border border-gray-200"><Mail size={12} /> contact@gardenz.fr</span>
                                        <span className="flex items-center gap-1 bg-white px-3 py-1 rounded border border-gray-200"><Phone size={12} /> 06 68 52 72 66</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gardenz-green shadow-sm shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-gardenz-dark mb-1">Frais</h4>
                                    <p className="text-sm text-gray-600">Les frais de retour sont à la charge du client.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* V. FOOTER CTA */}
                <div className="mt-20 text-center">
                    <Link
                        to="/boutique?filter=All"
                        className="group relative inline-flex items-center gap-4 bg-[#111] text-white px-10 py-5 rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:-translate-y-1"
                    >
                        {/* Neon Border Effect */}
                        <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gardenz-cyan/50 transition-colors"></span>

                        <span className="relative z-10 font-display font-bold text-lg tracking-wider uppercase flex items-center gap-3">
                            <ShoppingCart size={20} className="text-gardenz-green group-hover:text-gardenz-cyan transition-colors" />
                            Commencer le Shopping
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                    <p className="mt-4 text-xs text-gray-400 font-medium tracking-wide">
                        Livraison offerte dès 49€ d'achat
                    </p>
                </div>

            </div>
        </div>
    );
};
