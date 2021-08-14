import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl:'http://localhost:9099',
    user:{
      id:-1,
      name:'未知用户',
      avator:'#',
      type:2
    },
    pathList:[
      {
        name:'普通用户'
      },
      {
        name:'路径'
      }
    ]
  },
  mutations: {
    setUser(state,user){
      state.user.id = user.id
      state.user.name = user.name
      state.user.type = user.type
      state.user.avator = user.avator
    }
  },
  actions: {
  },
  modules: {
  }
})
