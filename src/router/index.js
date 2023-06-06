import NProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";

export const constantRouters = [
    {
        path: "/",
        component: () => import("@/views/login/index.vue"),
        hidden: true,
    },
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
