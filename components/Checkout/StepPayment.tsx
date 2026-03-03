
import React, { useState, useEffect } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { useCart } from '../../context/CartContext';
import { CreditCard, Lock, ArrowLeft, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

export const StepPayment: React.FC = () => {
    const { setStep, isProcessing, processPayment } = useCheckout();
    const { cartTotal } = useCart();
    
    // Form state
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    // Errors state
    const [errors, setErrors] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // Validation Logic
    const validateField = (name: string, value: string) => {
        let error = '';
        const trimmed = value.replace(/\s/g, ''); // Remove spaces for checks

        switch (name) {
            case 'cardName':
                if (!value.trim()) error = 'Requis';
                break;
            case 'cardNumber':
                if (!trimmed) error = 'Requis';
                else if (!/^\d{16}$/.test(trimmed)) error = '16 chiffres requis';
                break;
            case 'expiry':
                if (!value.trim()) error = 'Requis';
                else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) error = 'Format MM/AA';
                break;
            case 'cvc':
                if (!trimmed) error = 'Requis';
                else if (!/^\d{3}$/.test(trimmed)) error = '3 chiffres';
                break;
        }
        return error;
    };

    // Global Validation Check
    useEffect(() => {
        const noErrors = Object.values(errors).every(err => err === '');
        const allFilled = cardName && cardNumber && expiry && cvc;
        setIsFormValid(!!(noErrors && allFilled));
    }, [errors, cardName, cardNumber, expiry, cvc]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Specific Formatters
        let formattedValue = value;
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
        } else if (name === 'expiry') {
            // Simple logic to keep MM/AA format could be added here
            if (value.length === 2 && !value.includes('/')) formattedValue = value + '/';
            formattedValue = formattedValue.slice(0, 5);
        } else if (name === 'cvc') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }

        // Update State
        if (name === 'cardName') setCardName(formattedValue);
        if (name === 'cardNumber') setCardNumber(formattedValue);
        if (name === 'expiry') setExpiry(formattedValue);
        if (name === 'cvc') setCvc(formattedValue);

        // Clear error if valid
        if (errors[name as keyof typeof errors]) {
            const error = validateField(name, formattedValue);
            if (!error) setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const shippingCost = 6.90;
    const total = cartTotal + shippingCost;

    const getInputClass = (fieldName: keyof typeof errors) => {
        const hasError = !!errors[fieldName];
        return `w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
            hasError 
            ? 'border-red-500 focus:ring-red-100' 
            : 'border-gray-300 focus:ring-gardenz-green focus:border-transparent'
        }`;
    };

    return (
        <div className="p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold mb-6">Paiement Sécurisé</h2>

            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium">Total à payer</span>
                    <span className="text-2xl font-bold text-gardenz-dark">{total.toFixed(2)}€</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gardenz-green font-bold bg-white w-fit px-3 py-1 rounded-full border border-gray-200">
                    <Lock size={12} /> Transaction chiffrée SSL 256-bits
                </div>
            </div>

            {/* CREDIT CARD FORM */}
            <div className="space-y-6">
                <div className="relative">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Titulaire de la carte</label>
                    <input 
                        type="text" 
                        name="cardName"
                        placeholder="Jean Dupont"
                        value={cardName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass('cardName')}
                    />
                    {errors.cardName && <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>}
                </div>

                <div className="relative">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Numéro de carte</label>
                    <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            name="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${getInputClass('cardNumber')} pl-12 font-mono`}
                        />
                    </div>
                    {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Expiration</label>
                        <input 
                            type="text" 
                            name="expiry"
                            placeholder="MM/AA"
                            value={expiry}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${getInputClass('expiry')} font-mono`}
                        />
                        {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">CVC</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                name="cvc"
                                placeholder="123"
                                value={cvc}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${getInputClass('cvc')} pl-10 font-mono`}
                            />
                        </div>
                        {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>}
                    </div>
                </div>
            </div>

            {/* Apple Pay / Google Pay Placeholders */}
            <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-center text-xs text-gray-400 mb-4 font-bold uppercase">Ou payez rapidement avec</p>
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-gray-800 transition-colors">
                        Apple Pay
                    </button>
                    <button className="bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-gray-50 transition-colors">
                        Google Pay
                    </button>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100 items-center">
                <button 
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gardenz-dark font-bold text-sm"
                    disabled={isProcessing}
                >
                    <ArrowLeft size={16} /> Retour
                </button>
                <button 
                    onClick={processPayment}
                    disabled={isProcessing || !isFormValid}
                    className={`px-8 py-4 rounded-xl font-bold shadow-lg transition-all flex items-center gap-3 ${
                        isProcessing || !isFormValid 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-gardenz-green text-white hover:bg-gardenz-terra cursor-pointer'
                    }`}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="animate-spin" /> Traitement...
                        </>
                    ) : (
                        <>
                            <ShieldCheck size={20} /> Payer {total.toFixed(2)}€
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
