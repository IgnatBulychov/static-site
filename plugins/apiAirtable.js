class ApiInterface {
    constructor (ctx) {
        this.ctx = ctx
    }

    buildQueryString (params, namespace) {
        let qs = namespace ? '' : '?'
        for (const k in params) {
            if (!Object.prototype.hasOwnProperty.call(params, k)) {
                continue
            }
            const val = params[k]
            if (typeof val === 'object') {
                qs += this.buildQueryString(val, k)
            } else if (val !== null && typeof val !== 'undefined') {
                qs += (namespace ? `${namespace}[${k}]` : k) + '=' + val + '&'
            }
        }
        if (!namespace) {
            qs = qs.replace(/&$/, '')
        }
        return qs
    }
}


class ApiInterfaceAxios extends ApiInterface {
    constructor (ctx) {
        super(ctx)

        this.ctx.$axios.setHeader('Client-Device', 'desktop')
        this.ctx.$axios.setHeader('Accept', 'application/json')
        this.ctx.$axios.setHeader('Content-Type', 'application/json')
        this.ctx.$axios.defaults.baseURL =  process.env.AIRTABLE_API
        this.ctx.$axios.onRequest(config => {
            const token = this.ctx.store.state.user?.tokens?.airtable
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        })
    }

    get (url, params, options) {
        if (params) {
            url += this.buildQueryString(params)
        }
        return this.ctx.$axios.get(url, options)
    }

    post (url, data, params) {
        return this.ctx.$axios.post(url, data, params)
    }

    put (url, data, params) {
        return this.ctx.$axios.put(url, data, params)
    }

    delete (url, data) {
        return this.ctx.$axios.delete(url, data)
    }
}

export default function (ctx, inject) {
    inject('airtable', new ApiInterfaceAxios(ctx))
}
