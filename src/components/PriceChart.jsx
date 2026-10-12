import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function PriceChart({ history, forecast }) {
  const data = [
    ...history.map((h) => ({ month: h.month, price: h.price })),
    ...forecast.map((f) => ({ month: f.month + '*', forecast: f.price })),
  ]
  data[history.length - 1].forecast = history[history.length - 1].price
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#d9def0" />
        <XAxis dataKey="month" fontSize={12} />
        <YAxis fontSize={12} domain={['auto', 'auto']} width={60} />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="forecast" stroke="#d93025" strokeDasharray="5 4" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
