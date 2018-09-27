<template>
    <page>
        <div slot="toolbar" class="fixclear">
            <div class="serch-box float-right">
                <el-input placeholder="输入用户名查询" v-model="currentUser" prefix-icon="el-icon-search" clearable @change="serchUser">
                </el-input>
            </div>
            <div class="project-box float-right">
                <el-select v-model="currentProjectId" filterable clearable placeholder="选择项目">
                    <el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id" v-if="item.deleted == '0' || showDeleted">
                    </el-option>
                </el-select>
            </div>
            <div class="showdeleted-box float-right">
                <el-checkbox v-model="showDeleted">显示已删除项</el-checkbox>
            </div>
        </div>
        <div slot="content">
            <el-tabs type="border-card" @tab-click="changeTab">
                <el-tab-pane v-for="tab in tabMenu" :label="tab.label" :key="tab.index" lazy>
                    <task-list :index="tab.index" :activedIndex="activedIndex" :condition="condition" :showDeleted="showDeleted"/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </page>
</template>

<script>
import axios from 'axios';
import TaskList from './TaskList';
import Page from '@/components/public/Page';
export default {
    name: 'Task',
    components: {
        TaskList,
        Page
    },
    data() {
        return {
            currentUser: '',
            currentUserCondition: [],
            currentTaskTypeCondition: [],
            currentProjectIdCondition: [],
            currentShowDeletedCondition: [{ name: 'deleted', value: '0' }],//默认显示未删除
            currentProjectId: '',
            activedIndex: 0,
            showDeleted: false,
            taskConsitionTypes: [
                [],
                [{ name: 'status', value: 'doing' }],
                [{ name: 'status', value: 'wait' }],
                [{ name: 'status', value: 'done' }],
                [{ name: 'status', value: 'cancel' }],
                [{ name: 'status', value: 'pause' }]
            ]
        };
    },
    computed: {
        tabMenu() {
            return this.$store.getters.tabMenu;
        },
        condition() {
            return []
                .concat(this.currentTaskTypeCondition)
                .concat(this.currentUserCondition)
                .concat(this.currentProjectIdCondition)
                .concat(this.currentShowDeletedCondition);
        },
        projectList() {
            return this.$store.state.projectList;
        }
    },
    methods: {
        changeTab(tab, event) {
            this.activedIndex = tab.index;
            this.currentTaskTypeCondition = this.taskConsitionTypes[tab.index];
        },
        serchUser() {
            if (this.currentUser) {
                this.currentUserCondition = [
                    { name: 'assignedTo', value: this.currentUser }
                ];
            } else {
                this.currentUserCondition = [];
            }
        }
    },
    watch: {
        currentProjectId() {
            if (this.currentProjectId) {
                this.currentProjectIdCondition = [
                    { name: 'project', value: this.currentProjectId }
                ];
            } else {
                this.currentProjectIdCondition = [];
            }
        },
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
    margin-left: 10px;
}
.showdeleted-box{
    line-height: 40px;
    margin-right: 10px;
}
</style>
