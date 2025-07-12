// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // supports BigInt
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // also needed for dependencies like noble-secp256k1
    },
  },
});
