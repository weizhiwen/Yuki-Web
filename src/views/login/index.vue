<script setup>

import {Lock, UserFilled} from "@element-plus/icons-vue";
import {login} from "@/api/user";
import router from "@/router";

const loading = ref(false)
const loginForm = ref({
    loginName: 'yuki',
    password: '123456',
})

const loginRef = ref(null)

const loginRules = ref({
    loginName: [{required: true, trigger: 'blur', message: '请输入您的手机号或邮箱'}],
    password: [{required: true, trigger: 'blur', message: '请输入您的密码'}]
})

const handleLogin = () => {
    loginRef.value.validate(valid => {
        if (valid) {
            loading.value = true
            login(loginForm.value).then(() => {
                router.push('/home')
            }).catch(() => {
                loading.value = false
            })
        }
    })

}
</script>

<template>
    <div class="w-full h-screen flex-center bg-fuchsia-2">
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="bg-white w-[300px] p-[25px] rounded">
            <h3 class="text-center color-fuchsia">Yuki后台管理系统</h3>
            <el-form-item prop="loginName">
                <el-input v-model="loginForm.loginName" type="input" size="large" autocomplete="off"
                          placeholder="用户名">
                    <template #prepend>
                        <el-button :icon="UserFilled"/>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="input" size="large" autocomplete="off" placeholder="密码"
                          @keyup.enter="handleLogin">
                    <template #prepend>
                        <el-button :icon="Lock"/>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="w-full">
                <el-button :loading="loading" size="large" type="primary" @click.prevent="handleLogin" class="w-full">
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form-item>
        </el-form>
        <footer class="w-full fixed bottom-0 text-center h-[40px] line-h-[40px]">
            <span>Copyright © 2023 Yuki All Rights Reserved.</span>
        </footer>
    </div>
</template>

<style scoped></style>