export interface Wallpaper {
  id: string
  name: string
  /** null = generado con CSS (.wallpaper-obsidiana en index.css) */
  src: string | null
}

export const WALLPAPERS: Wallpaper[] = [
  { id: 'obsidiana', name: 'Obsidiana', src: null },
  { id: 'red', name: 'Red', src: '/wallpapers/WallpaperRed1.webp' },
  { id: 'arch-black', name: 'Arch Black', src: '/wallpapers/WallpaperArchBlack1.webp' },
  { id: 'nature-green', name: 'Nature Green', src: '/wallpapers/WallpaperNatureGreen1.webp' },
  { id: 'pixel-art', name: 'Pixel Art', src: '/wallpapers/WallpaperPixelArt.webp' },
]

export const DEFAULT_WALLPAPER = WALLPAPERS[0].id

export const getWallpaper = (id: string) => WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0]
