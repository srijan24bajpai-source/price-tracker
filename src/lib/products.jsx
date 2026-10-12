import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { baseProducts, buildAll, buildSubmission } from '../data/products.js'
import { listSubmissions } from './store.js'
import { fetchLive } from './live.js'

const Ctx = createContext({ products: baseProducts, live: null, reload: () => {}, land: [] })
const REFRESH_MS = 5 * 60 * 1000

export function ProductsProvider({ children }) {
  const [approved, setApproved] = useState([])
  const [live, setLive] = useState(null)

  const reload = () => listSubmissions({ approvedOnly: true }).then(setApproved).catch(() => {})
  useEffect(() => { reload() }, [])

  useEffect(() => {
    let stop = false
    const run = () => fetchLive().then((l) => { if (!stop) setLive(l) }).catch(() => {})
    run()
    const t = setInterval(run, REFRESH_MS)
    return () => { stop = true; clearInterval(t) }
  }, [])

  const products = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 3600 * 1000
    const reports = {}
    const fresh = []
    for (const s of [...approved].sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))) {
      if (s.category === 'land') continue // land-rate reports are shown on the Land page, not as products
      if (!s.product_id) fresh.push(s)
      else if ((!s.country || s.country === 'India') && new Date(s.created_at).getTime() >= cutoff) (reports[s.product_id] ||= []).push(s)
    }
    // a bad database row must never take the whole site down: skip it
    const safeBuild = (s) => { try { return buildSubmission(s) } catch { return null } }
    return [...buildAll({ ...(live || {}), reports }), ...fresh.map(safeBuild).filter(Boolean)]
  }, [live, approved])
  return <Ctx.Provider value={{ products, live, reload, land: approved.filter((s) => s.category === 'land') }}>{children}</Ctx.Provider>
}

export const useProducts = () => useContext(Ctx).products
export const useLive = () => useContext(Ctx).live
export const useReload = () => useContext(Ctx).reload
export const useLandReports = () => useContext(Ctx).land || []
