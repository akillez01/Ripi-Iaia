import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Ripi-Iaia/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Para fallback SPA, use o plugin vite-plugin-history-fallback ou configure o servidor web de produção.
  },
});