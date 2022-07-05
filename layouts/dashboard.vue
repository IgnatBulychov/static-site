<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        
        Панель управления

        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-divider vertical></v-divider>

            <v-btn text x-small color="primary" to="/">
                На сайт
            </v-btn>

            <v-divider vertical></v-divider>

            <v-btn text x-small color="primary">
                Публикация изменений
            </v-btn>
            
            <v-divider vertical></v-divider>

        </v-toolbar-items>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg" v-if="tables">
              <v-list color="transparent">
                <v-list-item
                  v-for="table in tables"
                  :key="table.id"
                  link
                  :to="`/dashboard/${table.fields.title}`"

                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ table.fields.translate }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Выход
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <nuxt />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Dashboard',
    middleware: 'auth',
    computed: {
      ...mapState({
        tables : state => state.airtable.meta
      })
    }
}
</script>

<style lang="scss">

</style>