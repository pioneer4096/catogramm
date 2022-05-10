import { getFriendStatus, addFriend } from "@/api/friends.api";

export default {
  state: {
    friendStatus: -1,
  },
  actions: {
    async getFriendStatus({commit}, friendId) {
      try {
        const response = await getFriendStatus(friendId);
        const status = typeof response?.data?.status !== 'undefined' ? response.data.status : -1
        commit("setFriendStatus", status);
      } catch (e) {
        commit("cleanFriendStatus");
        throw e;
      }
    },
    async addToFriend(friendId) {
      try {
        const response = await addFriend(friendId);
        // ?
      } catch (e) {
        console.log(e)
        throw e;
      }
    }
  },
  mutations: {
    cleanFriendStatus(state) {
      state.friendStatus = -1;
    },
    setFriendStatus(state, status) {
      console.log('setFriendStatus = ', status)
      state.friendStatus = status;
    },
  },
  getters: {
    friendStatus: s => s.friendStatus
  },
};
