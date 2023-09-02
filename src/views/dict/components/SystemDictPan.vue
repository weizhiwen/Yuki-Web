<script setup>
import Pagination from "@/components/pagination/Index.vue";
import {search} from "@/api/dict";
import {Search} from "@element-plus/icons-vue";
import DictDataDrawer from "@/views/dict/components/DictDataDrawer.vue";

const searchFormRef = ref(null)

const searchParam = ref({
    keyword: undefined,
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

const dictDataDrawerRef = ref(null)
const dictTypeName = ref('')
const handleRowClick = (row) => {
    dictTypeName.value = row.name
    dictDataDrawerRef.value.isShow = true
}
</script>

<template>
    <div>
        <el-row class="mb-20px">
            <el-form ref="searchFormRef" :model="searchParam" inline>
                <el-form-item>
                    <el-input v-model="searchParam.keyword" placeholder="类型或名称" clearable
                              @clear="handleSearchReset">
                        <template #append>
                            <el-button :icon="Search" @click="handleSearch"/>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-row>
        <el-table
            class="mb-20px"
            v-loading="table.loading"
            :data="table.list"
            @row-click="handleRowClick"
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
    <DictDataDrawer ref="dictDataDrawerRef" :dictTypeName="dictTypeName"></DictDataDrawer>
</template>

<style scoped>

</style>