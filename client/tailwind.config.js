module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))'
      },
      gridColumn: {
        'span-15': 'span 15 / span 15',

      },
      gridTemplateRows: {
       '16': 'repeat(16, minmax(0, 1fr))',
       '11': 'repeat(11, minmax(0, 1fr))',
      },
      gridRow: {
        'span-15': 'span 15 / span 15',
        'span-11': 'span 11 / span 11'

      },
      colors: {
        ungu:{
          terang: '#F2F1FF',
          teks: '#333333',
          gelap: '#2F2B71',
        },
        bekgron:{
          hijau: '#ADD8C0',
          kuning: '#FFC877'
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
