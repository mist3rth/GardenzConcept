import React from 'react';
import { Quote, BookOpen, CheckCircle, BrainCircuit, Activity } from 'lucide-react';
import { Product } from '../types';

interface WellnessSEOContentProps {
    product: Product;
}

export const WellnessSEOContent: React.FC<WellnessSEOContentProps> = ({ product }) => {
    if (!product.seoContent) return null;

    const { heading, subheading, description, features, expertQuote, scientificSources } = product.seoContent;

    return (
        <div className="mt-12 space-y-8 animate-fade-in">

            {/* ATTENTION & INTEREST (Hook) */}
            <div className="bg-gardenz-green/5 p-6 rounded-2xl border border-gardenz-green/10">
                <h3 className="font-display text-xl font-bold text-gardenz-dark mb-2">{heading}</h3>
                <h4 className="text-sm font-bold text-gardenz-green uppercase tracking-wide mb-4">{subheading}</h4>
                <div
                    className="text-gray-600 leading-relaxed text-sm prose prose-sm prose-green max-w-none"
                    dangerouslySetInnerHTML={{ __html: description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
            </div>

            {/* DESIRE (Benefits/Features) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-gardenz-green mb-3">
                            <CheckCircle size={20} />
                        </div>
                        <h5 className="font-bold text-gardenz-dark text-sm mb-1">{feature.title}</h5>
                        <p className="text-xs text-gray-500">{feature.content}</p>
                    </div>
                ))}
            </div>

            {/* EEAT: EXPERT AUTHORITY */}
            {expertQuote && (
                <div className="relative bg-[#1A4D2E] text-white p-6 rounded-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Quote size={120} />
                    </div>
                    <div className="relative z-10 flex gap-4 items-start">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 border border-white/30">
                            {expertQuote.author.charAt(0)}
                        </div>
                        <div>
                            <p className="text-lg font-serif italic mb-4">"{expertQuote.text}"</p>
                            <div>
                                <p className="font-bold">{expertQuote.author}</p>
                                <p className="text-xs text-green-200 uppercase tracking-wider">{expertQuote.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EEAT: TRUST SIGNALS (Scientific Sources) */}
            {scientificSources && scientificSources.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <BookOpen size={16} /> Sources Scientifiques
                    </h4>
                    <ul className="space-y-2">
                        {scientificSources.map((source, idx) => {
                            // Translate French scientific terms to English for better search results
                            const translateToEnglish = (text: string) => {
                                const dictionary: Record<string, string> = {
                                    "Étude sur": "Study on",
                                    "l'effet du": "the effect of",
                                    "l'effet de": "the effect of",
                                    "sur le": "on",
                                    "cycle veille-sommeil": "sleep-wake cycle",
                                    "Rôle du": "Role of the",
                                    "Système Endocannabinoïde": "Endocannabinoid System",
                                    "dans la": "in",
                                    "régulation circadienne": "circadian regulation",
                                    "CBD": "CBD",
                                    "sommeil": "sleep",
                                    "douleur": "pain",
                                    "anxiété": "anxiety",
                                    "bien-être": "wellness"
                                };
                                
                                let translated = text;
                                Object.entries(dictionary).forEach(([fr, en]) => {
                                    translated = translated.replace(new RegExp(fr, 'gi'), en);
                                });
                                return translated;
                            };

                            // Automatically enrich base URLs with search parameters using Nature.com as standard
                            const getSearchUrl = (query: string) => {
                                const englishQuery = translateToEnglish(query);
                                return `https://www.nature.com/search?q=${encodeURIComponent(englishQuery)}`;
                            };

                            return (
                                <li key={idx}>
                                    <a
                                        href={getSearchUrl(source.title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-2 text-xs text-gray-500 hover:text-gardenz-green group transition-colors"
                                    >
                                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-gardenz-green shrink-0"></span>
                                        <span className="underline decoration-gray-300 underline-offset-2 group-hover:decoration-gardenz-green">{source.title}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="text-[10px] text-gray-400 mt-4 italic">
                        * Les informations fournies ne remplacent pas un avis médical. Consultez un professionnel de santé avant utilisation.
                    </p>
                </div>
            )}

        </div>
    );
};
