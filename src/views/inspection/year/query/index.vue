<!--
 * 年检信息查询页面
 !-->
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
import { SunForm } from '@/components' // 公共表单
import { config } from './info' // 表单配置
import TableList from './components' // 表格
export default {
  name: 'YearQuery',
  components: {
    SunForm,
    TableList
  },
  data() {
    return {
      config: config(this), // 表单配置
      defaultForm: {
        open_organ: '',
        acc_no: '',
        acc_name: '',
        year_no: '2021',
        annual_state: '',
        confirm_state: '',
        report_state: ''
      }, // 表单数据
      btnAll: {
        // 当前页需要配置权限的按钮  权限获取
        btnhandCheck: true,
        btnPrint: true,
        btnExport: true
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.organTreeGet()
    })
  },
  methods: {
    /**
     * 配置机构树*/
    organTreeGet() {
      this.config.open_organ.options = this.$store.getters.organTree
    },
    /*
     ** 查询数据
     */
    queryList() {
      this.$refs['tableListRef'].queryList()
    }
  }
}
</script>

<style></style>
