<script setup>
import Pagination from "@/components/pagination/Index.vue";
import {search} from "@/api/dict";

const searchFormRef = ref(null)

const searchParam = ref({
    type: undefined,
    name: undefined,
    builtin: true,
})
const page = ref({
    page: 0,
    size: 20
})
const table = ref({
    loading: false,
    count: 0,
    list: [],
})


onMounted(async () => {
    await getList()
})

const getList = async () => {
    table.value.loading = true
    await search(searchParam.value, page.value).then(res => {
        table.value = res
        table.value.loading = false
    })
}

const handleSearch = async () => {
    await getList()
}

const handleSearchReset = () => {
    searchFormRef.value.resetFields()
    getList();
}
</script>

<template>
    <div>
        <el-row class="mb-20px">
            <el-space>
                <el-form ref="searchFormRef" :model="searchParam" inline>
                    <el-form-item label="类型" prop="type">
                        <el-input v-model="searchParam.type"/>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="searchParam.name"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                        <el-button @click="handleSearchReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-space>

            <el-button>导入</el-button>
            <el-button>导出</el-button>
        </el-row>
        <el-table
            class="mb-20px"
            v-loading="table.loading"
            :data="table.list"
        >
            <el-table-column
                prop="parent"
                label="父类型">
                <template #default="scope">
                    {{ scope.row.parentName }}
                </template>
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称">
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="description"
                label="描述">
            </el-table-column>
        </el-table>

        <Pagination
            :total="table.count"
            v-model:page="page.page"
            v-model:size="page.size"
            @pagination="getList"
        />
    </div>
</template>

<style scoped>

</style>