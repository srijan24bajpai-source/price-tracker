import { useState } from 'react'
import { bizRates, GROUPS, BIZ_COMPILED, SOURCE_URLS } from '../data/bizRates.js'
import { useLive } from '../lib/products.jsx'
import { countries } from '../data/meta.js'
import { inr } from '../lib/util.js'

const CONF = { med: ['medium', '#e6f0ff', '#1a56c4'], low: ['low: verify', '#fff3d6', '#b26a00'] }

export default function BizRates() {
  const live = useLive()
  const usdInr = live?.rates?.USD ?? countries.find((c) => c.currency === 'USD').rate
  const [group, setGroup] = useState('crm')
  const [q, setQ] = useState('')
  const rows = bizRates.filter((r) => r.group === group && (!q || (r.name + ' ' + r.plan + ' ' + r.note).toLowerCase().includes(q.toLowerCase())))

  function rate(r) {
    if (r.pct) return <b>{r.pct}</b>
    if (r.inr != null && r.usd != null) return <><b>{inr(r.inr)}</b> <span className="muted">(US${r.usd})</span></>
    if (r.inr != null) return <b>{r.inr === 0 ? 'Free' : inr(r.inr)}</b>
    if (r.usd != null) return r.usd === 0 ? <b>Free</b> : <><b>{inr(r.usd * usdInr)}</b> <span className="muted">(US${r.usd.toLocaleString()})</span></>
    return <span className="muted">see note</span>
  }

  return (
    <>
      <h1>💼 Business rates: software, CRM, hiring, platforms and commissions</h1>
      <p className="sub">Everything in ₹ (US$ amounts converted at {live?.rates?.USD ? 'the live' : 'a default'} rate of {usdInr.toFixed(1)}). Compiled {BIZ_COMPILED}.</p>
      <div className="notice">
        These come from public comparison sites, vendor-partner pages and news, not official rate cards. Vendors change prices often and sources sometimes disagree
        (see the note column). Indian prices are mostly before 18% GST. Confirm with the vendor before you buy or budget.
      </div>
      <div className="bar">
        {GROUPS.map((g) => <button key={g.id} className={'pill' + (g.id === group ? ' on' : '')} onClick={() => setGroup(g.id)}>{g.label}</button>)}
      </div>
      <div className="bar"><input placeholder="Search within this tab…" value={q} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 260 }} /></div>
      <div className="glass tablewrap">
        <table>
          <thead><tr><th>Name</th><th>Plan / item</th><th>Rate</th><th>Unit</th><th>Note</th><th>Source</th><th>Confidence</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td><b>{r.name}</b></td><td>{r.plan}</td><td>{rate(r)}</td><td className="muted">{r.unit}</td><td className="muted">{r.note}</td><td className="muted">{(() => { const u = SOURCE_URLS.find(([k]) => r.source.includes(k)); return u ? <a href={u[1]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{r.source} ↗</a> : r.source })()}</td>
                <td><span className="tag" style={{ background: CONF[r.conf][1], color: CONF[r.conf][2] }}>{CONF[r.conf][0]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p style={{ padding: 16 }}>Nothing matches.</p>}
      </div>
      <p className="muted" style={{ marginTop: 12 }}>
        Not found: mutual fund distributor commissions, LinkedIn Recruiter and Indeed pricing, Canva, Notion, Atlassian and Tally India prices, YouTube's revenue share, and Freshsales and monday CRM rupee prices.
      </p>
    </>
  )
}
