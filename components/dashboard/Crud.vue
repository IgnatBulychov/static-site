<template>
  <div class="c-crud">
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="calories"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ tableTitle }}
          </v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Новая запись
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" >
                      <div  v-for="item, key, i in editedItem" :key="i"> 
                        <v-text-field
                          v-if="key != 'attachment'"
                          v-model="editedItem[key]"
                          :label="key"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Отмена
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Сохранить
                </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5">Вы уверены, что хотите удалить??</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    props: {
      meta: {
        type: Object,
        default() {
            return {}
        }
      },
      tables: {
        type: Object,
        default() {
            return {}
        }
      }
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      opType: '$post'
    }),
    computed: {
      tableTitle() {
        return this.meta?.translate
      },
      table () {
        return this.tables[this.$route.params.type] || []
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Новая запись' : 'Редактирование записи'
      },
      headers() {
        let headers = []
        if (this.table.length) {
          headers = Object.keys(this.table[0].fields).map(key => {
            return { text: key, value: key }
          }) 
          headers.push({ text: 'Действия', value: 'actions', sortable: false })
        } else {
          headers = []
        }
        return headers
      },
      items() {
        return this.table.length ? this.table.map(f => {
          return {
            ...f.fields
          }
        }) : []
      },
      defaultItem () {
        let item = []
        if (this.table.length) {
          item = this.table[0].fields
          Object.keys(item).forEach(key => {
            item[key] = ''
          })
        }
        return item
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.opType = '$patch'
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.items.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.opType = '$post'
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.opType = '$post'
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      async save () {
        let records = [{
          fields: this.editedItem
        }]
        if (this.opType == '$patch') {
          records[0].id = this.table[this.editedIndex].id
        }
        await this.$airtable[this.opType](this.meta.title, {
          records
        })
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
    },
    mounted() {
      this.editedItem = this.defaultItem
    }
  }
</script>