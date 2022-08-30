<!--  -->
<template>
  <div class="app-container">
    <div class="sun-content">
      <div class="filter-container">
        <sun-form
          label-width="15rem"
          :config="config"
          :query="btnAll.btnQuery"
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
import { SunForm } from '@/components' // 表单
import { config } from './info' // 表单配置
import TableList from './component/table' // 表格
import { permissionsBtn } from '@/utils/permissions' // 权限配置
export default {
  name: 'StatisticalEnterprise',
  components: { SunForm, TableList },
  data() {
    return {
      config: config(this),
      defaultForm: {
        organ_no: '',
        count_month: ''
      },
      btnAll: {
        // 当前页需要配置权限的按钮  权限获取
        btnQuery: true,
        btnExport: true
      }
    }
  },
  created() {
    this.btnPermissions()
  },
  mounted() {
    this.$nextTick().then(() => {
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
    },
    /**
     * 按钮：查询*/
    queryList() {
      this.$refs.tableListRef.queryList(1)
    },
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
    }
  }
}
</script>
<style scoped></style>
