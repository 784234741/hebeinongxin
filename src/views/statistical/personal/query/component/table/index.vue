<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        ref="buttonExport"
        :btn-export="true"
        :loading="downloadLoading"
        @handleDownload="handleDownload"
      />
    </div>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="tableData"
      fit
      border
      highlight-current-row
    >
      <el-table-column
        v-for="item in tableColumn"
        :key="item.id"
        :prop="item.name"
        :label="item.label"
        :width="item.width"
        align="center"
      />
    </el-table>
    <sun-pagination
      v-show="pageList.totalNum > 0"
      :total="pageList.totalNum"
      :page.sync="pageList.page"
      :limit.sync="pageList.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { configTable } from './info' // 表头配置
import { SunPagination, SunButton } from '@/components' // 按钮 页码

export default {
  name: 'TableList',
  components: { SunPagination, SunButton },
  directives: { waves },
  props: {
    defaultForm: {
      type: Object,
      default: function() {
        return {}
      }
    },
    rolelist: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      listLoading: false,
      tableColumn: configTable(),
      downloadLoading: false,
      tableData: [],
      pageList: {
        totalNum: 4,
        page: 1, // 当前页
        pageSize: 20, // 当前页显示条数
        currentPage: ''
      },
      header: ['date', 'name', 'address']
    }
  },
  watch: {
    loading(value) {
      this.listLoading = this.loading
    }
  },
  created() {
    this.listLoading = this.loading
  },
  methods: {
    handleAdd() {},
    /**
     *页码更新 */
    getList() {
      this.queryList()
    },
    /**
     * btn - 下载excel*/
    handleDownload(event) {
      if (event === 'all') {
        this.tableData = []
      } else if (event === 'page') {
        this.tableData = []
      }
      this.$refs.buttonExport.componentExport(this.header, this.tableData)
    },
    /**
     * 加载中动画配置*/
    showLoading() {
      this.listLoading = !this.listLoading
    }
  }
}
</script>
<style lang="scss" scoped></style>
