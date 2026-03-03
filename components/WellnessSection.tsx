
import React, { useState, useRef, useEffect } from 'react';
import { WELLNESS_PRODUCTS } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface WellnessSectionProps {
    onProductClick: (id: string) => void;
    onQuickView?: (product: Product) => void;
}

export const WellnessSection: React.FC<WellnessSectionProps> = ({ onProductClick, onQuickView }) => {
    const [activeFilter, setActiveFilter] = useState('Tous');
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const filters = ['Tous', 'Relaxation', 'Sommeil', 'Stress', 'Focus'];

    const filteredProducts = activeFilter === 'Tous'
        ? WELLNESS_PRODUCTS
        : WELLNESS_PRODUCTS.filter(product => product.tags.includes(activeFilter));

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

    return (
        <section className="bg-gardenz-white pt-24 pb-20 relative overflow-hidden border-t border-gray-200">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gardenz-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gardenz-terra/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header Block Harmonized */}
                <div className="flex flex-col mb-10 gap-6">
                    <div>
                        <h2 className="font-display text-gardenz-dark text-3xl md:text-4xl font-bold mb-2">
                            BIEN-ÊTRE & <span className="text-gardenz-green">ÉQUILIBRE</span>
                        </h2>
                        <p className="text-gray-500 text-sm font-medium tracking-wide">
                            Ciblez votre besoin, maîtrisez votre routine. Relaxation, Sommeil, Stress ou Focus : la science des plantes au service de votre équilibre.
                        </p>
                    </div>

                    <div
                        className="flex justify-start md:justify-end gap-2 overflow-x-auto pb-2 md:pb-0 w-full hide-scrollbar pr-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2 rounded text-sm font-medium transition-all whitespace-nowrap
                                    ${activeFilter === filter
                                        ? 'bg-gardenz-green text-white shadow-md'
                                        : 'border border-gray-300 text-gray-500 hover:border-gardenz-dark hover:text-gardenz-dark'
                                    }
                                `}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative group/carousel">
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            aria-label="Défiler vers la gauche"
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-xl border border-gray-200 text-gardenz-dark hover:bg-gardenz-green hover:text-white hover:border-gardenz-green transition-all transform hover:scale-110"
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
                            <div className="w-full py-12 text-center text-gray-400">
                                Aucun produit trouvé pour ce filtre.
                            </div>
                        )}
                    </div>

                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            aria-label="Défiler vers la droite"
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-xl border border-gray-200 text-gardenz-dark hover:bg-gardenz-green hover:text-white hover:border-gardenz-green transition-all transform hover:scale-110"
                        >
                            <ChevronRight size={24} strokeWidth={2} />
                        </button>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to={activeFilter === 'Tous' ? '/boutique?filter=wellness' : `/boutique?filter=wellness&usage=${activeFilter}`}
                        className="inline-block bg-gardenz-dark text-white px-8 py-3 rounded-full font-sans hover:bg-gardenz-green transition-colors shadow-lg font-bold text-sm tracking-wide"
                    >
                        {activeFilter === 'Tous' ? 'VOIR TOUTE LA GAMME BIEN-ÊTRE' : 
                         activeFilter === 'Stress' ? 'VOIR TOUTE LA GAMME ANTI-STRESS' :
                         `VOIR TOUTE LA GAMME ${activeFilter.toUpperCase()}`}
                    </Link>
                </div>

            </div>
        </section>
    );
};
