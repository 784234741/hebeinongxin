<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        ref="button"
        :btn-report="$attrs['btn-all'].btnReport"
        @handleReport="handleReport"
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
            <span v-if="item.name === 'acc_type'">{{
              row[item.name] | accType
            }}</span>
            <span v-else-if="item.name === 'oper_type'">{{
              row[item.name] | handleType
            }}</span>
            <span
              v-else-if="item.name === 'report_state'"
              :style="
                row[item.name] === '2'
                  ? { color: 'red' }
                  : { color: $store.state.settings.theme }
              "
            >{{ row[item.name] | repState }}</span>
            <span v-else-if="item.name === 'sys_type'">{{
              row[item.name] | reportSysType
            }}</span>
            <span v-else-if="item.name === 'trans_date'">{{
              row[item.name] | date10Format
            }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template>
    </sun-table>
    <sun-form-dialog
      :title="dialog.title"
      :visible="dialog.visible"
      :form-config="dialog.config"
      :form-data="dialog.formData"
      :width="dialog.width"
      :label-width="dialog.labelWidth"
      @dialogClose="changeVisible"
      @dialogSubmit="dialogSumbit"
    /><!--线下报备弹出框-->
  </div>
</template>
<script>
import { configTable, config } from './info' // 表头、表单配置
import { SunTable, SunButton, SunFormDialog } from '@/components'
import { date10Format } from '@/filters'
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { RepOff } from '@/api'
// import cryptoAES from '@/utils/cryptoAES'
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm
} from '@/utils/message.js' // 提示信息
const { query, report } = RepOff
export default {
  name: 'TableList',
  components: { SunTable, SunButton, SunFormDialog },
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
        currentPage: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      },
      dialog: {
        title: '线下报备',
        oprate: 'add',
        width: '90rem',
        labelWidth: '12rem',
        visible: false,
        formData: {
          acc_no: '',
          acc_name: '',
          report_state: '',
          acc_type: '',
          organ_no: '',
          oper_type: '',
          report_date: '',
          pbc_organ_no: '',
          acc_state: '',
          trans_date: ''
        },
        config: config(this)
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      const currentRow = val
      if (currentRow.length > 1) {
        currentRow.sort(function(a, b) {
          return a.index - b.index
        }) // 选中行排序
      }
      this.currentRow = val
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
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      const msg = {
        parameterList: [{ oper_type: this.defaultForm.oper_type }],
        oper_type: 'hrepQuery',
        currentPage: currentPage,
        pageSize: this.pageList.pageSize,
        open_organ:
          this.defaultForm.open_organ || `#${this.$store.getters.organNo}`,
        acc_type: this.defaultForm.acc_type,
        start_date:
          this.defaultForm.date_two !== null
            ? this.defaultForm.date_two[0]
            : '',
        end_date:
          this.defaultForm.date_two !== null ? this.defaultForm.date_two[1] : ''
      }
      query(msg)
        .then((response) => {
          const { list, totalNum, currentPage } = response.retMap
          this.tableData = list
          this.pageList.totalNum = totalNum
          this.pageList.currentPage = currentPage
          this.showLoading()
        })
        .catch(() => {
          this.showLoading()
        })
    },
    /**
     * btn - 线下报备*/
    handleReport() {
      commonMsgConfirm(
        '是否确认此账户已在人行报备成功?',
        this,
        (flag) => {
          if (flag) {
            const rows = this.currentRow.length
              if (rows === 0) {
                commonMsgWarn('请勾选需要线下报备的报备信息', this)
                return
              } else if (rows > 1) {
                commonMsgWarn('只能同时操作一条数据，请重新勾选', this)
                return
              }
              this.dialog.config.organ_no.options = this.$store.getters.organTree
              this.dialog = Object.assign({}, this.dialog, {
                title: '线下报备',
                oprate: 'report'
              })
              this.changeVisible(true)
              this.$nextTick(() => {
                // 弹出框加载完成后赋值
                this.dialog.formData = Object.assign({}, this.currentRow[0])
                this.dialog.formData.trans_date = date10Format(
                  this.dialog.formData.trans_date
                )
              }
            )
          }
        }
      )

    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    },
    /**
     * 弹出框 - 线下报备确认*/
    dialogSumbit() {
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
        if (param) {
          const formData = Object.assign({}, this.dialog.formData)
          const before_data = this.currentRow[0]
          this.showLoading()
          const param = {
            parameterList: [
              {
                acc_no: formData.acc_no,
                report_state: formData.report_state
              }
            ],
            before_data: before_data,
            oper_type: dictionaryGet('OPERATE_MODIFY'),
            sys_type: formData.sys_type,
            last_modi_date: formData.last_modi_date
          }
          report(param)
            .then((response) => {
              commonMsgSuccess('操作成功！', this)
              this.showLoading()
              this.queryList(this.pageList.currentPage)
            })
            .catch(() => {
              this.showLoading()
            })
          this.changeVisible(false) // 弹出框关闭
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
