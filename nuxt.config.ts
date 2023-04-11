// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api/'
    }
  },

  css: [
    '@compromis/blobby/scss/blobby.scss',
    '~/assets/scss/global.scss'
  ],

  app: {
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
      { code: 'val', file: 'val.js', name: 'Valencià' },
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
