<script setup>
import SideBar from './sidebar/Index'
import Header from './header/Index'
import Main from './main/Index'
</script>

<template>
    <el-container class="app-wrapper">
        <el-aside class="sidebar-container h-full">
            <SideBar/>
        </el-aside>
        <el-container class="main-container">
            <el-header class="header h-50px">
                <Header/>
            </el-header>
            <el-main class="main calc(100vh - 50px)">
                <Main/>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>

</style>