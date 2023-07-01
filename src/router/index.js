import NProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";

export const constantRouters = [
    {
        path: "/login",
        component: () => import("@/views/login/Index.vue"),
        hidden: true,
    },
    {
        path: "/",
        component: () => import("@/views/index/Index.vue"),
        children: [
            {
                path: "home",
                component: () => import("@/views/home/Index.vue"),
            },
            {
                path: "dict",
                component: () => import("@/views/dict/Index.vue"),
            }
        ]
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
