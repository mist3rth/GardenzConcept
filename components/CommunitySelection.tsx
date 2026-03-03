
import React, { useState, useRef, useEffect } from 'react';
import { TOP_SELECTION } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface CommunitySelectionProps {
    onProductClick: (id: string) => void;
    onQuickView?: (product: Product) => void;
}

export const CommunitySelection: React.FC<CommunitySelectionProps> = ({ onProductClick, onQuickView }) => {
    const [activeFilter, setActiveFilter] = useState('Tous');
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const filters = ['Tous', 'Bien-être', 'eXtreme Lab', 'LifeStyle'];

    const filteredProducts = activeFilter === 'Tous'
        ? TOP_SELECTION
        : TOP_SELECTION.filter(product => {
            if (activeFilter === 'Bien-être') return product.universe === 'wellness';
            if (activeFilter === 'eXtreme Lab') return product.universe === 'extreme';
            if (activeFilter === 'LifeStyle') return product.universe === 'lifestyle';
            return true;
        });

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            container.scrollLeft = 0;
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, [activeFilter, filteredProducts.length]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const arrowBaseClass = "absolute top-1/2 -translate-y-1/2 z-30 p-3 rounded-full shadow-lg transition-all transform hover:scale-110 border";

    // Style des flèches optimisé pour le fond clair (sable)
    const arrowStyleClass = "bg-white border-gray-200 text-gardenz-dark hover:bg-gardenz-green hover:text-white hover:border-gardenz-green";

    // Helper to determine shop filter value
    const getShopFilterPath = () => {
        let filter = 'All';
        if (activeFilter === 'eXtreme Lab') filter = 'extreme';
        else if (activeFilter === 'Bien-être') filter = 'wellness';
        else if (activeFilter === 'LifeStyle') filter = 'lifestyle';

        return `/boutique?filter=${filter}`;
    };

    return (
        <section className="bg-gardenz-white pt-24 pb-12 relative border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="flex flex-col mb-10 gap-6">
                    <div>
                        <h2 className="font-display text-gardenz-dark text-3xl md:text-4xl font-bold mb-2">
                            LE CHOIX DU <span className="text-gardenz-green">GARDENZ CLAN</span>
                        </h2>
                        <p className="text-gray-500 text-sm font-medium tracking-wide">
                            Les pépites validées par la communauté, du Bien-être au Lab.
                        </p>
                    </div>

                    <div
                        className="flex justify-start md:justify-end gap-2 overflow-x-auto pb-2 md:pb-0 w-full hide-scrollbar pr-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filters.map((filter) => {
                            let buttonStyle = '';

                            if (filter === 'eXtreme Lab') {
                                if (activeFilter === filter) {
                                    buttonStyle = 'bg-black text-gardenz-cyan border border-gardenz-cyan/50 shadow-[0_0_10px_rgba(0,255,255,0.3)]';
                                } else {
                                    buttonStyle = 'border border-gray-300 text-gray-500 hover:border-gardenz-dark hover:text-gardenz-dark';
                                }
                            } else {
                                if (activeFilter === filter) {
                                    buttonStyle = 'bg-gardenz-green text-white shadow-md';
                                } else {
                                    buttonStyle = 'border border-gray-300 text-gray-500 hover:border-gardenz-dark hover:text-gardenz-dark';
                                }
                            }

                            return (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-2 rounded text-sm font-medium transition-all whitespace-nowrap ${buttonStyle}`}
                                >
                                    {filter}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="relative group/carousel">
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            aria-label="Défiler à gauche"
                            className={`${arrowBaseClass} ${arrowStyleClass} left-2`}
                        >
                            <ChevronLeft size={24} strokeWidth={2} />
                        </button>
                    )}

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start h-full">
                                <ProductCard
                                    product={product}
                                    onProductClick={onProductClick}
                                    onQuickView={onQuickView}
                                    showUniverseBadge={activeFilter === 'Tous'}
                                />
                            </div>
                        ))}
                    </div>

                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            aria-label="Défiler à droite"
                            className={`${arrowBaseClass} ${arrowStyleClass} right-2`}
                        >
                            <ChevronRight size={24} strokeWidth={2} />
                        </button>
                    )}
                </div>

                <div className="mt-8 text-center animate-fade-in">
                    <Link
                        to={getShopFilterPath()}
                        className={`
                    ${activeFilter === 'eXtreme Lab'
                                ? 'bg-[#111] border-2 border-gardenz-magenta text-white uppercase font-display tracking-widest hover:bg-gardenz-magenta hover:shadow-[0_0_20px_rgba(255,0,255,0.6)]'
                                : 'bg-gardenz-dark text-white rounded-full font-sans hover:bg-gardenz-terra shadow-lg uppercase font-bold text-sm tracking-wider'
                            }
                    px-10 py-3 transition-all inline-block
                `}
                    >
                        {activeFilter === 'Tous' ? 'VOIR LES TENDANCES' : 
                         activeFilter === 'Bien-être' ? 'VOIR LES TENDANCES BIEN-ÊTRE' :
                         activeFilter === 'eXtreme Lab' ? 'VOIR LES TENDANCES EXTREME LAB' :
                         activeFilter === 'LifeStyle' ? 'VOIR LES TENDANCES LIFESTYLE' :
                         'VOIR LES TENDANCES'}
                    </Link>
                </div>
            </div>
        </section>
    );
};
