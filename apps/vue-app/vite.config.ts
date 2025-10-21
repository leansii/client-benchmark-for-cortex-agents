import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    target: 'es2021'
  },
  server: {
    port: 4173,
    strictPort: true
  },
  preview: {
    port: 4173
  }
});
