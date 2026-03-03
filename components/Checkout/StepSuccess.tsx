
import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useCheckout } from '../../context/CheckoutContext';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

interface StepSuccessProps {
    // onNavigate removed
}

export const StepSuccess: React.FC<StepSuccessProps> = () => {
    const { clearCart } = useCart();
    const { resetCheckout, shippingAddress } = useCheckout();
    const navigate = useNavigate();

    useEffect(() => {
        // Trigger confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#38761D', '#E0A96B', '#00FFFF', '#FF00FF']
        });

        // Clear cart on mount
        clearCart();
    }, []);

    const handleFinish = () => {
        resetCheckout();
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center text-center py-12 px-6 animate-fade-in max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gardenz-green rounded-full flex items-center justify-center text-white mb-8 shadow-[0_0_40px_rgba(56,118,29,0.4)]">
                <CheckCircle size={48} strokeWidth={3} />
            </div>

            <h1 className="font-display text-4xl font-bold text-gardenz-dark mb-4">
                C'est dans la boîte !
            </h1>
            <p className="text-gray-600 text-lg mb-8">
                Merci {shippingAddress.firstName}, votre commande <span className="font-bold text-gardenz-dark">#GZ-{Math.floor(Math.random() * 100000)}</span> a bien été validée.
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 w-full mb-10 text-left">
                <h3 className="font-bold text-gardenz-dark mb-4 flex items-center gap-2">
                    <Package className="text-gardenz-terra" /> Prochaines étapes
                </h3>
                <ol className="relative border-l border-gray-200 ml-3 space-y-6">
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-gardenz-green rounded-full -left-3 ring-4 ring-white text-white text-xs font-bold">1</span>
                        <h4 className="font-bold text-sm">Confirmation Email</h4>
                        <p className="text-xs text-gray-500">Un récapitulatif vient d'être envoyé à {shippingAddress.email}.</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full -left-3 ring-4 ring-white text-gray-500 text-xs font-bold">2</span>
                        <h4 className="font-bold text-sm">Préparation</h4>
                        <p className="text-xs text-gray-500">Notre équipe prépare votre colis avec soin (et discrétion).</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full -left-3 ring-4 ring-white text-gray-500 text-xs font-bold">3</span>
                        <h4 className="font-bold text-sm">Expédition</h4>
                        <p className="text-xs text-gray-500">Vous recevrez le numéro de suivi sous 24h.</p>
                    </li>
                </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleFinish}
                    className="bg-gardenz-dark text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gardenz-green transition-all flex items-center justify-center gap-2"
                >
                    Retour à l'accueil <Home size={18} />
                </button>
            </div>
        </div>
    );
};
