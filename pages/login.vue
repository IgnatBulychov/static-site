<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row
                    align="center"
                    justify="center"
                    class="py-5 my-5"
                >
                    <v-col
                        class="py-5 my-5"
                        cols="12"
                        xs="10"
                        sm="4"
                        md="4"  
                        lg="4"          
                    >   
                    <v-card class="elevation-12 my-5">
                        <v-toolbar
                            color="teal"
                            dark
                        >
                        <v-toolbar-title>Вход</v-toolbar-title>   
                        <v-spacer></v-spacer>     
                        </v-toolbar>
                        <v-form
                            @submit.prevent="authenticate()" 
                            ref="form"    
                            lazy-validation
                        >
                            <v-card-text>
                                <v-text-field
                                    label="Email"
                                    prepend-icon="mdi-account"
                                    type="email"
                                    v-model="form.email"
                                    :rules="emailRules"
                                    required
                                    color="teal"
                                    :disabled="loading"
                                ></v-text-field>

                                <v-text-field
                                    id="password"
                                    label="Пароль"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="form.password"
                                    :rules="passwordRules"
                                    required
                                    color="teal"
                                    :disabled="loading"
                                ></v-text-field>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn icon color="teal" to="/">
                                    <v-icon>
                                        mdi-arrow-left
                                    </v-icon>
                                </v-btn>                              
                                <div class="flex-grow-1"></div>
                                    <v-btn 
                                        color="teal"
                                        type="submit"
                                        dark
                                        :disabled="loading"
                                    >Войти</v-btn>
                                </v-card-actions>
                                <v-progress-linear
                                    v-if="loading"
                                    indeterminate
                                    color="teal"
                                ></v-progress-linear>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Login',
    layout: 'auth',
    data: () => ({
        form: {
            email: '',
            password: ''
        },
        loading: false,
        emailRules: [
            v => !!v || 'Введите E-mail',
            v => /.+@.+\..+/.test(v) || 'Некорректный E-mail',
        ],
        passwordRules: [
            v => !!v || 'Введите пароль',
        ],
    }),
    computed: {
        ...mapState({
            meta : state => state.airtable.meta
        })
    },
    methods: {
        ...mapActions({
            login : 'auth/login',
            getMeta: 'airtable/getMeta',
        }),
        validate () {
            if (this.$refs.form.validate()) {
                return true
            }
        },
        async authenticate() {
            if (this.validate()) {
                this.loading = true
                try {
                    await this.login(this.form)
                    await this.getMeta()
                    this.$router.push(`/dashboard/${this.meta[0].fields.title}`)
                } catch (e) {
                    console.log(e)
                    this.$handleError(e)
                } finally {
                    this.loading = false
                }
            }
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