<template>
    <div class="c-index">
        <index-header />
        <main>
            <index-main-screen/>
            <div class="b-container">
                
            </div>
        </main>
        <footer>
        </footer>
    </div> 
</template>

<script>
import IndexHeader from '~/components/index/IndexHeader'
import IndexMainScreen from '~/components/index/IndexMainScreen'
export default {
   components: {
      IndexMainScreen, IndexHeader
   }
}
</script>

<style lang="scss">
.c-index {
    .b-container {
        width: $layout-xl;
        margin: 0 auto;

        //@at-root
        //@at-root
        height: 10000px;
    }
}

@media (max-width: $breakpoint-xxl) {
    .c-index {
        .b-container {
            width: $layout-xl;
        }
    }
}

@media (max-width: $breakpoint-xl) {
    .c-index {
        .b-container {
            width: $layout-lg;
        }
    }
}

@media (max-width: $breakpoint-lg) {
    .c-index {
        .b-container {
            width: $layout-md;
        }
    }
}

@media (max-width: $breakpoint-md) {
    .c-index {
        .b-container {
            width: $layout-sm;
        }
    }
}


@media (max-width: $breakpoint-sm) {
    .c-index {        
        .b-container {
            width: 100%;
            min-width: $min-layout-width;
        }
    }
}
</style>