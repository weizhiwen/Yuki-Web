<script setup>
import {create, detail, search, update} from "@/api/dict";
import {ElMessage} from "element-plus";

const formRef = ref(null)

const formParam = ref({
    id: null,
    parentId: null,
    type: null,
    name: null,
    description: null,
    disabled: false
})

const paramRules = ref({
    type: [{required: true, trigger: 'blur', message: '请输入类型'}],
    name: [{required: true, trigger: 'blur', message: '请输入名称'}]
})

const isShow = ref(false)

const drawerRef = ref(null)

const handleDrawerClose = () => {
    formRef.value.resetFields()
    formParam.value.id = null
    isShow.value = false
    handleSelectClear()
}

const handleSelectClear = () => {
    parentTypeData.value.loading = false
    parentTypeData.value.list = []
    parentTypeData.value.keyword = ''
}

const handleRemoteMethod = (query) => {
    if (query) {
        getParentTypeList(query)
    }
}

const parentTypeData = ref({
    keyword: '',
    loading: false,
    list: []
})

const getParentTypeList = (query) => {
    search({
        keyword: query,
    }).then((res) => {
        parentTypeData.value.list = res.list
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
            await emit('getList')
        }
    })
}



const props = defineProps({
    updateDataId: Number
})

const handleOnOpen = () => {
    if (props.updateDataId) {
        parentTypeData.value.loading = true
        detail(props.updateDataId).then(data => {
            formParam.value = data
            if (data.parentId) {
                parentTypeData.value.list = [{
                    id: data.parentId,
                    type: data.parentType,
                    name: data.parentName,
                    builtin: data.parentBuiltin,
                }]
            }
            parentTypeData.value.loading = false
        })
    }
}

const emit = defineEmits(['getList'])

defineExpose({
    isShow,
    formParam
})

</script>

<template>
    <el-drawer
        ref="drawerRef"
        v-model="isShow"
        :before-close="handleDrawerClose"
        @open="handleOnOpen"
        :title="updateDataId ? '修改字典类型' : '添加字典类型'"
        size="50%"
    >
        <el-form ref="formRef" :model="formParam" :rules="paramRules">
            <el-form-item label="父类型" prop="parentId">
                <el-select v-model="formParam.parentId"
                           @clear="handleSelectClear"
                           clearable
                           filterable
                           remote
                           reserve-keyword
                           :remote-method="handleRemoteMethod"
                           placeholder="请输入类型或名称"
                >
                    <el-option
                        v-for="item in parentTypeData.list"
                        :key="item.id"
                        :label="item.type + '-' + item.name + ' ' + (item.builtin ? '系统内置' : '用户自定义')"
                        :value="item.id">
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
            <el-form-item prop="disabled">
                <el-switch :model-value="!formParam.disabled" inline-prompt active-text="启用" inactive-text="禁用"
                           @change="() => formParam.disabled = !formParam.disabled"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleOnSave">保存</el-button>
                <el-button @click="drawerRef.handleClose()">取消</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<style scoped>

</style>