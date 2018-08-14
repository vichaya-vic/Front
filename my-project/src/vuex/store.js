import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    name: '',
    status: false,
    permission: false,
}

const mutations = {

    addName: (state, n) => {
        state.name = n
    },
    addStatus: (state, n) => {
        state.status = n
    },
    addPermission: (state, n) => {
        state.permission = n
    }
}

const getters = {
    name: state => state.name,
    status: state => state.status,
    permission: state => state.permission
}

const actions = {
    addNameVal: (state, n) => {
        store.commit('addName', n)
    },
    addStatusVal: (state, n) => {
        store.commit('addStatus', n)
    },
    addPermissionVal: (state, n) => {
        store.commit('addPermission', n)
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