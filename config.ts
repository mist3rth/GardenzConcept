
/**
 * Fichier de configuration centralisé.
 * 
 * BEST PRACTICE SECURITY:
 * Les clés d'API privées (ex: Google Reviews API Secret Key) NE DOIVENT PAS être exposées ici
 * si ce code est exécuté côté client.
 * 
 * Ce fichier sert d'interface entre les variables d'environnement (injectées au build)
 * et le reste de l'application.
 */

// Interface pour le typage fort de la configuration
interface AppConfig {
    api: {
        baseUrl: string;
        reviewsEndpoint: string;
        searchEndpoint: string;
        timeout: number;
    };
    features: {
        useLiveReviews: boolean;
        useLiveSearch: boolean;
    };
    contact: {
        email: string;
        phone: string;
        address: string;
    };
}

// Fonction utilitaire pour lire les variables d'environnement de manière sécurisée
// Supporte Vite (import.meta.env) et Create React App / Webpack (process.env)
const getEnv = (key: string, defaultValue: string = ''): string => {
    try {
        // @ts-ignore - Vite specific
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
            // @ts-ignore
            return import.meta.env[key];
        }
        // @ts-ignore - Webpack/Node specific
        if (typeof process !== 'undefined' && process.env && process.env[key]) {
            // @ts-ignore
            return process.env[key];
        }
    } catch (e) {
        // En cas d'erreur (environnement strict), on retourne la valeur par défaut
    }
    return defaultValue;
};

export const CONFIG: AppConfig = {
    api: {
        // URL de votre futur Backend Proxy (Node.js/Python) qui protègera vos clés API secrètes
        baseUrl: getEnv('VITE_API_BASE_URL', ''), 
        reviewsEndpoint: getEnv('VITE_API_REVIEWS_PATH', '/reviews'),
        searchEndpoint: getEnv('VITE_API_SEARCH_PATH', '/products/search'),
        timeout: 5000,
    },
    features: {
        // Basculez à 'true' via le .env uniquement quand le backend est prêt
        useLiveReviews: getEnv('VITE_ENABLE_LIVE_REVIEWS') === 'true',
        useLiveSearch: getEnv('VITE_ENABLE_LIVE_SEARCH') === 'true',
    },
    contact: {
        email: getEnv('VITE_CONTACT_EMAIL', 'contact@gardenz.fr'),
        phone: getEnv('VITE_CONTACT_PHONE', '06 68 52 72 66'),
        address: getEnv('VITE_CONTACT_ADDRESS', '4 rue Beaurepaire, 75010 Paris'),
    }
};
