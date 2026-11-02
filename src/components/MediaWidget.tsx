import { Music, Pause, Play, Power, SkipForward } from 'lucide-react'
import { TRACKS } from '../config/tracks'
import { trackAt, useMediaStore } from '../store/useMediaStore'

const ICON_BUTTON =
  'flex size-7 items-center justify-center text-textMain hover:bg-accent/20 hover:text-textBright hover:shadow-caelestia-glow'

export function MediaWidget() {
  const enabled = useMediaStore((s) => s.enabled)
  const isPlaying = useMediaStore((s) => s.isPlaying)
  const volume = useMediaStore((s) => s.volume)
  const trackIndex = useMediaStore((s) => s.trackIndex)
  const setEnabled = useMediaStore((s) => s.setEnabled)
  const togglePlay = useMediaStore((s) => s.togglePlay)
  const next = useMediaStore((s) => s.next)
  const setVolume = useMediaStore((s) => s.setVolume)

  if (TRACKS.length === 0) return null

  if (!enabled) {
    return (
      <button
        type="button"
        onClick={() => setEnabled(true)}
        aria-label="Activar música"
        className="flex h-7 items-center gap-1 px-1 text-textMuted hover:text-textMain"
      >
        <Music size={14} />
        <span className="hidden sm:inline">Off</span>
      </button>
    )
  }

  const track = trackAt(trackIndex)

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        className={ICON_BUTTON}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>
      <button type="button" onClick={next} aria-label="Siguiente pista" className={ICON_BUTTON}>
        <SkipForward size={14} />
      </button>

      <span className="hidden max-w-32 truncate normal-case tracking-normal lg:inline" title={track?.artist}>
        {track?.title}
      </span>

      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        aria-label="Volumen"
        className="hidden w-16 accent-accent md:block"
      />

      <button
        type="button"
        onClick={() => setEnabled(false)}
        aria-label="Apagar música"
        className="flex size-7 items-center justify-center text-textMuted hover:text-accent"
      >
        <Power size={14} />
      </button>
    </div>
  )
}
