
import React, { useState, useRef, useEffect } from 'react';
import { EXTREME_PRODUCTS } from '../constants';
import { Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ExtremeSectionProps {
    onProductClick: (id: string) => void;
    onQuickView?: (product: Product) => void;
}

export const ExtremeSection: React.FC<ExtremeSectionProps> = ({ onProductClick, onQuickView }) => {
    const [activeIntensity, setActiveIntensity] = useState('Tous');
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const filters = ['Tous', 'Soft', 'Medium', 'Hardcore'];

    const filteredProducts = activeIntensity === 'Tous'
        ? EXTREME_PRODUCTS
        : EXTREME_PRODUCTS.filter(product => product.intensity === activeIntensity);

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
    }, [activeIntensity, filteredProducts.length]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-gardenz-black py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gardenz-magenta/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gardenz-cyan/10 rounded-full blur-[80px] translate-y-1/3 translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header Block Harmonized */}
                <div className="flex flex-col mb-10 gap-6">
                    <div>
                        <h2 className="font-display text-white text-3xl md:text-4xl font-bold mb-2 uppercase italic tracking-tighter">
                            eXTREME <span className="text-outline-white">LAB</span>
                        </h2>
                        <p className="text-gray-400 text-sm font-medium tracking-wide">
                            L'avant-garde moléculaire. Explorez des concentrations inédites et des molécules rares pour une expérience hors catégorie.
                        </p>
                    </div>

                    <div
                        className="flex justify-start md:justify-end gap-2 overflow-x-auto pb-2 md:pb-0 w-full hide-scrollbar pr-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filters.map((filter) => {
                            let activeClass = '';
                            if (activeIntensity === filter) {
                                if (filter === 'Tous') activeClass = 'bg-white text-gardenz-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]';
                                else if (filter === 'Soft') activeClass = 'bg-gardenz-cyan text-gardenz-black border-gardenz-cyan shadow-[0_0_15px_rgba(0,255,255,0.6)]';
                                else if (filter === 'Medium') activeClass = 'bg-[#FF9F1C] text-black border-[#FF9900] shadow-[0_0_15px_rgba(255,159,28,0.6)]';
                                else if (filter === 'Hardcore') activeClass = 'bg-gardenz-magenta text-black border-gardenz-magenta shadow-[0_0_15px_rgba(255,0,255,0.6)]';
                            } else {
                                activeClass = 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-500 hover:text-white';
                            }

                            return (
                                <button
                                    key={filter}
                                    onClick={() => setActiveIntensity(filter)}
                                    className={`px-6 py-2 rounded uppercase font-display tracking-widest text-sm border transition-all duration-300 whitespace-nowrap ${activeClass}`}
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
                            aria-label="Défiler vers la gauche"
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-[#111] p-3 rounded-full border border-gray-700 text-white shadow-lg hover:border-gardenz-cyan hover:text-gardenz-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all transform hover:scale-110"
                        >
                            <ChevronLeft size={24} strokeWidth={2} />
                        </button>
                    )}

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start h-full">
                                    <ProductCard
                                        product={product}
                                        onProductClick={onProductClick}
                                        onQuickView={onQuickView}
                                        showUniverseBadge={false}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="w-full py-16 text-center text-gray-500 font-display uppercase tracking-widest border border-white/5 rounded-lg">
                                Aucun produit eXtreme disponible pour cette intensité.
                            </div>
                        )}
                    </div>

                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            aria-label="Défiler vers la droite"
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-[#111] p-3 rounded-full border border-gray-700 text-white shadow-lg hover:border-gardenz-cyan hover:text-gardenz-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all transform hover:scale-110"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}

                </div>

                <div className="mt-16 text-center">
                    <Link
                        to={activeIntensity === 'Tous' ? '/boutique?filter=extreme' : `/boutique?filter=extreme&intensity=${activeIntensity}`}
                        className="inline-block bg-transparent border-2 border-gardenz-magenta text-white px-10 py-3 uppercase font-display tracking-widest hover:bg-gardenz-magenta transition-all hover:shadow-[0_0_20px_rgba(255,0,255,0.6)]"
                    >
                        {activeIntensity === 'Tous' ? 'ACCÉDER AU LAB COMPLET' : 
                         activeIntensity === 'Soft' ? 'EXPLORER LA GAMME SOFT' :
                         activeIntensity === 'Medium' ? 'DÉCOUVRIR LES DOSAGES MEDIUM' :
                         'RELEVER LE DÉFI HARDCORE'}
                    </Link>
                </div>

            </div>
        </section>
    );
};
