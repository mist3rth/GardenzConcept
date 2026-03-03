import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '..', 'public', 'images', 'input');
const productsDir = path.join(__dirname, '..', 'public', 'images', 'products');

// List of target directories
const targetDirs = ['bien_etre', 'extreme_lab', 'lifestyle'].map(dir => path.join(productsDir, dir));

async function processImages() {
    try {
        const files = fs.readdirSync(inputDir);
        
        for (const file of files) {
            if (!file.match(/\.(png|jpe?g|webp)$/i)) continue;

            const inputPath = path.join(inputDir, file);
            
            // Generate standard WebP filename
            const parsedName = path.parse(file);
            const outputFileName = `${parsedName.name}.webp`;

            // Pick a random target directory
            const randomTargetDir = targetDirs[Math.floor(Math.random() * targetDirs.length)];
            const outputPath = path.join(randomTargetDir, outputFileName);

            console.log(`Processing: ${file} -> ${randomTargetDir.split(/[\\/]/).pop()}/${outputFileName}`);

            // Optimize and save the image
            await sharp(inputPath)
                .resize(800, 800, { fit: 'cover' })
                .webp({ quality: 80 })
                .toFile(outputPath);
            
            // Delete original file after process
            fs.unlinkSync(inputPath);
            console.log(`Deleted original: ${file}`);
        }
        
        console.log("All images processed successfully!");
    } catch (err) {
        console.error("Error processing images:", err);
        process.exit(1);
    }
}

processImages();
