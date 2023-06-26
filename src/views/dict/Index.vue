<script setup>
import {searchDictTypes} from "@/api/dict";

const table = ref({
    count: 0,
    list: [],
})
onMounted(async () => {
    await searchDictTypes({}).then(res => {
        table.value = res
        console.log(table.value)
    })
})
</script>
<template>
    <!--  element-plus 表格-->
    <el-table
        :data="table.list">
        <el-table-column
            prop="code"
            label="编码">
        </el-table-column>
        <el-table-column
            prop="name"
            label="名称">
        </el-table-column>
        <el-table-column
            prop="description"
            label="描述">
        </el-table-column>
    </el-table>
</template>

<style scoped>

</style>