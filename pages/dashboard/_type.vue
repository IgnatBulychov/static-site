<template>
    <div class="c-main px-4 py-4">
        <crud
            :meta="metaFields"
            :tables="tables"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Crud from '~/components/dashboard/Crud'
export default {
    layout: 'dashboard',
    data: () => ({
    }),
    components: {
        Crud
    },
    computed: {
        ...mapState({
            tables: state => state.airtable.tables,
            meta: state => state.airtable.meta
        }),
        metaFields() {
            return this.meta?.find(t=>t.fields.title === this.$route.params.type).fields
        },
    },
    methods: {
        ...mapActions({            
            getTable : 'airtable/getTable',
            getMeta : 'airtable/getMeta'
        })
    },
    async mounted() {
        if (!this.meta) {
            await this.getMeta()
        }
        await this.getTable(this.$route.params.type)
    }
}
</script>