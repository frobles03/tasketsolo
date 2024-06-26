import { createRouter, createWebHistory } from 'vue-router'
import Perfil from './components/user/Perfil.vue'
import TareasCanjesAdmin from './components/admin/TareasCanjesAdmin.vue'
import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'
import TiendaCanje from './components/user/TiendaCanje.vue'
import Home from './components/home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/perfil', component: Perfil },
  { path: '/login', component: Login },
  { path: '/tareas-canjes-admin', component: TareasCanjesAdmin },
  { path: '/register', component: Register },
  { path: '/TiendaCanje', component: TiendaCanje },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router