import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ToastPlugin from 'vue-toast-notification'
import VueSweetalert2 from 'vue-sweetalert2'

import 'vue-toast-notification/dist/theme-bootstrap.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.use(VueSweetalert2)

app.mount('#app')
