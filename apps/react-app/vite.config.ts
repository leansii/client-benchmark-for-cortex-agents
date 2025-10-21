import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    target: 'es2021'
  },
  server: {
    port: 5173,
    strictPort: true
  },
  preview: {
    port: 5173
  }
});
