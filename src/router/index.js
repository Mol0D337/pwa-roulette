import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/home',
    name: 'Main',
    component: () => import('../views/Main.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
