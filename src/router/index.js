import NProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";

export const constantRouters = [
    {
        path: "/",
        component: () => import("@/views/index/Index.vue"),
        hidden: true,
    },
    {
        path: "/login",
        component: () => import("@/views/login/Index.vue"),
        hidden: true,
    },
    {
        path: "/index",
        component: () => import("@/views/index/Index.vue"),
        hidden: true,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: constantRouters,
});
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});
router.afterEach(() => {
    NProgress.done();
});
export default router;
