
import React from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { useCart } from '../../context/CartContext';
import { CheckoutStepper } from './CheckoutStepper';
import { StepIdentification } from './StepIdentification';
import { StepDelivery } from './StepDelivery';
import { StepPayment } from './StepPayment';
import { StepSuccess } from './StepSuccess';
import { OrderSummary } from './OrderSummary';
import { ShieldCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutLayoutProps {
    // onNavigate removed
}

export const CheckoutLayout: React.FC<CheckoutLayoutProps> = () => {
    const { step } = useCheckout();
    const { items } = useCart();
    const navigate = useNavigate();

    // Si le panier est vide et qu'on n'est pas sur la page de succès, rediriger
    if (items.length === 0 && step !== 4) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
                <p className="text-xl font-bold mb-4">Votre panier est vide.</p>
                <button onClick={() => navigate('/')} className="bg-gardenz-green text-white px-6 py-2 rounded-full">Retour à la boutique</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9F9F9] font-sans text-gardenz-dark">

            {/* HEADER MINIMALISTE */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                    {/* Logo (Clic retour accueil sauf si step success) */}
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => step !== 4 && navigate('/')}
                    >
                        <span className="font-display font-bold text-2xl tracking-tighter">GARDENZ</span>
                        <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase hidden sm:block">Secure Checkout</span>
                    </div>

                    <div className="flex items-center gap-2 text-gardenz-green bg-gardenz-green/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Lock size={14} /> Paiement 100% Sécurisé
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-8">

                {step === 4 ? (
                    <StepSuccess />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* MAIN COLUMN */}
                        <div className="lg:col-span-7">
                            <CheckoutStepper currentStep={step} />

                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                {step === 1 && <StepIdentification />}
                                {step === 2 && <StepDelivery />}
                                {step === 3 && <StepPayment />}
                            </div>

                            {/* Footer Réassurance Mobile */}
                            <div className="mt-8 flex justify-center gap-6 text-xs text-gray-400 lg:hidden">
                                <span className="flex items-center gap-1"><ShieldCheck size={14} /> Données chiffrées</span>
                                <span>•</span>
                                <span>Support 7j/7</span>
                            </div>
                        </div>

                        {/* SIDE COLUMN (SUMMARY) */}
                        <div className="lg:col-span-5 hidden lg:block">
                            <div className="sticky top-28">
                                <OrderSummary />

                                <div className="mt-6 text-center text-xs text-gray-400 space-y-2">
                                    <p className="flex items-center justify-center gap-2">
                                        <ShieldCheck size={16} className="text-gardenz-green" />
                                        Vous ne serez débité qu'à la validation.
                                    </p>
                                    <p>Transactions sécurisées par 3D Secure.</p>
                                </div>
                            </div>
                        </div>

                        {/* MOBILE SUMMARY TOGGLE (Bottom Fixed or separate component if needed) */}
                        {/* Note: In a real app, we might add a collapsible summary for mobile here */}
                    </div>
                )}
            </div>

        </div>
    );
};
