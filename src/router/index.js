import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'weather',
        name: 'weather',
        component: () => import("../views/Weather")
      },
      {
        path: 'airport',
        name: 'airport',
        component: () => import('../views/Airport')
      },
      {
        path: 'chat',
        name: 'chat',
        component: () => import('../views/Chat')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
