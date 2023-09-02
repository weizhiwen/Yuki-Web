<script setup>
import {Search} from "@element-plus/icons-vue";

const drawerRef = ref(null)
const isShow = ref(false)

defineExpose({
    isShow,
})

const prop = defineProps({
    dictTypeName: String
})

const searchParam = ref({
    keyword: undefined,
    builtin: true,
})
</script>

<template>
    <el-drawer
        ref="drawerRef"
        v-model="isShow"
        :title="dictTypeName +  '字典数据'"
        size="50%"
    >
        <el-row class="mb-20px">
            <el-form>
                <el-form-item>
                    <el-input v-model="searchParam.keyword" placeholder="编码或名称" clearable>
                        <template #append>
                            <el-button :icon="Search"/>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-row>
        <el-table>
            <el-table-column prop="parentName" label="父类型"/>
            <el-table-column prop="code" label="编码"/>
            <el-table-column prop="name" label="名称"/>
            <el-table-column
                prop="disabled"
                label="状态">
                <template #default="scope">
                    <el-tag v-if="!scope.row.disabled" type="success">启用</el-tag>
                    <el-tag v-else type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="memo" label="备注"/>
        </el-table>
    </el-drawer>
</template>

<style scoped>

</style>