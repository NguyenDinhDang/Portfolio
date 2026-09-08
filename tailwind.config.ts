import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-color-primary)',
        'bg-secondary': 'var(--bg-color-secondary)',
        important: 'var(--important)',
        sub: 'var(--sub)',
        body: 'var(--body)',
        'portfolio-border': 'var(--border)',
        'border-dark': 'var(--border-dark)',
        'brand-pink': '#ff5e99',
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      spacing: {
        nano: '0.5rem',
        micro: '1rem',
        xsmall: '1.5rem',
        small: '2rem',
        medium: '2.5rem',
        large: '3rem',
        xlarge: '6rem',
        huge: '12rem',
      },
      transitionTimingFunction: {
        'brand-easing': 'cubic-bezier(0.86, 0, 0.07, 1)',
        'spring-switch': 'cubic-bezier(0.45, 0.05, 0.22, 1.3)',
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'logo-curve': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
