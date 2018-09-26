<template>
    <div class="tx-select" @mouseover="show=true;" @mouseout="show=false;">
        <div class="tx-select-title">
            {{title}}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <div class="tx-select-box"  v-show="show">
            <div class="tx-select-item" v-for="item in selectItems" @click="itemClick(item)" v-show="value!=item[valueField]" :title="item[labelField]">{{item[labelField]}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TxSelect',
    props: {
        data: {
            type: Array,
            required: true
        },
        labelField: {
            type: String,
            required: true
        },
        valueField: {
            type: String,
            required: true
        },
        defaultIndex: Number,
        emptyLabel: String
    },
    data() {
        return {
            title: '',
            value: null,
            selectItems: [],
            show:false
        };
    },
    created() {
        this.init();
    },
    methods: {
        itemClick(item) {
            this.title=item[this.labelField];
            this.value = item[this.valueField];
            this.$emit('input', this.value);
            this.show=false;
        },
        init() {
            this.selectItems = [
                {
                    [this.labelField]: this.emptyLabel
                        ? this.emptyLabel
                        : '请选择',
                    [this.valueField]: ''
                }
            ].concat(this.data);
            if (this.defaultIndex) {
                if (this.data[this.defaultIndex]) {
                    this.title = this.data[this.defaultIndex][this.labelField];
                    this.value = this.data[this.defaultIndex][this.valueField];
                }
            } else {
                this.title = this.selectItems[0][this.labelField];
                this.value = this.selectItems[0][this.valueField];
            }
        }
    },
    watch: {
        data() {
            this.init();
        }
    }
};
</script>
<style scoped>
.tx-select {
    position: relative;
    display: inline-block;
    background-color: #409eff;
    border-color: #409eff;
    transition: 0.1s;
    font-weight: 500;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
}
.tx-select:hover{
    background: #66b1ff;
    border-color: #66b1ff;
}
.tx-select-title {
    width: 100%;
    height: 100%;
    padding: 12px 20px;
    color: #fff;
}
.tx-select-box {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 3333;
    max-width: 400px;
    max-height: 600px;
    overflow-y: scroll;
}
.tx-select-item {
    padding: 5px 20px;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.tx-select-item:hover {
    background-color: #ecf5ff;
    color: #66b1ff;
    cursor: pointer;
}
</style>
