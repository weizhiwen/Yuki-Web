<script setup>
import {useFullscreen} from "@vueuse/core";
import {PhArrowsIn, PhArrowsOut} from "@phosphor-icons/vue";

const {isFullscreen, toggle} = useFullscreen();

</script>

<template>
    <el-icon size="24" @click="toggle">
        <ph-arrows-in v-if="isFullscreen"/>
        <ph-arrows-out v-else/>
    </el-icon>
</template>

<style scoped>

</style>