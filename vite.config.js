import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // bind to 0.0.0.0
    port: 3000,
    strictPort: true  // fail if port 3000 is busy
  },
  resolve: {
    alias: { '@': '/src' }
  }
})
