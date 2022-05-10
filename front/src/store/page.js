import { getProfileById } from "@/api/profile.api";

export default {
  state: {
    pageOwnerProfile: null,
    pageOwnerId: null,
    isYourPage: false,
  },
  actions: {
    async preparePageData({ commit }, userId) {
      try {
          const response = await getProfileById(userId);
          commit('applyPage', response?.data || null)
      }
      catch(e) {
          commit('cleanPage')
          throw e
      }
    },
  },
  mutations: {
    applyPage(state, data) {
        state.pageOwnerProfile = data;
        state.pageOwnerId = data.id;
        state.isYourPage = Boolean(data?.isYourPage);
    },
    cleanPage(state) {
        state.pageOwnerProfile = null;
      state.pageOwnerId = null;
      state.isYourPage = false;
    },
  },
  getters: {
      pageOwnerProfile: s => s.pageOwnerProfile,
      pageOwnerId: s => s.pageOwnerId,
      isYourPage: s => s.isYourPage

  },
};
