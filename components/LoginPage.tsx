
import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, ArrowRight, Check, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
    // onNavigate removed
}

type Step = 'email' | 'login' | 'register-identity' | 'register-security' | 'forgot-password' | 'forgot-success';

export const LoginPage: React.FC<LoginPageProps> = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [password, setPassword] = useState('');

    // Registration State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Registration Errors
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Success State
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

    const validateEmail = (email: string) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const handleEmailBlur = () => {
        if (!email) {
            setEmailError("L'email est requis");
            setIsEmailValid(false);
        } else if (!validateEmail(email)) {
            setEmailError("Format d'email invalide");
            setIsEmailValid(false);
        } else {
            setEmailError("");
            setIsEmailValid(true);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEmail(val);

        const isValid = validateEmail(val);
        setIsEmailValid(isValid);

        if (emailError && isValid) {
            setEmailError('');
        }
    };

    // Step 1 Check (Email)
    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEmailValid) return;

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            // LOGIC TEST:
            if (email === 'test1@gardenz.fr') {
                setStep('login');
            } else {
                setStep('register-identity');
            }
        }, 1000);
    };

    // Login (Existing User)
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 8) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            login(email);
            // Restore context on login success
            navigate(-1); // Go back or home
        }, 1000);
    };

    // --- FORGOT PASSWORD ---
    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('forgot-success');
        }, 1500);
    };

    // --- REGISTRATION VALIDATION LOGIC ---

    // Identity Validation (Step 1/2)
    const validateIdentityField = (name: string, value: string) => {
        if (!value.trim()) return "Ce champ est requis.";
        if (value.trim().length < 2) return "Trop court.";
        return "";
    };

    const handleIdentityBlur = (field: 'first' | 'last') => {
        if (field === 'first') {
            setFirstNameError(validateIdentityField('firstName', firstName));
        } else {
            setLastNameError(validateIdentityField('lastName', lastName));
        }
    };

    const isIdentityValid = firstName.trim().length >= 2 && lastName.trim().length >= 2 && !firstNameError && !lastNameError;

    const handleRegisterNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isIdentityValid) return;
        setStep('register-security');
    };

    // Security Validation (Step 2/2)
    const handlePasswordBlur = () => {
        if (!password) setPasswordError("Le mot de passe est requis.");
        else if (password.length < 8) setPasswordError("Minimum 8 caractères.");
        else setPasswordError("");

        // Re-check confirm if it exists
        if (confirmPassword) {
            if (confirmPassword !== password) setConfirmPasswordError("Les mots de passe ne correspondent pas.");
            else setConfirmPasswordError("");
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (!confirmPassword) setConfirmPasswordError("Confirmation requise.");
        else if (confirmPassword !== password) setConfirmPasswordError("Les mots de passe ne correspondent pas.");
        else setConfirmPasswordError("");
    };

    const isSecurityValid = password.length >= 8 && confirmPassword === password && !passwordError && !confirmPasswordError;

    const handleRegisterFinal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSecurityValid) return;

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            login(email);
            setIsRegisterSuccess(true);
            // No auto redirect, allow user to read confirmation message
        }, 1500);
    };

    const goBack = () => {
        if (step === 'login' || step === 'register-identity') {
            setStep('email');
            setEmailError('');
            setPassword('');
            setFirstName('');
            setLastName('');
        }
        else if (step === 'register-security') setStep('register-identity');
        else if (step === 'forgot-password' || step === 'forgot-success') setStep('login');
        else navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center py-10 px-6 font-sans">

            {/* I. AMBIANCE / BACKGROUND */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gardenz-green/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gardenz-terra/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            {/* Back Button */}
            {!isRegisterSuccess && (
                <button
                    onClick={goBack}
                    className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors flex items-center gap-2 z-50 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden md:inline">Retour</span>
                </button>
            )}

            {/* MAIN CONTAINER */}
            <div className="relative z-10 w-full max-w-md">

                {/* II. EN-TÊTE / MARQUE (Masqué si succès) */}
                {!isRegisterSuccess && (
                    <div className="text-center mb-10">
                        <div className="inline-flex flex-col items-center justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(56,118,29,0.2)] mb-3">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22v-8" /><path d="M12 14c0-3-2-5-2-9 0-1.5.5-2 2-2s2 .5 2 2c0 4-2 6-2 9Z" /><path d="M12 14c-3 0-5 2-9 2-1.5 0-2-.5-2-2s.5-2 2-2c4 0 6 2 9 2Z" /><path d="M12 14c3 0 5 2 9 2 1.5 0 2-.5 2-2s-.5-2-2-2c-4 0-6 2-9 2Z" /></svg>
                            </div>
                            <span className="font-display font-bold text-2xl tracking-[0.2em] text-white">GARDENZ</span>
                        </div>

                        <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tight transition-all duration-500">
                            {step === 'email' && <>CONNEXION OU <span className="text-gardenz-green">INSCRIPTION</span></>}
                            {step === 'login' && <>BON RETOUR <span className="text-gardenz-green">PARMI NOUS</span></>}
                            {step === 'register-identity' && <>CRÉER VOTRE <span className="text-gardenz-terra">ESPACE</span></>}
                            {step === 'register-security' && <>SÉCURISER LE <span className="text-gardenz-terra">COMPTE</span></>}
                            {step === 'forgot-password' && <>MOT DE PASSE <span className="text-gardenz-green">OUBLIÉ</span></>}
                            {step === 'forgot-success' && <>LIEN <span className="text-gardenz-green">ENVOYÉ</span></>}
                        </h1>

                        <p className="text-gray-400 font-medium text-sm transition-all duration-500">
                            {step === 'email' && "Saisissez votre e-mail pour vous connecter ou créer un compte."}
                            {step === 'login' && "Ravi de vous revoir. Entrez votre mot de passe."}
                            {step === 'register-identity' && "Commençons par les présentations. (Étape 1/2)"}
                            {step === 'register-security' && "Dernière étape avant d'accéder à la Vibe. (Étape 2/2)"}
                            {step === 'forgot-password' && "Pas d'inquiétude, ça arrive. Nous allons vous aider."}
                            {step === 'forgot-success' && "Vérifiez votre boîte mail de réception (et vos spams)."}
                        </p>
                    </div>
                )}

                {/* IV. FORMULAIRE DYNAMIQUE */}
                <div className="bg-[#151515]/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group transition-all duration-500">

                    {/* Subtle Neon Border Glow on Hover */}
                    <div className={`absolute inset-0 rounded-[2rem] border border-transparent transition-colors pointer-events-none ${step.startsWith('register') ? 'group-hover:border-gardenz-terra/20' : 'group-hover:border-gardenz-green/20'}`}></div>

                    {/* --- SUCCESS MESSAGE (AFTER REGISTRATION) --- */}
                    {isRegisterSuccess ? (
                        <div className="text-center py-8 animate-fade-in px-2">
                            <div className="w-20 h-20 bg-gardenz-green rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_40px_rgba(56,118,29,0.5)]">
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">BIENVENUE DANS LA VIBE !</h2>

                            <div className="text-gray-300 text-sm leading-relaxed space-y-4 mb-8 text-left max-w-sm mx-auto">
                                <p>C'est presque fini ! Nous sommes ravis de vous accueillir dans la communauté Gardenz.</p>
                                <p>Pour des raisons de sécurité et pour valider votre inscription, nous venons de vous envoyer un e-mail de confirmation.</p>

                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="font-bold text-gardenz-terra mb-2 text-xs uppercase tracking-widest">Ce que vous devez faire maintenant :</p>
                                    <ul className="list-disc pl-4 space-y-2 text-gray-400 text-xs">
                                        <li>Vérifiez votre boîte de réception (et n'oubliez pas les spams !).</li>
                                        <li>Cliquez sur le lien de validation contenu dans cet e-mail.</li>
                                    </ul>
                                </div>

                                <p className="text-center text-gray-500 italic text-xs">
                                    Dès que vous aurez cliqué, votre compte sera actif et vous pourrez profiter de tous les avantages Gardenz. On vous attend !
                                </p>
                            </div>

                            <button
                                onClick={() => navigate(-1)}
                                className="bg-white text-black font-bold uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-gardenz-green hover:text-white transition-all shadow-lg text-sm"
                            >
                                Reprendre ma visite
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* --- STEP 1: EMAIL ENTRY --- */}
                            {step === 'email' && (
                                <form onSubmit={handleEmailSubmit} className="space-y-6 relative z-10 animate-fade-in">
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Email</label>
                                            {emailError && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {emailError}</span>}
                                        </div>
                                        <div className="relative group/input">
                                            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${emailError ? 'text-red-500' : 'text-gray-500 group-focus-within/input:text-gardenz-green'}`} size={20} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                onBlur={handleEmailBlur}
                                                placeholder="vibe@gardenz.fr"
                                                className={`w-full bg-[#0A0A0A] border text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-1 transition-all placeholder:text-gray-700
                                            ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-gardenz-green focus:ring-gardenz-green'}
                                        `}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center gap-3 cursor-pointer group/toggle w-fit ml-1"
                                        onClick={() => setRememberMe(!rememberMe)}
                                    >
                                        <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${rememberMe ? 'bg-gardenz-green' : 'bg-gray-800'}`}>
                                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${rememberMe ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                        </div>
                                        <span className={`text-sm font-medium transition-colors ${rememberMe ? 'text-white' : 'text-gray-500 group-hover/toggle:text-gray-400'}`}>
                                            Rester connecté
                                        </span>
                                    </div>

                                    <button
                                        disabled={!isEmailValid || isLoading}
                                        className={`w-full font-display font-bold uppercase tracking-widest text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                                    ${isEmailValid && !isLoading
                                                ? 'bg-white text-black hover:bg-gardenz-green hover:text-white hover:scale-[1.02] active:scale-[0.98]'
                                                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                            }
                                `}
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" /> : <>Continuer <ArrowRight size={20} /></>}
                                    </button>

                                    <p className="text-[10px] text-center text-gray-600">
                                        Astuce test : "test1@gardenz.fr" (Login) / "test2@gardenz.fr" (Inscription)
                                    </p>
                                </form>
                            )}

                            {/* --- STEP 2A: LOGIN (EXISTING USER) --- */}
                            {step === 'login' && (
                                <form onSubmit={handleLogin} className="space-y-6 relative z-10 animate-slide-in-right">
                                    <div className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-xl border border-white/10">
                                        <span className="text-gray-300 text-sm font-medium">{email}</span>
                                        <button type="button" onClick={() => setStep('email')} className="text-xs text-gardenz-green font-bold hover:underline">Modifier</button>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center ml-2 mr-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mot de passe</label>
                                            <button type="button" onClick={() => setStep('forgot-password')} className="text-[10px] text-gray-500 hover:text-white transition-colors font-medium">
                                                Oublié ?
                                            </button>
                                        </div>
                                        <div className="relative group/input">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-gardenz-green transition-colors" size={20} />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                autoFocus
                                                required
                                                className="w-full bg-[#0A0A0A] border border-gray-800 text-white rounded-xl pl-12 pr-12 py-4 focus:outline-none focus:border-gardenz-green focus:ring-1 focus:ring-gardenz-green transition-all placeholder:text-gray-700"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        disabled={password.length < 8 || isLoading}
                                        className={`w-full font-display font-bold uppercase tracking-widest text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                                    ${password.length >= 8 && !isLoading
                                                ? 'bg-gradient-to-r from-gardenz-green to-[#2E6B15] text-white shadow-[0_5px_20px_rgba(56,118,29,0.4)] hover:shadow-[0_8px_30px_rgba(56,118,29,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                                                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                            }
                                `}
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" /> : "Se Connecter"}
                                    </button>
                                </form>
                            )}

                            {/* --- STEP 2B: REGISTER - IDENTITY --- */}
                            {step === 'register-identity' && (
                                <form onSubmit={handleRegisterNext} className="space-y-6 relative z-10 animate-slide-in-right">
                                    <div className="bg-white/5 px-4 py-3 rounded-xl border border-white/10 text-center">
                                        <span className="text-gray-300 text-sm font-medium">{email}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Prénom</label>
                                            </div>
                                            <div className="relative group/input">
                                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${firstNameError ? 'text-red-500' : 'text-gray-500 group-focus-within/input:text-gardenz-terra'}`} size={20} />
                                                <input
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => {
                                                        setFirstName(e.target.value);
                                                        if (firstNameError) setFirstNameError('');
                                                    }}
                                                    onBlur={() => handleIdentityBlur('first')}
                                                    placeholder="John"
                                                    autoFocus
                                                    className={`w-full bg-[#0A0A0A] border text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-1 transition-all placeholder:text-gray-700
                                                ${firstNameError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-gardenz-terra focus:ring-gardenz-terra'}
                                            `}
                                                />
                                            </div>
                                            {firstNameError && <span className="text-[10px] text-red-500 ml-2">{firstNameError}</span>}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Nom</label>
                                            </div>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => {
                                                    setLastName(e.target.value);
                                                    if (lastNameError) setLastNameError('');
                                                }}
                                                onBlur={() => handleIdentityBlur('last')}
                                                placeholder="Doe"
                                                className={`w-full bg-[#0A0A0A] border text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-1 transition-all placeholder:text-gray-700
                                            ${lastNameError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-gardenz-terra focus:ring-gardenz-terra'}
                                        `}
                                            />
                                            {lastNameError && <span className="text-[10px] text-red-500 ml-2">{lastNameError}</span>}
                                        </div>
                                    </div>

                                    <button
                                        disabled={!isIdentityValid}
                                        className={`w-full font-display font-bold uppercase tracking-widest text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                                    ${isIdentityValid
                                                ? 'bg-white text-black hover:bg-gardenz-terra hover:text-white hover:scale-[1.02] active:scale-[0.98]'
                                                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                            }
                                `}
                                    >
                                        Suivant <ArrowRight size={20} />
                                    </button>
                                </form>
                            )}

                            {/* --- STEP 2C: REGISTER - SECURITY --- */}
                            {step === 'register-security' && (
                                <form onSubmit={handleRegisterFinal} className="space-y-6 relative z-10 animate-slide-in-right">

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Mot de passe</label>
                                        <div className="relative group/input">
                                            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${passwordError ? 'text-red-500' : 'text-gray-500 group-focus-within/input:text-gardenz-terra'}`} size={20} />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    if (passwordError) setPasswordError('');
                                                }}
                                                onBlur={handlePasswordBlur}
                                                placeholder="••••••••"
                                                autoFocus
                                                className={`w-full bg-[#0A0A0A] border text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-1 transition-all placeholder:text-gray-700
                                            ${passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-gardenz-terra focus:ring-gardenz-terra'}
                                        `}
                                            />
                                        </div>
                                        {passwordError && <span className="text-[10px] text-red-500 ml-2">{passwordError}</span>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Confirmer</label>
                                        <div className="relative group/input">
                                            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${confirmPasswordError ? 'text-red-500' : 'text-gray-500 group-focus-within/input:text-gardenz-terra'}`} size={20} />
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                    if (confirmPasswordError) setConfirmPasswordError('');
                                                }}
                                                onBlur={handleConfirmPasswordBlur}
                                                placeholder="••••••••"
                                                className={`w-full bg-[#0A0A0A] border text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-1 transition-all placeholder:text-gray-700
                                            ${confirmPasswordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-gardenz-terra focus:ring-gardenz-terra'}
                                        `}
                                            />
                                        </div>
                                        {confirmPasswordError && <span className="text-[10px] text-red-500 ml-2">{confirmPasswordError}</span>}
                                    </div>

                                    <button
                                        disabled={!isSecurityValid || isLoading}
                                        className={`w-full font-display font-bold uppercase tracking-widest text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                                    ${isSecurityValid && !isLoading
                                                ? 'bg-gradient-to-r from-gardenz-terra to-[#A05E2B] text-white shadow-[0_5px_20px_rgba(224,169,107,0.4)] hover:shadow-[0_8px_30px_rgba(224,169,107,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                                                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                            }
                                `}
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" /> : <>Créer mon compte <Check size={20} /></>}
                                    </button>
                                </form>
                            )}

                            {/* --- STEP: FORGOT PASSWORD --- */}
                            {step === 'forgot-password' && (
                                <form onSubmit={handleForgotPassword} className="space-y-6 relative z-10 animate-slide-in-right">
                                    <div className="bg-white/5 px-4 py-3 rounded-xl border border-white/10 text-center">
                                        <span className="text-gray-300 text-sm font-medium">{email}</span>
                                    </div>
                                    
                                    <p className="text-sm text-gray-400 text-center mb-6">
                                        Cliquez ci-dessous pour recevoir un lien sécurisé permettant de réinitialiser votre mot de passe.
                                    </p>

                                    <button
                                        disabled={isLoading}
                                        className={`w-full font-display font-bold uppercase tracking-widest text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                                        ${!isLoading
                                            ? 'bg-white text-black hover:bg-gardenz-green hover:text-white hover:scale-[1.02] active:scale-[0.98]'
                                            : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                        }`}
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" /> : "Recevoir le lien"}
                                    </button>
                                </form>
                            )}

                            {/* --- STEP: FORGOT PASSWORD SUCCESS --- */}
                            {step === 'forgot-success' && (
                                <div className="text-center py-4 animate-fade-in px-2 relative z-10">
                                    <div className="w-20 h-20 bg-gardenz-green rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_40px_rgba(56,118,29,0.5)]">
                                        <Mail size={40} />
                                    </div>
                                    <div className="text-gray-300 text-sm leading-relaxed space-y-4 mb-8 text-left max-w-sm mx-auto">
                                        <p className="text-center">Un lien de réinitialisation vient d'être envoyé à :<br/><span className="font-bold text-white">{email}</span></p>
                                        <p className="text-center text-gray-500 text-xs mt-4">Pensez à vérifier vos courriers indésirables si vous ne le trouvez pas dans votre boîte principale.</p>
                                    </div>

                                    <button
                                        onClick={() => setStep('login')}
                                        className="bg-white text-black font-bold uppercase tracking-widest w-full py-4 rounded-xl hover:bg-gardenz-green hover:text-white transition-all shadow-lg text-sm"
                                    >
                                        Retour à la connexion
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                </div>

                {/* VII. FOOTER LEGAL */}
                <div className="mt-12 text-center text-[10px] text-gray-700 flex justify-center gap-4">
                    <Link to="/legal" className="hover:text-gray-500 transition-colors">CGU & CGV</Link>
                    <span>•</span>
                    <Link to="/mentions-legales" className="hover:text-gray-500 transition-colors">Mentions Légales</Link>
                    <span>•</span>
                    <Link to="/privacy" className="hover:text-gray-500 transition-colors">Confidentialité</Link>
                </div>

            </div>
        </div>
    );
};
