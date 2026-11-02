import { MotionConfig } from 'framer-motion'
import { Desktop } from './components/Desktop'
import { KeybindsHelp } from './components/KeybindsHelp'
import { Toaster } from './components/Toaster'
import { Wallpaper } from './components/Wallpaper'
import { Waybar } from './components/Waybar'
import { WofiLauncher } from './components/WofiLauncher'
import { useKeybinds } from './hooks/useKeybinds'

function App() {
  useKeybinds()

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex h-dvh flex-col overflow-hidden text-textMain">
        <Wallpaper />
        <Waybar />
        <Desktop />

        <WofiLauncher />
        <KeybindsHelp />
        <Toaster />
      </div>
    </MotionConfig>
  )
}

export default App
