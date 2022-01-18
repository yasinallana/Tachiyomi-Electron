import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.IS_DEV !== 'true' ? './' : '/',
  build: {
    outDir: 'electron/svelte-dist',
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  plugins: [svelte()],
  optimizeDeps: { exclude: ['svelte-navigator'] },
});
