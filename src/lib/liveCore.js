// Live exchange rates + metal prices. No browser-only APIs here, so it runs in the page AND in the daily server job.
import { slug } from './util.js'

const OZ_G = 31.1035
// India retail ≈ spot + 6% import duty + 3% GST (assumption; excludes making charges)
const IN_MARKUP = 1.06 * 1.03

export async function getJSON(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(url + ' ' + r.status)
  return r.json()
}

// Returns { rates: {AED: inrPerUnit, ...}, bases: {productId: inr}, sources: {productId: label}, fxUpdated, metalsUpdated }
// Each source fails independently; whatever succeeds is used, the rest stays on sample data.
export async function fetchMetalsFx() {
  const out = { rates: {}, bases: {}, sources: {}, fxUpdated: null, metalsUpdated: null }

  let usdInr = null
  try {
    const fx = await getJSON('https://open.er-api.com/v6/latest/USD')
    const r = fx.rates
    usdInr = r.INR
    for (const cur of ['USD', 'AED', 'SGD', 'GBP', 'JPY', 'HKD', 'CAD', 'AUD', 'EUR']) out.rates[cur] = usdInr / r[cur]
    out.fxUpdated = fx.time_last_update_utc
  } catch {}

  if (usdInr) {
    try {
      const [au, ag, pt] = await Promise.all(['XAU', 'XAG', 'XPT'].map((m) => getJSON('https://api.gold-api.com/price/' + m)))
      const gram = (spotUsd) => (spotUsd / OZ_G) * usdInr * IN_MARKUP
      const src = 'Spot metal price × USD/INR + duty & GST'
      const set = (name, v) => { const id = slug(name); out.bases[id] = Math.round(v); out.sources[id] = src }
      set('Gold 24K (10g)', gram(au.price) * 10)
      set('Gold 22K (10g)', gram(au.price) * 10 * (22 / 24))
      set('Gold Mangalsutra 22K (10g)', gram(au.price) * 10 * (22 / 24) * 1.12) // ~12% making
      set('Silver (1kg)', gram(ag.price) * 1000)
      set('Platinum (10g)', gram(pt.price) * 10)
      out.metalsUpdated = au.updatedAt
    } catch {}
  }
  return out
}
