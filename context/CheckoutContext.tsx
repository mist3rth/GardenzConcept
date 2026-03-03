
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Address, ShippingMethod } from '../types';

interface CheckoutContextType {
  step: number;
  setStep: (step: number) => void;
  guestInfo: { email: string };
  setGuestInfo: (info: { email: string }) => void;
  shippingAddress: Address;
  setShippingAddress: (address: Address) => void;
  selectedShippingMethod: string;
  setSelectedShippingMethod: (id: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  processPayment: () => Promise<void>;
  resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

const initialAddress: Address = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zip: '',
  phone: ''
};

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState({ email: '' });
  const [shippingAddress, setShippingAddress] = useState<Address>(initialAddress);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('colissimo');
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = async () => {
    setIsProcessing(true);
    // Simulation d'un délai bancaire
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4); // Move to success
        resolve();
      }, 2000);
    });
  };

  const resetCheckout = () => {
    setStep(1);
    setShippingAddress(initialAddress);
    setIsProcessing(false);
  };

  return (
    <CheckoutContext.Provider value={{
      step,
      setStep,
      guestInfo,
      setGuestInfo,
      shippingAddress,
      setShippingAddress,
      selectedShippingMethod,
      setSelectedShippingMethod,
      isProcessing,
      setIsProcessing,
      processPayment,
      resetCheckout
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
