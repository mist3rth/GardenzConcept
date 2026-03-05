
import React, { useMemo, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, CheckCircle, Sparkles } from 'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import { ALL_PRODUCTS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, addToCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const FREE_SHIPPING_THRESHOLD = 49;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);
  const isFreeShippingReached = cartTotal >= FREE_SHIPPING_THRESHOLD;

  // Logique du "Filler Product" (Produit complémentaire peu coûteux)
  const suggestedFiller = useMemo(() => {
    if (isFreeShippingReached || items.length === 0) return null;

    // On cherche un produit < 20€ qui n'est pas déjà dans le panier
    const fillers = ALL_PRODUCTS.filter(p =>
      p.price <= 20 &&
      p.stock !== 0 &&
      !items.find(item => item.id === p.id)
    );

    // On en prend un au hasard ou le premier pertinent (ex: Accessoires Lifestyle ou Petits formats Wellness)
    return fillers.length > 0 ? fillers[0] : null;
  }, [items, isFreeShippingReached]);

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/commande');
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const getExtraBadge = (item: CartItem) => {
    if (item.universe === 'wellness' && item.tags.length > 0) {
      return {
        text: item.tags[0],
        style: 'text-gardenz-green bg-gardenz-green/10 border-gardenz-green/20'
      };
    }
    if (item.universe === 'extreme' && item.intensity) {
      const i = item.intensity;
      if (i === 'Soft') return { text: i, style: 'text-gardenz-cyan bg-gardenz-cyan/10 border-gardenz-cyan/30' };
      if (i === 'Medium') return { text: i, style: 'text-[#FF9F1C] bg-[#FF9F1C]/10 border-[#FF9F1C]/30' };
      if (i === 'Hardcore') return { text: i, style: 'text-gardenz-magenta bg-gardenz-magenta/10 border-gardenz-magenta/30' };
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">

        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gardenz-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-gardenz-green" />
            <h2 className="font-display text-2xl font-bold text-gardenz-dark">Mon Panier</h2>
            <span className="bg-gardenz-dark text-white text-xs font-bold px-2 py-1 rounded-full">{items.length}</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* --- SHIPPING PROGRESS BAR & FILLER SUGGESTION --- */}
        {items.length > 0 && (
          <div className="bg-gray-50 border-b border-gray-100 flex flex-col">
            <div className="px-6 py-4 pb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  {isFreeShippingReached ? (
                    <><CheckCircle size={14} className="text-gardenz-green" /> Protocole logistique optimisé</>
                  ) : (
                    <><Truck size={14} className="text-gardenz-terra" /> Livraison Express</>
                  )}
                </span>
                <span className="text-[11px] font-bold text-gardenz-dark">
                  {isFreeShippingReached ? "OFFERTE" : `${remainingForFreeShipping.toFixed(2)}€ restants`}
                </span>
              </div>

              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-1000 ease-out rounded-full relative
                                ${isFreeShippingReached
                      ? 'bg-gardenz-green shadow-[0_0_15px_rgba(56,118,29,0.6)]'
                      : 'bg-gardenz-green/60'
                    }
                            `}
                  style={{ width: `${shippingProgress}%` }}
                >
                  <div className="absolute right-0 top-0 h-full w-4 bg-white/30 blur-sm"></div>
                </div>
              </div>

              <p className={`mt-2 text-[11px] font-medium ${isFreeShippingReached ? 'text-gardenz-green' : 'text-gray-500'}`}>
                {isFreeShippingReached
                  ? "Félicitations ! La livraison est offerte par le Lab."
                  : `Plus que ${remainingForFreeShipping.toFixed(2)}€ pour débloquer la livraison gratuite.`
                }
              </p>
            </div>

            {/* --- FILLER PRODUCT SUGGESTION --- */}
            {!isFreeShippingReached && suggestedFiller && (
              <div className="px-6 pb-4 animate-fade-in">
                <div className="bg-white rounded-xl p-3 border border-gardenz-green/20 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow group/filler">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-50">
                    <img src={getAssetUrl(suggestedFiller.image)} alt={suggestedFiller.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gardenz-green font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={10} /> Compléter le setup
                    </p>
                    <h4 className="text-[11px] font-bold text-gardenz-dark truncate">{suggestedFiller.name}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gardenz-dark">{suggestedFiller.price.toFixed(2)}€</span>
                    <button
                      onClick={() => addToCart(suggestedFiller, 1)}
                      className="p-1.5 rounded-full bg-gardenz-green text-white hover:bg-gardenz-dark transition-all transform hover:scale-110 active:scale-90 shadow-sm"
                      title="Ajouter pour atteindre la livraison gratuite"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <p className="text-lg font-bold text-gray-500">Votre panier est vide</p>
              <p className="text-sm text-gray-400">Il est temps de remplir votre vibe !</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 text-gardenz-green font-bold hover:underline"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            items.map((item) => {
              const extraBadge = getExtraBadge(item);

              return (
                <div key={item.cartId} className="flex gap-4 group">
                  {/* Image */}
                  <div className={`w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border ${item.universe === 'extreme' ? 'border-gray-800 bg-black' : 'border-gray-100 bg-gray-50'}`}>
                    <img src={getAssetUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-display font-bold text-gardenz-dark line-clamp-2 pr-2 leading-tight">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 mt-1">{item.category}</p>

                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.universe === 'extreme' && (
                          <span className="text-[10px] font-bold text-gardenz-cyan bg-black px-1.5 py-0.5 rounded border border-gardenz-cyan/30">eXtreme Lab</span>
                        )}
                        {item.universe === 'wellness' && (
                          <span className="text-[10px] font-bold text-gardenz-green bg-gardenz-green/10 px-1.5 py-0.5 rounded border border-gardenz-green/20">Bien-être</span>
                        )}
                        {item.universe === 'lifestyle' && (
                          <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">LifeStyle</span>
                        )}

                        {extraBadge && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${extraBadge.style}`}>
                            {extraBadge.text}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-lg text-gardenz-dark">
                        {(item.price * item.quantity).toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">Sous-total</span>
              <span className="font-bold text-xl text-gardenz-dark">{cartTotal.toFixed(2)}€</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 text-right">
              {isFreeShippingReached
                ? "Livraison gratuite incluse"
                : "Frais de port calculés à l'étape suivante"
              }
            </p>

            <button
              onClick={handleCheckout}
              className="w-full bg-gardenz-green text-white py-4 rounded-xl font-display font-bold uppercase tracking-widest hover:bg-gardenz-dark transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95"
            >
              Commander <ArrowRight size={18} />
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-3 text-xs text-gray-400 hover:text-red-500 underline decoration-gray-300 underline-offset-2 transition-colors"
            >
              Vider le panier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
