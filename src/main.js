import { createApp } from 'vue'
import {createPinia} from 'pinia'

import './tailwindStyle.css'
import App from './App.vue'
import router from './router'


// createApp(App).mount('#app')
const pinia = createPinia(App)
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
