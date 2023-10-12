import { createVuetify } from 'vuetify/lib/framework.mjs'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa } from 'vuetify/iconsets/fa'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { light } from '@/utils/theme'
import '@fortawesome/fontawesome-free/css/all.css'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
        fa,
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
