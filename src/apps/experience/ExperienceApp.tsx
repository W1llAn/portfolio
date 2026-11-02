import { EXPERIENCE } from '../../data/profile'
import { ProfileText } from '../shared/ui'

export default function ExperienceApp() {
  return (
    <div className="p-5">
      <ol className="border-l border-accentDark/70 pl-6">
        {EXPERIENCE.map((item) => (
          <li key={`${item.org}-${item.role}`} className="relative pb-6 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[30.5px] top-1 size-3 border border-accent bg-baseDark"
            />
            <p className="font-mono text-[11px] uppercase tracking-wider">
              <ProfileText value={item.period} className="text-accent" />
            </p>
            <h3 className="mt-1 text-base font-bold text-textBright">{item.role}</h3>
            <p className="text-sm">{item.org}</p>
            <p className="font-mono text-xs text-textMuted">{item.area}</p>
            <ul className="mt-2 space-y-1 text-sm">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="font-mono text-accent">▸</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
