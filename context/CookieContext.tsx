
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ConsentStatus = 'accepted' | 'rejected' | 'undecided';

interface CookieContextType {
  consent: ConsentStatus;
  acceptCookies: () => void;
  rejectCookies: () => void;
  resetConsent: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentStatus>('undecided');

  // NOTE: Pour la démo, nous avons désactivé la récupération automatique du consentement
  // afin que le bandeau s'affiche à chaque rechargement de page.
  // Pour la production, décommentez le useEffect ci-dessous.
  
  /*
  useEffect(() => {
    const savedConsent = localStorage.getItem('gardenz_cookie_consent');
    if (savedConsent === 'accepted' || savedConsent === 'rejected') {
      setConsent(savedConsent);
    }
  }, []);
  */

  const acceptCookies = () => {
    localStorage.setItem('gardenz_cookie_consent', 'accepted');
    setConsent('accepted');
    console.log("Analytics Scripts Loaded");
  };

  const rejectCookies = () => {
    localStorage.setItem('gardenz_cookie_consent', 'rejected');
    setConsent('rejected');
    console.log("Analytics Scripts Blocked");
  };

  const resetConsent = () => {
    localStorage.removeItem('gardenz_cookie_consent');
    setConsent('undecided');
  };

  return (
    <CookieContext.Provider value={{ consent, acceptCookies, rejectCookies, resetConsent }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};
