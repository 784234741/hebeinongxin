<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :btn-change-state="$attrs['btn-all'].btnChangeState"
        @handleChangeState="handleChangeState"
      />
    </div>
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      :selection="true"
      :index-number="false"
      @selection-change="handleSelectionChange"
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
            <span
              v-if="item.name === 'warn_status'"
              :style="{color: $store.state.settings.theme, cursor: 'pointer'}"
              @click="openDialog(row)"
            >{{ '详情' }}</span>
            <span v-else-if="item.name === 'organ_no'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span v-else-if="item.name === 'paper_type'">{{
              row[item.name] | paperType2
            }}</span>
            <span v-else-if="item.name === 'check_status'">{{
              row[item.name] | checkStatus
            }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template></sun-table>

    <sun-table-dialog
      :title="dialog.title"
      :width="dialog.width"
      :visible="dialog.visible"
      :table-column="dialog.tableColumn"
      :table-data="dialog.tableData"
      :btn-cancle="false"
      :btn-submit="false"
      @dialogClose="changeVisible"
    >
      <template slot-scope="{ item, row }">
        <span
          v-if="item.name === 'cus_name'"
          :style="{color: $store.state.settings.theme, cursor: 'pointer'}"
          @click="openDialog(row)"
        >{{ row[item.name] }}</span>
        <span v-else-if="item.name === 'organ_no'">{{
          row[item.name] | organNameFormat
        }}</span>
        <span v-else-if="item.name === 'close_organ'">{{
          row[item.name] | organNameFormat
        }}</span>
        <span
          v-else-if="item.name === 'close_date'"
        >
          {{ row[item.name] | date10Format }}
        </span>
        <span v-else>{{ row[item.name] }}</span>
      </template> </sun-table-dialog><!--详情弹出框-->
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm
} from '@/utils/message.js' // 提示信息
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
// import { commonBlank } from '@/utils/common'
// import { dateNowFormat } from '@/utils/CertificateTableListdate.js' // 日期格式化

import { configTable, configTable2 } from './info' // 表头、表单配置
import { SunButton, SunTable, SunTableDialog } from '@/components'

import { WarningFrequentOpenClose } from '@/api'
const { frequentOpenClose } = WarningFrequentOpenClose
export default {
  name: '',
  components: { SunTable, SunButton, SunTableDialog },
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
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: 20 // 当前页显示条数
      },
      downloadLoading: false,
      currentIndex: 0, // 当前行索引
      dialog: {
        title: '客户频繁开销户详情',
        width: '90rem',
        visible: false,
        tableColumn: configTable2(),
        tableData: []
      }
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
    // 表格选择单行
    handleSelectionChange(val) {
      this.currentRow = val
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      const msg = {
        parameterList: [{}],
        organ_no: this.defaultForm.organ_no || `#${this.$store.getters.organNo}`,
        // organ_no: '37216',
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }

      // 查询请求
      frequentOpenClose(msg).then((response) => {
        const { returnList, totalNum } = response.retMap
        this.tableData = returnList
        this.pageList.totalNum = totalNum
        this.showLoading()
      })
    },

    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    }, // handleAdd

    // 更改状态
    handleChangeState() {
      const rows = this.currentRow
      if (rows.length === 0) {
        commonMsgWarn('未选择任何数据!', this)
        return
      } else if (rows.length > 1) {
        commonMsgWarn('仅支持单笔操作!', this)
        return
      }
      commonMsgConfirm('是否确定将预警状态改为已核实？', this, (param) => {
        if (param) {
          const msg = {
            parameterList: [{}],
            oper_type: 'changeWarnStatus',
            cus_no: this.currentRow[0].cus_no,
            check_status: '1',
            user_no: this.$store.getters.userNo
          }
          frequentOpenClose(msg)
            .then((response) => {
              commonMsgSuccess('预警状态更改成功！', this)
              this.queryList(this.pageList.page)
            })
            .catch(() => {
              this.showLoading()
            })
          this.changeVisible(false) // 弹出框关闭
        }
      })
    },
    // 详情弹框查询
    openDialog(row) {
      const msg = {
        parameterList: [{}],
        organ_no: row.organ_no,
        cus_no: row.cus_no,
        oper_type: 'selectDetail',
        currentPage: 1,
        pageSize: this.pageList.pageSize
      }
      frequentOpenClose(msg).then((response) => {
        const { returnList } = response.retMap
        this.dialog.tableData = returnList
        this.dialog.visible = true
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
    }
  }
}
</script>
<style lang="scss" scoped></style>
