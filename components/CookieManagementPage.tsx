
import React from 'react';
import { Cookie, ShieldCheck, Settings, Info, Trash2, MousePointer2, Lock } from 'lucide-react';
import { useCookie } from '../context/CookieContext';

export const CookieManagementPage: React.FC = () => {
  const { resetConsent } = useCookie();

  return (
    <div className="bg-gardenz-white min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="bg-[#111] pt-32 pb-24 px-6 relative overflow-hidden text-center">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gardenz-green/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gardenz-terra/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

         <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl mb-6 border border-white/10 text-gardenz-green">
                <Cookie size={32} />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight uppercase">
                Respect de votre <span className="text-gardenz-green">Vie Privée</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                Ici, on ne plaisante pas avec vos données. Gérez vos préférences et gardez le contrôle sur votre expérience Gardenz.
            </p>
         </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        <article className="prose prose-stone max-w-none">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-12">
                <h2 className="font-display text-2xl font-bold text-gardenz-dark flex items-center gap-3 mt-0">
                    <Info className="text-gardenz-green" /> Pourquoi des cookies ?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                    Chez <strong>Gardenz</strong>, nous utilisons des cookies pour rendre votre navigation plus fluide et personnalisée. Ils nous permettent de comprendre comment vous interagissez avec nos univers — que vous exploriez la douceur du <strong>Bien-être</strong>, la puissance de l'<strong>eXtreme Lab</strong> ou le style du <strong>Lifestyle</strong>. Notre objectif est simple : vous offrir l'expérience la plus pertinente possible, en toute sécurité.
                </p>
            </div>

            <h2 className="font-display text-2xl font-bold text-gardenz-dark mb-6">Récapitulatif des cookies utilisés</h2>
            
            <div className="overflow-x-auto mb-12 border border-gray-200 rounded-2xl shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gardenz-dark font-bold uppercase tracking-wider border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Type de Cookie</th>
                            <th className="px-6 py-4">Finalité</th>
                            <th className="px-6 py-4">Durée</th>
                            <th className="px-6 py-4">Nécessaire</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr>
                            <td className="px-6 py-4 font-bold text-gardenz-dark">Essentiels</td>
                            <td className="px-6 py-4 text-gray-600">Connexion à votre espace Clan, mémorisation du panier et choix de confidentialité.</td>
                            <td className="px-6 py-4 text-gray-500">Session / 1 an</td>
                            <td className="px-6 py-4"><span className="text-green-600 font-bold">OUI</span></td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-bold text-gardenz-dark">Performance</td>
                            <td className="px-6 py-4 text-gray-600">Analyse anonyme du trafic pour améliorer l'ergonomie des pages.</td>
                            <td className="px-6 py-4 text-gray-500">13 mois</td>
                            <td className="px-6 py-4 text-gray-400">Non</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-bold text-gardenz-dark">Marketing</td>
                            <td className="px-6 py-4 text-gray-600">Affichage de publicités ciblées sur nos nouveautés (Drops, Molécules rares) selon vos intérêts.</td>
                            <td className="px-6 py-4 text-gray-500">12 mois</td>
                            <td className="px-6 py-4 text-gray-400">Non</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-gardenz-dark text-white p-8 rounded-3xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gardenz-green/10 rounded-full blur-3xl"></div>
                <h2 className="font-display text-2xl font-bold text-white mt-0 mb-4 flex items-center gap-3">
                    <Settings className="text-gardenz-green" /> Comment retirer votre consentement ?
                </h2>
                <p className="text-gray-400 mb-6">
                    Vous avez changé d'avis ? C'est votre droit le plus strict. Vous pouvez réinitialiser vos préférences de cookies en un seul clic ci-dessous. Le bandeau de choix réapparaîtra immédiatement pour vous permettre de refaire votre sélection.
                </p>
                <button 
                    onClick={resetConsent}
                    className="inline-flex items-center gap-2 bg-gardenz-green text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-gardenz-green transition-all shadow-lg"
                >
                    <Trash2 size={16} /> Réinitialiser mes préférences
                </button>
            </div>

            <h2 className="font-display text-2xl font-bold text-gardenz-dark mb-6">Désactivation via votre navigateur</h2>
            <p className="text-gray-600 mb-8">
                Pour une maîtrise totale, vous pouvez également configurer votre navigateur pour bloquer systématiquement les cookies. Voici la procédure pour les navigateurs les plus courants :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {[
                    { name: 'Google Chrome', steps: 'Paramètres > Confidentialité et sécurité > Cookies et autres données des sites' },
                    { name: 'Safari', steps: 'Réglages > Safari > Avancé > Données de sites web' },
                    { name: 'Firefox', steps: 'Options > Vie privée et sécurité > Cookies et données de sites' },
                    { name: 'Microsoft Edge', steps: 'Paramètres > Cookies et autorisations de site' }
                ].map((browser) => (
                    <div key={browser.name} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                        <h4 className="font-bold text-gardenz-dark mb-1 flex items-center gap-2">
                            <MousePointer2 size={14} className="text-gardenz-terra" /> {browser.name}
                        </h4>
                        <p className="text-xs text-gray-500 italic">{browser.steps}</p>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-200 pt-8 text-center">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                    <Lock size={14} className="text-gardenz-green" /> Conformité RGPD 2026 - Gardenz Safe-Web
                </div>
            </div>
        </article>
      </div>
    </div>
  );
};
