import { Link } from 'react-router-dom'
import { money } from '../lib/util.js'

export default function ProductCard({ p }) {
  const best = p.sellers[0]
  return (
    <Link to={'/product/' + p.id} className="card glass">
      <span className="tag">{p.sub}</span>
      {p.community && <span className="tag badge-best"> community</span>}
      {p.live ? <span className="tag badge-best"> ● LIVE</span> : p.reported ? <span className="tag badge-best"> ● community {p.reported.latest}</span> : p.note ? <span className="tag" style={p.note.level === 'checked' ? { background: '#e6f0ff', color: '#1a56c4' } : { background: '#fff3d6', color: '#b26a00' }}> {p.note.level === 'checked' ? '✔ checked' : p.note.level === 'old' ? 'older price' : 'unverified'}</span> : p.checked ? <span className="tag" style={{ background: '#e6f0ff', color: '#1a56c4' }}> ✔ checked {p.checked.on}</span> : !p.community && <span className="tag" style={{ background: '#fff3d6', color: '#b26a00' }}> sample</span>}
      <h3 style={{ margin: '8px 0 4px', fontSize: '1rem' }}>{p.name}</h3>
      <div className="price">{money(best.price)} <span className="muted">{p.category === 'vehicles' ? 'ex-showroom, base variant' : '/ ' + p.unit}</span></div>
      <div className="muted">Best: {best.name}</div>
      <div className={p.change30 > 0 ? 'up' : 'down'} style={{ fontWeight: 700, fontSize: '.85rem' }}>
        {p.change30 > 0 ? '▲' : '▼'} {Math.abs(p.change30)}% vs last month
      </div>
    </Link>
  )
}
