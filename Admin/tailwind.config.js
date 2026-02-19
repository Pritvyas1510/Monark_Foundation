module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#f27f0d',
        'background-light': '#f8f7f5',
        'background-dark': '#221910',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      // Optional subtle floating animation
      animation: {
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-slow': 'pulse 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.15 },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};