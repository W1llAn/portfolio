import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TRACKS } from '../config/tracks'
import {
  loadTrack,
  pause,
  play,
  setAudioEvents,
  setAudioVolume,
  setMediaSessionHandlers,
  setMediaSessionState,
  updateMediaSession,
} from '../lib/audio'

interface MediaState {
  /** Preferencia del usuario; apagado por defecto y nunca reproduce solo */
  enabled: boolean
  isPlaying: boolean
  volume: number
  trackIndex: number

  setEnabled: (enabled: boolean) => void
  togglePlay: () => void
  next: () => void
  setVolume: (volume: number) => void
}

// trackIndex viene de localStorage y puede quedar fuera de rango si cambia la lista
export const trackAt = (index: number) =>
  TRACKS.length ? TRACKS[((index % TRACKS.length) + TRACKS.length) % TRACKS.length] : undefined

function startTrack(index: number, volume: number) {
  const track = trackAt(index)
  if (!track) return
  loadTrack(track.src)
  setAudioVolume(volume)
  updateMediaSession(track)
  void play()
}

export const useMediaStore = create<MediaState>()(
  persist(
    (set, get) => ({
      enabled: false,
      isPlaying: false,
      volume: 0.5,
      trackIndex: 0,

      setEnabled: (enabled) => {
        if (!enabled) pause()
        set({ enabled })
      },
      togglePlay: () => {
        const { isPlaying, trackIndex, volume } = get()
        if (isPlaying) {
          pause()
          return
        }
        set({ enabled: true })
        startTrack(trackIndex, volume)
      },
      next: () => {
        const { trackIndex, isPlaying, volume } = get()
        const index = (trackIndex + 1) % Math.max(TRACKS.length, 1)
        set({ trackIndex: index })
        if (isPlaying) startTrack(index, volume)
        else updateMediaSession(trackAt(index))
      },
      setVolume: (volume) => {
        setAudioVolume(volume)
        set({ volume })
      },
    }),
    {
      name: 'portfolio:media',
      partialize: ({ enabled, volume, trackIndex }) => ({ enabled, volume, trackIndex }),
    },
  ),
)

setAudioEvents({
  play: () => {
    useMediaStore.setState({ isPlaying: true })
    setMediaSessionState('playing')
  },
  pause: () => {
    useMediaStore.setState({ isPlaying: false })
    setMediaSessionState('paused')
  },
  // "pause" se emite antes de "ended", así que next() no reanudaría: se avanza y reproduce aquí
  ended: () => {
    const { trackIndex, volume } = useMediaStore.getState()
    const index = (trackIndex + 1) % Math.max(TRACKS.length, 1)
    useMediaStore.setState({ trackIndex: index })
    startTrack(index, volume)
  },
  error: () => useMediaStore.setState({ isPlaying: false }),
})

setMediaSessionHandlers({
  play: () => {
    if (!useMediaStore.getState().isPlaying) useMediaStore.getState().togglePlay()
  },
  pause: () => pause(),
  nexttrack: () => useMediaStore.getState().next(),
})
