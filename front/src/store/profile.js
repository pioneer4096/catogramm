import { getProfile, updateProfileStatus } from "@/api/profile.api";
const DEFAULT_USER_AVATAR_LINK = "https://cdn.quasar.dev/img/boy-avatar.png";

export default {
  state: {
    profile: null,
  },
  actions: {
    async getProfile({ commit }) {
      try {
        const response = await getProfile();
        console.log("response data = ", response.data);
        commit("setProfile", response?.data?.user || null);
      } catch (e) {
        commit("cleanProfile");
        throw e;
      }
    },
    async updateProfileStatus(_, status) {
      console.log('trying to update status = ', status)
      await updateProfileStatus(status);
    },
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    cleanProfile(state) {
      state.profile = null;
    },
  },
  getters: {
    userProfile: (s) => s.profile,
    userName: (s) => s.profile?.name || "Иван Иванов",
    userAvatarLink: (s) => s.profile?.avatarLink || DEFAULT_USER_AVATAR_LINK,
  },
};
