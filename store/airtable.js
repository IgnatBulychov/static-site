export const state = () => ({
    tables: {},
    meta: null
})

export const mutations = {
    setTables (state, { key, value }) {
        state.tables[key] = value
    },
    setMeta (state, value) {
        state.meta = value
    }
}

export const actions = {
    async getTables ({ state, commit }) {
        state.meta.forEach(async (record) => {
            const response = await this.$airtable.$get(`${record.fields.title}`)
            commit('setTables', { key: record.fields.title, value: response.records })
        })
    },
    async getTable ({ state, commit }, title) {
        const { records } = await this.$airtable.$get(`${title}`) // ${state.meta.find(t => t.fields.title === title).fields.fields.reduce((a,b) => '&fields=' + a + b)}
        commit('setTables', { key: title, value: records })
    },
    async getMeta ({ commit }) {
        const { records } = await this.$airtable.$get('meta')
        commit('setMeta', records)
    }
}
