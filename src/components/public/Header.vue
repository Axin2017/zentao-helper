<template>
    <div class="header">
        <span class="logo"><img src="../../../static/images/logo.png" />
        <span class="department">开发中心</span>
        </span>
        <el-menu :default-active="activeIndex+''" router class="main-header-box" mode="horizontal" @select="handleSelect">
            <el-menu-item v-for="menu in menuList" :index="menu.index+''" :key="menu.index" class="main-menu" :route="{path:menu.router}">
                {{menu.label}}
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: 'Header',
    methods: {
        handleSelect(key, keyPath) {
            this.$store.commit('menuChanged', key);
        }
    },
    created() {
        //直接进入某个路由
        for (let i = 0; i < this.menuList.length; i++) {
            if (
                this.$router.history.current.fullPath == this.menuList[i].router
            ) {
                this.handleSelect(this.menuList[i].index);
                break;
            }
        }
    },
    computed: {
        menuList() {
            return this.$store.state.menuList;
        },
        activeIndex() {
            return this.$store.state.activedIndex;
        }
    }
};
</script>
<style scoped>
.header {
    max-width: 1366px;
    margin: 0 auto;
    position: relative;
}
.main-header-box {
    display: flex;
    justify-content: center;
    border-bottom: none;
}
.main-menu {
    font-size: 16px;
}
.logo {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    left: 60px;
}
.department{
    display: block;
    font-family: 方正姚体,微软雅黑;
    text-align: center;
    font-size: 16px;
    color: #0071BC;
}
</style>
