<!--
 * 年检日期配置
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
import TableList from './component' // 表格
export default {
  name: 'DateConfig',
  components: {
    SunForm,
    TableList
  },
  data() {
    return {
      config: config(this), // 表单配置
      defaultForm: {
        year_no: '',
        is_open: ''
      }, // 表单数据
      btnAll: {
        // 当前页需要配置权限的按钮  权限获取
        btnAdd: true,
        btnModify: true,
        btnDelete: true
      }
    }
  },
  mounted() {},
  methods: {
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
