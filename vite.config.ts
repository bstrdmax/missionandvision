import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This makes the environment variable available in your client-side code.
    // Vite replaces `process.env.API_KEY` with the actual value during the build.
    // For local dev, create a .env file. For Netlify, set it in the UI.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})
