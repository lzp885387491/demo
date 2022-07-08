import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      user,
    },
    plugins: [
      createPersistedstate({
        key: 'erabbit-client-pc-store',
        paths: ['user']
      })
    ]
})
