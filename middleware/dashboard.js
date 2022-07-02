export default function ({ redirect, store }) {
    if (!store.state.user?.tokens) {
        redirect('/')
    }
}