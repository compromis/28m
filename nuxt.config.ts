// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api/',
      googleApiKey: process.env.GOOGLE_API_KEY,
      spreadsheetId: process.env.SPREAD_SHEET_ID
    }
  },

  css: [
    '@compromis/blobby/scss/blobby.scss',
    '~/assets/scss/global.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://compromis.net/sub/icons/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'https://compromis.net/sub/icons/favicon32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: 'https://compromis.net/sub/icons/favicon192.png' },
        { rel: 'stylesheet', href: 'https://compromis.net/sub/fonts/manrope.css?variable' }
      ]
    }
  },

  modules: [
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: 'val', file: 'val.js', name: 'Valencià', isCatchallLocale: true },
      { code: 'cas', file: 'cas.js', name: 'Castellano' }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'val'
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
          `
        }
      }
    }
  }
})
