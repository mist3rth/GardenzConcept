
import React from 'react';
import { Shield, Lock, Eye, Database, Cookie, Server, CheckCircle, Mail } from 'lucide-react';

interface PrivacyPageProps { }

export const PrivacyPage: React.FC<PrivacyPageProps> = () => {
    return (
        <div className="bg-gardenz-white min-h-screen font-sans">

            {/* HEADER */}
            <div className="bg-[#111] pt-32 pb-24 px-6 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-green/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gardenz-terra/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl mb-6 border border-white/10 text-gardenz-green">
                        <Shield size={32} />
                    </div>
                    <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        POLITIQUE DE <span className="text-gardenz-green">CONFIDENTIALITÉ</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Transparence totale sur l'utilisation de vos données et la gestion des cookies.
                    </p>
                    <p className="text-xs text-gray-500 mt-4 uppercase tracking-widest">Date de dernière mise à jour : 6 Décembre 2025</p>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-4xl mx-auto px-6 py-16">

                <div className="prose prose-lg prose-stone max-w-none">
                    <p className="lead text-xl text-gardenz-dark font-medium leading-relaxed mb-12">
                        Bienvenue sur <strong>Gardenz</strong>. Nous nous engageons à protéger vos données personnelles et à vous offrir une transparence totale sur leur utilisation, conformément au Règlement Général sur la Protection des Données (RGPD).
                    </p>

                    {/* SECTION 1 */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gardenz-green/10 rounded-full flex items-center justify-center text-gardenz-green shrink-0">
                                <Lock size={24} />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-gardenz-dark m-0">1. Responsable du Traitement</h2>
                        </div>
                        <div className="pl-0 md:pl-16 text-gray-600 text-sm md:text-base leading-relaxed">
                            <p className="mb-4">L'entité responsable du traitement de vos données est :</p>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 inline-block pr-12">
                                <p className="font-bold text-gardenz-dark">Société REPUBLIK GARDEN (Gardenz)</p>
                                <p>4 rue Beaurepaire, 75010 Paris</p>
                                <p className="mt-2 text-gardenz-green font-medium flex items-center gap-2"><Mail size={14} /> contact@gardenz.fr</p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2 */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gardenz-terra/10 rounded-full flex items-center justify-center text-gardenz-terra shrink-0">
                                <Database size={24} />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-gardenz-dark m-0">2. Quelles Données Collectons-Nous ?</h2>
                        </div>

                        <div className="pl-0 md:pl-16 space-y-8">
                            <div>
                                <h3 className="font-bold text-lg text-gardenz-dark flex items-center gap-2 mb-3">
                                    <CheckCircle size={18} className="text-gardenz-green" /> A. Données Essentielles (Fonctionnement du Site)
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">Ces données sont nécessaires au fonctionnement minimal de notre service et sont traitées sur la base de notre intérêt légitime :</p>
                                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1 marker:text-gardenz-green">
                                    <li>Données de connexion (adresse IP anonymisée, type de navigateur).</li>
                                    <li>Votre préférence de consentement aux cookies (<em>gardenz_cookie_consent</em> stockée localement).</li>
                                    <li>Données nécessaires à l'exécution d'une commande (Nom, Adresse, Email) si achat effectué.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-gardenz-dark flex items-center gap-2 mb-3">
                                    <CheckCircle size={18} className="text-gardenz-terra" /> B. Données Non-Essentielles (Traitement après Consentement)
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">Ces données sont collectées uniquement si vous avez accepté notre politique de cookies. Elles sont traitées sur la base de votre consentement explicite :</p>
                                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1 marker:text-gardenz-terra">
                                    <li><strong>Données API Tiers (Google Reviews) :</strong> Pour afficher les avis vérifiés, nous pouvons transmettre des informations de session de base à l'API Google.</li>
                                    <li><strong>Données d'Analyse :</strong> Pour améliorer nos services (ex: Google Analytics), des données anonymes de navigation peuvent être collectées.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3 */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gardenz-cyan/10 rounded-full flex items-center justify-center text-gardenz-cyan shrink-0">
                                <Server size={24} />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-gardenz-dark m-0">3. Utilisation & Destinataires</h2>
                        </div>
                        <div className="pl-0 md:pl-16 text-gray-600 text-sm md:text-base leading-relaxed space-y-6">
                            <div>
                                <h4 className="font-bold text-gardenz-dark mb-2">Finalités du traitement :</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li><strong>Fonctionnement du Service :</strong> Assurer la sécurité, le traitement des commandes et l'accessibilité de la plateforme.</li>
                                    <li><strong>Amélioration de la Qualité :</strong> Analyser les tendances d'utilisation (uniquement avec consentement).</li>
                                    <li><strong>Intégration de Contenu Tiers :</strong> Afficher les revues et cartes interactives.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gardenz-dark mb-2">Destinataires :</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li><strong>Services Google :</strong> Nous transmettons les requêtes nécessaires à Google pour récupérer ou analyser les données que vous demandez (recherche, avis). Ces services peuvent utiliser leurs propres cookies conformément à leurs politiques.</li>
                                    <li><strong>IONOS :</strong> Notre hébergeur, qui assure le stockage sécurisé des données.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4 */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gardenz-magenta/10 rounded-full flex items-center justify-center text-gardenz-magenta shrink-0">
                                <Cookie size={24} />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-gardenz-dark m-0">4. Gestion de Vos Choix</h2>
                        </div>
                        <div className="pl-0 md:pl-16 text-gray-600 text-sm md:text-base leading-relaxed">
                            <p className="mb-4">
                                Le fichier que nous utilisons pour mémoriser votre choix de consentement (<em>gardenz_cookie_consent</em>) est conservé pour une période de <strong>12 mois</strong>.
                            </p>
                            <div className="bg-gray-50 border-l-4 border-gardenz-magenta p-4 rounded-r-xl">
                                <h4 className="font-bold text-gardenz-dark mb-2">Comment modifier votre consentement ?</h4>
                                <p className="text-sm mb-4">
                                    Si vous souhaitez retirer ou modifier votre consentement aux cookies, vous pouvez le faire à tout moment :
                                </p>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('gardenz_cookie_consent');
                                        window.location.reload();
                                    }}
                                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-gardenz-magenta hover:text-white hover:border-gardenz-magenta transition-all"
                                >
                                    Réinitialiser mes préférences
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 italic text-center mt-12">
                        Ce document est conforme aux exigences du RGPD et valide pour l'utilisation du site Gardenz.fr.
                    </p>

                </div>
            </div>
        </div>
    );
};
