// Vercel Cron job (see vercel.json): once a day, record today's live prices so the site builds a REAL price history.
// Covers the items that have a legitimate free live source: gold, silver, platinum and the USD/INR rate.
// Needs these Vercel env vars (the Supabase integration adds the first two): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// Optional but recommended: CRON_SECRET (Vercel sends it automatically to cron calls).
import { createClient } from '@supabase/supabase-js'
import { fetchMetalsFx } from '../src/lib/liveCore.js'

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.authorization !== `Bearer ${secret}`) return res.status(401).json({ error: 'unauthorized' })

  const snap = await fetchMetalsFx()
  const day = new Date().toISOString().slice(0, 10)
  const rows = Object.entries(snap.bases).map(([item_id, price]) => ({ day, item_id, price, source: snap.sources[item_id] }))
  if (snap.rates.USD) rows.push({ day, item_id: 'fx-usd-inr', price: snap.rates.USD, source: 'open.er-api.com' })
  if (!rows.length) return res.status(502).json({ saved: false, reason: 'live feeds unreachable', day })

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return res.status(200).json({ saved: false, reason: 'Supabase env vars not set (dry run)', day, rows })

  const sb = createClient(url, key, { auth: { persistSession: false } })
  const { error } = await sb.from('price_history').upsert(rows, { onConflict: 'day,item_id' })
  if (error) return res.status(500).json({ saved: false, error: error.message })
  return res.status(200).json({ saved: true, day, count: rows.length })
}
