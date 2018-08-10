import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {


    username: '',
    change:0
}

const mutations = {
  
    addUser:(state, name) => {
        state.username=name
    },
    addChange:(state, num) => {
        state.change=num
    }
}

const getters = { 
     name: state => state.username,
     num:state => state.change
}

const actions = {
    addUsername : (state, name) => {
        store.commit('addUser',name) 
    },
    addChangenum : (state, num) => {
        store.commit('addChange',num) 
    }
}

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
})

global.store = store
export default store