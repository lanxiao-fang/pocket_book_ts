const router = [
    {
        path: '/details',
        name: 'Details',
        meta: {
            title: '明细',
            activeIcon: new URL('@/assets/details-active-icon.png', import.meta.url).href,
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
            activeIcon: new URL('@/assets/statistics-active-icon.png', import.meta.url).href,
            inactiveIcon: new URL('@/assets/statistics-inactive-icon.png', import.meta.url).href,
        },
        component: () => import('@/view/statistics/index.vue')
    },
    {
        path: '/my',
        name: 'My',
        meta: {
            title: '我的',
            activeIcon: new URL('@/assets/my-active-icon.png', import.meta.url).href,
            inactiveIcon: new URL('@/assets/my-inactive-icon.png', import.meta.url).href,
        },
        component: () => import('@/view/my/index.vue')
    },
]
export default router