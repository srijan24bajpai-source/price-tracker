import { projects } from '../data/realestate.js'
import { lucknowLand } from '../data/lucknowLand.js'
import { categories, cities } from '../data/meta.js'
import { indiaCities } from '../data/indiaLand.js'
import { worldProperty } from '../data/worldProperty.js'
import { gorakhpurLand } from '../data/gorakhpurLand.js'
import { money, inr } from './util.js'
export { inr }

// Rule-based answering over the local dataset (no LLM). Shared by the Agent page and the global voice widget.
const STOP = new Set('a an the of in on at for to is are was be do does what whats which where when how much many price prices rate rates cost costs cheap cheapest cheaper best lowest low high highest expensive buy get give me show tell about any all list current today now around world worldwide country countries india indian city please can you i want need find compare vs and or with from by it its this that'.split(' '))
const CATEGORY_WORDS = {
  vehicles: 'car cars vehicle vehicles bike bikes scooter suv sedan hatchback ev',
  electronics: 'phone phones mobile mobiles laptop laptops tv television electronics electronic gadget gadgets',
  jewelry: 'gold silver jewellery jewelry watch watches diamond platinum',
  cosmetics: 'cosmetic cosmetics makeup perfume',
  food: 'food sweet sweets grocery groceries dairy',
  vegetables: 'vegetable vegetables veggies fruit fruits',
  clothing: 'cloth clothes clothing dress shoes footwear saree',
  home: 'furniture appliance appliances paint cement',
  health: 'medicine medicines health supplement',
  sports: 'sport sports cricket gym fitness',
  education: 'school fee fees college tuition coaching education',
  fuel: 'fuel petrol diesel cng lpg electricity broadband recharge',
}

export const norm = (s) => s.toLowerCase().replace(/([a-z])(\d)/g, '$1 $2').replace(/(\d)([a-z])/g, '$1 $2').replace(/[^a-z0-9₹. ]+/g, ' ').replace(/\s+/g, ' ').trim()
const toks = (s) => norm(s).split(' ').filter(Boolean)

export function bestProduct(q, products) {
  const qt = toks(q).filter((t) => !STOP.has(t) && !/^\d{5,}$/.test(t))
  if (!qt.length) return null
  let best = null
  for (const p of products) {
    const nt = toks(p.name)
    let score = 0
    for (const t of qt) {
      if (nt.includes(t)) score += t.length > 2 ? 2 : 1
      else if (t.length >= 4 && nt.some((n) => n.startsWith(t) || (n.length >= 4 && t.startsWith(n)))) score += 1
    }
    if (!score) continue
    score += nt.every((n) => qt.includes(n)) ? 1 : 0 // exact-name bonus
    score -= nt.length * 0.01
    if (!best || score > best.score) best = { p, score }
  }
  return best && best.score >= 1.5 ? best.p : null
}

export function categoryOf(q) {
  const t = new Set(toks(q).flatMap((w) => (w.endsWith('s') ? [w, w.slice(0, -1)] : [w])))
  for (const c of categories) if (norm(c.name).split(' ').some((w) => w.length > 4 && t.has(w))) return c.id
  for (const [id, words] of Object.entries(CATEGORY_WORDS)) if (words.split(' ').some((w) => t.has(w))) return id
  return null
}

function cityLandAnswer(q) {
  const t = norm(q)
  if (t.includes('gorakhpur'))
    return 'Gorakhpur land rates (very limited data, add more on the Land page):' + String.fromCharCode(10) + gorakhpurLand.map((g) => `• ${g.area}: ${g.psf ? inr(g.psf) : inr(g.psfMin) + '–' + inr(g.psfMax)}/sq ft (${g.kind}, ${g.source})`).join(String.fromCharCode(10))
  const city = indiaCities.find((c) => c.city !== 'Lucknow' && t.includes(norm(c.city)))
  const loc = !city && indiaCities.flatMap((c) => c.localities.map((l) => ({ ...l, city: c.city }))).filter((l) => norm(l.name).length > 5 && t.includes(norm(l.name)))
  if (city) return `${city.city}: average ${inr(city.avg)}/sq ft (built-up, asking). Top localities: ` + [...city.localities].sort((a, b) => b.rate - a.rate).slice(0, 6).map((l) => `${l.name} ${inr(l.rate)}`).join(', ')
  if (loc && loc.length) return loc.slice(0, 5).map((l) => `${l.name}, ${l.city}: ${inr(l.rate)}/sq ft`).join(String.fromCharCode(10))
  const w = worldProperty.find((x) => norm(x.city.replace(/,.*$/, '')).length > 3 && t.includes(norm(x.city.replace(/,.*$/, ''))))
  if (w) return `${w.city}, ${w.country}: city-centre apartment about USD ${w.usdPerSqm.toLocaleString()} per sq m (about ${inr((w.usdPerSqm * 88) / 10.7639)} per sq ft). Source: Numbeo, indicative.`
  return null
}

export function landSpecific(q) {
  const t = norm(q)
  const other = cityLandAnswer(q)
  if (other) return other
  const hits = lucknowLand.filter((a) => {
    const name = norm(a.area.replace(/\(.*?\)/g, ''))
    return name.length > 3 && t.includes(name)
  })
  const zoneRows = lucknowLand.filter((a) => norm(a.zone).length > 4 && t.includes(norm(a.zone)))
  // a whole zone (e.g. Gomti Nagar, with all its sectors/khands) beats a single exact-name hit
  const rows = (zoneRows.length > hits.length ? zoneRows : hits).sort((a, b) => (b.circleResPsf ?? 0) - (a.circleResPsf ?? 0))
  if (rows.length) {
    return 'Lucknow land rates (circle = govt registry value, market = listing asking):\n' + rows.slice(0, 12).map((a) =>
      `• ${a.area}: circle ${a.circleResPsf ? inr(a.circleResPsf) + '/sq ft (plot), ' + inr(a.circleFlatPsf) + ' (flat)' : 'n/a'}${a.market ? ', market ~' + inr(a.market) + '/sq ft' : ''}`).join('\n') +
      (rows.length > 12 ? `\n…and ${rows.length - 12} more on the Land & Projects page.` : '') + '\nConfirm circle rates with the sub-registrar office.'
  }
  return null
}

export function landAnswer(q) {
  const t = norm(q)
  const specific = landSpecific(q)
  if (specific) return specific
  if (/lucknow/.test(t) || /(\bland\b(?! rover)|plot|sq ?ft|circle)/.test(t)) {
    const top = [...lucknowLand].filter((a) => a.circleResPsf).sort((a, b) => b.circleResPsf - a.circleResPsf)
    const low = top.slice(-3).reverse()
    const proj = projects.filter((p) => p.city === 'Lucknow').sort((a, b) => a.minPsf - b.minPsf)
    return `I have ${lucknowLand.length} Lucknow localities (open Land & Projects → "Lucknow land rates").\nMost expensive (circle): ${top.slice(0, 3).map((a) => `${a.area} ${inr(a.circleResPsf)}`).join(', ')}.\nCheapest (circle): ${low.map((a) => `${a.area} ${inr(a.circleResPsf)}`).join(', ')}.\nBuilder projects, lowest first: ${proj.slice(0, 4).map((p) => `${p.name} ${inr(p.minPsf)}`).join(', ')}.\nAsk about any area, e.g. "Aliganj land rate".`
  }
  return null
}

export function productAnswer(q, hit) {
  const t = norm(q)
  const best = hit.sellers[0], worst = hit.sellers[hit.sellers.length - 1]
  const cc = [...hit.countryPrices].sort((a, b) => a.inr - b.inr)[0]
  const city = [...hit.cityPrices].sort((a, b) => a.price - b.price)[0]
  const tag = hit.live ? 'LIVE' : hit.reported ? 'community-reported' : hit.checked ? 'checked ' + hit.checked.on : 'sample (unverified)'
  if (/\b(when|month|time|forecast|season)\b/.test(t) && hit.bestMonth)
    return `${hit.name}: usually cheapest in ${hit.bestMonth}, priciest in ${hit.worstMonth}. Next 3 months: ${hit.forecast.map((f) => `${f.month} ${money(f.price)}`).join(', ')}. [${tag}]`
  if (/\b(world|worldwide|country|countries|abroad|dubai|usa|uk|singapore|japan|hong kong|global|earth)\b/.test(t)) {
    const lines = [...hit.countryPrices].sort((a, b) => a.inr - b.inr).map((c) => `• ${c.flag} ${c.country}: ${c.est ? '~' : ''}${c.symbol}${Math.round(c.local).toLocaleString()} (${money(c.inr)})`)
    return `${hit.name} around the world, cheapest first (~ = estimate):\n${lines.join('\n')}\n[${tag}]`
  }
  return `${hit.name} (per ${hit.unit}): buy from ${best.name} at ${money(best.price)}. Highest seller ${worst.name} charges ${money(worst.price)}${worst.price > best.price ? `, so you save ${money(worst.price - best.price)}` : ''}.\nCheapest Indian city: ${city.city} (${money(city.price)}). Cheapest country: ${cc.flag} ${cc.country}.\n[${tag}]`
}

export function categoryAnswer(catId, products, q) {
  const cat = categories.find((c) => c.id === catId)
  let list = products.filter((p) => p.category === catId)
  const t = norm(q)
  const subs = [...new Set(list.map((p) => p.sub))]
  const sub = subs.find((s) => t.includes(norm(s)))
  if (sub) list = list.filter((p) => p.sub === sub)
  const asc = !/(expensive|highest|costliest)/.test(t)
  list = [...list].sort((a, b) => (asc ? 1 : -1) * (a.sellers[0].price - b.sellers[0].price))
  return `${cat.icon} ${cat.name}${sub ? ' / ' + sub : ''}: ${list.length} items, ${asc ? 'cheapest' : 'costliest'} first:\n` +
    list.slice(0, 12).map((p) => `• ${p.name}: ${money(p.sellers[0].price)}`).join('\n') + (list.length > 12 ? `\n…${list.length - 12} more on the ${cat.name} page.` : '')
}

export function parseAdd(q) {
  const m = q.match(/^\s*(?:please\s+)?(?:add|new|list|report|submit)\s+(?:a\s+|an\s+)?(?:price\s+(?:of|for)\s+)?(.+?)\s*(?:@|=|:|\bat\b|\bfor\b|\bprice\b|\bis\b|\bcosts?\b)\s*(?:rs\.?|inr|₹)?\s*([\d,]+(?:\.\d+)?)(?:\s*(?:\/|per)\s*([a-z ]+?))?(?:\s+in\s+([a-z ]+))?\s*$/i)
  if (!m) return null
  const city = cities.find((c) => m[4] && norm(m[4]).includes(norm(c.id)))?.id
  return { name: m[1].replace(/\s+/g, ' ').trim(), price: Number(m[2].replace(/,/g, '')), unit: (m[3] || 'piece').trim(), city: city || 'Lucknow' }
}

export const CHIPS = ['iPhone 18 Pro price around the world', 'Aliganj land rate', 'Gomti Nagar land rates', 'cheapest cars', 'gold price', 'add Pizza at 250 in Lucknow']

