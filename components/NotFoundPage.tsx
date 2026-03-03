import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, ShoppingBag, Leaf } from 'lucide-react';

// Floating leaf parameters, calculated once at module load
const LEAVES = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 37 + 13) % 90}%`,
    size: 10 + (i * 7) % 16,
    duration: 6 + (i * 1.3) % 8,
    delay: -((i * 1.7) % 10),
    rotate: (i * 47) % 360,
    drift: (i % 2 === 0 ? 1 : -1) * (10 + (i * 9) % 30),
    opacity: 0.35 + (i * 0.04) % 0.45,
}));

export const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gardenz-black flex flex-col items-center justify-center text-white relative overflow-hidden py-32 px-6">

            {/* Keyframes injected inline */}
            <style>{`
                @keyframes floatLeaf {
                    0%   { transform: translateY(110vh) rotate(0deg) translateX(0px); opacity: 0; }
                    8%   { opacity: 1; }
                    92%  { opacity: 1; }
                    100% { transform: translateY(-120vh) rotate(var(--rotate)) translateX(var(--drift)); opacity: 0; }
                }
            `}</style>

            {/* Floating Leaves Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {LEAVES.map(leaf => (
                    <div
                        key={leaf.id}
                        className="absolute bottom-0 text-gardenz-green"
                        style={{
                            left: leaf.left,
                            opacity: leaf.opacity,
                            '--rotate': `${leaf.rotate}deg`,
                            '--drift': `${leaf.drift}px`,
                            animation: `floatLeaf ${leaf.duration}s ${leaf.delay}s infinite linear`,
                        } as React.CSSProperties}
                    >
                        <Leaf size={leaf.size} />
                    </div>
                ))}
            </div>

            {/* Ambient bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gardenz-green/8 rounded-full blur-[100px] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 text-center max-w-xl">

                {/* Icon badge */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-gardenz-green/30 bg-gardenz-green/10 mb-8 mx-auto">
                    <Leaf size={34} className="text-gardenz-green" />
                </div>

                <p className="text-gardenz-green text-xs font-bold uppercase tracking-[0.35em] mb-4">
                    Erreur 404
                </p>

                <h1 className="text-6xl md:text-8xl font-display font-bold mb-5 leading-none">
                    Mauvaise<br />
                    <span className="text-gardenz-green">graine.</span>
                </h1>

                <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-md mx-auto">
                    Cette page a essayé de pousser, mais elle n'a pas trouvé son terrain.
                    Revenez vers des terres connues.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-gardenz-green text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gardenz-terra transition-all duration-300 shadow-lg shadow-gardenz-green/20"
                    >
                        <Home size={16} />
                        Accueil
                    </Link>
                    <Link
                        to="/boutique"
                        className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest hover:border-gardenz-green hover:text-gardenz-green transition-all duration-300"
                    >
                        <ShoppingBag size={16} />
                        La Boutique
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};
