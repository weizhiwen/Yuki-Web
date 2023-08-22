<script setup>
import CustomDictPan from "@/views/dict/components/CustomDictPan.vue";
import SystemDictPan from "@/views/dict/components/SystemDictPan.vue";

const activePane = ref('system')

</script>
<template>
    <el-tabs v-model="activePane">
        <el-tab-pane label="系统内置" name="system">
            <SystemDictPan/>
        </el-tab-pane>
        <el-tab-pane label="用户自定义" name="custom" lazy>
            <CustomDictPan/>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped>

</style>