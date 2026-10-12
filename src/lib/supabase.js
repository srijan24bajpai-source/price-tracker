import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// null when env vars are missing -> app falls back to browser localStorage (demo mode)
export const supabase = url && key ? createClient(url, key) : null
