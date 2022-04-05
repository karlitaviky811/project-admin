import Vue from 'vue'
import Vuex from 'vuex';
import LoginModule from './modules/LoginModule'
import RequestModule from './modules/RequestModule'
import ProjectModule from './modules/ProjectModule'
import QrsModule from './modules/QrsModule'
Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      console.log("payload")
      state.drawer = payload
    },
  },
  actions: {

  },
  modules:{
    LoginModule,
    RequestModule,
    ProjectModule,
    QrsModule
  }
})
