import { useRef, useState } from 'react'
import { useProducts, useReload } from './products.jsx'
import { addSubmission } from './store.js'
import { categories } from '../data/meta.js'
import { bestProduct, categoryAnswer, categoryOf, inr, landAnswer, landSpecific, norm, parseAdd, productAnswer } from './agentLogic.js'

export const GREETING =
  'Hi! Ask about any price: "iPhone 18 Pro price in Dubai", "Aliganj land rate", "show all SUVs", "when to buy a Swift". To add one: "add Pizza at 250 in Lucknow".'

// Shared brain for the Agent page and the floating voice widget.
export function useAgent() {
  const products = useProducts()
  const reload = useReload()
  const [msgs, setMsgs] = useState([{ r: 'a', t: GREETING }])
  const [busy, setBusy] = useState(false)
  const busyRef = useRef(false)
  const pendingRef = useRef(null) // add-flow waiting for a category

  async function doAdd(s) {
    pendingRef.current = null
    try {
      const status = await addSubmission({ sub: '', seller: '', country: 'India', ...s })
      reload()
      return status === 'approved'
        ? `✅ Added "${s.name}" at ${inr(s.price)} in ${s.city}. It is live now.`
        : `✅ Saved "${s.name}" at ${inr(s.price)} in ${s.city}. It is waiting for admin approval and will show on the site once approved.`
    } catch {
      return 'Sorry, I could not save that entry. Please try the Add a Price page.'
    }
  }

  async function respond(text) {
    const t = norm(text)
    if (pendingRef.current) {
      if (/^(cancel|stop|no|never mind|nevermind|leave it)$/.test(t)) {
        pendingRef.current = null
        return 'Okay, cancelled. Nothing was added.'
      }
      // accept only a category number or an exact category name; anything else is treated as a new question
      const byNum = /^\d{1,2}$/.test(t) ? categories[Number(t) - 1] : null
      const byName = categories.find((c) => t === c.id || t === norm(c.name) || (t.length >= 4 && norm(c.name).startsWith(t)))
      const cat = byNum || byName
      if (cat) return doAdd({ ...pendingRef.current, category: cat.id })
      pendingRef.current = null
    }
    const add = parseAdd(text)
    if (add) {
      const hit = bestProduct(add.name, products)
      if (hit && norm(hit.name) === norm(add.name)) return doAdd({ ...add, product_id: hit.id, name: hit.name, category: hit.category, sub: hit.sub, unit: hit.unit })
      const guess = categoryOf(add.name)
      if (guess) return doAdd({ ...add, category: guess })
      pendingRef.current = add
      return `Adding "${add.name}" at ${inr(add.price)}. Which category is it? ${categories.map((c, i) => `${i + 1}. ${c.name}`).join(', ')}`
    }
    if (/^\s*(add|new|list|report|submit)\b/i.test(text))
      return 'To add a price, say or type: add <item> at <price> in <city>. Example: add Pizza at 250 in Lucknow.'

    const land = /(\bland\b(?! rover)|plot|sq ?ft|circle|colony|nagar|khand|ganj|road|locality|area|property|real estate|apartment)/.test(t) || /lucknow|gorakhpur/.test(t)
    const named = land ? landSpecific(text) : null // a place we know by name beats a loose product match
    if (named) return named
    const hit = bestProduct(text, products)
    if (hit) return productAnswer(text, hit)
    const la = land ? landAnswer(text) : null
    if (la) return la
    const cat = categoryOf(text)
    if (cat) return categoryAnswer(cat, products, text)
    return `I couldn't find "${text}" in ${products.length} tracked items. To add it, say: add ${text.replace(/^(price|cost|rate)( of)?\s*/i, '')} at <price> in <city>.`
  }

  // Returns the reply text (or null if ignored).
  async function ask(raw) {
    const text = (raw || '').trim()
    if (!text || busyRef.current) return null
    busyRef.current = true
    setBusy(true)
    setMsgs((m) => [...m, { r: 'u', t: text }])
    let reply
    try {
      reply = await respond(text)
    } catch {
      reply = 'Something went wrong while answering. Please try rephrasing.'
    }
    setMsgs((m) => [...m, { r: 'a', t: reply }])
    busyRef.current = false
    setBusy(false)
    return reply
  }

  return { msgs, busy, ask }
}
