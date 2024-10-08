import './assets/main.css'
import 'element-plus/theme-chalk/el-message.css'
import { createApp } from 'vue'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('Icon', Icon)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
