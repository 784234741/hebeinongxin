<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :btn-print="$attrs['btn-all'].btnPrint"
        @handelPrint="handelPrint"
      />
    </div>
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
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
            <span v-if="item.name === 'organ_no'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span v-else-if="item.name === 'check_date'">{{
              row[item.name] | date10Format
            }}</span>

            <span v-else-if="item.name === 'check_frequency'">{{
              row[item.name] | checkFrequency
            }}</span>

            <span v-else-if="item.name === 'check_channel'">{{
              row[item.name] | checkChannel
            }}</span>
            <span v-else-if="item.name === 'acc_type'">{{
              row[item.name] | accType2
            }}</span>
            <span v-else-if="item.name === 'check_result'">{{
              row[item.name] | checkResult
            }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template></sun-table>
  </div>
</template>
<script>
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { printHtml } from '@/utils/common'

import { configTable } from './info' // 表头、表单配置
import { SunButton, SunTable } from '@/components' // 按钮

import { SysReconciliationInfo } from '@/api'
const { reconciliationInfo } = SysReconciliationInfo
export default {
  name: 'TableList',
  components: { SunTable, SunButton },
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
      tableData: [],
      currentRow: [], // 选中行
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      },
      downloadLoading: false,
      currentIndex: 0 // 当前行索引
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
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      const msg = {
        parameterList: [{}],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        ...this.defaultForm,
        organ_no: `#${this.$store.getters.organNo}`,
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      reconciliationInfo(msg).then((response) => {
        const { returnList, totalNum } = response.retMap
        this.tableData = returnList
        this.pageList.totalNum = totalNum
        this.showLoading()
      })
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
     * 加载中动画配置*/
    showLoading() {
      this.listLoading = !this.listLoading
    },
    handelPrint() {
      console.log('print')
      // console.log(this.$children[1].$refs.tableRef)
      const content = this.$children[1].$refs.tableRef.$el.innerHTML
      printHtml(content)
    }
  }
}
</script>
<style lang="scss" scoped></style>
