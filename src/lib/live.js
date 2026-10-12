import { slug } from './util.js'

const OZ_G = 31.1035
// India retail ≈ spot + 6% import duty + 3% GST (assumption; excludes making charges)
const IN_MARKUP = 1.06 * 1.03

async function getJSON(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(url + ' ' + r.status)
  return r.json()
}

// Returns { rates: {AED: inrPerUnit, ...}, bases: {productId: inr}, sources: {productId: label}, fxUpdated, metalsUpdated }
// Each source fails independently; whatever succeeds is used, the rest stays on sample data.
export async function fetchLive() {
  const out = { rates: {}, bases: {}, sources: {}, fxUpdated: null, metalsUpdated: null }

  let usdInr = null
  try {
    const fx = await getJSON('https://open.er-api.com/v6/latest/USD')
    const r = fx.rates
    usdInr = r.INR
    for (const cur of ['USD', 'AED', 'SGD', 'GBP', 'JPY', 'HKD']) out.rates[cur] = usdInr / r[cur]
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
  await addMandi(out)
  return out
}

// Free government mandi (wholesale) prices from Agmarknet via data.gov.in.
// Needs a FREE key: register at data.gov.in, set VITE_DATAGOV_KEY. Without it, vegetables stay sample.
const MANDI = { Onion: 'Onion', Potato: 'Potato', Tomato: 'Tomato', 'Green Chilli': 'Green Chilli', Cauliflower: 'Cauliflower', 'Spinach (Palak)': 'Spinach', 'Okra (Bhindi)': 'Bhindi(Ladies Finger)', Garlic: 'Garlic', 'Apple (Shimla)': 'Apple', 'Mango (Dussehri)': 'Mango', Pomegranate: 'Pomegranate' }
const RETAIL_MARKUP = 1.35 // assumption: retail ≈ wholesale mandi modal price + 35%
const CACHE = 'pt_mandi_v1'

async function addMandi(out) {
  const key = import.meta.env.VITE_DATAGOV_KEY
  if (!key) return
  let cached = null
  try { cached = JSON.parse(localStorage.getItem(CACHE)) } catch {}
  let data = cached && Date.now() - cached.at < 60 * 60 * 1000 ? cached.data : null // mandi data is daily; refresh hourly
  if (!data) {
    data = {}
    await Promise.all(Object.entries(MANDI).map(async ([name, commodity]) => {
      try {
        const u = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${key}&format=json&limit=100&filters[commodity]=${encodeURIComponent(commodity)}`
        const j = await getJSON(u)
        const prices = (j.records || []).map((r) => Number(r.modal_price)).filter((n) => n > 0)
        if (prices.length) data[name] = { perKg: prices.reduce((a, b) => a + b, 0) / prices.length / 100, date: j.records[0].arrival_date } // ₹/quintal -> ₹/kg
      } catch {}
    }))
    try { localStorage.setItem(CACHE, JSON.stringify({ at: Date.now(), data })) } catch {}
  }
  for (const [name, v] of Object.entries(data)) {
    const id = slug(name)
    out.bases[id] = Math.round(v.perKg * RETAIL_MARKUP * 10) / 10
    out.sources[id] = `Agmarknet mandi modal price (${v.date}) + 35% retail markup`
    out.mandiUpdated = v.date
  }
}
