import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, X, GripVertical } from 'lucide-react';

export const GlobalMusicPlayer: React.FC = () => {
    const { isPlaying, isPlayerVisible, togglePlay, stopMusic } = useAudio();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            const playerWidth = 380;
            const defaultX = Math.max(8, Math.min(window.innerWidth - playerWidth - 8, window.innerWidth - 470));
            const defaultY = Math.max(8, window.innerHeight - 100);
            setPosition({ x: defaultX, y: defaultY });
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mouse + Touch drag (desktop & tablet)
    useEffect(() => {
        if (isMobile) return;

        const handleMove = (clientX: number, clientY: number) => {
            if (!isDragging || !dragRef.current) return;
            const dx = clientX - dragRef.current.startX;
            const dy = clientY - dragRef.current.startY;
            setPosition({
                x: Math.max(0, dragRef.current.initialX + dx),
                y: Math.max(0, dragRef.current.initialY + dy)
            });
        };

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        };

        const handleEnd = () => {
            setIsDragging(false);
            dragRef.current = null;
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging, isMobile]);

    const startDrag = (clientX: number, clientY: number) => {
        if (isMobile) return;
        setIsDragging(true);
        dragRef.current = {
            startX: clientX,
            startY: clientY,
            initialX: position.x,
            initialY: position.y
        };
    };

    const handleMouseDown = (e: React.MouseEvent) => startDrag(e.clientX, e.clientY);
    const handleTouchStart = (e: React.TouchEvent) => startDrag(e.touches[0].clientX, e.touches[0].clientY);

    if (!isPlayerVisible) return null;

    // ─── MOBILE: barre fixe en bas, centrée ───
    if (isMobile) {
        return (
            <div className="fixed bottom-20 left-3 right-3 z-[100]">
                <div className="bg-gardenz-dark/95 backdrop-blur-xl border border-white/10 px-3 py-2.5 rounded-xl flex items-center gap-3 shadow-2xl">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=100" className="w-full h-full object-cover" alt="Vinyl" />
                        {isPlaying && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                                <div className="w-0.5 h-2.5 bg-gardenz-green animate-music-bar-1"></div>
                                <div className="w-0.5 h-4 bg-gardenz-green animate-music-bar-2"></div>
                                <div className="w-0.5 h-2 bg-gardenz-green animate-music-bar-3"></div>
                            </div>
                        )}
                    </div>

                    <div className="flex-grow min-w-0">
                        <p className="text-white font-bold text-[11px] uppercase tracking-widest truncate">Sunset Vibes</p>
                        <p className="text-white/50 text-[9px] uppercase tracking-tighter">Mix by Gardenz</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                        <button
                            onClick={togglePlay}
                            className="w-9 h-9 rounded-full bg-white/10 active:bg-white active:text-gardenz-dark flex items-center justify-center text-white transition-all"
                            aria-label={isPlaying ? 'Pause' : 'Lecture'}
                        >
                            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                        </button>
                        <button
                            onClick={stopMusic}
                            className="w-9 h-9 rounded-full bg-white/5 active:bg-red-500/30 flex items-center justify-center text-white/50 transition-all"
                            aria-label="Arrêter"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── DESKTOP: lecteur flottant draggable ───
    return (
        <div
            className={`fixed z-[100] transition-shadow duration-200 ${isDragging ? 'shadow-2xl scale-105' : 'shadow-xl'}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'auto'
            }}
        >
            <div className="bg-gardenz-dark/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 group">
                {/* Drag Handle */}
                <div
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    className="cursor-grab active:cursor-grabbing text-white/20 hover:text-white/40 transition-colors p-1 -ml-2"
                    aria-label="Déplacer le lecteur"
                >
                    <GripVertical size={20} />
                </div>

                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=100" className="w-full h-full object-cover" alt="Vinyl" />
                    {isPlaying && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                            <div className="w-1 h-3 bg-gardenz-green animate-music-bar-1"></div>
                            <div className="w-1 h-5 bg-gardenz-green animate-music-bar-2"></div>
                            <div className="w-1 h-2 bg-gardenz-green animate-music-bar-3"></div>
                        </div>
                    )}
                </div>

                <div className="pr-4">
                    <p className="text-white font-bold text-xs uppercase tracking-widest truncate max-w-[120px]">Sunset Vibes</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-tighter">Mix by Gardenz</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-gardenz-dark flex items-center justify-center text-white transition-all shadow-inner border border-white/5"
                        aria-label={isPlaying ? 'Pause' : 'Lecture'}
                    >
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                    </button>
                    <button
                        onClick={stopMusic}
                        title="Arrêter et fermer"
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-white/50 transition-all border border-white/5"
                        aria-label="Arrêter et fermer"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
