import Vue from 'vue'
import Vuex from 'vuex'
import { USER_STATUS } from "@/global/constants"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /** status lib*/
    username: "default name",
    password: "",
    status: USER_STATUS.IS_NOT_LOGIN
  },
  getters: {
    getUsername: (state): string => {
      return state.username
    },
    getPassword: (state): string => {
      return state.password
    },
    getStatus: (state): string => {
      return state.status
    }
  },
  mutations: {
    /** sync computing lib, trigger via commit*/
    setUsername: (state, username) => {
      state.username = username
    },
    setPassword: (state, password) => {
      state.password = password
    },
    setStatus: (state, status) => {
      state.status = status
    }
  },
  actions: {
    /** async computing lib, trigger via dispatch */
  },
  modules: {
    /** sub-modules */
  }
})
