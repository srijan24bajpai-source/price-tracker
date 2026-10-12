import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories, cities, countries } from '../data/meta.js'
import { addSubmission } from '../lib/store.js'
import { useProducts, useReload } from '../lib/products.jsx'

export default function Submit() {
  const products = useProducts().filter((p) => !p.community)
  const reload = useReload()
  const [sp] = useSearchParams()
  const empty = { product_id: sp.get('item') || '', name: '', category: 'electronics', sub: '', price: '', unit: 'piece', seller: '', city: 'Lucknow', country: 'India' }
  const [f, setF] = useState(empty)
  const [state, setState] = useState('') // '' | 'pending' | 'approved' | 'error'
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const existing = products.find((p) => p.id === f.product_id)

  const submit = async (e) => {
    e.preventDefault()
    const row = existing ? { ...f, name: existing.name, category: existing.category, sub: existing.sub, unit: existing.unit } : { ...f, product_id: '' }
    try {
      const status = await addSubmission(row)
      setF({ ...empty, product_id: '' })
      setState(status)
      reload()
    } catch {
      setState('error')
    }
  }
  return (
    <>
      <h1>➕ Add a price</h1>
      <p className="sub">Report a newer price for a listed item, or add something new. Approved reports update the site's prices.</p>
      {state === 'pending' && <div className="reco">Thanks! Saved and waiting for admin approval, it will appear on the site once approved.</div>}
      {state === 'approved' && <div className="reco">Added and live now (you are signed in as admin).</div>}
      {state === 'error' && <div className="notice">Could not submit right now. Please try again.</div>}
      <form className="form glass" onSubmit={submit}>
        <label>Which item?
          <select value={f.product_id} onChange={set('product_id')}>
            <option value="">➕ New item (not listed)</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
        {!existing && (
          <>
            <label>Item name<input required minLength={2} maxLength={120} value={f.name} onChange={set('name')} /></label>
            <label>Category<select value={f.category} onChange={set('category')}>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
            <label>Sub-category (optional)<input value={f.sub} onChange={set('sub')} /></label>
            <label>Unit (kg, piece, sq ft…)<input value={f.unit} onChange={set('unit')} /></label>
          </>
        )}
        <label>Price in ₹{existing ? ` per ${existing.unit}` : ''}<input required type="number" min="0" step="any" value={f.price} onChange={set('price')} /></label>
        <label>Seller / shop<input value={f.seller} onChange={set('seller')} /></label>
        <label>City<select value={f.city} onChange={set('city')}>{cities.map((c) => <option key={c.id}>{c.id}</option>)}</select></label>
        <label>Country<select value={f.country} onChange={set('country')}>{countries.map((c) => <option key={c.id}>{c.id}</option>)}</select></label>
        <button>Submit for approval</button>
      </form>
    </>
  )
}
