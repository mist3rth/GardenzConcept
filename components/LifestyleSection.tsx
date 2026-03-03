import React, { useState } from 'react';
import { Play, Music, Video, Wrench, Shirt, Pause, Square, X, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { getAssetUrl } from '../utils/assets';

interface LifestyleSectionProps {
    // onNavigate removed
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = () => {
    const { isPlaying, togglePlay } = useAudio();
    const [activeVideoIdx, setActiveVideoIdx] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(true);

    const lifestyleCards = [
        {
            type: 'Matériel',
            title: "L'OUTILLAGE PREMIUM",
            desc: "Vaporisateurs dernière génération, grinders céramique. La précision technique.",
            icon: <Wrench size={16} />,
            link: "/boutique?filter=lifestyle&category=Accessoires",
            img: getAssetUrl('/images/home-page/lifestyle-accessoires.webp'),
            label: "Voir les accessoires",
            textColor: 'text-white'
        },
        {
            type: 'Musique',
            title: "SUNSET VIBES & CHILL",
            desc: "Retrouvez notre sélection musicale exclusive mixée en direct.",
            icon: <Music size={16} />,
            link: "#",
            img: getAssetUrl('/images/home-page/lifestyle-musique.webp'),
            label: isPlaying ? "En cours..." : "Écouter le set",
            isExternal: false,
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                togglePlay();
            },
            textColor: 'text-white'
        },
        {
            type: 'Drop Limitée',
            title: "STREETWEAR COLLECTION",
            desc: "Hoodies oversize, T-shirts graphiques. Designé à Paris.",
            icon: <Shirt size={16} />,
            link: "/boutique?filter=lifestyle&category=Vêtements",
            img: getAssetUrl('/images/home-page/lifestyle-vetements.webp'),
            label: "Accéder au shop",
            textColor: 'text-white'
        },
        {
            type: 'Éducation',
            title: "TOUT SAVOIR SUR LE CBN",
            desc: "La molécule du sommeil décryptée en 2 minutes chrono.",
            icon: <Video size={16} />,
            link: "#",
            label: "Regarder l'épisode",
            isExternal: false,
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveVideoIdx(activeVideoIdx === 3 ? null : 3); // 3 is the index of the CBN card
            },
            img: getAssetUrl('/images/home-page/lifestyle-education.webp'),
            textColor: 'text-white'
        }
    ];

    return (
        <section className="bg-gardenz-white text-gardenz-dark py-24 overflow-hidden border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl font-bold mb-4 uppercase">
                        GARDENZ <span className="text-gardenz-green">LIFESTYLE</span>
                    </h2>
                    <p className="font-sans text-gray-500 max-w-4xl mx-auto leading-relaxed text-sm md:text-base font-medium">
                        Votre univers de A à Z. Matériel d’expert (Vapos, Grinders), essentiels naturels et mode urbaine exclusive. On ne s’arrête pas au produit : nos livres et disques complètent votre routine pour une immersion totale. Qualité irréprochable, style décomplexé, esprit Gardenz.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {lifestyleCards.map((card, idx) => {
                        const CardWrapper: any = card.isExternal ? 'a' : Link;
                        const wrapperProps = card.isExternal 
                            ? { href: card.link, target: "_blank", rel: "noopener noreferrer" }
                            : { to: card.link };

                        const isVideoActive = activeVideoIdx === idx;

                        return (
                            <CardWrapper 
                                key={idx}
                                {...wrapperProps}
                                onClick={card.onClick}
                                className={`group relative h-96 rounded-xl overflow-hidden cursor-pointer block border border-gray-100 shadow-sm transition-all duration-500 ${isVideoActive ? 'ring-2 ring-gardenz-green shadow-2xl' : ''}`}
                            >
                                {/* Video Player Layer */}
                                {isVideoActive ? (
                                    <div className="absolute inset-0 bg-black z-0">
                                        <video 
                                            src={getAssetUrl('/medias/videoCbd.mp4')} 
                                            className="w-full h-full object-cover"
                                            autoPlay 
                                            playsInline
                                            loop
                                            muted={isMuted}
                                        />
                                        
                                        {/* On-card Close button */}
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setActiveVideoIdx(null);
                                            }}
                                            className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-md z-20 transition-all"
                                            title="Fermer la vidéo"
                                        >
                                            <X size={20} />
                                        </button>

                                        {/* On-card Mute/Unmute button */}
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setIsMuted(!isMuted);
                                            }}
                                            className="absolute bottom-4 right-4 text-white hover:text-gardenz-green bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-md z-20 transition-all"
                                            title={isMuted ? "Activer le son" : "Couper le son"}
                                        >
                                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <img
                                            src={getAssetUrl(card.img)}
                                            alt={card.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                                    </>
                                )}

                                {/* Card Header Badge (Hidden when video playing) */}
                                {!isVideoActive && (
                                    <div className="absolute top-8 right-8 bg-white text-black font-bold px-3 py-1 rounded text-xs uppercase z-10">
                                        {card.type}
                                    </div>
                                )}

                                {/* Main Content (Hidden when video playing) */}
                                {!isVideoActive && (
                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <div className="flex items-center gap-2 text-white/70 mb-2 font-display uppercase tracking-widest text-xs font-bold">
                                            {card.icon}
                                            <span>{card.type}</span>
                                        </div>
                                        <h3 className={`font-display text-2xl font-bold mb-2 ${card.textColor}`}>
                                            {card.title}
                                        </h3>
                                        <p className={`text-white/80 text-xs mb-6 line-clamp-2`}>
                                            {card.desc}
                                        </p>
                                        <div className="flex items-center gap-2 bg-white/10 hover:bg-white hover:text-black transition-all px-4 py-2 rounded-full backdrop-blur-md border border-white/20 group-hover:border-white text-xs font-bold w-fit text-white">
                                            {card.label}
                                        </div>
                                    </div>
                                )}
                            </CardWrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
