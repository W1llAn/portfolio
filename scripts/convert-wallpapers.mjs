// Convierte public/wallpapers/*.{png,jpg,jpeg} a .webp (1920px de ancho, calidad 80) con el mismo nombre
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const WIDTH = 1920
const QUALITY = 80
const SOURCE = /\.(png|jpe?g)$/i

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/wallpapers')
const files = (await readdir(dir)).filter((file) => SOURCE.test(file))

if (files.length === 0) console.log('No hay .png/.jpg en public/wallpapers/')

for (const file of files) {
  const input = path.join(dir, file)
  const output = path.join(dir, file.replace(SOURCE, '.webp'))
  const { width } = await sharp(input).metadata()

  // withoutEnlargement: una imagen más angosta que 1920px no se reescala hacia arriba
  const info = await sharp(input)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output)

  const note = width < WIDTH ? ` (original de ${width}px, no se amplía)` : ''
  console.log(`${file} → ${path.basename(output)} ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB${note}`)
}
