<template>
    <div class="c-index">
        <index-header />
        <main>
            <index-main-screen
                :main="main"
                :benifits="benifits"
            />
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
    },
    data: () => ({
        main: {},
        benifits: []
    }),
    async fetch() {
        const [main, benifits] = await Promise.all([
            this.$airtable.$get('main'),
            this.$airtable.$get('benifits')
        ])
        this.main = main.records[0].fields
        this.benifits = benifits.records
    }
}
</script>

<style lang="scss">
.c-index {
    .b-container {
        width: $layout-xl;
        margin: 0 auto;
        //
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