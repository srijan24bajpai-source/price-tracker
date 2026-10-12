import { useEffect, useRef, useState } from 'react'
import { CHIPS } from '../lib/agentLogic.js'
import { useAgent } from '../lib/useAgent.js'
import { speak, stopSpeaking, useVoiceInput, voiceOutputSupported } from '../lib/voice.js'

export default function Agent() {
  const { msgs, busy, ask } = useAgent()
  const [q, setQ] = useState('')
  const [talk, setTalk] = useState(true) // read answers aloud
  const talkRef = useRef(talk)
  talkRef.current = talk
  const end = useRef()
  useEffect(() => end.current?.scrollIntoView({ behavior: 'smooth' }), [msgs])

  async function send(text) {
    const reply = await ask(text)
    if (reply && talkRef.current) speak(reply)
  }

  const voice = useVoiceInput((text) => {
    setQ('')
    send(text)
  })

  return (
    <>
      <h1>🤖 AI Price Agent</h1>
      <div className="bar">{CHIPS.map((c) => <button key={c} type="button" className="pill" onClick={() => send(c)}>{c}</button>)}</div>
      <div className="glass chat">
        {msgs.map((m, i) => <div key={i} className={'msg ' + m.r}>{m.t}</div>)}
        {voice.listening && <div className="msg u">🎤 {voice.interim || 'Listening…'}</div>}
        <div ref={end} />
      </div>
      <form className="bar" onSubmit={(e) => { e.preventDefault(); const t = q; setQ(''); send(t) }}>
        <input style={{ flex: 1 }} placeholder="Type or tap the mic and speak…" value={voice.listening ? voice.interim : q} onChange={(e) => setQ(e.target.value)} />
        <button type="button" className={voice.listening ? 'bad' : 'ghost'} onClick={voice.listening ? voice.stop : voice.start} aria-label="Microphone">
          {voice.listening ? '⏹ Stop' : '🎤 Speak'}
        </button>
        <button disabled={busy}>Send</button>
      </form>
      {voiceOutputSupported && (
        <label className="muted" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={talk} onChange={(e) => { setTalk(e.target.checked); if (!e.target.checked) stopSpeaking() }} style={{ padding: 0 }} />
          Talk back (read answers aloud in English)
        </label>
      )}
      {voice.error && <div className="notice">{voice.error}</div>}
      <p className="muted">Voice works in Chrome and Edge, in English. Your browser sends the audio to its speech service to turn it into text.</p>
    </>
  )
}
