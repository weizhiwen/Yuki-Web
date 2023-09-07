<script setup>
import DictDataFormDrawer from "@/views/dict/components/DictDataFormDrawer.vue";
import {disable, enable, listAll, sort} from "@/api/dict/data";
import {ElMessage} from "element-plus";
import Sortable from 'sortablejs';

const drawerRef = ref(null)
const isShow = ref(false)

defineExpose({
    isShow,
})

const props = defineProps({
    dictType: Object,
})

const searchParam = ref({
    searchKeyword: '',
    onlyShowEnabled: true,
})

const handleSearch = () => {
}

const handleOnKeywordClear = () => {
}

const filterTableList = () => {
    const {searchKeyword, onlyShowEnabled} = searchParam.value
    return table.value.list.filter(item => {
        const containsKeyword = item.code.includes(searchKeyword) || item.name.includes(searchKeyword)
        const isEnabled = !item.disabled
        return containsKeyword && (isEnabled || !onlyShowEnabled)
    })
}

const tableList = computed(() => {
    return filterTableList()
})


const rowDrop = function () {
    const tbody = document.querySelector('#draggable .el-table__body-wrapper tbody');
    Sortable.create(tbody, {
        //  可被拖拽的子元素
        draggable: "#draggable .el-table__row",
        onEnd({newIndex, oldIndex}) {
            console.log('oldIndex', oldIndex, 'newIndex', newIndex)
            const currRow = tableList.value.splice(oldIndex, 1)[0];
            tableList.value.splice(newIndex, 0, currRow);
            let ids = tableList.value.map(item=>item.id)
            console.log('ids', ids)
            sort(ids)
        }
    });
}

const updateDataId = ref(null)

const table = ref({
    loading: false,
    list: [],
})

const getList = () => {
    table.value.loading = true
    listAll({"dictType.id": props.dictType.id, "sort": "idx"}).then(res => {
        table.value.list = res
        table.value.loading = false
    })
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

const handleOnChangeStatus = async (id, disabled) => {
    if (disabled) {
        enable(id).then(() => {
            ElMessage({message: "启用成功", type: 'success'})
            getList()
        });
    } else {
        disable(id).then(() => {
            ElMessage({message: "禁用成功", type: 'success'})
            getList()
        });
    }
}

const handleOnOpen = async () => {
    await getList()
    filterTableList()
    rowDrop()
}

const formRef = ref(null)

const handleOnClose = () => {
    formRef.value.resetFields()
    isShow.value = false
}

</script>

<template>
    <el-drawer
        ref="drawerRef"
        v-model="isShow"
        :title="dictType.name +  '字典数据'"
        size="600"
        @open="handleOnOpen"
        :before-close="handleOnClose"
        id="draggable"
    >
        <el-row class="flex justify-between items-top">
            <el-form ref="formRef" :model="searchParam" inline>
                <el-form-item prop="searchKeyword">
                    <el-input
                        v-model="searchParam.searchKeyword"
                        placeholder="编码或名称"
                        clearable
                        @clear="handleOnKeywordClear"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item prop="onlyShowEnabled">
                    <el-checkbox v-model="searchParam.onlyShowEnabled"
                                 @change="handleSearch">
                        仅显示已启用数据
                    </el-checkbox>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="handleOnCreate">添加</el-button>
        </el-row>
        <el-table
            v-loading="table.loading"
            :data="tableList"
        >
            <el-table-column v-if="dictType.parentId" prop="parentName" label="父类型"/>
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
            <el-table-column prop="description" label="描述"/>
            <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" @click.stop="handleOnUpdate(scope.row.id)">修改</el-button>
                    <el-button link
                               :type="scope.row.disabled ? 'success' : 'danger'"
                               @click.stop="handleOnChangeStatus(scope.row.id, scope.row.disabled)">
                        {{ scope.row.disabled ? '启用' : '禁用' }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-drawer>
    <DictDataFormDrawer ref="formDrawerRef" @getList="getList" :dict-type="dictType" :update-data-id="updateDataId"/>
</template>
<style scoped>

</style>