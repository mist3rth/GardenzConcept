
import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { useCookie } from '../context/CookieContext';
import { useNavigate } from 'react-router-dom';

interface CookieBannerProps {
  // onNavigate removed
}

export const CookieBanner: React.FC<CookieBannerProps> = () => {
  const { consent, acceptCookies, rejectCookies } = useCookie();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (consent === 'undecided' && !isExiting) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent !== 'undecided' && !isExiting) {
      setIsVisible(false);
    }
  }, [consent, isExiting]);

  const handleAccept = () => {
    setIsVisible(false);
    setIsExiting(true);
    setTimeout(() => {
      acceptCookies();
      setIsExiting(false);
    }, 700);
  };

  const handleReject = () => {
    setIsVisible(false);
    setIsExiting(true);
    setTimeout(() => {
      rejectCookies();
      setIsExiting(false);
    }, 700);
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/confidentialite');
  };

  if (consent !== 'undecided' && !isExiting) return null;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 md:bottom-4 md:left-4 md:right-auto z-[999]
        w-full md:w-[400px]
        transition-all duration-700 ease-out transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full md:translate-y-20 opacity-0'}
      `}
      role="dialog"
      aria-labelledby="cookie-title"
    >
      {/* Mobile: compact bar fixed to bottom */}
      <div className="block md:hidden bg-[#111]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 shadow-[0_-5px_30px_rgba(0,0,0,0.5)] w-full pb-safe">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] text-gray-400 flex-1 leading-tight">
            🍪 On utilise des cookies pour améliorer votre expérience.{' '}
            <button onClick={handlePrivacyClick} className="underline text-gray-500 hover:text-white">En savoir plus</button>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReject}
              className="text-[11px] text-gray-500 hover:text-white font-bold uppercase tracking-wide transition-colors"
            >
              Refuser
            </button>
            <button
              onClick={handleAccept}
              className="bg-gardenz-green text-white px-3 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wide hover:bg-gardenz-dark transition-all shadow-md active:scale-95 flex items-center gap-1"
            >
              <ShieldCheck size={13} /> Accepter
            </button>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet: glass card */}
      <div className="hidden md:block bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gardenz-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-gardenz-green/30 transition-colors"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gardenz-green/10 rounded-full flex items-center justify-center text-gardenz-green shrink-0 border border-gardenz-green/20">
              <Cookie size={24} />
            </div>
            <div>
              <h3 id="cookie-title" className="font-display text-lg font-bold text-white mb-1">
                Respect de la Vibe 🍪
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Chez Gardenz, on aime les cookies, mais surtout ceux qui se mangent.
                Nous utilisons des traceurs pour améliorer votre expérience et mesurer notre audience.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAccept}
              className="w-full bg-gardenz-green text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gardenz-dark transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-95"
            >
              <ShieldCheck size={16} /> Tout Accepter
            </button>

            <div className="flex justify-between items-center px-2">
              <button
                onClick={handleReject}
                className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-wide transition-colors border-b border-transparent hover:border-white pb-0.5"
              >
                Continuer sans accepter
              </button>
              <button
                onClick={handlePrivacyClick}
                className="text-[10px] text-gray-600 hover:text-gardenz-green underline"
              >
                Politique de confidentialité
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

