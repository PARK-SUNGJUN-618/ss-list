/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dot_pattern': "url('/src/img/dot-pattern.png')"
      },
      colors: {
        "primary" : "#0A192F",
        "secondary" : "#F97316",
        "tertiary" : "#54D6BB",
        "ssclean": {
          1: "#F7F7E6",
          2: "#E0DBF0",
          3: "#C3BFE2",
          4: "#9A86B3",
          5: "#6C5A73",
          6: "#987095",
          7: "#4E4964",
          8: "#1e1c27",
        },
      }
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh) * 100)',
    }),
    minHeight: theme => ({
      '0': '0',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh) * 100)',
    }),
    screens: {
      'lg': {'max': '2023px'},
      'sm': {'max': '1000px'},
    }
  },
  plugins: [],
}
