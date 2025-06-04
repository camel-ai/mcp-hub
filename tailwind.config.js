/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      boxShadow: {
        'card': [
          '0px 0px 20px -2px rgba(29,33,41,0.10)',
          '0px 32px 48px -12px rgba(29,33,41,0.12)',
          '0px 96px 120px -12px rgba(65,74,92,0.06)',
          '0px 108px 72px -16px rgba(65,74,92,0.08)',
          '0px 32px 64px -8px rgba(113,153,189,0.12)',
          '0px 8px 10px 0px rgba(113,153,189,0.12)'
        ].join(', '),
      },
    },
  },
  plugins: [],
} 