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
import { dictionaryGet } from '@/utils/dictionary.js' // ????????????
// import { dateNowFormat } from '@/utils/date.js' // ???????????????
import { exportXlsx } from '@/utils/common'
import {
  accType,
  repState,
  reportSysType,
  handleType,
  date10Format
} from '@/filters'

import { configTable } from './info' // ?????????????????????
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
      currentRow: null, // ?????????
      pageList: {
        totalNum: 0,
        page: 1, // ?????????
        pageSize: 20 // ?????????????????????
      },
      downloadLoading: false,
      currentIndex: 0, // ???????????????
      dialog: {
        title: '??????????????????',
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
            title: '????????????',
            arr: [
              { label: '??????', name: 'acc_no' },
              { label: '????????????', name: 'acc_name' },
              { label: '????????????', name: 'open_date' },
              { label: '????????????', name: 'open_organ' },
              { label: '????????????', name: 'acc_type' },
              { label: '????????????', name: 'acc_state' },
              { label: '??????', name: 'cny_type' },
              { label: '????????????', name: 'susp_state' },
              { label: '????????????', name: 'close_date' },
              { label: '????????????', name: 'expire_date' }
            ]
          },
          {
            title: '????????????',
            arr: [
              { label: '????????????????????????', name: 'license_no' },
              { label: '????????????????????????', name: 'ent_credit_no' },
              { label: '????????????', name: 'cus_name' },
              { label: '????????????', name: 'cus_type' },
              { label: '????????????', name: 'reg_money' },
              { label: '????????????', name: 'start_date' },
              { label: '????????????', name: 'end_date' },
              { label: '????????????', name: 'reg_adr' },
              { label: '????????????', name: 'reg_scope' },
              { label: '??????????????????', name: 'hd_type' },
              { label: '???????????????', name: 'depo_type' },
              { label: '????????????', name: 'adr_id' },
              { label: '????????????', name: 'zcode' },
              { label: '??????', name: 'legal_name' },
              { label: '???????????????', name: 'legal_id' },
              { label: '??????????????????', name: 'legal_phone' },
              { label: '?????????????????????', name: 'legal_end' },
              { label: '?????????', name: 'agent_name' },
              { label: '??????????????????', name: 'agent_id' },
              { label: '?????????????????????', name: 'agent_phone' },
              { label: '????????????????????????', name: 'agent_end' },
              { label: '??????????????????', name: 'org_no' }
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
     * btn - ??????excel*/
    handleExport() {
      // ?????????????????????
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
              return '????????????'
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
      exportXlsx(tHeader, data, '????????????????????????')
    },
    // ????????????
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
    // ????????????
    currentChange(val) {
      this.currentRow = val
    },
    /**
     * ???????????????*/
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
     * ????????? - ??????
     * @param {Boolean} param ???????????????????????????*/
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
     *???????????? */
    getList(param) {
      this.queryList(param.currentPage)
    },
    /**
     * ?????????????????????*/
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
