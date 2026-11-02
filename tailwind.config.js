/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#111c1e',
        baseDark: '#0a1113',
        textMain: '#aaaba6',
        textMuted: '#656968',
        textBright: '#d4d5d1',
        accent: '#a10a28',
        accentDark: '#690920',
        terminalBrass: '#8a7b58',
        terminalMoss: '#4a6b58',
      },
      boxShadow: {
        'caelestia-glow': '0 0 15px -3px rgba(161, 10, 40, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrainsMono Nerd Font"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
