import { PROFILE } from '../../data/profile'
import { orPending } from '../../lib/content'

// Logo de CachyOS en ASCII, aproximado al de fastfetch
const LOGO = String.raw`           .-------------------------:
          .+=========================.
         :++===++==================-       :++-
        :*++====+++++=============-        .==:
       -*+++=====+***++==========:
      =*++++========------------:
     =*+++++=====-                     ...
   .+*+++++=-===:                    .=+++=:
  :++++=====-==:                     -*****+
 :++========-=.                      .=+**+.
.+==========-.                          .
 :+++++++====-                                .--==-.
  :++==========.                             :+++++++:
   .-===========.                            =*****+*+
    .-===========:                           .=+*****+:
      -=======++++:::::::::::::::::::::::::-:  .---:
       :======++++====+++******************=.
        :=====+++==========++++++++++++++*-
         .====++==============++++++++++*-
          .===+==================+++++++:
           .-=======================+++:
             ..........................`

const PALETTE = [
  'bg-baseDark',
  'bg-base',
  'bg-accentDark',
  'bg-accent',
  'bg-terminalBrass',
  'bg-terminalMoss',
  'bg-textMuted',
  'bg-textMain',
  'bg-textBright',
]

export default function FetchApp() {
  const user = PROFILE.shortName.toLowerCase()
  const host = PROFILE.system.os.toLowerCase()
  const { education, stack } = PROFILE

  const rows: [label: string, value: string][] = [
    ['OS', PROFILE.system.os],
    ['WM', PROFILE.system.wm],
    ['Ubicación', PROFILE.location],
    [
      'Educación',
      [education.career, `${education.university} · ${education.faculty}`, orPending(education.period)]
        .filter(Boolean)
        .join(' · '),
    ],
    ['Rol', PROFILE.headline],
    ['Stack', Object.values(stack).flat().join(', ')],
    ['Idiomas', PROFILE.languages.map((l) => `${l.name} (${l.level})`).join(', ')],
  ]

  return (
    <div className="flex flex-wrap items-start gap-x-8 gap-y-4 p-4 font-mono text-xs">
      <pre aria-hidden="true" className="text-[8px] leading-[1.15] text-accent sm:text-[10px]">
        {LOGO}
      </pre>

      <div className="min-w-[220px] flex-1">
        <p className="text-sm">
          <span className="text-accent">{user}</span>
          <span className="text-textMuted">@</span>
          <span className="text-accent">{host}</span>
        </p>
        <p aria-hidden="true" className="text-textMuted">
          {'-'.repeat(user.length + host.length + 1)}
        </p>

        <dl className="mt-1 space-y-0.5">
          {rows.map(([label, value]) => (
            <div key={label} className="flex gap-2">
              <dt className="shrink-0 text-accent">{label}:</dt>
              <dd className={orPending(value) === value ? 'text-textMain' : 'text-textMuted'}>
                {orPending(value)}
              </dd>
            </div>
          ))}
        </dl>

        <div aria-hidden="true" className="mt-3 flex">
          {PALETTE.map((color) => (
            <span key={color} className={`h-4 w-6 ${color}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
