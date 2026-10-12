import { useCallback, useEffect, useRef, useState } from 'react'

const SR = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null
export const voiceInputSupported = !!SR
export const voiceOutputSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

function pickVoice() {
  const vs = window.speechSynthesis.getVoices()
  return (
    vs.find((v) => v.lang === 'en-IN') ||
    vs.find((v) => v.lang === 'en-GB') ||
    vs.find((v) => v.lang === 'en-US') ||
    vs.find((v) => v.lang.startsWith('en')) ||
    null
  )
}

// Turn a text answer into something that sounds natural when read aloud.
export function spokenVersion(text) {
  return text
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/₹\s?([\d,.]+)\s?Cr/g, '$1 crore rupees')
    .replace(/₹\s?([\d,.]+)\s?L\b/g, '$1 lakh rupees')
    .replace(/₹\s?([\d,.]+)/g, '$1 rupees')
    .replace(/\bsq ft\b/gi, 'square feet')
    .replace(/\bsq m\b/gi, 'square metres')
    .replace(/~/g, 'about ')
    .replace(/[\p{Extended_Pictographic}\p{Regional_Indicator}‍️•→●✔]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function stopSpeaking() {
  if (voiceOutputSupported) window.speechSynthesis.cancel()
}

// Reads text aloud in English (Indian English if the device has it). Long text is split into short chunks
// because some browsers stop speaking after ~15 seconds.
export function speak(text, { onEnd } = {}) {
  if (!voiceOutputSupported) return
  const clean = spokenVersion(text).slice(0, 700)
  if (!clean) return
  window.speechSynthesis.cancel()
  const chunks = clean.split(/(?<=[.!?])\s+(?=[A-Z])/).filter(Boolean)
  const voice = pickVoice()
  chunks.forEach((c, i) => {
    const u = new SpeechSynthesisUtterance(c.trim())
    u.lang = voice?.lang || 'en-IN'
    if (voice) u.voice = voice
    u.rate = 1
    if (i === chunks.length - 1 && onEnd) u.onend = onEnd
    window.speechSynthesis.speak(u)
  })
}

// Voices load asynchronously in Chrome; touch them once so the first answer can pick a good one.
if (voiceOutputSupported) {
  window.speechSynthesis.getVoices()
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices()
}

// Speech to text. Calls onFinal(text) once when the user stops talking, even if the browser never
// flags the result as "final".
export function useVoiceInput(onFinal) {
  const [listening, setListening] = useState(false)
  const [interim, setInterim] = useState('')
  const [error, setError] = useState('')
  const recRef = useRef(null)
  const lastRef = useRef('')
  const sentRef = useRef(false)
  const errRef = useRef(false)
  const cbRef = useRef(onFinal)
  cbRef.current = onFinal

  const start = useCallback(() => {
    if (!SR) {
      setError('Voice input is not supported in this browser. Please use Chrome or Edge.')
      return
    }
    stopSpeaking()
    const rec = new SR()
    rec.lang = 'en-IN'
    rec.interimResults = true
    rec.continuous = false
    rec.maxAlternatives = 1
    lastRef.current = ''
    sentRef.current = false
    errRef.current = false
    setError('')
    setInterim('')
    const send = (text) => {
      if (sentRef.current || !text) return
      sentRef.current = true
      cbRef.current(text)
    }
    rec.onstart = () => setListening(true)
    rec.onresult = (ev) => {
      let text = ''
      for (const r of ev.results) text += r[0].transcript
      text = text.trim()
      lastRef.current = text
      setInterim(text)
      if (ev.results[ev.results.length - 1].isFinal) send(text)
    }
    rec.onerror = (ev) => {
      errRef.current = true
      setError(
        ev.error === 'not-allowed' || ev.error === 'service-not-allowed'
          ? 'Microphone is blocked. Click the lock icon in the address bar, allow the microphone, then try again.'
          : ev.error === 'no-speech'
            ? "I didn't hear anything. Click the mic and try again."
            : ev.error === 'network'
              ? 'Voice recognition needs an internet connection.'
              : ev.error === 'audio-capture'
                ? 'No microphone was found on this device.'
                : ev.error === 'aborted'
                  ? ''
                  : 'Voice error: ' + ev.error
      )
    }
    rec.onend = () => {
      setListening(false)
      send(lastRef.current) // browsers sometimes end without a "final" flag
      if (!sentRef.current && !errRef.current) setError("I didn't catch that. Click the mic and try again.")
    }
    recRef.current = rec
    try {
      rec.start()
    } catch {
      setError('Could not start the microphone. Please try again.')
    }
  }, [])

  const stop = useCallback(() => recRef.current?.stop(), [])
  useEffect(() => () => { recRef.current?.abort(); stopSpeaking() }, [])
  return { listening, interim, error, start, stop, supported: !!SR }
}
