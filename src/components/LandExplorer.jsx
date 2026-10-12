import { Fragment, useState } from 'react'
import { indiaCities, INDIA_LAND_SOURCE } from '../data/indiaLand.js'
import { worldProperty, WORLD_SOURCE } from '../data/worldProperty.js'
import { gorakhpurLand } from '../data/gorakhpurLand.js'
import { countries } from '../data/meta.js'
import { useLive, useLandReports, useReload } from '../lib/products.jsx'
import { addSubmission } from '../lib/store.js'
import { inr } from '../lib/util.js'

const SQM_TO_SQFT = 10.7639

function IndiaCities() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState('Lucknow')
  const list = indiaCities
    .filter((c) => !q || (c.city + ' ' + c.localities.map((l) => l.name).join(' ')).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.avg - a.avg)
  return (
    <>
      <h2 id="india-land">🇮🇳 Property rates across India ({indiaCities.length} cities)</h2>
      <div className="notice">Asking rates for built-up property (₹ per sq ft) from {INDIA_LAND_SOURCE}: <a href="https://www.squareyards.com/property-rates-in-lucknow" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>open SquareYards ↗</a> (each city has its own page, e.g. /property-rates-in-mumbai). Land-only and circle rates are lower.</div>
      <div className="bar"><input placeholder="Search city or locality…" value={q} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 260 }} /></div>
      <div className="glass tablewrap">
        <table>
          <thead><tr><th>City</th><th>Average ₹/sq ft</th><th>Localities tracked</th><th /></tr></thead>
          <tbody>
            {list.map((c) => (
              <Fragment key={c.city}>
                <tr>
                  <td><b>{c.city}</b></td><td>{inr(c.avg)}</td><td>{c.localities.length}</td>
                  <td><button className="ghost" onClick={() => setOpen(open === c.city ? '' : c.city)}>{open === c.city ? 'Hide' : 'Show'}</button></td>
                </tr>
                {open === c.city && (
                  <tr>
                    <td colSpan={4}>
                      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))' }}>
                        {[...c.localities].sort((a, b) => b.rate - a.rate).map((l) => <div key={l.name} className="muted"><b>{l.name}</b>: {inr(l.rate)}</div>)}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function Gorakhpur({ reports }) {
  const gk = reports.filter((r) => /gorakhpur/i.test(r.city || r.name))
  return (
    <>
      <h2 id="gorakhpur-land">📍 Gorakhpur land rates</h2>
      <div className="notice">Gorakhpur has very little public locality-wise data. These are the only figures I could source, each with its source and year. Please add more with the form below.</div>
      <div className="glass tablewrap">
        <table>
          <thead><tr><th>Area</th><th>₹ per sq ft</th><th>Type</th><th>Source</th></tr></thead>
          <tbody>
            {gorakhpurLand.map((g) => (
              <tr key={g.area}><td><b>{g.area}</b></td><td>{g.psf ? inr(g.psf) : inr(g.psfMin) + ' – ' + inr(g.psfMax)}</td><td>{g.kind}</td><td className="muted">{g.url ? <a href={g.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{g.source} ↗</a> : g.source}</td></tr>
            ))}
            {gk.map((r) => (
              <tr key={r.id}><td><b>{r.name}</b></td><td>{inr(Number(r.price))}</td><td>{r.sub || 'community report'}</td><td className="muted">Community, {String(r.created_at).slice(0, 10)}{r.seller ? ' · ' + r.seller : ''}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function LandForm() {
  const reload = useReload()
  const empty = { city: 'Gorakhpur', locality: '', price: '', sub: 'Plot', seller: '' }
  const [f, setF] = useState(empty)
  const [msg, setMsg] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault()
    try {
      const status = await addSubmission({ name: `${f.city} - ${f.locality}`, category: 'land', sub: f.sub, price: f.price, unit: 'sq ft', seller: f.seller, city: f.city, country: 'India' })
      setF(empty)
      setMsg(status === 'approved' ? 'Added and live now.' : 'Thanks! Waiting for admin approval.')
      reload()
    } catch { setMsg('Could not save right now. Please try again.') }
  }
  return (
    <>
      <h2>➕ Add a land rate</h2>
      <p className="sub">Know the rate in your area (Lucknow, Gorakhpur or anywhere)? Add it. It appears after admin approval.</p>
      {msg && <div className="reco">{msg}</div>}
      <form className="form glass" onSubmit={submit}>
        <label>City<input required value={f.city} onChange={set('city')} list="land-cities" /></label>
        <datalist id="land-cities">{indiaCities.map((c) => <option key={c.city} value={c.city} />)}</datalist>
        <label>Locality / colony / road<input required minLength={2} value={f.locality} onChange={set('locality')} placeholder="e.g. Taramandal" /></label>
        <label>Rate (₹ per sq ft)<input required type="number" min="1" step="any" value={f.price} onChange={set('price')} /></label>
        <label>Type<select value={f.sub} onChange={set('sub')}><option>Plot</option><option>Flat</option><option>Commercial</option><option>Agricultural</option></select></label>
        <label>Source / note (dealer, deed, listing…)<input value={f.seller} onChange={set('seller')} /></label>
        <button>Submit for approval</button>
      </form>
    </>
  )
}

function CommunityLand({ reports }) {
  if (!reports.length) return null
  return (
    <>
      <h2>👥 Community-reported land rates</h2>
      <div className="glass tablewrap">
        <table>
          <thead><tr><th>Place</th><th>₹ per sq ft</th><th>Type</th><th>Source</th><th>Date</th></tr></thead>
          <tbody>
            {reports.map((r) => <tr key={r.id}><td><b>{r.name}</b></td><td>{inr(Number(r.price))}</td><td>{r.sub}</td><td className="muted">{r.seller || '—'}</td><td className="muted">{String(r.created_at).slice(0, 10)}</td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  )
}

function WorldCities() {
  const live = useLive()
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('high')
  const usdInr = live?.rates?.USD ?? countries.find((c) => c.currency === 'USD').rate
  const rows = worldProperty
    .map((w) => ({ ...w, inrPsf: (w.usdPerSqm * usdInr) / SQM_TO_SQFT }))
    .filter((w) => !q || (w.city + ' ' + w.country).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (sort === 'high' ? b.inrPsf - a.inrPsf : sort === 'low' ? a.inrPsf - b.inrPsf : a.city.localeCompare(b.city)))
  return (
    <>
      <h2 id="world-land">🌍 City-centre apartment prices worldwide ({worldProperty.length} cities)</h2>
      <div className="notice">City-centre apartment price per sq m from {WORLD_SOURCE} (crowd-sourced, indicative, not land-only; <a href="https://www.numbeo.com/property-investment/rankings_by_city.jsp" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Numbeo ↗</a>). Converted to ₹ per sq ft using {live?.rates?.USD ? 'live' : 'default'} USD/INR ({usdInr.toFixed(1)}).</div>
      <div className="bar">
        <input placeholder="Search city or country…" value={q} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 260 }} />
        <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="high">Most expensive first</option><option value="low">Cheapest first</option><option value="name">City A–Z</option></select>
      </div>
      <div className="glass tablewrap" style={{ maxHeight: 520, overflow: 'auto' }}>
        <table>
          <thead><tr><th>City</th><th>Country</th><th>USD / sq m</th><th>₹ / sq ft</th></tr></thead>
          <tbody>{rows.map((w) => <tr key={w.city + w.country}><td><b>{w.city}</b></td><td>{w.country}</td><td>${w.usdPerSqm.toLocaleString()}</td><td>{inr(w.inrPsf)}</td></tr>)}</tbody>
        </table>
      </div>
    </>
  )
}

export default function LandExplorer() {
  const reports = useLandReports()
  return (
    <>
      <Gorakhpur reports={reports} />
      <IndiaCities />
      <WorldCities />
      <CommunityLand reports={reports} />
      <LandForm />
    </>
  )
}
