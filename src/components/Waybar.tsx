import { BatteryFull, LayoutGrid, Volume2, Wifi } from 'lucide-react'
import { WORKSPACES, useSystemStore } from '../store/useSystemStore'
import { Clock } from './Clock'
import { MediaWidget } from './MediaWidget'

export function Waybar() {
  const activeWorkspace = useSystemStore((s) => s.activeWorkspace)
  const setActiveWorkspace = useSystemStore((s) => s.setActiveWorkspace)
  const toggleLauncher = useSystemStore((s) => s.toggleLauncher)
  const toggleKeybindsHelp = useSystemStore((s) => s.toggleKeybindsHelp)

  return (
    <header className="border-caelestia relative z-10 mx-2 mt-2 flex h-10 items-center justify-between gap-2 bg-base/80 px-2 font-mono text-xs uppercase tracking-wider backdrop-blur-xl">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleLauncher}
          aria-label="Abrir lanzador"
          className="flex h-7 items-center gap-2 border border-accent/60 px-2 text-textBright transition-shadow hover:bg-accent/20 hover:shadow-caelestia-glow"
        >
          <LayoutGrid size={14} />
          <span className="hidden sm:inline">Apps</span>
        </button>

        <nav aria-label="Workspaces" className="ml-2 flex gap-1">
          {WORKSPACES.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveWorkspace(id)}
              aria-current={id === activeWorkspace}
              className={
                id === activeWorkspace
                  ? 'size-6 bg-accent text-textBright shadow-caelestia-glow sm:size-7'
                  : 'size-6 text-textMuted hover:bg-baseDark/60 hover:text-textMain sm:size-7'
              }
            >
              {id}
            </button>
          ))}
        </nav>
      </div>

      <Clock />

      <div className="flex items-center gap-2 pr-1 sm:gap-3">
        <MediaWidget />
        {/* Debajo de lg el panel de atajos se oculta: este botón abre la ayuda */}
        <button
          type="button"
          onClick={toggleKeybindsHelp}
          aria-label="Ver atajos de teclado"
          className="flex size-7 items-center justify-center border border-textMuted/30 text-textBright hover:border-accent hover:shadow-caelestia-glow lg:hidden"
        >
          ?
        </button>
        <div className="hidden items-center gap-3 sm:flex">
          <Wifi size={14} className="text-terminalMoss" />
          <Volume2 size={14} />
          <span className="flex items-center gap-1 text-terminalBrass">
            <BatteryFull size={14} />
            100%
          </span>
        </div>
      </div>
    </header>
  )
}
