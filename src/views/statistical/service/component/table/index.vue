<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        ref="button"
        :btn-export="$attrs['btn-all'].btnExport"
        @handleExport="handleExport"
      />
    </div>
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      :selection="true"
      :index-number="true"
      @current-change="currentChange"
      @pagination="getList"
    >
      <template slot="tableColumn">
        <el-table-column prop="organ_no" label="银行机构名称">
          <div slot-scope="{ row }">
            <span>{{ row.organ_no | organNameFormat }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="open_date" label="年月份">
          <div slot-scope="{ row }">
            <span>{{ row.open_date }}</span>
          </div>
        </el-table-column>
        <el-table-column label="本月新增开户数量" align="center">
          <el-table-column prop="small_enterprise" label="小微企业">
            <div slot-scope="{ row }">
              <span>{{ row.small_enterprise }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="individual_business" label="个体工商户">
            <div slot-scope="{ row }">
              <span>{{ row.individual_business }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="subtotal" label="小计">
            <div slot-scope="{ row }">
              <span>{{ row.subtotal }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="month_subtotal" label="上月小计">
            <div slot-scope="{ row }">
              <span>{{ row.month_subtotal }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="year_subtotal" label="去年同期小计">
            <div slot-scope="{ row }">
              <span>{{ row.year_subtotal }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="from_last_month" label="环比上月">
            <div slot-scope="{ row }">
              <span>{{ row.from_last_month }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="compared_last_year" label="同比去年">
            <div slot-scope="{ row }">
              <span>{{ row.compared_last_year }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="1月至本月新增开户数量" align="center">
          <el-table-column prop="small_enterprise_sum" label="小微企业">
            <div slot-scope="{ row }">
              <span>{{ row.small_enterprise_sum }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="individual_business_sum" label="个体工商户">
            <div slot-scope="{ row }">
              <span>{{ row.individual_business_sum }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="year_subtotal_sum" label="小计">
            <div slot-scope="{ row }">
              <span>{{ row.year_subtotal_sum }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="year_subtotal_homo" label="去年同期小计">
            <div slot-scope="{ row }">
              <span>{{ row.year_subtotal_homo }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="compared_last_year_sum" label="同比去年">
            <div slot-scope="{ row }">
              <span>{{ row.compared_last_year_sum }}</span>
            </div>
          </el-table-column>
        </el-table-column>
      </template>
    </sun-table>
  </div>
</template>
<script>
import { configTable } from './info' // 表头、表单配置
import { SunButton, SunTable } from '@/components'
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { organNameFormat } from '@/filters'
import { exportXlsx } from '@/utils/common'
import { Staser } from '@/api'
const { query } = Staser
export default {
  name: 'TableList',
  components: { SunButton, SunTable },
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
      tableData: [],
      currentRow: [], // 选中行
      modelPath: '',
      modelName: 'account002.xls', // 下载模板名称
      pageList: {
        totalNum: 0,
        currentPage: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      }
    }
  },
  methods: {
    currentChange(val) {
      this.currentRow = val
    },
    /**
     *页码更新 */
    getList(param) {
      this.queryList(param.currentPage)
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      const formData = this.defaultForm
      this.showLoading()
      const msg = {
        parameterList: [{ }],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        organ_no: formData.organ_no || this.$store.getters.organNo,
        count_month: formData.count_month,
        currentPage: currentPage,
        pageSize: this.pageList.pageSize
      }
      query(msg)
        .then((response) => {
          const { returnList, totalNum } = response.retMap
          this.tableData = returnList
          this.pageList.totalNum = totalNum
        })
        .catch(() => {
          this.showLoading()
        })
    },
    /**
     * btn - 导出 下载excel*/
    handleExport() {
      // 格式化表格数据
      const formatJson = (filterVal, jsonData) => {
        return jsonData.map((v) =>
          filterVal.map((j) => {
            if (j === 'organ_no') {
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
      exportXlsx(tHeader, data, '小微企业开户率监测统计表')
    },
    /**
     * 加载中动画配置*/
    showLoading() {
      // this.listLoading = !this.listLoading
    }
  }
}
</script>
<style lang="scss" scoped></style>
