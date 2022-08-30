<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button :btn-export="$attrs['btn-all'].btnExport" @handleExport="handleExport" />
    </div>
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      @current-change="currentChange"
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
              v-if="item.name === 'acc_no'"
              :style="{color: $store.state.settings.theme, cursor: 'pointer'}"
              @click="openDialog(row)"
            >{{ row[item.name] }}</span>
            <span v-else-if="item.name === 'organ_no'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span v-else-if="item.name === 'acc_type'">{{
              row[item.name] | accType
            }}</span>
            <span v-else-if="item.name === 'warn_type'">{{
              row[item.name] | warnType
            }}</span>
            <span v-else-if="item.name === 'warn_date'">
              {{ row[item.name] | date10Format }}
            </span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template></sun-table>

    <sun-describe-dialog
      :title="dialog.title"
      :width="dialog.width"
      :top="dialog.top"
      :describe-config="dialog.describeConfig"
      :box-style="dialog.boxStyle"
      :visible.sync="dialog.visible"
      :des-message="dialog.desLabelData"
      :des-data="dialog.desData"
    >
      <template slot-scope="{ item, value }">
        <span v-if="item === 'acc_type'"> {{ value | accType }}</span>
        <span v-else-if="item === 'acc_state'"> {{ value | accState }}</span>
        <span
          v-else-if="
            item === 'open_date' ||
              item === 'close_date' ||
              item === 'expire_date' ||
              item === 'start_date' ||
              item === 'end_date' ||
              item === 'legal_end' ||
              item === 'agent_end'
          "
        >
          {{ value | date10Format }}</span>
        <span v-else-if="item === 'hd_type'"> {{ value | hdType }}</span>
        <span v-else-if="item === 'cny_type'"> {{ value | cnyType }}</span>
        <span v-else-if="item === 'open_organ'"> {{ value | organNameFormat }}</span>
        <span v-else>{{ value }}</span>
      </template>
    </sun-describe-dialog>
    <!-- <Des
      :title="dialog.title"
      :width="dialog.width"
      :top="dialog.top"
      :visible.sync="dialog.visible"
      :des-message="dialog.desLabelData"
      :des-data="dialog.desData"
    /> -->
  </div>
</template>
<script>
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
// import { dateNowFormat } from '@/utils/date.js' // 日期格式化
import { exportXlsx } from '@/utils/common'
import {
  accType,
  repState,
  reportSysType,
  handleType,
  date10Format
} from '@/filters'

import { configTable } from './info' // 表头、表单配置
import { SunButton, SunTable, SunDescribeDialog } from '@/components'
// import Des from '../des.vue'

import { WarningTemporaryWarn } from '@/api'
const { temporaryWarn, accInfo } = WarningTemporaryWarn
export default {
  name: 'AssessmentTableList',
  components: { SunTable, SunButton, SunDescribeDialog },
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
      btnArr: {
        btnExport: true
      },
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      currentRow: null, // 选中行
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: 20 // 当前页显示条数
      },
      downloadLoading: false,
      currentIndex: 0, // 当前行索引
      dialog: {
        title: '账户信息详情',
        width: '98%',
        top: '5vh',
        visible: false,
        describeConfig: {
          column: 4,
          border: false,
          labelStyle: {
            color: '#354052'
          },
          contentStyle: {
            paddingLeft: '6px',
            color: '#767e91'
          }
        },
        boxStyle: {
          padding: '2rem 2rem 2rem 4rem',
          margin: '0 3rem 3rem',
          borderRadius: '4px',
          boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
        },
        desLabelData: [
          {
            title: '账户信息',
            arr: [
              { label: '账号', name: 'acc_no' },
              { label: '账户名称', name: 'acc_name' },
              { label: '开户日期', name: 'open_date' },
              { label: '开户机构', name: 'open_organ' },
              { label: '账户类型', name: 'acc_type' },
              { label: '账户状态', name: 'acc_state' },
              { label: '币种', name: 'cny_type' },
              { label: '久悬标识', name: 'susp_state' },
              { label: '销户日期', name: 'close_date' },
              { label: '到期日期', name: 'expire_date' }
            ]
          },
          {
            title: '客户信息',
            arr: [
              { label: '开户许可证核准号', name: 'license_no' },
              { label: '统一社会信用代码', name: 'ent_credit_no' },
              { label: '客户名称', name: 'cus_name' },
              { label: '客户类型', name: 'cus_type' },
              { label: '注册资本', name: 'reg_money' },
              { label: '成立日期', name: 'start_date' },
              { label: '注销日期', name: 'end_date' },
              { label: '注册地址', name: 'reg_adr' },
              { label: '经营范围', name: 'reg_scope' },
              { label: '人行行业类型', name: 'hd_type' },
              { label: '存款人类别', name: 'depo_type' },
              { label: '地区代码', name: 'adr_id' },
              { label: '邮政编码', name: 'zcode' },
              { label: '法人', name: 'legal_name' },
              { label: '法人证件号', name: 'legal_id' },
              { label: '法人联系电话', name: 'legal_phone' },
              { label: '法人证件到期日', name: 'legal_end' },
              { label: '经办人', name: 'agent_name' },
              { label: '经办人证件号', name: 'agent_id' },
              { label: '经办人联系电话', name: 'agent_phone' },
              { label: '经办人证件到期日', name: 'agent_end' },
              { label: '组织机构代码', name: 'org_no' }
            ]
          }
        ],
        desData: {}
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
    /**
     * btn - 下载excel*/
    handleExport() {
      // 格式化表格数据
      const formatJson = (filterVal, jsonData) => {
        return jsonData.map((v) =>
          filterVal.map((j) => {
            if (j === 'acc_type') {
              return accType(v[j])
            } else if (j === 'report_state') {
              return repState(v[j])
            } else if (j === 'oper_type') {
              return handleType(v[j])
            } else if (j === 'sys_type') {
              return reportSysType(v[j])
            } else if (j === 'trans_date' || j === 'report_date') {
              return date10Format(v[j])
            } else if (j === 'report_detail') {
              return '报备详情'
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
      exportXlsx(tHeader, data, '年检到期预警信息')
    },
    // 合并表格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex <= 13) {
          if (rowIndex === 0 || rowIndex === 3 || rowIndex === 6) {
            return {
              rowspan: 3,
              colspan: 1
            }
          } else if (rowIndex === 9) {
            return {
              rowspan: 5,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    },
    // 选择单行
    currentChange(val) {
      this.currentRow = val
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      const msg = {
        parameterList: [
          {
            ...this.defaultForm,
            organ_no:
              this.defaultForm.organ_no || `#${this.$store.getters.organNo}`
          }
        ],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      // query
      temporaryWarn(msg).then((response) => {
        const { returnList, totalNum } = response.retMap
        this.tableData = returnList
        this.pageList.totalNum = totalNum
        this.pageList.currentPage = currentPage
        this.showLoading()
      })
    },

    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    },

    openDialog(row) {
      const msg = {
        parameterList: [],
        acc_no: row.acc_no,
        oper_type: 'selects'
      }
      accInfo(msg).then((res) => {
        const {
          retMap: { list }
        } = res
        this.dialog.desData = list[0]

        this.changeVisible(true)
      })
    },
    /**
     *页码更新 */
    getList(param) {
      this.queryList(param.currentPage)
    },
    /**
     * 加载中动画配置*/
    showLoading() {
      this.listLoading = !this.listLoading
    }
  }
}
</script>
<style lang="scss" scoped>
.scroe_dialog {
  height: 66vh;
  overflow: auto;
}
>>> .el-input__inner {
  border: none !important;
}
</style>
