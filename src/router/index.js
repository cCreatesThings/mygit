import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/index.vue'),
      children: [
        {
          path: '',
          name: 'code',
          component: () => import('@/views/Home/components/CodeCom.vue')
        },
        {
          path: 'create',
          name: 'create',
          component: () =>
            import('@/views/Home/components/CreateRepository.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    if (!useUserStore().token) {
      return '/login'
    } else {
      return true
    }
  } else {
    if (useUserStore().token) {
      return '/'
    }
  }
})

export default router
