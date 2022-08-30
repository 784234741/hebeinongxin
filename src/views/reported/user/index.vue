<template>
  <div class="app-container">
    <div class="sun-content">
      <div class="filter-container">
        <sun-form
          :config="config"
          :default-form="defaultForm"
          :reset="false"
          :query="btnAll.btnQuery"
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
import { SunForm } from '@/components' // 表单
import { config } from './info' // 表单配置
import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
import { permissionsBtn } from '@/utils/permissions' // 权限配置
import TableList from './component/table' // 表格
export default {
  name: 'ReportedUser',
  components: { SunForm, TableList },
  data() {
    return {
      config: config(this),
      defaultForm: {
        organ_no: '',
        user_no: '',
        is_open: ''
      },
      btnAll: {
        btnQuery: false,
        btnAdd: true,
        btnDelete: true,
        btnModify: true,
        btnReset: true,
        btnWatchpsd: true
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.btnPermissions() // 按钮权限
      this.organTreeGet()
      if (this.btnAll.btnQuery) {
        this.queryList()
      }
    })
  },
  methods: {
    /**
     * 配置机构树*/
    organTreeGet() {
      this.config.organ_no.options = this.$store.getters.organTree
      this.config.is_open.options = dictionaryFieds('IS_OPEN')
    },
    /**
     * 按钮权限配置*/
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
    },
    /**
     * 按钮：查询*/
    queryList() {
      this.$refs.tableListRef.queryList(1)
    }
  }
}
</script>
<style scoped></style>
