<script setup>

import {ArrowRight} from "@element-plus/icons-vue";
import Git from "@/layout/header/Git.vue";
import Fullscreen from "@/layout/header/Fullscreen.vue";
</script>

<template>
    <div class="header flex-between h-full">
        <div class="header-left">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="header-right flex-center">
            <el-tooltip content="源码地址" effect="dark" placement="bottom">
                <Git class="right-menu-item"/>
            </el-tooltip>
            <Fullscreen class="right-menu-item"/>
            <div class="avatar-container">
                <el-dropdown class="right-menu-item">
                    <el-avatar class="w-45px h-45px"
                               src="https://avatars.githubusercontent.com/u/22706559?s=400&u=14a6819e04eaeb8ed187de0722f49824ed9879bd&v=4"
                               alt="头像"/>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item>布局设置</el-dropdown-item>
                            <el-dropdown-item divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<style scoped>
.right-menu-item {
    padding: 0 8px;
}
</style>