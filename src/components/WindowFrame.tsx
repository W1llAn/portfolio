import { memo, Suspense } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Rnd } from 'react-rnd'
import { getApp } from '../apps/registry'
import { SPRING } from '../lib/motion'
import { defaultFloatingRect, type Rect } from '../lib/tiling'
import { useWindowStore } from '../store/useWindowStore'

interface WindowFrameProps {
  windowId: string
  /** Rect calculado por el tiling; ausente si la ventana es flotante */
  tiledRect?: Rect
  areaWidth: number
  areaHeight: number
}

export const WindowFrame = memo(function WindowFrame({
  windowId,
  tiledRect,
  areaWidth,
  areaHeight,
}: WindowFrameProps) {
  const win = useWindowStore((s) => s.windows[windowId])
  const isFocused = useWindowStore((s) => !!win && s.focused[win.workspace] === windowId)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const setWindowRect = useWindowStore((s) => s.setWindowRect)

  if (!win) return null
  const app = getApp(win.appId)
  const Icon = app.icon
  const AppComponent = app.component

  const frame = (
    <section
      aria-label={win.title}
      onMouseDown={() => focusWindow(windowId)}
      onFocus={() => focusWindow(windowId)}
      className={`flex size-full flex-col bg-base/80 backdrop-blur-xl ${
        isFocused ? 'border-caelestia' : 'border border-textMuted/30'
      }`}
    >
      <header className="window-titlebar flex h-8 shrink-0 select-none items-center gap-2 border-b border-textMuted/20 pl-2.5">
        <Icon size={13} className={isFocused ? 'text-accent' : 'text-textMuted'} />
        <h2 className="truncate font-mono text-[11px] uppercase tracking-wider text-textBright">
          {win.title}
        </h2>
        {win.floating && (
          <span className="font-mono text-[10px] uppercase text-textMuted">· float</span>
        )}
        <button
          type="button"
          onClick={() => closeWindow(windowId)}
          aria-label={`Cerrar ${win.title}`}
          className="ml-auto flex h-full w-8 items-center justify-center text-textMuted hover:bg-accent hover:text-textBright"
        >
          <X size={13} />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-auto">
        <Suspense
          fallback={<p className="p-4 font-mono text-xs uppercase text-textMuted">Cargando…</p>}
        >
          <AppComponent windowId={windowId} />
        </Suspense>
      </div>
    </section>
  )

  if (win.floating) {
    const rect = win.rect ?? defaultFloatingRect(areaWidth, areaHeight, win.z)
    return (
      <Rnd
        bounds="parent"
        dragHandleClassName="window-titlebar"
        cancel="button"
        position={{ x: rect.x, y: rect.y }}
        size={{ width: rect.width, height: rect.height }}
        minWidth={280}
        minHeight={180}
        style={{ zIndex: 10 + win.z }}
        onDragStart={() => focusWindow(windowId)}
        onDragStop={(_, d) => setWindowRect(windowId, { ...rect, x: d.x, y: d.y })}
        onResizeStop={(_e, _dir, ref, _delta, position) =>
          setWindowRect(windowId, {
            x: position.x,
            y: position.y,
            width: ref.offsetWidth,
            height: ref.offsetHeight,
          })
        }
      >
        {frame}
      </Rnd>
    )
  }

  if (!tiledRect) return null
  return (
    <motion.div
      className="absolute left-0 top-0"
      initial={{ ...tiledRect, opacity: 0, scale: 0.97 }}
      animate={{ ...tiledRect, opacity: 1, scale: 1 }}
      transition={SPRING}
    >
      {frame}
    </motion.div>
  )
})
