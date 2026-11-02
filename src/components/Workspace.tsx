import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { tileLayout } from '../lib/tiling'
import { useWindowStore } from '../store/useWindowStore'
import { WindowFrame } from './WindowFrame'

interface WorkspaceProps {
  workspace: number
  width: number
  height: number
}

export function Workspace({ workspace, width, height }: WorkspaceProps) {
  const tiledIds = useWindowStore(
    useShallow((s) =>
      s.order.filter((id) => s.windows[id].workspace === workspace && !s.windows[id].floating),
    ),
  )
  const floatingIds = useWindowStore(
    useShallow((s) =>
      s.order.filter((id) => s.windows[id].workspace === workspace && s.windows[id].floating),
    ),
  )

  const layout = useMemo(() => tileLayout(tiledIds.length, width, height), [tiledIds.length, width, height])

  return (
    <>
      {tiledIds.map((id, i) => (
        <WindowFrame key={id} windowId={id} tiledRect={layout[i]} areaWidth={width} areaHeight={height} />
      ))}
      {floatingIds.map((id) => (
        <WindowFrame key={id} windowId={id} areaWidth={width} areaHeight={height} />
      ))}
    </>
  )
}
