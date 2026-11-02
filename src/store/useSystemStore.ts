import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_WALLPAPER } from '../config/wallpapers'

export const WORKSPACES = [1, 2, 3, 4, 5]

interface SystemState {
  activeWorkspace: number
  /** Sentido del último cambio de workspace, para el slide */
  workspaceDirection: 1 | -1
  launcherOpen: boolean
  keybindsHelpOpen: boolean
  dockCollapsed: boolean
  wallpaper: string

  setActiveWorkspace: (id: number) => void
  toggleLauncher: () => void
  closeLauncher: () => void
  toggleKeybindsHelp: () => void
  closeKeybindsHelp: () => void
  toggleDock: () => void
  setWallpaper: (id: string) => void
}

export const useSystemStore = create<SystemState>()(
  persist(
    (set) => ({
      activeWorkspace: 1,
      workspaceDirection: 1,
      launcherOpen: false,
      keybindsHelpOpen: false,
      dockCollapsed: false,
      wallpaper: DEFAULT_WALLPAPER,

      setActiveWorkspace: (id) =>
        set((s) =>
          WORKSPACES.includes(id) && id !== s.activeWorkspace
            ? { activeWorkspace: id, workspaceDirection: id > s.activeWorkspace ? 1 : -1 }
            : s,
        ),
      // Los overlays son excluyentes: abrir uno cierra el otro
      toggleLauncher: () => set((s) => ({ launcherOpen: !s.launcherOpen, keybindsHelpOpen: false })),
      closeLauncher: () => set({ launcherOpen: false }),
      toggleKeybindsHelp: () =>
        set((s) => ({ keybindsHelpOpen: !s.keybindsHelpOpen, launcherOpen: false })),
      closeKeybindsHelp: () => set({ keybindsHelpOpen: false }),
      toggleDock: () => set((s) => ({ dockCollapsed: !s.dockCollapsed })),
      setWallpaper: (wallpaper) => set({ wallpaper }),
    }),
    {
      name: 'portfolio:system',
      partialize: ({ dockCollapsed }) => ({ dockCollapsed }),
    },
  ),
)
