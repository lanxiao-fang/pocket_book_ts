
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { flatten } from 'lodash'

const rts = import.meta.glob('./modules/*.ts')

console.log(rts);


let pageRoutes: RouteRecordRaw[] = []

for (const path in rts) {
  const mod: any = await rts[path]()
  pageRoutes.push(...flatten( mod.default as RouteRecordRaw[]))
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


const router = createRouter({
  // history: createWebHashHistory(), // hash路由，路径上没有#的，但是需要后端搭配nginx，否则刷新后匹配不上资源，页面404
  history: createWebHistory(),
  routes
});


router.beforeEach(async (_to, _from, next) => {

  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
})
export default router;