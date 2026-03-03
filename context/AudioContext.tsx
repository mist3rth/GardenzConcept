
import React, { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';

interface AudioContextType {
    isPlaying: boolean;
    isPlayerVisible: boolean;
    togglePlay: () => void;
    stopMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const tracks = ['/medias/son.mp3', '/medias/son2.mp3'];

    // Ensure audio element is created once
    useEffect(() => {
        if (!audioRef.current) {
            // Pick a random track on first initialization
            const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
            audioRef.current = new Audio(randomTrack);
            audioRef.current.onended = () => {
                setIsPlaying(false);
                setIsPlayerVisible(false);
            };
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                // If we are starting from 0 or it's the first play of a session, 
                // we could pick a new random track here if we wanted to change tracks every play.
                // For now, it picks one on mount. If the user stops and wants a NEW random one:
                if (audioRef.current.currentTime === 0) {
                     const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
                     audioRef.current.src = randomTrack;
                }
                
                audioRef.current.play().catch(err => console.error("Audio play failed:", err));
                setIsPlaying(true);
                setIsPlayerVisible(true);
            }
        }
    };

    const stopMusic = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setIsPlayerVisible(false);
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, isPlayerVisible, togglePlay, stopMusic }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
