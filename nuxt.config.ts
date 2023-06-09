// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://programa2023.compromis.net/api/',
      googleApiKey: process.env.GOOGLE_API_KEY,
      spreadsheetId: process.env.SPREAD_SHEET_ID
    }
  },

  css: [
    '@compromis/blobby/scss/blobby.scss',
    '~/assets/scss/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      meta: [
        { name: 'theme-color', content: '#de5412' },
        { name: 'color-scheme', content: 'light only' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: 'images/favicon192.png' },
      ]
    }
  },

  modules: [
    '@nuxtjs/i18n',
    'nuxt-gtag'
  ],

  i18n: {
    locales: [
      { code: 'val', file: 'val.js', name: 'Valencià', isCatchallLocale: true },
      { code: 'cas', file: 'cas.js', name: 'Castellano' }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'val',
    detectBrowserLanguage: false
  },

  gtag: {
    id: 'G-DVVR6CMDWC'
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "~/assets/scss/variables";
            @import "@compromis/blobby/scss/variables";
            @import "bootstrap/scss/functions";
            @import "bootstrap/scss/variables";
            @import "bootstrap/scss/maps";
            @import "bootstrap/scss/mixins";
            @import "~/assets/scss/scrollbar";
          `
        }
      }
    }
  },

  build: {
    transpile: ['gsap']
  }
})
