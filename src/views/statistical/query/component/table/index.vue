<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :btn-export="$attrs['btn-all'].btnExport"
        @handleExport="handleExport"
      />
    </div>
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      :selection="false"
      :index-number="false"
      @pagination="getList"
    >
      <template slot="tableColumn">
        <el-table-column
          v-for="item in tableColumn"
          :key="item.id"
          :prop="item.name"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <div slot-scope="{ row }">
            <span v-if="item.name === 'ser_type'">{{
              row[item.name] | serverType
            }}</span>
            <span v-else-if="item.name === 'irp_type'">{{
              row[item.name] | irpType
            }}</span>
            <span v-else-if="item.name === 'is_open'">{{
              row[item.name] | startSign
            }}</span>
            <span v-else-if="item.name === 'last_modi_date'">{{
              row[item.name] | dateTimeFormat
            }}</span>
            <span v-else-if="item.name === 'organ_no'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template></sun-table>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { configTable } from './info' // 表头配置
import { SunTable, SunButton } from '@/components' // 按钮 页码
import { SaPerAcc } from '@/api'
import {
  serverType,
  irpType,
  startSign,
  dateTimeFormat,
  organNameFormat
} from '@/filters'
const { query } = SaPerAcc
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { exportXlsx } from '@/utils/common'
export default {
  name: 'TableList',
  components: { SunTable, SunButton },
  directives: { waves },
  props: {
    defaultForm: {
      type: Object,
      default: function() {
        return {}
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
        totalNum: 0,
        page: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
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
    handleAdd() {
    },
    /**
     *页码更新 */
    getList(pageParam) {
      const { currentPage, pageSize } = pageParam
      this.pageList.pageSize = pageSize
      this.pageList.page = currentPage
      this.queryList()
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      const formData = this.defaultForm
      this.showLoading()
      const msg = {
        parameterList: [{}],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        open_mon: formData.open_mon,
        organ_no: formData.organ_no || this.$store.getters.organNo,
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      // query
      query(msg).then((response) => {
        const {
          retMap: { returnList, totalNum }
        } = response
        this.tableData = returnList
        this.pageList.totalNum = totalNum
        this.showLoading()
      })
    },
    /**
     * btn - 导出下载excel*/
    handleExport() {
      // 格式化表格数据
      const formatJson = (filterVal, jsonData) => {
        return jsonData.map((v) =>
          filterVal.map((j) => {
            if (j === 'ser_type') {
              return serverType(v[j])
            } else if (j === 'irp_type') {
              return irpType(v[j])
            } else if (j === 'is_open') {
              return startSign(v[j])
            } else if (j === 'last_modi_date') {
              return dateTimeFormat(v[j])
            } else if (j === 'organ_no') {
              return organNameFormat(v[j])
            } else {
              return v[j]
            }
          })
        )
      }
      const tHeader = []
      const filterVal = []
      this.tableColumn.map((item) => {
        tHeader.push(item.label)
        filterVal.push(item.name)
      })
      const data = formatJson(filterVal, this.tableData)
      exportXlsx(tHeader, data, '个人结算账户开户')
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
