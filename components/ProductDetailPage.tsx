
import React, { useState, useRef, useEffect } from 'react';
import { ALL_PRODUCTS, REVIEWS } from '../constants';
import { ShoppingCart, Star, Check, Truck, ShieldCheck, Zap, Leaf, Moon, Wind, BrainCircuit, Sun, Maximize2, FileText, Activity, HelpCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Droplet, Clock, Heart, FlaskConical, Flame, Gift, Award, Sprout, AlertTriangle, Thermometer, TestTube, Ruler, Shirt, Scissors, Ban, RefreshCw, X, Wrench, Battery, Layers, Settings, Shield, Hourglass, BookOpen, Download, User, List, Eye, CheckCircle, Music, Play, Pause, Disc, Headphones, Wifi, Info } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { AcademySection } from './AcademySection';
import { WellnessSEOContent } from './WellnessSEOContent';
import { useCart } from '../context/CartContext';
import { Breadcrumbs } from './Breadcrumbs';
import { StockNotification } from './StockNotification';
import { Product } from '../types';
import { SEOHead } from './SEOHead';
import { getAssetUrl } from '../utils/assets';

// --- NEW SUB-COMPONENTS FOR CRO ---

const CertificateBlock: React.FC<{ url: string; isDark?: boolean }> = ({ url, isDark }) => (
    <div
        className={`rounded-xl p-4 mb-6 flex items-center justify-between group cursor-pointer transition-colors border
            ${isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-gardenz-green/5 border-gardenz-green/20 hover:bg-gardenz-green/10'}
        `} 
        onClick={() => window.open(url, '_blank')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(url, '_blank') } }}
        role="button"
        tabIndex={0}
        aria-label="Ouvrir le certificat d'analyse dans un nouvel onglet"
    >
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${isDark ? 'bg-zinc-800 text-gardenz-cyan' : 'bg-white text-gardenz-green'}`}>
                <FileText size={20} />
            </div>
            <div>
                <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gardenz-dark'}`}>Certificat d'Analyse</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Prouvé en Laboratoire Français</p>
            </div>
        </div>
        <Download size={18} className={`${isDark ? 'text-gardenz-cyan' : 'text-gardenz-green'} group-hover:scale-110 transition-transform`} />
    </div>
);

const BenefitsList: React.FC<{ benefits: string[] }> = ({ benefits }) => (
    <div className="mb-6 space-y-2">
        {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-gardenz-green shrink-0 mt-0.5" />
                <span>{benefit}</span>
            </div>
        ))}
    </div>
);

const StickyAddToCart: React.FC<{ product: Product; price: number; onAdd: () => void; isExtreme: boolean }> = ({ product, price, onAdd, isExtreme }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const addToCartBtn = document.getElementById('main-add-to-cart');
            if (addToCartBtn) {
                const rect = addToCartBtn.getBoundingClientRect();
                const shouldShow = rect.bottom < 0;
                setIsVisible(prev => {
                    if (prev !== shouldShow) {
                        window.dispatchEvent(new CustomEvent(shouldShow ? 'sticky-cta-visible' : 'sticky-cta-hidden'));
                    }
                    return shouldShow;
                });
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Cleanup: ensure other components reset when PDP unmounts
            window.dispatchEvent(new CustomEvent('sticky-cta-hidden'));
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 border-t ${isExtreme ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-200'} shadow-[0_-10px_30px_rgba(0,0,0,0.2)] animate-slide-up transition-colors duration-500`}>
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                {/* Product Info (Hidden on mobile to save space) */}
                <div className="hidden sm:flex items-center gap-4 flex-1">
                    <img src={getAssetUrl(product.image)} alt={product.name} className="w-12 h-12 rounded bg-gray-100 object-cover border border-gray-200" />
                    <div className="flex flex-col">
                        <span className={`font-bold text-sm line-clamp-1 ${isExtreme ? 'text-white' : 'text-gardenz-dark'}`}>{product.name}</span>
                        <div className="flex gap-2 text-xs">
                             <span className="text-gray-500">{product.category}</span>
                        </div>
                    </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="flex flex-col text-left sm:text-right">
                        <span className={`font-display font-bold text-xl ${isExtreme ? 'text-white' : 'text-gardenz-dark'}`}>{price.toFixed(2)}€</span>
                        <span className="text-green-600 font-medium text-[10px] flex items-center gap-1"><Truck size={10} /> Livraison 24/48h</span>
                    </div>
                    <button
                        onClick={onAdd}
                        className={`${isExtreme ? 'bg-gardenz-cyan text-black hover:bg-gardenz-magenta hover:text-white' : 'bg-gardenz-green text-white hover:bg-gardenz-dark'} font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95 whitespace-nowrap`}
                    >
                        <ShoppingCart size={18} /> Ajouter <span className="hidden lg:inline">au panier</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ProductDetailPageProps {
    productId: string;
    onBack: () => void;
    onProductClick: (id: string) => void;
    onNavigate: (page: string, params?: any) => void;
    onQuickView?: (product: Product) => void;
}

// --- SUB-COMPONENTS & HELPERS ---

const SizeGuideModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
            <div 
                className="absolute inset-0"
                onClick={onClose}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose(); }}
                role="button"
                tabIndex={-1}
                aria-label="Fermer le guide des tailles"
            ></div>
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative z-10" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} aria-label="Fermer la modale" className="absolute top-4 right-4 text-gray-400 hover:text-black">
                    <X size={24} />
                </button>
                <div className="p-8">
                    <h3 className="font-display text-2xl font-bold text-gardenz-dark mb-2 flex items-center gap-2">
                        <Ruler className="text-indigo-500" /> Guide des Tailles
                    </h3>
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-xs">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-lg">Taille</th>
                                    <th className="px-4 py-3">Poitrine (cm)</th>
                                    <th className="px-4 py-3">Longueur (cm)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr><td className="px-4 py-3 font-bold">S</td><td className="px-4 py-3">54</td><td className="px-4 py-3">68</td></tr>
                                <tr><td className="px-4 py-3 font-bold">M</td><td className="px-4 py-3">57</td><td className="px-4 py-3">71</td></tr>
                                <tr><td className="px-4 py-3 font-bold">L</td><td className="px-4 py-3">60</td><td className="px-4 py-3">74</td></tr>
                                <tr><td className="px-4 py-3 font-bold">XL</td><td className="px-4 py-3">63</td><td className="px-4 py-3">77</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookExcerptModal: React.FC<{ isOpen: boolean; onClose: () => void; bookTitle: string }> = ({ isOpen, onClose, bookTitle }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="excerpt-title">
            <div 
                className="absolute inset-0"
                onClick={onClose}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose(); }}
                role="button"
                tabIndex={-1}
                aria-label="Fermer l'extrait"
            ></div>
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[80vh] flex flex-col z-10" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} aria-label="Fermer la modale" className="absolute top-4 right-4 text-gray-400 hover:text-black z-10">
                    <X size={24} />
                </button>
                <div className="p-8 overflow-y-auto">
                    <h3 id="excerpt-title" className="font-display text-2xl font-bold text-gardenz-dark mb-1">Extrait Offert</h3>
                    <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest">{bookTitle}</p>
                    <div className="prose prose-sm prose-stone font-serif leading-relaxed">
                        <p>« Le chanvre n'est pas qu'une plante, c'est une histoire millénaire qui se redécouvre à chaque génération. Dans ce chapitre, nous explorerons les origines méconnues de son utilisation textile... »</p>
                        <p>... (Contenu de l'extrait simulé pour la démonstration) ...</p>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <button onClick={onClose} className="text-indigo-600 font-bold text-sm hover:underline">Fermer l'extrait</button>
                </div>
            </div>
        </div>
    );
};

const LifestyleSEOBlock: React.FC<{ category: string }> = ({ category }) => (
    <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
        <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><Info size={16} /> En savoir plus sur la gamme {category.split(' / ')[0]}</h4>
        <p className="text-sm text-gray-500">
            Nos produits {category} sont conçus pour s'intégrer à votre quotidien avec style et éthique.
            Matériaux durables, design exclusif Gardenz et production responsable sont au cœur de notre démarche LifeStyle.
        </p>
    </div>
);

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(30);
    return (
        <div className="bg-[#111] p-3 sm:p-4 rounded-xl border border-gray-800 text-white mb-6 overflow-hidden">
            <div className="flex items-center gap-2 sm:gap-4">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-gardenz-green rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </button>
                <div className="flex-grow min-w-0">
                    <p className="font-bold text-xs sm:text-sm truncate">Gardenz Anthem (Lo-Fi Remix)</p>
                    <div className="w-full h-1 bg-gray-700 rounded-full mt-2 relative">
                        <div className="absolute top-0 left-0 h-full bg-gardenz-green rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <span className="text-[10px] sm:text-xs font-mono text-gray-400 shrink-0">1:42</span>
            </div>
        </div>
    );
};

const DosageCalculator: React.FC<{ product: Product }> = ({ product }) => {
    const [weight, setWeight] = useState<number | ''>('');
    const [intensity, setIntensity] = useState('Modéré');
    const [recommendation, setRecommendation] = useState<string | null>(null);

    const baseDosage = product.dosage ? parseInt(product.dosage.base) : 3;
    const unit = product.dosage ? product.dosage.unit : 'gouttes';

    useEffect(() => {
        if (!weight) {
            setRecommendation(null);
            return;
        }
        let multiplier = 1;
        if (intensity === 'Léger') multiplier = 0.8;
        if (intensity === 'Fort') multiplier = 1.5;

        // Simple formula: (Weight / 10) * multiplier / 2 (approximate for 10% oil)
        // This is a mockup logic, can be refined.
        let calc = Math.round((Number(weight) / 10) * multiplier * 0.5);
        if (calc < 1) calc = 1;

        // Adjust based on base dosage defined in constant
        calc = Math.max(calc, baseDosage - 1); // Ensure it's not too low compared to base

        setRecommendation(`${calc} ${unit}`);
    }, [weight, intensity, baseDosage, unit]);

    return (
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 mb-8 animate-fade-in">
            <h3 className="font-bold text-gardenz-green mb-4 flex items-center gap-2"><Activity size={18} /> Calculateur de Dosage Express</h3>
            <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                <div>
                    <label className="block text-gray-500 mb-1 text-xs uppercase tracking-wide">Poids (kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        placeholder="70"
                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gardenz-dark focus:ring-2 focus:ring-gardenz-green/20 focus:border-gardenz-green transition-all outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-500 mb-1 text-xs uppercase tracking-wide">Intensité désirée</label>
                    <div className="relative">
                        <select
                            value={intensity}
                            onChange={(e) => setIntensity(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gardenz-dark appearance-none focus:ring-2 focus:ring-gardenz-green/20 focus:border-gardenz-green transition-all outline-none"
                        >
                            <option>Léger</option>
                            <option>Modéré</option>
                            <option>Fort</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
            <div className="mt-6 pt-6 border-t border-green-200 text-center">
                {recommendation ? (
                    <div className="animate-scale-in">
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Votre recommandation personnalisée</p>
                        <p className="text-2xl font-bold text-gardenz-dark">
                            <span className="text-gardenz-green">{recommendation}</span> <span className="text-base font-normal text-gray-400">(Matin & Soir)</span>
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm italic">Entrez votre poids pour voir le dosage</p>
                )}
            </div>
        </div>
    );
};

const ExtremePotencyGuide = () => (
    <div className="bg-black text-white p-6 rounded-2xl border border-gardenz-magenta/30 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gardenz-magenta/20 rounded-full blur-3xl"></div>
        <h3 className="font-display font-bold text-gardenz-magenta mb-4 flex items-center gap-2 relative z-10"><Zap size={18} /> Guide de Puissance</h3>

        <div className="space-y-4 relative z-10">
            <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gardenz-cyan">Soft</span>
                    <span className="text-gray-500">Medium</span>
                    <span className="text-gardenz-magenta">Hardcore</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-gardenz-cyan via-yellow-400 to-gardenz-magenta"></div>
                </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
                Ce produit se situe dans la zone <strong className="text-white">Medium to Hardcore</strong>.
                Effets psychoactifs marqués. Ne pas conduire.
            </p>
        </div>
    </div>
);

// --- TAB CONTENT COMPONENTS ---

const ReviewList = () => (
    <div className="space-y-6">
        {REVIEWS.slice(0, 3).map(review => (
            <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400 text-xs">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />)}
                    </div>
                    <span className="font-bold text-sm">{review.author}</span>
                </div>
                <p className="text-sm text-gray-600 italic">"{review.text}"</p>
            </div>
        ))}
    </div>
);

const WellnessTabs: React.FC<any> = ({ product, activeTab, setActiveTab, containerRef }) => (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
            {['routine', 'ingredients', 'avis'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'text-gardenz-green border-b-2 border-gardenz-green bg-green-50/50' : 'text-gray-400 hover:text-gardenz-dark'}`}
                >
                    {tab === 'routine' ? 'Rituel' : tab === 'ingredients' ? 'Composition' : 'Avis (128)'}
                </button>
            ))}
        </div>
        <div className="p-8 min-h-[200px]">
            {activeTab === 'routine' && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="font-display text-lg font-bold text-gardenz-dark">Le Rituel Gardenz</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                        {product.usageTips || "Pour une efficacité optimale, intégrez ce produit à votre routine quotidienne."}
                    </p>

                    {/* DYNAMIC CHECKLIST */}
                    {product.checklist && (
                        <div className="space-y-3 mt-4">
                            {product.checklist.map((step: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="w-6 h-6 rounded-full bg-gardenz-green/20 text-gardenz-green flex items-center justify-center font-bold text-xs shrink-0">
                                        {i + 1}
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium">{step}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-4 mt-4">
                        <div className="bg-green-50 p-4 rounded-xl text-center flex-1 border border-green-100">
                            <Sun size={24} className="mx-auto text-gardenz-green mb-2" />
                            <span className="text-xs font-bold text-gardenz-dark block uppercase tracking-wide">Matin</span>
                            <span className="text-[10px] text-gray-500">Éveil en douceur</span>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-xl text-center flex-1 border border-indigo-100">
                            <Moon size={24} className="mx-auto text-indigo-500 mb-2" />
                            <span className="text-xs font-bold text-gardenz-dark block uppercase tracking-wide">Soir</span>
                            <span className="text-[10px] text-gray-500">Détente profonde</span>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'ingredients' && (
                <div className="animate-fade-in">
                    <ul className="space-y-3 text-gray-600 text-sm">
                        {product.composition ? product.composition.map((item: string, i: number) => (
                            <li key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <CheckCircle size={16} className="text-gardenz-green shrink-0" />
                                {item}
                            </li>
                        )) : (
                            <>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gardenz-green" /> Huile MCT Coco Bio</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gardenz-green" /> Extrait de Chanvre Full Spectrum</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gardenz-green" /> Terpènes naturels</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gardenz-green" /> <span className="font-bold">0% THC</span> (Trace &lt; 0.05%)</li>
                            </>
                        )}
                    </ul>
                </div>
            )}
            {activeTab === 'avis' && <div className="animate-fade-in"><ReviewList /></div>}
        </div>
    </div>
);

const ExtremeTabs: React.FC<any> = ({ product, activeTab, setActiveTab, containerRef }) => (
    <div ref={containerRef} className="bg-[#1A1A1A] rounded-2xl border border-gray-800 overflow-hidden">
        <div className="flex border-b border-gray-800">
            {['usage', 'lab', 'feedback'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'text-gardenz-cyan border-b-2 border-gardenz-cyan bg-gardenz-cyan/5' : 'text-gray-500 hover:text-white'}`}
                >
                    {tab === 'usage' ? 'Usage' : tab === 'lab' ? 'Lab Report' : 'Avis'}
                </button>
            ))}
        </div>
        <div className="p-8 min-h-[200px] text-gray-300">
            {activeTab === 'usage' && (
                <div className="animate-fade-in space-y-4">
                    <div className="flex items-start gap-3 bg-gardenz-magenta/10 border border-gardenz-magenta/30 p-4 rounded-lg">
                        <AlertTriangle className="text-gardenz-magenta shrink-0" />
                        <p className="text-xs text-white">Produit concentré. Commencez toujours par une petite quantité (ex: 1 bouffée ou 1/2 gummy) et attendez 30min.</p>
                    </div>
                    <p>Mode de consommation recommandé : Vaporisation ou Ingestion.</p>
                </div>
            )}
            {activeTab === 'lab' && (
                <div className="animate-fade-in">
                    <div className="flex justify-between items-center bg-black p-4 rounded-lg border border-gray-700 mb-4">
                        <div className="flex items-center gap-3">
                            <FileText className="text-gardenz-cyan" />
                            <div>
                                <p className="text-white font-bold text-sm">Certificat d'Analyse.pdf</p>
                                <p className="text-xs text-gray-500">Lot #GZ-2025-X42</p>
                            </div>
                        </div>
                        <button className="text-gardenz-cyan text-xs font-bold uppercase hover:underline">Voir</button>
                    </div>
                    <ul className="space-y-1 text-xs text-gray-400">
                        <li>Cannabinoïdes: 96%</li>
                        <li>Terpènes: 4%</li>
                        <li>Métaux lourds: Non détecté</li>
                    </ul>
                </div>
            )}
            {activeTab === 'feedback' && <div className="animate-fade-in"><ReviewList /></div>}
        </div>
    </div>
);

const LifestyleClothingTabs: React.FC<any> = ({ activeTab, setActiveTab, containerRef }) => (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
            {['details', 'entretien', 'avis'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-400 hover:text-gardenz-dark'}`}
                >
                    {tab === 'details' ? 'Détails' : tab === 'entretien' ? 'Entretien' : 'Avis'}
                </button>
            ))}
        </div>
        <div className="p-8 min-h-[200px]">
            {activeTab === 'details' && (
                <div className="space-y-4 animate-fade-in text-sm text-gray-600">
                    <p>Une coupe moderne, oversize juste ce qu'il faut. Conçu pour le confort urbain et le style décontracté.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>100% Coton Bio Certifié GOTS</li>
                        <li>Grammage lourd (400g/m²) pour une tenue parfaite</li>
                        <li>Sérigraphie artisanale réalisée à Paris</li>
                        <li>Étiquette tissée Gardenz Collection</li>
                    </ul>
                </div>
            )}
            {activeTab === 'entretien' && (
                <div className="space-y-4 animate-fade-in text-sm text-gray-600">
                    <div className="flex gap-4">
                        <div className="text-center"><RefreshCw size={24} className="mx-auto mb-1 text-gray-400" /> <span className="text-xs">30°C Envers</span></div>
                        <div className="text-center"><Ban size={24} className="mx-auto mb-1 text-gray-400" /> <span className="text-xs">Pas de javel</span></div>
                        <div className="text-center"><Wind size={24} className="mx-auto mb-1 text-gray-400" /> <span className="text-xs">Séchage air</span></div>
                    </div>
                    <p className="mt-4 text-xs italic">Pour préserver le motif, repassez toujours sur l'envers.</p>
                </div>
            )}
            {activeTab === 'avis' && <div className="animate-fade-in"><ReviewList /></div>}
        </div>
    </div>
);

const LifestyleAccessoriesTabs: React.FC<any> = ({ activeTab, setActiveTab, containerRef, product }) => (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
            {['specs', 'compatibility', 'avis'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-400 hover:text-gardenz-dark'}`}
                >
                    {tab === 'specs' ? 'Tech Specs' : tab === 'compatibility' ? 'Usage' : 'Avis'}
                </button>
            ))}
        </div>
        <div className="p-8 min-h-[200px]">
            {activeTab === 'specs' && (
                <div className="animate-fade-in text-sm text-gray-600">
                    <h4 className="font-bold text-gardenz-dark mb-2">Spécifications Techniques</h4>
                    <ul className="space-y-2">
                        <li>Matériau : Aluminium Aérospatial / Céramique</li>
                        <li>Dimensions : Compact & Ergonomique</li>
                        <li>Durabilité : Garantie 2 ans constructeur</li>
                    </ul>
                </div>
            )}
            {activeTab === 'compatibility' && (
                <div className="animate-fade-in text-sm text-gray-600">
                    <p>Idéal pour une utilisation avec nos Fleurs CBD ou Résines. Nettoyage facile avec de l'alcool isopropylique.</p>
                </div>
            )}
            {activeTab === 'avis' && <div className="animate-fade-in"><ReviewList /></div>}
        </div>
    </div>
);

const LifestyleBookTabs: React.FC<any> = ({ activeTab, setActiveTab, containerRef }) => (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
            {['content', 'author', 'avis'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-400 hover:text-gardenz-dark'}`}
                >
                    {tab === 'content' ? 'Résumé' : tab === 'author' ? 'Auteur' : 'Avis'}
                </button>
            ))}
        </div>
        <div className="p-8 min-h-[200px]">
            {activeTab === 'content' && (
                <div className="animate-fade-in text-sm text-gray-600 leading-relaxed">
                    <p>Une plongée fascinante dans l'univers du chanvre. De l'histoire ancienne aux techniques modernes d'extraction, ce livre est la bible indispensable pour tout amateur éclairé.</p>
                    <p className="mt-4 font-bold text-gardenz-dark">Au sommaire :</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Histoire & Botanique</li>
                        <li>Le Système Endocannabinoïde</li>
                        <li>Cuisine & Terpènes</li>
                    </ul>
                </div>
            )}
            {activeTab === 'author' && (
                <div className="animate-fade-in flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div>
                        <h4 className="font-bold text-gardenz-dark">Dr. Green</h4>
                        <p className="text-xs text-gray-500">Expert Botaniste & Auteur</p>
                        <p className="text-sm text-gray-600 mt-2">Passionné par la plante depuis 20 ans, il vulgarise la science du cannabis pour le grand public.</p>
                    </div>
                </div>
            )}
            {activeTab === 'avis' && <div className="animate-fade-in"><ReviewList /></div>}
        </div>
    </div>
);

const LifestyleMusicTabs: React.FC<any> = ({ activeTab, setActiveTab, containerRef }) => (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
            {['tracklist', 'credits', 'avis'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-400 hover:text-gardenz-dark'}`}
                >
                    {tab === 'tracklist' ? 'Pistes' : tab === 'credits' ? 'Crédits' : 'Avis'}
                </button>
            ))}
        </div>
        <div className="p-8 min-h-[200px]">
            {activeTab === 'tracklist' && (
                <div className="animate-fade-in">
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600 font-medium">
                        <li>Morning Haze (Intro) - 02:30</li>
                        <li>Green Balcony - 03:45</li>
                        <li>CBD Dreams - 04:10</li>
                        <li>Late Night Session - 03:55</li>
                        <li>Outro - 01:20</li>
                    </ol>
                </div>
            )}
            {activeTab === 'credits' && (
                <div className="animate-fade-in text-sm text-gray-600">
                    <p>Produit par Gardenz Studio.</p>
                    <p>Mixage : DJ Vibe.</p>
                    <p>Mastering : Analog Lab Paris.</p>
                </div>
            )}
            {activeTab === 'avis' && <div className="animate-fade-in"><ReviewList /></div>}
        </div>
    </div>
);


// --- MAIN COMPONENT ---

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onBack, onProductClick, onNavigate, onQuickView }) => {
    const product = ALL_PRODUCTS.find(p => p.id === productId);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [isExcerptOpen, setIsExcerptOpen] = useState(false);

    // MEDIA GALLERY STATE
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
    const images = product?.images && product.images.length > 0 
        ? product.images.map(img => getAssetUrl(img)) 
        : [getAssetUrl(product?.image || '')];
    const isVideoSelected = selectedMediaIndex === images.length;
    const productVideo = getAssetUrl(product?.video || '/medias/video.mp4');
    const currentMedia = !isVideoSelected ? images[selectedMediaIndex] : null;

    // TAB STATES
    const [activeTab, setActiveTab] = useState<'routine' | 'ingredients' | 'avis'>('routine');
    const [extremeActiveTab, setExtremeActiveTab] = useState<'usage' | 'lab' | 'feedback'>('usage');
    const [lifestyleTab, setLifestyleTab] = useState<'details' | 'entretien' | 'avis'>('details');
    const [accessoryTab, setAccessoryTab] = useState<'specs' | 'compatibility' | 'avis'>('specs');
    const [bookTab, setBookTab] = useState<'content' | 'author' | 'avis'>('content');
    const [musicTab, setMusicTab] = useState<'tracklist' | 'credits' | 'avis'>('tracklist');
    const reviewsRef = useRef<HTMLDivElement>(null);
    const certificateRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);

    const isExtreme = product?.universe === 'extreme';
    const isLifestyle = product?.universe === 'lifestyle';
    const isWellness = product?.universe === 'wellness';
    const isFlower = product?.category === 'Fleurs';
 
    const similarProducts = ALL_PRODUCTS
        .filter(p => p.universe === product.universe && p.id !== product.id)
        .slice(0, 12);

    // Specific checks for Lifestyle Sub-categories
    const isClothing = isLifestyle && product?.category.includes('Vêtements');
    const isAccessory = isLifestyle && (product?.category.includes('Accessoires') || product?.category.includes('Grinders') || product?.category.includes('Vaporisateurs'));
    const isBook = isLifestyle && product?.category.includes('Livres');
    const isMusic = isLifestyle && product?.category.includes('Musique');
 
    // CAROUSEL STATE
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, [productId, similarProducts?.length]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // STOCK CHECK
    const isOutOfStock = product?.stock === 0;

    const scrollToReviews = () => {
        if (isExtreme) setExtremeActiveTab('feedback');
        else if (isLifestyle && isClothing) setLifestyleTab('avis');
        else if (isLifestyle && isAccessory) setAccessoryTab('avis');
        else if (isLifestyle && isBook) setBookTab('avis');
        else if (isLifestyle && isMusic) setMusicTab('avis');
        else if (isWellness) setActiveTab('avis');

        setTimeout(() => {
            tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleLabTestedClick = () => {
        if (isExtreme) setExtremeActiveTab('lab');
        else if (isWellness) setActiveTab('ingredients');

        setTimeout(() => {
            tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const scrollToCertificate = () => {
        certificateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    // WELLNESS SPECIFIC STATE
    const [selectedConcentration, setSelectedConcentration] = useState('10%');
    const concentrations = ['5%', '10%', '20%', '30%'];

    // EXTREME SPECIFIC STATE
    const [selectedExtremeConcentration, setSelectedExtremeConcentration] = useState('20%');
    const extremeConcentrations = ['20%', '40%', '60%', '90%'];

    // LIFESTYLE CLOTHING SPECIFIC STATE
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Noir');
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    // LIFESTYLE BOOK SPECIFIC STATE
    const [bookFormat, setBookFormat] = useState<'Physique' | 'Ebook'>('Physique');

    // LIFESTYLE MUSIC SPECIFIC STATE
    const [musicFormat, setMusicFormat] = useState<'Physique' | 'Digital'>('Physique');

    // FLOWER TIERED PRICING STATE
    const [selectedTierIndex, setSelectedTierIndex] = useState(0);

    const clothingSizes = ['S', 'M', 'L', 'XL'];
    const clothingColors = [
        { name: 'Noir', hex: '#111' },
        { name: 'Blanc', hex: '#F5F5F5' },
        { name: 'Vert', hex: '#38761D' },
        { name: 'Tie-Dye', hex: 'linear-gradient(45deg, #FF00FF, #00FFFF)' }
    ];

    const getStockStatus = (size: string) => {
        if (size === 'XL' && Math.random() > 0.7) return 'Epuisé';
        if (size === 'S' && Math.random() > 0.8) return 'Faible';
        return 'En stock';
    };

    const { addToCart } = useCart();

    const [zoomState, setZoomState] = useState({ show: false, x: 0, y: 0 });
    const imageContainerRef = useRef<HTMLDivElement>(null);

    if (!product) return <div className="pt-32 text-center">Produit non trouvé</div>;

    const isLightMode = !isExtreme;

    const bgClass = isLightMode ? 'bg-gardenz-white' : 'bg-gardenz-black';
    const textMain = isLightMode ? 'text-gardenz-dark' : 'text-white';
    const textSub = isLightMode ? 'text-gray-500' : 'text-gray-400';
    const accentColor = isExtreme ? 'text-gardenz-cyan' : isLifestyle ? 'text-indigo-500' : 'text-gardenz-green';

    const btnPrimary = isExtreme
        ? 'bg-transparent border-2 border-gardenz-magenta text-white hover:bg-gardenz-magenta hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]'
        : isLifestyle
            ? 'bg-gardenz-dark text-white hover:bg-indigo-600 shadow-lg'
            : 'bg-gardenz-green text-white hover:bg-gardenz-terra shadow-lg';

    // Pricing Logic
    const getVariantPrice = () => {
        if (isFlower && product.tieredPrices && product.tieredPrices.length > 0) {
            return product.tieredPrices[selectedTierIndex].price;
        }
        const basePrice = product.price;
        if (isWellness) {
            switch (selectedConcentration) {
                case '5%': return basePrice;
                case '10%': return basePrice + 10;
                case '20%': return basePrice + 25;
                case '30%': return basePrice + 40;
                default: return basePrice;
            }
        }
        if (isExtreme) {
            switch (selectedExtremeConcentration) {
                case '20%': return basePrice;
                case '40%': return basePrice + 15;
                case '60%': return basePrice + 30;
                case '90%': return basePrice + 50;
                default: return basePrice;
            }
        }
        if (isBook && bookFormat === 'Ebook') return basePrice * 0.7;
        if (isMusic && musicFormat === 'Digital') return basePrice * 0.8;
        return basePrice;
    };

    const unitPrice = getVariantPrice();
    const currentPrice = unitPrice * quantity;

    const isFullSpectrum = product.universe === 'wellness' && product.category.includes('Huiles');
    const isPremium = product.price >= 60;
    const isLabTested = ['Fleurs', 'Résines', 'Concentrés', 'Vape'].some(c => product.category.includes(c));

    const breadcrumbItems: { label: string; action?: () => void; path?: string }[] = [
        { label: 'Boutique', path: '/boutique' },
        {
            label: isExtreme ? 'eXtreme Lab' : isLifestyle ? 'LifeStyle' : 'Bien-être',
            path: `/boutique?filter=${product.universe}`
        }
    ];

    if (isWellness && product.tags.length > 0) {
        breadcrumbItems.push({
            label: product.tags[0],
            path: `/boutique?filter=${product.universe}&usage=${product.tags[0]}`
        });
    }
    if (isExtreme && product.intensity) {
        breadcrumbItems.push({
            label: product.intensity,
            path: `/boutique?filter=${product.universe}&intensity=${product.intensity}`
        });
    }

    breadcrumbItems.push({
        label: product.category,
        path: `/boutique?filter=${product.universe}&category=${encodeURIComponent(product.category)}`
    });

    breadcrumbItems.push({ label: product.name });

    const getIntensityConfig = () => {
        let label = 'MEDIUM';
        let badgeClass = 'border-gardenz-cyan text-gardenz-cyan shadow-[0_0_10px_rgba(0,255,255,0.4)]';
        if (product.intensity) {
            if (product.intensity === 'Soft') { label = 'SOFT'; badgeClass = 'border-gardenz-cyan text-gardenz-cyan bg-gardenz-cyan/10 shadow-[0_0_10px_rgba(0,255,255,0.4)]'; }
            if (product.intensity === 'Medium') { label = 'MEDIUM'; badgeClass = 'border-[#FF9F1C] text-[#FF9F1C] bg-[#FF9F1C]/10 shadow-[0_0_10px_rgba(255,159,28,0.4)]'; }
            if (product.intensity === 'Hardcore') { label = 'HARDCORE'; badgeClass = 'border-gardenz-magenta text-gardenz-magenta bg-gardenz-magenta/10 shadow-[0_0_15px_rgba(255,0,255,0.6)] animate-pulse'; }
        }
        return { label, badgeClass };
    };

    const intensityConfig = getIntensityConfig();

    const renderUsageBadges = () => {
        if (!isWellness) return null;
        const usageMap: Record<string, { icon: React.ReactNode, label: string }> = {
            'Relaxation': { icon: <Wind size={16} />, label: 'Relaxation' },
            'Stress': { icon: <BrainCircuit size={16} />, label: 'Stress' },
            'Focus': { icon: <Sun size={16} />, label: 'Focus' },
        };
        const hasSommeil = product.tags.includes('Sommeil');
        const foundUsages = product.tags.filter(tag => usageMap[tag]);
        
        return (
            <div className="flex flex-wrap items-center gap-2">
                {foundUsages.map(tag => {
                    const config = usageMap[tag];
                    return (
                        <div key={tag} className="flex items-center gap-2 px-3 py-1 rounded-full bg-gardenz-green text-white shadow-sm">
                            <span>{config.icon}</span>
                            <span className="text-xs font-bold uppercase tracking-wider">{config.label}</span>
                        </div>
                    );
                })}
                {hasSommeil && (
                    <button 
                        onClick={scrollToCertificate}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-white text-gardenz-green border border-gardenz-green/30 hover:bg-gardenz-green/5 transition-all cursor-pointer shadow-sm group"
                    >
                        <FlaskConical size={14} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-wider">Lab Tested</span>
                    </button>
                )}
            </div>
        );
    };

    const handleAddToCart = () => {
        let productName = product.name;
        if (isWellness && (product.category.includes('Huiles') || product.category.includes('Fleurs'))) productName = `${product.name} - ${selectedConcentration}`;
        if (isExtreme && ['Concentrés', 'Huiles', 'Vape', 'Résines', 'Comestibles', 'Fleurs'].some(c => product.category.includes(c))) productName = `${product.name} - ${selectedExtremeConcentration}`;
        if (isClothing) productName = `${product.name} - ${selectedColor} / ${selectedSize}`;
        if (isBook) productName = `${product.name} - Format ${bookFormat}`;
        if (isMusic) productName = `${product.name} - Format ${musicFormat}`;
        if (isFlower && product.tieredPrices && product.tieredPrices[selectedTierIndex]) {
            const tier = product.tieredPrices[selectedTierIndex];
            productName = `${product.name} - ${tier.amount}${tier.unit}`;
        }

        const productToAdd = { ...product, price: unitPrice, name: productName };
        addToCart(productToAdd, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Disable zoom effect on touch devices (pointer: coarse = mobile/tablet)
        if (window.matchMedia('(pointer: coarse)').matches) return;
        if (!imageContainerRef.current) return;
        const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomState({ show: true, x, y });
    };

    const handleMouseLeave = () => {
        setZoomState({ ...zoomState, show: false });
    };

    // RENDER TRANSACTION BLOCK - MODIFIED FOR STOCK MANAGEMENT
    const renderTransactionBlock = () => {
        // If Out of Stock, show notification form
        if (isOutOfStock) {
            return <StockNotification productName={product.name} variant={isExtreme ? 'dark' : 'light'} />;
        }

        // Otherwise show normal buy block
        return (
            <>

                <div className="flex items-center gap-4 mb-6">
                    <div className={`flex items-center border rounded-full px-4 py-3 ${isExtreme ? 'border-gray-700 bg-[#222] text-white' : 'border-gray-200 bg-white text-gardenz-dark'}`}>
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Diminuer la quantité" className={`hover:${accentColor} font-bold text-lg px-2`}>-</button>
                        <span className="mx-4 font-bold w-4 text-center" aria-live="polite">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} aria-label="Augmenter la quantité" className={`hover:${accentColor} font-bold text-lg px-2`}>+</button>
                    </div>

                    <button
                        id="main-add-to-cart"
                        onClick={handleAddToCart}
                        disabled={isClothing && getStockStatus(selectedSize) === 'Epuisé'}
                        className={`flex-grow py-4 px-6 rounded-full font-bold uppercase tracking-widest transition-all transform active:scale-95 flex items-center justify-center gap-2 
                            ${isClothing && getStockStatus(selectedSize) === 'Epuisé'
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : btnPrimary
                            }
                        `}
                    >
                        {isAdded ? (
                            <><Check size={20} /> Ajouté</>
                        ) : (
                            <><ShoppingCart size={20} /> {isClothing && getStockStatus(selectedSize) === 'Epuisé' ? 'Rupture' : <>Ajouter<span className="hidden [@media(min-width:480px)]:inline"> au panier</span></>}</>
                        )}
                    </button>
                </div>
            </>
        );
    };

    // SCHEMA.ORG JSON-LD GENERATION
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.metaDescription || product.shortDescription || `Achetez ${product.name} chez Gardenz.`,
        "sku": product.id,
        "brand": {
            "@type": "Brand",
            "name": "Gardenz"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "EUR",
            "price": currentPrice.toFixed(2),
            "availability": isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": currentPrice > 60 ? 0 : 4.90,
                    "currency": "EUR"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 0,
                        "maxValue": 1,
                        "unitCode": "d"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 2,
                        "unitCode": "d"
                    }
                }
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "128"
        }
    };

    return (
        <>
            <SEOHead
                title={product.metaTitle || `${product.name} | Gardenz`}
                description={product.metaDescription || `Découvrez ${product.name}, notre produit ${product.universe} d'excellence.`}
                schema={schema}
            />
            {/* STICKY ADD TO CART */}
            <StickyAddToCart product={product} price={currentPrice} onAdd={handleAddToCart} isExtreme={isExtreme} />

            <div className={`min-h-screen pt-24 pb-0 ${bgClass} transition-colors duration-500`}>

                {/* Modal Guide des Tailles */}
                <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

                {/* Modal Extrait Livre */}
                <BookExcerptModal isOpen={isExcerptOpen} onClose={() => setIsExcerptOpen(false)} bookTitle={product.name} />

                {/* Breadcrumbs Navigation */}
                <div className="max-w-7xl mx-auto px-6 mb-8">
                    <Breadcrumbs
                        items={breadcrumbItems}
                        theme={isExtreme ? 'dark' : 'light'}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 relative">

                    {/* --- LEFT COLUMN: VISUALS + RICH CONTENT --- */}
                    {/* order-2 on mobile: images come AFTER the transactional block */}
                    <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">

                        {/* Media Gallery Section: Main Image + Vertical Thumbnails */}
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Main Image Area */}
                            <div
                                ref={imageContainerRef}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className={`flex-1 aspect-square rounded-3xl overflow-hidden relative cursor-crosshair group ${isExtreme ? 'bg-[#111] border border-gray-800' : 'bg-white border border-gray-100 shadow-md'}`}
                            >
                                {isVideoSelected ? (
                                    <div className="relative w-full h-full">
                                        <video
                                            src={productVideo}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            controls
                                            className="w-full h-full object-cover"
                                        />
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedMediaIndex(0);
                                            }}
                                            className="absolute top-4 right-4 z-30 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm transition-all"
                                            title="Fermer la vidéo"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <img
                                            src={currentMedia}
                                            alt={product.name}
                                            className={`w-full h-full object-cover transition-opacity duration-300 ${zoomState.show ? 'opacity-0' : 'opacity-100'} ${isOutOfStock ? 'grayscale opacity-70' : ''}`}
                                        />
                                        <div
                                            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                                            style={{
                                                opacity: zoomState.show && !isOutOfStock ? 1 : 0,
                                                backgroundImage: `url(${currentMedia})`,
                                                backgroundPosition: `${zoomState.x}% ${zoomState.y}%`,
                                                backgroundSize: '250%'
                                            }}
                                        />
                                    </>
                                )}

                                {isOutOfStock && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-20 pointer-events-none">
                                        <div className="bg-white/90 backdrop-blur-sm text-black border-2 border-black font-display font-bold px-6 py-3 text-lg uppercase tracking-widest shadow-xl transform -rotate-6">
                                            Rupture de Stock
                                        </div>
                                    </div>
                                )}

                                {!isVideoSelected && (
                                    <div className={`absolute bottom-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${zoomState.show ? 'hidden' : 'block'}`}>
                                        <Maximize2 size={20} />
                                    </div>
                                )}

                                {/* Lifestyle Model Info Badge */}
                                {isClothing && (
                                    <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-gardenz-dark text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 animate-fade-in pointer-events-none">
                                        <Shirt size={14} className="text-indigo-500" />
                                        <div>
                                            <span className="block">Modèle: 1m80</span>
                                            <span className="block text-gray-500 font-normal">Porte du L</span>
                                        </div>
                                    </div>
                                )}

                                {/* TOP LEFT STACK (Hot, New, Limited, Gift) */}
                                <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2 pointer-events-none">
                                    {product.isHot && (
                                        <span className="bg-[#DC2626] text-white text-xs font-bold px-3 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wider animate-pulse">
                                            <Flame size={12} fill="currentColor" /> TOP VENTE
                                        </span>
                                    )}
                                    {product.isNew && !isWellness && (
                                        <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded shadow-md uppercase tracking-wider">
                                            NOUVEAU
                                        </span>
                                    )}
                                    {product.isLimited && !isOutOfStock && (
                                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wider">
                                            <Clock size={12} /> STOCK LIMITÉ
                                        </span>
                                    )}
                                    {product.hasGift && (
                                        <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wider">
                                            <Gift size={12} /> + CADEAU
                                        </span>
                                    )}
                                </div>

                                {/* BOTTOM LEFT STACK */}
                                <div className="absolute bottom-4 left-4 z-10 flex flex-col items-start gap-2 pointer-events-none">
                                    {isPremium ? (
                                        <span className="bg-[#1A1A1A] text-[#E0A96B] border border-[#E0A96B]/50 text-xs font-bold px-3 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wide">
                                            <Award size={12} /> PREMIUM SELECTION
                                        </span>
                                    ) : isFullSpectrum ? (
                                        <span className="bg-emerald-900/90 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wide">
                                            <Sprout size={12} /> FULL SPECTRUM
                                        </span>
                                    ) : isLabTested ? (
                                        <span className="bg-zinc-800/90 backdrop-blur-md text-zinc-300 border border-zinc-600/50 text-xs font-bold px-3 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wide">
                                            <FlaskConical size={12} /> TESTÉ EN LABO
                                        </span>
                                    ) : null}

                                    {product.isTeamChoice && (
                                        <span className="bg-[#2563EB] text-white border border-blue-400/30 text-xs font-bold px-3 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wide">
                                            <Heart size={12} fill="currentColor" /> CHOIX DE L'ÉQUIPE
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* VERTICAL THUMBNAILS (Right side on Desktop) */}
                            <div className="flex flex-row md:flex-col gap-3 w-full md:w-20 lg:w-24 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                                {images.map((img, i) => {
                                    const isSelected = selectedMediaIndex === i;

                                    return (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedMediaIndex(i)}
                                            className={`aspect-square w-16 md:w-full shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all relative
                                            ${isSelected
                                                    ? (isExtreme ? 'border-gardenz-cyan opacity-100 scale-105' : 'border-gardenz-green opacity-100 scale-105')
                                                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
                                                }
                                        `}
                                        >
                                            <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                                        </div>
                                    );
                                })}
                                
                                {/* Video Thumbnail (Always Present) */}
                                <div
                                    onClick={() => setSelectedMediaIndex(images.length)}
                                    className={`aspect-square w-16 md:w-full shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all relative
                                    ${isVideoSelected
                                            ? (isExtreme ? 'border-gardenz-cyan opacity-100 scale-105' : 'border-gardenz-green opacity-100 scale-105')
                                            : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
                                        }
                                `}
                                >
                                    <video 
                                        src={productVideo}
                                        className="w-full h-full object-cover" 
                                        muted
                                        playsInline
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                                            <Play size={10} className="text-black ml-0.5" fill="currentColor" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* CERTIFICATE BLOCK - Always visible for Flowers */}
                            {(product.labCertificate || isFlower) && (
                                <div className="mt-4" ref={certificateRef}>
                                    <CertificateBlock url={getAssetUrl(product.labCertificate || "/medias/certificate-default.pdf")} isDark={isExtreme} />
                                </div>
                            )}
                        </div>

                        {/* CONTENT INJECTION AREA (WELLNESS OR EXTREME) */}
                        {isWellness && <DosageCalculator product={product} />}
                        {isExtreme && <ExtremePotencyGuide />}

                        {/* TABS IMPLEMENTATION */}
                        {isWellness && (
                            <WellnessTabs
                                product={product}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                containerRef={tabsRef}
                            />
                        )}

                        {/* EEAT SEO CONTENT BLOCK (NEW AIDA STRUCTURE) */}
                        {isWellness && <WellnessSEOContent product={product} />}

                        {isExtreme && (
                            <ExtremeTabs
                                product={product}
                                activeTab={extremeActiveTab}
                                setActiveTab={setExtremeActiveTab}
                                containerRef={tabsRef}
                            />
                        )}
                        {isClothing && (
                            <LifestyleClothingTabs
                                activeTab={lifestyleTab}
                                setActiveTab={setLifestyleTab}
                                containerRef={tabsRef}
                            />
                        )}
                        {isAccessory && (
                            <LifestyleAccessoriesTabs
                                activeTab={accessoryTab}
                                setActiveTab={setAccessoryTab}
                                containerRef={tabsRef}
                                product={product}
                            />
                        )}
                        {isBook && (
                            <LifestyleBookTabs
                                activeTab={bookTab}
                                setActiveTab={setBookTab}
                                containerRef={tabsRef}
                            />
                        )}
                        {isMusic && (
                            <LifestyleMusicTabs
                                activeTab={musicTab}
                                setActiveTab={setMusicTab}
                                containerRef={tabsRef}
                            />
                        )}

                        {isLifestyle && (
                            <LifestyleSEOBlock category={product.category} />
                        )}

                    </div>

                    {/* --- RIGHT COLUMN: TRANSACTIONAL & EXPERTISE (STICKY) --- */}
                    {/* order-1 on mobile: transactional info comes FIRST */}
                    <div className="lg:col-span-5 relative order-1 lg:order-2">
                        <div className="lg:sticky lg:top-24 h-fit space-y-6">

                            <div className="flex flex-col">
                                <div className="mb-2 flex items-center gap-3">
                                    {!isWellness && (
                                        <span className={`text-xs font-bold uppercase tracking-widest ${accentColor} border ${isExtreme ? 'border-gardenz-cyan/30' : 'border-gardenz-green/20'} px-2 py-1 rounded`}>
                                            {product.universe === 'extreme' ? 'eXtreme Lab' : 'LifeStyle'}
                                        </span>
                                    )}
                                    {isExtreme && (
                                        <button
                                            onClick={handleLabTestedClick}
                                            className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded border flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95
                                            ${isExtreme
                                                    ? 'border-gardenz-cyan text-gardenz-cyan bg-gardenz-cyan/5 hover:bg-gardenz-cyan/10 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]'
                                                    : 'border-gardenz-green text-gardenz-green bg-gardenz-green/5 hover:bg-gardenz-green/10'
                                                }
                                        `}
                                            aria-label="Voir le certificat d'analyse"
                                        >
                                            <FlaskConical size={12} /> Lab Tested
                                        </button>
                                    )}
                                    {isExtreme && product.molecule && (
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                            {product.molecule}
                                        </span>
                                    )}
                                </div>

                                 <h1 
                                    className={`font-display font-bold mb-2 ${textMain}`}
                                    style={{ fontSize: '2.05rem', lineHeight: '1.8rem' }}
                                >
                                    {product.origin && (() => {
                                        const flagMap: Record<string, string> = {
                                            france: getAssetUrl('/images/flags/hl-flag.webp'),
                                            usa: getAssetUrl('/images/flags/usa-flag.webp'),
                                            italy: getAssetUrl('/images/flags/it-flag.webp'),
                                            spain: getAssetUrl('/images/flags/es-flag.webp'),
                                            switzerland: getAssetUrl('/images/flags/ch-flag.webp'),
                                            holland: getAssetUrl('/images/flags/hl-flag.webp'),
                                        };
                                        const flagSrc = flagMap[product.origin] || null;
                                        return flagSrc ? (
                                            <img 
                                                src={flagSrc}
                                                alt={product.origin}
                                                title={`Origine: ${product.origin.toUpperCase()}`}
                                                className="inline-block w-8 h-5.5 object-cover rounded-sm shadow-sm border border-black/5 mr-3 -mt-1.5 align-middle"
                                            />
                                        ) : null;
                                    })()}
                                    {product.name}
                                </h1>
                                
                                <div className="mb-4">
                                    <span className={`text-4xl font-bold ${textMain}`}>{currentPrice.toFixed(2)}€</span>
                                </div>


                                {/* TOP VENTE STOCK WARNING */}
                                {product.isHot && !isOutOfStock && (
                                    <div className="mb-4 flex items-center gap-2 text-[#DC2626] font-bold text-sm animate-pulse">
                                        <AlertTriangle size={16} />
                                        Plus que 5 en stock
                                    </div>
                                )}

                                {/* MUSIC ARTIST & GENRE */}
                                {isMusic && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 font-medium">De <span className="text-gardenz-dark font-bold hover:text-indigo-500 cursor-pointer">Gardenz Sound System</span> • Genre : Ambient Chill / Lo-Fi</p>
                                    </div>
                                )}

                                {/* BOOK AUTHOR / EDITOR BLOCK */}
                                {isBook && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 font-medium">De <span className="text-gardenz-dark font-bold underline cursor-pointer hover:text-indigo-500">Dr. Green</span> • Éditeur : Gardenz Publishing</p>
                                    </div>
                                )}

                                {/* Usage Badges or Intensity Badge */}
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    {isWellness && renderUsageBadges()}

                                    {isExtreme && (
                                        <div className={`px-4 py-1.5 rounded border text-sm font-display font-bold tracking-widest uppercase ${intensityConfig.badgeClass}`}>
                                            {intensityConfig.label}
                                        </div>
                                    )}

                                    {!isWellness && !isExtreme && (
                                        <span className="text-xs font-display font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-3 py-1 rounded">
                                            {product.category.split(' / ')[0]}
                                        </span>
                                    )}

                                    {isMusic && (
                                        <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full text-xs font-bold text-indigo-500 border border-indigo-100">
                                            <Headphones size={14} /> Mood: Focus & Chill
                                        </div>
                                    )}

                                        <button
                                        onClick={scrollToReviews}
                                        className="flex items-center gap-2 group cursor-pointer group hover:opacity-80 transition-opacity"
                                        title="Voir les avis"
                                        aria-label="Voir les 128 avis sur ce produit"
                                    >
                                        <div className="flex text-yellow-400 gap-0.5">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                        </div>
                                        <span className={`text-xs font-medium underline underline-offset-4 decoration-transparent group-hover:decoration-current transition-all ${isExtreme ? 'text-gray-400 group-hover:text-gardenz-cyan' : 'text-gray-500 group-hover:text-gardenz-green'}`}>
                                            4.9 (128)
                                        </span>
                                    </button>
                                </div>

                                {/* Short Description & Benefits (CRO Optimized) */}
                                {product.shortDescription ? (
                                    <div className="mb-0">
                                         <p className={`leading-relaxed mb-4 ${textSub}`} style={{ fontSize: '1.0rem' }}>
                                            {product.shortDescription}
                                        </p>
                                        
                                        {/* Transaction Block precisely between paragraph and benefits list */}
                                        <div className="mb-8">
                                           {renderTransactionBlock()}
                                        </div>

                                        {product.benefits && <BenefitsList benefits={product.benefits} />}
                                    </div>
                                ) : (
                                    <div className="mb-0">
                                        <p className={`leading-relaxed mb-6 ${textSub}`} style={{ fontSize: '1.0rem' }}>
                                           {isWellness ? (
                                               "Une formule naturelle et équilibrée, conçue pour s'intégrer parfaitement à votre routine quotidienne. Favorise la détente et le bien-être sans accoutumance."
                                           ) : isBook ? (
                                               "Plongez au cœur de l'expertise cannabique avec cet ouvrage de référence. Des informations claires, vérifiées et passionnantes pour tout comprendre."
                                           ) : isMusic ? (
                                               "Une composition sonore exclusive pour accompagner vos moments de détente ou de concentration. Disponible en format physique ou digital instantané."
                                           ) : (
                                               `Ce produit ${product.name} de la catégorie ${product.category} est sélectionné pour sa qualité exceptionnelle. Formule puissante conçue pour les initiés.`
                                           )}
                                       </p>
                                       <div className="mb-4">
                                           {renderTransactionBlock()}
                                       </div>
                                    </div>
                                )}

                                {/* CERTIFICATE DOWNLOAD BLOCK */}
                                {/* CERTIFICATE DOWNLOAD BLOCK - MOVED TO LEFT COL */}

                                {/* MUSIC SPECIFIC BLOCKS */}
                                {isMusic && !isOutOfStock && (
                                    <>
                                        {/* Format Selector Code ... */}
                                        <div className="mb-8">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Format</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    onClick={() => setMusicFormat('Physique')}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all relative
                                                    ${musicFormat === 'Physique'
                                                            ? 'border-gardenz-dark bg-gray-50 shadow-md'
                                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                                        }
                                                `}
                                                >
                                                    <Disc size={24} className={`mb-2 ${musicFormat === 'Physique' ? 'text-gardenz-dark' : 'text-gray-400'}`} />
                                                    <span className={`font-bold text-sm ${musicFormat === 'Physique' ? 'text-gardenz-dark' : 'text-gray-600'}`}>Vinyle / CD</span>
                                                    <span className="text-xs text-gray-500 mt-1">Livraison 24h</span>
                                                    {musicFormat === 'Physique' && <div className="absolute top-2 right-2 w-2 h-2 bg-gardenz-green rounded-full"></div>}
                                                </button>

                                                <button
                                                    onClick={() => setMusicFormat('Digital')}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all relative overflow-hidden
                                                    ${musicFormat === 'Digital'
                                                            ? 'border-indigo-500 bg-indigo-50 shadow-md'
                                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                                        }
                                                `}
                                                >
                                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">-20%</div>
                                                    <Wifi size={24} className={`mb-2 ${musicFormat === 'Digital' ? 'text-indigo-500' : 'text-gray-400'}`} />
                                                    <span className={`font-bold text-sm ${musicFormat === 'Digital' ? 'text-indigo-900' : 'text-gray-600'}`}>Digital (MP3/FLAC)</span>
                                                    <span className="text-xs text-gray-500 mt-1">Téléchargement immédiat</span>
                                                    {musicFormat === 'Digital' && <div className="absolute top-2 left-2 w-2 h-2 bg-indigo-500 rounded-full"></div>}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Lecteur centré en bas */}
                                        <div className="max-w-sm mx-auto w-full">
                                            <MusicPlayer />
                                        </div>
                                    </>
                                )}

                                {/* REORDERED LAYOUT FOR BOOKS */}
                                {isBook && !isOutOfStock ? (
                                    <>
                                        {/* LIFESTYLE BOOK FORMAT SELECTOR */}
                                        <div className="mb-8">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Format</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    onClick={() => setBookFormat('Physique')}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all relative
                                                    ${bookFormat === 'Physique'
                                                            ? 'border-gardenz-dark bg-gray-50 shadow-md'
                                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                                        }
                                                `}
                                                >
                                                    <BookOpen size={24} className={`mb-2 ${bookFormat === 'Physique' ? 'text-gardenz-dark' : 'text-gray-400'}`} />
                                                    <span className={`font-bold text-sm ${bookFormat === 'Physique' ? 'text-gardenz-dark' : 'text-gray-600'}`}>Livre Papier</span>
                                                    <span className="text-xs text-gray-500 mt-1">Expédié sous 24h</span>
                                                    {bookFormat === 'Physique' && <div className="absolute top-2 right-2 w-2 h-2 bg-gardenz-green rounded-full"></div>}
                                                </button>

                                                <button
                                                    onClick={() => setBookFormat('Ebook')}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all relative overflow-hidden
                                                    ${bookFormat === 'Ebook'
                                                            ? 'border-indigo-500 bg-indigo-50 shadow-md'
                                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                                        }
                                                `}
                                                >
                                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">-30%</div>
                                                    <Download size={24} className={`mb-2 ${bookFormat === 'Ebook' ? 'text-indigo-500' : 'text-gray-400'}`} />
                                                    <span className={`font-bold text-sm ${bookFormat === 'Ebook' ? 'text-indigo-900' : 'text-gray-600'}`}>Ebook (PDF/ePub)</span>
                                                    <span className="text-xs text-gray-500 mt-1">Téléchargement immédiat</span>
                                                    {bookFormat === 'Ebook' && <div className="absolute top-2 left-2 w-2 h-2 bg-indigo-500 rounded-full"></div>}
                                                </button>
                                            </div>
                                        </div>


                                        {/* EXTRAIT LINK FOR BOOKS (FUNCTIONAL) */}
                                        <button
                                            onClick={() => setIsExcerptOpen(true)}
                                            className="flex items-center gap-2 text-sm font-bold text-indigo-500 hover:text-gardenz-dark transition-colors mb-6 group w-fit"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                                                <Eye size={16} />
                                            </div>
                                            Lire un extrait gratuit
                                        </button>
                                    </>
                                ) : !isMusic ? (
                                    <>
                                        {/* Standard Order for non-books/non-music: Extraits link (if any, usually none), Selectors, then Transaction */}

                                        {/* LIFESTYLE CLOTHING SELECTOR */}
                                        {isClothing && !isOutOfStock && (
                                            <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                                {/* COLOR */}
                                                <div className="mb-6">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Couleur</label>
                                                    <div className="flex gap-3">
                                                        {clothingColors.map(color => (
                                                            <button
                                                                key={color.name}
                                                                onClick={() => setSelectedColor(color.name)}
                                                                className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center relative group
                                                                ${selectedColor === color.name ? 'border-gardenz-dark scale-110' : 'border-transparent hover:border-gray-300'}
                                                            `}
                                                                title={color.name}
                                                            >
                                                                <span
                                                                    className="w-full h-full rounded-full block border border-black/10"
                                                                    style={{ background: color.hex }}
                                                                ></span>
                                                                {selectedColor === color.name && <Check size={14} className={`absolute text-white drop-shadow-md ${color.name === 'Blanc' ? 'text-black' : ''}`} />}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2 font-medium">Sélectionné : <span className="text-gardenz-dark">{selectedColor}</span></p>
                                                </div>

                                                {/* SIZE */}
                                                <div className="mb-4">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Taille</label>
                                                        <button onClick={() => setIsSizeGuideOpen(true)} className="text-xs text-indigo-500 hover:text-indigo-700 underline font-bold flex items-center gap-1">
                                                            <Ruler size={12} /> Guide des tailles
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {clothingSizes.map(size => {
                                                            const stockStatus = getStockStatus(size);
                                                            const isOutOfStockSize = stockStatus === 'Epuisé';

                                                            return (
                                                                <button
                                                                    key={size}
                                                                    disabled={isOutOfStockSize}
                                                                    onClick={() => setSelectedSize(size)}
                                                                    className={`w-12 h-10 rounded-lg text-sm font-bold border transition-all relative
                                                                    ${isOutOfStockSize
                                                                            ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed decoration-slice line-through'
                                                                            : selectedSize === size
                                                                                ? 'bg-gardenz-dark text-white border-gardenz-dark shadow-md'
                                                                                : 'bg-white text-gray-700 border-gray-200 hover:border-gardenz-dark'
                                                                        }
                                                                `}
                                                                >
                                                                    {size}
                                                                </button>
                                                            )
                                                        })}
                                                    </div>

                                                    {/* REAL TIME STOCK INDICATOR */}
                                                    <div className="mt-3 text-xs h-4">
                                                        {getStockStatus(selectedSize) === 'Epuisé' ? (
                                                            <span className="text-red-500 font-bold flex items-center gap-1 animate-pulse"><Ban size={12} /> Rupture de stock</span>
                                                        ) : getStockStatus(selectedSize) === 'Faible' ? (
                                                            <span className="text-orange-500 font-bold flex items-center gap-1"><Clock size={12} /> Stock Faible - Commandez vite !</span>
                                                        ) : (
                                                            <span className="text-green-600 font-bold flex items-center gap-1"><Check size={12} /> En Stock - Expédié sous 24h</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* WELLNESS: VARIANT SELECTOR */}
                                        {isWellness && product.category.includes('Huiles') && !isOutOfStock && (
                                            <div className="mb-8">
                                                <label className="text-xs font-bold text-gardenz-dark uppercase tracking-widest mb-2 block">Concentration</label>
                                                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                                                    {concentrations.map(conc => (
                                                        <button
                                                            key={conc}
                                                            onClick={() => setSelectedConcentration(conc)}
                                                            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-all
                                                            ${selectedConcentration === conc
                                                                    ? 'bg-gardenz-green text-white border-gardenz-green ring-2 ring-offset-1 ring-gardenz-green/30'
                                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gardenz-green'
                                                                }
                                                        `}
                                                        >
                                                            {conc}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {isExtreme && !isFlower && ['Concentrés', 'Huiles', 'Vape', 'Résines', 'Comestibles'].some(c => product.category.includes(c)) && !isOutOfStock && (
                                            <div className="mb-8">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block flex items-center gap-2">
                                                    <Zap size={14} className="text-gardenz-cyan" /> Concentration
                                                </label>
                                                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                                                    {extremeConcentrations.map(conc => (
                                                        <button
                                                            key={conc}
                                                            onClick={() => setSelectedExtremeConcentration(conc)}
                                                            className={`shrink-0 px-4 py-1.5 rounded-lg font-bold text-xs border transition-all duration-300
                                                            ${selectedExtremeConcentration === conc
                                                                    ? 'text-black bg-gardenz-cyan border-gardenz-cyan shadow-[0_0_10px_rgba(0,255,255,0.4)]'
                                                                    : 'bg-transparent text-gray-500 border-gray-700 hover:border-gardenz-cyan hover:text-white'
                                                                }
                                                        `}
                                                        >
                                                            {conc}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {isFlower && product.tieredPrices && product.tieredPrices.length > 0 && !isOutOfStock && (
                                            <div className="mb-8">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Format</label>
                                                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                                    {product.tieredPrices.map((tier, idx) => {
                                                        const isSelected = selectedTierIndex === idx;
                                                        const pricePerUnit = (tier.price / tier.amount).toFixed(2);
                                                        
                                                        return (
                                                            <button
                                                                key={idx}
                                                                onClick={() => setSelectedTierIndex(idx)}
                                                                className={`relative flex items-center justify-between p-2.5 sm:p-4 rounded-2xl border-2 transition-all duration-300 group
                                                                    ${isSelected 
                                                                        ? (isExtreme ? 'border-gardenz-magenta bg-gardenz-magenta/10 shadow-[0_0_15px_rgba(255,0,255,0.2)] scale-[1.02]' : 'border-gardenz-green bg-gardenz-green/5 shadow-md scale-[1.02]') 
                                                                        : (isExtreme ? 'border-white/5 bg-white/5 hover:border-white/20' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm')}
                                                                `}
                                                            >
                                                                {/* Popular/Eco Badge */}
                                                                {tier.discountBadge && (
                                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm z-10 whitespace-nowrap uppercase">
                                                                        {tier.discountBadge}
                                                                    </div>
                                                                )}

                                                                {/* Left: Weight */}
                                                                <div className="flex items-center gap-2 sm:gap-4">
                                                                    <div className={`text-base sm:text-2xl font-black ${isSelected ? (isExtreme ? 'text-gardenz-magenta' : 'text-gardenz-green') : (isExtreme ? 'text-gray-700' : 'text-gray-300')}`}>
                                                                        {tier.amount}
                                                                    </div>
                                                                    <div className={`h-8 w-[1px] ${isExtreme ? 'bg-white/10' : 'bg-gray-100'}`} />
                                                                    <div className="text-left">
                                                                        <div className={`text-base font-bold ${isSelected ? (isExtreme ? 'text-white' : 'text-gardenz-dark') : (isExtreme ? 'text-gray-400' : 'text-gray-700')}`}>
                                                                            {tier.price.toFixed(2)} €
                                                                        </div>
                                                                        <div className={`text-[10px] ${isExtreme ? 'text-gray-500' : 'text-gray-400'}`}>
                                                                            soit {pricePerUnit} € / {tier.unit}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Right: Circle Indicator or Discount */}
                                                                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[9px] sm:text-xs font-bold transition-colors
                                                                    ${isSelected 
                                                                        ? (isExtreme ? 'bg-gardenz-magenta text-white' : 'bg-gardenz-green text-white') 
                                                                        : (isExtreme ? 'bg-white/5 text-gray-500' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100')
                                                                    }
                                                                `}>
                                                                    {idx === 0 ? '-0%' : `-${Math.round((1 - (tier.price / (product.tieredPrices[0].price * (tier.amount / product.tieredPrices[0].amount))) ) * 100)}%`}
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : null}

                                {/* TRUST BADGES */}
                                <div className={`grid grid-cols-2 gap-4 text-xs ${textSub}`}>
                                    <div className="flex items-center gap-2">
                                        <Truck size={16} className={accentColor} /> Livraison 24/48h
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={16} className={accentColor} /> Paiement Sécurisé
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Leaf size={16} className={accentColor} /> 100% Naturel
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FlaskConical size={16} className={accentColor} /> Testé en Labo
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CROSS SELLING --- */}
                <div className={`max-w-7xl mx-auto px-6 ${isExtreme ? 'mb-0' : 'mb-20'}`}>
                    <h2 className={`font-display text-3xl font-bold mb-8 ${textMain}`}>Vous aimerez aussi</h2>
                    
                    <div className="relative group/carousel">
                        {/* Navigation Arrows */}
                        {canScrollLeft && (
                            <button
                                onClick={() => scroll('left')}
                                aria-label="Défiler vers la gauche"
                                className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full shadow-xl border transition-all transform hover:scale-110
                                    ${isExtreme 
                                        ? 'bg-[#111] border-gray-700 text-white hover:border-gardenz-cyan hover:text-gardenz-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]' 
                                        : 'bg-white border-gray-200 text-gardenz-dark hover:bg-gardenz-green hover:text-white hover:border-gardenz-green'
                                    }
                                `}
                            >
                                <ChevronLeft size={24} strokeWidth={2} />
                            </button>
                        )}

                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {similarProducts.map(p => (
                                <div key={p.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                                    <ProductCard
                                        product={p}
                                        onProductClick={onProductClick}
                                        showUniverseBadge={false}
                                        onQuickView={onQuickView}
                                    />
                                </div>
                            ))}
                        </div>

                        {canScrollRight && (
                            <button
                                onClick={() => scroll('right')}
                                aria-label="Défiler vers la droite"
                                className={`absolute right-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full shadow-xl border transition-all transform hover:scale-110
                                    ${isExtreme 
                                        ? 'bg-[#111] border-gray-700 text-white hover:border-gardenz-cyan hover:text-gardenz-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]' 
                                        : 'bg-white border-gray-200 text-gardenz-dark hover:bg-gardenz-green hover:text-white hover:border-gardenz-green'
                                    }
                                `}
                            >
                                <ChevronRight size={24} strokeWidth={2} />
                            </button>
                        )}
                    </div>
                </div>

                {/* SEO Content Injection using AcademySection with dynamic molecule data */}
                {isWellness && product.tags.includes('Sommeil') && (
                    <div className="mt-20"><AcademySection variant="wellness" topic="sleep" molecule={product.molecule} /></div>
                )}

                {isWellness && product.tags.includes('Stress') && (
                    <div className="mt-20"><AcademySection variant="wellness" topic="stress" molecule={product.molecule} /></div>
                )}

                {isWellness && product.tags.includes('Relaxation') && (
                    <div className="mt-20"><AcademySection variant="wellness" topic="relaxation" molecule={product.molecule} /></div>
                )}

                {isWellness && product.tags.includes('Focus') && (
                    <div className="mt-20"><AcademySection variant="wellness" topic="focus" molecule={product.molecule} /></div>
                )}

                {isExtreme && (
                    <div className="mt-20"><AcademySection variant="extreme" topic="thp420" molecule={product.molecule} showWarning={product.intensity !== 'Soft'} /></div>
                )}

            </div>
        </>
    );
};
