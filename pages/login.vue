<template>
    <div class="c-login">
        <form class="b-form" @submit.prevent="login">
            <div class="title">
                Вход
            </div>
            <input
                type="text"
                v-model="user.name"
            />
            <input
                type="password"
                v-model="user.password"
            />
            <div class="b-actions">
                <nuxt-link to="/" class="d-btn d-btn-outlined">
                    <fa :icon="['fas', 'arrow-left']" />
                </nuxt-link>
                <button class="d-btn d-btn-primary" type="submit">
                    Вход
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    layout: 'auth',
    data: () => ({
        user: {
            name: '',
            password: ''
        }
    }),
    methods: {
        login() {
            this.$router.push('/dashboard')
        }
    }
}
</script>

<style lang="scss">
.c-login {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        max-width: 320px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: $step * 2;
        background: #e8e8e8;
        border-radius: 5px;
        input {
            padding: $step;
            border: 1px solid #f57946;
            border-radius: 5px;
            margin-top: $step * 2;
        }
        .b-actions {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: $step * 2;
        }
        
    }
}
</style>