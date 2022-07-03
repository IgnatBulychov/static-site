<template>
    <div class="c-main-screen">
        <div class="b-wrapper">
            
            <article>
                <h1>{{ main.h1 }}</h1>
                    <br>
                <nuxt-link to="/my">my</nuxt-link>
            </article>
            
            <h1>Non tenetur illo quia.</h1>
            <div class="subtitle">Rerum laborum et.</div>
            <div class="b-actions">
                <button class="btn btn-primary">
                    Alisa
                </button>
                <button class="btn btn-outlined">
                    Florian
                </button>
            </div>
            <div class="b-benefits">
                <div class="b-cards">
                    <div class="b-card">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'MainScreen',
    data: () => ({
        main: {}
    }),
    computed: {
        ...mapGetters({
            isLoggedIn : 'auth/isLoggedIn'
        })
    },
    async fetch() {
        const { records } = await this.$airtable.$get('appl9E2VmnD4Zb6x1/main')
        
        this.main = records[0].fields
    }
}
</script>

<style lang="scss">
.c-main-screen {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;    
    background: url('/cover.png');
    background-repeat: no-repeat;
    background-size: cover;
    min-width: $min-layout-width;
    .b-wrapper {
        margin-bottom: $step * 20;
        text-align: center;
        h1 {
            color: #fff;
            @include font-size(52, 30, 1200);
            display: block;
        }
        .subtitle {
            color: #fff;
            @include font-size(22, 16, 1200);
            display: block;
            margin-top: $step * 4;
        }
        .b-actions {
            margin-top: $step * 2;
            .btn:first-of-type {
                margin-right: $step * 2;
            }
        }
    }
}
</style>