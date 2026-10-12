import { createClient } from '@supabase/supabase-js'

const env = import.meta.env
const url = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL
const key = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// null when env vars are missing -> app falls back to browser localStorage (demo mode)
export const supabase = url && key ? createClient(url, key) : null
