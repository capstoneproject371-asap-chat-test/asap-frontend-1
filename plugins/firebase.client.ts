import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDK0jfDO7ezrRDNwq0L_uFBhv1hRAgC0A4',
    authDomain: 'asap-71546.firebaseapp.com',
    projectId: 'asap-71546',
    storageBucket: 'asap-71546.appspot.com',
    messagingSenderId: '103375931193',
    appId: '1:103375931193:web:c13c240a4eebcbca58cae8',
    measurementId: 'G-G5KGCBH33E',
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  const auth = getAuth(app)
  const firestore = getFirestore(app)

  nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.provide('auth', auth)

  nuxtApp.vueApp.provide('firestore', firestore)
  nuxtApp.provide('firestore', firestore)
})
