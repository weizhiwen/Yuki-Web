<script setup>
import {listAll, create, detail, update} from "@/api/dict/data";
import {ElMessage} from "element-plus";

const props = defineProps({
    updateDataId: Number,
    dictType: {
        type: Object,
        required: true
    }
})

const formRef = ref(null)

const formParam = ref({
    id: null,
    dictTypeId: null,
    parentCode: null,
    code: null,
    name: null,
    description: null,
    disabled: false
})

const paramRules = ref({
    parentCode: [{required: true, trigger: 'blur', message: '请选择父类型编码'}],
    code: [{required: true, trigger: 'blur', message: '请输入编码'}],
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
    parentData.value.loading = false
    parentData.value.list = []
}



const handleRemoteMethod = (query) => {
    if (query) {
        getParentDataList(query)
    }
}

const parentData = ref({
    loading: false,
    list: []
})

const getParentDataList = async (query) => {
    await listAll({"dictType.id": props.dictType.parentId, keyword: query}).then(res => {
        parentData.value.list = res
        parentData.value.loading = false
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


const handleOnOpen = () => {
    console.log('props dictType id ' + props.dictType.id)
    formParam.value.dictTypeId = props.dictType.id
    if (props.updateDataId) {
        parentData.value.loading = true
        detail(props.updateDataId).then(data => {
            formParam.value = data
            if (data.parentId) {
                parentData.value.list = [{
                    code: data.parentCode,
                    name: data.parentName,
                }]
            }
            parentData.value.loading = false
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
        :append-to-body="true"
        v-model="isShow"
        :before-close="handleDrawerClose"
        @open="handleOnOpen"
        :title="updateDataId ? '修改字典数据' : '添加字典数据'"
        size="500"
    >
        <el-form ref="formRef" :model="formParam" :rules="paramRules">
            <el-form-item v-if="dictType.parentId" label="父类型" prop="parentCode">
                <el-select class="w-full" v-model="formParam.parentCode"
                           @clear="handleSelectClear"
                           clearable
                           filterable
                           remote
                           reserve-keyword
                           :disabled="updateDataId"
                           :remote-method="handleRemoteMethod"
                           placeholder="请输入类型或名称"
                >
                    <el-option
                        v-for="item in parentData.list"
                        :key="item.id"
                        :label="`${item.dictTypeName}-${item.code}-${item.name}`"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="编码" prop="code">
                <el-input :disabled="updateDataId" v-model="formParam.code"/>
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