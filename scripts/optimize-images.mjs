/**
 * optimize-images.mjs
 * Convertit des images PNG (portrait) en WebP carré optimisé.
 * Usage : node scripts/optimize-images.mjs
 *
 * - Source  : ./public/images/input/   (mets tes PNG ici)
 * - Sortie  : ./public/images/products/ (WebP carrés générés ici)
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const INPUT_DIR  = join(ROOT, 'public', 'images', 'input');
const OUTPUT_DIR = join(ROOT, 'public', 'images', 'products');
const SIZE       = 800;   // Taille du carré final (px) — modifie si besoin
const QUALITY    = 85;    // Qualité WebP (0-100) — 85 est le bon équilibre
// ─────────────────────────────────────────────────────────────────────────────

async function processImage(filename, inputDir, outputDir) {
  const inputPath  = join(inputDir, filename);
  const { name }   = parse(filename);
  const outputPath = join(outputDir, `${name}.webp`);

  try {
    // Récupère les métadonnées de l'image d'entrée
    const meta = await sharp(inputPath).metadata();
    const { width, height } = meta;

    // Calcule les coordonnées pour un recadrage centré (crop carré)
    const cropSize = Math.min(width, height);
    const left = Math.floor((width  - cropSize) / 2);
    const top  = Math.floor((height - cropSize) / 2);

    // Pipeline : crop centré → resize → WebP
    await sharp(inputPath)
      .extract({ left, top, width: cropSize, height: cropSize })
      .resize(SIZE, SIZE, { fit: 'cover' })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);

    const sizeBefore = Math.round(meta.size / 1024) || '?';
    const stats      = await sharp(outputPath).metadata();
    const sizeAfter  = Math.round((stats.size ?? 0) / 1024);

    console.log(`  ✅  ${filename}  →  ${name}.webp  (${sizeBefore}KB → ${sizeAfter}KB)`);
  } catch (err) {
    console.error(`  ❌  ${filename} : ${err.message}`);
  }
}

async function main() {
  // Crée les dossiers si nécessaire
  await mkdir(INPUT_DIR,  { recursive: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Lit les fichiers d'entrée (PNG, JPG, JPEG)
  const files = (await readdir(INPUT_DIR)).filter(f =>
    /\.(png|jpg|jpeg|gif|tiff|avif)$/i.test(f)
  );

  if (files.length === 0) {
    console.log(`\n⚠️  Aucune image trouvée dans : ${INPUT_DIR}`);
    console.log(`   → Place tes fichiers PNG dans ce dossier, puis relance le script.\n`);
    return;
  }

  console.log(`\n🔄  Optimisation de ${files.length} image(s)...\n`);
  await Promise.all(files.map(f => processImage(f, INPUT_DIR, OUTPUT_DIR)));
  console.log(`\n🎉  Terminé ! Images disponibles dans : ${OUTPUT_DIR}\n`);
}

main();
