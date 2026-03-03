
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

export interface CartItem extends Product {
  quantity: number;
  cartId: string; // Identifiant unique pour le panier (ID produit + Variante/Nom)
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (cartId: string) => void; // Utilise cartId au lieu de productId
  updateQuantity: (cartId: string, delta: number) => void; // Utilise cartId au lieu de productId
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('gardenz_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    localStorage.setItem('gardenz_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    // Génère un ID unique pour la ligne du panier basé sur l'ID du produit ET son nom (qui contient la variante)
    // Ex: "w1-Huile Sublime 10%" vs "w1-Huile Sublime 20%"
    const uniqueCartId = `${product.id}-${product.name}`;

    setItems(prev => {
      // On cherche si cet article EXACT (même variante) existe déjà
      const existing = prev.find(item => item.cartId === uniqueCartId);
      
      if (existing) {
        return prev.map(item => 
          item.cartId === uniqueCartId
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      // Sinon, on ajoute une nouvelle ligne
      return [...prev, { ...product, quantity, cartId: uniqueCartId }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      isOpen, 
      setIsOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
