import localFont from 'next/font/local'

//definition des variables de fonts
const clashGrotesk = localFont ({
  src:[
    {
    path: '../ui/myFonts/ClashGrotesk-Regular.woff',
    weight: '400',
    style: 'normal',
    },
    {
    path: '../ui/myFonts/ClashGrotesk-Medium.woff',
    weight: '500',
    style: 'normal',
    },
    {
    path: '../ui/myFonts/ClashGrotesk-Semibold.woff',
    weight: '600',
    style: 'normal',
    },
    {
    path: '../ui/myFonts/ClashGrotesk-Bold.woff',
    weight: '700',
    style: 'normal',
    },
  ],
  display: "swap",
} );

export { clashGrotesk }
