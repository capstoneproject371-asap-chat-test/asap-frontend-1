// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['vuetify/lib/styles/main.sass', '~/assets/global.css'],
  build: {
    transpile: ['vuetify'],
  },
  app: {
    head: {
      titleTemplate: '%s | ASAP',
    },
  },
})
