<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const hasChildren = (item) => {
    return item.children && item.children.length > 0
}
</script>

<template>
    <el-sub-menu v-if="hasChildren(item)" :index="item.index">
        <template #title>
            {{item.name}}
        </template>
        <MenuItem
            v-for="(child, i) in item.children"
            :key="i + child.index"
            :item="child"
        />
    </el-sub-menu>
    <el-menu-item v-else :index="item.index">
        <template #title>
            {{item.name}}
        </template>
    </el-menu-item>
</template>

<style scoped>

</style>