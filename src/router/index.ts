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
    path: "/frame-work",
    name: "frame-work",
    component: () => import(/**/ "../components/layout/FrameWork.vue")
  },
  {
    path: "/normal-user",
    name: "normal-user",
    component: () => import(/**/ "../components/features/backstage/normal/NormalUser.vue"),
    children: [
      {
        path: "/normal-user/user-profile-form",
        name: "user-profile-form",
        component: () => import(/** */ "../components/features/backstage/normal/UserProfileForm.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
