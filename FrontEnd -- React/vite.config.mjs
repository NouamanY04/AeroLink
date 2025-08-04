// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    },
    allowedHosts: [
      'worse-inch-photograph-association.trycloudflare.com'
    ]
  },
});
