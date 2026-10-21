import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    rollupOptions: {
      output: {
        // Keep React + Framer Motion in a cacheable vendor chunk
        manualChunks: { vendor: ['react', 'react-dom', 'framer-motion'] },
      },
    },
  },
})
