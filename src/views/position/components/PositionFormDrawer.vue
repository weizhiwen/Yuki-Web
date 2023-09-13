<script setup>
import {create, detail, update} from "@/api/position";
import {ElMessage} from "element-plus";
import {hierarchy} from "@/api/department";
import {listAllByDictType} from '@/api/dict/data';
import {POSITION_PROPERTY} from "@/utils/constant";

const formRef = ref(null)

const formParam = ref({
    id: null,
    departmentId: null,
    code: null,
    name: null,
    title: null,
    property: null,
    description: null,
    disabled: false
})

const paramRules = ref({
    departmentId: [{required: true, trigger: 'blur', message: '请选择部门'}],
    code: [{required: true, trigger: 'blur', message: '请输入编码'}],
    name: [{required: true, trigger: 'blur', message: '请输入名称'}]
})

const isShow = ref(false)

const drawerRef = ref(null)

const handleDrawerClose = () => {
    formRef.value.resetFields()
    formParam.value.id = null
    isShow.value = false
}

const handleOnSave = async () => {
    formRef.value.validate(async valid => {
        if (valid) {
            console.log('表单数据：', formParam.value)
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

const departmentHierarchy = ref([])

const getHierarchy = async () => {
    const res = await hierarchy()
    departmentHierarchy.value = [res]
    console.log(departmentHierarchy.value)
}

const propertyList = ref({
    list: [],
    loading: false
})

const getPropertyList = async () => {
    propertyList.value.loading = true
    listAllByDictType(POSITION_PROPERTY)
        .then((res) => {
            propertyList.value.list = res
        })
        .finally(() => {
            propertyList.value.loading = false
        })
}

onMounted(() => {
    getHierarchy()
    getPropertyList()
})

const props = defineProps({
    updateDataId: Number
})

const handleOnOpen = () => {
    if (props.updateDataId) {
        detail(props.updateDataId).then(data => {
            formParam.value = data
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
        :title="updateDataId ? '修改岗位' : '添加岗位'"
        size="50%"
    >
        <el-form ref="formRef" :model="formParam" :rules="paramRules">
            <el-form-item label="部门" prop="code">
                <el-tree-select class="w-full"
                                v-model="formParam.departmentId"
                                :data="departmentHierarchy"
                                :props="{value: 'id', label: 'name', children: 'children'}"
                                value-key="id"
                                node-key="id"
                                placeholder="请选择部门"
                                clearable
                                :render-after-expand="false"
                                show-checkbox
                                check-strictly
                />
            </el-form-item>
            <el-form-item label="编码" prop="code">
                <el-input v-model="formParam.code"/>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="formParam.name"/>
            </el-form-item>
            <el-form-item label="头衔" prop="title">
                <el-input v-model="formParam.title"/>
            </el-form-item>
            <el-form-item label="性质" prop="property">
                <el-select class="w-full" v-model="formParam.property">
                    <el-option
                        v-for="item in propertyList.list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
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