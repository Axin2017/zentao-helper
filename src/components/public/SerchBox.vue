<template>
    <el-input :placeholder="placeholder" v-model="key" prefix-icon="el-icon-search" clearable  @keyup.enter.native="serch" @change="serch">
    </el-input>
</template>
<script>
export default {
    name: 'SerchBox',
    props: ['placeholder'],
    data() {
        return {
            key: ''
        };
    },
    methods: {
        serch() {
            this.$emit('input',this.key);
        }
    }
};
</script>
<style scoped>
</style>
