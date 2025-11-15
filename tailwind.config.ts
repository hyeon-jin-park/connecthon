import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#16a34a',
          dark: '#15803d',
          light: '#86efac',
        }
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
}
export default config
