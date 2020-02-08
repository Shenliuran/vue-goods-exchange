import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/showcase",
    name: "showcase",
    component: () => import(/** */ "../components/layout/Showcase.vue")
  },
  {
    path: "/app-title-bar",
    name: "app-title-bar",
    component: () => import(/**/ "../components/layout/AppTitleBar.vue")
  },
  {
    path: "/normal-user",
    name: "normal-user",
    component: () => import(/**/ "../components/features/backstage/normal/NormalUser.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
