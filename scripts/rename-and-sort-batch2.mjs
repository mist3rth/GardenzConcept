/**
 * rename-and-sort-batch2.mjs
 * Renomme et trie le 2ème lot de 9 nouvelles images WebP.
 * Usage : node scripts/rename-and-sort-batch2.mjs
 */

import { rename } from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PRODUCTS_DIR = join(ROOT, 'public', 'images', 'products');

// ─── MAPPING : 9 images → 3 catégories (3 bien_etre, 3 extreme_lab, 3 lifestyle)
const MAPPING = [
  // ── BIEN-ÊTRE
  { old: 'Whisk_cjylhtmyczy3edo20cmyqwotutmjrtl1qtoy0yy.webp',   name: 'gummies-cbd-sommeil.webp',       cat: 'bien_etre'   },
  { old: 'Whisk_emyhdty2udolntyw0soibjytmmyjrtlzado30so.webp',   name: 'baume-arthrose-cbd.webp',         cat: 'bien_etre'   },
  { old: 'Whisk_zgzy1mwmym2myidmti2n0gtljzmz00snizmntud.webp',   name: 'patch-cbd-douleurs.webp',         cat: 'bien_etre'   },

  // ── EXTREME LAB
  { old: 'Whisk_0azm4ydo4egmkfmztewohltl2ktm00cmmrzntmt.webp',  name: 'wax-thcp-gold.webp',              cat: 'extreme_lab' },
  { old: 'Whisk_egmjnmn4mmninwo20smyemytqjmxqtlxuwyj1in.webp',  name: 'vape-jetable-hhc.webp',           cat: 'extreme_lab' },
  { old: 'Whisk_kvgmivwzmrmm4ezmty2nzewljzgn00ym0adotqm.webp',  name: 'moonrock-hhcp-o-purple.webp',     cat: 'extreme_lab' },

  // ── LIFESTYLE
  { old: 'Whisk_1mwnhjtymbdomndotmty4gtlzizn00sm3ywnty2.webp',  name: 'veste-workwear-gardenz.webp',     cat: 'lifestyle'   },
  { old: 'Whisk_ac00e80ae742153810a4853e38367be6dr.webp',        name: 'gourde-isotherme-gardenz.webp',   cat: 'lifestyle'   },
  { old: 'Whisk_ywoyiwzwi2yinzmw0cz3ywytm2m3qtl4ujmw0yn.webp',  name: 'plateau-bambou-rolling.webp',     cat: 'lifestyle'   },
];

async function main() {
  console.log('\n🔄  Renommage et tri du lot 2 (9 images)...\n');

  for (const { old: oldName, name: newName, cat } of MAPPING) {
    const src  = join(PRODUCTS_DIR, oldName);
    const dest = join(PRODUCTS_DIR, cat, newName);
    try {
      await rename(src, dest);
      console.log(`  ✅  [${cat.padEnd(11)}]  ${newName}`);
    } catch (err) {
      console.error(`  ❌  ${oldName} : ${err.message}`);
    }
  }

  console.log('\n🎉  Lot 2 terminé !\n');
}

main();
