import { Link } from 'react-router-dom'
import { categories } from '../data/meta.js'
import { useProducts } from '../lib/products.jsx'
import { money } from '../lib/util.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Dashboard() {
  const all = useProducts()
  const tickerNames = ['Gold 24K (10g)', 'Petrol', 'Onion', 'Tomato', 'iPhone 16 (128GB)', 'Silver (1kg)', 'Diesel', 'Cement 50kg (UltraTech)']
  const ticker = all.filter((p) => tickerNames.includes(p.name))
  const deals = [...all]
    .map((p) => ({ p, spread: (p.sellers[p.sellers.length - 1].price - p.sellers[0].price) / p.sellers[p.sellers.length - 1].price }))
    .sort((a, b) => b.spread - a.spread)
    .slice(0, 8)
  const falling = [...all].sort((a, b) => a.change30 - b.change30).slice(0, 4)
  return (
    <>
      <section className="hero glass">
        <h1>Every price. Every place. One tracker.</h1>
        <p className="sub">From Rado to laddoo, land per sq ft to school fees — compare across Indian cities and the world, and know where and when to buy.</p>
        <div className="bar">
          <Link to="/compare/india"><button>Compare inside India</button></Link>
          <Link to="/compare/world"><button className="ghost">Compare worldwide</button></Link>
          <Link to="/real-estate"><button className="ghost">Land &amp; projects</button></Link>
        </div>
        <div className="muted">{all.length} items tracked across {categories.length} categories</div>
      </section>

      <div className="glass ticker" style={{ marginTop: 14 }}>
        <div>
          {[...ticker, ...ticker].map((p, i) => (
            <span key={i}>{p.name}: {money(p.base)} <em className={p.change30 > 0 ? 'up' : 'down'}>{p.change30 > 0 ? '▲' : '▼'}{Math.abs(p.change30)}%</em></span>
          ))}
        </div>
      </div>

      <h2>Categories</h2>
      <div className="grid">
        {categories.map((c) => (
          <Link key={c.id} to={'/category/' + c.id} className="card glass">
            <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
            <b>{c.name}</b>
            <div className="muted">{all.filter((p) => p.category === c.id).length} items</div>
          </Link>
        ))}
      </div>

      <h2 id="hot-deals">🔥 Hot deals — biggest gap between sellers</h2>
      <p className="sub">Same item, very different prices. Buy from the cheapest seller.</p>
      <div className="grid">{deals.map(({ p }) => <ProductCard key={p.id} p={p} />)}</div>

      <h2>📉 Prices falling now</h2>
      <div className="grid">{falling.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </>
  )
}
