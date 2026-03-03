
import React from 'react';
import { User, MapPin, CreditCard, Check } from 'lucide-react';

interface CheckoutStepperProps {
    currentStep: number;
}

export const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep }) => {
    
    const steps = [
        { id: 1, label: 'Identité', icon: User },
        { id: 2, label: 'Livraison', icon: MapPin },
        { id: 3, label: 'Paiement', icon: CreditCard },
    ];

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center relative">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10"></div>
                <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gardenz-green rounded-full -z-10 transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="flex flex-col items-center">
                            <div 
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-4 
                                    ${isCompleted 
                                        ? 'bg-gardenz-green border-gardenz-green text-white' 
                                        : isCurrent 
                                            ? 'bg-white border-gardenz-green text-gardenz-green shadow-lg scale-110' 
                                            : 'bg-white border-gray-200 text-gray-300'
                                    }
                                `}
                            >
                                {isCompleted ? <Check size={20} strokeWidth={3} /> : <Icon size={18} />}
                            </div>
                            <span className={`mt-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isCurrent || isCompleted ? 'text-gardenz-dark' : 'text-gray-400'}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
