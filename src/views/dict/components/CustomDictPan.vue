<script setup>
import Pagination from "@/components/pagination/Index.vue";
import {create, deleteMultiple, deleteOne, detail, search, update} from "@/api/dict";
import {ElMessage} from "element-plus";
import {Search} from "@element-plus/icons-vue";

const searchFormRef = ref(null)

const searchParam = ref({
    keyword: undefined,
    enabled: true,
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

const drawerRef = ref(null)

const drawer = ref({
    isShow: false,
    title: "添加字典类型",
    updateForm: false,
})

const formRef = ref(null)

const formParam = ref({
    id: null,
    parentId: null,
    type: null,
    name: null,
    description: null,
    enabled: true
})

const paramRules = ref({
    type: [{required: true, trigger: 'blur', message: '请输入类型'}],
    name: [{required: true, trigger: 'blur', message: '请输入名称'}]
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
    await search(searchParam.value, page.value).then(res => {
        table.value = res
        table.value.loading = false
    })
}

const handleOnCreate = () => {
    drawer.value.isShow = true
}

const handleOnUpdate = (id) => {
    drawer.value.isShow = true
    drawer.value.title = "修改字典类型"
    drawer.value.updateForm = true
    detail(id).then(data => {
        formParam.value = data
    })
}

const handleOnDelete = async (id) => {
    await deleteOne(id).then(() => {
        ElMessage({message: "删除成功", type: 'success'})
    }).finally(() => {
        getList()
    })
}

const handleSearch = async () => {
    await getList()
}

const handleSelectionChange = (array) => {
    selectedIds.value = []
    for (let item of array) {
        selectedIds.value.push(item.id)
    }
}

const handleOnDeleteMultiple = async () => {
    await deleteMultiple(selectedIds.value).then(() => {
        ElMessage({message: "删除成功", type: 'success'})
    }).finally(() => {
        getList()
    })
}

const handleOnSave = async () => {
    formRef.value.validate(async valid => {
        if (valid) {
            let param = formParam.value
            let id = param.id;
            if (id) {
                await update(id, param)
                ElMessage({message: "更新成功", type: 'success'})
            } else {
                await create(param)
                ElMessage({message: "添加成功", type: 'success'})
            }
            drawerRef.value.handleClose()
            await getList()
        }
    })
}

const handleDrawerClose = () => {
    formRef.value.resetFields()
    formParam.value.id = null
    drawer.value.isShow = false
}

const handleSearchReset = async () => {
    searchFormRef.value.resetFields()
    await getList();
}

const parentType = ref({
    keyword: '',
    loading: false,
    list: []
})

const getParentTypeList = (query) => {
    search({
        keyword: query,
    }).then((res) => {
        parentType.value.list = res.list
    })
}

const handleRemoteMethod = (query) => {
    if (query) {
        getParentTypeList(query)
    }
}

</script>

<template>
    <div>
        <el-row class="mb-20px flex-between">
            <el-form ref="searchFormRef" :model="searchParam" inline>
                <el-form-item>
                    <el-input v-model="searchParam.keyword" placeholder="类型或名称" clearable
                              @clear="handleSearchReset">
                        <template #append>
                            <el-button :icon="Search" @click="handleSearch"/>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="searchParam.enabled" @change="handleSearch"></el-switch>
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
                prop="enabled"
                label="启用">
                <template #default="scope">
                    <el-switch v-model="scope.row.enabled" :before-change="()=>false"/>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit" @click="handleOnUpdate(scope.row.id)">修改</el-button>
                    <el-button link type="primary" icon="Delete" @click="handleOnDelete(scope.row.id)">删除</el-button>
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
    <el-drawer
        ref="drawerRef"
        v-model="drawer.isShow"
        :before-close="handleDrawerClose"
        :title="drawer.title"
        size="50%"
    >
        <el-form ref="formRef" :model="formParam" :rules="paramRules">
            <el-form-item label="父类型" prop="parentId">
                <el-select v-model="formParam.parentId"
                           clearable
                           filterable
                           remote
                           reserve-keyword
                           :remote-method="handleRemoteMethod"
                >
                    <el-option
                        v-for="item in parentType.list"
                        :key="item.id"
                        :label="item.type + '-' + item.name"
                        :value="item.id">
                        <span>{{ item.type + "-" + item.name }} ({{ item.builtin ? '系统内置' : '用户自定义' }})</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-input v-model="formParam.type"/>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="formParam.name"/>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="formParam.description" type="textarea"/>
            </el-form-item>
            <el-form-item label="启用" prop="enabled">
                <el-switch v-model="formParam.enabled"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleOnSave">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<style scoped>

</style>