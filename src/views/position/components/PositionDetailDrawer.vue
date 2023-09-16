<script setup>
import {detail} from "@/api/position";

const props = defineProps({
    dataId: Number
})
const isShow = ref(false)

const data = ref({})
const handleOnOpen = () => {
    if (props.dataId) {
        detail(props.dataId).then(value => {
            data.value = value
        })
    }
}

defineExpose({
    isShow
})
</script>

<template>
    <el-drawer
        ref="drawerRef"
        v-model="isShow"
        @open="handleOnOpen"
        title="详情"
        size="50%"
        destroy-on-close
    >
        <el-descriptions :column="2">
            <el-descriptions-item label="部门：">{{ data.departmentName }}</el-descriptions-item>
            <el-descriptions-item label="编码：">{{ data.code }}</el-descriptions-item>
            <el-descriptions-item label="名称：">{{ data.name }}</el-descriptions-item>
            <el-descriptions-item label="头衔：">{{ data.title }}</el-descriptions-item>
            <el-descriptions-item label="性质：">{{ data.property?.name }}</el-descriptions-item>
            <el-descriptions-item label="状态：">
                <el-tag v-if="!data.disabled" type="success">启用</el-tag>
                <el-tag v-else type="danger">禁用</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="描述：" span="2">{{ data.description }}</el-descriptions-item>
        </el-descriptions>
    </el-drawer>
</template>

<style scoped>

</style>