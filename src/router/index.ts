import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Outlet from "@/Outlet.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Outlet,
    children: [
      {
        path: '',
        redirect: '/resume'
      },
      {
        path: 'resume',
        component: () => import('@/views/ResumePage.vue')
      },
      // {
      //   path: 'search',
      //   component: () => import('@/views/EventsPage.vue')
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
