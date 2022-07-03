export default function ({ $axios, store }, inject) {
    const main = $axios.create({
        baseURL: process.env.MAIN_API
    })
    const netlify = $axios.create({
        baseURL: process.env.NETLIFY_API
    })
    const airtable = $axios.create({
        baseURL: process.env.AIRTABLE_API
    })

    airtable.onRequest(config => {
        let user = store.state.auth.user
        if (user) {
          config.headers.Authorization = 'Bearer ' + user.airtable
        } else {
          config.headers.Authorization = 'Bearer ' + process.env.AIRTABLE_KEY
        }
        return config
    })

    netlify.onRequest(config => {
        let user = store.state.auth.user
        if (user) {
          config.headers.Authorization = 'Bearer ' + user.netlify
        }
        return config
    })

    inject('main', main)
    inject('netlify', netlify)
    inject('airtable', airtable)
}