import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../lib/products.jsx'
import { FEEDS } from '../data/sources.js'
import RecordedHistory from '../components/RecordedHistory.jsx'
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
      <p className="sub"><span className="tag">{p.sub}</span> · per {p.unit} · {p.live ? <b className="down">● LIVE: {p.live}</b> : p.reported ? <b className="down">● Community-verified: {p.reported.count} report(s), latest {p.reported.latest}</b> : p.checked ? <b>✔ Checked against {p.checked.source} on {p.checked.on} (not live)</b> : 'sample data (not live)'}</p>

      {p.category === 'vehicles' && (
        <div className="notice">
          <b>This is the ex-showroom price of the cheapest (base) variant, not what you pay.</b> On-road price in Lucknow is roughly
          {' '}<b>{money(best.price * 1.12)} – {money(best.price * 1.18)}</b> for this variant (adds road tax, registration, insurance, accessories; varies by month and dealer).
          Higher variants cost more, so a mid or top variant can be well above this, which is why a price like ₹8 lakh on-road for a hatchback is normal.
        </div>
      )}
      {p.variants && (
        <div className="glass tablewrap" style={{ marginBottom: 16 }}>
          <h2 style={{ padding: '0 10px' }}>Variants &amp; prices</h2>
          <table>
            <thead><tr><th>Variant</th><th>Ex-showroom</th><th>Est. on-road, Lucknow</th><th>Notes</th></tr></thead>
            <tbody>
              {p.variants.trims.map(([name, lo, hi, note]) => (
                <tr key={name}>
                  <td><b>{name}</b></td>
                  <td>{money(lo * 1e5)}{hi !== lo ? ' – ' + money(hi * 1e5) : ''}</td>
                  <td>{money(lo * 1e5 * 1.12)} – {money(hi * 1e5 * 1.18)}</td>
                  <td className="muted">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted" style={{ padding: '0 10px' }}>Source: {p.variants.source}, {p.variants.on}. On-road is an estimate (+12–18%).</p>
        </div>
      )}
      {p.note && <div className="notice"><b>{p.note.level === 'checked' ? '✔ Checked: ' : p.note.level === 'old' ? '⚠ Older price: ' : '⚠ Unverified: '}</b>{p.note.text}</div>}
      <div className="glass" style={{ padding: '12px 16px', margin: '12px 0' }}>
        <b>🔗 Where this price comes from</b>
        {p.links.length > 0 ? (
          <ul style={{ margin: '6px 0 0', paddingLeft: 20 }}>
            {p.links.map((l) => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pri)', textDecoration: 'underline' }}>{l.label} ↗</a></li>)}
          </ul>
        ) : (
          <p className="muted" style={{ margin: '6px 0 0' }}>
            {p.reported ? 'Reported by community members and approved by the admin.' : 'No source link yet: this is a sample estimate, not a quoted price.'}{' '}
            Know where this price is listed? <Link to={'/submit?item=' + p.id}>Report it here</Link>.
          </p>
        )}
        <p className="muted" style={{ margin: '8px 0 0' }}>
          Other countries are converted to ₹ using live rates from <a href={FEEDS.fx.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>ExchangeRate-API</a>.
          {p.checked ? ` Last checked ${p.checked.on}.` : ''} Prices are a snapshot and can change at the seller.
        </p>
      </div>
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
          <div className="muted">{p.live ? 'The latest point is the live price; earlier months are a modelled seasonal trend.' : 'A modelled seasonal trend (not recorded prices); the latest point is the price above.'} Dashed* = forecast.</div>
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
            {p.countryPrices.some((c) => c.est) && <>~ = estimate (no published price for that country). </>}Cheapest: <b>{cheapCountry.flag} {cheapCountry.country}</b>
            {cheapCountry.country !== 'India' && <> ({Math.round((1 - cheapCountry.inr / india.inr) * 100)}% cheaper than India)</>}
          </p>
          <table>
            <tbody>
              {[...p.countryPrices].sort((a, b) => a.inr - b.inr).map((c, i) => (
                <tr key={c.country} className={i === 0 ? 'best' : ''}>
                  <td>{c.flag} {c.country}</td>
                  <td>{c.est ? '~' : ''}{c.symbol}{Math.round(c.local).toLocaleString()}</td>
                  <td><b>{c.est ? '~' : ''}{money(c.inr)}</b> <span className="muted">in ₹</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p><Link to={'/submit?item=' + p.id}><button>Report a newer price for this item</button></Link></p>
      {p.live && <RecordedHistory id={p.id} />}
      <Comments product={p} />
    </>
  )
}
