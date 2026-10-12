import { useState } from 'react'
import { fees, FEE_GROUPS, FEES_COMPILED, FALLBACK_RATES } from '../data/fees.js'
import { useLive } from '../lib/products.jsx'
import { inr } from '../lib/util.js'
import { lucknowSchools, BOARD_LABEL, SCHOOLS_SOURCE } from '../data/lucknowSchools.js'
import { kidzeeCentres, KIDZEE_SOURCE, KIDZEE_OLD_FEE } from '../data/kidzeeLucknow.js'

const CONF = { med: ['medium', '#e6f0ff', '#1a56c4'], low: ['low: verify', '#fff3d6', '#b26a00'] }
const SYMBOL = { INR: '₹', USD: '$', GBP: '£', AED: 'AED ', SGD: 'S$', HKD: 'HK$', CAD: 'C$', AUD: 'A$', EUR: '€' }

function SchoolDirectory() {
  const [q, setQ] = useState('')
  const [board, setBoard] = useState('all')
  const [onlyFee, setOnlyFee] = useState(false)
  const [sort, setSort] = useState('name')
  const list = lucknowSchools
    .filter((s) => (board === 'all' || BOARD_LABEL[s.board.split('/')[0]] === board) && (!onlyFee || s.fee) && (!q || (s.name + ' ' + s.locality).toLowerCase().includes(q.toLowerCase())))
    .sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : sort === 'place' ? a.locality.localeCompare(b.locality) : sort === 'high' ? (b.fee ?? -1) - (a.fee ?? -1) : (a.fee ?? 1e12) - (b.fee ?? 1e12))
  const withFee = lucknowSchools.filter((s) => s.fee).length
  return (
    <>
      <div className="notice">
        {lucknowSchools.length} Lucknow schools from <a href={SCHOOLS_SOURCE.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{SCHOOLS_SOURCE.label} ↗</a> ({SCHOOLS_SOURCE.on}).
        A fee is shown for {withFee} of them, and it is a single annual figure for Class 10 or 12 only. The rest publish no fee there: ask the school. Rows tagged "check" have an unusually low or high figure.
      </div>
      <div className="bar">
        <input placeholder="Search school or area, e.g. Gomti Nagar…" value={q} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 260 }} />
        <select value={board} onChange={(e) => setBoard(e.target.value)}><option value="all">All boards</option><option>CBSE</option><option>ICSE/ISC</option><option>Cambridge</option><option>UP Board</option></select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="name">Sort: name</option><option value="place">Sort: area</option><option value="high">Fee: high to low</option><option value="low">Fee: low to high</option></select>
        <label className="muted" style={{ display: 'flex', gap: 6, alignItems: 'center' }}><input type="checkbox" checked={onlyFee} onChange={(e) => setOnlyFee(e.target.checked)} style={{ padding: 0 }} /> Only schools with a fee</label>
        <span className="muted" style={{ alignSelf: 'center' }}>{list.length} shown</span>
      </div>
      <div className="glass tablewrap" style={{ maxHeight: 560, overflow: 'auto' }}>
        <table>
          <thead><tr><th>School</th><th>Area</th><th>Board</th><th>Annual fee</th></tr></thead>
          <tbody>
            {list.map((s, i) => (
              <tr key={i}>
                <td><b>{s.name}</b></td><td>{s.locality}</td><td>{s.board}</td>
                <td>{s.fee ? <><b>{inr(s.fee)}</b> <span className="muted">(Class {s.cls})</span>{(s.fee < 10000 || s.fee > 300000) && <span className="tag" style={{ marginLeft: 6, background: '#fff3d6', color: '#b26a00' }}>check</span>}</> : <span className="muted">not published</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function KidzeeDirectory() {
  const [q, setQ] = useState('')
  const list = kidzeeCentres.filter((c) => !q || (c.name + ' ' + c.locality + ' ' + c.address).toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <div className="notice">
        <b>Kidzee does not publish fees online.</b> Each of these {kidzeeCentres.length} Lucknow centres is a separate franchise and sets its own fee, so I cannot give a verified Lucknow figure. Call the centre for the current fee (playgroup, nursery, LKG, UKG).
        The only Lucknow number found is a Gomti Nagar listing of {inr(KIDZEE_OLD_FEE.annual)} a year ({inr(KIDZEE_OLD_FEE.monthly)} a month), but it is about four years old, so <b>do not rely on it</b>
        (<a href={KIDZEE_OLD_FEE.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>listing ↗</a>). For scale: Kidzee centres in Noida charge about ₹58,000–95,000 a year (see the Kidzee & preschools tab).
        Centre list: <a href={KIDZEE_SOURCE.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{KIDZEE_SOURCE.label} ↗</a>.
      </div>
      <div className="bar"><input placeholder="Search area, e.g. Gomti Nagar, Indira Nagar…" value={q} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 260 }} /><span className="muted" style={{ alignSelf: 'center' }}>{list.length} centres</span></div>
      <div className="glass tablewrap" style={{ maxHeight: 560, overflow: 'auto' }}>
        <table>
          <thead><tr><th>Centre</th><th>Area</th><th>Address</th><th>Fee</th></tr></thead>
          <tbody>{list.map((c, i) => <tr key={i}><td><b>{c.name}</b></td><td>{c.locality}</td><td className="muted">{c.address}</td><td className="muted">call the centre</td></tr>)}</tbody>
        </table>
      </div>
    </>
  )
}

export default function Fees() {
  const live = useLive()
  const [group, setGroup] = useState('lko-school')
  const [q, setQ] = useState('')
  const rate = (cur) => live?.rates?.[cur] ?? FALLBACK_RATES[cur] ?? 1
  const rows = fees.filter((f) => f.group === group && (!q || (f.name + ' ' + f.place + ' ' + f.level + ' ' + f.note).toLowerCase().includes(q.toLowerCase())))

  function amount(f) {
    if (f.amount == null) return <span className="muted">not found</span>
    if (f.amount === 0 && !f.amountMax) return <b>Free (no tuition)</b>
    const local = (v) => SYMBOL[f.currency] + v.toLocaleString(f.currency === 'INR' ? 'en-IN' : 'en-US')
    const lo = f.amount * rate(f.currency)
    const hi = f.amountMax ? f.amountMax * rate(f.currency) : null
    return (
      <>
        <b>{inr(lo)}{hi ? ' – ' + inr(hi) : ''}</b>
        {f.currency !== 'INR' && <div className="muted">{local(f.amount)}{f.amountMax ? ' – ' + local(f.amountMax) : ''}</div>}
      </>
    )
  }

  return (
    <>
      <h1>🎓 School, Kidzee and university fees</h1>
      <p className="sub">Lucknow and worldwide. Every amount is shown in ₹ (foreign fees converted at {live?.rates?.USD ? 'live' : 'default'} exchange rates), with the local currency underneath. Compiled {FEES_COMPILED}.</p>
      <div className="notice">
        These come from public aggregator pages and guides, not official fee notices. Fees change every year and usually exclude admission, transport, uniform, books and boarding. Always ask the institution for its current fee notice.
      </div>
      <div className="bar">{FEE_GROUPS.map((g) => <button key={g.id} className={'pill' + (g.id === group ? ' on' : '')} onClick={() => setGroup(g.id)}>{g.label}</button>)}</div>
      {group === 'lko-all' && <SchoolDirectory />}
      {group === 'kidzee-lko' && <KidzeeDirectory />}
      {group !== 'lko-all' && group !== 'kidzee-lko' && <>
      <div className="bar"><input placeholder="Search this tab…" value={q} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 260 }} /></div>
      <div className="glass tablewrap">
        <table>
          <thead><tr><th>Name</th><th>Place</th><th>Level</th><th>Fee (₹)</th><th>Per</th><th>Note</th><th>Source</th><th>Confidence</th></tr></thead>
          <tbody>
            {rows.map((f, i) => (
              <tr key={i}>
                <td><b>{f.name}</b></td><td>{f.place}</td><td>{f.level}</td><td>{amount(f)}</td><td className="muted">{f.period}</td><td className="muted">{f.note}</td>
                <td><a href={f.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>open ↗</a></td>
                <td><span className="tag" style={{ background: CONF[f.conf][1], color: CONF[f.conf][2] }}>{CONF[f.conf][0]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p style={{ padding: 16 }}>Nothing matches.</p>}
      </div>
      </>}
      <p className="muted" style={{ marginTop: 12 }}>
        Missing: verified Kidzee fees for any Lucknow centre, fees for most of the 350 schools, most Lucknow university fees (Lucknow University, Amity, Integral, BBD), and London and New York school fees. Tell me the schools you want and I will research those next.
      </p>
    </>
  )
}
