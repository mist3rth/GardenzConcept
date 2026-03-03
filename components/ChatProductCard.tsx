import React, { useState } from 'react';
import { ShoppingCart, ExternalLink, Check, X } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ChatProductCardProps {
    product: Product;
    onViewDetails?: (productId: string) => void;
}

export const ChatProductCard: React.FC<ChatProductCardProps> = ({ product, onViewDetails }) => {
    const { addToCart } = useCart();
    
    // Variant state
    const [showVariantOverlay, setShowVariantOverlay] = useState(false);
    const [selectedConcentration, setSelectedConcentration] = useState<string | null>(null);
    const [selectedExtremeConc, setSelectedExtremeConc] = useState<string | null>(null);
    const [selectedTierIndex, setSelectedTierIndex] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const isExtreme = product.universe === 'extreme';
    const isWellness = product.universe === 'wellness';
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

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (hasVariants) {
            if (!showVariantOverlay) {
                setShowVariantOverlay(true);
            }
            return;
        }

        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            addToCart(product, 1);
        }, 500);
    };

    const handleAddToCartFromOverlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        let name = product.name;
        if (isWellnessOil && selectedConcentration) name += ` - ${selectedConcentration}`;
        if (isExtremeVariants && selectedExtremeConc) name += ` - ${selectedExtremeConc}`;
        if (hasTieredPrices && selectedTierIndex !== null && product.tieredPrices) {
            const tier = product.tieredPrices[selectedTierIndex];
            name += ` - ${tier.amount}${tier.unit}`;
        }

        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            setShowVariantOverlay(false);
            addToCart({ ...product, name, price: Number(getDisplayPrice().price) }, 1);
        }, 500);
    };

    const handleViewDetails = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onViewDetails) {
            onViewDetails(product.id);
        }
    };

    // Molecule badge color
    const getMoleculeColor = (molecule?: string) => {
        if (!molecule) return 'bg-gray-500';
        if (molecule === 'CBD') return 'bg-gardenz-green';
        if (molecule === 'CBN') return 'bg-purple-500';
        if (molecule === 'CBG') return 'bg-yellow-500';
        if (molecule.includes('THCP') || molecule.includes('HHC')) return 'bg-gardenz-magenta';
        if (molecule.includes('H4')) return 'bg-gardenz-cyan';
        return 'bg-gray-500';
    };

    // Stock indicator
    const getStockStatus = () => {
        if (product.stock === 0) return { text: 'Rupture', color: 'text-red-500' };
        if (product.stock && product.stock < 10) return { text: `${product.stock} restants`, color: 'text-orange-500' };
        return { text: 'En stock', color: 'text-green-500' };
    };

    const stockStatus = getStockStatus();

    return (
        <div className="relative bg-white/5 border border-white/10 rounded-xl p-3 hover:border-gardenz-cyan/50 transition-all group overflow-hidden">
            
            {showVariantOverlay && hasVariants && (
                <div className="absolute inset-0 bg-[#0A0A0A]/95 text-white z-30 p-3 flex flex-col justify-between rounded-xl backdrop-blur-sm animate-fade-in mx-0">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowVariantOverlay(false); }} 
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    >
                        <X size={14} />
                    </button>
                    
                    <div className="flex-1 overflow-y-auto hide-scrollbar mt-3 pr-1 space-y-2">
                        <h4 className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest text-center">Sélect. Format</h4>
                        {isWellnessOil && (
                            <div className="flex flex-row justify-start gap-1 w-full overflow-x-auto hide-scrollbar pb-1">
                                {['5%', '10%', '20%', '30%'].map(conc => (
                                    <button 
                                        key={conc}
                                        onClick={(e) => { e.stopPropagation(); setSelectedConcentration(conc); }} 
                                        className={`whitespace-nowrap flex-shrink-0 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${selectedConcentration === conc ? 'bg-gardenz-green text-white border-gardenz-green shadow-md' : 'bg-white/5 text-gray-400 border-white/20 hover:bg-white/10'}`}
                                    >
                                        {conc}
                                    </button>
                                ))}
                            </div>
                        )}

                        {isExtremeVariants && (
                            <div className="flex flex-row justify-start gap-1 w-full overflow-x-auto hide-scrollbar pb-1">
                                {['20%', '40%', '60%', '90%'].map(conc => (
                                    <button 
                                        key={conc}
                                        onClick={(e) => { e.stopPropagation(); setSelectedExtremeConc(conc); }} 
                                        className={`whitespace-nowrap flex-shrink-0 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${selectedExtremeConc === conc ? 'bg-gardenz-magenta/20 text-gardenz-magenta border-gardenz-magenta shadow-[0_0_10px_rgba(255,0,255,0.3)]' : 'bg-white/5 text-gray-400 border-white/20 hover:bg-white/10'}`}
                                    >
                                        {conc}
                                    </button>
                                ))}
                            </div>
                        )}

                        {hasTieredPrices && product.tieredPrices && (
                            <div className="flex flex-row justify-start gap-1 w-full overflow-x-auto hide-scrollbar pb-1">
                                {product.tieredPrices.map((tier, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setSelectedTierIndex(idx); }} 
                                        className={`whitespace-nowrap flex-shrink-0 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${selectedTierIndex === idx ? (isExtreme ? 'bg-gardenz-magenta/20 text-gardenz-magenta border-gardenz-magenta shadow-[0_0_10px_rgba(255,0,255,0.3)]' : 'bg-gardenz-green text-white border-gardenz-green shadow-md') : 'bg-white/5 text-gray-400 border-white/20 hover:bg-white/10'}`}
                                    >
                                        {tier.amount}{tier.unit}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={handleAddToCartFromOverlay}
                        disabled={(hasTieredPrices && selectedTierIndex === null) || (isWellnessOil && !selectedConcentration) || (isExtremeVariants && !selectedExtremeConc)}
                        className={`w-full py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed border ${
                            ((hasTieredPrices && selectedTierIndex !== null) || (isWellnessOil && selectedConcentration) || (isExtremeVariants && selectedExtremeConc)) 
                            ? (isExtreme ? 'bg-gardenz-cyan text-black border-gardenz-cyan hover:bg-white' : 'bg-gardenz-green text-white border-gardenz-green hover:bg-gardenz-terra')
                            : 'bg-white/10 text-gray-400 border-white/10'
                        }`}
                    >
                        {isAnimating ? <Check size={14} /> : <ShoppingCart size={14} />}
                        {displayPrice}€
                    </button>
                </div>
            )}

            <div className={`flex gap-3 transition-opacity duration-300 ${showVariantOverlay ? 'opacity-0' : 'opacity-100'}`}>
                {/* Product Image */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${product.stock === 0 ? 'grayscale opacity-60' : ''}`}
                    />
                    {product.isHot && (
                        <div className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                            HOT
                        </div>
                    )}
                    {product.isNew && (
                        <div className="absolute top-1 right-1 bg-gardenz-cyan text-black text-[8px] font-bold px-1.5 py-0.5 rounded">
                            NEW
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-sm mb-1 truncate">
                        {product.name}
                    </h4>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <div className="flex flex-col">
                            {isStartingPrice && !showVariantOverlay && (
                                <span className="text-[9px] text-gray-400 uppercase tracking-widest leading-none">À partir de</span>
                            )}
                            <span className="text-gardenz-cyan font-bold text-base leading-none mt-0.5">
                                {displayPrice}€
                            </span>
                        </div>
                        {product.molecule && (
                            <span className={`${getMoleculeColor(product.molecule)} text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase self-start sm:self-auto`}>
                                {product.molecule}
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    <p className={`text-[10px] ${stockStatus.color} font-medium mb-2`}>
                        {stockStatus.text}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className={`flex-1 font-bold text-xs py-1.5 px-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 ${
                                isAnimating ? 'bg-gardenz-green text-white' : 'bg-gardenz-cyan hover:bg-white text-black'
                            }`}
                        >
                            {isAnimating ? <Check size={12} /> : <ShoppingCart size={12} />}
                            Ajouter
                        </button>
                        <button
                            onClick={handleViewDetails}
                            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-1.5 px-2 rounded-lg transition-colors flex items-center justify-center"
                        >
                            <ExternalLink size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
