import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      base: '/Portfolio/',
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
      },
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()]
    };
});
