import { Folder, Lock } from 'lucide-react'
import { PROJECTS } from '../../data/profile'
import { useWindowStore } from '../../store/useWindowStore'
import { CONFIDENTIAL_LABEL, STATUS_STYLE } from './status'

export default function ProjectsApp() {
  const openApp = useWindowStore((s) => s.openApp)

  return (
    <div className="p-4">
      <p className="mb-3 font-mono text-[11px] text-textMuted">~/proyectos · {PROJECTS.length} elementos</p>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
        {PROJECTS.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              onClick={() =>
                openApp('project', {
                  instanceKey: project.id,
                  title: project.title,
                  params: { projectId: project.id },
                })
              }
              className="group flex h-full w-full flex-col items-start gap-2 border border-textMuted/30 bg-baseDark/40 p-3 text-left hover:border-accent hover:shadow-caelestia-glow"
            >
              <span className="relative">
                <Folder size={34} strokeWidth={1.5} className="text-terminalBrass group-hover:text-accent" />
                {project.confidential && (
                  <Lock
                    size={12}
                    aria-label={CONFIDENTIAL_LABEL}
                    className="absolute -bottom-0.5 -right-1 text-textBright"
                  />
                )}
              </span>
              <span className="text-sm leading-tight text-textBright">{project.title}</span>
              <span
                className={`border px-1.5 py-px font-mono text-[10px] uppercase ${STATUS_STYLE[project.status]}`}
              >
                {project.status}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
