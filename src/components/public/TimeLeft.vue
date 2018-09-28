<template>
    <span v-if="show" :class="['dayleft',timecolor]">
        {{day}}
    </span>
</template>
<script>
export default {
    name: 'DayLeft',
    props: ['deadtime', 'containsToday'],
    data() {
        return {
            timecolor: '',
            day: '',
            show: false
        };
    },
    created() {
        let deadDate = null;
        if (this.deadtime) {
            deadDate = new Date(this.deadtime);
            if (deadDate != 'Invalid date') {
                this.day =this.getDaysLeft(deadDate);
                this.setComponentShow(this.day);
                this.setTimeColor(this.day);
            }
        }
    },
    methods: {
        setTimeColor(day) {
            if (day > 0 && day < 4) {
                this.timecolor = 'day' + day;
            }
        },
        setComponentShow(day) {
            if (day > 0 && day < 4) {
                this.show = true;
            }
        }
    }
};
</script>
<style scoped>
.dayleft {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    color:#000;
}
.day1 {
    background-color:  red;
}
.day2 {
    background-color:  yellow;
}
.day3 {
    background-color:  violet;
}
</style>
