<template>
  <div class="app-container">
    <div class="sun-content">
      <div class="filter-container">
        <sun-form
          :config="config"
          :default-form="defaultForm"
          :reset="false"
          @query="queryList"
        />

      </div>
    </div>
    <table-list
      ref="tableListRef"
      :default-form="defaultForm"
      :btn-all="btnAll"
    />
  </div>
</template>

<script>
import SunForm from '@/components/SunForm' // 表单
import { config } from './info' // 表单配置
import TableList from './component/table' // 表格
import { permissionsBtn } from '@/utils/permissions' // 权限配置

export default {
  name: 'Personal',
  components: { SunForm, TableList },
  data() {
    return {
      config: config(this),
      defaultForm: {
        organ_no: '',
        report_state: '',
        create_year: ''
      },
      restaurants: [],
      btnAll: {
        // 当前页需要配置权限的按钮  权限获取
        btnHandreport: false,
        btnDownload: false
      }
    }
  },
  mounted() {
    this.organTreeGet()
    this.queryList()
    this.btnPermissions() // 按钮权限
  },
  methods: {
    // 配置机构数
    organTreeGet() {
      this.config.organ_no.options = this.$store.getters.organTree
    },
    queryList() {
      this.$refs.tableListRef.queryList(1)
    },
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
    }
  }
}
</script>

<style scoped>

</style>
