<template>
  <div class="app-container">
    <div class="sun-content">
      <div class="filter-container">
        <sun-form
          :config="config"
          :default-form="defaultForm"
          :query="btnAll.btnQuery"
          :reset="false"
          @query="queryList"
        >
          <!-- <template slot="header">
          </template> -->
        </sun-form>
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
import store from '@/store'
export default {
  name: 'Timing',
  components: { SunForm, TableList },
  data() {
    return {
      config: config(this),
      defaultForm: {
        job_key: '',
        job_name: '',
        cron_expression: '',
        job_status: '',
        job_server: '',
        service_module: ''
      },
      btnAll: {
        // 当前页需要配置权限的按钮  权限获取
        btnQuery: false,
        btnAdd: true,
        btnModify: true,
        btnDelete: true
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      if (this.btnAll.btnQuery) {
        this.queryList()
      }

      // 设置 应用服务器ID 外表字典
      setTimeout(() => {
        const data = this.$store.getters.externalData.SERVER_ID
        this.config.job_server.options = data
      }, 1000)
    })
  },

  created() {
    this.set()
    this.btnPermissions()
  },
  methods: {
    /**
     * 按钮权限配置*/
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
    },
    // 设置外表数据
    async set() {
      if (!this.$store.getters.externalData.SERVER_ID) {
        await store.dispatch('common/setExternalData', 'SERVER_ID')
      }
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
