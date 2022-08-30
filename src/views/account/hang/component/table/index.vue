<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        ref="button"
        :btn-hanging="$attrs['btn-all'].btnHanging"
        @handleHanging="handleHanging"
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
            <span v-if="item.name === 'bk_state'">{{
              row[item.name] | accState
            }}</span>
            <span v-else-if="item.name === 'hd_state'">{{
              row[item.name] | hdState
            }}</span>
            <span v-else-if="item.name === 'report_state'">{{
              row[item.name] | reportState
            }}</span>
            <span v-else-if="item.name === 'organ_no'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template>
    </sun-table>
  </div>
</template>
<script>
import { configTable } from './info' // 表头、表单配置
import { SunTable, SunButton } from '@/components'
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { commonBlank } from '@/utils/common.js' // 字典常量
import { AccHang } from '@/api'
import {
  commonMsgWarn,
  commonMsgConfirm,
  commonMsgSuccess
} from '@/utils/message.js' // 提示信息
const { dormancyManage } = AccHang
export default {
  name: 'TableList',
  components: { SunTable, SunButton },
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
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.currentRows = val
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
        parameterList: [{}],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        acc_no: this.defaultForm.acc_no,
        report_state: this.defaultForm.report_state,
        bk_state: this.defaultForm.bk_state,
        hd_state: this.defaultForm.hd_state,
        organ_no:
          this.defaultForm.organ_no || `#${this.$store.getters.organNo}`,
        currentPage: currentPage,
        pageSize: this.pageList.pageSize
      }
      // query
      dormancyManage(msg)
        .then((response) => {
          const { returnList, totalNum, currentPage } = response.retMap
          this.tableData = returnList
          this.pageList.totalNum = totalNum
          this.pageList.currentPage = currentPage
          this.showLoading()
        })
        .catch(() => {
          this.showLoading()
        })
    },
    /**
     * btn - 久悬上报*/
    handleHanging() {
      // const rows = this.currentRow.length
      const arr = this.currentRows
      if (arr === undefined) commonMsgWarn('请选择需要上报的久悬账户!', this)
      else {
        if (commonBlank(this.currentRows.length)) {
          commonMsgWarn('请选择需要上报的久悬账户!', this)
          return
        } else {
          var err_acc = ''
          for (var i = 0; i < arr.length; i++) {
            if (
              arr[i].report_state === '2' ||
              arr[i].hd_state === '2' ||
              arr[i].bk_state !== '5'
            ) {
              err_acc += ',' + arr[i].acc_no
            }
          }
          if (!commonBlank(err_acc)) {
            commonMsgWarn(
              '只有行内久悬、人行未久悬及未上报成功账户可上报，以下账户不符合：' +
                err_acc.substr(1, err_acc.length),
              this
            )
            return
          }
        }
        const dataJason = []
        this.currentRows.forEach((item) => {
          dataJason.push({
            acc_no: item.acc_no
          })
        })
        commonMsgConfirm(
          '是否确定上报所选中的' + this.currentRows.length + '条久悬账户？',
          this,
          (param) => {
            if (param) {
              this.showLoading()
              var msg = {
                parameterList: dataJason,
                oper_type: dictionaryGet('OPERATE_OTHER'),
                user_no: this.$store.getters.userNo,
                organ_no: this.$store.getters.organNo
              }
              dormancyManage(msg)
                .then((response) => {
                  commonMsgSuccess(response.retMsg, this)
                  this.showLoading()
                  this.queryList(1)
                })
                .catch(() => {
                  this.showLoading()
                })
              this.changeVisible(false) // 弹出框关闭
            }
          }
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
