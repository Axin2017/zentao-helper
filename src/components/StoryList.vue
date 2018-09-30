<template>
    <div>
        <el-table :data="storyList" stripe style="width: 100%" :default-sort="{prop: 'assigneddate', order: 'descending'}" v-loading="loading">
            <el-table-column prop="id" label="id" sortable>
            </el-table-column>
            <el-table-column prop="project" label="项目名称" width="200" :formatter="projectFormatter" sortable>
            </el-table-column>
            <el-table-column prop="title" label="需求名称" width="200" sortable>
            </el-table-column>
            <el-table-column prop="stage" label="阶段"  sortable>
            </el-table-column>
            <el-table-column prop="pri" label="优先级" sortable>
            </el-table-column>
            <el-table-column prop="status" label="状态" sortable>
            </el-table-column>
            <el-table-column prop="openedby" label="指派人" sortable>
            </el-table-column>
            <el-table-column prop="assignedto" label="接收人" sortable>
            </el-table-column>
            <el-table-column prop="assigneddate" label="指派时间" :formatter="dateFormatter" sortable>
            </el-table-column>
            <el-table-column prop="estimate" label="预计时间" sortable>
            </el-table-column>
            <el-table-column prop="lastediteddate" label="最后编辑时间" :formatter="dateFormatter" sortable>
            </el-table-column>
            <el-table-column prop="deleted" label="是否删除" v-if="showDeleted" sortable>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'StoryList',
    props: ['condition', 'index', 'activedIndex','showDeleted'],
    data() {
        return {
            storyList: [],
            serchTimeout: null,
            loading: true
        };
    },
    methods: {
        dateFormatter(row, column) {
            if (row[column.property]) {
                const d = new Date(row[column.property]);
                let timeStr = `${d.getFullYear()}-${d.getMonth() +
                    1}-${d.getDate()}`;
                if (
                    d.getHours() != 0 ||
                    d.getMinutes() != 0 ||
                    d.getSeconds() != 0
                ) {
                    timeStr += ` ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
                }
                return timeStr;
            } else {
                return '';
            }
        },
        projectFormatter(row, column) {
            return this.projectMappingObj[row.project];
        },
        donePercentFormatter(row, column) {
            if (row.estimate == 0) {
                return 0;
            } else {
                return (
                    ((row.estimate - row.left) / row.estimate).toFixed(2) *
                        100 +
                    '%'
                );
            }
        },
        getData() {
            this.loading = true;
            axios({
                method: 'post',
                url: this.dataUrl+'/selectStoryByParams',
                data: { query: this.condition }
            })
                .then(res => {
                    this.storyList = res.data.data;
                })
                .catch(e => {
                    console.log(e);
                    this.loading = false;
                });
        }
    },
    created() {
        this.getData();
    },
    computed: {
        menuIndex() {
            return this.$store.state.activedIndex;
        },
        projectMappingObj() {
            return this.$store.getters.projectMappingObj;
        }
    },
    watch: {
        condition() {
            if (this.activedIndex == this.index) {
                this.getData();
            }
        },
        storyList() {
            this.loading = false;
        }
    }
};
</script>

<style scoped>
.serch-box {
    width: 200px;
    float: right;
}
.toolbar {
    height: 80px;
    padding: 10px;
}
.content {
    max-width: 1366px;
    margin: 0 auto;
}
</style>
