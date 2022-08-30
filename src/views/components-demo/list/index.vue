<template>
  <div class="app-container">
    <div class="sun-content">
      <div class="filter-container">
        <sun-form :config="config" :default-form="defaultForm" @query="queryList">
          <!-- <template slot="header">
          </template> -->
        </sun-form>
      </div>
    </div>
    <table-list ref="tableList" :table-data="tableData" :loading="listLoading" :page-list="pageList" @query="queryList" />
  </div>
</template>

<script>
import { SysUser } from '@/api'
import waves from '@/directive/waves' // waves directive
import SunForm from '@/components/SunForm' // 表单
import { config } from './info' // 表单配置
import TableList from './component/table' // 表格

const { query } = SysUser

export default {
  name: 'User',
  components: { SunForm, TableList },
  directives: { waves },
  data() {
    return {
      config: config(this),
      defaultForm: {
        userId: 10,
        userRadio: '1',
        userCheckbox: ['1']
      },
      tableData: [],
      pageList: {
        total: 0,
        page: 1, // 当前页
        pageSize: 20 // 当前页显示条数
      },
      listLoading: false // 加载中动画
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    /**
     * 按钮：查询*/
    queryList() {
      this.listLoading = true
      query(this.pageList).then(response => {
        this.tableData = response.result.items
        this.pageList.total = response.result.total
        this.listLoading = false
      })
    }
  }
}
</script>
<style scoped>

</style>
