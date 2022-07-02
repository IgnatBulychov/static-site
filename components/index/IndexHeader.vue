<template>
    <div :class="`c-header ${showNavBack ? 'm-show' : ''}`">
        <header>
            <div class="b-header-desktop">
                <div class="b-title">
                    <logo />
                    <div class="e-header-title">Laurie Grant</div>
                </div>
                <nav class="b-nav">
                    <ul>
                        <li>Home</li>
                        <li>Product</li>
                        <li>Pricing</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </div>
            <div class="b-header-mobile">
                <logo />
                <div class="e-header-title">Laurie Grant</div>
                <div @click="menuOpen = true" :class="`e-menu-btn ${menuOpen ? 'm-hidden' : ''}`">
                    <svg style="width:40px;height:40px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                    </svg>
                </div>
            </div>
            <div :class="`b-mobile-nav-slider ${ menuOpen ? 'm-open' : ''}`">
                <div @click="menuOpen = false" class="e-close-btn">
                    <svg style="width:40px;height:40px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import Logo from '~/components/index/Logo'
export default {
    name: 'Header',
    components: {
        Logo
    },
    data: () => ({
        showNavBack: false,
        menuOpen: false
    }),
    methods: {
        scrollHandler() {
            if (window.scrollY > 100) {
                this.showNavBack = true
            } else {
                this.showNavBack = false
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler, false)
        if (window.scrollY > 100) {
            this.showNavBack = true
        }
    }
}
</script>

<style lang="scss">
.c-header {
    position: fixed;
    top: 0;
    width: 100%;
    transition: all .2s ease-in-out;
    &.m-show {
        background: rgb(0 0 0 / 70%)
    }
    .b-header-desktop {
        width: $layout-xl;
        margin: 0 auto;
        padding: $step * 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .b-title {
            display: flex;
            align-items: center;
            .e-header-title {
                font-size: 2.5rem;
                color: #fff;
                padding: $step * 2 0;
            }
        }
        .b-nav {
            ul {
                display: flex;
                li {
                    padding: $step * 2 $step * 2;
                    list-style-type: none;
                    font-size: 1.5rem;
                    color: #fff;
                    transition: color .2s ease-in-out;
                    cursor: pointer;
                    &:hover {
                        color: #f57946;
                    }
                }
            }
        }
    }
    .b-header-mobile {
        display: none;
    }
    .b-mobile-nav-slider {
        position: fixed;
        width: 300px;;
        top:0;
        bottom: 0;
        right: 0;
        transform: translateX(+300px);
        background: rgb(0 0 0 / 70%);
        transition: all .2s ease-in-out;
        &.m-open {
            transform: translateX(0);
            padding: $step * 2;
        }
        .e-close-btn {
            color: #fff;
            cursor: pointer;
            display: flex;
            justify-content: flex-end;
        }
    }
}

@media (max-width: $breakpoint-xxl) {
    .c-header {
        .b-header-desktop {
            width: auto;
        }
    }
}

@media (max-width: $breakpoint-xl) {
    .c-header {
        .b-header-desktop {
            width: auto;
        }
    }
}

@media (max-width: $breakpoint-lg) {
    .c-header {
        .b-header-desktop {
            display: none;
        }
        .b-header-mobile {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: $step * 2;
            color: #fff;
            .e-header-title {
                font-size: 1.5rem;
            }
            .e-menu-btn {
                cursor: pointer;
                transition: all .2s;
                &.m-hidden {
                    opacity: 0;
                }
            }
        }
    }
}


@media (max-width: $breakpoint-md) {
    .c-header { 
        min-width: $min-layout-width;      
    }
}
</style>