const handleError = (ctx) => (props) => {
    ctx.$notify({
        text: props.response.data,
        type: 'error'
    });
}

export default (ctx, inject) => {
    inject('handleError', handleError(ctx))
}