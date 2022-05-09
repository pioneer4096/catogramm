import {login} from '@/api/auth.api'

export default {
    state: {
        user: localStorage.getItem('user') || null,
        token: localStorage.getItem('token') || null,
    },
    actions: {
        async login({ dispatch, commit }, data) {
            try {
                const response = await login(data)
                commit('setAuthData', response.data);
            }
            catch(e) {
                commit('logout')
                throw e
            }
        }
    },
    mutations: {
        logout(state) {
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