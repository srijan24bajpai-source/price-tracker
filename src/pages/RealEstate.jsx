import { useState } from 'react'
import { projects, worldPsf } from '../data/realestate.js'
import { money, inr } from '../lib/util.js'

export default function RealEstate() {
  const [city, setCity] = useState('Lucknow')
  const [type, setType] = useState('all')
  const [sqft, setSqft] = useState(1200)
  const cities = [...new Set(projects.map((p) => p.city))]
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
