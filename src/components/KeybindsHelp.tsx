import { AnimatePresence, motion } from 'framer-motion'
import { Keyboard, X } from 'lucide-react'
import { SPRING } from '../lib/motion'
import { useSystemStore } from '../store/useSystemStore'
import { KeybindGroups } from './KeybindGroups'

export function KeybindsHelp() {
  const open = useSystemStore((s) => s.keybindsHelpOpen)
  const close = useSystemStore((s) => s.closeKeybindsHelp)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-baseDark/40 px-4 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="keybinds-title"
            className="border-caelestia w-full max-w-md bg-base/80 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={SPRING}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === 'Escape' && close()}
          >
            <header className="flex items-center gap-2 border-b border-accentDark/60 px-3 py-2">
              <Keyboard size={16} className="text-accent" />
              <h2
                id="keybinds-title"
                className="font-mono text-sm uppercase tracking-wider text-textBright"
              >
                Keybinds
              </h2>
              <button
                type="button"
                autoFocus
                onClick={close}
                aria-label="Cerrar"
                className="ml-auto flex size-7 items-center justify-center hover:bg-accent/20 hover:text-textBright"
              >
                <X size={14} />
              </button>
            </header>

            <div className="max-h-[60vh] overflow-y-auto py-3">
              <KeybindGroups />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
