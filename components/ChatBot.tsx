
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2, FlaskConical, Zap, ShieldCheck, AlertCircle, RotateCcw, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ChatProductCard } from './ChatProductCard';
import { Product } from '../types';
import {
    buildEnhancedSystemInstruction,
    searchProducts,
    getProductsByIds
} from '../utils/chatbotKnowledge';

// @ts-ignore - Vite will resolve this at build time
import infoCBDRAGText from '../ragContent/infoCBDRAG.md?raw';

// BASE SYSTEM INSTRUCTIONS
const BASE_SYSTEM_INSTRUCTION = `
Tu es "Gardenz Advisor", l'IA experte du Lab Gardenz. Ton ton est celui d'un expert en laboratoire qui traîne dans les studios de musique : précis, cool, et sans filtre.
Tu es le garant de la culture Gardenz : Exigence premium + décontraction urbaine.

SOURCES DE VÉRITÉ EXCLUSIVES (Voici les connaissances encyclopédiques du LAB) :
${infoCBDRAGText}

RÈGLES DU JEU (LÉGAL & PRATIQUE) :
1. INDEX MOLÉCULAIRE DE BASE : 
   - CBD: Équilibre, homéostasie, calme diffus.
   - CBG: Focus, clarté mentale, boost cognitif.
   - CBN: Sommeil profond, sédation naturelle.
   - H4-CBD: Détente profonde, affinité 100x vs CBD.
   - THCP/HHCP-O: Puissance extrême, affinité CB1 maximale, réservé aux experts.
2. FAQ & LÉGALITÉ :
   - 100% légal en France (THC < 0.3%). 
   - Testé en labo indépendant (COA disponible). 
   - Pas de conduite après consommation de molécules intenses.
3. PROTOCOLE DE DOSAGE :
   - Règle d'or : "Start Low, Go Slow". 
   - Dosage personnalisé par poids et tolérance.
   - Méthodes : Sublingual (équilibré), Vape (instantané), Edibles (durable).
4. INFOS PRATIQUES :
   - Livraison : Expédition express (24/48h), colis 100% discret et sans odeur.
   - Parrainage : Programme exclusif 'Le Clan' (10€ pour toi, 10% pour ton filleul).

CONTRAINTES :
- Ne donne JAMAIS de conseil médical. Utilise TOUJOURS : "Selon notre protocole de bien-être...".
- Si tu ne sais pas, dis-le et propose de contacter un humain à contact@gardenz.fr.
- Ta source d'information principale sur le CBD, ses molécules, et les protocoles est le document encyclopédique ci-dessus. Base tes réponses détaillées dessus.
- Phrases courtes, tutoiement direct. Vocabulaire : Le Clan, Le Lab, Sans Filtre, La Vibe.
`;

interface Message {
    role: 'user' | 'model';
    text: string;
    products?: Product[];
    timestamp?: Date;
    isError?: boolean;
}

const INITIAL_MESSAGE: Message = {
    role: 'model',
    text: "Yo le Clan ! Ici l'Advisor du Lab. Une question sur une molécule, un produit ou un protocole ? Je te réponds sans filtre.",
    timestamp: new Date()
};

export const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [stickyBarOpen, setStickyBarOpen] = useState(false);
    const { isOpen: isCartOpen, addToCart } = useCart();
    const navigate = useNavigate();
    
    // Initialize messages from sessionStorage or default
    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = sessionStorage.getItem('gardenz_chat_history');
        if (savedMessages) {
            try {
                // Parse and restore Date objects
                const parsed = JSON.parse(savedMessages);
                return parsed.map((m: any) => ({
                    ...m,
                    timestamp: m.timestamp ? new Date(m.timestamp) : undefined
                }));
            } catch (e) {
                console.error("Error parsing chat history:", e);
                return [INITIAL_MESSAGE];
            }
        }
        return [INITIAL_MESSAGE];
    });
    
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const QUICK_REPLIES = [
        "Conseil Sommeil",
        "Protocole Dosage",
        "Différence CBD/CBG"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Save messages to sessionStorage whenever they change
    useEffect(() => {
        sessionStorage.setItem('gardenz_chat_history', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, isTyping]);

    // Listen for StickyAddToCart visibility changes
    useEffect(() => {
        const onShow = () => setStickyBarOpen(true);
        const onHide = () => setStickyBarOpen(false);
        window.addEventListener('sticky-cta-visible', onShow);
        window.addEventListener('sticky-cta-hidden', onHide);
        return () => {
            window.removeEventListener('sticky-cta-visible', onShow);
            window.removeEventListener('sticky-cta-hidden', onHide);
        };
    }, []);

    // Accessibility: Focus management and Escape key
    useEffect(() => {
        if (isOpen) {
            // Focus input when opened
            setTimeout(() => inputRef.current?.focus(), 100);

            // Handle Escape key
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setIsOpen(false);
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen]);

    // Parse AI response for product recommendations
    const parseRecommendations = (text: string): { cleanText: string; productIds: string[] } => {
        const regex = /\[RECOMMEND:\s*([^\]]+)\]/g;
        const matches = [...text.matchAll(regex)];
        const productIds = matches.flatMap(m =>
            m[1].split(',').map(id => id.trim())
        );
        const cleanText = text.replace(regex, '').trim();
        return { cleanText, productIds };
    };

    const processMessage = async (userMessage: string) => {
        if (isLoading || isTyping) return;

        const userMsg: Message = {
            role: 'user',
            text: userMessage,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            // Search for relevant products based on user query
            const relevantProducts = searchProducts(userMessage, { maxResults: 5 });

            // Build enhanced system instruction with product knowledge
            const enhancedInstruction = buildEnhancedSystemInstruction(BASE_SYSTEM_INSTRUCTION);

            // Initialize or reuse chat session
            if (!chatRef.current) {
                const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY;

                if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
                    throw new Error('API_KEY_MISSING');
                }

                const ai = new GoogleGenAI({ apiKey });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: enhancedInstruction,
                        temperature: 0.7,
                    }
                });
            }

            // Build enriched prompt with context
            let enrichedPrompt = userMessage;
            if (relevantProducts.length > 0) {
                const productContext = relevantProducts.map(p =>
                    `[${p.id}] ${p.name} - ${p.price}€ | ${p.molecule || 'N/A'} | ${p.tags?.join(', ')}`
                ).join('\n');

                enrichedPrompt = `${userMessage}\n\nProduits pertinents disponibles:\n${productContext}`;
            }

            // Send message to AI
            const response = await chatRef.current.sendMessage({ message: enrichedPrompt });
            const aiText = response.text;

            // Simulate typing delay based on response length
            setIsLoading(false);
            setIsTyping(true);
            
            // Calculate delay: base 500ms + 10ms per char, capped at 2000ms
            const typingDelay = Math.min(500 + aiText.length * 10, 2000);
            
            setTimeout(() => {
                // Parse recommendations from AI response
                const { cleanText, productIds } = parseRecommendations(aiText);
                const recommendedProducts = getProductsByIds(productIds);

                const aiMsg: Message = {
                    role: 'model',
                    text: cleanText || "Désolé, le Lab a un petit court-circuit. Réessaie ?",
                    products: recommendedProducts.length > 0 ? recommendedProducts : undefined,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, aiMsg]);
                setIsTyping(false);
            }, typingDelay);

        } catch (error: any) {
            console.error("Chat Error:", error);
            setIsLoading(false);
            setIsTyping(false);
            const errorMsg: Message = {
                role: 'model',
                text: "Oups, impossible de me connecter au Lab pour le moment. L'API Key est peut-être manquante ou invalide.",
                isError: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || isTyping) return;

        const userMessage = input.trim();
        setInput('');
        await processMessage(userMessage);
    };

    const handleQuickReply = (reply: string) => {
        processMessage(reply);
    };

    const handleProductView = (productId: string) => {
        navigate(`/produit/${productId}`);
        setIsOpen(false);
    };

    const handleReset = () => {
        setMessages([INITIAL_MESSAGE]);
        chatRef.current = null; // Reset chat session
        if (inputRef.current) inputRef.current.focus();
    };

    return (
        <div
            style={{ bottom: stickyBarOpen ? '5rem' : '1.5rem' }}
            className={`
            fixed right-6 z-[100] font-sans transition-all duration-500 ease-in-out
            ${isCartOpen ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}
            `}
            role="region"
            aria-label="Chatbot Gardenz Advisor"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
                className={`
                    group relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl
                    ${isOpen ? 'bg-gardenz-dark rotate-90' : 'bg-gardenz-black border-2 border-gardenz-cyan hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]'}
                `}
            >
                {isOpen ? <X className="text-white" size={20} /> : <FlaskConical className="text-gardenz-cyan animate-pulse" size={22} />}

                {!isOpen && (
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gardenz-dark text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Une question pour le Lab ?
                    </div>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div 
                    ref={chatContainerRef}
                    className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[350px] md:w-[420px] h-[calc(100dvh-6rem)] max-h-[500px] sm:max-h-none sm:h-[550px] bg-gardenz-dark rounded-[2rem] shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-scale-in backdrop-blur-xl"
                    role="dialog"
                    aria-label="Fenêtre de discussion"
                >
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-gardenz-black to-zinc-900 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gardenz-cyan/10 flex items-center justify-center text-gardenz-cyan border border-gardenz-cyan/20">
                                <FlaskConical size={20} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-white tracking-tight">GARDENZ ADVISOR</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">En direct du Lab</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Reset Button */}
                        <button 
                            onClick={handleReset}
                            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Réinitialiser la conversation"
                            aria-label="Réinitialiser la conversation"
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div 
                        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
                        aria-live="polite"
                        aria-relevant="additions"
                    >
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                            >
                                <div className="max-w-[85%]">
                                    <div className={`
                                        p-4 rounded-2xl text-sm leading-relaxed
                                        ${msg.role === 'user'
                                            ? 'bg-gardenz-cyan text-black font-bold rounded-tr-none shadow-lg'
                                            : msg.isError 
                                                ? 'bg-red-500/10 text-red-400 border border-red-500/50 rounded-tl-none'
                                                : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'}
                                    `}>
                                        {msg.isError && <AlertCircle className="inline-block mr-2 -mt-0.5" size={14} />}
                                        {msg.text}
                                    </div>

                                    {/* Product Recommendations */}
                                    {msg.products && msg.products.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {msg.products.map(product => (
                                                <ChatProductCard
                                                    key={product.id}
                                                    product={product}
                                                    onViewDetails={handleProductView}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {/* Loading / Typing Indicators */}
                        {(isLoading || isTyping) && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin text-gardenz-cyan" size={16} />
                                            <span className="text-xs text-gray-500 font-medium">Recherche...</span>
                                        </>
                                    ) : (
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-gardenz-cyan/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-gardenz-cyan/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-gardenz-cyan/50 rounded-full animate-bounce"></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Quick Replies */}
                        {messages.length === 1 && (
                            <div className="px-2 pb-2 flex flex-wrap gap-2 animate-fade-in justify-start">
                                {QUICK_REPLIES.map((reply, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuickReply(reply)}
                                        className="text-[11px] bg-white/5 border border-white/10 text-gray-300 hover:text-gardenz-cyan hover:bg-gardenz-cyan/10 hover:border-gardenz-cyan/30 px-3 py-1.5 rounded-full transition-all"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Disclaimer Mini */}
                    <div className="px-6 py-2 bg-black/40 border-t border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest text-center flex items-center justify-center gap-1">
                            <ShieldCheck size={10} /> Intelligence Artificielle • Sans Filtre
                        </p>
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 bg-gardenz-black border-t border-white/5">
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Pose ta question au Lab..."
                                className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-gardenz-cyan transition-colors placeholder:text-gray-500"
                                disabled={isLoading || isTyping}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading || isTyping}
                                aria-label="Envoyer le message"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gardenz-cyan hover:text-white disabled:text-gray-600 transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
