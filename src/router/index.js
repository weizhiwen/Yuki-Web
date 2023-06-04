import {createRouter, createWebHistory} from "vue-router";
import NProgress from 'nprogress';

export const constantRouters = [
    {
        path: '/',
        component: () => import('@/views/login/index.vue'),
        hidden: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRouters,
})

export default router;