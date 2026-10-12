import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAgent } from '../lib/useAgent.js'
import { speak, stopSpeaking, useVoiceInput, voiceOutputSupported } from '../lib/voice.js'

// Floating microphone on every page: tap, ask a question out loud, and it answers out loud.
export default function VoiceWidget() {
  const { msgs, busy, ask } = useAgent()
  const [open, setOpen] = useState(false)
  const [talk, setTalk] = useState(true)
  const [text, setText] = useState('')

  async function send(t) {
    const reply = await ask(t)
    if (reply && talk) speak(reply)
  }
  const voice = useVoiceInput((t) => { setText(''); send(t) })

  const last = [...msgs].reverse()
  const answer = last.find((m) => m.r === 'a')
  const question = last.find((m) => m.r === 'u')

  function onMic() {
    setOpen(true)
    if (voice.listening) voice.stop()
    else voice.start() // runs inside the click, so the browser allows the microphone
  }

  return (
    <div className="voice-widget">
      {open && (
        <div className="glass voice-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <b>🎤 Ask by voice</b>
            <button className="ghost" onClick={() => { voice.stop(); stopSpeaking(); setOpen(false) }} aria-label="Close">✕</button>
          </div>
          <div className="voice-body">
            {voice.listening && <div className="msg u">🎤 {voice.interim || 'Listening… speak now'}</div>}
            {!voice.listening && question && <div className="msg u">{question.t}</div>}
            {busy && <div className="msg a">Thinking…</div>}
            {!busy && answer && <div className="msg a">{answer.t}</div>}
          </div>
          {voice.error && <div className="notice">{voice.error}</div>}
          <form className="bar" onSubmit={(e) => { e.preventDefault(); const t = text; setText(''); send(t) }}>
            <input style={{ flex: 1, minWidth: 0 }} placeholder="or type here…" value={text} onChange={(e) => setText(e.target.value)} />
            <button disabled={busy}>Ask</button>
          </form>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            {voiceOutputSupported && (
              <label className="muted" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input type="checkbox" checked={talk} onChange={(e) => { setTalk(e.target.checked); if (!e.target.checked) stopSpeaking() }} style={{ padding: 0 }} /> Talk back
              </label>
            )}
            <Link to="/agent" onClick={() => setOpen(false)} className="muted">Open full agent →</Link>
          </div>
        </div>
      )}
      <button className={'voice-fab' + (voice.listening ? ' on' : '')} onClick={onMic} aria-label="Talk to the price agent" title="Talk to the price agent">
        {voice.listening ? '⏹' : '🎤'}
      </button>
    </div>
  )
}
