<template>
    <div>
        <el-table :data="taskList" stripe style="width: 100%" :default-sort="{prop: 'assigneddate', order: 'descending'}" v-loading="loading">
            <el-table-column prop="id" label="id" sortable>
            </el-table-column>
            <el-table-column prop="project" label="项目名称" width="200" :formatter="projectFormatter" sortable>
            </el-table-column>
            <el-table-column prop="name" label="任务名称" width="200" sortable>
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
            <el-table-column prop="realstarted" label="开始处理时间" :formatter="dateFormatter" sortable>
            </el-table-column>
            <el-table-column prop="estimate" label="预计时间" sortable>
            </el-table-column>
            <el-table-column prop="lastediteddate" label="最后编辑时间" :formatter="dateFormatter" sortable>
            </el-table-column>
            <el-table-column prop="left" label="进度百分比" :formatter="donePercentFormatter" sortable>
            </el-table-column>
            <el-table-column label="截止时间" sortable>
                <template slot-scope="scope">
                    <span :class="{dead:scope.row._isDead}">{{ scope.row.deadline }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="deleted" label="是否删除" v-if="showDeleted" sortable>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'TaskList',
    props: ['condition', 'index', 'activedIndex', 'showDeleted'],
    data() {
        return {
            taskList: [],
            serchTimeout: null,
            loading: true
        };
    },
    methods: {
        dateFormatter(row, column) {
            if (row[column.property]) {
                const d = new Date(row[column.property]);
                return `${d.getFullYear()}-${d.getMonth() +
                    1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
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
                    ((row.estimate - row.left) / row.estimate * 100).toFixed() +
                    '%'
                );
            }
        },
        judgeDeadline(taskList) {
            return taskList.map(task => {
                const column = { property: 'deadline' };
                const formatedDate = this.dateFormatter(task, column);
                task.deadline = formatedDate;
                const deadDate = new Date(formatedDate);
                if (
                    deadDate != 'Invalid Date' &&
                    task.status != 'done' &&
                    task.status != 'closed'
                ) {
                    if (deadDate < new Date()) {
                        task._isDead = true;
                    }
                }
                return task;
            });
        },
        getData() {
            this.loading = true;
            axios({
                method: 'post',
                url: this.dataUrl + '/selectTaskByParams',
                data: { query: this.condition }
            })
                .then(res => {
                    var data = res.data.data;
                    this.taskList = this.judgeDeadline(data);
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
        taskList() {
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
.dead {
    background-color: red;
    color: #fff;
    display: block;
}
</style>
