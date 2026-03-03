import { ALL_PRODUCTS, WELLNESS_PRODUCTS, EXTREME_PRODUCTS, LIFESTYLE_PRODUCTS } from '../constants';
import { Product } from '../types';

/**
 * Knowledge Base for Chatbot RAG (Retrieval Augmented Generation)
 * Formats product catalog and site knowledge for AI context injection
 */

// Molecular knowledge base
export const MOLECULAR_INDEX = {
    CBD: {
        name: 'CBD (Cannabidiol)',
        effects: 'Équilibre, homéostasie, calme diffus, anti-stress',
        usage: 'Relaxation, sommeil léger, gestion du stress quotidien',
        intensity: 'Douce à modérée'
    },
    CBG: {
        name: 'CBG (Cannabigérol)',
        effects: 'Focus, clarté mentale, boost cognitif, énergie',
        usage: 'Concentration, productivité, journée active',
        intensity: 'Modérée, stimulante'
    },
    CBN: {
        name: 'CBN (Cannabinol)',
        effects: 'Sommeil profond, sédation naturelle, relaxation musculaire',
        usage: 'Insomnies, réveils nocturnes, sommeil réparateur',
        intensity: 'Puissante, sédative'
    },
    'H4-CBD': {
        name: 'H4-CBD (Hexahydrocannabidiol)',
        effects: 'Détente profonde, affinité 100x vs CBD classique',
        usage: 'Relaxation intense, alternative au CBD standard',
        intensity: 'Forte'
    },
    THCP: {
        name: 'THCP (Tétrahydrocannabiphorol)',
        effects: 'Puissance extrême, affinité CB1 maximale, euphorie',
        usage: 'Expérience intense, réservé aux experts',
        intensity: 'Très forte (Hardcore)'
    },
    'HHCP-O': {
        name: 'HHCP-O (Hexahydrocannabiphorol-O-Acétate)',
        effects: 'Puissance maximale, effet prolongé, spatial',
        usage: 'Expérience extrême, utilisateurs avancés uniquement',
        intensity: 'Extrême (Hardcore)'
    },
    THCH: {
        name: 'THCH (Tétrahydrocannabihexol)',
        effects: 'Puissance élevée, effet cérébral, créativité',
        usage: 'Expérience medium à forte',
        intensity: 'Forte (Medium à Hardcore)'
    },
    HHC: {
        name: 'HHC (Hexahydrocannabinol)',
        effects: 'Euphorie légère, relaxation, bien-être',
        usage: 'Alternative au THC, effet équilibré',
        intensity: 'Modérée (Soft à Medium)'
    },
    'HHC-P': {
        name: 'HHC-P (Hexahydrocannabiphorol)',
        effects: 'Puissance accrue vs HHC, euphorie marquée',
        usage: 'Expérience medium, utilisateurs habitués',
        intensity: 'Forte (Medium)'
    },
    THCV: {
        name: 'THCV (Tétrahydrocannabivarine)',
        effects: 'Énergie, focus, coupe-faim, clarté',
        usage: 'Productivité, sport, journée active',
        intensity: 'Modérée, stimulante'
    }
};

// Build concise product knowledge for AI context
export function buildProductKnowledge(): string {
    const productSummaries = ALL_PRODUCTS.map(p => {
        const benefits = p.benefits?.slice(0, 2).join(', ') || '';
        const tags = p.tags?.join(', ') || '';

        return `[${p.id}] ${p.name} - ${p.price}€ | ${p.category} | ${p.molecule || 'N/A'} | ${p.universe} | ${tags} | ${benefits}`;
    }).join('\n');

    return `
CATALOGUE PRODUITS (${ALL_PRODUCTS.length} produits):

${productSummaries}

MOLÉCULES DISPONIBLES:
${Object.entries(MOLECULAR_INDEX).map(([key, mol]) =>
        `- ${mol.name}: ${mol.effects}`
    ).join('\n')}
`;
}

// Search products based on user intent
export function searchProducts(query: string, options?: {
    universe?: string;
    maxResults?: number;
}): Product[] {
    const lowerQuery = query.toLowerCase();
    const maxResults = options?.maxResults || 5;

    // Intent mapping
    const intentMap: Record<string, { tags?: string[]; molecules?: string[]; universe?: string; intensity?: string[] }> = {
        sommeil: { tags: ['Sommeil'], molecules: ['CBN', 'CBD'] },
        dormir: { tags: ['Sommeil'], molecules: ['CBN', 'CBD'] },
        insomnie: { tags: ['Sommeil'], molecules: ['CBN'] },
        stress: { tags: ['Stress'], molecules: ['CBD'] },
        anxiété: { tags: ['Stress'], molecules: ['CBD'] },
        anxieux: { tags: ['Stress'], molecules: ['CBD'] },
        focus: { tags: ['Focus'], molecules: ['CBG', 'THCV'] },
        concentration: { tags: ['Focus'], molecules: ['CBG'] },
        productivité: { tags: ['Focus'], molecules: ['CBG'] },
        relaxation: { tags: ['Relaxation'], molecules: ['CBD'] },
        détente: { tags: ['Relaxation'], molecules: ['CBD', 'H4-CBD'] },
        puissant: { universe: 'extreme', intensity: ['Hardcore'] },
        fort: { universe: 'extreme', intensity: ['Hardcore', 'Medium'] },
        intense: { universe: 'extreme', intensity: ['Hardcore'] },
        doux: { universe: 'wellness' },
        léger: { intensity: ['Soft'] },
        huile: { category: 'Huiles' },
        fleur: { category: 'Fleurs' },
        vape: { category: 'Vape' },
        gummies: { category: 'Comestibles' },
        vêtement: { universe: 'lifestyle', category: 'Vêtements' },
        accessoire: { universe: 'lifestyle', category: 'Accessoires' }
    };

    // Find matching intent
    let filters: any = {};
    for (const [keyword, intent] of Object.entries(intentMap)) {
        if (lowerQuery.includes(keyword)) {
            filters = { ...filters, ...intent };
            break;
        }
    }

    // Apply universe filter from options
    if (options?.universe) {
        filters.universe = options.universe;
    }

    // Filter products
    let results = ALL_PRODUCTS.filter(product => {
        // Stock check
        if (product.stock === 0) return false;

        // Universe filter
        if (filters.universe && product.universe !== filters.universe) return false;

        // Category filter
        if (filters.category && !product.category.includes(filters.category)) return false;

        // Tag filter
        if (filters.tags && !filters.tags.some((tag: string) => product.tags?.includes(tag))) return false;

        // Molecule filter
        if (filters.molecules && !filters.molecules.includes(product.molecule)) return false;

        // Intensity filter (for extreme products)
        if (filters.intensity && product.intensity && !filters.intensity.includes(product.intensity)) return false;

        // Keyword matching in name/description
        const searchText = `${product.name} ${product.shortDescription || ''} ${product.category}`.toLowerCase();
        if (lowerQuery.split(' ').some(word => word.length > 3 && searchText.includes(word))) {
            return true;
        }

        return filters.tags || filters.molecules || filters.universe || filters.category;
    });

    // Rank by relevance
    results = results.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        // Prioritize exact name matches
        if (a.name.toLowerCase().includes(lowerQuery)) scoreA += 10;
        if (b.name.toLowerCase().includes(lowerQuery)) scoreB += 10;

        // Prioritize hot/new/team choice
        if (a.isHot) scoreA += 3;
        if (b.isHot) scoreB += 3;
        if (a.isNew) scoreA += 2;
        if (b.isNew) scoreB += 2;
        if (a.isTeamChoice) scoreA += 2;
        if (b.isTeamChoice) scoreB += 2;

        // Prioritize in-stock with higher quantities
        scoreA += Math.min(a.stock || 0, 10) / 10;
        scoreB += Math.min(b.stock || 0, 10) / 10;

        return scoreB - scoreA;
    });

    return results.slice(0, maxResults);
}

// Get product recommendations based on user need
export function getProductRecommendations(userNeed: string, count: number = 3): Product[] {
    return searchProducts(userNeed, { maxResults: count });
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
    return ALL_PRODUCTS.find(p => p.id === id);
}

// Get products by IDs
export function getProductsByIds(ids: string[]): Product[] {
    return ids.map(id => getProductById(id)).filter(Boolean) as Product[];
}

// Format product for display in chat
export function formatProductForChat(product: Product): string {
    const molecule = product.molecule ? `[${product.molecule}]` : '';
    const tags = product.tags?.slice(0, 2).join(', ') || '';
    return `${product.name} - ${product.price}€ ${molecule} | ${tags}`;
}

// Build enhanced system instruction with product knowledge
export function buildEnhancedSystemInstruction(baseInstruction: string): string {
    const productKnowledge = buildProductKnowledge();

    return `${baseInstruction}

ACCÈS AU CATALOGUE PRODUITS:
Tu as accès à ${ALL_PRODUCTS.length} produits répartis en 3 univers :
- BIEN-ÊTRE (${WELLNESS_PRODUCTS.length} produits) : Sommeil, Stress, Focus, Relaxation
- EXTREME LAB (${EXTREME_PRODUCTS.length} produits) : Molécules puissantes (Soft, Medium, Hardcore)
- LIFESTYLE (${LIFESTYLE_PRODUCTS.length} produits) : Vêtements, Accessoires, Culture

COMMENT RECOMMANDER DES PRODUITS:
Quand un utilisateur demande des recommandations, utilise ce format EXACT :
[RECOMMEND: id1, id2, id3]

Exemple : "Pour le sommeil, je te conseille [RECOMMEND: w1, w4, w3]"

RÈGLES IMPORTANTES:
1. Recommande TOUJOURS 2-4 produits maximum par message
2. Utilise les IDs exacts du catalogue (ex: w1, e2, l5)
3. Explique POURQUOI tu recommandes chaque produit
4. Mentionne le prix et la molécule
5. Adapte l'intensité au niveau de l'utilisateur (débutant = Soft/Wellness, expert = Hardcore)

${productKnowledge}
`;
}
