import { createRouter, createWebHistory } from 'vue-router'
// import Class from '@/pages/Class/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'class',
      component: () => import('@/pages/Class/index.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/Cart/index.vue'),
    },
  ],
})

export default router
