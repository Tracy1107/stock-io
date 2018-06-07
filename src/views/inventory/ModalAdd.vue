<template>
  <div>
    <!-- Modal Component -->
    <b-modal
      id="modalAdd"
      title="新增物料"
      header-bg-variant="info"
      headerTextVariant="black"
      @ok="handleOk">
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
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'modal-add',  
  data () {
    return {
      modalId: '',
      materialInfo: {
        id: '',
        name: '',
        category: '',
        unit: '',
        stock: 0,
        safetyStock: 0,
        checkStock: 0,
        checkDate: '',
        checkPerson:''
      }
    }
  },
  methods: {
    clearName () {
      this.name = ''
    },
    handleOk () {
      
      this.$emit('addMaterial', this.materialInfo)
    },
    handleSubmit () {
      this.names.push(this.name)
      this.clearName()
      this.$refs.modal.hide()
    }
  }
}
</script>
