<template>
    <div class="content-box">
        <div class="toolbar">
            <slot name="toolbar"></slot>
        </div>
        <slot name="content"></slot>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
.content-box {
    max-width: 1366px;
    margin: 0 auto;
}
.toolbar {
    padding: 10px;
    padding-top: 30px;
}
</style>
