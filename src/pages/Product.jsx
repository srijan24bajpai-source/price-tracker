import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../lib/products.jsx'
import { money } from '../lib/util.js'
import PriceChart from '../components/PriceChart.jsx'
import Comments from '../components/Comments.jsx'

export default function Product() {
  const { id } = useParams()
  const products = useProducts()
  const p = products.find((x) => x.id === id)
  if (!p) return <h1>Item not found. <Link to="/">Home</Link></h1>
  const best = p.sellers[0]
  const worst = p.sellers[p.sellers.length - 1]
  const saving = worst.price - best.price
  const cheapCity = [...p.cityPrices].sort((a, b) => a.price - b.price)[0]
  const cheapCountry = [...p.countryPrices].sort((a, b) => a.inr - b.inr)[0]
  const india = p.countryPrices[0]
  return (
    <>
      <h1>{p.name}</h1>
      <p className="sub"><span className="tag">{p.sub}</span> · per {p.unit} · {p.live ? <b className="down">● LIVE: {p.live}</b> : p.reported ? <b className="down">● Community-verified: {p.reported.count} report(s), latest {p.reported.latest}</b> : 'sample data (not live)'}</p>

      <div className="reco">
        ✅ Buy from <b>{best.name}</b> at {money(best.price)}.{' '}
        {saving > 0 && <>You save {money(saving)} ({Math.round((saving / worst.price) * 100)}%) compared to {worst.name}.</>}
      </div>

      <div className="cols">
        <div className="glass tablewrap">
          <h2 style={{ padding: '0 10px' }}>Seller prices (cheapest first)</h2>
          <table>
            <thead><tr><th>Seller</th><th>Price</th><th>Diff</th></tr></thead>
            <tbody>
              {p.sellers.map((s, i) => (
                <tr key={s.name} className={i === 0 ? 'best' : ''}>
                  <td>{s.name} {i === 0 && <span className="tag badge-best">Best</span>}</td>
                  <td>{money(s.price)}</td>
                  <td>{i === 0 ? '—' : '+' + money(s.price - best.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="glass" style={{ padding: 16 }}>
          <h2 style={{ marginTop: 0 }}>Price trend &amp; forecast</h2>
          <PriceChart history={p.history} forecast={p.forecast} />
          <div className="muted">Solid = last 12 months, dashed* = seasonal forecast.</div>
          {p.bestMonth && <div className="reco">⏱ Usually cheapest in <b>{p.bestMonth}</b>, most expensive in <b>{p.worstMonth}</b>.</div>}
        </div>
      </div>

      <div className="cols" style={{ marginTop: 16 }}>
        <div className="glass tablewrap">
          <h2 style={{ padding: '0 10px' }}>Inside India</h2>
          <p className="muted" style={{ padding: '0 10px' }}>Cheapest: <b>{cheapCity.city}</b> ({money(cheapCity.price)})</p>
          <table>
            <tbody>
              {[...p.cityPrices].sort((a, b) => a.price - b.price).map((c, i) => (
                <tr key={c.city} className={i === 0 ? 'best' : ''}><td>{c.city}</td><td>{money(c.price)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="glass tablewrap">
          <h2 style={{ padding: '0 10px' }}>Around the world</h2>
          <p className="muted" style={{ padding: '0 10px' }}>
            Cheapest: <b>{cheapCountry.flag} {cheapCountry.country}</b>
            {cheapCountry.country !== 'India' && <> ({Math.round((1 - cheapCountry.inr / india.inr) * 100)}% cheaper than India)</>}
          </p>
          <table>
            <tbody>
              {[...p.countryPrices].sort((a, b) => a.inr - b.inr).map((c, i) => (
                <tr key={c.country} className={i === 0 ? 'best' : ''}>
                  <td>{c.flag} {c.country}</td>
                  <td>{c.symbol}{Math.round(c.local).toLocaleString()}</td>
                  <td className="muted">{money(c.inr)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p><Link to={'/submit?item=' + p.id}><button>Report a newer price for this item</button></Link></p>
      <Comments product={p} />
    </>
  )
}
