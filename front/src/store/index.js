import { createStore } from "vuex";
import authModule from './auth.js'
import profileModule from './profile.js'
import notificationsModule from './notifications.js'
import friendsModule from './friends.js'
import pageMofule from './page.js'
import feedModule from './feed.js'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authModule,
    profileModule,
    notificationsModule,
    friendsModule,
    pageMofule,
    feedModule,
  },
});
