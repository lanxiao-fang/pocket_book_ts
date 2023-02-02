import { RouteRecordRaw, RouteComponent } from 'vue-router';
interface RouterObj {
    path: string,
    name: string,
    meta: {
        [key: string]: string
    },
    component: RouteComponent
}

const router: RouterObj[] = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import('@/view/login/index.vue')
    },

]
export default router