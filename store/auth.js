export const state = () => ({
    user: null
})

export const getters = {
    isLoggedIn: (state) => {
        return !!state.user
    }
}

export const mutations = {
    login (state, user) {
        state.user = user
        if (user) {
            this.$cookies.set('user', user, {
                maxAge: 60 * 60 * 24 * 365
            })
        }
    }
}

export const actions = {
    async login ({ commit }, user) {
        const { data } = await this.$main.post('/login', user)
        commit('login', data.user)
    }
}
