import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
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
    component: () => import("../components/layout/Showcase.vue")
  },
  {
    path: "/frame-work",
    name: "frame-work",
    component: () => import("../components/layout/FrameWork.vue")
  },
  {
    path: "/normal-user",
    name: "normal-user",
    redirect: "/normal-user/user-profile-form",
    component: () => import("../components/features/backstage/normal/NormalUser.vue"),
    meta: { title: "normal user" },
    children: [
      {
        path: "/normal-user/user-profile-form",
        name: "user-profile-form",
        component: () => import("../components/features/backstage/normal/UserProfileForm.vue"),
        meta: { title: "user profile form" }
      },
      {
        path: "/normal-user/addition-form",
        name: "addition-form",
        component: () => import("../components/features/backstage/normal/AdditionForm.vue"),
        meta: { title: "addition form" }
      },
      {
        path: "/normal-user/history",
        name: "history",
        component: () => import("../components/features/backstage/normal/History.vue"),
        meta: { title: "history" }
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
