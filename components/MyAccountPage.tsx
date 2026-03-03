import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SEOHead } from './SEOHead';
import { Package, User, MapPin, LogOut, ChevronRight, Hash, Calendar, CircleCheckBig, Clock } from 'lucide-react';

export const MyAccountPage: React.FC = () => {
    const { isAuthenticated, userEmail, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/connexion', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const MOCK_ORDERS = [
        { id: 'ORD-2026-892', date: '12 Fév 2026', total: '142.50€', status: 'Livré', statusIcon: <CircleCheckBig size={16} className="text-gardenz-green" /> },
        { id: 'ORD-2026-745', date: '04 Jan 2026', total: '89.00€', status: 'En cours de livraison', statusIcon: <Clock size={16} className="text-[#FF9F1C]" /> },
    ];

    const MOCK_ADDRESS = {
        name: 'Jean Dupont',
        street: '142 Rue de Rivoli',
        city: '75001 Paris',
        country: 'France',
        phone: '+33 6 12 34 56 78'
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'orders':
                return (
                    <div className="animate-fade-in">
                        <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Historique des commandes</h2>
                        {MOCK_ORDERS.length > 0 ? (
                            <div className="space-y-4">
                                {MOCK_ORDERS.map((order) => (
                                    <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gardenz-green/50 transition-colors">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gardenz-green font-bold flex items-center gap-2"><Hash size={16} />{order.id}</span>
                                            <span className="text-gray-400 text-sm flex items-center gap-2"><Calendar size={14} />{order.date}</span>
                                        </div>
                                        <div className="flex items-center gap-8 justify-between md:justify-end">
                                            <span className="text-xl font-bold text-white">{order.total}</span>
                                            <span className="flex items-center gap-2 text-sm font-medium bg-gardenz-black px-3 py-1.5 rounded-full border border-white/10">
                                                {order.statusIcon} {order.status}
                                            </span>
                                            <button className="text-gray-400 hover:text-white transition-colors" title="Voir les détails"><ChevronRight size={20} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                                <Package size={48} className="mx-auto text-gray-600 mb-4" />
                                <p className="text-gray-400 font-medium">Vous n'avez pas encore passé de commande.</p>
                                <button onClick={() => navigate('/boutique')} className="mt-6 bg-gardenz-green text-black font-bold uppercase tracking-wide px-8 py-3 rounded-full hover:bg-white hover:scale-105 transition-all">Aller à la boutique</button>
                            </div>
                        )}
                    </div>
                );
            case 'profile':
                return (
                    <div className="animate-fade-in">
                        <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Informations personnelles</h2>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 max-w-2xl">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Email de connexion</label>
                                    <div className="bg-gardenz-black border border-white/20 rounded-lg p-3 text-white font-medium flex items-center justify-between">
                                        {userEmail} 
                                        <span className="text-[10px] bg-gardenz-green/20 text-gardenz-green px-2 py-0.5 rounded uppercase font-bold">Vérifié</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Prénom</label>
                                        <input type="text" defaultValue="Jean" className="w-full bg-gardenz-black border border-white/20 rounded-lg p-3 text-white focus:border-gardenz-green focus:ring-1 focus:ring-gardenz-green outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Nom</label>
                                        <input type="text" defaultValue="Dupont" className="w-full bg-gardenz-black border border-white/20 rounded-lg p-3 text-white focus:border-gardenz-green focus:ring-1 focus:ring-gardenz-green outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Mot de passe</label>
                                    <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg transition-colors border border-white/10 text-sm">Modifier le mot de passe</button>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                                <button className="bg-gardenz-green text-black font-bold uppercase tracking-wide px-8 py-3 rounded-full hover:bg-white transition-colors">Enregistrer les modifications</button>
                            </div>
                        </div>
                    </div>
                );
            case 'addresses':
                return (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-widest">Carnet d'adresses</h2>
                            <button className="text-gardenz-green text-sm font-bold uppercase hover:underline">+ Nouvelle adresse</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/5 border border-gardenz-green/50 rounded-xl p-6 relative">
                                <div className="absolute top-4 right-4 bg-gardenz-green text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Défaut</div>
                                <h3 className="font-bold text-white mb-2">{MOCK_ADDRESS.name}</h3>
                                <div className="text-gray-400 text-sm space-y-1">
                                    <p>{MOCK_ADDRESS.street}</p>
                                    <p>{MOCK_ADDRESS.city}</p>
                                    <p>{MOCK_ADDRESS.country}</p>
                                    <p className="pt-2">{MOCK_ADDRESS.phone}</p>
                                </div>
                                <div className="mt-6 flex gap-4">
                                    <button className="text-white text-sm font-bold underline hover:text-gardenz-green">Modifier</button>
                                    <button className="text-red-400 text-sm font-bold hover:underline">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gardenz-black pt-24 pb-20 selection:bg-gardenz-green selection:text-white">
            <SEOHead title="Mon Compte | Gardenz" description="Gérez vos commandes, informations et adresses sur Gardenz." />
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">MON ESPACE <span className="text-gardenz-green">CLAN</span></h1>
                    <p className="text-gray-500">Bienvenue dans votre espace privilégié, {userEmail?.split('@')[0] || 'Member'}.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Sidebar Natiovation */}
                    <aside className="w-full lg:w-1/4 shrink-0 bg-[#111] border border-white/10 rounded-2xl p-4 sticky top-28">
                        <nav className="space-y-2">
                            <button 
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${activeTab === 'orders' ? 'bg-gardenz-green text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <Package size={20} /> Mes Commandes
                            </button>
                            <button 
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${activeTab === 'profile' ? 'bg-gardenz-green text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <User size={20} /> Infos personnelles
                            </button>
                            <button 
                                onClick={() => setActiveTab('addresses')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${activeTab === 'addresses' ? 'bg-gardenz-green text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <MapPin size={20} /> Mes Adresses
                            </button>
                            
                            <div className="pt-4 mt-4 border-t border-white/10">
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-bold text-red-400 hover:bg-red-400/10"
                                >
                                    <LogOut size={20} /> Déconnexion
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 w-full min-h-[400px]">
                        {renderTabContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};
