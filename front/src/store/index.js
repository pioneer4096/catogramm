import { createStore } from "vuex";
import authModule from './auth.js'
import profileModule from './profile.js'
import notificationsModule from './notifications.js'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authModule,
    profileModule,
    notificationsModule,
  },
});
