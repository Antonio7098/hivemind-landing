/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/docs/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--tw-border))',
        input: 'hsl(var(--tw-input))',
        ring: 'hsl(var(--tw-ring))',
        background: 'hsl(var(--tw-background))',
        foreground: 'hsl(var(--tw-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--tw-primary))',
          foreground: 'hsl(var(--tw-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--tw-secondary))',
          foreground: 'hsl(var(--tw-secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--tw-muted))',
          foreground: 'hsl(var(--tw-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--tw-accent))',
          foreground: 'hsl(var(--tw-accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--tw-destructive))',
          foreground: 'hsl(var(--tw-destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--tw-card))',
          foreground: 'hsl(var(--tw-card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--tw-popover))',
          foreground: 'hsl(var(--tw-popover-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--tw-sidebar))',
          foreground: 'hsl(var(--tw-sidebar-foreground))',
          border: 'hsl(var(--tw-sidebar-border))',
          accent: 'hsl(var(--tw-sidebar-accent))',
          'accent-foreground': 'hsl(var(--tw-sidebar-accent-foreground))',
        },
        code: {
          DEFAULT: 'hsl(var(--tw-code))',
          foreground: 'hsl(var(--tw-code-foreground))',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--tw-foreground))',
            a: {
              color: 'hsl(var(--tw-primary))',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            },
            'h1, h2, h3, h4': {
              color: 'hsl(var(--tw-foreground))',
              fontWeight: '600',
            },
            code: {
              color: 'hsl(var(--tw-code-foreground))',
              backgroundColor: 'hsl(var(--tw-code))',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: 'hsl(var(--tw-code))',
              color: 'hsl(var(--tw-code-foreground))',
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--tw-border))',
              color: 'hsl(var(--tw-muted-foreground))',
            },
            hr: { borderColor: 'hsl(var(--tw-border))' },
            'thead th': {
              color: 'hsl(var(--tw-foreground))',
              borderBottomColor: 'hsl(var(--tw-border))',
            },
            'tbody td': { borderBottomColor: 'hsl(var(--tw-border))' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
