
import React, { useState, useEffect } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { MapPin, Truck, Store, Bike, ArrowLeft, ArrowRight, Package, AlertCircle } from 'lucide-react';
import { ShippingMethod } from '../../types';

export const StepDelivery: React.FC = () => {
    const { setStep, shippingAddress, setShippingAddress, selectedShippingMethod, setSelectedShippingMethod } = useCheckout();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Validation Rules
    const validateField = (name: string, value: string) => {
        let error = '';
        const trimmed = value.trim();

        switch (name) {
            case 'firstName':
            case 'lastName':
            case 'address':
            case 'city':
                if (!trimmed) error = 'Ce champ est requis.';
                break;
            case 'zip':
                if (!trimmed) error = 'Requis.';
                else if (!/^\d{5}$/.test(trimmed)) error = '5 chiffres requis.';
                break;
            case 'phone':
                if (!trimmed) error = 'Requis.';
                // Basic French phone validation (loose)
                else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(trimmed.replace(/\s/g, ''))) error = 'Numéro invalide.';
                break;
        }
        return error;
    };

    // Check Global Validity whenever address or errors change
    useEffect(() => {
        const hasErrors = Object.values(errors).some(err => err !== '');
        const hasEmptyFields = Object.entries(shippingAddress).some(([key, val]) => {
            if (key === 'email') return false; // Email is handled in previous step
            return typeof val === 'string' && val.trim() === '';
        });
        setIsFormValid(!hasErrors && !hasEmptyFields);
    }, [shippingAddress, errors]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value });
        
        // Clear error immediately if valid on change (better UX)
        if (errors[name]) {
             const error = validateField(name, value);
             if (!error) {
                 setErrors(prev => ({ ...prev, [name]: '' }));
             }
        }
    };

    const handleSubmit = () => {
        if (isFormValid) {
            setStep(3);
        }
    };

    const shippingMethods: ShippingMethod[] = [
        { id: 'colissimo', name: 'Colissimo Domicile', price: 6.90, delay: '48h', icon: <Package size={20} /> },
        { id: 'shop', name: 'Retrait Boutique', price: 0, delay: 'Immédiat', icon: <Store size={20} /> },
        { id: 'chrono', name: 'Chronopost Express', price: 12.90, delay: '24h', icon: <Truck size={20} /> },
    ];

    // Add Stuart if Paris
    const isParis = shippingAddress.zip.startsWith('75');
    if (isParis) {
        shippingMethods.push({ id: 'stuart', name: 'Coursier Stuart', price: 9.90, delay: '2h', icon: <Bike size={20} /> });
    }

    const getInputClass = (fieldName: string) => {
        const hasError = !!errors[fieldName];
        return `w-full border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none transition-all ${
            hasError 
            ? 'border-red-500 focus:ring-2 focus:ring-red-100' 
            : 'border-gray-200 focus:ring-2 focus:ring-gardenz-green focus:border-transparent'
        }`;
    };

    return (
        <div className="p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold mb-6">Livraison</h2>

            {/* FORMULAIRE ADRESSE */}
            <div className="mb-10">
                <h3 className="font-bold text-sm uppercase tracking-widest text-gardenz-green mb-4 flex items-center gap-2">
                    <MapPin size={16} /> Adresse d'expédition
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <input name="firstName" placeholder="Prénom" value={shippingAddress.firstName} onChange={handleChange} onBlur={handleBlur} className={getInputClass('firstName')} />
                        {errors.firstName && <p className="text-xs text-red-500 ml-1">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-1">
                        <input name="lastName" placeholder="Nom" value={shippingAddress.lastName} onChange={handleChange} onBlur={handleBlur} className={getInputClass('lastName')} />
                        {errors.lastName && <p className="text-xs text-red-500 ml-1">{errors.lastName}</p>}
                    </div>
                    <div className="md:col-span-2 space-y-1">
                        <input name="address" placeholder="Numéro et rue" value={shippingAddress.address} onChange={handleChange} onBlur={handleBlur} className={getInputClass('address')} />
                        {errors.address && <p className="text-xs text-red-500 ml-1">{errors.address}</p>}
                    </div>
                    <div className="space-y-1">
                        <input name="zip" placeholder="Code Postal" value={shippingAddress.zip} onChange={handleChange} onBlur={handleBlur} maxLength={5} className={getInputClass('zip')} />
                        {errors.zip && <p className="text-xs text-red-500 ml-1">{errors.zip}</p>}
                    </div>
                    <div className="space-y-1">
                        <input name="city" placeholder="Ville" value={shippingAddress.city} onChange={handleChange} onBlur={handleBlur} className={getInputClass('city')} />
                        {errors.city && <p className="text-xs text-red-500 ml-1">{errors.city}</p>}
                    </div>
                    <div className="md:col-span-2 space-y-1">
                        <input name="phone" placeholder="Téléphone (pour le livreur)" value={shippingAddress.phone} onChange={handleChange} onBlur={handleBlur} className={getInputClass('phone')} />
                        {errors.phone && <p className="text-xs text-red-500 ml-1">{errors.phone}</p>}
                    </div>
                </div>
            </div>

            {/* MODES DE LIVRAISON */}
            <div>
                <h3 className="font-bold text-sm uppercase tracking-widest text-gardenz-green mb-4 flex items-center gap-2">
                    <Truck size={16} /> Mode de livraison
                </h3>
                <div className="space-y-3">
                    {shippingMethods.map((method) => (
                        <label 
                            key={method.id}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedShippingMethod === method.id ? 'border-gardenz-green bg-gardenz-green/5' : 'border-gray-100 hover:border-gray-200'}`}
                        >
                            <div className="flex items-center gap-4">
                                <input 
                                    type="radio" 
                                    name="shipping" 
                                    value={method.id}
                                    checked={selectedShippingMethod === method.id}
                                    onChange={() => setSelectedShippingMethod(method.id)}
                                    className="w-5 h-5 text-gardenz-green focus:ring-gardenz-green"
                                />
                                <div className={`p-2 rounded-lg ${selectedShippingMethod === method.id ? 'bg-white text-gardenz-green' : 'bg-gray-100 text-gray-500'}`}>
                                    {method.icon}
                                </div>
                                <div>
                                    <span className="font-bold block text-gardenz-dark">{method.name}</span>
                                    <span className="text-xs text-gray-500">Délai estimé : {method.delay}</span>
                                </div>
                            </div>
                            <span className="font-bold text-gardenz-dark">
                                {method.price === 0 ? 'Gratuit' : `${method.price.toFixed(2)}€`}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                <button 
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gardenz-dark font-bold text-sm"
                >
                    <ArrowLeft size={16} /> Retour
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 ${
                        isFormValid 
                            ? 'bg-gardenz-dark text-white hover:bg-gardenz-green cursor-pointer' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    Aller au paiement <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};
