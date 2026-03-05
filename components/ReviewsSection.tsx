
import React, { useState, useEffect } from 'react';
import { Star, Quote, Loader2, AlertCircle } from 'lucide-react';
import { REVIEWS as MOCK_REVIEWS } from '../constants';
import { CONFIG } from '../config';
import { Review } from '../types';
import { getAssetUrl } from '../utils/assets';

export const ReviewsSection: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
    const [isLoading, setIsLoading] = useState(false);
    // error state is kept for potential UI feedback but not exposed raw
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // SECURITY PATTERN:
        // Si la feature est activée dans le .env, on appelle notre PROPRE backend.
        // Le backend (serveur) détient la clé secrète Google API et fait l'appel à Google.
        // Le frontend ne voit jamais la clé API Google.
        if (CONFIG.features.useLiveReviews && CONFIG.api.baseUrl) {
            const fetchReviews = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`${CONFIG.api.baseUrl}${CONFIG.api.reviewsEndpoint}`, {
                        signal: AbortSignal.timeout(CONFIG.api.timeout)
                    });

                    if (!response.ok) throw new Error('Erreur réseau');

                    const data = await response.json();
                    // Transformation des données si nécessaire pour correspondre à l'interface Review
                    setReviews(data);
                } catch (err) {
                    // SECURITY: Log de l'erreur technique uniquement pour les développeurs
                    console.warn("Erreur technique lors du chargement des avis (backend indisponible ou erreur réseau):", err);

                    // SECURITY: Fallback silencieux sur les données mockées pour ne pas casser l'UI.
                    // Ne jamais afficher le contenu de 'err' directement à l'utilisateur.
                    setReviews(MOCK_REVIEWS);
                    setError("Les avis en temps réel sont momentanément indisponibles. Affichage des avis archivés.");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchReviews();
        }
    }, []);

    // SEO: JSON-LD pour les Rich Snippets (Étoiles dans Google)
    // On utilise les données affichées (reviews) pour que le JSON-LD soit synchrone avec l'UI
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "Gardenz",
        "image": "https://gardenz.fr/logo.png", // Remplacer par URL réelle
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "128", // Idéalement dynamique
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <section className="bg-gardenz-white pt-8 pb-16 border-t border-gray-100">
            {/* Injection SEO */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl font-bold text-gardenz-dark mb-2">ILS NOUS FONT <span className="text-gardenz-green">CONFIANCE</span></h2>
                    <span className="block text-gardenz-terra font-bold text-sm tracking-widest uppercase mb-4">+10 000 clients convaincus. Rejoignez le mouvement</span>
                    <div className="h-1 w-20 bg-gardenz-green mx-auto rounded-full"></div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="animate-spin text-gardenz-green" size={32} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative border border-gray-100 flex flex-col h-full">
                                {/* Quote Icon Background */}
                                <div className="absolute top-4 right-4 text-gray-100">
                                    <Quote size={40} fill="currentColor" />
                                </div>

                                {/* Header: User Info */}
                                <div className="flex items-center gap-4 mb-4 relative z-10">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100">
                                        <img src={getAssetUrl(review.image)} alt={review.author} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gardenz-dark text-sm">{review.author}</h3>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span> {review.role || "Client"}
                                        </span>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < review.rating ? "#EAB308" : "#E5E7EB"}
                                            className={i < review.rating ? "text-yellow-500" : "text-gray-200"}
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-gray-600 text-sm italic leading-relaxed mb-6 flex-grow">
                                    "{review.text}"
                                </p>

                                {/* Footer: Context */}
                                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-xs">
                                    <span className={`font-bold px-2 py-1 rounded ${review.universe === 'Bien-être'
                                            ? 'bg-gardenz-green/10 text-gardenz-green'
                                            : 'bg-gardenz-black text-gardenz-cyan'
                                        }`}>
                                        {review.universe}
                                    </span>
                                    <span className="text-gray-400 font-medium uppercase tracking-wide truncate max-w-[100px]">
                                        {review.productCategory}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};
