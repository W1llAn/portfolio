import { create } from 'zustand'
import { APPS, getApp, type AppDefinition, type AppId } from '../apps/registry'
import type { Rect } from '../lib/tiling'
import { useSystemStore } from './useSystemStore'

export interface AppWindow {
  id: string
  appId: AppId
  title: string
  workspace: number
  floating: boolean
  /** Solo para flotantes; se guarda en onDragStop/onResizeStop */
  rect: Rect | null
  z: number
  /** Clave de unicidad: singletons por app, o por app + instanceKey */
  key?: string
  params: Record<string, string>
}

export interface OpenOptions {
  workspace?: number
  instanceKey?: string
  title?: string
  params?: Record<string, string>
}

interface WindowState {
  windows: Record<string, AppWindow>
  /** Orden de apertura: define la posición en el tiling */
  order: string[]
  focused: Record<number, string | undefined>

  openApp: (appId: AppId, options?: OpenOptions) => void
  openDefaults: (workspace: number) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  toggleFloating: (id: string) => void
  moveToWorkspace: (id: string, workspace: number) => void
  setWindowRect: (id: string, rect: Rect) => void
}

let nextId = 0
let nextZ = 0

const windowKey = (app: AppDefinition, options: OpenOptions) =>
  options.instanceKey ? `${app.id}:${options.instanceKey}` : app.singleton ? app.id : undefined

function lastInWorkspace(order: string[], windows: Record<string, AppWindow>, workspace: number) {
  for (let i = order.length - 1; i >= 0; i--) {
    if (windows[order[i]].workspace === workspace) return order[i]
  }
  return undefined
}

export const useWindowStore = create<WindowState>()((set, get) => {
  const insert = (app: AppDefinition, workspace: number, options: OpenOptions) => {
    const win: AppWindow = {
      id: `${app.id}-${++nextId}`,
      appId: app.id,
      title: options.title ?? app.title,
      workspace,
      floating: false,
      rect: null,
      z: ++nextZ,
      key: windowKey(app, options),
      params: options.params ?? {},
    }
    set((s) => ({
      windows: { ...s.windows, [win.id]: win },
      order: [...s.order, win.id],
      focused: { ...s.focused, [workspace]: win.id },
    }))
  }

  return {
    windows: {},
    order: [],
    focused: {},

    openApp: (appId, options = {}) => {
      const app = getApp(appId)
      const key = windowKey(app, options)
      const findExisting = () =>
        key ? Object.values(get().windows).find((w) => w.key === key) : undefined

      const system = useSystemStore.getState()
      const target = findExisting()?.workspace ?? options.workspace ?? system.activeWorkspace
      // Cambiar de workspace puede abrir sus apps por defecto, así que se vuelve a buscar después
      system.setActiveWorkspace(target)

      const existing = findExisting()
      if (existing) get().focusWindow(existing.id)
      else insert(app, target, options)
    },

    openDefaults: (workspace) => {
      const current = Object.values(get().windows)
      if (current.some((w) => w.workspace === workspace)) return
      for (const app of APPS) {
        if (app.defaultWorkspace !== workspace) continue
        // Un singleton ya abierto en otro workspace no se duplica
        if (app.singleton && current.some((w) => w.appId === app.id)) continue
        insert(app, workspace, {})
      }
    },

    closeWindow: (id) =>
      set((s) => {
        const win = s.windows[id]
        if (!win) return s
        const windows = { ...s.windows }
        delete windows[id]
        const order = s.order.filter((other) => other !== id)
        const focused =
          s.focused[win.workspace] === id
            ? { ...s.focused, [win.workspace]: lastInWorkspace(order, windows, win.workspace) }
            : s.focused
        return { windows, order, focused }
      }),

    focusWindow: (id) =>
      set((s) => {
        const win = s.windows[id]
        if (!win || (s.focused[win.workspace] === id && win.z === nextZ)) return s
        return {
          windows: { ...s.windows, [id]: { ...win, z: ++nextZ } },
          focused: { ...s.focused, [win.workspace]: id },
        }
      }),

    toggleFloating: (id) =>
      set((s) => {
        const win = s.windows[id]
        if (!win) return s
        return {
          windows: { ...s.windows, [id]: { ...win, floating: !win.floating, z: ++nextZ } },
          focused: { ...s.focused, [win.workspace]: id },
        }
      }),

    moveToWorkspace: (id, workspace) =>
      set((s) => {
        const win = s.windows[id]
        if (!win || win.workspace === workspace) return s
        const windows = { ...s.windows, [id]: { ...win, workspace } }
        return {
          windows,
          focused: {
            ...s.focused,
            [win.workspace]: lastInWorkspace(
              s.order.filter((other) => other !== id),
              windows,
              win.workspace,
            ),
            [workspace]: id,
          },
        }
      }),

    setWindowRect: (id, rect) =>
      set((s) => (s.windows[id] ? { windows: { ...s.windows, [id]: { ...s.windows[id], rect } } } : s)),
  }
})

export function getFocusedWindowId() {
  const workspace = useSystemStore.getState().activeWorkspace
  return useWindowStore.getState().focused[workspace]
}

// Al entrar a un workspace vacío se abren sus apps por defecto
useSystemStore.subscribe((state, prev) => {
  if (state.activeWorkspace !== prev.activeWorkspace) {
    useWindowStore.getState().openDefaults(state.activeWorkspace)
  }
})
useWindowStore.getState().openDefaults(useSystemStore.getState().activeWorkspace)
