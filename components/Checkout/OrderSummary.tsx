
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, ChevronDown, Tag, Gift } from 'lucide-react';

export const OrderSummary: React.FC = () => {
    const { items, cartTotal } = useCart();
    const [promoCode, setPromoCode] = useState('');
    const [isPromoOpen, setIsPromoOpen] = useState(false);

    // Mock Shipping cost
    const shippingCost = 6.90;
    const total = cartTotal + shippingCost;

    // Calcul des points de fidélité (1€ = 10 points)
    const loyaltyPoints = Math.floor(cartTotal * 10);

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag size={20} className="text-gardenz-green" /> Récapitulatif
            </h3>

            {/* Cart Items Scrollable Area */}
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {items.map((item) => (
                    <div key={item.cartId} className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            <span className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-lg">x{item.quantity}</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gardenz-dark line-clamp-2">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.category}</p>
                        </div>
                        <div className="font-bold text-sm">
                            {(item.price * item.quantity).toFixed(2)}€
                        </div>
                    </div>
                ))}
            </div>

            {/* Promo Code Toggle */}
            <div className="mb-6 border-t border-b border-gray-100 py-4">
                <button 
                    onClick={() => setIsPromoOpen(!isPromoOpen)}
                    className="text-sm text-gardenz-green font-bold flex items-center gap-2 hover:underline"
                >
                    <Tag size={16} /> Avez-vous un code promo ? <ChevronDown size={14} className={`transition-transform ${isPromoOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPromoOpen && (
                    <div className="mt-4 flex gap-2 animate-fade-in">
                        <input 
                            type="text" 
                            placeholder="Code Promo" 
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gardenz-green"
                        />
                        <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                            Appliquer
                        </button>
                    </div>
                )}
            </div>

            {/* Totals */}
            <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Sous-total</span>
                    <span>{cartTotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Livraison estimée</span>
                    <span>{shippingCost.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-gardenz-dark pt-4 border-t border-gray-100 mt-4">
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                </div>
                <p className="text-[10px] text-gray-400 text-right">TVA incluse</p>
            </div>

            {/* Loyalty Push */}
            <div className="bg-gardenz-terra/10 rounded-xl p-4 flex items-start gap-3">
                <Gift className="text-gardenz-terra shrink-0" size={20} />
                <div>
                    <p className="text-xs font-bold text-gardenz-terra uppercase tracking-wide mb-1">Programme Fidélité</p>
                    <p className="text-xs text-gray-600">
                        Cette commande vous rapporte <strong className="text-gardenz-dark">{loyaltyPoints} Buds</strong>. 
                        Créez un compte pour les créditer !
                    </p>
                </div>
            </div>
        </div>
    );
};
