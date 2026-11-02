import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getWallpaper } from '../config/wallpapers'
import { useSystemStore } from '../store/useSystemStore'

export function Wallpaper() {
  const wallpaperId = useSystemStore((s) => s.wallpaper)
  const { src } = getWallpaper(wallpaperId)
  // Imágenes que fallaron: debajo siempre queda obsidiana como fallback
  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set())
  const showImage = src !== null && !failed.has(src)

  return (
    <div aria-hidden="true" className="wallpaper-obsidiana pointer-events-none absolute inset-0">
      <AnimatePresence initial={false}>
        {showImage && (
          <motion.img
            key={src}
            src={src}
            alt=""
            decoding="async"
            className="absolute inset-0 size-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onError={() => setFailed((prev) => new Set(prev).add(src))}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
