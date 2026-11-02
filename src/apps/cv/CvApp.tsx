import { Download, FileText } from 'lucide-react'
import { PROFILE } from '../../data/profile'
import { usePdfAvailable } from '../../hooks/usePdfAvailable'
import { PENDING } from '../../lib/content'

const cvUrl = PROFILE.cv.toLowerCase().endsWith('.pdf') ? PROFILE.cv : null

const BUTTON =
  'flex items-center gap-2 border px-3 py-1 font-mono text-xs uppercase tracking-wider'

export default function CvApp() {
  const available = usePdfAvailable(cvUrl)

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 border-b border-textMuted/20 px-3 py-2">
        <span className="truncate font-mono text-[11px] text-textMuted">{cvUrl ?? PENDING}</span>
        {available && cvUrl ? (
          <a
            href={cvUrl}
            download
            className={`${BUTTON} ml-auto border-accent/60 text-textBright hover:bg-accent/20 hover:shadow-caelestia-glow`}
          >
            <Download size={13} /> Descargar
          </a>
        ) : (
          <button
            type="button"
            disabled
            className={`${BUTTON} ml-auto cursor-not-allowed border-textMuted/30 text-textMuted`}
          >
            <Download size={13} /> Descargar
          </button>
        )}
      </div>

      {available && cvUrl ? (
        <iframe src={cvUrl} title="Currículum" className="min-h-0 flex-1 bg-textBright" />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <FileText size={40} strokeWidth={1.25} className="text-textMuted" />
          <p className="font-mono text-sm text-textMuted">
            {available === null ? 'Comprobando…' : PENDING}
          </p>
        </div>
      )}
    </div>
  )
}
