// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Anuphan: [400, 700],
        },
      },
    ],
  ],
  css: ['vuetify/lib/styles/main.sass', '~/assets/global.css'],
  build: {
    transpile: ['vuetify'],
  },
  app: {
    head: {
      titleTemplate: '%s | ASAP',
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },
})
