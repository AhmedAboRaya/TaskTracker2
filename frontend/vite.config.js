import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: process.env.PORT || 3000,
    open: true,
  },
});
