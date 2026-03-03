
import React, { useState, useRef } from 'react';
import { ShoppingBag, ShoppingCart, Check, Star, Flame, Zap, Droplet, FlaskConical, Award, Sprout, Clock, Gift, Heart, Eye, BellOff, Loader2, X } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
    product: Product;
    onProductClick: (id: string) => void;
    onQuickView?: (product: Product) => void;
    showUniverseBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, onQuickView, showUniverseBadge = true }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isNotified, setIsNotified] = useState(false);
    const [isNotifying, setIsNotifying] = useState(false);
    const [showEmailOverlay, setShowEmailOverlay] = useState(false);
    const [email, setEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const { addToCart } = useCart();
    const { isAuthenticated, userEmail } = useAuth();
    const cardRef = useRef<HTMLDivElement>(null);

    // Inline variant selection states
    const [showVariantOverlay, setShowVariantOverlay] = useState(false);
    const [selectedConcentration, setSelectedConcentration] = useState<string | null>(null);
    const [selectedExtremeConc, setSelectedExtremeConc] = useState<string | null>(null);
    const [selectedTierIndex, setSelectedTierIndex] = useState<number | null>(null);

    const isOutOfStock = product.stock === 0;
    const isExtreme = product.universe === 'extreme';
    const isWellness = product.universe === 'wellness';

    // Logic to determine if a product has variants
    const isFlower = product.category === 'Fleurs';
    const hasTieredPrices = isFlower && product.tieredPrices && product.tieredPrices.length > 0;
    const isWellnessOil = isWellness && product.category.includes('Huiles');
    const isExtremeVariants = isExtreme && !isFlower && ['Concentrés', 'Huiles', 'Vape', 'Résines', 'Comestibles'].some(c => product.category.includes(c));
    const hasVariants = hasTieredPrices || isWellnessOil || isExtremeVariants;

    // Dynamic price logic based on selection
    const getDisplayPrice = () => {
        if (!hasVariants) return { price: product.price.toFixed(2), isStartingPrice: false };
        let price = product.price;
        let isStartingPrice = true;
        if (hasTieredPrices && product.tieredPrices) {
            price = product.tieredPrices[0].price; // usually smallest format is fastest to parse or sorted
            if (selectedTierIndex !== null && product.tieredPrices[selectedTierIndex]) {
                price = product.tieredPrices[selectedTierIndex].price;
                isStartingPrice = false;
            }
        } else if (isWellnessOil) {
            if (selectedConcentration) {
                if (selectedConcentration === '10%') price += 10;
                if (selectedConcentration === '20%') price += 25;
                if (selectedConcentration === '30%') price += 40;
                isStartingPrice = false;
            }
        } else if (isExtremeVariants) {
            if (selectedExtremeConc) {
                if (selectedExtremeConc === '40%') price += 15;
                if (selectedExtremeConc === '60%') price += 30;
                if (selectedExtremeConc === '90%') price += 50;
                isStartingPrice = false;
            }
        }
        return { price: price.toFixed(2), isStartingPrice };
    };

    const { price: displayPrice, isStartingPrice } = getDisplayPrice();

    const handleCartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isOutOfStock) {
            handleNotify(e);
            return;
        }

        if (hasVariants) {
            if (!showVariantOverlay) {
                setShowVariantOverlay(true);
                setTimeout(() => {
                    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 50);
            }
            // If already open, do nothing when clicking the bag icon again
            return;
        }

        // Si pas de variantes (ou bizarrement déjà dans l'overlay), on ajoute le produit standard
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            addToCart(product, 1);
        }, 500);
    };

    const handleAddToCartFromOverlay = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (hasTieredPrices && selectedTierIndex === null) return;
        if (isWellnessOil && !selectedConcentration) return;
        if (isExtremeVariants && !selectedExtremeConc) return;

        let name = product.name;
        let finalPrice = parseFloat(displayPrice);

        if (isWellnessOil && selectedConcentration) name += ` - ${selectedConcentration}`;
        if (isExtremeVariants && selectedExtremeConc) name += ` - ${selectedExtremeConc}`;
        if (hasTieredPrices && selectedTierIndex !== null && product.tieredPrices) {
            const tier = product.tieredPrices[selectedTierIndex];
            name += ` - ${tier.amount}${tier.unit}`;
        }

        setShowVariantOverlay(false);
        setIsAnimating(true);
        
        setTimeout(() => {
            setIsAnimating(false);
            addToCart({ ...product, price: finalPrice, name }, 1);
            // reset selections pour un futur achat
            setSelectedConcentration(null);
            setSelectedExtremeConc(null);
            setSelectedTierIndex(null);
        }, 500);
    };

    const closeVariantOverlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setShowVariantOverlay(false);
        // Reset selections if closed without adding
        setSelectedConcentration(null);
        setSelectedExtremeConc(null);
        setSelectedTierIndex(null);
    };

    const handleNotify = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isNotified) return;

        if (isAuthenticated && userEmail) {
            setIsNotifying(true);
            setTimeout(() => {
                setIsNotifying(false);
                setIsNotified(true);
                // We'd typically send userEmail to an API here
            }, 1200);
        } else {
            setShowEmailOverlay(true);
        }
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!email) return;

        setEmailStatus('loading');
        // Simuler l'enregistrement de l'email
        setTimeout(() => {
            setEmailStatus('success');
            setIsNotified(true);
            
            // Fermer l'overlay après le message de succès
            setTimeout(() => {
                setShowEmailOverlay(false);
                setEmailStatus('idle');
                setEmail('');
            }, 2500);
        }, 1200);
    };

    const closeOverlay = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowEmailOverlay(false);
        setEmailStatus('idle');
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onQuickView) onQuickView(product);
    };
    
    const cardBg = isExtreme ? 'bg-[#222]' : 'bg-white';
    
    let extremeHoverBorder = 'hover:border-gardenz-cyan';
    if (isExtreme) {
        if (product.intensity === 'Medium') extremeHoverBorder = 'hover:border-[#FF9F1C]';
        else if (product.intensity === 'Hardcore') extremeHoverBorder = 'hover:border-gardenz-magenta';
    }

    const cardBorder = isExtreme 
        ? `border-[#333] ${extremeHoverBorder}` 
        : 'border-gray-100 hover:border-gardenz-green/20';

    const titleColor = isExtreme ? 'text-white' : 'text-gardenz-dark group-hover:text-gardenz-green';
    const priceColor = isExtreme ? 'text-white' : 'text-gardenz-dark';
    const shadow = isExtreme ? 'hover:shadow-[0_0_20px_-5px_rgba(0,255,255,0.20)]' : 'hover:shadow-lg hover:shadow-gardenz-green/10';
    
    const btnDefault = isOutOfStock 
        ? 'bg-gray-100 text-gray-500 hover:bg-gardenz-terra hover:text-white border border-gray-200'
        : isExtreme 
            ? 'text-white hover:text-gardenz-magenta border border-transparent' 
            : 'bg-white border-gray-200 text-gardenz-dark hover:bg-gardenz-green hover:text-white hover:border-gardenz-green hover:shadow-md border';
        
    const btnActive = isExtreme 
        ? 'text-gardenz-cyan scale-125 rotate-12 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] border border-transparent' 
        : 'bg-gardenz-green text-white scale-110 shadow-lg border-gardenz-green border';
    
    const btnSuccess = isExtreme
        ? 'text-gardenz-cyan scale-110 border border-gardenz-cyan/50 bg-gardenz-cyan/10'
        : 'bg-gardenz-terra text-white scale-110 shadow-lg border-gardenz-terra border';

    const borderRadius = isExtreme ? 'rounded-none' : 'rounded-2xl';

    return (
        <div 
            ref={cardRef}
            onClick={() => onProductClick(product.id)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onProductClick(product.id);
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Voir le produit ${product.name}`}
            className={`group relative ${borderRadius} overflow-hidden shadow-sm transition-all duration-300 ease-out flex flex-col ${cardBg} ${cardBorder} ${shadow} cursor-pointer h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gardenz-green focus-visible:ring-offset-2`}
        >
            <div className={`relative aspect-square overflow-hidden flex-shrink-0 ${isExtreme ? 'bg-black/50' : 'bg-gray-50'}`}>
                <img src={product.image} alt={product.name} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out ${isOutOfStock ? 'grayscale opacity-60' : ''}`} loading="lazy" />
                
                {isOutOfStock && !showEmailOverlay && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 z-20 transition-all group-hover:bg-black/20">
                        <div className="bg-white/90 backdrop-blur-sm text-black border-2 border-black font-display font-bold px-4 py-2 text-sm uppercase tracking-widest shadow-xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">Rupture</div>
                        {isNotified && (
                            <div className="mt-4 animate-bounce bg-gardenz-terra text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Alerte configurée</div>
                        )}
                    </div>
                )}

                {/* EMAIL OVERLAY FOR BACK IN STOCK */}
                {showEmailOverlay && (
                    <div 
                        className="absolute inset-0 bg-gardenz-black/80 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 animate-fade-in"
                        onClick={(e) => e.stopPropagation()} // Empêche le clic de propager vers le parent (ProductCard click)
                    >
                        <button 
                            onClick={closeOverlay} 
                            className="absolute top-3 right-3 text-white hover:text-gardenz-terra transition-colors bg-black/50 rounded-full p-1"
                            aria-label="Fermer"
                        >
                            <X size={18} />
                        </button>

                        {emailStatus === 'success' ? (
                            <div className="text-center animate-bounce-in">
                                <div className="w-12 h-12 bg-gardenz-terra text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(232,80,63,0.5)]">
                                    <Check size={24} />
                                </div>
                                <h4 className="font-bold text-white text-lg mb-1 font-display uppercase tracking-widest">C'est noté !</h4>
                                <p className="text-xs text-gray-300">Un mail sera envoyé dès le retour en stock.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleEmailSubmit} className="w-full text-center">
                                <BellOff size={24} className="text-gardenz-terra mx-auto mb-3 animate-pulse" />
                                <h4 className="font-bold text-white text-[11px] uppercase tracking-[0.2em] mb-4">Être alerté du retour</h4>
                                
                                <div className="space-y-3">
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onClick={(e) => e.stopPropagation()} // Permet de sélectionner le texte sans cliquer la carte
                                        placeholder="Votre adresse email..."
                                        required
                                        className="w-full bg-white/10 text-white placeholder-gray-400 border border-gray-600 px-4 py-2.5 rounded text-sm focus:outline-none focus:border-gardenz-terra transition-colors text-center"
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={emailStatus === 'loading'}
                                        className="w-full bg-gardenz-terra text-white font-bold text-xs uppercase tracking-widest py-3 rounded hover:bg-white hover:text-gardenz-terra transition-colors flex items-center justify-center gap-2"
                                    >
                                        {emailStatus === 'loading' ? <Loader2 className="animate-spin" size={16} /> : "M'inscrire"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {onQuickView && !isOutOfStock && (
                    <>
                        <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none bg-black/10 backdrop-blur-[2px]">
                            <button onClick={handleQuickView} className="pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold text-xs uppercase tracking-widest bg-white text-gardenz-dark hover:text-gardenz-green hover:scale-105"><Eye size={18} /> Aperçu</button>
                        </div>
                        <button onClick={handleQuickView} className={`lg:hidden absolute top-3 right-3 z-30 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-90 ${isExtreme ? 'bg-black/80 text-gardenz-cyan border border-gardenz-cyan/30 backdrop-blur-sm' : 'bg-white/90 text-gardenz-dark border border-gray-200'}`} aria-label="Aperçu rapide"><Eye size={20} /></button>
                    </>
                )}

                {/* VARIANT SELECTION OVERLAY */}
                {showVariantOverlay && hasVariants && (
                    <div 
                        className="absolute inset-0 bg-black/80 z-40 flex flex-col items-center justify-center p-4 animate-fade-in"
                        onClick={closeVariantOverlay} 
                    >
                        <div className={`w-full rounded-xl p-5 backdrop-blur-lg relative ${isExtreme ? 'bg-[#111]/90 border border-gardenz-cyan/30 shadow-[0_0_20px_rgba(0,255,255,0.2)]' : 'bg-white/95 border border-gardenz-green/30 shadow-xl'}`} onClick={e => e.stopPropagation()}>
                            <button 
                                onClick={closeVariantOverlay} 
                                className={`absolute top-3 right-3 rounded-full p-1.5 transition-colors ${isExtreme ? 'text-gray-400 hover:text-white bg-white/5 hover:bg-red-500/20' : 'text-gray-400 hover:text-gardenz-terra bg-gray-100'}`}
                            >
                                <X size={14} />
                            </button>
                            
                            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 text-center pr-6 ${isExtreme ? 'text-white' : 'text-gardenz-dark'}`}>
                                Choisir {hasTieredPrices ? 'le format' : 'la concentration'}
                            </h4>
                            
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                {isWellnessOil && ['5%', '10%', '20%', '30%'].map(conc => (
                                    <button 
                                        key={conc}
                                        onClick={() => setSelectedConcentration(conc)} 
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selectedConcentration === conc ? 'bg-gardenz-green text-white shadow-md scale-105 ring-2 ring-gardenz-green/30' : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'}`}
                                    >
                                        {conc}
                                    </button>
                                ))}
                                
                                {isExtremeVariants && ['20%', '40%', '60%', '90%'].map(conc => (
                                    <button 
                                        key={conc}
                                        onClick={() => setSelectedExtremeConc(conc)} 
                                        className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all ${selectedExtremeConc === conc ? 'bg-gardenz-cyan text-black shadow-[0_0_10px_rgba(0,255,255,0.4)] scale-105 border-gardenz-cyan' : 'bg-transparent text-gray-400 border border-gray-600 hover:border-gardenz-cyan'}`}
                                    >
                                        {conc}
                                    </button>
                                ))}

                                {hasTieredPrices && product.tieredPrices && product.tieredPrices.map((tier, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setSelectedTierIndex(idx)} 
                                        className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${selectedTierIndex === idx ? (isExtreme ? 'bg-gardenz-magenta/20 text-gardenz-magenta border-gardenz-magenta shadow-[0_0_10px_rgba(255,0,255,0.3)] scale-105' : 'bg-gardenz-green text-white border-gardenz-green shadow-md scale-105') : (isExtreme ? 'bg-white/5 text-gray-400 border-white/20 hover:bg-white/10' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100')}`}
                                    >
                                        {tier.amount}{tier.unit}
                                        {tier.discountBadge && <span className="ml-1 text-[8px] bg-red-500 text-white px-1 py-0.5 rounded uppercase">{tier.discountBadge}</span>}
                                    </button>
                                ))}
                            </div>
                            
                            <button 
                                onClick={handleAddToCartFromOverlay}
                                disabled={(hasTieredPrices && selectedTierIndex === null) || (isWellnessOil && !selectedConcentration) || (isExtremeVariants && !selectedExtremeConc)}
                                className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 border ${
                                    ((hasTieredPrices && selectedTierIndex !== null) || (isWellnessOil && selectedConcentration) || (isExtremeVariants && selectedExtremeConc))
                                    ? (isExtreme ? 'bg-gardenz-cyan text-black border-gardenz-cyan shadow-[0_4px_15px_rgba(0,255,255,0.4)] hover:bg-white active:scale-95' : 'bg-gardenz-green text-white border-gardenz-green hover:bg-gardenz-terra shadow-lg active:scale-95')
                                    : (isExtreme ? 'bg-white/10 text-gray-400 cursor-not-allowed border-white/10' : 'bg-gray-100/80 text-gray-500 cursor-not-allowed border-gray-200 shadow-inner')
                                }`}
                            >
                                <ShoppingCart size={18} />
                                {displayPrice}€
                            </button>
                        </div>
                    </div>
                )}
                
                <div className={`absolute top-3 left-3 flex flex-col items-start gap-1.5 pointer-events-none ${showEmailOverlay ? 'z-10' : 'z-20'}`}>
                    {product.isHot && <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wider animate-pulse"><Flame size={10} fill="currentColor" /> TOP VENTE</span>}
                    {product.isNew && !isWellness && <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider">NOUVEAU</span>}
                    {product.isLimited && !isOutOfStock && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wider"><Clock size={10} /> STOCK LIMITÉ</span>}
                </div>
                
                <div className={`absolute bottom-3 left-3 flex flex-col items-start gap-1.5 pointer-events-none ${showEmailOverlay ? 'z-10' : 'z-20'}`}>
                   {showUniverseBadge && (
                       <span className={`text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wide ${isWellness ? 'bg-gardenz-green text-white' : isExtreme ? 'bg-gardenz-black text-gardenz-cyan border border-gardenz-cyan/30' : 'bg-[#4F46E5] text-white'}`}>
                           {isWellness ? 'Bien-être' : isExtreme ? 'eXtreme Lab' : 'LifeStyle'}
                       </span>
                   )}
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-1.5">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        {isWellness ? (product.tags[0] || 'Général') : product.category}
                    </p>
                    {isExtreme && product.intensity && (
                         <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${product.intensity === 'Soft' ? 'text-gardenz-cyan border border-gardenz-cyan/30' : product.intensity === 'Medium' ? 'text-[#FF9F1C] border border-[#FF9F1C]/30' : 'text-gardenz-magenta border border-gardenz-magenta/30'}`}>
                            {product.intensity}
                         </span>
                    )}
                </div>
                <h3 className={`font-display text-lg font-bold mb-2 transition-colors line-clamp-2 h-14 ${titleColor}`}>
                    {product.name}
                </h3>
                
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5 text-yellow-500">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                        <span className="text-xs text-gray-400 font-medium tracking-wide">4.9</span>
                    </div>
                    {product.molecule && <span className={`text-xs font-bold ${isExtreme ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wide`}>{product.molecule}</span>}
                </div>

                <div className={`flex items-center justify-between pt-4 mt-auto border-t ${isExtreme ? 'border-white/10' : 'border-gray-100'}`}>
                    <div className="flex flex-col">
                        {isStartingPrice && !isOutOfStock && (
                            <span className={`text-[9px] uppercase tracking-widest mb-0.5 ${isExtreme ? 'text-gray-500' : 'text-gray-400'}`}>À partir de</span>
                        )}
                        <span className={`font-bold text-xl ${isOutOfStock ? 'text-gray-400' : priceColor}`}>
                            {displayPrice}€
                        </span>
                    </div>
                    
                        <button 
                        onClick={handleCartClick} 
                        title={isOutOfStock ? "M'alerter du retour en stock" : "Ajouter au panier"}
                        aria-label={isOutOfStock ? `M'alerter du retour en stock pour ${product.name}` : `Ajouter ${product.name} au panier`}
                        className={`transition-all duration-300 transform p-3 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center relative z-20 ${
                            isNotified ? btnSuccess : (isAnimating || isNotifying) ? btnActive : btnDefault
                        }`}
                    >
                        {isOutOfStock ? (
                            isNotifying ? <Loader2 size={20} className="animate-spin" /> : isNotified ? <Check size={20} /> : <BellOff size={20} />
                        ) : (
                            isAnimating ? <Check size={20} /> : <ShoppingBag size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
