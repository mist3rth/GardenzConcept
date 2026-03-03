import React from 'react';
import { Leaf } from 'lucide-react';

interface PageLoaderProps {
    /** If true, takes the full screen height (used as Suspense fallback on initial load) */
    fullScreen?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ fullScreen = false }) => {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-6 bg-gardenz-black ${
                fullScreen ? 'min-h-screen' : 'min-h-[60vh]'
            }`}
            aria-label="Chargement en cours…"
            role="status"
        >
            {/* Pulsing ring + rotating leaf */}
            <div className="relative flex items-center justify-center w-20 h-20">
                {/* Outer breathing ring */}
                <span className="absolute inset-0 rounded-full border-2 border-gardenz-green/20 animate-ping" style={{ animationDuration: '1.5s' }} />
                {/* Middle ring */}
                <span className="absolute inset-2 rounded-full border border-gardenz-green/30" />
                {/* Rotating leaf */}
                <Leaf
                    size={28}
                    className="text-gardenz-green animate-spin"
                    style={{ animationDuration: '2s' }}
                />
            </div>

            {/* Brand wordmark */}
            <span className="text-white/30 text-xs font-bold uppercase tracking-[0.35em]">
                Gardenz
            </span>
        </div>
    );
};
