import { slug } from './util.js'
import { fetchMetalsFx, getJSON } from './liveCore.js'

// Metals + FX come from liveCore.js (shared with the daily server job); mandi prices are added here.
export async function fetchLive() {
  const out = await fetchMetalsFx()
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
