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
    addChange: (state, n) => {
        state.change = n
    }
}

const getters = {
    name: state => state.name,
    num: state => state.change
}

const actions = {
    addNameVal: (state, n) => {
        store.commit('addName', n)
    },
    addChangeVal: (state, n) => {
        store.commit('addChange', n)
    }
}

let store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

global.store = store
export default store