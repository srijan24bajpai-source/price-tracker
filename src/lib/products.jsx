import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { baseProducts, buildAll, buildSubmission } from '../data/products.js'
import { listSubmissions } from './store.js'
import { fetchLive } from './live.js'

const Ctx = createContext({ products: baseProducts, live: null })
const REFRESH_MS = 5 * 60 * 1000

export function ProductsProvider({ children }) {
  const [approved, setApproved] = useState([])
  const [live, setLive] = useState(null)

  useEffect(() => {
    listSubmissions({ approvedOnly: true }).then(setApproved).catch(() => {})
  }, [])

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
      if (!s.product_id) fresh.push(s)
      else if ((!s.country || s.country === 'India') && new Date(s.created_at).getTime() >= cutoff) (reports[s.product_id] ||= []).push(s)
    }
    return [...buildAll({ ...(live || {}), reports }), ...fresh.map(buildSubmission)]
  }, [live, approved])
  return <Ctx.Provider value={{ products, live }}>{children}</Ctx.Provider>
}

export const useProducts = () => useContext(Ctx).products
export const useLive = () => useContext(Ctx).live
