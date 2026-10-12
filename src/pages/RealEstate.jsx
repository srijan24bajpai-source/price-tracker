import { useState } from 'react'
import { projects, worldPsf } from '../data/realestate.js'
import { lucknowLand } from '../data/lucknowLand.js'
import { money, inr } from '../lib/util.js'
import LandExplorer from '../components/LandExplorer.jsx'

export default function RealEstate() {
  const [city, setCity] = useState('Lucknow')
  const [type, setType] = useState('all')
  const [sqft, setSqft] = useState(1200)
  const [lq, setLq] = useState('')
  const [lsort, setLsort] = useState('area')
  const cities = [...new Set(projects.map((p) => p.city))]
  const areas = lucknowLand
    .filter((a) => !lq || (a.area + ' ' + a.zone).toLowerCase().includes(lq.toLowerCase()))
    .sort((a, b) => {
      if (lsort === 'area') return a.area.localeCompare(b.area)
      const key = lsort === 'circle' ? 'circleResPsf' : 'market'
      return (b[key] ?? -1) - (a[key] ?? -1)
    })
  const list = projects.filter((p) => p.city === city && (type === 'all' || p.type === type)).sort((a, b) => a.minPsf - b.minPsf)
  const cheapest = list[0]
  const maxW = Math.max(...worldPsf.map((w) => w.psf))
  return (
    <>
      <h1>🏗️ Land, plots &amp; projects — price per sq ft</h1>
      <p className="sub">Compare builders and plot schemes. Total cost = rate × area.</p>
      <div className="notice">Sample indicative rates. Always confirm the current rate, circle rate and approvals (RERA) before booking.</div>
      <div className="bar">
        <select value={city} onChange={(e) => setCity(e.target.value)}>{cities.map((c) => <option key={c}>{c}</option>)}</select>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">Apartments + Plots</option><option>Apartment</option><option>Plot</option>
        </select>
        <label>Area (sq ft) <input type="number" value={sqft} onChange={(e) => setSqft(Number(e.target.value) || 0)} style={{ width: 110 }} /></label>
      </div>
      {cheapest && <div className="reco">✅ Lowest entry rate in {city}: <b>{cheapest.name}</b> at {inr(cheapest.minPsf)}/sq ft → about {money(cheapest.minPsf * sqft)} for {sqft} sq ft.</div>}
      <div className="glass tablewrap">
        <table>
          <thead><tr><th>Project</th><th>Builder</th><th>Area</th><th>Type</th><th>₹/sq ft</th><th>Est. total ({sqft} sqft)</th><th>Status</th><th>Possession</th></tr></thead>
          <tbody>
            {list.map((p, i) => (
              <tr key={p.id} className={i === 0 ? 'best' : ''}>
                <td><b>{p.name}</b></td><td>{p.builder}</td><td>{p.area}</td><td>{p.type}</td>
                <td>{inr(p.minPsf)} – {inr(p.maxPsf)}</td>
                <td>{money(p.minPsf * sqft)} – {money(p.maxPsf * sqft)}</td>
                <td>{p.status}</td><td>{p.possession}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p style={{ padding: 16 }}>No projects match.</p>}
      </div>

      <h2 id="lucknow-land">📍 Lucknow land rates — every locality ({lucknowLand.length} areas)</h2>
      <div className="notice">
        <b>Circle rate</b> = government minimum registry value (copied from <a href="https://findcirclerate.com/india/uttar-pradesh/lucknow/circle-rates" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>findcirclerate.com ↗</a>, an unofficial aggregator for 2026-27; confirm with the Lucknow sub-registrar/DM office).
        <b> Market (asking)</b> = listing-portal rate where available (<a href="https://www.squareyards.com/property-rates-in-lucknow" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>SquareYards ↗</a>, <a href="https://www.99acres.com/property-rates-and-price-trends-in-gomti-nagar-lucknow-prffid" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>99acres ↗</a>). They are different numbers; actual deals differ from both.
      </div>
      <div className="bar">
        <input placeholder="Search area, e.g. Gomti Nagar, Aliganj…" value={lq} onChange={(e) => setLq(e.target.value)} style={{ minWidth: 260 }} />
        <select value={lsort} onChange={(e) => setLsort(e.target.value)}>
          <option value="area">Sort: Area A–Z</option>
          <option value="circle">Sort: Circle rate high → low</option>
          <option value="market">Sort: Market rate high → low</option>
        </select>
        <span className="muted" style={{ alignSelf: 'center' }}>{areas.length} areas · totals use the area above ({sqft} sq ft)</span>
      </div>
      <div className="glass tablewrap" style={{ maxHeight: 520, overflow: 'auto' }}>
        <table>
          <thead><tr><th>Area</th><th>Circle ₹/sq ft (plot)</th><th>Circle ₹/sq ft (flat)</th><th>Circle ₹/sq m</th><th>Market asking ₹/sq ft</th><th>Circle value ({sqft} sq ft)</th></tr></thead>
          <tbody>
            {areas.map((a) => (
              <tr key={a.area}>
                <td><b>{a.area}</b></td>
                <td>{a.circleResPsf ? inr(a.circleResPsf) : '—'}</td>
                <td>{a.circleFlatPsf ? inr(a.circleFlatPsf) : '—'}</td>
                <td>{a.circleResSqm ? inr(a.circleResSqm) : '—'}</td>
                <td>{a.market ? inr(a.market) : '—'}</td>
                <td>{a.circleResPsf ? money(a.circleResPsf * sqft) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LandExplorer />

      <h2>🌍 Price per sq ft around the world (₹ equivalent)</h2>
      <div className="glass" style={{ padding: 16 }}>
        {[...worldPsf].sort((a, b) => a.psf - b.psf).map((w) => (
          <div key={w.city} style={{ margin: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span><b>{w.city}</b>, {w.country} <span className="muted">· {w.note}</span></span><b>{inr(w.psf)}</b></div>
            <div style={{ height: 8, borderRadius: 8, background: '#e3e7f7' }}><div style={{ height: 8, borderRadius: 8, width: (w.psf / maxW) * 100 + '%', background: 'var(--pri)' }} /></div>
          </div>
        ))}
      </div>
    </>
  )
}
