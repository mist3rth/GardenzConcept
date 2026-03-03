
import React, { useState, useEffect, useRef } from 'react';
import { Menu, ShoppingBag, Search, User, X, ChevronRight, FlaskConical, ShieldCheck, ArrowRight, Star, Flame } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SearchOverlay } from './SearchOverlay';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ALL_PRODUCTS } from '../constants';

interface NavbarProps {
    currentPage: string;
    onProductClick?: (id: string) => void;
}

interface SubCategory {
    label: string;
    params: any;
}

interface MenuColumn {
    title: string;
    tagline: string;
    id: string;
    accentColor: string;
    items: SubCategory[];
    eeat: {
        label: string;
        shortLabel?: string;
        ctaLabel?: string;
        action: () => void;
    };
    featuredProductId: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onProductClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);

    const { setIsOpen, cartCount } = useCart();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const menuData: MenuColumn[] = [
        {
            id: 'wellness',
            title: 'BIEN-ÊTRE',
            tagline: '« Ciblez vos besoins, optimisez votre équilibre quotidien. »',
            accentColor: 'text-gardenz-green',
            items: [
                { label: 'Sommeil Profond', params: { filter: 'wellness', usage: 'Sommeil' } },
                { label: 'Anti-Stress & Anxiété', params: { filter: 'wellness', usage: 'Stress' } },
                { label: 'Focus & Productivité', params: { filter: 'wellness', usage: 'Focus' } },
                { label: 'Récupération & Corps', params: { filter: 'wellness', usage: 'Relaxation' } }
            ],
            eeat: {
                label: 'Le Guide du Dosage : Personnalisez votre protocole.',
                shortLabel: 'Guide du Dosage',
                action: () => navigate('/protocole', { state: { anchor: 'dosage-calculator' } })
            },
            featuredProductId: 'w1'
        },
        {
            id: 'extreme',
            title: 'EXTREME LAB',
            tagline: '« Molécules rares et puissances brutes : l\'expérience sans compromis. »',
            accentColor: 'text-gardenz-cyan',
            items: [
                { label: "L'Élite Moléculaire", params: { filter: 'extreme', intensity: 'Hardcore' } },
                { label: 'Les Concentrés Lab', params: { filter: 'extreme', category: 'Concentrés' } },
                { label: 'High-Potency Vapes', params: { filter: 'extreme', category: 'Vape' } },
                { label: 'Edibles de précision', params: { filter: 'extreme', category: 'Comestibles' } }
            ],
            eeat: {
                label: "Entrer dans le Lab : 0.0% de mystère.",
                shortLabel: "Index Moléculaire",
                ctaLabel: 'VOIR LES PRODUITS',
                action: () => navigate('/index-moleculaire')
            },
            featuredProductId: 'e1'
        },
        {
            id: 'lifestyle',
            title: 'LIFESTYLE',
            tagline: '« Accessoires, Apparel, Culture. Ne suivez pas le mouvement, faites-en partie. »',
            accentColor: 'text-gardenz-green',
            items: [
                { label: 'Gardenz Apparel', params: { filter: 'lifestyle', category: 'Vêtements' } },
                { label: 'Tools & High-Tech', params: { filter: 'lifestyle', category: 'Accessoires' } },
                { label: 'Culture & Objets', params: { filter: 'lifestyle', category: 'Livres' } },
                { label: 'Clan Rewards', params: { page: 'loyalty-referral' } }
            ],
            eeat: {
                label: 'Guide Matériel 2025 : Comment bien choisir son vaporisateur ?',
                shortLabel: 'Guide Vaporisateurs 2025',
                ctaLabel: 'Lire l\'article',
                action: () => navigate('/blog/b2')
            },
            featuredProductId: 'l1'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const threshold = currentPage === 'home' ? window.innerHeight * 0.75 : 100;
            setIsScrolled(currentScrollY > 50);

            if (currentScrollY < threshold) {
                setIsVisible(true);
            } else {
                if (currentScrollY > lastScrollY.current) {
                    setIsVisible(false);
                    setActiveMegaMenu(null);
                } else {
                    setIsVisible(true);
                }
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage]);

    const handleLinkClick = (params: any) => {
        setActiveMegaMenu(null);
        setIsMobileMenuOpen(false);

        if (params.page) {
            // Special pages
            if (params.page === 'loyalty-referral') navigate('/fidelite');
            else navigate(`/${params.page}`);
        } else {
            // Shop filters
            const searchParams = new URLSearchParams();
            if (params.filter) searchParams.set('filter', params.filter);
            if (params.category) searchParams.set('category', params.category);
            if (params.usage) searchParams.set('usage', params.usage);
            if (params.intensity) searchParams.set('intensity', params.intensity);
            navigate(`/boutique?${searchParams.toString()}`);
        }
    };

    const handleMainCategoryClick = (id: string) => {
        // If mega menu is already open for this item, navigate
        if (activeMegaMenu === id) {
            setActiveMegaMenu(null);
            navigate(`/boutique?filter=${id}`);
        } else {
            // First tap/click: open the mega menu
            setActiveMegaMenu(id);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const useDarkStyle = isScrolled || currentPage !== 'home' || activeMegaMenu !== null;

    return (
        <>
            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onProductClick={(id) => navigate(`/produit/${id}`)}
            />

            <div className={`fixed inset-0 z-[60] bg-gardenz-black transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} xl:hidden overflow-y-auto`}>
                <div className="p-6 flex flex-col min-h-screen">
                    <div className="flex justify-between items-center mb-12">
                        <span className="font-display font-bold text-2xl tracking-tighter text-white">GARDENZ</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Fermer le menu" className="text-white"><X size={32} /></button>
                    </div>

                    <div className="space-y-10">
                        {menuData.map((col) => (
                            <div key={col.id} className="space-y-4">
                                <button
                                    onClick={() => handleLinkClick({ filter: col.id })}
                                    className={`font-display text-3xl font-bold uppercase tracking-tight ${col.accentColor}`}
                                >
                                    {col.title}
                                </button>
                                <p className="text-gray-500 text-xs italic">{col.tagline}</p>
                                <div className="grid grid-cols-1 gap-3 pl-2">
                                    {col.items.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleLinkClick(item.params)}
                                            className="text-white text-lg font-medium flex items-center justify-between group"
                                        >
                                            {item.label} <ChevronRight size={18} className="text-gray-700" />
                                        </button>
                                    ))}
                                    
                                    <button
                                        onClick={() => { setIsMobileMenuOpen(false); col.eeat.action(); }}
                                        className={`mt-2 pt-3 border-t border-white/10 text-lg font-bold flex items-center justify-between group ${col.accentColor}`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {col.id === 'wellness' || col.id === 'lifestyle' ? <ShieldCheck size={18} /> : <FlaskConical size={18} />}
                                            {col.eeat.shortLabel || col.eeat.label}
                                        </span>
                                        <ArrowRight size={18} className="opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="pt-8 border-t border-white/10 space-y-4">
                            <Link to="/adn" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-display text-xl uppercase tracking-widest block">Notre ADN</Link>
                            <Link to="/boutiques" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-display text-xl uppercase tracking-widest block">Nos Boutiques</Link>
                        </div>
                    </div>

                    <div className="mt-auto pt-12 pb-8 flex flex-col gap-4">
                        <Link to={isAuthenticated ? "/mon-compte" : "/connexion"} onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                            <User size={20} /> Mon Espace Clan
                        </Link>
                        <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">Gardenz - Premium Hemp Brand</p>
                    </div>
                </div>
            </div>

            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${useDarkStyle ? 'bg-gardenz-black/95 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}
                onMouseLeave={() => setActiveMegaMenu(null)}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                    <div className="flex items-center gap-10">
                        <button
                            onMouseEnter={() => setActiveMegaMenu(null)}
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Ouvrir la recherche"
                            className="text-white hover:text-gardenz-green transition-colors hidden xl:block"
                        >
                            <Search size={22} />
                        </button>

                        <div className="hidden xl:flex items-center gap-8">
                            {menuData.map((col) => (
                                <div key={col.id} className="relative py-2">
                                    <button
                                        onMouseEnter={() => setActiveMegaMenu(col.id)}
                                        onClick={() => handleMainCategoryClick(col.id)}
                                        className={`text-white transition-colors duration-300 text-sm font-bold tracking-widest font-display uppercase hover:${col.accentColor} flex items-center gap-1`}
                                    >
                                        {col.title}
                                    </button>
                                </div>
                            ))}
                            <Link
                                to="/adn"
                                onMouseEnter={() => setActiveMegaMenu(null)}
                                onClick={() => setActiveMegaMenu(null)}
                                className="text-white hover:text-gray-400 text-sm font-bold tracking-widest font-display uppercase"
                            >
                                ADN
                            </Link>
                        </div>

                        <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Ouvrir le menu" className="text-white xl:hidden"><Menu size={28} /></button>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Link
                            to="/"
                            onMouseEnter={() => setActiveMegaMenu(null)}
                            onClick={() => setActiveMegaMenu(null)}
                            className="flex flex-col items-center group"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-gardenz-green transition-colors"><path d="M12 22v-8" /><path d="M12 14c0-3-2-5-2-9 0-1.5.5-2 2-2s2 .5 2 2c0 4-2 6-2 9Z" /><path d="M12 14c-3 0-5 2-9 2-1.5 0-2-.5-2-2s.5-2 2-2c4 0 6 2 9 2Z" /><path d="M12 14c3 0 5 2 9 2 1.5 0 2-.5 2-2s-.5-2-2-2c-4 0-6 2-9 2Z" /></svg>
                            <span className="font-display font-bold text-xl tracking-tighter text-white">GARDENZ</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        {isAuthenticated ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    aria-label="Mon compte"
                                    className="relative transition-colors flex items-center text-gardenz-green hover:text-white"
                                >
                                    <User size={22} />
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gardenz-green rounded-full border-2 border-gardenz-black"></span>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-4 w-48 bg-gardenz-black border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-fade-in origin-top-right">
                                        <Link 
                                            to="/mon-compte" 
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            Mon compte
                                        </Link>
                                        <button 
                                            onClick={() => {
                                                logout();
                                                setIsUserMenuOpen(false);
                                                navigate('/');
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                                        >
                                            Me déconnecter
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/connexion"
                                onMouseEnter={() => setActiveMegaMenu(null)}
                                onClick={() => setActiveMegaMenu(null)}
                                aria-label="Se connecter"
                                className="relative transition-colors text-white hover:text-gardenz-green"
                            >
                                <User size={22} />
                            </Link>
                        )}
                        <button onClick={() => setIsSearchOpen(true)} aria-label="Ouvrir la recherche" className="text-white xl:hidden"><Search size={22} /></button>
                        <button
                            onMouseEnter={() => setActiveMegaMenu(null)}
                            onClick={() => { setActiveMegaMenu(null); setIsOpen(true); }}
                            aria-label="Ouvrir le panier"
                            className="text-white hover:text-gardenz-magenta transition-colors relative"
                        >
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gardenz-green text-[10px] w-5 h-5 flex items-center justify-center rounded-full text-white font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div
                    className={`absolute top-full left-0 w-full bg-gardenz-black border-t border-white/10 transition-all duration-500 overflow-hidden shadow-2xl hidden xl:block
                ${activeMegaMenu ? 'max-h-[500px] opacity-100 py-6 lg:py-12' : 'max-h-0 opacity-0 py-0'}
            `}
                >
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-6 lg:gap-12">
                        {menuData.map((col) => {
                            const isActive = activeMegaMenu === col.id;
                            if (!isActive) return null;

                            return (
                                <React.Fragment key={col.id}>
                                    <div className="col-span-8 grid grid-cols-2 gap-6 lg:gap-12 animate-slide-up">
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className={`font-display text-2xl lg:text-4xl font-bold uppercase tracking-tighter mb-1 lg:mb-2 ${col.accentColor}`}>
                                                    {col.title}
                                                </h3>
                                                <p className="text-gray-400 font-medium italic text-sm lg:text-lg leading-relaxed">
                                                    {col.tagline}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 gap-y-4 pt-4">
                                                {col.items.map((item, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleLinkClick(item.params)}
                                                        className="text-white text-sm lg:text-lg font-display font-bold uppercase tracking-widest hover:translate-x-2 transition-transform text-left flex items-center gap-2 lg:gap-3 group"
                                                    >
                                                        <span className={`w-2 h-2 rounded-full scale-0 group-hover:scale-100 transition-transform ${col.accentColor === 'text-gardenz-green' ? 'bg-gardenz-green' : col.accentColor === 'text-gardenz-cyan' ? 'bg-gardenz-cyan' : 'bg-gardenz-magenta'}`}></span>
                                                        {item.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-start">
                                            <div
                                                onClick={() => { setActiveMegaMenu(null); col.eeat.action(); }}
                                                className="bg-white/5 border border-white/10 p-5 lg:p-8 rounded-2xl lg:rounded-3xl group/eeat cursor-pointer hover:border-white/20 transition-all hover:bg-white/10"
                                            >
                                                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-6 transition-transform group-hover/eeat:scale-110 ${col.accentColor === 'text-gardenz-green' ? 'bg-gardenz-green/10 text-gardenz-green' : col.accentColor === 'text-gardenz-cyan' ? 'bg-gardenz-cyan/10 text-gardenz-cyan' : col.accentColor === 'text-gardenz-magenta/10 text-gardenz-magenta'}`}>
                                                    {col.id === 'wellness' || col.id === 'lifestyle' ? <ShieldCheck size={22} /> : <FlaskConical size={22} />}
                                                </div>
                                                <h4 className="text-white font-bold text-sm lg:text-xl mb-2 lg:mb-3 leading-tight">
                                                    {col.eeat.label}
                                                </h4>
                                                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80 group-hover/eeat:opacity-100 transition-opacity ${col.accentColor}`}>
                                                    {col.eeat.ctaLabel || 'Explorer maintenant'} <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-4 animate-fade-in">
                                        <div 
                                            className="relative aspect-[4/5] rounded-3xl overflow-hidden group/img cursor-pointer shadow-xl border border-gray-800"
                                            onClick={() => { setActiveMegaMenu(null); navigate(`/produit/${col.featuredProductId}`); }}
                                        >
                                            {(() => {
                                                const prod = ALL_PRODUCTS.find(p => p.id === col.featuredProductId);
                                                return prod ? (
                                                    <>
                                                        <img
                                                            src={prod.image}
                                                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000 brightness-90"
                                                            alt={prod.name}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-gardenz-black via-gardenz-black/40 to-transparent opacity-90"></div>
                                                        <div className="absolute top-4 right-4 bg-[#DC2626] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded flex items-center gap-1.5 shadow-md animate-pulse">
                                                            <Flame size={12} fill="currentColor" /> TOP VENTE
                                                        </div>
                                                        <div className="absolute bottom-8 left-8 right-8">
                                                            <h4 className="text-white font-bold text-lg lg:text-2xl font-display mb-2">{prod.name}</h4>
                                                            <p className="text-gray-300 text-sm mb-6 line-clamp-2">{prod.shortDescription || prod.vibe || "L'excellence Gardenz"}</p>
                                                            <span
                                                                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest group-hover/img:bg-gardenz-green group-hover/img:text-white transition-colors"
                                                            >
                                                                Découvrir <ArrowRight size={14} />
                                                            </span>
                                                        </div>
                                                    </>
                                                ) : null;
                                            })()}
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
};
