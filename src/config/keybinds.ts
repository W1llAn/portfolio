import { parseKeybinds } from '../lib/keybinds'

// Sintaxis tipo hyprland.conf: bindd = MODS, TECLA, descripción, dispatcher[, argumento]
// $category agrupa los binds siguientes en el panel de atajos
export const KEYBINDS_CONF = `
$mainMod = ALT

$category = Sistema
bindd = $mainMod, SPACE, Abrir o cerrar el lanzador, togglelauncher
bindd = $mainMod, D, Lanzador (alternativa en Windows), togglelauncher
bindd = $mainMod, H, Mostrar u ocultar este panel, toggledock
bindd = , question, Ver todos los atajos, togglehelp

$category = Workspaces
bindd = $mainMod, 1, Ir al workspace 1, workspace, 1
bindd = $mainMod, 2, Ir al workspace 2, workspace, 2
bindd = $mainMod, 3, Ir al workspace 3, workspace, 3
bindd = $mainMod, 4, Ir al workspace 4, workspace, 4
bindd = $mainMod, 5, Ir al workspace 5, workspace, 5

$category = Ventanas
bindd = $mainMod, RETURN, Abrir terminal, exec, terminal
bindd = $mainMod, Q, Cerrar ventana activa, killactive
bindd = $mainMod, F, Alternar flotante, togglefloating

$category = Media
bindd = $mainMod, M, Reproducir o pausar música, togglemusic
`

export const KEYBINDS = parseKeybinds(KEYBINDS_CONF)

export const KEYBIND_CATEGORIES = [...new Set(KEYBINDS.map((bind) => bind.category))]
