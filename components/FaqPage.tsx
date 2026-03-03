
import React from 'react';
import { FaqSection } from './FaqSection';
import { ShieldCheck } from 'lucide-react';

export const FaqPage: React.FC = () => {
  return (
    <div className="bg-gardenz-white min-h-screen">
      
      {/* HEADER MANIFESTE */}
      <div className="bg-[#0A0A0A] pt-40 pb-28 px-6 relative overflow-hidden text-center">
         {/* Background Ambience */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gardenz-green/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gardenz-terra/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

         <div className="relative z-10 max-w-4xl mx-auto">
             <h1 className="font-display text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase italic leading-[0.9]">
                LA FAQ <br/><span className="text-outline-white">SANS FILTRE</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                On ne tourne pas autour du pot. On vous donne les faits, la science et les règles du jeu.
            </p>
         </div>
      </div>

      <FaqSection />
    </div>
  );
};
