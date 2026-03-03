
import React from 'react';
import { ShieldCheck, Users, Zap, FlaskConical, Layers, Music, Video, Star, Leaf, CheckCircle, Search, Microscope, TriangleAlert, ShieldAlert, XCircle, ArrowRight, Activity, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdnPageProps { }

export const AdnPage: React.FC<AdnPageProps> = () => {
    return (
        <div className="bg-gardenz-white min-h-screen font-sans">

            {/* I. HEADER URBAN CHIC */}
            <div className="bg-[#111] pt-32 pb-24 px-6 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-green/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gardenz-terra/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        À PROPOS DE NOUS : <br /><span className="text-gardenz-green drop-shadow-[0_0_15px_rgba(56,118,29,0.4)]">L'ADN GARDENZ</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-medium">
                        Bousculer les codes. Réinventer la Vibe.<br />
                        Une approche résolument moderne et décomplexée du cannabis légal.
                    </p>
                </div>
            </div>

            {/* II. INTRODUCTION & VISION */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-1 hide bg-gardenz-dark rounded-full mb-8"></div>
                    <p className="text-xl md:text-2xl text-gardenz-dark font-display font-medium leading-relaxed italic">
                        "Nous sommes nés de la passion d'une équipe déterminée à <span className="text-gardenz-green font-bold">bousculer les codes</span> et à réinventer la façon dont notre domaine est perçu et consommé."
                    </p>
                    <p className="mt-6 text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Inspirés par les cultures urbaines et internationales, notre ambition est de dépoussiérer l'image de notre secteur. Notre identité repose sur une vibe singulière et des engagements fermes.
                    </p>
                </div>
            </section>

            {/* III. ENGAGEMENT SANS FILTRE (Bloc Lab-Tech) */}
            <section className="py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="group relative bg-gardenz-dark rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-[0_0_50px_rgba(0,255,255,0.1)]">

                        {/* Bordure de Scan animée au survol */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gardenz-cyan/30 transition-all duration-500 rounded-[2.5rem] pointer-events-none"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gardenz-cyan to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[pan-x_2s_linear_infinite] pointer-events-none"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                            {/* Colonne Gauche : Le Manifeste */}
                            <div className="p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gardenz-cyan/10 rounded-xl flex items-center justify-center text-gardenz-cyan border border-gardenz-cyan/20">
                                        <Search size={24} className="group-hover:animate-pulse" />
                                    </div>
                                    <span className="text-gardenz-cyan font-bold text-xs uppercase tracking-[0.3em]">Protocole Lab-Tech</span>
                                </div>
                                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    ENGAGEMENT <br /><span className="text-outline-white">SANS FILTRE.</span>
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    On ne vous vend pas des fleurs, on vous vend de la data certifiée. Chaque lot Gardenz passe sous le microscope avant d'entrer dans le Clan.
                                </p>
                                <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                    <Microscope size={16} /> Scan moléculaire complet
                                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                    <ShieldCheck size={16} /> 100% Traceable
                                </div>
                            </div>

                            {/* Colonne Droite : Le Tableau Élimination vs Garantie */}
                            <div className="p-10 md:p-16 bg-black/40 backdrop-blur-sm">
                                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                                    <FlaskConical size={16} className="text-gardenz-magenta" /> ÉLIMINATION VS GARANTIE
                                </h3>

                                <div className="space-y-4">
                                    {[
                                        { el: "Métaux Lourds", res: "Zéro Plomb/Cadmium", icon: <ShieldAlert className="text-red-500" /> },
                                        { el: "Pesticides", res: "Sol Vivant / 0% Toxique", icon: <XCircle className="text-red-500" /> },
                                        { el: "Solvants Chimiques", res: "Extraction CO2 Pure", icon: <TriangleAlert className="text-red-500" /> },
                                        { el: "Incertitude Légale", res: "Double Lab Check (COA)", icon: <Search className="text-red-500" /> }
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/row">
                                            <div className="flex items-center gap-3">
                                                <div className="opacity-50 group-hover/row:opacity-100 transition-opacity">
                                                    {row.icon}
                                                </div>
                                                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{row.el}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle size={14} className="text-gardenz-green" />
                                                <span className="text-white font-display font-bold text-sm">{row.res}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/5">
                                    <p className="text-gray-500 text-[10px] italic leading-relaxed">
                                        *Chaque produit dispose d'un QR Code renvoyant vers son Certificat d'Analyse (COA) indépendant et daté de moins de 6 mois.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* IV. NOS 3 PILIERS FONDAMENTAUX (Version Optimisée) */}
            <section className="bg-white py-24 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-gardenz-dark mb-4">
                            NOS 3 PILIERS <span className="text-gardenz-terra">FONDAMENTAUX</span>
                        </h2>
                        <p className="text-gray-500">Une vision assistée par la data et l'expertise Lab.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Pilier 1 : Qualité (Zéro Incertitude) */}
                        <div className="bg-gray-50 p-10 rounded-3xl shadow-sm border border-gardenz-green/20 hover:border-gardenz-green transition-all hover:shadow-lg group flex flex-col h-full">
                            <div className="w-16 h-16 bg-gardenz-green/10 rounded-2xl flex items-center justify-center text-gardenz-green mb-6 group-hover:scale-110 transition-transform">
                                <Activity size={32} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-2">Précision Scientifique</h3>
                            <p className="text-xs font-bold text-gardenz-green uppercase tracking-widest mb-4">Zéro Incertitude</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                Zéro incertitude. Chaque lot est scanné : extraction CO2 pure et chromatographie systématique. Nous garantissons une traçabilité sans filtre pour une exigence de précision chirurgicale, labo à l’appui.
                            </p>
                            <div className="pt-6 border-t border-gardenz-green/10">
                                <Link
                                    to="/tracabilite"
                                    className="text-xs font-bold text-gardenz-dark flex items-center gap-2 hover:text-gardenz-green transition-colors group/cta"
                                >
                                    Consulter les derniers rapports de labo <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Pilier 2 : Convivialité (Le Clan) */}
                        <div className="bg-gray-50 p-10 rounded-3xl shadow-sm border border-gardenz-terra/20 hover:border-gardenz-terra transition-all hover:shadow-lg group flex flex-col h-full">
                            <div className="w-16 h-16 bg-gardenz-terra/10 rounded-2xl flex items-center justify-center text-gardenz-terra mb-6 group-hover:scale-110 transition-transform">
                                <Crown size={32} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-2">Le Clan Exclusif</h3>
                            <p className="text-xs font-bold text-gardenz-terra uppercase tracking-widest mb-4">Hubs d'Expertise</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                Rejoignez le Clan. Nos boutiques sont des Hubs d’Expertise et des Studios de Sessions où l’on décrypte la Vibe ensemble. Drops exclusifs et accès prioritaires pour les membres actifs.
                            </p>
                            <div className="pt-6 border-t border-gardenz-terra/10">
                                <Link
                                    to="/fidelite"
                                    className="text-xs font-bold text-gardenz-dark flex items-center gap-2 hover:text-gardenz-terra transition-colors group/cta"
                                >
                                    Rejoindre le Clan Gardenz <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Pilier 3 : Nouveauté (Avant-Garde) */}
                        <div className="bg-[#111] p-10 rounded-3xl shadow-lg border border-gardenz-cyan/20 hover:border-gardenz-cyan transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] group text-white flex flex-col h-full">
                            <div className="w-16 h-16 bg-gardenz-cyan/10 rounded-2xl flex items-center justify-center text-gardenz-cyan mb-6 group-hover:scale-110 transition-transform">
                                <Zap size={32} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-white mb-2">Avant-Garde Moléculaire</h3>
                            <p className="text-xs font-bold text-gardenz-cyan uppercase tracking-widest mb-4">0.0% d'incertitude</p>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                L'avant-garde moléculaire commence ici. Pionniers du THCP et du CBN, notre Lab décrypte les cannabinoïdes rares avant tout le monde pour vous offrir 0.0% d'incertitude et une innovation sans filtre.
                            </p>
                            <div className="pt-6 border-t border-gardenz-cyan/20">
                                <Link
                                    to="/index-moleculaire"
                                    className="text-xs font-bold text-white flex items-center gap-2 hover:text-gardenz-cyan transition-colors group/cta"
                                >
                                    Accéder à l'Index Moléculaire <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* V. UN CATALOGUE POINTU */}
            <section className="py-24 bg-[#111] relative overflow-hidden">
                {/* Background Accents */}
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gardenz-magenta/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                            UN CATALOGUE <span className="text-gardenz-cyan">POINTU & AVANT-GARDISTE</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Gardenz est une enseigne spécialisée proposant une gamme très variée, souvent plus étendue que la concurrence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Bloc CBD Classique */}
                        <div className="bg-[#1A1A1A] border border-gray-800 p-8 rounded-2xl hover:border-gardenz-green transition-colors group">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gardenz-green/20 p-3 rounded-lg text-gardenz-green"><Leaf size={24} /></div>
                                <h3 className="font-bold text-xl text-white">CBD Classique</h3>
                            </div>
                            <ul className="space-y-3 text-gray-400">
                                {['Fleurs', 'Huiles (Full & Broad Spectrum)', 'Résines', 'Comestibles (Edibles)', 'Vapes', 'Produits Bien-être'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-gardenz-green rounded-full"></span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Bloc Molécules Diversifiées */}
                        <div className="bg-[#1A1A1A] border border-gray-800 p-8 rounded-2xl hover:border-gardenz-cyan transition-colors group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3">
                                <span className="text-[10px] bg-gardenz-cyan text-black font-bold px-2 py-1 rounded">LAB</span>
                            </div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gardenz-cyan/20 p-3 rounded-lg text-gardenz-cyan"><FlaskConical size={24} /></div>
                                <h3 className="font-bold text-xl text-white">Molécules Diversifiées</h3>
                            </div>
                            <p className="text-sm text-gray-500 mb-4 italic">Nous nous distinguons par une diversité de molécules incluant :</p>
                            <ul className="space-y-3 text-gray-300 font-medium">
                                {['Le Delta 9 THC (selon législation)', 'Le CBN', 'Le CBG', 'Le CBC', 'Molécules Rares'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-gardenz-cyan rounded-full"></span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Bloc Accessoires */}
                        <div className="bg-[#1A1A1A] border border-gray-800 p-8 rounded-2xl hover:border-gardenz-magenta transition-colors group">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gardenz-magenta/20 p-3 rounded-lg text-gardenz-magenta"><Layers size={24} /></div>
                                <h3 className="font-bold text-xl text-white">Accessoires</h3>
                            </div>
                            <ul className="space-y-3 text-gray-400">
                                {['Grinders', 'Vaporisateurs', 'Feuilles à rouler', 'Kits de test'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-gardenz-magenta rounded-full"></span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* VI. NOTRE SINGULARITÉ (LIFESTYLE) */}
            <section className="py-24 px-6 bg-gardenz-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-gardenz-dark mb-4">
                            PLUS QU'UN SHOP, <span className="text-gardenz-green">UNE VIBE</span>
                        </h2>
                        <p className="text-gray-500 max-w-3xl mx-auto text-lg">
                            Gardenz se positionne comme un CBD shop qui va au-delà du simple commerce. Nous développons un véritable univers lifestyle moderne et décomplexé.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

                        {/* Contenu Éducatif */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gardenz-dark mb-6 group-hover:bg-gardenz-green group-hover:text-white transition-all duration-300">
                                <Video size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">La Review'z</h3>
                            <p className="text-sm text-gray-600 px-4">
                                Des gélules éducatives pour décrypter les variétés et molécules en format court et accessible.
                            </p>
                        </div>

                        {/* Sessions Musicales */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gardenz-dark mb-6 group-hover:bg-gardenz-terra group-hover:text-white transition-all duration-300">
                                <Music size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Live Gardenz Session</h3>
                            <p className="text-sm text-gray-600 px-4">
                                Des sessions musicales en direct sur nos réseaux pour fédérer la communauté autour d'une ambiance unique.
                            </p>
                        </div>

                        {/* Marque Immersive */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gardenz-dark mb-6 group-hover:bg-gardenz-cyan group-hover:text-black transition-all duration-300">
                                <Star size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Marque Immersive</h3>
                            <p className="text-sm text-gray-600 px-4">
                                Humour, créativité et transparence pour briser les codes et célébrer la plante sous toutes ses formes.
                            </p>
                        </div>

                    </div>

                    {/* Engagement Quotidien Summary */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-gardenz-green to-gardenz-cyan"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                            <div className="px-4 py-2">
                                <h4 className="font-bold text-gardenz-dark mb-2">Univers Lifestyle Assumé</h4>
                                <p className="text-xs text-gray-500">Une expérience complète à travers nos contenus créatifs.</p>
                            </div>
                            <div className="px-4 py-2">
                                <h4 className="font-bold text-gardenz-dark mb-2">Communication Transparente</h4>
                                <p className="text-xs text-gray-500">Humour, clarté et service client irréprochable.</p>
                            </div>
                            <div className="px-4 py-2">
                                <h4 className="font-bold text-gardenz-dark mb-2">Expérience Premium</h4>
                                <p className="text-xs text-gray-500">Ergonomie et accueil de premier ordre sur toutes nos plateformes.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* VII. CONCLUSION */}
            <section className="bg-gardenz-green text-white py-20 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                        "Plus qu'une société, nous sommes une vibe, une invitation à découvrir notre domaine sous un nouveau jour."
                    </h2>
                </div>
            </section>

        </div>
    );
};
