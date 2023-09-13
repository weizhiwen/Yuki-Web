<script setup>

import {remove, search} from "@/api/position";
import {ElMessage} from "element-plus";
import FormDrawer from "./components/PositionFormDrawer.vue";

const searchParam = ref({
    departmentId: undefined,
    code: undefined,
    name: undefined,
    property: undefined,
    page: 1,
    size: 20,
})

const page = ref({
    page: 0,
    size: 20
})

const handleSearchReset = () => {

}

const handleSearch = () => {

}

const onlyShowEnabled = ref(true)

const handleOnCreate = () => {
    formDrawerRef.value.isShow = true
    updateDataId.value = null
}

const selectedIds = ref([])

const deleteDisabled = computed(() => {
    return selectedIds.value.length === 0
})

const handleOnDeleteMultiple = async () => {
    await remove(selectedIds.value).then(() => {
        ElMessage({message: "删除成功", type: 'success'})
    }).finally(() => {
        getList()
    })
}

const getList = async () => {
    table.value.loading = true
    await search(searchParam.value, page.value)
        .then(res => {
            table.value = res
        }).finally(() => {
            table.value.loading = false
        })
}

const table = ref({
    loading: false,
    count: 0,
    list: [],
})

const formDrawerRef = ref(null)

const updateDataId = ref(null)

const handleSelectionChange = (array) => {
    selectedIds.value = []
    for (let item of array) {
        selectedIds.value.push(item.id)
    }
}

const handleRowClick = (row) => {
}

const handleOnUpdate = (row) => {
    formDrawerRef.value.isShow = true
    updateDataId.value = id
}

const handleOnDelete = (row) => {

}
</script>

<template>
    <div>
        <el-container>
            <el-aside width="200px" class="pt-20px">
                <el-form ref="searchFormRef" :model="searchParam" inline>
                    <el-form-item>
                        <el-checkbox v-model="onlyShowEnabled"
                                     @change="handleSearch">
                            仅显示已启用岗位
                        </el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searchParam.departmentId" placeholder="部门"
                                  @clear="handleSearchReset">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searchParam.code" placeholder="编码"
                                  @clear="handleSearchReset">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searchParam.name" placeholder="名称"
                                  @clear="handleSearchReset">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="searchParam.property" placeholder="性质"
                                  @clear="handleSearchReset">
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-aside>
            <el-main>
                <el-row justify="end">
                    <el-button type="primary" @click="handleOnCreate">添加</el-button>
                    <el-button :disabled="deleteDisabled" @click="handleOnDeleteMultiple">删除</el-button>
                    <el-button>导入</el-button>
                    <el-button>导出</el-button>
                    <el-button @click="getList">刷新</el-button>
                </el-row>
                <el-table
                    class="mb-20px"
                    v-loading="table.loading"
                    :data="table.list"
                    @selection-change="handleSelectionChange"
                    @row-click="handleRowClick"
                >
                    <el-table-column type="selection" width="40"/>
                    <el-table-column prop="departmentName" label="部门"/>
                    <el-table-column prop="code" label="编码"/>
                    <el-table-column prop="name" label="名称"/>
                    <el-table-column prop="property" label="性质">
                        <template #default="scope">
                            {{scope.row.property?.name}}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="description" label="描述"/>
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
                    v-model:page="searchParam.page"
                    v-model:size="searchParam.size"
                    @pagination="getList"
                />
            </el-main>
        </el-container>
    </div>
    <FormDrawer ref="formDrawerRef" @getList="getList" :updateDataId="updateDataId"></FormDrawer>
</template>

<style scoped>

</style>