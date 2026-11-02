import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import {
  BookOpen,
  Briefcase,
  Cpu,
  FileText,
  Folder,
  FolderOpen,
  ImageIcon,
  Mail,
  Terminal,
  type LucideIcon,
} from 'lucide-react'
import type { AppProps } from './types'

export type AppId =
  | 'fetch'
  | 'readme'
  | 'projects'
  | 'project'
  | 'experience'
  | 'cv'
  | 'contact'
  | 'terminal'
  | 'wallpapers'

export interface AppDefinition {
  id: AppId
  title: string
  description: string
  icon: LucideIcon
  component: LazyExoticComponent<ComponentType<AppProps>>
  /** Se abre sola al entrar a este workspace si está vacío */
  defaultWorkspace?: number
  singleton: boolean
  /** No aparece en el launcher: se abre desde otra app */
  hidden?: boolean
}

// Fuente única para launcher, atajos y escritorio. El orden define el orden de apertura (master primero).
export const APPS: AppDefinition[] = [
  {
    id: 'fetch',
    title: 'fetch',
    description: 'Resumen del sistema',
    icon: Cpu,
    component: lazy(() => import('./fetch/FetchApp')),
    defaultWorkspace: 1,
    singleton: true,
  },
  {
    id: 'readme',
    title: 'readme',
    description: 'Bienvenida y navegación',
    icon: BookOpen,
    component: lazy(() => import('./readme/ReadmeApp')),
    defaultWorkspace: 1,
    singleton: true,
  },
  {
    id: 'projects',
    title: 'Proyectos',
    description: 'Casos de estudio',
    icon: FolderOpen,
    component: lazy(() => import('./projects/ProjectsApp')),
    defaultWorkspace: 2,
    singleton: true,
  },
  {
    id: 'project',
    title: 'Proyecto',
    description: 'Caso de estudio',
    icon: Folder,
    component: lazy(() => import('./project/ProjectApp')),
    singleton: false,
    hidden: true,
  },
  {
    id: 'experience',
    title: 'Experiencia',
    description: 'Trayectoria',
    icon: Briefcase,
    component: lazy(() => import('./experience/ExperienceApp')),
    defaultWorkspace: 3,
    singleton: true,
  },
  {
    id: 'cv',
    title: 'CV',
    description: 'Currículum en PDF',
    icon: FileText,
    component: lazy(() => import('./cv/CvApp')),
    defaultWorkspace: 4,
    singleton: true,
  },
  {
    id: 'contact',
    title: 'Contacto',
    description: 'Email y redes',
    icon: Mail,
    component: lazy(() => import('./contact/ContactApp')),
    defaultWorkspace: 5,
    singleton: true,
  },
  {
    id: 'terminal',
    title: 'Terminal',
    description: 'Shell interactiva',
    icon: Terminal,
    component: lazy(() => import('./terminal/TerminalApp')),
    singleton: true,
  },
  {
    id: 'wallpapers',
    title: 'Fondos',
    description: 'Cambiar fondo de pantalla',
    icon: ImageIcon,
    component: lazy(() => import('./wallpapers/WallpapersApp')),
    singleton: true,
  },
]

const APPS_BY_ID = new Map(APPS.map((app) => [app.id, app]))

export const getApp = (id: AppId) => APPS_BY_ID.get(id) as AppDefinition

export const isAppId = (value: string): value is AppId => APPS_BY_ID.has(value as AppId)
