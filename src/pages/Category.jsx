import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { categories } from '../data/meta.js'
import { useProducts } from '../lib/products.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Category() {
  const { id } = useParams()
  const [sp] = useSearchParams()
  const q = (sp.get('q') || '').toLowerCase()
  const [sort, setSort] = useState('name')
  const [sub, setSub] = useState('all')
  useEffect(() => setSub('all'), [id])
  const cat = categories.find((c) => c.id === id)
  const products = useProducts()
  const subs = [...new Set(products.filter((p) => id === 'all' || p.category === id).map((p) => p.sub))].sort()
  let list = products.filter((p) => (id === 'all' || p.category === id) && (sub === 'all' || p.sub === sub) && (!q || (p.name + p.sub).toLowerCase().includes(q)))
  const key = { name: (a, b) => a.name.localeCompare(b.name), low: (a, b) => a.sellers[0].price - b.sellers[0].price, high: (a, b) => b.sellers[0].price - a.sellers[0].price, drop: (a, b) => a.change30 - b.change30 }
  list = [...list].sort(key[sort])
  return (
    <>
      <h1>{cat ? cat.icon + ' ' + cat.name : q ? 'Search: ' + q : 'All items'}</h1>
      <div className="bar">
        <Link to="/category/all"><button className="pill">All</button></Link>
        {categories.map((c) => <Link key={c.id} to={'/category/' + c.id}><button className={'pill' + (c.id === id ? ' on' : '')}>{c.icon} {c.name}</button></Link>)}
      </div>
      <div className="bar">
        <select value={sub} onChange={(e) => setSub(e.target.value)}>
          <option value="all">All types</option>
          {subs.map((x) => <option key={x}>{x}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Sort: Name</option>
          <option value="low">Sort: Price low → high</option>
          <option value="high">Sort: Price high → low</option>
          <option value="drop">Sort: Biggest drop</option>
        </select>
      </div>
      <div className="muted">{list.length} items</div>
      {list.length === 0 && <p>No items found. <Link to="/submit">Add a price</Link>.</p>}
      <div className="grid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </>
  )
}
