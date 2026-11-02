import { useWindowStore } from '../store/useWindowStore'

const EMPTY: Record<string, string> = {}

/** Parámetros con los que se abrió una ventana (p. ej. el id de proyecto) */
export function useWindowParams(windowId: string) {
  return useWindowStore((s) => s.windows[windowId]?.params ?? EMPTY)
}
