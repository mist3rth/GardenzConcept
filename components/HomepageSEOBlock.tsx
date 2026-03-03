import React from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomepageSEOBlock: React.FC = () => {
    return (
        <section className="bg-gardenz-black py-16 md:py-24 border-b border-gray-900 overflow-hidden relative">
            {/* Soft background glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-full bg-gardenz-green/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-fade-in">
                <div className="inline-flex justify-center items-center mb-6 opacity-80">
                    <Leaf className="text-gardenz-green mx-2" size={24} />
                    <Leaf className="text-gardenz-terra mx-2" size={20} />
                    <Leaf className="text-gardenz-cyan mx-2" size={16} />
                </div>
                
                <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight tracking-wide">
                    GARDENZ : L'EXCELLENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-gardenz-green to-gardenz-terra">CBD & HHC</span> POUR LES CONNAISSEURS
                </h1>
                
                <p className="text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mx-auto font-sans font-medium">
                    Plongez au cœur d’une expérience botanique sans compromis. Que vous cherchiez l'équilibre naturel de nos fleurs CBD dans l'univers <Link to="/boutique?filter=wellness" className="text-white font-bold hover:text-gardenz-green transition-colors duration-300 relative group"><span className="relative z-10">Bien-être</span><span className="absolute bottom-0 left-0 w-full h-[2px] bg-gardenz-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span></Link>, ou les sensations exclusives de nos nouvelles molécules de l'<Link to="/boutique?filter=extreme" className="text-white font-bold hover:text-gardenz-magenta transition-colors duration-300 relative group"><span className="relative z-10">eXtreme Lab</span><span className="absolute bottom-0 left-0 w-full h-[2px] bg-gardenz-magenta scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span></Link>, notre sélection est testée en laboratoire pour vous garantir pureté et intensité.
                </p>
                
                <div className="mt-12 w-16 h-1 bg-gradient-to-r from-gardenz-green via-gardenz-terra to-gardenz-cyan mx-auto rounded-full opacity-50"></div>
            </div>
        </section>
    );
};
