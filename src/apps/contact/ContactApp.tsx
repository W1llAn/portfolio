import { Copy, ExternalLink } from 'lucide-react'
import { PROFILE } from '../../data/profile'
import { useNotifyStore } from '../../store/useNotifyStore'
import { Pending, Section } from '../shared/ui'

const { email, github, linkedin } = PROFILE.contact

const LINK =
  'inline-flex items-center gap-1.5 break-all text-sm text-textBright underline decoration-accent underline-offset-4 hover:text-accent'

const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')

export default function ContactApp() {
  const notify = useNotifyStore((s) => s.notify)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      notify('Copiado')
    } catch {
      notify('No se pudo copiar')
    }
  }

  return (
    <div className="space-y-5 p-5">
      <Section title="Email">
        {email ? (
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${email}`} className={LINK}>
              {email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="flex items-center gap-1.5 border border-accent/60 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-textBright hover:bg-accent/20 hover:shadow-caelestia-glow"
            >
              <Copy size={12} /> Copiar
            </button>
          </div>
        ) : (
          <Pending />
        )}
      </Section>

      <Section title="GitHub">
        {github ? (
          <a href={github} target="_blank" rel="noreferrer" className={LINK}>
            {displayUrl(github)} <ExternalLink size={12} />
          </a>
        ) : (
          <Pending />
        )}
      </Section>

      <Section title="LinkedIn">
        {linkedin ? (
          <a href={linkedin} target="_blank" rel="noreferrer" className={LINK}>
            {displayUrl(linkedin)} <ExternalLink size={12} />
          </a>
        ) : (
          <Pending />
        )}
      </Section>
    </div>
  )
}
