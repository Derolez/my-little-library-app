import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        amber: colors.amber,
        brown: '#644E31',
        browndark: '#503918',
        mypurple: '#A079F2',
        miellow: '#DFEF6A',
        saumon: '#F99971',
        saumonLight: '#FFD89B',
        menthe: '#F2F9C8',
      },
      backgroundImage: {
        "hero-pattern": "url('/library-books.jpeg')",
      },
      dropShadow: {
        'md-top': '0 -35px 35px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl-top': [
            '0 -35px 35px rgba(0, 0, 0, 0.25)',
            '0 -45px 65px rgba(0, 0, 0, 0.15)'
        ],
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
    },
  },
  keyframes: {
    shimmer: {
      '100%': {
        transform: 'translateX(100%)',
      },
    },
  },
  plugins: [
    require('tailwindcss/colors'),
    require('@tailwindcss/forms')({
      strategy: 'class', //only generate classes
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugin(function({addUtilities}: any){
      addUtilities({
        '.arrow-hide':{
          '& input::-webkit-inner-spin-button':{
             '-webkit-apparance': 'none',
             'margin': '0'
        },
          '& input::-webkit-outer-spin-button':{
             '-webkit-appearance': 'none',
             'margin': '0'
        },
      }
    })
    })
  ],
} satisfies Config;
