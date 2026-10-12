import { useEffect, useState } from 'react'
import { adminLogin, adminLogout, adminSession, listSubmissions, setSubmissionStatus, usingDatabase } from '../lib/store.js'
import { inr } from '../lib/util.js'

export default function Admin() {
  const [ok, setOk] = useState(null) // null = checking
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [list, setList] = useState([])

  const load = () => listSubmissions({ approvedOnly: false }).then(setList).catch(() => setErr('Could not load submissions.'))
  useEffect(() => { adminSession().then(setOk) }, [])
  useEffect(() => { if (ok) load() }, [ok])

  const login = async (e) => {
    e.preventDefault()
    try { await adminLogin(email, pw); setErr(''); setOk(true) } catch { setErr('Login failed. Check your credentials.') }
  }
  const act = async (id, status) => {
    try { await setSubmissionStatus(id, status); load() } catch { setErr('Action failed. Are you signed in as admin?') }
  }

  if (ok === null) return <p>Checking session…</p>
  if (!ok)
    return (
      <>
        <h1>🔒 Admin</h1>
        <form className="form glass" onSubmit={login}>
          {usingDatabase && <input type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} />}
          <input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
          <button>Login</button>
          {err && <div className="notice">{err}</div>}
        </form>
      </>
    )
  const pending = list.filter((s) => s.status === 'pending')
  return (
    <>
      <h1>Approve submissions</h1>
      {!usingDatabase && <div className="notice">Demo mode: Supabase is not configured, so data is stored only in this browser. See README to connect the database.</div>}
      {err && <div className="notice">{err}</div>}
      <button className="ghost" onClick={async () => { await adminLogout(); setOk(false) }}>Log out</button>
      <h2>Pending ({pending.length})</h2>
      {pending.length === 0 && <p className="muted">Nothing waiting.</p>}
      {pending.map((s) => (
        <div key={s.id} className="glass" style={{ padding: 14, marginBottom: 10 }}>
          <b>{s.name}</b> · {inr(Number(s.price))} / {s.unit} · {s.seller || 'no seller'} · {s.city}, {s.country} · <span className="muted">{s.category}</span>
          <div className="bar">
            <button className="good" onClick={() => act(s.id, 'approved')}>Approve</button>
            <button className="bad" onClick={() => act(s.id, 'rejected')}>Reject</button>
          </div>
        </div>
      ))}
      <h2>History</h2>
      {list.filter((s) => s.status !== 'pending').map((s) => (
        <div key={s.id} className="muted">{s.name}: {s.status}</div>
      ))}
    </>
  )
}
