
import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Leaf, Zap, Sparkles, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WELLNESS_PRODUCTS, EXTREME_PRODUCTS, LIFESTYLE_PRODUCTS } from '../constants';
import { getAssetUrl } from '../utils/assets';
import { CONFIG } from '../config';
import { Product } from '../types';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onProductClick?: (id: string) => void;
}

// SECURITY: Input Sanitization Helper
// Retire les caractères potentiellement dangereux pour éviter les injections XSS simples
const sanitizeInput = (input: string): string => {
    return input.replace(/[<>'"/]/g, '').trim();
};

// --- HYBRID SEARCH LOGIC ---
const searchProductsAPI = async (rawQuery: string): Promise<Product[]> => {
    const query = sanitizeInput(rawQuery); // Nettoyage avant traitement
    const lowerQuery = query.toLowerCase();

    // Si une API de recherche est configurée (ex: ElasticSearch, Algolia via Proxy)
    if (CONFIG.features.useLiveSearch && CONFIG.api.baseUrl) {
        try {
            // SECURITY: encodeURIComponent est CRUCIAL pour éviter l'injection dans l'URL
            const response = await fetch(`${CONFIG.api.baseUrl}${CONFIG.api.searchEndpoint}?q=${encodeURIComponent(query)}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            console.warn("Search API unavailable, falling back to local search.");
        }
    }

    // FALLBACK : Recherche Locale (Client-Side)
    // Utile pour la démo ou si l'API est down
    await new Promise(resolve => setTimeout(resolve, 300)); // Simule latence réseau naturelle

    const allProducts = [...WELLNESS_PRODUCTS, ...EXTREME_PRODUCTS, ...LIFESTYLE_PRODUCTS];
    const keywords = lowerQuery.split(' ').filter(word => word.length > 0);

    if (keywords.length === 0) return [];

    return allProducts.filter(product => {
        const searchableText = `${product.name} ${product.category} ${product.universe} ${product.tags.join(' ')}`.toLowerCase();
        // S'assure que TOUS les mots-clés sont présents (Logique AND)
        return keywords.every(word => searchableText.includes(word));
    }).slice(0, 6);
};

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onProductClick }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Handle Search Logic with Debounce and Async Call
    useEffect(() => {
        // Reset si vide
        if (query.trim() === '') {
            setResults([]);
            setError(null);
            setIsLoading(false);
            return;
        }

        const fetchSearchResults = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await searchProductsAPI(query);
                setResults(data);
            } catch (err) {
                console.error("Erreur de recherche:", err); // Log technique pour les devs (console)
                // SECURITY: Message générique pour l'utilisateur, ne pas afficher l'erreur brute
                setError("Impossible d'effectuer la recherche pour le moment.");
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce de 300ms pour éviter de spammer l'API
        const debounceTimer = setTimeout(() => {
            fetchSearchResults();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query]);

    // Handle Escape Key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    // Render Universe Label Style
    const getUniverseStyle = (universe: string | undefined) => {
        switch (universe) {
            case 'wellness': return 'text-gardenz-green bg-gardenz-green/10 border-gardenz-green/20';
            case 'extreme': return 'text-gardenz-cyan bg-gardenz-cyan/10 border-gardenz-cyan/20';
            case 'lifestyle': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
            default: return 'text-gray-400 bg-gray-800 border-gray-700';
        }
    };

    // Render Additional Badge (Usage / Intensity / Category)
    const getAdditionalBadge = (product: Product) => {
        if (product.universe === 'wellness' && product.tags.length > 0) {
            return {
                text: product.tags[0],
                style: 'text-gardenz-green bg-gardenz-green/10 border-gardenz-green/20'
            };
        }
        if (product.universe === 'extreme' && product.intensity) {
            const i = product.intensity;
            if (i === 'Soft') return { text: i, style: 'text-gardenz-cyan bg-gardenz-cyan/10 border-gardenz-cyan/30' };
            if (i === 'Medium') return { text: i, style: 'text-[#FF9F1C] bg-[#FF9F1C]/10 border-[#FF9F1C]/30' };
            if (i === 'Hardcore') return { text: i, style: 'text-gardenz-magenta bg-gardenz-magenta/10 border-gardenz-magenta/30' };
        }
        if (product.universe === 'lifestyle') {
            const parts = product.category.split(' / ');
            const displayCat = parts.length > 1 ? parts[1] : parts[0];

            return {
                text: displayCat,
                style: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
            };
        }
        return null;
    };

    return (
        <div className="fixed inset-0 z-[100] bg-gardenz-black/95 backdrop-blur-xl flex flex-col animate-fade-in" role="dialog" aria-modal="true" aria-label="Recherche">

            {/* Header / Input Area */}
            <div className="w-full max-w-4xl mx-auto px-6 pt-12 pb-6">
                <div className="flex justify-end mb-8">
                    <button onClick={onClose} aria-label="Fermer la recherche" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                        <X size={32} />
                    </button>
                </div>

                <div className="relative border-b-2 border-gray-700 focus-within:border-gardenz-green transition-colors duration-300">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                        {isLoading ? (
                            <Loader2 size={32} className="animate-spin text-gardenz-green" />
                        ) : (
                            <Search size={32} />
                        )}
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Recherchez : Fleur, Huile, CBN, Sommeil, ou un Artiste..."
                        aria-label="Champ de recherche"
                        className="w-full bg-transparent text-white text-2xl md:text-4xl font-display font-bold pl-12 pr-4 py-4 focus:outline-none placeholder:text-gray-600"
                    />
                </div>
            </div>

            {/* Results / Suggestions Area */}
            <div className="flex-grow overflow-y-auto max-w-4xl mx-auto px-6 w-full pb-20">

                {/* CASE 0: ERROR (Secure Message) */}
                {error && (
                    <div className="mt-8 text-center text-red-400 flex flex-col items-center animate-fade-in" role="alert">
                        <AlertCircle size={32} className="mb-2" />
                        <p>{error}</p>
                    </div>
                )}

                {/* CASE 1: ZERO RESULT (SUGGESTIONS) - Only show if not searching/loading */}
                {query === '' && !isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 animate-slide-up">

                        {/* Popular Searches */}
                        <div>
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Suggestions Populaires</h3>
                            <ul className="space-y-4">
                                {[
                                    { text: "Bien-être", icon: <Leaf size={16} /> },
                                    { text: "eXtreme", icon: <Zap size={16} /> },
                                    { text: "Huiles", icon: <Sparkles size={16} /> },
                                    { text: "Fleurs", icon: <Leaf size={16} /> },
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <button
                                            onClick={() => setQuery(item.text)}
                                            className="flex items-center gap-3 text-lg font-medium text-white hover:text-gardenz-green transition-colors group"
                                        >
                                            <span className="text-gray-600 group-hover:text-gardenz-green transition-colors">{item.icon}</span>
                                            {item.text}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories Shortcut */}
                        <div>
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Explorer par Univers</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button
                                    onClick={() => { navigate('/boutique?filter=wellness'); onClose(); }}
                                    className="bg-[#111] hover:bg-gardenz-green/10 border border-gray-800 hover:border-gardenz-green p-4 rounded-xl text-left transition-all group"
                                >
                                    <Leaf className="text-gardenz-green mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="block text-white font-bold">Bien-être</span>
                                    <span className="text-xs text-gray-500">Relaxation & Douceur</span>
                                </button>
                                <button
                                    onClick={() => { navigate('/boutique?filter=extreme'); onClose(); }}
                                    className="bg-[#111] hover:bg-gardenz-cyan/10 border border-gray-800 hover:border-gardenz-cyan p-4 rounded-xl text-left transition-all group"
                                >
                                    <Zap className="text-gardenz-cyan mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="block text-white font-bold">eXtreme</span>
                                    <span className="text-xs text-gray-500">Puissance & Fun</span>
                                </button>
                                <button
                                    onClick={() => { navigate('/boutique?filter=lifestyle'); onClose(); }}
                                    className="bg-[#111] hover:bg-gardenz-terra/10 border border-gray-800 hover:border-gardenz-terra p-4 rounded-xl text-left transition-all group"
                                >
                                    <Sparkles className="text-gardenz-terra mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="block text-white font-bold">LifeStyle</span>
                                    <span className="text-xs text-gray-500">Accessoires, Style & Culture</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* CASE 2: RESULTS FOUND - Show if not loading */}
                {query !== '' && results.length > 0 && !isLoading && (
                    <div className="mt-8">
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Résultats ({results.length})</h3>
                        <div className="grid grid-cols-1 gap-4" role="list">
                            {results.map((product) => {
                                const extraBadge = getAdditionalBadge(product);

                                return (
                                    <button
                                        key={product.id}
                                        onClick={() => {
                                            if (onProductClick) {
                                                onProductClick(product.id);
                                                onClose();
                                            } else {
                                                navigate(`/produit/${product.id}`);
                                                onClose();
                                            }
                                        }}
                                        role="listitem"
                                        className="flex items-center gap-6 bg-[#111] p-4 rounded-xl border border-gray-800 hover:border-gray-600 transition-all group w-full text-left"
                                    >
                                        {/* Image */}
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                                            <img src={getAssetUrl(product.image)} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-grow">
                                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                                <h4 className="text-white font-bold text-lg group-hover:text-gardenz-green transition-colors">{product.name}</h4>

                                                {/* Universe Badge */}
                                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border flex items-center gap-1 ${getUniverseStyle(product.universe)}`}>
                                                    {product.universe === 'wellness' ? 'Bien-être' : product.universe === 'extreme' ? 'eXtreme Lab' : 'Lifestyle'}
                                                </span>

                                                {/* Additional Badge (Usage/Intensity/SubCat) */}
                                                {extraBadge && (
                                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${extraBadge.style}`}>
                                                        {extraBadge.text}
                                                    </span>
                                                )}

                                                {/* Category Badge - New Separate Block (Grey/Simple) for Wellness/Extreme */}
                                                {(product.universe === 'wellness' || product.universe === 'extreme') && (
                                                    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-gray-400 bg-gray-800">
                                                        {product.category}
                                                    </span>
                                                )}
                                            </div>
                                            {/* Only show category line for Lifestyle as it might have breadcrumb info */}
                                            {product.universe === 'lifestyle' && (
                                                <p className="text-gray-500 text-sm">{product.category}</p>
                                            )}
                                        </div>

                                        {/* Price & Action */}
                                        <div className="flex items-center gap-6">
                                            <span className="text-white font-bold">{product.price.toFixed(2)}€</span>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-gardenz-green group-hover:text-white transition-all">
                                                <ArrowUpRight size={18} />
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-8 text-center">
                            <button className="text-gray-400 hover:text-white text-sm font-medium underline underline-offset-4">
                                Voir tous les résultats pour "{query}"
                            </button>
                        </div>
                    </div>
                )}

                {/* CASE 3: NO RESULTS - Show if not loading */}
                {query !== '' && results.length === 0 && !isLoading && !error && (
                    <div className="mt-20 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-6 text-gray-500">
                            <Search size={32} />
                        </div>
                        <h3 className="text-white font-display text-2xl font-bold mb-2">Aucun résultat trouvé</h3>
                        <p className="text-gray-500">Essayez avec "Huile", "Fleur" ou "Vape"...</p>
                    </div>
                )}

            </div>
        </div>
    );
};
