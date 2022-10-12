import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
// import * as Vue from 'vue'
// import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state:{         
      username: "ftintern",
      password: "shri",
      loggedIn: false,
    },

    modules: {
      
    },

    actions:{
      login ({commit}) {
        commit('loginUser')
      },
      logout ({commit}) {
        commit('logoutUser')
      }
    },

    mutations:{
      loginUser (state) {
        state.loggedIn = true
      },
      logoutUser (state) {
        state.loggedIn = false
      }
    },

    getters: {},
    plugins: [vuexLocal.plugin]

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    // strict: process.env.DEBUGGING
  })

  return Store
})
