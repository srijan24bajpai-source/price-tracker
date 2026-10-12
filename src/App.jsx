import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLive } from './lib/products.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Category from './pages/Category.jsx'
import Product from './pages/Product.jsx'
import Compare from './pages/Compare.jsx'
import RealEstate from './pages/RealEstate.jsx'
import Agent from './pages/Agent.jsx'
import Submit from './pages/Submit.jsx'
import Admin from './pages/Admin.jsx'
import BizRates from './pages/BizRates.jsx'
import Fees from './pages/Fees.jsx'
import VoiceWidget from './components/VoiceWidget.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

export default function App() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const live = useLive()
  const feeds = [live?.metalsUpdated && 'gold/silver/platinum', live?.fxUpdated && 'exchange rates', live?.mandiUpdated && 'mandi vegetable prices'].filter(Boolean)
  return (
    <>
      <header className="top glass">
        <NavLink to="/" className="logo">Price<span>Tracker</span> AI</NavLink>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/compare/india">India Compare</NavLink>
          <NavLink to="/compare/world">World Compare</NavLink>
          <NavLink to="/real-estate">Land &amp; Projects</NavLink>
          <NavLink to="/fees">School &amp; Uni Fees</NavLink>
          <NavLink to="/business">Business Rates</NavLink>
          <NavLink to="/agent">AI Agent</NavLink>
          <NavLink to="/submit">Add a Price</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
        <form onSubmit={(e) => { e.preventDefault(); nav('/category/all?q=' + encodeURIComponent(q)) }}>
          <input className="search" placeholder="Search anything…" value={q} onChange={(e) => setQ(e.target.value)} />
        </form>
      </header>
      <main>
        <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/compare/:scope" element={<Compare />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/business" element={<BizRates />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        </ErrorBoundary>
        <p className="muted" style={{ marginTop: 40 }}>
          Live now (refreshes every 5 min): {feeds.length ? feeds.join(' + ') : 'no live feed reachable'}. All other prices are indicative sample data, not live quotes. Verify with the seller before buying.
        </p>
      </main>
      <ErrorBoundary compact><VoiceWidget /></ErrorBoundary>
    </>
  )
}
