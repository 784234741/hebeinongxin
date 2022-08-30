<!--
 * 年检日期配置
 !-->
<template>
  <div class="sun-content">
    <sun-table
      ref="tableww"
      table-ref="tableRef"
      :loading="tableData.listLoading"
      :table-data="tableData.data"
      :page-list="tableData.pageList"
      :selection="true"
      @current-change="currentChange"
      @pagination="getList"
    >
      <template slot="tableColumn">
        <el-table-column
          v-for="item in tableData.column"
          :key="item.id"
          :prop="item.name"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <div slot-scope="{ row }">
            <span v-if="item.name === 'last_modi_date'">{{
              row[item.name] | dateTimeFormat
            }}</span>
            <span
              v-else-if="item.name === 'end_date' || item.name === 'start_date'"
            >{{ row[item.name] | date10Format }}</span>
            <span v-else-if="item.name === 'is_open'">{{
              row[item.name] | startSign
            }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template>
    </sun-table>

    <!--按钮-->
    <div class="list-btn">
      <sun-button
        :btn-add="$attrs['btn-all'].btnAdd"
        :btn-modify="$attrs['btn-all'].btnModify"
        :btn-delete="$attrs['btn-all'].btnDelete"
        @handleAdd="handleAdd"
        @handleModify="handleModify"
        @handleDelete="handleDelete"
      />
    </div>

    <!--新增修改弹框-->
    <sun-form-dialog
      :title="dialog.title"
      :width="dialog.width"
      :visible="dialog.visible"
      :form-config="dialog.config"
      :form-data="dialog.formData"
      @dialogClose="dialogClose"
      @dialogSubmit="dialogSubmit"
    />
  </div>
</template>

<script>
import {
  commonMsgWarn,
  commonMsgConfirm,
  commonMsgSuccess
} from '@/utils/message.js' // 提示信息
import { SunTable, SunButton, SunFormDialog } from '@/components' // 公共组件
import { commonBlank, deepClone } from '@/utils/common' // 公共方法
import { dateNowFormat } from '@/utils/date.js' // 日期格式化
// import { dateTimeFormat } from '@/filters' // 日期格式化
import { column, config } from './info' // 配置信息
import { date10Format } from '@/filters' // 过滤器
import { dictionaryFieds } from '@/utils/dictionary' // 字典配置

import { yearCheck } from '@/api' // 接口
const { yearDateQuery } = yearCheck
export default {
  name: 'DateTable',
  components: {
    SunTable,
    SunButton,
    SunFormDialog
  },
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
      tableData: {
        listLoading: false,
        data: [],
        column: column(),
        pageList: {
          totalNum: 0,
          page: 1, // 当前页
          pageSize: 10 // 当前页显示条数
        }
      }, // 表格数据
      dialog: {
        title: '',
        visible: false,
        width: '40%',
        config: config(),
        formData: {
          year_no: '2022',
          is_open: '1',
          annual_time: []
        }
      }, // 弹框配置
      tableRow: {}, // 表格选中数据
      preModify: {} // 修改之前数据
    }
  },
  mounted() {
    // console.log(dictionaryFieds('CM1000'))
    this.queryList()
  },
  methods: {
    /**
     * 新增按钮
     */
    handleAdd() {
      this.dialogTitle = '新增'
      this.dialogChange(true)
      this.dialog.config.year_no.componentProps.disabled = false
      this.dialog.title = '新增年检日期'
    },
    /**
     * 修改按钮
     */
    handleModify() {
      this.dialogTitle = '修改'
      if (commonBlank(this.tableRow)) {
        commonMsgWarn('请勾选修改项', this)
        return
      }
      if (this.tableRow.length > 1) {
        commonMsgWarn('修改项只能唯一，请重新勾选', this)
        return
      }
      this.dialogChange(true)
      const { year_no, is_open, start_date, end_date } = this.tableRow
      this.$nextTick(() => {
        this.dialog.config.year_no.componentProps.disabled = true
        Object.assign(this.dialog.formData, {
          year_no,
          is_open,
          annual_time: [start_date, end_date]
        })
      })
    },
    /**
     * 删除按钮
     */
    handleDelete() {
      if (commonBlank(this.tableRow)) {
        commonMsgWarn('请勾选删除项', this)
        return
      }
      if (this.tableRow.length > 1) {
        commonMsgWarn('删除项只能唯一，请重新勾选', this)
        return
      }
      const msg = {
        parameterList: [{ year_no: this.tableRow.year_no }],
        oper_type: 'OP002'
      }
      commonMsgConfirm(
        '是否确认删除当前选中的免年检账户信息？',
        this,
        (flag) => {
          if (flag) {
            yearDateQuery(msg).then((res) => {
              const { retCode, retMsg } = res
              if (retCode === '0') {
                commonMsgSuccess(retMsg, this)
              } else {
                commonMsgWarn(retMsg, this)
                return
              }
              this.queryList()
            })
          }
        }
      )
    },
    /**
     * 弹框取消按钮
     */
    dialogClose() {
      this.dialogChange(false)
    },
    /**
     * 弹框确定按钮
     */
    dialogSubmit() {
      console.log(this.preModify)
      const { year_no, is_open, annual_time } = this.dialog.formData
      const msg = {
        parameterList: [
          {
            year_no,
            start_date: annual_time[0],
            end_date: annual_time[1],
            is_open
          }
        ],
        currentpage: 1,
        last_modi_date: dateNowFormat()
      }
      if (this.dialogTitle === '新增') {
        msg.oper_type = 'OP001'
      } else {
        msg.oper_type = 'OP003'
        msg.oldMsg = {
          year_no: this.preModify.year_no,
          is_open: this.preModify.is_open,
          start_date: date10Format(this.preModify.start_date),
          end_date: date10Format(this.preModify.end_date)
        }
      }
      commonMsgConfirm('是否提交当前数据?', this, (flag) => {
        if (flag) {
          yearDateQuery(msg).then((res) => {
            console.log(res)
            if (this.dialogTitle === '新增') {
            } else {
              const { retCode, retMsg } = res
              if (retCode === '200') {
                commonMsgSuccess(retMsg, this)
              }
            }
            // const { retCode, retMsg } = res
            // if (retCode === '1') {
            //   commonMsgWarn(retMsg, this)
            //   return
            // }
            this.dialogChange(false)
            this.queryList()
          })
        }
      })
    },
    /**
     * 弹框打开关闭
     * @param {Boolean}param 关闭/打开
     */
    dialogChange(param) {
      this.dialog.visible = param
    },
    /**
     * 选中行
     * @param {Object}val 选中行数据
     */
    currentChange(val) {
      this.tableRow = val
      if (!commonBlank(val)) {
        this.preModify = deepClone(val)
      }
    },
    /**
     * 页码更新
     * @param {Object}pageParam 页码数据
     */
    getList(pageParam) {
      const { currentPage, pageSize } = pageParam
      this.tableData.pageList.pageSize = pageSize
      this.tableData.pageList.page = currentPage
      this.queryList()
      // setTimeout(() => {
      //   console.log(this.pageList)
      // })
    },
    /*
     ** 查询数据
     */
    queryList() {
      const { pageSize, page } = this.tableData.pageList
      const { year_no, is_open } = this.defaultForm
      const msg = {
        parameterList: [{ year_no, is_open }],
        oper_type: 'OP004',
        currentPage: page,
        pageSize
      }
      yearDateQuery(msg).then((res) => {
        const {
          retCode,
          retMap: { returnList, totalNum, currentPage }
        } = res
        if (retCode === '200') {
          Object.assign(this.tableData, {
            data: returnList,
            pageList: {
              ...this.tableData.pageList,
              totalNum,
              page: currentPage
            }
          })
        }
      })
    }
  }
}
</script>

<style></style>
