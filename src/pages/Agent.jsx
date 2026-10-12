import { useState, useRef, useEffect } from 'react'
import { useProducts } from '../lib/products.jsx'
import { projects } from '../data/realestate.js'
import { money, inr } from '../lib/util.js'

// Rule-based agent over the local dataset. Swap `answer` for an LLM API call later.
function answer(q, all) {
  const t = q.toLowerCase()
  const hit = all.find((p) => t.includes(p.name.toLowerCase())) || all.find((p) => p.name.toLowerCase().split(/[\s()]+/).filter((w) => w.length > 3).some((w) => t.includes(w)))
  if (/sq ?ft|plot|land|flat|project|migsun|jashn|realty|reality/.test(t)) {
    const city = ['lucknow', 'mumbai', 'delhi', 'bengaluru', 'pune', 'hyderabad', 'kolkata', 'jaipur'].find((c) => t.includes(c)) || 'lucknow'
    const list = projects.filter((p) => p.city.toLowerCase() === city || t.includes(p.builder.toLowerCase().split(' ')[0])).sort((a, b) => a.minPsf - b.minPsf)
    if (!list.length) return 'I have no projects for that place yet. Try Lucknow, Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Kolkata or Jaipur.'
    return 'Per sq ft rates (lowest first):\n' + list.slice(0, 6).map((p) => `• ${p.name} (${p.area}): ${inr(p.minPsf)}–${inr(p.maxPsf)}`).join('\n') + `\n\nLowest entry: ${list[0].name}.`
  }
  if (!hit) return 'Tell me an item, like "cheapest iPhone", "where is gold cheaper", or "when to buy a Swift". I track ' + all.length + ' items.'
  const best = hit.sellers[0], worst = hit.sellers[hit.sellers.length - 1]
  const cc = [...hit.countryPrices].sort((a, b) => a.inr - b.inr)[0]
  const city = [...hit.cityPrices].sort((a, b) => a.price - b.price)[0]
  if (/when|time|month|low|high|forecast/.test(t) && hit.bestMonth)
    return `${hit.name}: usually cheapest in ${hit.bestMonth}, priciest in ${hit.worstMonth}. Next 3 months: ${hit.forecast.map((f) => `${f.month} ${money(f.price)}`).join(', ')}.`
  if (/world|country|abroad|dubai|where/.test(t))
    return `${hit.name} is cheapest in ${cc.flag} ${cc.country} (${cc.symbol}${Math.round(cc.local).toLocaleString()}, about ${money(cc.inr)}). In India the cheapest city is ${city.city} at ${money(city.price)}.`
  return `${hit.name}: buy from ${best.name} at ${money(best.price)} (per ${hit.unit}). Highest seller ${worst.name} charges ${money(worst.price)}, so you save ${money(worst.price - best.price)}.\nCheapest Indian city: ${city.city}. Cheapest country: ${cc.country}.`
}

export default function Agent() {
  const products = useProducts()
  const [msgs, setMsgs] = useState([{ r: 'a', t: 'Hi! Ask me about any price: "cheapest iPhone", "gold price where is it low", "Migsun rate per sq ft", "best month to buy a car".' }])
  const [q, setQ] = useState('')
  const end = useRef()
  useEffect(() => end.current?.scrollIntoView({ behavior: 'smooth' }), [msgs])
  const send = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    setMsgs((m) => [...m, { r: 'u', t: q }, { r: 'a', t: answer(q, products) }])
    setQ('')
  }
  return (
    <>
      <h1>🤖 AI Price Agent</h1>
      <div className="glass chat">
        {msgs.map((m, i) => <div key={i} className={'msg ' + m.r}>{m.t}</div>)}
        <div ref={end} />
      </div>
      <form className="bar" onSubmit={send}>
        <input style={{ flex: 1 }} placeholder="Ask about a price…" value={q} onChange={(e) => setQ(e.target.value)} />
        <button>Send</button>
      </form>
    </>
  )
}
