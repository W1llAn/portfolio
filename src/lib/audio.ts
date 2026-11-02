import type { Track } from '../config/tracks'

// Singleton fuera de React/Zustand: el elemento no es serializable, el store solo guarda flags
let element: HTMLAudioElement | null = null
let currentSrc: string | null = null
let volume = 1

export interface AudioEvents {
  play: () => void
  pause: () => void
  ended: () => void
  error: () => void
}

let events: Partial<AudioEvents> = {}

export function setAudioEvents(next: Partial<AudioEvents>) {
  events = next
}

// Se crea en el primer uso: con preload="none" no se descarga nada hasta que el usuario pulsa play
function getAudio(): HTMLAudioElement {
  if (!element) {
    element = new Audio()
    element.preload = 'none'
    element.volume = volume
    element.addEventListener('play', () => events.play?.())
    element.addEventListener('pause', () => events.pause?.())
    element.addEventListener('ended', () => events.ended?.())
    element.addEventListener('error', () => events.error?.())
  }
  return element
}

export function loadTrack(src: string) {
  if (src === currentSrc) return
  currentSrc = src
  getAudio().src = encodeURI(src)
}

export async function play(): Promise<boolean> {
  try {
    await getAudio().play()
    return true
  } catch {
    return false
  }
}

export function pause() {
  element?.pause()
}

export function setAudioVolume(value: number) {
  volume = Math.min(1, Math.max(0, value))
  if (element) element.volume = volume
}

const hasMediaSession = () => typeof navigator !== 'undefined' && 'mediaSession' in navigator

export function updateMediaSession(track: Track | undefined) {
  if (!hasMediaSession() || !track) return
  navigator.mediaSession.metadata = new MediaMetadata({ title: track.title, artist: track.artist })
}

export function setMediaSessionState(state: MediaSessionPlaybackState) {
  if (hasMediaSession()) navigator.mediaSession.playbackState = state
}

export function setMediaSessionHandlers(
  handlers: Partial<Record<MediaSessionAction, MediaSessionActionHandler>>,
) {
  if (!hasMediaSession()) return
  for (const [action, handler] of Object.entries(handlers)) {
    try {
      navigator.mediaSession.setActionHandler(action as MediaSessionAction, handler)
    } catch {
      // Acción no soportada por este navegador
    }
  }
}
