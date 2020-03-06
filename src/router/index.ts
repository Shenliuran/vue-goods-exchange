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
    component: () => import("../components/features/management/normal/NormalUser.vue"),
    meta: { title: "normal user" },
    children: [
      {
        path: "/normal-user/user-profile-form",
        name: "user-profile-form",
        component: () => import("../components/features/management/normal/UserProfileForm.vue"),
        meta: { title: "user profile form" }
      },
      {
        path: "/normal-user/addition-form",
        name: "addition-form",
        component: () => import("../components/features/management/normal/AdditionForm.vue"),
        meta: { title: "addition form" }
      },
      {
        path: "/normal-user/history",
        name: "history",
        component: () => import("../components/features/management/normal/History.vue"),
        meta: { title: "history" }
      },
      {
        path: "/normal-user/modify",
        name: "modify",
        component: () => import("../components/features/management/normal/Modify.vue"),
        meta: { title: "modify" }
      },
      {
        path: "/normal-user/notification",
        name: "notification",
        component: () => import("../components/features/management/normal/Notification.vue"),
        meta: { title: "notification" }
      }
    ]
  },
  {
      path: "/administrator",
      name: "administrator",
      redirect: "/administrator/admin-profile-form",
      component: () => import("../components/features/management/administrator/Administrator.vue"),
      meta: { title: "administrator" },
      children: [
        {
          path: "/administrator/admin-profile-form",
          name: "admin-profile-form",
          component:() => import("../components/features/management/administrator/AdminProfileForm.vue"),
          meta: { title: "admin profile form"}
        },
        {
          path: "/administrator/user-info-manage",
          name: "user-info-manage",
          component:() => import("../components/features/management/administrator/UserInfoManage.vue"),
          meta: { title: "user information management"}
        },
        {
          path: "/administrator/goods-manage",
          name: "goods-manage",
          meta: { title: "goods management" }
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
