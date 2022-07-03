export default function ({ app, redirect, store }) {
    
    const isLoggedIn = store.getters['auth/isLoggedIn']

    if (!isLoggedIn) {
        store.commit('auth/login', app.$cookies.get('user'))
    }
    
    if (!isLoggedIn) {
      // return redirect('/')
    }    
}