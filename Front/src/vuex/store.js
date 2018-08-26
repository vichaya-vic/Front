import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    name: '',
    email: '',
    status: false,
    permission: false,
}

const mutations = {

    addName: (state, n) => {
        state.name = n
    },
    addEmail: (state, n) => {
        state.email = n
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
    email: state => state.email,
    status: state => state.status,
    permission: state => state.permission
}

const actions = {
    addNameVal: (state, n) => {
        store.commit('addName', n)
    },
    addEmailVal: (state, n) => {
        store.commit('addEmail', n)
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
    actions,
    plugins: [
        createPersistedState()
    ]
})

global.store = store
export default store