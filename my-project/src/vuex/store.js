import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    name: '',
    change: 0
}

const mutations = {
    addName: (state, n) => {
        state.name = n
    },
    addChange: (state,c) => {
        state.change = c
    }
}

const getters = {
    name: state => state.name,
    num: state => state.change
}

const actions = {
    addNAME: (state, name) => {
        store.commit('addName', name)
    },
    addCHANGE: (state, num) => {
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