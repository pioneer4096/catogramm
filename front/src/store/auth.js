import {login} from '@/api/auth.api'

export default {
    state: {
        user: null,
        token: null
    },
    actions: {
        async login({ dispatch, commit }, data) {
            try {
                const response = await login(data)
                commit('setAuthData', response.data);
            }
            catch(e) {
                commit('resetAuthData')
                throw e
            }
        }
    },
    mutations: {
        logout({commit}) {
            commit('resetAuthData')
        },
        resetAuthData(state) {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
        },
        setAuthData(state, {user, token}) {
            state.user = user
            state.token = token
            localStorage.setItem('token', token)
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
    }
}