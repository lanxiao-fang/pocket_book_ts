import { RouteRecordRaw, RouteComponent } from 'vue-router';
interface RouterObj {
    path: string,
    name: string,
    meta: {
        [key: string]: string
    },
    component: RouteComponent,
    children?: RouterObj[]
}

const router: RouterObj[] = [

    {
        path: 'account ',
        name: 'Account ',
        component: () => import('@/view/account/index.vue'),
        meta: {
            title: '账单详情'
        }
    },
    {
        path: 'safe',
        name: 'Safe',
        component: () => import('@/view/safe/index.vue'),
        meta: {
            title: '账号安全'
        }
    }

]
export default router