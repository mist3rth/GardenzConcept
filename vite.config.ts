import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProd = mode === 'production';
    return {
      base: isProd ? '/GardenzConcept/' : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // Core React runtime — chargé en premier, mis en cache agressivement
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              // Icônes — bundle séparé car volumineux
              'vendor-icons': ['lucide-react'],
              // Data statique — séparé car très gros (toutes les descriptions etc.)
              'vendor-data': ['./constants.ts'],
            }
          }
        }
      }
    };
});

