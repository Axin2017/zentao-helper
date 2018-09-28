<template>
    <div>
        <el-table :data="taskList" stripe style="width: 100%" :default-sort="{prop: 'assigneddate', order: 'descending'}" v-loading="loading" row-key="id">
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
                    <time-left v-if="'done,closed'.indexOf(scope.row.status)==-1" :deadtime="scope.row.deadline" :containsToday="true"></time-left>
                </template>
            </el-table-column>
            <el-table-column prop="deleted" label="是否删除" v-if="showDeleted" sortable>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
import TimeLeft from './public/TimeLeft';
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
            if (row.consumed == 0) {
                return 0;
            } else {
                return (
                    (row.consumed / (row.consumed + row.left) * 100).toFixed() +
                    '%'
                );
            }
        },
        judgeDeadline(taskList) {
            const now = new Date();
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
                    //当天不算超期
                    if (this.getDaysLeft(deadDate, true, now) <= 0) {
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
    },
    components: {
        TimeLeft
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
