<script setup>
import {PhGithubLogo} from "@phosphor-icons/vue";

const url = 'https://github.com/weizhiwen/Yuki-Web.git'
const goto = () => {
    window.open(url)
}
</script>

<template>
    <el-icon size="24" @click="goto">
        <PhGithubLogo/>
    </el-icon>
</template>

<style scoped>

</style>