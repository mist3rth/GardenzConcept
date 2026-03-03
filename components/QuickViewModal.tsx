import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, Check, ArrowRight, Zap, Droplet, Ruler, Clock, AlertTriangle, ShieldCheck, Wind, FlaskConical, Play, Music, Eye, HelpCircle, Flame, Gift, Award, Sprout, Heart, Leaf, Truck, Gauge, Volume2, VolumeX } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { StockNotification } from './StockNotification';
import { useNavigate, Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ isOpen, onClose, product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [selectedConcentration, setSelectedConcentration] = useState('10%');
    const [selectedExtremeConc, setSelectedExtremeConc] = useState('20%');
    const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('image');
    const [activeImage, setActiveImage] = useState<string>('');
    const [isMuted, setIsMuted] = useState(true);
    const [selectedTierIndex, setSelectedTierIndex] = useState(0);

    const concentrations = ['5%', '10%', '20%', '30%'];
    const extremeConcentrations = ['20%', '40%', '60%', '90%'];

    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            setIsAdded(false);
            setSelectedConcentration('10%');
            setSelectedExtremeConc('20%');
            setActiveMedia('image');
            setActiveImage(product.image);
            setIsMuted(true);
            setSelectedTierIndex(0);

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, product, onClose]);

    if (!isOpen || !product) return null;

    const isExtreme = product.universe === 'extreme';
    const isWellness = product.universe === 'wellness';
    const isLifestyle = product.universe === 'lifestyle';

    // Wellness uses a light theme, Extreme and Lifestyle use dark
    const isDarkTheme = !isWellness;

    const isOutOfStock = product.stock === 0;
    const isLowStock = !isOutOfStock && product.stock && product.stock <= 5;

    const getUnitPrice = () => {
        if (product.category === 'Fleurs' && product.tieredPrices && product.tieredPrices.length > 0) {
            return product.tieredPrices[selectedTierIndex].price;
        }
        let price = product.price;
        if (isWellness && product.category.includes('Huiles')) {
            if (selectedConcentration === '10%') price += 10;
            if (selectedConcentration === '20%') price += 25;
            if (selectedConcentration === '30%') price += 40;
        }
        if (isExtreme && ['Concentrés', 'Huiles', 'Vape', 'Résines'].some(c => product.category.includes(c))) {
            if (selectedExtremeConc === '40%') price += 15;
            if (selectedExtremeConc === '60%') price += 30;
            if (selectedExtremeConc === '90%') price += 50;
        }
        return price;
    };

    const unitPrice = getUnitPrice();
    const totalPrice = unitPrice * quantity;

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        let name = product.name;
        if (isWellness && product.category.includes('Huiles')) name += ` - ${selectedConcentration}`;
        if (isExtreme && !product.category.includes('Fleurs')) name += ` - ${selectedExtremeConc}`;
        if (product.category === 'Fleurs' && product.tieredPrices && product.tieredPrices[selectedTierIndex]) {
            const tier = product.tieredPrices[selectedTierIndex];
            name += ` - ${tier.amount}${tier.unit}`;
        }
        addToCart({ ...product, price: unitPrice, name }, quantity);
        setIsAdded(true);
        setTimeout(() => { setIsAdded(false); onClose(); }, 1500);
    };


    // Couleurs d'accentuation par univers
    const accentColor = isDarkTheme 
        ? (isExtreme ? 'text-gardenz-cyan' : 'text-indigo-400')
        : 'text-gardenz-green';

    const textMain = isDarkTheme ? 'text-white' : 'text-gardenz-dark';
    const textSub = isDarkTheme ? 'text-gray-300' : 'text-gray-600';
    const borderClass = isDarkTheme ? 'border-white/10' : 'border-gray-200/50';

    // Wellness uses a consolidated light background (gray-50)
    const modalBg = isWellness ? 'bg-gray-50' : isExtreme ? 'bg-[#0A0A0A]' : 'bg-[#0F0F0F]';
    const sideBg = isWellness ? 'bg-gray-50' : isExtreme ? 'bg-[#111]' : 'bg-[#111]';

    const getIntensityNeonColor = () => {
        if (!isExtreme) return isWellness ? 'text-gardenz-green' : 'text-indigo-400';
        if (product.intensity === 'Soft') return 'text-gardenz-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]';
        if (product.intensity === 'Medium') return 'text-[#FF9F1C] drop-shadow-[0_0_8px_rgba(255,159,28,0.5)]';
        if (product.intensity === 'Hardcore') return 'text-gardenz-magenta drop-shadow-[0_0_8px_rgba(255,0,255,0.5)]';
        return 'text-gardenz-cyan';
    };

    const neonColorClass = getIntensityNeonColor();

    const btnPrimary = isExtreme
        ? 'border-2 border-gardenz-magenta bg-transparent text-white hover:bg-gardenz-magenta hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]'
        : isLifestyle
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md'
            : 'bg-gardenz-green text-white hover:bg-gardenz-terra shadow-md';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div 
                className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
                onClick={onClose}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose(); }}
                role="button"
                tabIndex={-1}
                aria-label="Fermer la modale"
            ></div>

            <div className={`relative w-full max-w-4xl max-h-[95vh] overflow-y-auto md:overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row animate-scale-up ${modalBg} border ${borderClass}`}>

                <button onClick={onClose} aria-label="Fermer l'aperçu" className={`absolute top-4 right-4 z-50 p-3 md:p-1.5 rounded-full transition-colors ${isDarkTheme ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-gray-200 text-gray-400 hover:text-gardenz-dark'}`}>
                    <X size={24} />
                </button>

                {/* Image column — order-2 on mobile: comes AFTER the transactional block */}
                <div className={`md:w-[42%] flex flex-col md:h-full md:overflow-y-auto order-2 md:order-1 ${sideBg} ${isWellness ? 'border-t md:border-t-0 md:border-r border-gray-200/50' : 'border-t md:border-t-0 md:border-r border-white/5'}`}>
                    <div className="relative aspect-video overflow-hidden">
                        {activeMedia === 'image' ? (
                            <img src={getAssetUrl(activeImage || product.image)} alt={product.name} className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale opacity-70' : ''}`} />
                        ) : (
                            <video
                                src={getAssetUrl(product.video || '/medias/video.mp4')}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted={isMuted}
                                loop
                                playsInline
                            />
                        )}
                        {product.isHot && (
                            <div className="absolute top-3 left-3 bg-[#DC2626] text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg animate-pulse">
                                Top Vente
                            </div>
                        )}
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[8px] font-bold px-2 py-1.5 rounded flex items-center gap-1.5 uppercase tracking-wider border border-white/10">
                            <ShieldCheck size={10} className="text-gardenz-green" />
                            Analyses Labo disponibles
                        </div>
                        {activeMedia === 'video' && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsMuted(!isMuted);
                                    }}
                                    className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-colors z-20"
                                    title={isMuted ? "Activer le son" : "Désactiver le son"}
                                >
                                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                </button>
                                <button
                                    onClick={() => setActiveMedia('image')}
                                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors z-20"
                                    title="Retour à l'image"
                                >
                                    <X size={12} />
                                </button>
                            </>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-4">
                        {/* Thumbnail 1: Default Image */}
                        <button
                            onClick={() => {
                                setActiveMedia('image');
                                setActiveImage(product.image);
                            }}
                            className={`relative group overflow-hidden rounded-lg aspect-square border ${borderClass} ${isDarkTheme ? 'bg-zinc-900/50' : 'bg-white'} ${activeMedia === 'image' && activeImage === product.image ? 'ring-2 ring-gardenz-green' : ''}`}
                        >
                                <img src={getAssetUrl(product.image)} className="w-full h-full object-cover transition-opacity" alt="Main" />
                        </button>

                        {/* Thumbnail 2: Other Product Image */}
                        <button
                            onClick={() => {
                                setActiveMedia('image');
                                const otherImages = product.images?.filter(img => img !== product.image) || [];
                                // Fallback images if the product doesn't have multiple images
                                const defaultSecondary = isWellness 
                                    ? getAssetUrl('/images/products/bien_etre/serum-cbd-visage.webp')
                                    : getAssetUrl('/images/products/extreme_lab/resine-thch-dark.webp');
                                const secondImage = otherImages.length > 0 ? otherImages[0] : defaultSecondary;
                                setActiveImage(secondImage);
                            }}
                            className={`relative group overflow-hidden rounded-lg aspect-square border ${borderClass} ${isDarkTheme ? 'bg-zinc-900/50' : 'bg-white'} ${activeMedia === 'image' && activeImage !== product.image ? 'ring-2 ring-gardenz-green' : ''}`}
                        >
                            <img 
                                src={(product.images?.filter(img => img !== product.image) || [])[0] || (isWellness ? getAssetUrl('/images/products/bien_etre/serum-cbd-visage.webp') : getAssetUrl('/images/products/extreme_lab/resine-thch-dark.webp'))} 
                                className={`w-full h-full object-cover transition-opacity ${(!product.images || product.images.length <= 1) ? 'opacity-40 grayscale' : 'opacity-70 group-hover:opacity-100'}`} 
                                alt="Secondary view" 
                            />
                        </button>

                        {/* Thumbnail 3: Video */}
                        <button
                            onClick={() => setActiveMedia('video')}
                            className={`relative group overflow-hidden rounded-lg aspect-square border ${borderClass} ${isDarkTheme ? 'bg-zinc-900/50' : 'bg-white'} ${activeMedia === 'video' ? 'ring-2 ring-gardenz-green' : ''}`}
                        >
                            <video 
                                src={getAssetUrl(product.video || '/medias/video.mp4')} 
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                                muted
                                playsInline
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${isLifestyle ? 'bg-indigo-500' : 'bg-gardenz-green'}`}>
                                    <Play size={10} fill="currentColor" />
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className="px-4 pb-4 mt-1">
                        <h4 className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2 ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                            <HelpCircle size={12} className={accentColor} /> Questions Fréquentes
                        </h4>
                        <div className="space-y-3">
                            <div>
                                <p className={`text-[10px] font-bold ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Q: Quelle sensation vais-je ressentir ?</p>
                                <p className={`text-[10px] italic leading-snug ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>R: Immersion sensorielle profonde et effet intense immédiat.</p>
                            </div>
                            <div>
                                <p className={`text-[10px] font-bold ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Q: Est-ce vraiment légal ?</p>
                                <p className={`text-[10px] italic leading-snug ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>R: Oui, le {product.molecule?.toLowerCase() || 'cbd'} est 100% légal, testé en labo français et traçable.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactional column — order-1 on mobile: comes FIRST */}
                <div className="md:w-[58%] p-6 md:p-10 flex flex-col justify-start order-1 md:order-2 md:h-full md:overflow-y-auto">
                    {/* Fil d'Ariane avec 20px (pt-5) de marge top */}
                    <div className={`pt-5 mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] ${neonColorClass}`}>
                        <Link
                            to={`/boutique?filter=${product.universe}&${isWellness ? 'usage' : 'intensity'}=${isWellness ? (product.tags[0] || 'All') : (product.intensity || 'Lifestyle')}`}
                            onClick={onClose}
                            className="hover:opacity-80 transition-opacity"
                        >
                            {isWellness ? (product.tags[0] || 'Général') : (product.intensity || 'Lifestyle')}
                        </Link>

                        <span className="opacity-40">•</span>

                        <Link 
                            to={`/boutique?filter=${product.universe}&${product.intensity ? `intensity=${product.intensity}&` : isWellness ? `usage=${product.tags[0] || 'All'}&` : ''}category=${product.category}`}
                            onClick={onClose}
                            className="hover:opacity-80 transition-opacity"
                        >
                            {product.category}
                        </Link>

                        {product.molecule && (
                            <>
                                <span className="opacity-40">•</span>
                                <Link 
                                    to={`/boutique?filter=${product.universe}&${product.intensity ? `intensity=${product.intensity}&` : isWellness ? `usage=${product.tags[0] || 'All'}&` : ''}category=${product.category}&molecule=${product.molecule}`}
                                    onClick={onClose}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    {product.molecule}
                                </Link>
                            </>
                        )}
                    </div>

                    <h2 id="modal-title" className={`font-display text-xl font-bold mb-1 leading-tight flex items-start gap-3 ${textMain}`}>
                        {product.origin && (() => {
                            const flagMap: Record<string, string> = {
                                france: getAssetUrl('/images/flags/hl-flag.webp'),
                                usa: getAssetUrl('/images/flags/usa-flag.webp'),
                                italy: getAssetUrl('/images/flags/it-flag.webp'),
                                spain: getAssetUrl('/images/flags/es-flag.webp'),
                                switzerland: getAssetUrl('/images/flags/ch-flag.webp'),
                                holland: getAssetUrl('/images/flags/hl-flag.webp'),
                            };
                            const flagSrc = flagMap[product.origin] || null;
                            return flagSrc ? (
                                <div className="shrink-0 pt-1.5" title={`Origine: ${product.origin.toUpperCase()}`}>
                                    <img 
                                        src={flagSrc}
                                        alt={product.origin}
                                        className="w-7 h-5 object-cover rounded-sm shadow-sm border border-black/5"
                                    />
                                </div>
                            ) : null;
                        })()}
                        {product.name}
                    </h2>

                    {isLowStock && (
                        <div className="text-[#DC2626] font-bold text-[10px] mb-2 flex items-center gap-1.5 animate-pulse">
                            <AlertTriangle size={12} /> Plus que 5 en stock
                        </div>
                    )}

                    <div className="flex items-center gap-4 mb-2">
                        <span className={`text-xl font-bold transition-all duration-300 ${textMain}`}>{totalPrice.toFixed(2)}€</span>
                        <div className="flex items-center gap-1 text-yellow-400 text-[10px]">
                            <Star size={14} fill="currentColor" />
                            <span className={`font-medium ml-1 ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>4.9 (128 avis)</span>
                        </div>
                    </div>

                    {/* INFOS ESSENTIELLES (Contenance / Concentration / Gélules spécifique) */}
                    <div className={`grid ${product.category === 'Gélules' ? 'grid-cols-3' : 'grid-cols-2'} gap-3 mb-4 py-3 border-y ${borderClass}`}>
                        <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${isDarkTheme ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                <Droplet size={14} className={accentColor} />
                            </div>
                            <div>
                                <p className="text-[8px] font-bold uppercase text-gray-400 tracking-wider">
                                    {product.category === 'Gélules' ? 'Dose' : 
                                     product.category === 'Fleurs' || product.category === 'Résines' ? 'Poids' : 
                                     product.category === 'Comestibles' ? 'Quantité' : 'Contenance'}
                                </p>
                                <p className={`text-[10px] font-bold ${textMain}`}>{product.category === 'Gélules' ? product.concentrationDisplay : (product.capacity || (product.category.includes('Huiles') ? '10ml' : '-'))}</p>
                            </div>
                        </div>

                        {product.category === 'Gélules' && (
                            <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-lg ${isDarkTheme ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                    <Award size={14} className={accentColor} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-bold uppercase text-gray-400 tracking-wider">Boîte</p>
                                    <p className={`text-[10px] font-bold ${textMain}`}>{product.totalConcentration}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${isDarkTheme ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                <Gauge size={14} className={accentColor} />
                            </div>
                            <div>
                                <p className="text-[8px] font-bold uppercase text-gray-400 tracking-wider">
                                    {product.category === 'Gélules' ? 'Quantité' : 'Concentration'}
                                </p>
                                <p className={`text-[10px] font-bold ${textMain}`}>
                                    {product.category === 'Gélules' ? product.capacity : 
                                     product.category.includes('Huiles') ? (isWellness ? selectedConcentration : selectedExtremeConc) : 
                                     (product.concentrationDisplay || product.molecule || 'Standard')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                            <Wind size={16} className={`${accentColor} shrink-0 mt-0.5`} />
                            <p className={`text-[12px] leading-relaxed ${textSub}`}>
                                <strong className={`${textMain} uppercase tracking-wider`}>VIBE :</strong> {product.vibe || 'Immersion sensorielle profonde et effet intense immédiat.'}
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <FlaskConical size={16} className={`${accentColor} shrink-0 mt-0.5`} />
                            <p className={`text-[12px] leading-relaxed ${textSub}`}>
                                <strong className={`${textMain} uppercase tracking-wider`}>PROFIL :</strong> {product.profil || `Haute concentration en molécules actives (${product.molecule || 'CBD'}) sélectionnées pour leur pureté.`}
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Droplet size={16} className={`${accentColor} shrink-0 mt-0.5`} />
                            <p className={`text-[12px] leading-relaxed ${textSub}`}>
                                <strong className={`${textMain} uppercase tracking-wider`}>GOÛT :</strong> {product.gout || 'Profil terpénique équilibré, notes herbacées douces et boisées.'}
                            </p>
                        </div>
                    </div>

                    {isOutOfStock ? (
                        <div className="mt-4">
                            <StockNotification productName={product.name} variant={isDarkTheme ? 'dark' : 'light'} />
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* WELLNESS: VARIANT SELECTOR */}
                            {isWellness && product.category.includes('Huiles') && !isOutOfStock && (
                                <div>
                                    <label className="text-xs font-bold text-gardenz-dark uppercase tracking-widest mb-2 block">Concentration</label>
                                    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                                        {concentrations.map(conc => (
                                            <button
                                                key={conc}
                                                onClick={() => setSelectedConcentration(conc)}
                                                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-all
                                                ${selectedConcentration === conc
                                                        ? 'bg-gardenz-green text-white border-gardenz-green ring-2 ring-offset-1 ring-gardenz-green/30'
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gardenz-green'
                                                    }
                                            `}
                                            >
                                                {conc}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* EXTREME: VARIANT SELECTOR */}
                            {isExtreme && product.category !== 'Fleurs' && ['Concentrés', 'Huiles', 'Vape', 'Résines', 'Comestibles'].some(c => product.category.includes(c)) && !isOutOfStock && (
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block flex items-center gap-2">
                                        <Zap size={14} className="text-gardenz-cyan" /> Concentration
                                    </label>
                                    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                                        {extremeConcentrations.map(conc => (
                                            <button
                                                key={conc}
                                                onClick={() => setSelectedExtremeConc(conc)}
                                                className={`shrink-0 px-4 py-1.5 rounded-lg font-bold text-xs border transition-all duration-300
                                                ${selectedExtremeConc === conc
                                                        ? 'text-black bg-gardenz-cyan border-gardenz-cyan shadow-[0_0_10px_rgba(0,255,255,0.4)]'
                                                        : 'bg-transparent text-gray-500 border-gray-700 hover:border-gardenz-cyan hover:text-white'
                                                    }
                                            `}
                                            >
                                                {conc}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* FLOWER: TIERED PRICING SELECTOR */}
                            {product.category === 'Fleurs' && product.tieredPrices && product.tieredPrices.length > 0 && !isOutOfStock && (
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Format</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {product.tieredPrices.map((tier, idx) => {
                                            const isSelected = selectedTierIndex === idx;
                                            const pricePerUnit = (tier.price / tier.amount).toFixed(2);
                                            
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedTierIndex(idx)}
                                                    className={`relative flex items-center justify-between p-2.5 sm:p-4 rounded-xl border-2 transition-all duration-300 group
                                                        ${isSelected 
                                                            ? (isExtreme ? 'border-gardenz-magenta bg-gardenz-magenta/10 shadow-[0_0_15px_rgba(255,0,255,0.2)] scale-[1.02]' : 'border-gardenz-green bg-gardenz-green/5 shadow-md scale-[1.02]') 
                                                            : (isExtreme ? 'border-white/5 bg-white/5 hover:border-white/20' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm')}
                                                    `}
                                                >
                                                    {/* Popular/Eco Badge */}
                                                    {tier.discountBadge && (
                                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm z-10 whitespace-nowrap uppercase">
                                                            {tier.discountBadge}
                                                        </div>
                                                    )}

                                                    {/* Left: Weight */}
                                                    <div className="flex items-center gap-2">
                                                        <div className={`text-base sm:text-xl font-black ${isSelected ? (isExtreme ? 'text-gardenz-magenta' : 'text-gardenz-green') : (isExtreme ? 'text-gray-700' : 'text-gray-300')}`}>
                                                            {tier.amount}
                                                        </div>
                                                        <div className={`h-8 w-[1px] ${isExtreme ? 'bg-white/10' : 'bg-gray-100'}`} />
                                                        <div className="text-left">
                                                            <div className={`text-sm font-bold ${isSelected ? (isExtreme ? 'text-white' : 'text-gardenz-dark') : (isExtreme ? 'text-gray-400' : 'text-gray-700')}`}>
                                                                {tier.price.toFixed(2)} €
                                                            </div>
                                                            <div className={`text-[9px] ${isExtreme ? 'text-gray-500' : 'text-gray-400'}`}>
                                                                soit {pricePerUnit} €/{tier.unit}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right: Circle Indicator or Discount */}
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors
                                                        ${isSelected 
                                                            ? (isExtreme ? 'bg-gardenz-magenta text-white' : 'bg-gardenz-green text-white') 
                                                            : (isExtreme ? 'bg-white/5 text-gray-500' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100')
                                                        }
                                                    `}>
                                                        {idx === 0 ? '-0%' : `-${Math.round((1 - (tier.price / (product.tieredPrices[0].price * (tier.amount / product.tieredPrices[0].amount))) ) * 100)}%`}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                                <div className={`flex items-center justify-between border rounded-lg ${borderClass} ${isDarkTheme ? 'bg-white/5' : 'bg-white'}`}>
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={`px-5 py-3 md:px-3 md:py-2 transition-colors font-bold text-lg md:text-sm hover:${accentColor} text-gray-400 select-none`} aria-label="Diminuer la quantité">-</button>
                                    <span className={`w-8 text-center font-bold text-sm md:text-xs ${textMain}`} aria-live="polite">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className={`px-5 py-3 md:px-3 md:py-2 transition-colors font-bold text-lg md:text-sm hover:${accentColor} text-gray-400 select-none`} aria-label="Augmenter la quantité">+</button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 rounded-lg font-bold uppercase tracking-[0.2em] text-[11px] py-3 flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${btnPrimary}`}
                                >
                                    {isAdded ? <Check size={18} /> : (
                                        <>
                                            <ShoppingCart size={16} />
                                            Ajouter<span className="hidden [@media(min-width:480px)]:inline"> au panier</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => { onClose(); navigate(`/produit/${product.id}`); }}
                            className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5 mx-auto group ${isDarkTheme ? 'text-gray-600' : 'text-gray-400'} hover:${accentColor}`}
                        >
                            Voir la fiche produit complète <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
