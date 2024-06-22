// plugins/vue-toast-notification.js
import { defineNuxtPlugin } from '#app'
import ToastPlugin from 'vue-toast-notification'
// Import one of the available themes
import 'vue-toast-notification/dist/theme-bootstrap.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ToastPlugin)
})
