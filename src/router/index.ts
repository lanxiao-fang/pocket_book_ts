
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { flatten } from 'lodash'

import { isLogin } from "@/utils/auth";
import { useUserStore } from '@/store'


const rts = import.meta.glob('./modules/*.ts')



console.log(rts);


let pageRoutes: RouteRecordRaw[] = []

for (const path in rts) {
  const mod: any = await rts[path]()
  pageRoutes.push(...flatten(mod.default as RouteRecordRaw[]))
}


const routes = [
  {
    path: '/',
    redirect: '/details',
    children: pageRoutes
  },
  // 这是vue2的写法，不再适用于vue3
  // {
  //   path: '*',
  //   redirect: '/'
  // }

  {
    path: '/:pathMathch(.*)',
    redirect: '/details'
  }
]

const whiteList = ['/login', '/404', '/401']


const router = createRouter({
  // history: createWebHashHistory(), // hash路由，路径上没有#的，但是需要后端搭配nginx，否则刷新后匹配不上资源，页面404
  history: createWebHistory(),
  routes
});


router.beforeEach(async (_to, _from, next) => {
  console.log('routes', routes);

  const userStore = useUserStore();
  const { id } = userStore

  const _isLogin = isLogin()

  console.log('userStore', _isLogin);
  // 如果是登陆过的
  if (_isLogin) {
    if (_to.path === 'login') {
      next({
        path: '/'
      })
    } else {
      if (id) {
        // 用户信息存在
        next()
      } else {
        try {
          // 不存在重新获取
          await userStore.info()
          next()
        } catch (error) {
          next('/login')
        }
      }
    }
  } else {
    if (whiteList.indexOf(_to.path) !== -1) {
      next()
    } else {
      next(`/login`)
    }

  }

  NProgress.start();
  // next()
});

router.afterEach((_to) => {
  NProgress.done();
})
export default router;