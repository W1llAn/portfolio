import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { onKeybind } from '../lib/keybindEvents'
import { SPRING } from '../lib/motion'
import { useSystemStore } from '../store/useSystemStore'
import { KeybindGroups } from './KeybindGroups'

const FLASH_MS = 400

function useKeybindFlash() {
  const [flashId, setFlashId] = useState<string | null>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const unsubscribe = onKeybind((bind) => {
      setFlashId(bind.id)
      clearTimeout(timer)
      timer = setTimeout(() => setFlashId(null), FLASH_MS)
    })
    return () => {
      unsubscribe()
      clearTimeout(timer)
    }
  }, [])

  return flashId
}

export function KeybindsDock() {
  const collapsed = useSystemStore((s) => s.dockCollapsed)
  const toggleDock = useSystemStore((s) => s.toggleDock)
  const flashId = useKeybindFlash()

  return (
    <motion.aside
      aria-label="Atajos de teclado"
      className="my-2.5 ml-2.5 hidden shrink-0 flex-col overflow-hidden border border-textMuted/30 bg-base/80 backdrop-blur-xl lg:flex"
      initial={false}
      animate={{ width: collapsed ? 40 : 260 }}
      transition={SPRING}
    >
      <header className="flex h-9 shrink-0 items-center border-b border-textMuted/20">
        {!collapsed && (
          <h2 className="truncate pl-3 font-mono text-xs uppercase tracking-wider text-textBright">
            Keybinds
          </h2>
        )}
        <button
          type="button"
          onClick={toggleDock}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expandir panel de atajos' : 'Colapsar panel de atajos'}
          className="ml-auto flex size-[38px] shrink-0 items-center justify-center text-textMuted hover:text-accent"
        >
          {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
        </button>
      </header>

      {collapsed ? (
        <p className="mt-3 select-none self-center font-mono text-[10px] uppercase tracking-[0.3em] text-textMuted [writing-mode:vertical-rl]">
          Keybinds · Alt+H
        </p>
      ) : (
        <div className="min-w-[258px] flex-1 overflow-y-auto py-3">
          <KeybindGroups flashId={flashId} />
        </div>
      )}
    </motion.aside>
  )
}
