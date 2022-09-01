<!--
 * 年检规则配置页面
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
  name: 'RuleConfig',
  components: {
    SunForm,
    TableList
  },
  data() {
    return {
      config: config(this), // 表单配置
      defaultForm: {
        organ_no: '',
        rule_no: '',
        rule_desc: '',
        is_open: '',
        rule_type: ''
      }, // 表单数据
      btnAll: {
        // 当前页需要配置权限的按钮  权限获取
        btnAdd: true,
        btnModify: true,
        btnDelete: true
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
      this.$refs['tableListRef'].queryList(this.defaultForm)
    }
  }
}
</script>

<style></style>
