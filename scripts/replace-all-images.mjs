/**
 * replace-all-images.mjs
 * Remplace toutes les URLs Unsplash dans constants.ts par des images locales.
 * Fait tourner les 6 images disponibles par univers (bien_etre / extreme_lab / lifestyle).
 * Usage : node scripts/replace-all-images.mjs
 */

import { readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CONSTANTS_FILE = join(ROOT, 'constants.ts');

// ─── IMAGES LOCALES PAR UNIVERS ────────────────────────────────────────────
const IMAGES = {
  wellness: [
    '/images/products/bien_etre/huile-cbd-sommeil.webp',
    '/images/products/bien_etre/huile-cbn-nuit-profonde.webp',
    '/images/products/bien_etre/creme-cbd-recuperation.webp',
    '/images/products/bien_etre/huile-cbg-focus.webp',
    '/images/products/bien_etre/infusion-cbd-relaxation.webp',
    '/images/products/bien_etre/serum-cbd-visage.webp',
    '/images/products/bien_etre/gummies-cbd-sommeil.webp',
    '/images/products/bien_etre/baume-arthrose-cbd.webp',
    '/images/products/bien_etre/patch-cbd-douleurs.webp',
  ],
  extreme: [
    '/images/products/extreme_lab/vape-hhc-berry-blast.webp',
    '/images/products/extreme_lab/gummies-thcp-tropical.webp',
    '/images/products/extreme_lab/vape-h4cbd-ice.webp',
    '/images/products/extreme_lab/concentre-hhcp-o-hardcore.webp',
    '/images/products/extreme_lab/resine-thch-dark.webp',
    '/images/products/extreme_lab/vape-hhc-p-mango.webp',
    '/images/products/extreme_lab/wax-thcp-gold.webp',
    '/images/products/extreme_lab/vape-jetable-hhc.webp',
    '/images/products/extreme_lab/moonrock-hhcp-o-purple.webp',
  ],
  lifestyle: [
    '/images/products/lifestyle/hoodie-gardenz-noir.webp',
    '/images/products/lifestyle/tshirt-lab-blanc.webp',
    '/images/products/lifestyle/casquette-gardenz-logo.webp',
    '/images/products/lifestyle/grinder-premium-argent.webp',
    '/images/products/lifestyle/carnet-rolling-kit.webp',
    '/images/products/lifestyle/bag-gardenz-tote.webp',
    '/images/products/lifestyle/veste-workwear-gardenz.webp',
    '/images/products/lifestyle/gourde-isotherme-gardenz.webp',
    '/images/products/lifestyle/plateau-bambou-rolling.webp',
  ],
};


// Regex pour capturer les URLs Unsplash (image + images dans les tableaux)
const UNSPLASH_REGEX = /https:\/\/images\.unsplash\.com\/[^"]+/g;

async function main() {
  let content = await readFile(CONSTANTS_FILE, 'utf-8');

  // Compteurs par univers pour faire tourner les images
  const counters = { wellness: 0, extreme: 0, lifestyle: 0 };

  // On détermine l'univers actif ligne par ligne
  let currentUniverse = 'wellness';

  const lines = content.split('\n');
  const newLines = lines.map(line => {
    // Détecter le changement d'univers grâce aux commentaires et exports
    if (line.includes('WELLNESS_PRODUCTS') || line.includes('// --- BIEN-ÊTRE')) {
      currentUniverse = 'wellness';
    } else if (line.includes('EXTREME_PRODUCTS') || line.includes('// --- EXTREME LAB')) {
      currentUniverse = 'extreme';
    } else if (line.includes('LIFESTYLE_PRODUCTS') || line.includes('// --- LIFESTYLE')) {
      currentUniverse = 'lifestyle';
    }

    // Ignorer les lignes d'agrégation (ALL_PRODUCTS, TOP_SELECTION, etc.)
    if (
      line.includes('ALL_PRODUCTS') ||
      line.includes('TOP_SELECTION') ||
      line.includes('REVIEWS') ||
      line.includes('BLOG_POSTS')
    ) {
      return line;
    }

    // Remplacer les URLs Unsplash
    if (UNSPLASH_REGEX.test(line)) {
      UNSPLASH_REGEX.lastIndex = 0; // reset regex state
      const pool = IMAGES[currentUniverse];
      return line.replace(UNSPLASH_REGEX, () => {
        const img = pool[counters[currentUniverse] % pool.length];
        counters[currentUniverse]++;
        return img;
      });
    }

    return line;
  });

  const newContent = newLines.join('\n');

  await writeFile(CONSTANTS_FILE, newContent, 'utf-8');

  const total = counters.wellness + counters.extreme + counters.lifestyle;
  console.log(`\n✅  ${total} URLs remplacées dans constants.ts`);
  console.log(`   📦 Bien-être : ${counters.wellness} remplacements`);
  console.log(`   ⚡ Extreme Lab : ${counters.extreme} remplacements`);
  console.log(`   👗 Lifestyle : ${counters.lifestyle} remplacements\n`);
}

main().catch(err => {
  console.error('❌ Erreur :', err.message);
  process.exit(1);
});
