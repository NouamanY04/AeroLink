module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX/TS/TSX files in the src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        istok: ['Istok Web', 'sans-serif'],
      },
      colors: {
        backgroundnavbar: '#f9fbff',
        lightergray: '#FDFDFD'
      },
      keyframes: {
        moveRight: {
          '0%': { transform: 'translateX(-10vw)', opacity: '0' }, // Start from outside (left)
          '100%': { transform: 'translateX(0)', opacity: '1' }, // Reach origin place
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        moveRight: 'moveRight 1s ease-in-out forwards',
        fadeIn: 'fadeIn 1s forwards',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};