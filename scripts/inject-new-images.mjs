/**
 * inject-new-images.mjs
 * Injecte les nouvelles images (lot 2) dans constants.ts en remplaçant
 * les premières occurrences d'images déjà utilisées plusieurs fois.
 * Usage : node scripts/inject-new-images.mjs
 */

import { readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CONSTANTS_FILE = join(ROOT, 'constants.ts');

// Pool d'images lot 2 à injecter par univers
const NEW_IMAGES = {
  wellness: [
    '/images/products/bien_etre/gummies-cbd-sommeil.webp',
    '/images/products/bien_etre/baume-arthrose-cbd.webp',
    '/images/products/bien_etre/patch-cbd-douleurs.webp',
  ],
  extreme: [
    '/images/products/extreme_lab/wax-thcp-gold.webp',
    '/images/products/extreme_lab/vape-jetable-hhc.webp',
    '/images/products/extreme_lab/moonrock-hhcp-o-purple.webp',
  ],
  lifestyle: [
    '/images/products/lifestyle/veste-workwear-gardenz.webp',
    '/images/products/lifestyle/gourde-isotherme-gardenz.webp',
    '/images/products/lifestyle/plateau-bambou-rolling.webp',
  ],
};

// Images existantes à remplacer (celles les plus répétées dans constants.ts)
// On remplace la 1ère puis la 2ème occurrence de chaque pour varier
const REPLACEMENTS = [
  // Bien-être : remplacer des occurrences de l'image serum et infusion
  { universe: 'wellness', target: '/images/products/bien_etre/serum-cbd-visage.webp',        newIdx: 0 },
  { universe: 'wellness', target: '/images/products/bien_etre/infusion-cbd-relaxation.webp', newIdx: 1 },
  { universe: 'wellness', target: '/images/products/bien_etre/creme-cbd-recuperation.webp',  newIdx: 2 },
  // Extreme Lab
  { universe: 'extreme',  target: '/images/products/extreme_lab/resine-thch-dark.webp',         newIdx: 0 },
  { universe: 'extreme',  target: '/images/products/extreme_lab/concentre-hhcp-o-hardcore.webp', newIdx: 1 },
  { universe: 'extreme',  target: '/images/products/extreme_lab/vape-hhc-p-mango.webp',          newIdx: 2 },
  // Lifestyle
  { universe: 'lifestyle', target: '/images/products/lifestyle/plateau-bambou-rolling.webp',    newIdx: 0 },
  { universe: 'lifestyle', target: '/images/products/lifestyle/gourde-isotherme-gardenz.webp',  newIdx: 1 },
  { universe: 'lifestyle', target: '/images/products/lifestyle/veste-workwear-gardenz.webp',    newIdx: 2 },
];

async function main() {
  let content = await readFile(CONSTANTS_FILE, 'utf-8');
  let totalReplaced = 0;

  for (const { universe, target, newIdx } of REPLACEMENTS) {
    const newImage = NEW_IMAGES[universe][newIdx];
    // Remplace la PREMIÈRE occurrence seulement
    if (content.includes(target)) {
      const idx = content.indexOf(target);
      content = content.slice(0, idx) + newImage + content.slice(idx + target.length);
      console.log(`  ✅  [${universe.padEnd(9)}]  ${newImage.split('/').pop()}`);
      totalReplaced++;
    } else {
      console.log(`  ⚠️   Image cible introuvable : ${target}`);
    }
  }

  await writeFile(CONSTANTS_FILE, content, 'utf-8');
  console.log(`\n🎉  ${totalReplaced} images du lot 2 injectées dans constants.ts\n`);
}

main().catch(err => {
  console.error('❌ Erreur :', err.message);
  process.exit(1);
});
