import { ExternalLink, Lock } from 'lucide-react'
import { PROJECTS } from '../../data/profile'
import { useWindowParams } from '../../hooks/useWindowParams'
import { CONFIDENTIAL_LABEL, STATUS_STYLE } from '../projects/status'
import { Chip, Pending, ProfileText, Section } from '../shared/ui'
import type { AppProps } from '../types'

export default function ProjectApp({ windowId }: AppProps) {
  const { projectId } = useWindowParams(windowId)
  const project = PROJECTS.find((p) => p.id === projectId)

  if (!project) {
    return <p className="p-4 font-mono text-xs uppercase text-textMuted">Proyecto no encontrado</p>
  }

  return (
    <article className="space-y-5 p-5">
      <header className="space-y-2">
        <h1 className="text-xl font-bold leading-tight text-textBright">{project.title}</h1>
        <div className="flex flex-wrap gap-2">
          <span
            className={`border px-1.5 py-px font-mono text-[10px] uppercase ${STATUS_STYLE[project.status]}`}
          >
            {project.status}
          </span>
          {project.confidential && (
            <span className="flex items-center gap-1 border border-accent/60 px-1.5 py-px font-mono text-[10px] uppercase text-accent">
              <Lock size={10} />
              {CONFIDENTIAL_LABEL}
            </span>
          )}
        </div>
      </header>

      <Section title="Contexto">
        <p className="text-sm">
          <ProfileText value={project.context} />
        </p>
      </Section>

      <Section title="Problema">
        <p className="text-sm leading-relaxed">
          <ProfileText value={project.problem} />
        </p>
      </Section>

      <Section title="Solución">
        <p className="text-sm leading-relaxed">
          <ProfileText value={project.solution} />
        </p>
      </Section>

      <Section title="Retos técnicos">
        {project.challenges.length > 0 ? (
          <ul className="space-y-1 text-sm">
            {project.challenges.map((challenge) => (
              <li key={challenge} className="flex gap-2">
                <span className="font-mono text-accent">▸</span>
                {challenge}
              </li>
            ))}
          </ul>
        ) : (
          <Pending />
        )}
      </Section>

      <Section title="Stack">
        {project.stack.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        ) : (
          <Pending />
        )}
      </Section>

      <Section title="Enlaces">
        {project.links.length > 0 ? (
          <ul className="space-y-1">
            {project.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-textBright underline decoration-accent underline-offset-4 hover:text-accent"
                >
                  {link.label}
                  <ExternalLink size={12} />
                </a>
              </li>
            ))}
          </ul>
        ) : project.confidential ? (
          <span className="font-mono text-xs text-textMuted">{CONFIDENTIAL_LABEL}</span>
        ) : (
          <Pending />
        )}
      </Section>
    </article>
  )
}
