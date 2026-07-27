import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { assetManifestPlugin } from './src/plugins/assetManifest';

export default defineConfig({
  base: '/mohamed-helika-portfolio/',

  plugins: [react(), assetManifestPlugin()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});