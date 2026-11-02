import { useMemo, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { APPS, type AppDefinition } from '../apps/registry'
import { SPRING } from '../lib/motion'
import { useSystemStore } from '../store/useSystemStore'
import { useWindowStore } from '../store/useWindowStore'

const LAUNCHABLE = APPS.filter((app) => !app.hidden)

export function WofiLauncher() {
  const open = useSystemStore((s) => s.launcherOpen)
  const onClose = useSystemStore((s) => s.closeLauncher)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-baseDark/40 px-4 pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          {/* Se monta en cada apertura, así la búsqueda y la selección empiezan limpias */}
          <LauncherPanel onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LauncherPanel({ onClose }: { onClose: () => void }) {
  const openApp = useWindowStore((s) => s.openApp)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q
      ? LAUNCHABLE.filter(
          (app) => app.title.toLowerCase().includes(q) || app.description.toLowerCase().includes(q),
        )
      : LAUNCHABLE
  }, [query])

  const launch = (app: AppDefinition | undefined) => {
    if (!app) return
    onClose()
    openApp(app.id)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') launch(results[selected])
  }

  return (
    <motion.div
      role="dialog"
      aria-label="Lanzador de aplicaciones"
      className="border-caelestia w-full max-w-md bg-base/80 backdrop-blur-xl"
      initial={{ opacity: 0, scale: 0.95, y: -12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -12 }}
      transition={SPRING}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={handleKeyDown}
    >
      <label className="flex items-center gap-2 border-b border-accentDark/60 px-3 py-2">
        <Search size={16} className="text-accent" />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelected(0)
          }}
          placeholder="drun"
          aria-label="Buscar aplicación"
          className="w-full bg-transparent font-mono text-sm text-textBright placeholder:text-textMuted focus:outline-none"
        />
      </label>

      <ul className="max-h-72 overflow-y-auto p-1">
        {results.map((app, i) => {
          const Icon = app.icon
          return (
            <li key={app.id}>
              <button
                type="button"
                onMouseEnter={() => setSelected(i)}
                onClick={() => launch(app)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-shadow hover:shadow-caelestia-glow ${
                  i === selected ? 'bg-accent/20 text-textBright' : ''
                }`}
              >
                <Icon size={16} className={i === selected ? 'text-accent' : 'text-textMuted'} />
                <span className="font-mono text-sm uppercase tracking-wide">{app.title}</span>
                <span className="ml-auto truncate text-xs text-textMuted">{app.description}</span>
              </button>
            </li>
          )
        })}
        {results.length === 0 && (
          <li className="px-3 py-2 font-mono text-sm text-textMuted">Sin resultados</li>
        )}
      </ul>
    </motion.div>
  )
}
