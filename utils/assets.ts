/**
 * Retourne le chemin complet d'un asset public en prenant en compte
 * le base path de Vite (nécessaire pour GitHub Pages).
 *
 * Usage : getAssetUrl('/images/produit.webp')
 * → En dev   : '/images/produit.webp'
 * → En prod  : '/GardenzConcept/images/produit.webp'
 */
export function getAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  // Évite le double slash si base se termine par '/' et path commence par '/'
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${cleanBase}${path}`;
}
