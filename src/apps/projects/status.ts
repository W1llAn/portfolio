import type { Project } from '../../data/profile'

export const STATUS_STYLE: Record<Project['status'], string> = {
  'en producción': 'border-terminalMoss/60 text-terminalMoss',
  'en desarrollo': 'border-terminalBrass/60 text-terminalBrass',
  prototipo: 'border-textMuted/60 text-textMuted',
}

export const CONFIDENTIAL_LABEL = 'Sistema interno · código no público'
