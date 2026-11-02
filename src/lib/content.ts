export const PENDING = '[pendiente]'

export const orPending = (value?: string | null) => (value?.trim() ? value : PENDING)
