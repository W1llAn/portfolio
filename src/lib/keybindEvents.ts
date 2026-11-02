import type { Keybind } from './keybinds'

type Listener = (bind: Keybind) => void

const listeners = new Set<Listener>()

export function emitKeybind(bind: Keybind) {
  listeners.forEach((listener) => listener(bind))
}

export function onKeybind(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
