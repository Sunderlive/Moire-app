import { createApp, h } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from './router'

const app = createApp({
  render: () => h(App),
})

app.use(store)
app.use(router)
app.mount('#app')



