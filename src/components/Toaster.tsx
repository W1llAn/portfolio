import { AnimatePresence, motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { SPRING } from '../lib/motion'
import { useNotifyStore } from '../store/useNotifyStore'

// Notificaciones tipo mako: arriba a la derecha, bajo la barra
export function Toaster() {
  const items = useNotifyStore((s) => s.items)
  const dismiss = useNotifyStore((s) => s.dismiss)

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed right-2 top-14 z-[60] flex w-72 max-w-[calc(100vw-1rem)] flex-col gap-2"
    >
      <AnimatePresence initial={false}>
        {items.map((n) => (
          <motion.button
            key={n.id}
            type="button"
            layout
            onClick={() => dismiss(n.id)}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={SPRING}
            className="border-caelestia pointer-events-auto flex items-center gap-2 bg-base/80 px-3 py-2 text-left font-mono text-xs uppercase tracking-wider text-textBright backdrop-blur-xl"
          >
            <Bell size={12} className="shrink-0 text-accent" />
            {n.message}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  )
}
