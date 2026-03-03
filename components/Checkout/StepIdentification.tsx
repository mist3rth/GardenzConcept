
import React, { useState, useEffect } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { ArrowRight, User, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StepIdentificationProps {
    // onNavigate removed
}

export const StepIdentification: React.FC<StepIdentificationProps> = () => {
    const { setStep, guestInfo, setGuestInfo } = useCheckout();
    const navigate = useNavigate();
    const [email, setEmail] = useState(guestInfo.email);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check validity on mount or email change
    useEffect(() => {
        setIsValid(emailRegex.test(email));
    }, [email]);

    const handleBlur = () => {
        if (!email) {
            setError('L\'adresse email est requise.');
        } else if (!emailRegex.test(email)) {
            setError('Veuillez entrer une adresse email valide.');
        } else {
            setError('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEmail(val);
        if (error) setError(''); // Clear error on typing
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            setGuestInfo({ email });
            setStep(2);
        }
    };

    return (
        <div className="p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold mb-6">Identifiez-vous</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">

                {/* COLONNE 1 : COMMANDE RAPIDE */}
                <div className="flex flex-col h-full">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-gardenz-green mb-4">Commande Rapide</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col flex-1">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all ${error
                                            ? 'border-red-500 focus:ring-red-200'
                                            : 'border-gray-200 focus:ring-gardenz-green focus:border-transparent'
                                        }`}
                                    placeholder="votre@email.com"
                                />
                                {error && <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />}
                            </div>
                            {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="newsletter" className="rounded border-gray-300 text-gardenz-green focus:ring-gardenz-green" />
                            <label htmlFor="newsletter" className="text-xs text-gray-500">Je souhaite recevoir les offres exclusives et les news.</label>
                        </div>

                        <div className="mt-auto pt-4">
                            <button
                                type="submit"
                                disabled={!isValid}
                                className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${isValid
                                        ? 'bg-gardenz-dark text-white hover:bg-gardenz-green shadow-lg cursor-pointer'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Continuer en invité <ArrowRight size={18} />
                            </button>
                        </div>
                    </form>
                </div>

                {/* COLONNE 2 : DEJA CLIENT */}
                <div className="relative flex flex-col h-full">
                    <div className="absolute inset-0 bg-gray-50 rounded-2xl -z-10 md:block hidden"></div>
                    <div className="md:p-6 flex flex-col h-full">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gardenz-green mb-4">
                                <User size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Déjà client ou nouveau client</h3>
                            <p className="text-sm text-gray-500">Connectez-vous pour utiliser vos points de fidélité.</p>
                        </div>

                        <div className="mt-auto pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/connexion')}
                                className="w-full bg-white border-2 border-gardenz-dark text-gardenz-dark font-bold py-3 rounded-xl hover:bg-gardenz-dark hover:text-white transition-colors"
                            >
                                Se Connecter
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
