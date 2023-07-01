<script setup>
const props = defineProps({
    total: {
        required: true,
        type: Number,
    },
    page: {
        default: 0,
        type: Number,
    },
    size: {
        default: 20,
        type: Number,
    }
})
const emit = defineEmits();

const currentPage = computed({
    get() {
        return props.page + 1;
    },
    set(val) {
        emit('update:page', val - 1)
    }
});
const pageSize = computed({
    get() {
        return props.size;
    },
    set(val) {
        emit('update:size', val)
    }
});
const handleCurrentChange = (val) => {
    emit('pagination', {page: val, size: props.pageSize})
}

const handleSizeChange = (val) => {
    console.log(val)
    emit('pagination', {page: props.page, size: val})
}
</script>
<template>
    <el-pagination
        class="justify-end"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
    />
</template>