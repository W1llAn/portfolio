import { ArrowRight } from 'lucide-react'
import { KeyCombo } from '../../components/KeybindGroups'
import { KEYBINDS } from '../../config/keybinds'
import { PROFILE } from '../../data/profile'
import { useSystemStore, WORKSPACES } from '../../store/useSystemStore'
import { useWindowStore } from '../../store/useWindowStore'
import { APPS, getApp } from '../registry'
import { Section } from '../shared/ui'

const launcherBinds = KEYBINDS.filter((b) => b.dispatcher === 'togglelauncher')
const helpBind = KEYBINDS.find((b) => b.dispatcher === 'togglehelp')

const BUTTON =
  'flex items-center gap-2 border border-accent/60 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-textBright hover:bg-accent/20 hover:shadow-caelestia-glow'

export default function ReadmeApp() {
  const openApp = useWindowStore((s) => s.openApp)
  const setActiveWorkspace = useSystemStore((s) => s.setActiveWorkspace)

  const goTo = (appId: 'projects' | 'contact') =>
    openApp(appId, { workspace: getApp(appId).defaultWorkspace })

  return (
    <div className="space-y-5 p-5">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-widest text-textMuted"># readme.md</p>
        <h1 className="mt-1 text-xl font-bold text-textBright">{PROFILE.name}</h1>
        <p className="text-sm">{PROFILE.headline}</p>
      </header>

      <Section title="Workspaces">
        <ul className="space-y-1">
          {WORKSPACES.map((ws) => (
            <li key={ws}>
              <button
                type="button"
                onClick={() => setActiveWorkspace(ws)}
                className="flex w-full items-center gap-3 px-1 py-0.5 text-left text-sm hover:bg-accent/10"
              >
                <span className="w-6 font-mono text-accent">{ws}</span>
                <span>
                  {APPS.filter((a) => a.defaultWorkspace === ws)
                    .map((a) => a.title)
                    .join(', ')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Atajos">
        <ul className="space-y-1.5 text-sm">
          <li className="flex flex-wrap items-center gap-2">
            {launcherBinds.map((bind) => (
              <KeyCombo key={bind.id} bind={bind} />
            ))}
            <span>lanzador</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="font-mono text-xs text-textBright">ALT + 1…5</span>
            <span>cambiar de workspace</span>
          </li>
          {helpBind && (
            <li className="flex items-center gap-2">
              <KeyCombo bind={helpBind} />
              <span>todos los atajos</span>
            </li>
          )}
        </ul>
      </Section>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => goTo('projects')} className={BUTTON}>
          Proyectos <ArrowRight size={13} />
        </button>
        <button type="button" onClick={() => goTo('contact')} className={BUTTON}>
          Contacto <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}
