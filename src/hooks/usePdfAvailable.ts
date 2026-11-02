import { useEffect, useState } from 'react'

/**
 * true/false según exista un PDF en `url`; null mientras se comprueba.
 * Se valida el content-type porque el dev server responde index.html (200) a rutas inexistentes.
 */
export function usePdfAvailable(url: string | null) {
  const [result, setResult] = useState<{ url: string; available: boolean } | null>(null)

  useEffect(() => {
    if (!url) return
    let cancelled = false
    fetch(url, { method: 'HEAD' })
      .then((res) => res.ok && (res.headers.get('content-type') ?? '').includes('pdf'))
      .catch(() => false)
      .then((available) => {
        if (!cancelled) setResult({ url, available })
      })
    return () => {
      cancelled = true
    }
  }, [url])

  if (!url) return false
  return result?.url === url ? result.available : null
}
