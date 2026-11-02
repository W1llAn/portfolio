import type { ReactNode } from 'react'
import { orPending, PENDING } from '../../lib/content'

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="font-mono text-[11px] uppercase tracking-widest text-accent">{title}</h3>
      {children}
    </section>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="border border-textMuted/30 bg-baseDark/60 px-2 py-0.5 font-mono text-xs text-textBright">
      {children}
    </span>
  )
}

/** Texto de profile.ts; si está vacío muestra [pendiente] atenuado */
export function ProfileText({ value, className = '' }: { value?: string | null; className?: string }) {
  const text = orPending(value)
  return text === PENDING ? (
    <span className="font-mono text-xs text-textMuted">{PENDING}</span>
  ) : (
    <span className={className}>{text}</span>
  )
}

export function Pending() {
  return <span className="font-mono text-xs text-textMuted">{PENDING}</span>
}
