<!--  -->
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
export default {
  name: 'Phone',
  components: { SunForm, TableList },
  data() {
    return {
      config: config(this),
      defaultForm: {
        cus_organ: '',
        auth_phone: ''
      },
      btnAll: {
        // 当前页需要配置权限的按钮  权限获取
        btnQuery: true,
        btnChangeState: true
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.btnPermissions() // 按钮权限
    this.$nextTick().then(() => {
      this.organTreeGet()
      if (this.btnAll.btnQuery) {
        this.queryList()
      }
      // this.roleInfoTitle()
    })
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {
  },
  methods: {
    /**
     * 按钮权限配置*/
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
    },
    /**
     * 配置机构树*/
    organTreeGet() {
      this.config.cus_organ.options = this.$store.getters.organTree
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
