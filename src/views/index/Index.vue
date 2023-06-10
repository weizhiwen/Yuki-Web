<script setup>
import {test} from "@/api/auth";

const message = ref(null)
onMounted(async () => {
    message.value = await test()
})
</script>

<template>
    <h1>{{ message }}</h1>
</template>

<style scoped>

</style>