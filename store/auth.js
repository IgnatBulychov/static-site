export const state = () => ({
    user: null
})

export const mutations = {
    LOGIN (state, user) {
        state.user = user
    }
}

export const actions = {
    login ({ commit }, user) {
        const { data } = this.$axios.post('/login', user)
        commit('LOGIN', data)
    }
}

export const getters = {
    domain () {
        return process.env.HOST
    }
}