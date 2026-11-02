---
name: desktop-apps
description: Usar al crear o modificar ventanas, apps del escritorio, el gestor de ventanas (tiling/flotante), workspaces, el registro de apps o el panel de atajos.
---

# Contrato de apps

- Toda app se registra en src/apps/registry.ts con: id, title, icon (lucide), component (lazy), defaultWorkspace, singleton (bool).
- Los componentes de app viven en src/apps/<id>/ y NO conocen el gestor de ventanas: reciben solo `windowId`.
- Abrir/cerrar/enfocar ventanas SOLO vía acciones de useWindowStore (openApp, closeWindow, focusWindow, toggleFloating, moveToWorkspace).
- El launcher, los atajos y los iconos leen el mismo registry; nunca listas duplicadas.

# Gestor de ventanas

- Tiling por defecto estilo dwindle: 1 ventana = área completa; 2 = mitad/mitad vertical; 3+ = master a la izquierda (55%) y stack a la derecha.
- Gaps: 5px entre ventanas, 10px al borde. El área de tiling excluye el panel de atajos izquierdo cuando está visible.
- Flotante (ALT+F): react-rnd, posición y tamaño se guardan en el store solo en onDragStop/onResizeStop.
- Foco: ventana activa con .border-caelestia; inactivas border-textMuted/30. Clic enfoca.
- Cambio de workspace: slide horizontal con SPRING de src/lib/motion.ts.
- Barra de título mínima: título mono en mayúsculas + botón cerrar. Sin minimizar/maximizar.

# Verificación

- build + lint sin errores; probar abrir 1, 2, 3 y 4 ventanas en un workspace y alternar flotante.
