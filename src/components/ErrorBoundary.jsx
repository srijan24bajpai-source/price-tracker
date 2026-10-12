import { Component } from 'react'

// Shows a readable message instead of a blank page if any part of the UI crashes.
export default class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('UI crashed:', error, info?.componentStack)
  }
  render() {
    if (!this.state.error) return this.props.children
    if (this.props.compact) return null // e.g. the floating mic: just hide it
    return (
      <div className="glass" style={{ padding: 20, margin: '20px 0' }}>
        <h2 style={{ marginTop: 0 }}>Something went wrong on this page</h2>
        <p className="muted">The rest of the site still works. Details (please send this to the developer):</p>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '.8rem' }}>{String(this.state.error?.stack || this.state.error).slice(0, 800)}</pre>
        <button onClick={() => this.setState({ error: null })}>Try again</button>{' '}
        <button className="ghost" onClick={() => (window.location.href = '/')}>Go home</button>
      </div>
    )
  }
}
