---
name: hyprland-ui
description: Usar al crear, diseñar o modificar componentes visuales, barra, drawers, ventanas, launcher, notificaciones, animaciones con framer-motion, wallpapers, iconos o estilos Tailwind del portafolio.
---

# Estética: shell Caelestia + brutalismo

- NO existe Waybar horizontal. Layout Caelestia: barra vertical delgada a la izquierda, borde que enmarca la pantalla y paneles "drawer" que emergen desde los bordes con morph (launcher abajo, dashboard arriba, sesión/media a la derecha).
- Usar SOLO los tokens de tailwind.config.js: base, baseDark, textMain, textMuted, textBright, accent (#a10a28), accentDark (#690920), terminalBrass, terminalMoss. Prohibido hardcodear hex.
- Cristal: `bg-base/80 backdrop-blur-xl`. Borde activo: clase `.border-caelestia` (degradado accent→accentDark). Inactivo: `border-textMuted/30`.
- Hover en acciones importantes: `hover:shadow-caelestia-glow`.
- Brutalismo: esquinas rectas o radio mínimo, tipografía mono en mayúsculas para etiquetas.
- Animaciones: `type: "spring", stiffness: 300, damping: 30`. Respetar `prefers-reduced-motion`.
- Tipografía: JetBrainsMono Nerd Font (self-hosted en public/fonts) para mono e iconos; Inter para texto.

# Assets

- Wallpapers en public/wallpapers/ (WebP), referenciados como `/wallpapers/x.webp`.
- Iconos de UI: lucide-react. Iconos propios: src/assets/icons/.

# Verificación

- Antes de terminar, revisar que funcione en 390px de ancho y que todo tenga foco visible con teclado.
