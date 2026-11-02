export interface Track {
  title: string
  artist: string
  /** Ruta dentro de public/audio/ */
  src: string
}

export const TRACKS: Track[] = [
  { title: 'Lucía', artist: 'Milo J, Soledad', src: '/audio/Lucia - Milo j, Soledad.flac' },
  { title: 'Niño', artist: 'Milo J', src: '/audio/Niño - Milo J.flac' },
]
