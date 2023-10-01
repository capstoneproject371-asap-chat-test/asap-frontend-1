import { createVuetify } from 'vuetify/lib/framework.mjs'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { light } from '@/utils/theme'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      themes: {
        light,
      },
    },
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})
