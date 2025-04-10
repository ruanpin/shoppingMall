import './assets/main.css'
import './assets/animate.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { setApp } from './assets/api';

const app = createApp(App)
setApp(app);

app.use(createPinia())
app.use(router)

app.mount('#app')
