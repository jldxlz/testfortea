import { createRouter, createWebHistory  } from 'vue-router'
// import HelloWorld from 'components/HelloWorld.vue'
const router = createRouter({
  history: createWebHistory(),//路由模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/taskon/taskon')
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('@/daishu/daishu')
    // },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/explore/explore')
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('@/play/play')
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('@/event/event')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/test/test')
    }    
  ]
})

// 导航守卫

export default router;
