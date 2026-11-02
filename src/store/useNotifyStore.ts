import { create } from 'zustand'

const TIMEOUT_MS = 3000
const MAX_VISIBLE = 4

export interface Notification {
  id: number
  message: string
}

interface NotifyState {
  items: Notification[]
  notify: (message: string) => void
  dismiss: (id: number) => void
}

let nextId = 0

export const useNotifyStore = create<NotifyState>()((set, get) => ({
  items: [],
  notify: (message) => {
    const id = ++nextId
    set((s) => ({ items: [...s.items, { id, message }].slice(-MAX_VISIBLE) }))
    setTimeout(() => get().dismiss(id), TIMEOUT_MS)
  },
  dismiss: (id) => set((s) => ({ items: s.items.filter((n) => n.id !== id) })),
}))
