import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NEXT_PUBLIC_ is allowed so the Vercel–Supabase integration's variables work as-is.
// Only NEXT_PUBLIC_* and VITE_* reach the browser; SUPABASE_SERVICE_ROLE_KEY and POSTGRES_* never do.
export default defineConfig({ plugins: [react()], envPrefix: ['VITE_', 'NEXT_PUBLIC_'] })
