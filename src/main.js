import { createApp } from 'vue'
//iconos 
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faUser, faCog, faStore, faBell, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faUser, faCog, faStore, faBell, faShoppingCart)

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router).mount('#app')