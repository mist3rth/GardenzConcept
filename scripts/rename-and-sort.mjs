/**
 * rename-and-sort.mjs
 * Renomme les images WebP et les répartit dans 3 catégories.
 * Usage : node scripts/rename-and-sort.mjs
 */

import { rename, mkdir } from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PRODUCTS_DIR = join(ROOT, 'public', 'images', 'products');

// ─── MAPPING : ancien nom → { nouveau nom, catégorie } ────────────────────────
// 18 images réparties : 6 bien_etre | 6 extreme_lab | 6 lifestyle
const MAPPING = [
  // ── BIEN-ÊTRE (huiles, crèmes, infusions)
  { old: 'Whisk_1uwn3kjnzqgojbtztqtmmltllrmn00yn5i2yty2.webp',       name: 'huile-cbd-sommeil.webp',          cat: 'bien_etre'  },
  { old: 'Whisk_2ctnygdmifjmzetntyznmfwl0adz00cz2umztyt.webp',       name: 'huile-cbn-nuit-profonde.webp',    cat: 'bien_etre'  },
  { old: 'Whisk_ac00e80ae742153810a4853e38367be6dr.webp',             name: 'creme-cbd-recuperation.webp',     cat: 'bien_etre'  },
  { old: 'Whisk_0edmwm2m1e2mxudntiwz3ewljhtm00ymmzgntaj.webp',       name: 'huile-cbg-focus.webp',            cat: 'bien_etre'  },
  { old: 'Whisk_4kznzkjmkrzmjnmytctmjfwlzqtz00sy1qjytem.webp',       name: 'infusion-cbd-relaxation.webp',    cat: 'bien_etre'  },
  { old: 'Whisk_kfwoifgz1qjmifdztyjz3ktlzktn00cohltztid.webp',       name: 'serum-cbd-visage.webp',           cat: 'bien_etre'  },

  // ── EXTREME LAB (vape, gummies, concentrés, produits psychoactifs)
  { old: 'Whisk_aznmjto5qzmjntnj1cnzcjytuwomrtlmvtnz0sm.webp',       name: 'vape-hhc-berry-blast.webp',       cat: 'extreme_lab' },
  { old: 'Whisk_f101d0695319172a99b49c3622564737dr.webp',             name: 'gummies-thcp-tropical.webp',      cat: 'extreme_lab' },
  { old: 'Whisk_gjmyqgzjjdmykdmy0sowutytqzmwqtl2uwn50sz.webp',       name: 'vape-h4cbd-ice.webp',             cat: 'extreme_lab' },
  { old: 'Whisk_ibdmmrtyymwo0qzytymzkhtl2mwy00cmzqmmtqg.webp',       name: 'concentre-hhcp-o-hardcore.webp',  cat: 'extreme_lab' },
  { old: 'Whisk_iwzjnwnxajn4gtok1sy5ujytumy5qtl4umyw0sm.webp',       name: 'resine-thch-dark.webp',           cat: 'extreme_lab' },
  { old: 'Whisk_0q2y1gdzhr2ymzwotatnlltlwuto00so0gdztiw.webp',       name: 'vape-hhc-p-mango.webp',           cat: 'extreme_lab' },

  // ── LIFESTYLE (vêtements, accessoires, culture)
  { old: 'Whisk_ibdo2emywemn2idmtiwn3iwlmftz00iyyitntgt.webp',       name: 'hoodie-gardenz-noir.webp',        cat: 'lifestyle'   },
  { old: 'Whisk_jnwy2mjn2ugoymtotimykfwlmvwn00izlvdztyw.webp',       name: 'tshirt-lab-blanc.webp',           cat: 'lifestyle'   },
  { old: 'Whisk_kjgo3uznwety5qmntqtmzgtl5ito00in1i2ntem.webp',       name: 'casquette-gardenz-logo.webp',     cat: 'lifestyle'   },
  { old: 'Whisk_mrjmwcjmwmgo0ywytizm5ewl2ygn00symbzytug.webp',       name: 'grinder-premium-argent.webp',     cat: 'lifestyle'   },
  { old: 'Whisk_udn4iwoyutokr2n30in1edotemm0qtl4yjzi1cz (1).webp',  name: 'carnet-rolling-kit.webp',         cat: 'lifestyle'   },
  { old: 'Whisk_zqdnxyjzjljz0egztqzy0ewlyatn00snirtytuj.webp',       name: 'bag-gardenz-tote.webp',           cat: 'lifestyle'   },
];
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  // Crée les sous-dossiers
  await mkdir(join(PRODUCTS_DIR, 'bien_etre'),   { recursive: true });
  await mkdir(join(PRODUCTS_DIR, 'extreme_lab'), { recursive: true });
  await mkdir(join(PRODUCTS_DIR, 'lifestyle'),   { recursive: true });

  console.log('\n🔄  Renommage et tri des images...\n');

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

  console.log('\n🎉  Terminé !\n');
  console.log('   📁 public/images/products/bien_etre/   → 6 images (huiles, crèmes)');
  console.log('   📁 public/images/products/extreme_lab/ → 6 images (vape, gummies)');
  console.log('   📁 public/images/products/lifestyle/   → 6 images (vêtements, accessoires)\n');

  // Affiche le mapping pour mettre à jour constants.ts
  console.log('\n📋  Chemins à utiliser dans constants.ts :\n');
  for (const { name, cat } of MAPPING) {
    console.log(`   /images/products/${cat}/${name}`);
  }
  console.log('');
}

main();
