export type Modifier = 'ALT' | 'CTRL' | 'SHIFT' | 'SUPER'

export const DISPATCHERS = [
  'togglelauncher',
  'togglehelp',
  'togglemusic',
  'workspace',
  'exec',
  'killactive',
  'togglefloating',
  'toggledock',
] as const

export type Dispatcher = (typeof DISPATCHERS)[number]

export interface Keybind {
  /** Combinación normalizada, p. ej. "ALT+SPACE" */
  id: string
  /** Sección declarada con `$category = …` */
  category: string
  mods: Modifier[]
  /** Tecla tal como aparece en la config (SPACE, Q, question…) */
  key: string
  /** Coincidencia por tecla física (KeyboardEvent.code) */
  code?: string
  /** Coincidencia por carácter (KeyboardEvent.key), para símbolos cuya tecla física cambia según el layout */
  char?: string
  description: string
  dispatcher: Dispatcher
  arg?: string
}

const MODIFIERS: Record<string, Modifier> = {
  ALT: 'ALT',
  CTRL: 'CTRL',
  CONTROL: 'CTRL',
  SHIFT: 'SHIFT',
  SUPER: 'SUPER',
  WIN: 'SUPER',
  META: 'SUPER',
}

const NAMED_CODES: Record<string, string> = {
  SPACE: 'Space',
  RETURN: 'Enter',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  BACKSPACE: 'Backspace',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
}

// Keysyms de xkb: "?" está en Shift+/ en US pero en Shift+' en ES, así que se comparan por carácter
const KEYSYM_CHARS: Record<string, string> = {
  question: '?',
  slash: '/',
  plus: '+',
  minus: '-',
}

function resolveKey(key: string): Pick<Keybind, 'code' | 'char'> | null {
  const upper = key.toUpperCase()
  if (/^[A-Z]$/.test(upper)) return { code: `Key${upper}` }
  if (/^[0-9]$/.test(key)) return { code: `Digit${key}` }
  if (NAMED_CODES[upper]) return { code: NAMED_CODES[upper] }
  const char = KEYSYM_CHARS[key.toLowerCase()]
  return char ? { char } : null
}

function isDispatcher(value: string): value is Dispatcher {
  return (DISPATCHERS as readonly string[]).includes(value)
}

/**
 * Parsea un subconjunto de hyprland.conf:
 *   $var = valor
 *   $category = Nombre   (agrupa los binds siguientes)
 *   bind  = MODS, TECLA, dispatcher[, argumento]
 *   bindd = MODS, TECLA, descripción, dispatcher[, argumento]
 */
export function parseKeybinds(conf: string): Keybind[] {
  const vars = new Map<string, string>()
  const binds: Keybind[] = []

  conf.split('\n').forEach((raw, index) => {
    const line = raw.replace(/#.*$/, '').trim()
    if (!line) return

    const variable = /^(\$\w+)\s*=\s*(.*)$/.exec(line)
    if (variable) {
      vars.set(variable[1], variable[2].trim())
      return
    }

    const result = parseBind(line, vars, vars.get('$category') ?? 'General')
    if (typeof result === 'string') console.warn(`[keybinds] línea ${index + 1}: ${result} → "${line}"`)
    else binds.push(result)
  })

  return binds
}

function parseBind(line: string, vars: Map<string, string>, category: string): Keybind | string {
  const bind = /^bind([a-z]*)\s*=\s*(.*)$/.exec(line)
  if (!bind) return 'no es una directiva bind'

  const fields = bind[2]
    .replace(/\$\w+/g, (name) => vars.get(name) ?? name)
    .split(',')
    .map((field) => field.trim())
  const [modsField = '', key = '', ...rest] = fields
  const description = bind[1].includes('d') ? rest.shift() : undefined
  const [dispatcher = '', ...args] = rest

  const mods: Modifier[] = []
  for (const token of modsField.split(/[\s+_]+/).filter(Boolean)) {
    const mod = MODIFIERS[token.toUpperCase()]
    if (!mod) return `modificador desconocido "${token}"`
    mods.push(mod)
  }

  const match = resolveKey(key)
  if (!match) return `tecla desconocida "${key}"`
  if (!isDispatcher(dispatcher)) return `dispatcher desconocido "${dispatcher}"`

  const arg = args.join(', ') || undefined
  const combo = formatCombo(mods, key, match.char)
  return {
    id: combo.join('+'),
    category,
    mods,
    key,
    ...match,
    dispatcher,
    arg,
    description: description || [dispatcher, arg].filter(Boolean).join(' '),
  }
}

function formatCombo(mods: Modifier[], key: string, char?: string) {
  return [...mods, char ?? key.toUpperCase()]
}

export function matchesKeybind(e: KeyboardEvent, bind: Keybind): boolean {
  const has = (mod: Modifier) => bind.mods.includes(mod)
  // Exigir CTRL exacto evita que AltGr (Ctrl+Alt en Windows) dispare binds de ALT
  if (e.altKey !== has('ALT') || e.ctrlKey !== has('CTRL') || e.metaKey !== has('SUPER')) return false
  // En binds por carácter SHIFT suele ser necesario para producir el símbolo, así que se ignora
  if (bind.char) return e.key === bind.char
  return e.shiftKey === has('SHIFT') && e.code === bind.code
}

export function formatKeybind(bind: Keybind): string[] {
  return formatCombo(bind.mods, bind.key, bind.char)
}
