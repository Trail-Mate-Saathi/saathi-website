import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Plain Vite build. The site is served from the root of tripmatego.in (GitHub
// Pages), so assets use absolute paths.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
});
