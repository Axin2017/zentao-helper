import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/Task'
import Story from '@/components/Story';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Task',
      component: Task
    },
    {
      path: '/story',
      name: 'Story',
      component: Story
    }
  ]
})
