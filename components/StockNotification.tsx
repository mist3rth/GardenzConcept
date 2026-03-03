
import React, { useState } from 'react';
import { Mail, CheckCircle, Bell, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface StockNotificationProps {
    productName: string;
    variant?: 'light' | 'dark';
}

export const StockNotification: React.FC<StockNotificationProps> = ({ productName, variant = 'light' }) => {
    const { isAuthenticated, userEmail } = useAuth();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated && !email) return;

        setStatus('loading');
        
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            console.log(`Lead captured for ${productName}: ${isAuthenticated ? userEmail : email}`);
        }, 1500);
    };

    const isDark = variant === 'dark';
    const textColor = isDark ? 'text-white' : 'text-gardenz-dark';
    const subTextColor = isDark ? 'text-gray-400' : 'text-gray-500';
    const inputBg = isDark ? 'bg-white/10 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800';
    const btnClass = 'bg-gardenz-terra text-white hover:bg-white hover:text-gardenz-terra';

    if (status === 'success') {
        return (
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-gardenz-terra/10 border-gardenz-terra/30' : 'bg-green-50 border-green-200'} text-center animate-fade-in`}>
                <div className="w-12 h-12 bg-gardenz-terra text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <CheckCircle size={24} />
                </div>
                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gardenz-dark'} mb-1`}>C'est noté !</h4>
                <p className={`text-sm ${subTextColor}`}>
                    Vous recevrez un email dès le retour en stock de :<br/>
                    <span className="font-bold">{productName}</span>
                </p>
            </div>
        );
    }

    return (
        <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#222] border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gardenz-terra/10 rounded-lg text-gardenz-terra animate-pulse">
                    <Bell size={20} />
                </div>
                <div>
                    <h4 className={`font-bold ${textColor} text-sm uppercase tracking-wide`}>Victime de son succès</h4>
                    <p className={`text-xs ${subTextColor}`}>Ce produit est actuellement indisponible.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                {!isAuthenticated && (
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Votre email"
                            required
                            className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gardenz-terra transition-all ${inputBg}`}
                        />
                    </div>
                )}
                <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 ${btnClass}`}
                >
                    {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : (isAuthenticated ? "M'alerter en 1 clic" : "M'alerter du retour")}
                </button>
            </form>
            <p className="text-[10px] text-gray-500 text-center mt-3">
                Soyez le premier informé. Désinscription en 1 clic.
            </p>
        </div>
    );
};
