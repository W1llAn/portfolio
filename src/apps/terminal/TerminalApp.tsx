import { Terminal } from 'lucide-react'

export default function TerminalApp() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-baseDark/60 p-6 font-mono">
      <Terminal size={28} className="text-accent" />
      <p className="text-sm uppercase tracking-wider text-textBright">Terminal — próximamente</p>
    </div>
  )
}
