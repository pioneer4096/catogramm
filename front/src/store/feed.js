import {getFeed} from "@/api/feed.api.js"

export default {
    state: {
        feed: []
    },
    actions: {
        async getFeed({commit}, ownerId) {
            try {
                const response = await getFeed(ownerId)
                commit('setFeed', response?.data?.data || [])
            }
            catch (e) {
                commit('clearFeed')
              throw e
            }
        }
    },
    mutations: {
        setFeed(state, feed) {
            state.feed = feed
        },
        clearFeed(state) {
            state.feed = []
        }
    },
    getters: {
        userFeed: s => s.feed
    }
}