<template>
    <div class="c-main">
        {{ title }}
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    layout: 'dashboard',
    data: () => ({
    }),
    computed: {
        ...mapState({
            tables: state => state.airtable.data,
            meta: state => state.airtable.meta
        }),
        title() {
            return this.meta?.find(t=>t.fields.title === this.$route.params.type).fields.translate
        },
        table() {
            return this.tables[this.$route.params.type]
        }
    },
    methods: {
        ...mapActions({            
            getTable : 'airtable/getTable',
            getMeta : 'airtable/getMeta'
        })
    },
    async mounted() {
        if (this.tables.leng)
        await this.getMeta(this.$route.params.type)

        await this.getTable(this.$route.params.type)
    }
}
</script>