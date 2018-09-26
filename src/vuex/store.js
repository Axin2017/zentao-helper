import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import menu from '../dataConfig/menuConfig'
Vue.use(Vuex);
const store = new Vuex.Store({
  // 定义状态
  state: {
    menuList: menu.menuList,
    activedIndex: menu.activedIndex,
    projectList: []
  },
  mutations: {
    menuChanged(state, index) {
      state.activedIndex = index;
    },
    setProjectList(state, list) {
      state.projectList = list;
    }
  },
  actions: {
    initProjectList(context) {
      axios({
        method: 'post',
        url: window.zentaoConfig.dataUrl+'/selectProjectByParams',
        data: { query: [] }
      })
        .then(res => {
          res.data.status == 1 &&
            context.commit('setProjectList', res.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  getters: {
    projectMappingObj:state=>{
      let o={};
      state.projectList.forEach((pro)=>{
        o[pro.id]=pro.name;
      });
      return o;
    },
    tabMenu: state => {
      return state.menuList[state.activedIndex].child.menuList;
    }
  }
});
//初始化项目列表
store.dispatch('initProjectList');
export default store;
