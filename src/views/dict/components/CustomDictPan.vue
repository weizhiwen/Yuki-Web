<script setup>
import Pagination from "@/components/pagination/Index.vue";
import {remove, list} from "@/api/dict/type";
import {ElMessage} from "element-plus";
import {Search} from "@element-plus/icons-vue";
import FormDrawer from "@/views/dict/components/DictTypeFormDrawer.vue";
import DictDataDrawer from "@/views/dict/components/DictDataListDrawer.vue";

const searchFormRef = ref(null)

const searchParam = ref({
    keyword: undefined,
    disabled: false,
    builtin: false,
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


const selectedIds = ref([])

const deleteDisabled = computed(() => {
    return selectedIds.value.length === 0
})

onMounted(async () => {
    await getList()
})

const getList = async () => {
    table.value.loading = true
    await list(searchParam.value, page.value).then(res => {
        table.value = res
        table.value.loading = false
    })
}

const updateDataId = ref(null)

const handleOnDelete = async (id) => {
    await remove([id]).then(() => {
        ElMessage({message: "删除成功", type: 'success'})
    }).finally(() => {
        getList()
    })
}

const onlyShowEnabled = ref(true)

const handleSearch = async () => {
    searchParam.value.disabled = onlyShowEnabled.value ? false : undefined;
    await getList()
}

const handleSelectionChange = (array) => {
    selectedIds.value = []
    for (let item of array) {
        selectedIds.value.push(item.id)
    }
}

const handleOnDeleteMultiple = async () => {
    await remove(selectedIds.value).then(() => {
        ElMessage({message: "删除成功", type: 'success'})
    }).finally(() => {
        getList()
    })
}

const handleSearchReset = async () => {
    searchFormRef.value.resetFields()
    await getList();
}

const formDrawerRef = ref(null)

const handleOnCreate = () => {
    formDrawerRef.value.isShow = true
    updateDataId.value = null
}

const handleOnUpdate = (id) => {
    formDrawerRef.value.isShow = true
    updateDataId.value = id
}

const dictDataDrawerRef = ref(null)
const dictType = ref({})
const handleRowClick = (row) => {
    dictType.value = row
    dictDataDrawerRef.value.isShow = true
}

</script>

<template>
    <div>
        <el-row class="flex justify-between items-top">
            <el-form ref="searchFormRef" :model="searchParam" inline>
                <el-form-item>
                    <el-input v-model="searchParam.keyword" placeholder="类型或名称" clearable
                              @clear="handleSearchReset">
                        <template #append>
                            <el-button :icon="Search" @click="handleSearch"/>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="onlyShowEnabled"
                                 @change="handleSearch">
                        仅显示已启用数据
                    </el-checkbox>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="primary" @click="handleOnCreate">添加</el-button>
                <el-button :disabled="deleteDisabled" @click="handleOnDeleteMultiple">删除</el-button>
                <el-button>导入</el-button>
                <el-button>导出</el-button>
            </div>
        </el-row>
        <el-table
            class="mb-20px"
            v-loading="table.loading"
            :data="table.list"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick"
        >
            <el-table-column type="selection" width="40"/>
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
            <el-table-column
                prop="disabled"
                label="状态">
                <template #default="scope">
                    <el-tag v-if="!scope.row.disabled" type="success">启用</el-tag>
                    <el-tag v-else type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" @click.stop="handleOnUpdate(scope.row.id)">修改</el-button>
                    <el-button link type="primary" @click.stop="handleOnDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <Pagination
            :total="table.count"
            v-model:page="page.page"
            v-model:size="page.size"
            @pagination="getList"
        />
    </div>
    <FormDrawer ref="formDrawerRef" @getList="getList" :updateDataId="updateDataId"></FormDrawer>
    <DictDataDrawer ref="dictDataDrawerRef" :dict-type="dictType"></DictDataDrawer>
</template>

<style scoped>

</style>