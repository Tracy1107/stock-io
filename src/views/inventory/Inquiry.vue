<template>
  <b-row>
    <b-col lg="12">
      <b-card>
        <div slot="header">
          <strong>庫存查詢</strong>
        </div>
        <!-- User Interface controls -->
        <b-row>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Filter" class="mb-0">
              <b-input-group>
                <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-input-group-append>
                  <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Sort" class="mb-0">
              <b-input-group>
                <b-form-select :plain="true" v-model="sortBy" :options="sortOptions">
                  <option slot="first" :value="null">-- none --</option>
                </b-form-select>
                <b-form-select :plain="true" :disabled="!sortBy" v-model="sortDesc" slot="append">
                  <option :value="false">Asc</option>
                  <option :value="true">Desc</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Sort direction" class="mb-0">
              <b-input-group>
                <b-form-select :plain="true" v-model="sortDirection" slot="append">
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                  <option value="last">Last</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Per page" class="mb-0">
              <b-form-select :plain="true" :options="pageOptions" v-model="perPage" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button v-b-modal.modalAdd variant="success" class="float-right">新增物料</b-button>
          </b-col>
        </b-row>
        <p></p>
        <!-- Modal Component -->
        <!-- <b-modal
          id="modalAdd"
          title="新增物料"
          header-bg-variant="info"
          headerTextVariant="black">
          <form>
            <b-form-group
              label="ID"
              label-for="materialID"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="materialID" :textarea="true" :rows="9" placeholder="物料ID"></b-form-input>
            </b-form-group>
            <b-form-group
              label="品名"
              label-for="materialName"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="materialName" :textarea="true" :rows="9" placeholder="物料名稱"></b-form-input>
            </b-form-group>
            <b-form-group
              label="類別"
              label-for="basicSelect"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="basicSelect"
                :plain="true"
                :options="['Please select','Option 1', 'Option 2', 'Option 3']"
                value="Please select">
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="單位"
              label-for="unitSelect"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="unitSelect"
                :plain="true"
                :options="['Please select','Unit 1', 'Unit 2', 'Unit 3']"
                value="Please select">
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="目前庫存量"
              label-for="stock"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="stock" :textarea="true" :rows="9" placeholder="0"></b-form-input>
            </b-form-group>
            <b-form-group
              label="安全庫存量"
              label-for="safetyStock"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="safetyStock" :textarea="true" :rows="9" placeholder="0"></b-form-input>
            </b-form-group>
            <b-form-group
              label="盤點日庫存量"
              label-for="safetyStock"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="safetyStock" :textarea="true" :rows="9" placeholder="0"></b-form-input>
            </b-form-group>
            <b-form-group
              label="盤點日"
              label-for="checkDate"
              :label-cols="3"
              :horizontal="true">
              <datetime v-model="date"></datetime>
            </b-form-group>
            <b-form-group
              label="盤點人員"
              label-for="checkPerson"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="checkPerson"
                :plain="true"
                :options="['Please select','Person 1', 'Person 2', 'Person 3']"
                value="Please select">
              </b-form-select>
            </b-form-group>
          </form>
        </b-modal> -->
        <!-- Main table element -->
        <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @filtered="onFiltered"
             striped="true"
             bordered="true"
             hover="true"
        >
          <template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>
          <template slot="actions" slot-scope="row">
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
            <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1" variant="warning">
              Info modal
            </b-button>
            <b-button size="sm" @click.stop="row.toggleDetails" variant="primary">
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>
          </template>
          <template slot="row-details" slot-scope="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
              </ul>
            </b-card>
          </template>
        </b-table>

        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-row>

        <!-- Info modal -->
        <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
          <pre>{{ modalInfo.content }}</pre>
        </b-modal>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
const items = [
  {
    id: 1001,
    name: '線材1',
    category: '線材',
    unit: '條',
    stock: 200,
    safetyStock: 100
  },
  {
    id: 2001,
    name: '端子1',
    category: '端子',
    unit: '組',
    stock: 130,
    safetyStock: 100
  },
  {
    id: 3001,
    name: '接頭1',
    category: '接頭',
    unit: '個',
    stock: 40,
    safetyStock: 100,
    _rowVariant: 'danger'
  },
  {
    id: 1004,
    name: '線材4',
    category: '線材',
    unit: '條',
    stock: 280,
    safetyStock: 100
  },
  {
    id: 1002,
    name: '線材2',
    category: '線材',
    unit: '條',
    stock: 80,
    safetyStock: 100,
    _rowVariant: 'danger'
  },
  {
    id: 2002,
    name: '端子2',
    category: '端子',
    unit: '組',
    stock: 100,
    safetyStock: 100
  },
  {
    id: 3002,
    name: '接頭2',
    category: '接頭',
    unit: '個',
    stock: 250,
    safetyStock: 100
  },
  {
    id: 1005,
    name: '線材5',
    category: '線材',
    unit: '條',
    stock: 175,
    safetyStock: 100
  },
  {
    id: 1003,
    name: '線材3',
    category: '線材',
    unit: '條',
    stock: 60,
    safetyStock: 100
  },
  {
    id: 2003,
    name: '端子3',
    category: '端子',
    unit: '組',
    stock: 125,
    safetyStock: 100
  },
  {
    id: 3003,
    name: '接頭3',
    category: '接頭',
    unit: '個',
    stock: 45,
    safetyStock: 100
  },
  {
    id: 1006,
    name: '線材6',
    category: '線材',
    unit: '條',
    stock: 300,
    safetyStock: 100
  }
  // { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
  // { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
  // {
  //   isActive: false,
  //   age: 9,
  //   name: { first: 'Mini', last: 'Navarro' },
  //   _rowVariant: 'success'
  // },
  // { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
  // { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
  // { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
  // { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
  // {
  //   isActive: true,
  //   age: 87,
  //   name: { first: 'Larsen', last: 'Shaw' },
  //   _cellVariants: { age: 'danger', isActive: 'warning' }
  // },
  // { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
  // { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
  // { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
  // { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
]

export default {
  data () {
    return {
      items: items,
      fields: [
        {
          key: 'id',
          label: '編號',
          class: 'text-center',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'name',
          label: '品名',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'category',
          label: '類別',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'unit',
          label: '單位',
          class: 'text-center'
        },
        {
          key: 'stock',
          label: '庫存量',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'safetyStock',
          label: '安全庫存量',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'checkStock',
          label: '盤點日庫存量',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'checkDate',
          label: '盤點日',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'checkPerson',
          label: '盤點人員',
          sortable: true,
          class: 'text-center'
        },
        { key: 'isActive', label: 'is Active' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: items.length,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => {
        return { text: f.label, value: f.key }
      })
    }
  },
  methods: {
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
