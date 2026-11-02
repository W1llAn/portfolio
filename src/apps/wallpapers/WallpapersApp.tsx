import { WALLPAPERS } from '../../config/wallpapers'
import { useNotifyStore } from '../../store/useNotifyStore'
import { useSystemStore } from '../../store/useSystemStore'

export default function WallpapersApp() {
  const current = useSystemStore((s) => s.wallpaper)
  const setWallpaper = useSystemStore((s) => s.setWallpaper)
  const notify = useNotifyStore((s) => s.notify)

  const choose = (id: string) => {
    if (id === current) return
    setWallpaper(id)
    notify('Fondo cambiado')
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 p-4">
      {WALLPAPERS.map((wallpaper) => {
        const active = wallpaper.id === current
        return (
          <li key={wallpaper.id}>
            <button
              type="button"
              onClick={() => choose(wallpaper.id)}
              aria-pressed={active}
              className={`w-full p-1 text-left ${
                active ? 'border-caelestia' : 'border border-textMuted/30 hover:shadow-caelestia-glow'
              }`}
            >
              {/* obsidiana debajo: también sirve de fallback si la miniatura no carga */}
              <span className="wallpaper-obsidiana relative block aspect-video overflow-hidden">
                {wallpaper.src && (
                  <img
                    src={wallpaper.src}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                    onError={(e) => {
                      e.currentTarget.hidden = true
                    }}
                  />
                )}
              </span>
              <span
                className={`mt-1 block font-mono text-[11px] uppercase tracking-wider ${
                  active ? 'text-accent' : 'text-textMain'
                }`}
              >
                {wallpaper.name}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
