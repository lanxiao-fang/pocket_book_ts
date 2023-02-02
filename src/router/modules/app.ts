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
        path: '/details',
        name: 'Details',
        meta: {
            title: '明细',
            lightActiveIcon: new URL('@/assets/light-details-active-icon.png', import.meta.url).href,
            pinkActiveIcon: new URL('@/assets/pink-details-active-icon.png', import.meta.url).href,
            blueActiveIcon: new URL('@/assets/blue-details-active-icon.png', import.meta.url).href,
            inactiveIcon: new URL('@/assets/details-inactive-icon.png', import.meta.url).href,
        },
        component: () => import('@/view/details/index.vue')
    },
    {
        path: '/statistics',
        name: 'Statistics',
        meta: {
            title: '统计',
            // 会报错require未定义
            // activeIcon: require('@/assets/statistics-active-icon.png'),
            lightActiveIcon: new URL('@/assets/light-statistics-active-icon.png', import.meta.url).href,
            pinkActiveIcon: new URL('@/assets/pink-statistics-active-icon.png', import.meta.url).href,
            blueActiveIcon: new URL('@/assets/blue-statistics-active-icon.png', import.meta.url).href,
            inactiveIcon: new URL('@/assets/statistics-inactive-icon.png', import.meta.url).href,
        },
        component: () => import('@/view/statistics/index.vue')
    },
    {
        path: '/my',
        name: 'My',
        meta: {
            title: '我的',
            lightActiveIcon: new URL('@/assets/light-my-active-icon.png', import.meta.url).href,
            pinkActiveIcon: new URL('@/assets/pink-my-active-icon.png', import.meta.url).href,
            blueActiveIcon: new URL('@/assets/blue-my-active-icon.png', import.meta.url).href,
            inactiveIcon: new URL('@/assets/my-inactive-icon.png', import.meta.url).href,
        },
        component: () => import('@/view/my/index.vue')
    },
   
]
export default router