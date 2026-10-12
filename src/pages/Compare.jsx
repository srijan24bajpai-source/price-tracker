import { useParams, Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { categories } from '../data/meta.js'
import { useProducts, useLive } from '../lib/products.jsx'
import { money } from '../lib/util.js'

export default function Compare() {
  const { scope } = useParams()
  const world = scope === 'world'
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [dir, setDir] = useState(1)

  const products = useProducts()
  const live = useLive()
  const rows = useMemo(() => {
    const list = products.filter((p) => (cat === 'all' || p.category === cat) && (!q || p.name.toLowerCase().includes(q.toLowerCase())))
    const out = list.map((p) => {
      const cells = world ? p.countryPrices.map((c) => ({ label: c.country, flag: c.flag, v: c.inr, text: c.symbol + Math.round(c.local).toLocaleString() })) : p.cityPrices.map((c) => ({ label: c.city, v: c.price, text: money(c.price) }))
      const min = cells.reduce((a, b) => (b.v < a.v ? b : a))
      const max = cells.reduce((a, b) => (b.v > a.v ? b : a))
      return { p, cells, min, max, gap: (max.v - min.v) / max.v }
    })
    const keys = { name: (a, b) => a.p.name.localeCompare(b.p.name), gap: (a, b) => a.gap - b.gap, min: (a, b) => a.min.v - b.min.v }
    return out.sort((a, b) => keys[sortBy](a, b) * dir)
  }, [products, cat, q, world, sortBy, dir])

  const heads = rows[0]?.cells.map((c) => (c.flag ? c.flag + ' ' : '') + c.label) || []
  const setSort = (k) => { if (sortBy === k) setDir(-dir); else { setSortBy(k); setDir(1) } }

  return (
    <>
      <h1>{world ? '🌍 World price comparison' : '🇮🇳 India city price comparison'}</h1>
      <p className="sub">
        {world ? 'Local currency shown in each cell; cheapest country highlighted. Totals converted to ₹ for ranking.' : 'Cheapest city highlighted for every item.'}{' '}
        {world && (live?.fxUpdated ? <span className="tag badge-best">● Live FX rates · {live.fxUpdated}</span> : <span className="tag">FX rates: sample</span>)}{' '}
        <Link to={world ? '/compare/india' : '/compare/world'}><b>Switch to {world ? 'India' : 'World'} →</b></Link>
      </p>
      <div className="bar">
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
        </select>
        <input placeholder="Filter items…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="glass tablewrap">
        <table>
          <thead>
            <tr>
              <th onClick={() => setSort('name')}>Item</th>
              {heads.map((h) => <th key={h}>{h}</th>)}
              <th onClick={() => setSort('min')}>Cheapest</th>
              <th onClick={() => setSort('gap')}>Gap</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ p, cells, min, gap }) => (
              <tr key={p.id}>
                <td><Link to={'/product/' + p.id}><b>{p.name}</b></Link><div className="muted">per {p.unit}</div></td>
                {cells.map((c) => <td key={c.label} style={c.label === min.label ? { background: 'rgba(15,157,88,.14)', fontWeight: 700 } : undefined}>{c.text}</td>)}
                <td className="down"><b>{min.flag} {min.label}</b></td>
                <td>{Math.round(gap * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p style={{ padding: 16 }}>No items match.</p>}
      </div>
    </>
  )
}
