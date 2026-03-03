import React, { useState } from 'react';
import { MapPin, Clock, ShoppingCart, Music, FlaskConical, Sparkles, Navigation, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ShopsHighlightSectionProps { }

export const ShopsHighlightSection: React.FC<ShopsHighlightSectionProps> = () => {
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

    const openMap = (address: string) => {
        setSelectedAddress(address);
    };

    const closeMap = () => {
        setSelectedAddress(null);
    };

    return (
        <section className="bg-gardenz-white pt-4 pb-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Bloc d'Accroche */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-2 mb-4 animate-bounce">
                        <MapPin className="text-gardenz-terra" size={32} fill="currentColor" fillOpacity={0.1} />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-gardenz-dark mb-4">
                        GARDENZ : Le QG de la Vibe
                    </h2>
                    <p className="text-gardenz-dark/70 text-lg max-w-3xl mx-auto leading-relaxed">
                        Plus qu'un Shop, un Lifestyle. Nos boutiques sont des extensions physiques de notre univers :
                        un mélange d'exigence technique et d'ambiance culturelle.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-16">

                    {/* CARTE 1: ALEXANDRIE GARDENZ */}
                    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col">
                        <div className="h-72 overflow-hidden relative">
                            <img
                                src="/images/nos-boutiques/alexandrie-gardenz.webp"
                                alt="Alexandrie Gardenz - Paris 2"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                            <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur text-gardenz-dark px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                Paris 2 • Le Sentier
                            </div>
                        </div>

                        <div className="p-8 flex-grow flex flex-col items-start text-left">
                            <div className="flex items-center justify-between w-full mb-2">
                                <h3 className="font-display text-2xl md:text-3xl font-bold text-gardenz-dark">
                                    ALEXANDRIE GARDENZ
                                </h3>
                                <Music size={20} className="text-gardenz-magenta opacity-50" />
                            </div>
                            <p className="text-gardenz-terra font-bold text-xs mb-6 uppercase tracking-widest italic">Le QG Lifestyle & Musique</p>

                            <div className="text-gray-600 mb-8 leading-relaxed text-sm space-y-4">
                                <p className="italic text-gray-400 text-xs">"Le meilleur du CBD et du lifestyle à Paris Le Sentier. Spot boisé et convivial."</p>
                                <p>
                                    Alexandrie est le cœur battant de notre culture, où le design boisé brut rencontre les dernières pépites CBD.
                                    Venez tester physiquement notre collection de vêtements et écouter nos Live Sessions en avant-première sur notre Sound System.
                                    Notre crew vous y attend pour transformer votre simple achat en une véritable immersion sensorielle.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 w-full mb-8 border border-gray-100 flex flex-col gap-2">
                                <p className="flex items-center gap-2 text-xs text-gray-500 font-medium"><MapPin size={14} className="text-gardenz-terra" /> 12 Rue d'Alexandrie, 75002 Paris</p>
                                <p className="flex items-center gap-2 text-xs text-gray-500 font-medium"><Clock size={14} className="text-gardenz-terra" /> Lun-Sam : 11h - 20h</p>
                            </div>

                            <div className="mt-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    onClick={() => openMap("12 Rue d'Alexandrie, 75002 Paris")}
                                    className="bg-gardenz-dark text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gardenz-green transition-colors flex items-center justify-center gap-2"
                                >
                                    Itinéraire Sentier <Navigation size={14} />
                                </button>
                                <Link
                                    to="/boutique?filter=lifestyle"
                                    className="bg-white border-2 border-gardenz-dark text-gardenz-dark px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gardenz-dark hover:text-white transition-all flex items-center justify-center gap-2"
                                >
                                    Passer au QG <Sparkles size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* CARTE 2: REPUBLIK GARDENZ */}
                    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col">
                        <div className="h-72 overflow-hidden relative">
                            <img
                                src="/images/nos-boutiques/republique-gardenz.webp"
                                alt="Republik Gardenz - Paris 3"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                            <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur text-gardenz-dark px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                Paris 3 • République
                            </div>
                        </div>

                        <div className="p-8 flex-grow flex flex-col items-start text-left">
                            <div className="flex items-center justify-between w-full mb-2">
                                <h3 className="font-display text-2xl md:text-3xl font-bold text-gardenz-dark">
                                    REPUBLIK GARDENZ
                                </h3>
                                <FlaskConical size={20} className="text-gardenz-cyan opacity-50" />
                            </div>
                            <p className="text-gardenz-green font-bold text-xs mb-6 uppercase tracking-widest italic">L'Avant-Garde Moléculaire</p>

                            <div className="text-gray-600 mb-8 leading-relaxed text-sm space-y-4">
                                <p className="italic text-gray-400 text-xs">"L'expertise moléculaire Gardenz à Paris République. Diagnostic Lab et Molécules Rares."</p>
                                <p>
                                    Republik est notre sanctuaire dédié à la science moléculaire, un espace minimaliste conçu pour ceux qui recherchent une précision absolue.
                                    Bénéficiez d'un diagnostic personnalisé de votre profil via nos bornes de consultation et l'oeil de nos experts.
                                    C'est l'unique spot pour découvrir en avant-première nos molécules rares avant leur sortie nationale.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 w-full mb-8 border border-gray-100 flex flex-col gap-2">
                                <p className="flex items-center gap-2 text-xs text-gray-500 font-medium"><MapPin size={14} className="text-gardenz-green" /> 5 Place de la République, 75003 Paris</p>
                                <p className="flex items-center gap-2 text-xs text-gray-500 font-medium"><Clock size={14} className="text-gardenz-green" /> Lun-Dim : 10h - 22h</p>
                            </div>

                            <div className="mt-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    onClick={() => openMap("5 Place de la République, 75003 Paris")}
                                    className="bg-gardenz-dark text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gardenz-green transition-colors flex items-center justify-center gap-2"
                                >
                                    Itinéraire République <Navigation size={14} />
                                </button>
                                <Link
                                    to="/boutique?filter=extreme"
                                    className="bg-gardenz-green text-white px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gardenz-dark transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(56,118,29,0.3)]"
                                >
                                    Entrer dans le Lab <FlaskConical size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="text-center">
                    <Link
                        to="/boutique?filter=All"
                        className="bg-gardenz-dark text-white px-10 py-4 rounded-full font-display font-bold uppercase tracking-wider text-sm hover:bg-gardenz-terra transition-all shadow-lg flex items-center gap-3 mx-auto inline-flex"
                    >
                        Explorer le catalogue en ligne <ShoppingCart size={18} />
                    </Link>
                </div>

            </div>

            {/* MODALE GOOGLE MAPS */}
            {selectedAddress && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeMap}></div>
                    <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[80vh]">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-display font-bold text-xl text-gardenz-dark uppercase tracking-tight">VOTRE ITINÉRAIRE</h3>
                                <p className="text-gardenz-terra font-mono text-[10px] font-bold uppercase tracking-widest">{selectedAddress}</p>
                            </div>
                            <button onClick={closeMap} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                                <X size={24} className="text-gardenz-dark" />
                            </button>
                        </div>
                        <div className="flex-grow relative bg-gray-100">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_YOUR_API_KEY&q=${encodeURIComponent(selectedAddress)}`}
                                title="Google Maps"
                                className="absolute inset-0"
                            ></iframe>
                            {/* FALLBACK IF NO API KEY (Simple Search URL in iframe might not work due to X-Frame-Options) */}
                            {/* For a real dev, we use a search URL that allows embedding or a dedicated embed API */}
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                title="Google Maps Fallback"
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
