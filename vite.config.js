import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,      // Puerto inicial deseado
    strictPort: false, // Si el 5173 está ocupado, usa el siguiente disponible (ej. 5174)
    host: true       // Expone el servidor en tu red local y mapea correctamente localhost
  }
})
