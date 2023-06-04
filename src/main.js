import {createApp} from 'vue'
import 'normalize.css'
import App from './App.vue'
import 'virtual:uno.css'
import store from '@/store'
import router from '@/router'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')