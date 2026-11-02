---
name: react-optimizer
description: Usar al depurar errores, revisar código de React, optimizar re-renders, o trabajar con el estado global de ventanas en Zustand y react-rnd.
---

# Reglas de Análisis

- Evitar prop-drilling: usar selectores granulares en Zustand (`useStore(state => state.activeWindow)`) para evitar re-renders masivos del escritorio.
- Al usar `react-rnd`, asegurar que las coordenadas (x, y) y dimensiones (width, height) estén sincronizadas correctamente con el estado global cuando se termine de arrastrar (onDragStop).
- Mantener la separación de responsabilidades: los componentes de UI no deben contener lógica compleja de físicas, delegar eso a hooks personalizados.
- Todo estado del sistema (ventanas, workspace, launcher, audio) vive en Zustand (`src/store/`), no en useState de App.
- Objetos no serializables (HTMLAudioElement, instancias de xterm) se guardan fuera del estado reactivo (módulo singleton o useRef); en Zustand solo van sus flags (isPlaying, volume).
- Listeners globales (keydown, resize) se registran una sola vez en un hook y se limpian en el return del useEffect.
