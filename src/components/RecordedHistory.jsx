import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { supabase } from '../lib/supabase.js'
import { money } from '../lib/util.js'

// Real recorded prices, saved once a day by the /api/daily-snapshot job (live-sourced items only).
export default function RecordedHistory({ id }) {
  const [rows, setRows] = useState(null)
  useEffect(() => {
    if (!supabase) return
    supabase.from('price_history').select('day,price').eq('item_id', id).order('day').limit(365)
      .then(({ data }) => setRows(data || []))
      .catch(() => setRows([]))
  }, [id])
  if (!supabase) return null
  return (
    <div className="glass" style={{ padding: 16, margin: '16px 0' }}>
      <h2 style={{ marginTop: 0 }}>📈 Recorded daily history</h2>
      {rows && rows.length >= 2 ? (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={rows.map((r) => ({ day: r.day.slice(5), price: Number(r.price) }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d9def0" />
            <XAxis dataKey="day" fontSize={12} />
            <YAxis fontSize={12} domain={['auto', 'auto']} width={70} tickFormatter={(v) => money(v)} />
            <Tooltip formatter={(v) => money(v)} />
            <Line type="monotone" dataKey="price" stroke="#0f9d58" strokeWidth={2.5} dot={rows.length < 30} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="muted">One price is saved every day from the live feed. The chart appears after the second daily snapshot ({rows ? rows.length : 0} saved so far).</p>
      )}
    </div>
  )
}
