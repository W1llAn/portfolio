import { KEYBINDS, KEYBIND_CATEGORIES } from '../config/keybinds'
import { formatKeybind, type Keybind } from '../lib/keybinds'

export function KeyCombo({ bind }: { bind: Keybind }) {
  return (
    <span className="flex shrink-0 gap-1">
      {formatKeybind(bind).map((key) => (
        <kbd
          key={key}
          className="border border-textMuted/30 bg-baseDark/60 px-1.5 py-0.5 font-mono text-[10px] leading-none text-textBright"
        >
          {key}
        </kbd>
      ))}
    </span>
  )
}

interface KeybindGroupsProps {
  /** id del atajo recién disparado, se resalta brevemente */
  flashId?: string | null
}

export function KeybindGroups({ flashId }: KeybindGroupsProps) {
  return (
    <div className="space-y-4">
      {KEYBIND_CATEGORIES.map((category) => (
        <section key={category}>
          <h3 className="px-3 font-mono text-[10px] uppercase tracking-widest text-accent">
            {category}
          </h3>
          <ul className="mt-1">
            {KEYBINDS.filter((bind) => bind.category === category).map((bind) => (
              <li
                key={bind.id}
                className={`flex items-center justify-between gap-3 px-3 py-1.5 transition-colors duration-300 ${
                  bind.id === flashId ? 'bg-accent/30 text-textBright' : ''
                }`}
              >
                <span className="text-xs">{bind.description}</span>
                <KeyCombo bind={bind} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
