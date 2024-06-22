
import path from 'path'

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: {
    lazy: true,
    langDir: "locales",
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'ar',
        file: 'ar.json'
      },
    ],
    defaultLocale: 'en',

    strategy: 'no_prefix',


  },
  css: ['~/assets/css/main.css',
    '~/assets/css/fonts.css'
  ],
  plugins: [
    { src: '@/plugins/toast.js', mode: 'client' }
  ],



  runtimeConfig: {
    public: {
      dev_base: process.env.API_BASE,
      prod_base: process.env.API_BASE_PRODUCTION
    }
  },

  app: {
    head: {
      title: "FOX PROXY",
      // link: [{ rel: 'icon', type: 'image/png', href: "/Flag.png" }]
      // link: [{ rel: "icon", type: "image/png", href: "/logo.png" }],

    },
  },

})