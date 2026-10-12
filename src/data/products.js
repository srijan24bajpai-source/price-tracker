import { raw } from './raw.js'
import { categories, cities, countries, countryFactors, seasonality, monthNames } from './meta.js'
import { hash, rng, slug } from '../lib/util.js'

const month = new Date().getMonth()

function build([name, sub, sampleBase, unit, over = {}], cat, ctx = {}) {
  const id = slug(name)
  const liveBase = ctx.bases?.[id]
  const reps = (ctx.reports?.[id] || []).filter((x) => Number(x.price) > 0)
  const sorted = reps.map((x) => Number(x.price)).sort((a, b) => a - b)
  const median = sorted.length ? (sorted[(sorted.length - 1) >> 1] + sorted[sorted.length >> 1]) / 2 : null
  // Priority: live feed > median of recent approved community reports > sample
  const base = liveBase ?? median ?? sampleBase
  const r = rng(hash(id))
  const catMeta = categories.find((c) => c.id === cat)
  const sellers = [...catMeta.sellers]
    .sort(() => r() - 0.5)
    .slice(0, Math.min(4, catMeta.sellers.length))
    .map((s) => ({ name: s, price: Math.round(base * (0.92 + r() * 0.2) * 100) / 100 }))
    .sort((a, b) => a.price - b.price)
  for (const x of reps) sellers.push({ name: (x.seller || 'Community') + ' (reported)', price: Number(x.price) })
  sellers.sort((a, b) => a.price - b.price)
  const seas = seasonality[cat]
  const history = Array.from({ length: 12 }, (_, i) => {
    const m = (month - 11 + i + 12) % 12
    const noise = (r() - 0.5) * 0.02
    return { month: monthNames[m], price: Math.round(base * ((1 + seas[m]) / (1 + seas[month]) + noise) * 100) / 100 }
  })
  history[11].price = base
  const forecast = [1, 2, 3].map((k) => {
    const m = (month + k) % 12
    return { month: monthNames[m], price: Math.round(base * ((1 + seas[m]) / (1 + seas[month])) * 100) / 100 }
  })
  const lowM = seas.indexOf(Math.min(...seas))
  const highM = seas.indexOf(Math.max(...seas))
  const cityPrices = cities.map((c) => ({ city: c.id, price: Math.round(base * c.factor * (0.97 + r() * 0.06) * 100) / 100 }))
  for (const x of reps) { const c = cityPrices.find((cp) => cp.city === x.city); if (c && !c.reported) { c.price = Number(x.price); c.reported = true } } // reps are newest-first
  const countryPrices = countries.map((c) => {
    const f = c.id === 'India' ? 1 : (over[c.id] ?? countryFactors[cat][c.id]) * (0.97 + r() * 0.06)
    const inrPrice = base * f
    return { country: c.id, flag: c.flag, inr: Math.round(inrPrice * 100) / 100, local: inrPrice / (ctx.rates?.[c.currency] ?? c.rate), symbol: c.symbol, currency: c.currency }
  })
  const hasSeason = Math.max(...seas) - Math.min(...seas) > 0.02
  return {
    id, name, category: cat, sub, base, unit, sellers, history, forecast, cityPrices, countryPrices,
    bestMonth: hasSeason ? monthNames[lowM] : null,
    worstMonth: hasSeason ? monthNames[highM] : null,
    change30: Math.round(((history[11].price - history[10].price) / history[10].price) * 1000) / 10,
    updated: new Date().toISOString().slice(0, 10),
    live: liveBase != null ? ctx.sources?.[id] : null,
    reported: liveBase == null && reps.length ? { count: reps.length, latest: String(reps[0].created_at).slice(0, 10) } : null,
  }
}

export const buildAll = (ctx = {}) => Object.entries(raw).flatMap(([cat, list]) => list.map((p) => build(p, cat, ctx)))
export const baseProducts = buildAll()

// Merge admin-approved community submissions
export function buildSubmission(s) {
  const p = build([s.name, s.sub || 'Community', Number(s.price), s.unit || 'unit'], s.category)
  p.community = true
  p.sellers = [{ name: s.seller || 'Community', price: Number(s.price) }, ...p.sellers.slice(0, 2)].sort((a, b) => a.price - b.price)
  return p
}
