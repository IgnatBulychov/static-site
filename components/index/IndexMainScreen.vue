<template>
    <div class="c-main-screen">
        <div class="b-wrapper">
            <h1>{{ main.h1 }}</h1>
            <div class="subtitle">{{ main.subtitle }}</div>
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
        <div class="b-benifits">
            <div class="b-card" v-for="benifit, key in benifits" :key="key">
                <div class="b-image">
                    <img :src="benifit.fields.attachment[0].thumbnails.full.url" width="1" height="1" />
                </div>
                <div class="b-text">
                    <div class="b-title">
                        {{ benifit.fields.title }}
                    </div>
                    <div class="b-description">
                        {{ benifit.fields.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainScreen',
    props: {
        main: {
            type: Object,
            default() {
                return {}
            }
        },
        benifits: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style lang="scss">
.c-main-screen {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;    
    flex-direction: column;
    background: url('/cover.png');
    background-repeat: no-repeat;
    background-size: cover;
    min-width: $min-layout-width;
    position: relative;
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
    .b-benifits {
        position: absolute;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        background: #fff;
        box-shadow: 0px 13px 19px 0px rgba(0, 0, 0, 0.07);
        bottom: -50px;
        .b-card {
            width: 250px;
            display: flex;
            align-items: center;
            padding: $step;
            .b-image {
                width: 50%;
                padding: 0 $step * 5;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .b-text {
                .b-title {
                    font-size: 1.4rem;
                    font-weight: 600;
                }
            }
        }
    }
}

@media (max-width: $breakpoint-md) {
    .c-main-screen {
        .b-benifits {
            width: 75%;
            bottom: -150px;
        }
    }
}
</style>