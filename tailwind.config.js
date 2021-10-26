module.exports = {
  mode: 'jit',
  // purge: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  purge: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', 'sans-serif'",
      },
      fontSize: {
        '3xs': '0.5rem',
        '2xs': '0.65rem',
      },
      minHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '90%': '90%',
        full: '100%',
      },
      maxHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '90%': '90%',
        full: '100%',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
