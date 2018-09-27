<template>
    <page>
        <div slot="toolbar"  class="fixclear">
            <div class="serch-box float-right">
                <el-input placeholder="输入需求id查询" v-model="currentId" prefix-icon="el-icon-search" clearable  @change="serchId">
                </el-input>
            </div>
            <div class="showdeleted-box float-right">
                <el-checkbox v-model="showDeleted">显示已删除项</el-checkbox>
            </div>
        </div>
        <div slot="content">
            <el-tabs type="border-card" @tab-click="changeTab">
                <el-tab-pane v-for="tab in tabMenu" :label="tab.label" :key="tab.index" lazy>
                    <story-list :index="tab.index" :activedIndex="activedIndex" :condition="condition" :showDeleted="showDeleted" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </page>
</template>

<script>
import axios from 'axios';
import StoryList from './StoryList';
import Page from '@/components/public/Page';
export default {
    name: 'Story',
    components: {
        StoryList,
        Page
    },
    data() {
        return {
            activedIndex: 0,
            currentId: '',
            currentIdCondition: [],
            showDeleted: false,
            currentShowDeletedCondition: [{ name: 'deleted', value: '0' }],//默认显示未删除
        };
    },
    computed: {
        tabMenu() {
            return this.$store.state.menuList[this.$store.state.activedIndex]
                .child.menuList;
        },
        condition() {
            return []
                .concat(this.currentIdCondition)
                .concat(this.currentShowDeletedCondition);
        }
    },
    methods: {
        changeTab(tab, event) {
            this.activedIndex = tab.index;
        },
        serchId() {
            if (this.currentId) {
                this.currentIdCondition = [
                    { name: 'id', value: this.currentId }
                ];
            } else {
                this.currentIdCondition = [];
            }
        }
    },
    created() {},
    watch: {
        showDeleted() {
            if (this.showDeleted) {
                this.currentShowDeletedCondition = [];
            } else {
                this.currentShowDeletedCondition = [
                    { name: 'deleted', value: '0' }
                ];
            }
        }
    }
};
</script>

<style scoped>
.serch-box {
    width: 200px;
}
.project-box {
    float: left;
}
.showdeleted-box {
    line-height: 40px;
    margin-right: 10px;
}
</style>
