import { useEffect } from 'react'
import { isAppId } from '../apps/registry'
import { KEYBINDS } from '../config/keybinds'
import { emitKeybind } from '../lib/keybindEvents'
import { matchesKeybind, type Keybind } from '../lib/keybinds'
import { useMediaStore } from '../store/useMediaStore'
import { useSystemStore } from '../store/useSystemStore'
import { getFocusedWindowId, useWindowStore } from '../store/useWindowStore'

// .xterm cubre la terminal; su textarea auxiliar ya lo cubriría "textarea", pero el contenedor no
const IGNORED_TARGETS = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), .xterm'

function dispatch(bind: Keybind) {
  const system = useSystemStore.getState()
  const windows = useWindowStore.getState()

  switch (bind.dispatcher) {
    case 'togglelauncher':
      system.toggleLauncher()
      break
    case 'togglehelp':
      system.toggleKeybindsHelp()
      break
    case 'toggledock':
      system.toggleDock()
      break
    case 'togglemusic':
      useMediaStore.getState().togglePlay()
      break
    case 'workspace':
      system.setActiveWorkspace(Number(bind.arg))
      break
    case 'exec':
      if (bind.arg && isAppId(bind.arg)) windows.openApp(bind.arg)
      break
    case 'killactive': {
      const id = getFocusedWindowId()
      if (id) windows.closeWindow(id)
      break
    }
    case 'togglefloating': {
      const id = getFocusedWindowId()
      if (id) windows.toggleFloating(id)
      break
    }
    default: {
      const exhaustive: never = bind.dispatcher
      return exhaustive
    }
  }
}

/** Único listener global de teclado. Montar una sola vez en App. */
export function useKeybinds() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.isComposing) return
      if (e.target instanceof Element && e.target.closest(IGNORED_TARGETS)) return

      const bind = KEYBINDS.find((b) => matchesKeybind(e, b))
      if (!bind) return

      e.preventDefault()
      dispatch(bind)
      emitKeybind(bind)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
