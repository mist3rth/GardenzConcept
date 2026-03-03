
import React from 'react';
import { ShopsHighlightSection } from './ShopsHighlightSection';
import { PartnershipPushSection } from './PartnershipPushSection';

interface ShopsPageProps { }

export const ShopsPage: React.FC<ShopsPageProps> = () => {
  return (
    <div className="bg-gardenz-white min-h-screen">
      <div className="pt-32 pb-0 text-center px-6">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-gardenz-dark mb-4">
          NOS <span className="text-gardenz-green">BOUTIQUES</span>
        </h1>
      </div>
      <ShopsHighlightSection />
      <PartnershipPushSection />
    </div>
  );
};
