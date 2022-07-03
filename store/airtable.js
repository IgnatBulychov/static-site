export const state = () => ({
    data: {},
    meta: null
})

export const mutations = {
    setTables (state, { key, value }) {
        state.data[key] = value
    },
    setMeta (state, value) {
        state.meta = value
    }
}

export const actions = {
    async getTables ({ state, commit }) {
        state.meta.forEach(async (record) => {
            const response = await this.$airtable.$get(`appl9E2VmnD4Zb6x1/${record.fields.title}`)
            commit('setTables', { key: record.fields.title, value: response.records })
        })
    },
    async getTable ({ commit }, title) {
        const { records } = await this.$airtable.$get(`appl9E2VmnD4Zb6x1/${title}`)
        commit('setTables', { key: title, value: records })
    },
    async getMeta ({ commit }) {
        const { records } = await this.$airtable.$get('appl9E2VmnD4Zb6x1/meta')
        commit('setMeta', records)
    }
}
