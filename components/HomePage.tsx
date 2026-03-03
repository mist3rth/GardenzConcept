import React from 'react';
import { HeroSplit } from './HeroSplit';
import { Link } from 'react-router-dom';
import { SEOHead } from './SEOHead';
import { HomepageSEOBlock } from './HomepageSEOBlock';
import { LifestyleSection } from './LifestyleSection';
import { WellnessSection } from './WellnessSection';
import { ExtremeSection } from './ExtremeSection';
import { ReviewsSection } from './ReviewsSection';
import { CommunitySelection } from './CommunitySelection';
import { NewsletterSection } from './NewsletterSection';
import { Truck, ShieldCheck, FlaskConical, Headphones } from 'lucide-react';
import { Product } from '../types';

interface HomePageProps {
  onProductClick: (id: string) => void;
  onQuickView?: (product: Product) => void;
}

const ReassuranceBanner = () => (
  <div className="bg-gardenz-white border-b border-gray-100 py-4 px-6 shadow-sm relative z-20">
    <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8 text-xs md:text-sm font-medium text-gray-600">
      <Link to="/livraison" className="flex items-center gap-2 hover:text-gardenz-green transition-colors">
        <Truck size={18} className="text-gardenz-green" />
        <span>Livraison Express <strong>24/48h</strong></span>
      </Link>
      <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
      <Link to="/cgv" className="flex items-center gap-2 hover:text-gardenz-green transition-colors">
        <ShieldCheck size={18} className="text-gardenz-green" />
        <span>100% <strong>Légal & Discret</strong></span>
      </Link>
      <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
      <Link to="/tracabilite" className="flex items-center gap-2 hover:text-gardenz-green transition-colors">
        <FlaskConical size={18} className="text-gardenz-green" />
        <span>Produits <strong>Testés en Labo</strong></span>
      </Link>
      <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
      <Link to="/contact" className="flex items-center gap-2 hover:text-gardenz-green transition-colors">
        <Headphones size={18} className="text-gardenz-green" />
        <span>Service Client <strong>Expert</strong></span>
      </Link>
    </div>
  </div>
);

export const HomePage: React.FC<HomePageProps> = ({ onProductClick, onQuickView }) => {
  return (
    <div className="animate-fade-in">
      <SEOHead 
        title="Gardenz | Le Clan des Connaisseurs CBD & HHC" 
        description="Plongez dans l'univers Gardenz. Du CBD Premium pour le Bien-être aux créations puissantes de l'eXtreme Lab. Rejoignez le Clan."
      />
      {/* 1. Hero : Segmentation Visuelle des Univers */}
      <HeroSplit />

      {/* 2. Réassurance Immédiate : Lever les freins à l'achat */}
      <ReassuranceBanner />

      {/* 2.5 Bloc SEO Principal H1 */}
      <HomepageSEOBlock />

      {/* 3. Social Proof & Best Sellers : Ce que le Clan adore */}
      <CommunitySelection onProductClick={onProductClick} onQuickView={onQuickView} />

      {/* 4. Entonnoir Wellness : La douceur et le quotidien */}
      <div id="wellness" className="scroll-mt-20">
        <WellnessSection onProductClick={onProductClick} onQuickView={onQuickView} />
      </div>

      {/* 5. Entonnoir Extreme : La puissance et l'innovation */}
      <div id="extreme" className="scroll-mt-20">
        <ExtremeSection onProductClick={onProductClick} onQuickView={onQuickView} />
      </div>

      {/* 6. Lifestyle & Culture : Musique, Review'z et Apparel */}
      <div id="lifestyle" className="scroll-mt-20">
        <LifestyleSection />
      </div>

      {/* 7. Avis Clients : Preuve de satisfaction finale */}
      <ReviewsSection />

      {/* 8. Lead Magnet : Capture d'audience */}
      <NewsletterSection />
    </div>
  );
};
