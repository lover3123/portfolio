/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        editor: {
          bg: 'var(--editor-bg)',
          line: 'var(--editor-line)',
          selection: 'var(--editor-selection)',
          keyword: 'var(--editor-keyword)',
          function: 'var(--editor-function)',
          string: 'var(--editor-string)',
          number: 'var(--editor-number)',
          comment: 'var(--editor-comment)',
          type: 'var(--editor-type)',
          class: 'var(--editor-class)',
          variable: 'var(--editor-variable)',
          property: 'var(--editor-property)',
          foreground: 'var(--editor-foreground)',
        },
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};