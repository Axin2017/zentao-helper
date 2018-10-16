<template>
    <page>
        <div slot="toolbar" class="fixclear">
            <div class="serch-box float-right">
                <el-input placeholder="输入用户名查询" v-model="currentUser" prefix-icon="el-icon-search" clearable @change="serchUser">
                </el-input>
            </div>
            <div class="time-box float-right">
                <el-date-picker v-model="storyTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="storyTimeOption">
                </el-date-picker>
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
            currentUser: '',
            currentUserCondition: [],
            currentProjectId: '',
            currentProjectIdCondition: [],
            showDeleted: false,
            currentShowDeletedCondition: [{ name: 'deleted', value: '0' }], //默认显示未删除
            storyTime: '',
            storyTimeCondition: [],
            storyTypesCondition:[{ name: 'status', value: 'developing' }],//默认显示正在研发
            storyTypesConsition: [
                [{ name: 'status', value: 'developing' }],
                [],
                [{ name: 'status', value: 'wait' }],
                [{ name: 'status', value: 'testing' }],
                [{ name: 'status', value: 'tested' }],
                [{ name: 'status', value: 'projected' }],
                [{ name: 'status', value: 'released' }],
                [{ name: 'status', value: 'developed' }],
                [{ name: 'status', value: 'closed' }],
                [{ name: 'status', value: 'cancel' }]
            ],
            storyTimeOption: {
                shortcuts: [
                    {
                        text: '最近三天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 3
                            );
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            }
        };
    },
    computed: {
        tabMenu() {
            return this.$store.state.menuList[this.$store.state.activedIndex]
                .child.menuList;
        },
        condition() {
            return []
                .concat(this.currentUserCondition)
                .concat(this.currentShowDeletedCondition)
                .concat(this.currentProjectIdCondition)
                .concat(this.storyTypesCondition)
                .concat(this.storyTimeCondition);
        },
        projectList() {
            return this.$store.state.projectList;
        }
    },
    methods: {
        changeTab(tab, event) {
            this.activedIndex = tab.index;
            this.storyTypesCondition=this.storyTypesConsition[tab.index];
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
        },
        currentProjectId() {
            if (this.currentProjectId) {
                this.currentProjectIdCondition = [
                    { name: 'project', value: this.currentProjectId }
                ];
            } else {
                this.currentProjectIdCondition = [];
            }
        },
        storyTime(){
            if(this.storyTime){
                const startDate=this.storyTime[0].formart('yyyy-MM-dd');
                const endDate=this.storyTime[1].formart('yyyy-MM-dd');
                this.storyTimeCondition=[{name:'startDate',value:startDate},{name:'endDate',value:endDate}]
            }else{
                this.storyTimeCondition=[]
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
.time-box{
    margin-left: 10px;
}
.showdeleted-box {
    line-height: 40px;
    margin-right: 10px;
}
</style>
