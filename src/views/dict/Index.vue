<script setup>
import {searchDictTypes} from "@/api/dict";
import Pagination from '@/components/pagination/Index.vue'

const search = ref({
    code: undefined,
    name: undefined,
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
    await searchDictTypes(search.value, page.value).then(res => {
        table.value = res
        table.value.loading = false
    })
}
</script>
<template>
    <div>
        <el-form inline>
            <el-form-item label="编码">
                <el-input/>
            </el-form-item>
            <el-form-item label="名称">
                <el-input/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="mb-20px">
            <el-button>添加</el-button>
            <el-button>删除</el-button>
            <el-button>导入</el-button>
            <el-button>导出</el-button>
            <el-button>刷新</el-button>
        </el-row>
        <el-table
            class="mb-20px"
            v-loading="table.loading"
            :data="table.list">
            <el-table-column type="selection" width="40"/>
            <el-table-column
                prop="code"
                label="编码">
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
            <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit">修改</el-button>
                    <el-button link type="primary" icon="Delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <Pagination
            v-show="table.count > 0"
            :total="table.count"
            v-model:page="page.page"
            v-model:size="page.size"
            @pagination="getList"
        />
    </div>
</template>

<style scoped>

</style>