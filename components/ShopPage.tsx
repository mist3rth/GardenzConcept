
import React, { useState, useEffect } from 'react';
import { ALL_PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { Filter, X, LayoutGrid, Flower, Droplet, Utensils, Wind, Layers, Gem, Shirt, FlaskConical, BookOpen, Music, Sparkles, Pill, Circle, Moon, Sun, BrainCircuit, Award, Sprout, ArrowDown, CupSoda, HeartHandshake, CheckCircle, Heart, Truck, ShieldCheck, MessageSquare, Star } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { SEOHead } from './SEOHead';
import { Product } from '../types';

interface ShopPageProps {
    currentUniverse: string;
    currentCategory: string;
    currentUsage: string;
    currentIntensity: string;
    currentMolecule: string;
    currentQualityFilters: {
        labTested: boolean;
        fullSpectrum: boolean;
        premium: boolean;
    };

    onFilterChange: (filters: { universe?: string; category?: string; usage?: string; intensity?: string; molecule?: string }) => void;
    onQualityFilterChange: (key: 'labTested' | 'fullSpectrum' | 'premium', value: boolean) => void;

    onProductClick: (id: string) => void;
    onQuickView?: (product: Product) => void;
    initialCategory?: string;
}

const MOLECULES_BY_INTENSITY: Record<string, string[]> = {
    'Soft': ['CBD', 'CBG', 'CBC', 'CBN', 'H4-CBD'],
    'Medium': ['THCV', 'HHC', 'Delta-9-THC', 'HHCA'],
    'Hardcore': ['HHCP-O', 'THC-O', 'HHC-P', 'THCP', 'THCH', 'THCB']
};

export const ShopPage: React.FC<ShopPageProps> = ({
    currentUniverse,
    currentCategory,
    currentUsage,
    currentIntensity,
    currentMolecule,
    currentQualityFilters,
    onFilterChange,
    onQualityFilterChange,
    onProductClick,
    onQuickView,
    initialCategory
}) => {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 400]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const ITEMS_PER_PAGE = 24;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentUniverse, currentCategory, currentUsage, currentIntensity, currentMolecule]);

    // Hide navbar + prevent background scroll when mobile filters are open
    useEffect(() => {
        if (isMobileFilterOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [isMobileFilterOpen]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 12);
    };

    const handleUsageClick = (u: string) => {
        onFilterChange({
            usage: u,
            intensity: currentUniverse === 'All' ? 'All' : undefined,
            molecule: currentUniverse === 'All' ? 'All' : undefined
        });
    };

    const handleIntensityClick = (i: string) => {
        const newIntensity = currentIntensity === i ? 'All' : i;
        onFilterChange({
            intensity: newIntensity,
            molecule: 'All',
            usage: currentUniverse === 'All' ? 'All' : undefined
        });
    };

    const handleMoleculeClick = (m: string) => {
        onFilterChange({ molecule: m === currentMolecule ? 'All' : m });
    };

    const getCategories = () => {
        const base = ['Fleurs', 'Huiles', 'Comestibles', 'Vape', 'Résines', 'Concentrés'];
        const wellnessExtras = ['Boissons', 'Bien-être', 'Cosmétique', 'Gélules'];
        if (currentUniverse === 'lifestyle') return ['Tout', 'Vêtements', 'Accessoires', 'Livres', 'Musique'];
        if (currentUniverse === 'extreme') return ['Tout', ...base, 'Gélules'];
        if (currentUniverse === 'All') return ['Tout', ...base, ...wellnessExtras, 'Vêtements', 'Accessoires', 'Livres', 'Musique'];
        return ['Tout', ...base, ...wellnessExtras];
    };

    const categories = getCategories();

    const filterProduct = (product: any, overrides: any = {}) => {
        const universe = overrides.universe !== undefined ? overrides.universe : currentUniverse;
        const category = overrides.category !== undefined ? overrides.category : currentCategory;
        const usage = overrides.usage !== undefined ? overrides.usage : currentUsage;
        const intensity = overrides.intensity !== undefined ? overrides.intensity : currentIntensity;
        const molecule = overrides.molecule !== undefined ? overrides.molecule : currentMolecule;

        if (universe !== 'All' && product.universe !== universe) return false;
        if (category !== 'All' && category !== 'Tout') {
            if (category.includes(' / ')) {
                if (product.category !== category) return false;
            } else {
                if (!product.category.includes(category)) return false;
            }
        }
        if ((universe === 'wellness' || universe === 'All') && usage !== 'All') {
            if (universe === 'All' && product.universe !== 'wellness') return false;
            if (!product.tags.includes(usage)) return false;
        }
        if ((universe === 'extreme' || universe === 'All') && intensity !== 'All') {
            if (product.universe === 'lifestyle') return false;
            if (product.intensity !== intensity) return false;
        }
        if (molecule !== 'All') {
            if (!product.molecule || product.molecule !== molecule) return false;
        }
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
        if (currentQualityFilters.labTested) {
            const isLabTested = ['Fleurs', 'Résines', 'Concentrés', 'Vape'].some((c: string) => product.category.includes(c));
            if (!isLabTested) return false;
        }
        if (currentQualityFilters.fullSpectrum) {
            const isFullSpectrum = product.universe === 'wellness' && product.category.includes('Huiles');
            if (!isFullSpectrum) return false;
        }
        if (currentQualityFilters.premium) {
            const isPremium = product.price >= 60;
            if (!isPremium) return false;
        }
        return true;
    };

    const getMixedProducts = (products: Product[]) => {
        if (currentUniverse !== 'All') return products;

        const wellness = products.filter(p => p.universe === 'wellness');
        const extreme = products.filter(p => p.universe === 'extreme');
        const lifestyle = products.filter(p => p.universe === 'lifestyle');

        const mixed: Product[] = [];
        const maxLength = Math.max(wellness.length, extreme.length, lifestyle.length);

        for (let i = 0; i < maxLength; i++) {
            if (i < wellness.length) mixed.push(wellness[i]);
            if (i < extreme.length) mixed.push(extreme[i]);
            if (i < lifestyle.length) mixed.push(lifestyle[i]);
        }
        
        // S'assurer qu'absolument aucun produit n'est perdu (bien que `maxLength` devrait suffire, 
        // une erreur de logique de maxLength n'est pas exclue s'il y a des doublons ou autres.
        // En réalité ce code avec maxLength est safe s'il va jusqu'au max, MAIS les index 
        // i < wellness.length garantissent déjà qu'on prend tout.
        
        return mixed;
    };

    const filteredProducts = ALL_PRODUCTS.filter(p => filterProduct(p));
    const mixedProducts = getMixedProducts(filteredProducts);
    const visibleProducts = mixedProducts.slice(0, visibleCount);
    
    const isExtremeTheme = currentUniverse === 'extreme';
    const bgClass = isExtremeTheme ? 'bg-gardenz-black' : 'bg-gardenz-white';
    const textClass = isExtremeTheme ? 'text-white' : 'text-gardenz-dark';

    const pageTitle = currentUniverse === 'wellness' ? 'Boutique Bien-être CBD | Gardenz' :
                      currentUniverse === 'extreme' ? 'eXtreme Lab : Résines & Concentrés | Gardenz' :
                      currentUniverse === 'lifestyle' ? 'Lifestyle & Accessoires | Gardenz' :
                      'Boutique Officielle | Gardenz';
    const pageDescription = "Découvrez notre catalogue complet. Fleurs, Résines, Vape, Huiles CBD et exclusivités eXtreme Lab.";

    // Détermination de la couleur néon pour les éléments de l'UI (Barre latérale etc.)
    const extremeAccentColorClass = (() => {
        if (currentIntensity === 'Medium') return 'border-[#FF9F1C] text-[#FF9F1C]';
        if (currentIntensity === 'Hardcore') return 'border-gardenz-magenta text-gardenz-magenta';
        return 'border-gardenz-cyan text-gardenz-cyan';
    })();

    const getCategoryIcon = (cat: string) => {
        switch (cat) {
            case 'Tout': return <LayoutGrid size={18} />;
            case 'Fleurs': return <Flower size={18} />;
            case 'Huiles': return <Droplet size={18} />;
            case 'Comestibles': return <Utensils size={18} />;
            case 'Vape': return <Wind size={18} />;
            case 'Résines': return <Layers size={18} />;
            case 'Concentrés': return <Gem size={18} />;
            case 'Vêtements': return <Shirt size={18} />;
            case 'Accessoires': return <FlaskConical size={18} />;
            case 'Livres': return <BookOpen size={18} />;
            case 'Musique': return <Music size={18} />;
            case 'Cosmétique': return <Sparkles size={18} />;
            case 'Gélules': return <Pill size={18} />;
            case 'Boissons': return <CupSoda size={18} />;
            case 'Bien-être': return <HeartHandshake size={18} />;
            default: return <Circle size={10} />;
        }
    };

    const getUsageIcon = (usage: string) => {
        switch (usage) {
            case 'All': return <LayoutGrid size={16} />;
            case 'Relaxation': return <Wind size={16} />;
            case 'Sommeil': return <Moon size={16} />;
            case 'Stress': return <BrainCircuit size={16} />;
            case 'Focus': return <Sun size={16} />;
            default: return <Circle size={10} />;
        }
    };

    const getUniverseCount = (uni: string) => {
        return ALL_PRODUCTS.filter(p => {
            if (uni !== 'All' && p.universe !== uni) return false;
            if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
            return true;
        }).length;
    };

    const getFilterCount = (type: 'category' | 'usage' | 'intensity', value: string) => {
        const overrides: any = { [type]: value };
        // Reset cross-universe filters based on what is clicked, mimicking the onClick handlers
        if (type === 'intensity') {
            overrides.molecule = 'All';
            if (currentUniverse === 'All') overrides.usage = 'All';
        } else if (type === 'usage') {
            if (currentUniverse === 'All') {
                overrides.intensity = 'All';
                overrides.molecule = 'All';
            }
        }
        return ALL_PRODUCTS.filter(p => filterProduct(p, overrides)).length;
    };

    const getMoleculeCount = (mol: string) => {
        return ALL_PRODUCTS.filter(p => filterProduct(p, { molecule: mol })).length;
    };

    const breadcrumbItems = [];
    if (currentUniverse !== 'All') {
        breadcrumbItems.push({ label: 'Boutique', path: '/boutique' });
        breadcrumbItems.push({
            label: currentUniverse === 'wellness' ? 'Bien-être' : currentUniverse === 'extreme' ? 'eXtreme Lab' : 'LifeStyle',
            path: `/boutique?filter=${currentUniverse}`
        });
    } else {
        breadcrumbItems.push({ label: 'Tous les produits', path: '/boutique' });
    }

    if (currentUsage !== 'All') {
        breadcrumbItems.push({
            label: currentUsage,
            path: `/boutique?filter=${currentUniverse}&usage=${currentUsage}`
        });
    }

    if (currentIntensity !== 'All') {
        breadcrumbItems.push({
            label: currentIntensity,
            path: `/boutique?filter=${currentUniverse}&intensity=${currentIntensity}`
        });
        if (currentMolecule !== 'All') {
            breadcrumbItems.push({
                label: currentMolecule,
                path: `/boutique?filter=${currentUniverse}&intensity=${currentIntensity}&molecule=${currentMolecule}`
            });
        }
    }

    if (currentCategory !== 'All' && currentCategory !== 'Tout') {
        breadcrumbItems.push({
            label: currentCategory,
            path: `/boutique?filter=${currentUniverse}&category=${encodeURIComponent(currentCategory)}`
        });
    }

    const renderUsageFilter = () => (
        <div>
            <h3 className={`font-bold uppercase tracking-widest text-xs mb-4 ${isExtremeTheme ? 'text-gray-500' : 'text-gray-400'}`}>Usage</h3>
            <div className="space-y-1">
                {['All', 'Relaxation', 'Sommeil', 'Stress', 'Focus'].map(u => {
                    const count = getFilterCount('usage', u);
                    const isActive = currentUsage === u;
                    return (
                        <button key={u} onClick={() => handleUsageClick(u)} className={`w-full flex justify-between items-center text-sm py-2 px-3 rounded-lg transition-colors ${isActive ? 'text-gardenz-green font-bold bg-gardenz-green/10' : (isExtremeTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gardenz-dark')}`}>
                            <div className="flex items-center gap-3">{getUsageIcon(u)}<span>{u === 'All' ? 'Tous les besoins' : u}</span></div>
                            <span className="text-xs opacity-50">{count}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const renderIntensityFilter = () => (
        <div>
            <h3 className={`font-bold uppercase tracking-widest text-xs mb-4 ${isExtremeTheme ? 'text-gray-500' : 'text-gray-400'}`}>Intensité</h3>
            <div className="space-y-2">
                {['All', 'Soft', 'Medium', 'Hardcore'].map(i => {
                    const count = getFilterCount('intensity', i);
                    const isActive = currentIntensity === i;
                    let buttonStyle = '';
                    const inactiveText = isExtremeTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gardenz-dark';
                    if (i === 'All') buttonStyle = isActive ? (isExtremeTheme ? 'bg-white/10 text-white font-bold border border-white/30' : 'bg-gray-100 text-gardenz-dark font-bold border border-gray-300') : `border border-transparent ${inactiveText}`;
                    else if (i === 'Soft') buttonStyle = isActive ? 'bg-gardenz-cyan/10 text-gardenz-cyan font-bold border border-gardenz-cyan' : `border border-gardenz-cyan/30 hover:border-gardenz-cyan ${inactiveText}`;
                    else if (i === 'Medium') buttonStyle = isActive ? 'bg-[#FF9F1C]/10 text-[#FF9F1C] font-bold border border-[#FF9F1C]' : `border border-[#FF9F1C]/30 hover:border-[#FF9F1C] ${inactiveText}`;
                    else if (i === 'Hardcore') buttonStyle = isActive ? 'bg-gardenz-magenta/10 text-gardenz-magenta font-bold border border-gardenz-magenta' : `border border-gardenz-magenta/30 hover:border-gardenz-magenta ${inactiveText}`;
                    const molecules = MOLECULES_BY_INTENSITY[i] || [];
                    const showMolecules = isActive && i !== 'All';
                    return (
                        <div key={i}>
                            <button onClick={() => handleIntensityClick(i)} className={`w-full flex justify-between items-center text-sm py-2 px-3 rounded-lg transition-all ${buttonStyle} ${showMolecules ? 'mb-2' : ''}`}>
                                <span className="flex items-center gap-2">{i === 'All' ? 'Toutes intensités' : i}{isActive && i !== 'All' && <ArrowDown size={14} />}</span>
                                <span className="text-xs opacity-50">{count}</span>
                            </button>
                            {showMolecules && (
                                <div className="pl-4 pr-1 pb-2 space-y-1 border-l-2 border-white/10 ml-3 animate-fade-in">
                                    {molecules.map(mol => {
                                        const molCount = getMoleculeCount(mol);
                                        const isMolActive = currentMolecule === mol;
                                        return (
                                            <button key={mol} onClick={() => handleMoleculeClick(mol)} className={`w-full flex justify-between items-center text-xs py-1.5 px-2 rounded transition-colors ${isMolActive ? (isExtremeTheme ? 'bg-white/20 text-white font-bold' : 'bg-gardenz-green/15 text-gardenz-dark font-bold') : (isExtremeTheme ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gardenz-dark hover:bg-gardenz-green/10')}`}>
                                                <span>{mol}</span><span className="opacity-50">{molCount}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderQualityFilter = () => (
        <div>
            <h3 className={`font-bold uppercase tracking-widest text-xs mb-4 ${isExtremeTheme ? 'text-gray-500' : 'text-gray-400'}`}>Qualité</h3>
            <div className="space-y-3">
                {currentUniverse !== 'lifestyle' && (
                    <>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${currentQualityFilters.labTested ? 'bg-gardenz-green border-gardenz-green text-white' : 'border-gray-400'}`}>{currentQualityFilters.labTested && <ArrowDown size={14} className="rotate-180" />}</div>
                            <input type="checkbox" className="hidden" checked={currentQualityFilters.labTested} onChange={() => onQualityFilterChange('labTested', !currentQualityFilters.labTested)} />
                            <span className={`text-sm flex items-center gap-2 ${isExtremeTheme ? 'text-gray-300' : 'text-gray-600'}`}><FlaskConical size={14} /> Testé Labo</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${currentQualityFilters.fullSpectrum ? 'bg-gardenz-green border-gardenz-green text-white' : 'border-gray-400'}`}>{currentQualityFilters.fullSpectrum && <ArrowDown size={14} className="rotate-180" />}</div>
                            <input type="checkbox" className="hidden" checked={currentQualityFilters.fullSpectrum} onChange={() => onQualityFilterChange('fullSpectrum', !currentQualityFilters.fullSpectrum)} />
                            <span className={`text-sm flex items-center gap-2 ${isExtremeTheme ? 'text-gray-300' : 'text-gray-600'}`}><Sprout size={14} /> Full Spectrum</span>
                        </label>
                    </>
                )}
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${currentQualityFilters.premium ? 'bg-gardenz-green border-gardenz-green text-white' : 'border-gray-400'}`}>{currentQualityFilters.premium && <ArrowDown size={14} className="rotate-180" />}</div>
                    <input type="checkbox" className="hidden" checked={currentQualityFilters.premium} onChange={() => onQualityFilterChange('premium', !currentQualityFilters.premium)} />
                    <span className={`text-sm flex items-center gap-2 ${isExtremeTheme ? 'text-gray-300' : 'text-gray-600'}`}><Award size={14} /> Premium (+60€)</span>
                </label>
            </div>
        </div>
    );

    const renderCategoriesFilter = () => (
        <div>
            <h3 className={`font-bold uppercase tracking-widest text-xs mb-4 ${isExtremeTheme ? 'text-gray-500' : 'text-gray-400'}`}>Catégories</h3>
            <div className="space-y-1">
                {categories.map(cat => {
                    const count = getFilterCount('category', cat);
                    if (count === 0 && cat !== 'Tout') return null;
                    const isActive = currentCategory === cat || (cat === 'Tout' && currentCategory === 'All');
                    return (
                        <button key={cat} onClick={() => onFilterChange({ category: cat === 'Tout' ? 'All' : cat })} className={`w-full flex justify-between items-center text-sm py-2 px-3 rounded-lg transition-colors ${isActive ? (isExtremeTheme ? 'text-gardenz-cyan font-bold bg-gardenz-cyan/10' : 'text-gardenz-green font-bold bg-gardenz-green/10') : (isExtremeTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gardenz-dark')}`}>
                            <div className="flex items-center gap-3">{getCategoryIcon(cat)}<span>{cat}</span></div>
                            <span className={`text-xs opacity-50`}>{count}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen pt-24 pb-20 ${bgClass} transition-colors duration-500`}>
            <SEOHead title={pageTitle} description={pageDescription} />
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <Breadcrumbs items={breadcrumbItems} theme={isExtremeTheme ? 'dark' : 'light'} />
                <h1 className={`font-display text-4xl md:text-6xl font-bold mb-4 ${textClass}`}>LA <span className={currentUniverse === 'extreme' ? 'text-gardenz-cyan' : 'text-gardenz-green'}>BOUTIQUE</span></h1>
                <p className={`${isExtremeTheme ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
                    {currentUniverse === 'All' ? "Tout l'univers Gardenz réuni au même endroit." :
                     currentUniverse === 'wellness' ? "Tout l'univers Bien-être réuni au même endroit." :
                     currentUniverse === 'extreme' ? "Tout l'univers eXtreme Lab réuni au même endroit." :
                     currentUniverse === 'lifestyle' ? "Tout l'univers Lifestyle réuni au même endroit." :
                     "Tout l'univers Gardenz réuni au même endroit."}
                </p>
            </div>
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 relative items-start">
                <div className="lg:hidden mb-4 w-full">
                    <button onClick={() => setIsMobileFilterOpen(true)} className={`w-full py-3 px-4 rounded-lg flex items-center justify-between font-bold border ${isExtremeTheme ? 'bg-[#222] border-gray-700 text-white' : 'bg-white border-gray-200 text-gardenz-dark'}`}>
                        <span>Filtres</span><Filter size={18} />
                    </button>
                </div>
                <aside className={`fixed inset-0 z-[200] lg:sticky lg:top-28 lg:z-30 lg:w-1/4 lg:flex lg:flex-col lg:h-[calc(100vh-8rem)] ${isMobileFilterOpen ? 'flex flex-col' : 'hidden'} ${isExtremeTheme ? 'bg-gardenz-black lg:bg-transparent' : 'bg-white lg:bg-transparent'} backdrop-blur-xl lg:backdrop-blur-none lg:p-0 overflow-hidden`}>
                    {/* En-tête mobile */}
                    <div className="flex justify-between items-center lg:hidden px-6 pt-6 pb-4 border-b border-gray-200/10 shrink-0">
                        <h2 className={`font-display text-2xl font-bold ${textClass}`}>Filtres</h2>
                        <button onClick={() => setIsMobileFilterOpen(false)} className={`text-xs font-bold uppercase tracking-widest underline ${isExtremeTheme ? 'text-gray-400' : 'text-gray-500'}`}>Annuler</button>
                    </div>
                    {/* Contenu scrollable */}
                    <div className="flex-1 overflow-y-auto p-6 lg:p-0 space-y-8 pb-4 lg:pb-10 lg:pr-6">
                        <div>
                            <h3 className={`font-bold uppercase tracking-widest text-xs mb-4 ${isExtremeTheme ? 'text-gray-500' : 'text-gray-400'}`}>Univers</h3>
                            <div className="space-y-2">{['All', 'wellness', 'extreme', 'lifestyle'].map(uni => { const label = uni === 'All' ? 'Tous les Univers' : uni === 'wellness' ? 'Bien-être' : uni === 'extreme' ? 'eXtreme Lab' : 'LifeStyle'; const count = getUniverseCount(uni); const isActive = currentUniverse === uni; return (<button key={uni} onClick={() => onFilterChange({ universe: uni, category: 'All', usage: 'All', intensity: 'All', molecule: 'All' })} className={`w-full flex justify-between items-center text-sm py-2 px-3 rounded-lg transition-colors ${isActive ? (isExtremeTheme ? 'bg-white/10 text-white font-bold' : 'bg-gardenz-dark text-white font-bold') : (isExtremeTheme ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gardenz-dark')}`}><span>{label}</span><span className={`text-xs ${isActive ? 'opacity-100' : 'opacity-50'}`}>{count}</span></button>); })}</div>
                        </div>
                        {currentUniverse === 'All' ? (<>{renderQualityFilter()}{renderUsageFilter()}{renderIntensityFilter()}{renderCategoriesFilter()}</>) : currentUniverse === 'wellness' ? (<>{renderQualityFilter()}{renderUsageFilter()}{renderCategoriesFilter()}</>) : currentUniverse === 'extreme' ? (<>{renderQualityFilter()}{renderIntensityFilter()}{renderCategoriesFilter()}</>) : (<>{renderCategoriesFilter()}{renderQualityFilter()}</>)}
                        <div><h3 className={`font-bold uppercase tracking-widest text-xs mb-4 ${isExtremeTheme ? 'text-gray-500' : 'text-gray-400'}`}>Prix</h3><div className="flex items-center gap-4 text-sm font-bold"><span className={textClass}>{priceRange[0]}€</span><input type="range" min="0" max="400" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="flex-grow h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer" /><span className={textClass}>{priceRange[1]}€</span></div></div>
                    </div>

                    {/* CTA sticky — mobile uniquement */}
                    <div className="lg:hidden shrink-0 px-6 py-4 border-t border-gray-200/10">
                        <button
                            onClick={() => setIsMobileFilterOpen(false)}
                            className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
                                isExtremeTheme
                                    ? 'bg-gardenz-cyan text-black'
                                    : 'bg-gardenz-green text-white hover:bg-gardenz-dark'
                            }`}
                        >
                            <CheckCircle size={18} />
                            Voir les {filteredProducts.length} résultats
                        </button>
                    </div>
                </aside>
                <div className="flex-1 w-full">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {currentCategory !== 'All' && currentCategory !== 'Tout' && (<button onClick={() => onFilterChange({ category: 'All' })} className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border ${isExtremeTheme ? 'border-white text-white' : 'border-gardenz-green text-gardenz-green'}`}>{currentCategory} <X size={12} /></button>)}
                        {currentUsage !== 'All' && (<button onClick={() => onFilterChange({ usage: 'All' })} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-gardenz-green text-gardenz-green">{currentUsage} <X size={12} /></button>)}
                        {currentIntensity !== 'All' && (<button onClick={() => onFilterChange({ intensity: 'All' })} className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border ${isExtremeTheme ? 'border-white text-white' : 'border-gardenz-green text-gardenz-green'}`}>{currentIntensity} <X size={12} /></button>)}
                        {currentMolecule !== 'All' && (<button onClick={() => onFilterChange({ molecule: 'All' })} className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border ${isExtremeTheme ? 'border-white text-white' : 'border-gray-500 text-gray-600'}`}>{currentMolecule} <X size={12} /></button>)}
                    </div>
                    {filteredProducts.length === 0 ? (<div className={`text-center py-20 border-2 border-dashed rounded-3xl ${isExtremeTheme ? 'border-gray-800' : 'border-gray-200'}`}><p className="text-gray-500 mb-4">Aucun produit ne correspond à vos filtres.</p><button onClick={() => { onFilterChange({ category: 'All', usage: 'All', intensity: 'All', molecule: 'All' }); setPriceRange([0, 400]); }} className={`font-bold underline ${isExtremeTheme ? 'text-white' : 'text-gardenz-dark'}`}>Réinitialiser les filtres</button></div>) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {visibleProducts.map(product => (
                                    <ProductCard key={product.id} product={product} onProductClick={onProductClick} onQuickView={onQuickView} showUniverseBadge={currentUniverse === 'All'} />
                                ))}
                            </div>
                            {visibleProducts.length < filteredProducts.length && (
                                <div className="mt-16 text-center flex flex-col items-center animate-fade-in"><span className={`text-sm font-medium mb-4 ${isExtremeTheme ? 'text-gray-400' : 'text-gray-500'}`}>Affichage de {visibleProducts.length} sur {filteredProducts.length} produits</span><div className={`w-64 h-1 rounded-full mb-8 ${isExtremeTheme ? 'bg-gray-800' : 'bg-gray-200'}`}><div className={`h-full rounded-full transition-all duration-500 ${isExtremeTheme ? 'bg-gardenz-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]' : 'bg-gardenz-green'}`} style={{ width: `${(visibleProducts.length / filteredProducts.length) * 100}%` }}></div></div><button onClick={handleLoadMore} className={`px-10 py-4 rounded-full font-display font-bold uppercase tracking-widest transition-all transform hover:-translate-y-1 shadow-lg ${isExtremeTheme ? 'bg-transparent border-2 border-gardenz-cyan text-white hover:bg-gardenz-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]' : currentUniverse === 'lifestyle' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gardenz-dark text-white hover:bg-gardenz-green'}`}>Charger plus de produits</button></div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
