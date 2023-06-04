/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/*.tsx"
  ],
  theme: {
    boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
        glow: '0 0 20px',

        'up-sm': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
        'up-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'up-lg': '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'up-xl': '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'up-2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
        'up-3xl': '0 -35px 60px -15px rgba(0, 0, 0, 0.3)'
    },
    extend: {
      backgroundImage: {
        'abstract': "require('../../assets/images/bg-image.png')",
        'marble-blue': "require('../../assets/images/background-blue.png')",
      },
      animation: {
        fadeIn: 'fadeIn .25s ease-in-out',
        slideInTop: 'slideInTop 0.25s ease-out',
        rainbow: 'rainbow 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        },
        rainbow: {
          '0%': {
            '--tw-shadow-color': '#38BDF8',
            '--tw-shadow': 'var(--tw-shadow-colored)',
            'background-color': '#38BDF8'
          },
          '33%': {
            '--tw-shadow-color': '#EF4444',
            '--tw-shadow': 'var(--tw-shadow-colored)',
            'background-color': '#EF4444'
          },
          '66%': {
            '--tw-shadow-color': '#22C55E',
            '--tw-shadow': 'var(--tw-shadow-colored)',
            'background-color': '#22C55E'
          },
          '100%': {
            '--tw-shadow-color': '#38BDF8',
            '--tw-shadow': 'var(--tw-shadow-colored)',
            'background-color': '#38BDF8'
          }
        },
        slideInTop: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-100%)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0%)'
          }
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({nocompatible:true}),
  ],
}

