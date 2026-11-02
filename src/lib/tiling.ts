export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export const OUTER_GAP = 10
export const INNER_GAP = 5
const MASTER_RATIO = 0.55
/** Por debajo de este ancho el área se apila en una sola columna */
const COMPACT_WIDTH = 640

function column(x: number, y: number, width: number, height: number, count: number): Rect[] {
  const itemHeight = (height - INNER_GAP * (count - 1)) / count
  return Array.from({ length: count }, (_, i) => ({
    x,
    y: y + i * (itemHeight + INNER_GAP),
    width,
    height: itemHeight,
  }))
}

/**
 * Layout tipo dwindle simplificado:
 * 1 ventana = área completa, 2 = mitad/mitad vertical, 3+ = master a la izquierda (55%) y stack a la derecha.
 */
export function tileLayout(count: number, areaWidth: number, areaHeight: number): Rect[] {
  const width = areaWidth - OUTER_GAP * 2
  const height = areaHeight - OUTER_GAP * 2
  if (count === 0 || width <= 0 || height <= 0) return []

  if (count === 1) return [{ x: OUTER_GAP, y: OUTER_GAP, width, height }]
  if (areaWidth < COMPACT_WIDTH) return column(OUTER_GAP, OUTER_GAP, width, height, count)

  if (count === 2) {
    const half = (width - INNER_GAP) / 2
    return [
      { x: OUTER_GAP, y: OUTER_GAP, width: half, height },
      { x: OUTER_GAP + half + INNER_GAP, y: OUTER_GAP, width: half, height },
    ]
  }

  const masterWidth = Math.round((width - INNER_GAP) * MASTER_RATIO)
  const stackX = OUTER_GAP + masterWidth + INNER_GAP
  return [
    { x: OUTER_GAP, y: OUTER_GAP, width: masterWidth, height },
    ...column(stackX, OUTER_GAP, width - masterWidth - INNER_GAP, height, count - 1),
  ]
}

/** Posición inicial de una ventana que pasa a flotante y aún no tiene rect guardado */
export function defaultFloatingRect(areaWidth: number, areaHeight: number, offset = 0): Rect {
  const width = Math.min(720, areaWidth - OUTER_GAP * 2)
  const height = Math.min(480, areaHeight - OUTER_GAP * 2)
  const shift = (offset % 5) * 24
  return {
    x: Math.max(OUTER_GAP, (areaWidth - width) / 2 + shift),
    y: Math.max(OUTER_GAP, (areaHeight - height) / 2 + shift),
    width,
    height,
  }
}
