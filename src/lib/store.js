import { supabase } from './supabase.js'

const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

export const usingDatabase = !!supabase

// ---- Submissions -------------------------------------------------------
const toRow = (s) => ({ name: s.name, category: s.category, sub: s.sub || null, price: Number(s.price), unit: s.unit || 'unit', seller: s.seller || null, city: s.city, country: s.country, product_id: s.product_id || null })

export async function addSubmission(s) {
  if (supabase) {
    const { error } = await supabase.from('submissions').insert(toRow(s))
    if (error) throw error
    return
  }
  write('pt_submissions', [...read('pt_submissions', []), { ...s, id: Date.now(), status: 'pending', created_at: new Date().toISOString() }])
}

// Approved items are public. Admin (signed in) can list everything.
export async function listSubmissions({ approvedOnly }) {
  if (supabase) {
    let q = supabase.from('submissions').select('*').order('created_at', { ascending: false })
    if (approvedOnly) q = q.eq('status', 'approved')
    const { data, error } = await q
    if (error) throw error
    return data
  }
  const all = read('pt_submissions', [])
  return approvedOnly ? all.filter((s) => s.status === 'approved') : all
}

export async function setSubmissionStatus(id, status) {
  if (supabase) {
    const { error } = await supabase.from('submissions').update({ status }).eq('id', id)
    if (error) throw error
    return
  }
  write('pt_submissions', read('pt_submissions', []).map((s) => (s.id === id ? { ...s, status } : s)))
}

// ---- Comments ----------------------------------------------------------
export async function getComments(productId) {
  if (supabase) {
    const { data, error } = await supabase.from('comments').select('*').eq('product_id', productId).order('created_at', { ascending: false })
    if (error) throw error
    return data
  }
  return read('pt_comments', {})[productId] || []
}

export async function addComment(productId, c) {
  if (supabase) {
    const { error } = await supabase.from('comments').insert({ product_id: productId, name: c.name, text: c.text, price: c.price ? Number(c.price) : null, place: c.where || null })
    if (error) throw error
    return
  }
  const all = read('pt_comments', {})
  all[productId] = [{ name: c.name, text: c.text, price: c.price || null, place: c.where || null, created_at: new Date().toISOString() }, ...(all[productId] || [])]
  write('pt_comments', all)
}

// ---- Admin auth --------------------------------------------------------
export async function adminSession() {
  if (!supabase) return sessionStorage.getItem('pt_admin') === '1'
  const { data } = await supabase.auth.getSession()
  return !!data.session
}
export async function adminLogin(email, password) {
  if (!supabase) {
    if (password !== (import.meta.env.VITE_ADMIN_PASSWORD || 'admin123')) throw new Error('Wrong password')
    sessionStorage.setItem('pt_admin', '1')
    return
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}
export async function adminLogout() {
  sessionStorage.removeItem('pt_admin')
  if (supabase) await supabase.auth.signOut()
}
