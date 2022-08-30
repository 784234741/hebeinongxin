<!--  -->
<template>
  <div class="app-container">
    <div class="sun-content">
      <div class="filter-container">
        <sun-form
          :config="config"
          :query="btnAll.btnQuery"
          :default-form="defaultForm"
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
      :btn-all="btnAll"
      :default-form="defaultForm"
    />
  </div>
</template>

<script>
import { SunForm } from '@/components' // 表单
import { config } from './info' // 表单配置
import TableList from './component/table' // 表格
import { permissionsBtn } from '@/utils/permissions' // 权限配置
export default {
  name: 'Loss',
  components: { SunForm, TableList },
  data() {
    return {
      config: config(this),
      defaultForm: {
        warn_type: '',
        paper_type: '',
        acc_no: '',
        organ_no: ''
      },
      btnAll: {
        // 当前页需要配置权限的按钮  权限获取
        btnChangeState: true,
        btnQuery: true
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.$nextTick().then(() => {
      // if (this.btnAll.btnQuery) {
      //   this.queryList()
      // }
    })
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.btnPermissions() // 按钮权限
    this.$nextTick().then(() => {
      this.organTreeGet()
      this.queryList()
    })
  },
  methods: {
    /**
     * 按钮权限配置*/
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
      // this.btnAll = {
      //   btnChangeState: false,
      //   btnQuery: false
      // }
    },
    /**
     * 配置机构树*/
    organTreeGet() {
      this.config.organ_no.options = this.$store.getters.organTree
    },
    /**
     * 按钮：查询*/
    queryList() {
      this.$refs.tableListRef.queryList()
    }
  }
}
</script>
<style scoped></style>
