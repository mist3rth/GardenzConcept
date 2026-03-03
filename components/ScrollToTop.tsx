
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stickyBarOpen, setStickyBarOpen] = useState(false);

  // Affiche le bouton quand la page est scrollée à plus de 80%
  const toggleVisibility = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    const totalScrollable = documentHeight - windowHeight;

    if (totalScrollable > 0) {
      const scrollPercentage = (scrollTop / totalScrollable) * 100;
      
      // On l'affiche un peu plus tôt (60%) pour qu'il soit utile
      if (scrollPercentage > 60) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Listen for StickyAddToCart visibility changes
  useEffect(() => {
    const onShow = () => setStickyBarOpen(true);
    const onHide = () => setStickyBarOpen(false);
    window.addEventListener('sticky-cta-visible', onShow);
    window.addEventListener('sticky-cta-hidden', onHide);
    return () => {
      window.removeEventListener('sticky-cta-visible', onShow);
      window.removeEventListener('sticky-cta-hidden', onHide);
    };
  }, []);

  return (
    /* Décalage vers le haut quand la barre sticky est visible */
    <div
      style={{ bottom: stickyBarOpen ? '5rem' : '2rem' }}
      className="fixed left-8 z-50 transition-all duration-500 ease-in-out"
    >
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          flex items-center justify-center w-12 h-12 rounded-full bg-gardenz-green text-white shadow-lg 
          transition-all duration-500 ease-in-out transform hover:bg-gardenz-terra hover:scale-110 focus:outline-none
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
        aria-label="Retour en haut"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};
