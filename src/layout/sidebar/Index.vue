<script setup>
import MenuItem from "./MenuItem.vue";
import Logo from "./Logo.vue";

const menuRouters = [
    {
        name: '首页',
        index: 'home',
    },
    {
        name: '系统管理',
        index: 'system',
        children: [
            {
                name: '用户管理',
                index: 'user',
            },
            {
                name: '角色管理',
                index: 'role',
            },
            {
                name: '菜单管理',
                index: 'menu'
            },
            {
                name: '部门管理',
                index: 'department'
            },
            {
                name: '岗位管理',
                index: 'position'
            },
            {
                name: '字典管理',
                index: 'dict'
            },
            {
                name: '参数设置',
                index: 'param'
            },
            {
                name: '通知公告',
                index: 'notice'
            },
            {
                name: '日志管理',
                index: 'log'
            },
        ]
    },
    {
        name: '系统监控',
        index: 'monitor',
        children: [
            {
                name: '在线用户',
                index: 'online',
            },
            {
                name: '定时任务',
                index: 'corn',
            },
            {
                name: '数据监控',
                index: 'database',
            },
            {
                name: '服务监控',
                index: 'server',
            },
            {
                name: '缓存监控',
                index: 'cache',
            },
        ]
    },
    {
        name: '系统工具',
        index: 'tools',
        children: [
            {
                name: '表单构建',
                index: 'form',
            },
            {
                name: '代码生成',
                index: 'generator',
            },
            {
                name: '系统接口',
                index: 'api',
            },
        ]
    },
]
</script>

<template>
    <Logo class="h-50px"/>
    <el-scrollbar class="menu-scrollbar calc(100% - 50px)">
        <el-menu
            router
            :default-active="$route.path"
        >
            <MenuItem
                v-for="(item, i) in menuRouters"
                :key="i + item.index"
                :item="item"
            />
        </el-menu>
    </el-scrollbar>
</template>

<style scoped>
</style>