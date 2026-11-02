export interface Project {
  id: string;
  title: string;
  status: "en producción" | "en desarrollo" | "prototipo";
  context: string;
  problem: string;
  solution: string;
  challenges: string[];
  stack: string[];
  links: { label: string; url: string }[];
  confidential: boolean;
}

export interface Experience {
  org: string;
  role: string;
  area: string;
  period: string;
  highlights: string[];
}

export const PROFILE = {
  name: "William Andrés Chimborazo Guamán",
  shortName: "Will",
  headline: "Estudiante de Ingeniería de Software", // TODO: ajustar tu titular (ej. enfoque backend)
  location: "Ambato, Ecuador",
  education: {
    career: "Software",
    university: "Universidad Técnica de Ambato (UTA)",
    faculty: "FISEI",
    period: "", // TODO
  },
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "B1" },
  ],
  stack: {
    backend: ["Java", "Spring Boot", "JPA / Hibernate"],
    database: ["Oracle", "PL/SQL"],
    frontend: ["React", "TypeScript", "Tailwind CSS", "Thymeleaf"],
    tools: ["JasperReports", "DBeaver", "Git"],
  },
  system: { os: "CachyOS", wm: "Hyprland" },
  contact: {
    email: "", // TODO
    github: "", // TODO
    linkedin: "", // TODO
  },
  cv: "/cv/", // TODO: nombre del PDF
};

export const EXPERIENCE: Experience[] = [
  {
    org: "Empresa Eléctrica Ambato Regional Centro Norte (EEASA)",
    role: "Pasante",
    area: "Departamento Financiero · Tesorería",
    period: "", // TODO
    highlights: [
      "Desarrollo del sistema web interno de gestión de garantías para Tesorería",
      "Prototipo del módulo de gestión de plantillas y normativas",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "garantias-eeasa",
    title: "Sistema de Gestión de Garantías",
    status: "en desarrollo", // TODO: confirmar estado
    context: "EEASA · Tesorería · Base de mi tesis de grado",
    problem:
      "El control y seguimiento de garantías se llevaba fuera de un sistema integrado.", // TODO: validar redacción
    solution:
      "Módulo web que gestiona el ciclo de vida completo de cada garantía con estados ACTIVA, PASIVA, VENCIDA, DEVUELTA y ELIMINADA.",
    challenges: [
      "Rediseño de la clave de la cadena de renovaciones usando solo campos inmutables",
      "Eliminación de consultas N+1 y de la carga innecesaria de BLOBs",
      "Endpoint de renovación con separación clara de DTOs",
    ],
    stack: [
      "Java 8",
      "Spring Boot 2",
      "Oracle",
      "JPA / Hibernate",
      "Thymeleaf",
      "JasperReports",
      "AdminLTE",
    ],
    links: [],
    confidential: true,
  },
  {
    id: "plantillas-normativas",
    title: "Módulo de Plantillas y Normativas",
    status: "prototipo",
    context: "EEASA",
    problem: "", // TODO
    solution: "", // TODO
    challenges: [], // TODO
    stack: [], // TODO
    links: [],
    confidential: true,
  },
  {
    id: "portafolio",
    title: "Este portafolio",
    status: "en desarrollo",
    context: "Proyecto personal",
    problem:
      "Mostrar mi trabajo de una forma que refleje cómo trabajo a diario en Linux.",
    solution:
      "Escritorio web inspirado en Hyprland con gestor de ventanas, atajos tipo hyprland.conf y reproductor integrado.",
    challenges: [
      "Parser de atajos con sintaxis hyprland.conf",
      "Gestor de ventanas tiling/flotante con estado en Zustand",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
    ],
    links: [], // TODO: repo y demo
    confidential: false,
  },
];
