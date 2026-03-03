import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';

interface HeroSplitProps {
  // onNavigate removed
}

export const HeroSplit: React.FC<HeroSplitProps> = () => {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  return (
    <section className="relative h-[75vh] w-full flex flex-col md:flex-row items-stretch overflow-hidden bg-gardenz-black">

      {/* Left Side: Wellness */}
      <Link
        to="/boutique?filter=wellness"
        className={`relative flex-1 transition-all duration-700 ease-in-out group cursor-pointer overflow-hidden bg-black
            ${hoveredSide === 'left' ? 'md:flex-[1.2]' : hoveredSide === 'right' ? 'md:flex-[0.8] opacity-60 grayscale' : 'md:flex-1'}
        `}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors"></div>
        <img
          src={getAssetUrl('/images/home-page/hero-wellness.webp')}
          alt="Univers Bien-être Gardenz"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/20 md:to-transparent opacity-90"></div>

        <div className="absolute bottom-10 left-10 md:top-1/2 md:-translate-y-1/2 md:left-20 md:bottom-auto z-20 max-w-xs">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gardenz-green mb-4 leading-tight">
            BIEN<br /><span className="text-white">ÊTRE</span>
          </h2>
          <p className="font-sans text-white mb-6 block font-medium">
            Fleurs, Huiles, Résines.<br />Détente absolue & Naturelle.
          </p>
          <span
            className="flex items-center gap-2 bg-gardenz-green text-white px-8 py-3 rounded-full font-sans text-sm font-bold tracking-wide hover:bg-gardenz-terra transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-fit"
          >
            Explorer le Bien-être
          </span>
        </div>
      </Link>

      {/* Right Side: eXtreme Lab */}
      <Link
        to="/boutique?filter=extreme"
        className={`relative flex-1 transition-all duration-700 ease-in-out group cursor-pointer overflow-hidden bg-black
            ${hoveredSide === 'right' ? 'md:flex-[1.2]' : hoveredSide === 'left' ? 'md:flex-[0.8] opacity-60 grayscale' : 'md:flex-1'}
        `}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <img
          src={getAssetUrl('/images/home-page/hero-extreme.webp')}
          alt="Univers eXtreme Lab"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          loading="eager"
        />

        <div className="absolute inset-0 bg-gardenz-black/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gardenz-black via-transparent to-transparent md:bg-gradient-to-l md:from-gardenz-black md:to-transparent"></div>

        <div className="absolute bottom-10 right-10 md:top-1/2 md:-translate-y-1/2 md:right-20 md:bottom-auto z-20 max-w-xs text-right flex flex-col items-end">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            eXTREME<br /><span className="text-gardenz-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">LAB</span>
          </h2>
          <p className="font-sans text-gray-300 mb-6 block font-medium">
            Nouvelles molécules. Sensations fortes.<br />Pour les initiés.
          </p>
          <span
            className="inline-flex items-center justify-end gap-2 border-2 border-gardenz-magenta text-gardenz-magenta px-8 py-3 font-display font-bold uppercase tracking-wider hover:bg-gardenz-magenta hover:text-black transition-all shadow-[0_0_15px_rgba(255,0,255,0.5)] hover:-translate-y-1"
          >
            Entrer dans le Lab
          </span>
        </div>
      </Link>
    </section>
  );
};
