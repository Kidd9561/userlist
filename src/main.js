import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import UUID from "vue-uuid";


const app = createApp(App)

app.use(router)
app.use(ElementUI)
app.use(UUID)

app.mount('#app')
