import { useEffect, useState } from 'react'
import { addComment, getComments } from '../lib/store.js'
import { money } from '../lib/util.js'

export default function Comments({ product }) {
  const [list, setList] = useState([])
  const [err, setErr] = useState('')
  const [f, setF] = useState({ name: '', text: '', price: '', where: '' })
  const market = product.sellers[0].price
  const load = () => getComments(product.id).then(setList).catch(() => setErr('Could not load comments.'))
  useEffect(() => { load() }, [product.id])

  const submit = async (e) => {
    e.preventDefault()
    if (!f.text.trim()) return
    try {
      await addComment(product.id, { ...f, name: f.name.trim() || 'Anonymous' })
      setF({ name: '', text: '', price: '', where: '' })
      setErr('')
      load()
    } catch {
      setErr('Could not post your comment. Please try again.')
    }
  }
  return (
    <section>
      <h2>Community price reports</h2>
      <form className="form glass" onSubmit={submit}>
        <input placeholder="Your name (optional)" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <input type="number" step="any" placeholder={'Price you found (market best ' + money(market) + ')'} value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} />
        <input placeholder="Where (shop / area / site)" value={f.where} onChange={(e) => setF({ ...f, where: e.target.value })} />
        <textarea rows={2} placeholder="Comment, e.g. found it cheaper here" value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} />
        <button>Post comment</button>
        {err && <div className="notice">{err}</div>}
      </form>
      {list.map((c, i) => {
        const below = c.price != null && Number(c.price) < market
        return (
          <div key={c.id ?? i} className="glass" style={{ padding: 12, marginTop: 10 }}>
            <b>{c.name}</b> <span className="muted">{new Date(c.created_at).toLocaleDateString()}</span>
            {c.price != null && <span className={below ? 'tag badge-best' : 'tag'} style={{ marginLeft: 8 }}>{money(Number(c.price))}{below ? ' · below market!' : ''}</span>}
            {c.place && <div className="muted">📍 {c.place}</div>}
            <div>{c.text}</div>
          </div>
        )
      })}
    </section>
  )
}
