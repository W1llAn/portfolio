import { useEffect, useState } from 'react'

// Componente aislado: el tick de cada segundo solo re-renderiza el reloj, no la barra entera
export function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short' })

  return (
    <div className="flex items-baseline gap-2">
      <time dateTime={now.toISOString()} className="text-textBright">
        {time}
      </time>
      <span className="hidden text-textMuted sm:inline">{date}</span>
    </div>
  )
}
