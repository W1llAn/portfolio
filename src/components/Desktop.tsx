import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useElementSize } from '../hooks/useElementSize'
import { SPRING } from '../lib/motion'
import { useSystemStore } from '../store/useSystemStore'
import { KeybindsDock } from './KeybindsDock'
import { Workspace } from './Workspace'

const slide: Variants = {
  enter: (direction: number) => ({ x: `${direction * 100}%` }),
  center: { x: 0 },
  exit: (direction: number) => ({ x: `${direction * -100}%` }),
}

export function Desktop() {
  const activeWorkspace = useSystemStore((s) => s.activeWorkspace)
  const direction = useSystemStore((s) => s.workspaceDirection)
  // El área se mide sin el panel de atajos, así el tiling lo excluye automáticamente
  const [areaRef, area] = useElementSize<HTMLElement>()

  return (
    <div className="relative flex min-h-0 flex-1">
      <KeybindsDock />
      <main
        ref={areaRef}
        aria-label={`Workspace ${activeWorkspace}`}
        className="relative isolate min-w-0 flex-1 overflow-hidden"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeWorkspace}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SPRING}
            className="absolute inset-0"
          >
            <Workspace workspace={activeWorkspace} width={area.width} height={area.height} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
