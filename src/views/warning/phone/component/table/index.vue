<template>
  <div class="sun-content">
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
            <span v-if="item.name === 'cus_organ'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span v-else-if="item.name === 'detail'">
              <span
                :style="{color: $store.state.settings.theme, cursor: pointer}"
                @click="oprenDetail(row)"
              >详情</span>
            </span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template></sun-table>

    <sun-table-dialog
      :title="dialog.title"
      :width="dialog.width"
      :top="dialog.top"
      :visible="dialog.visible"
      :table-column="dialog.tableColumn"
      :table-data="dialog.tableData"
      :btn-cancle="false"
      :btn-submit="false"
      @dialogClose="dialogClose"
      @currentChange="currentChange"
    >
      <template slot-scope="{ item, row }">
        <span
          v-if="item.name === 'cus_name'"
        >{{ row[item.name] }}</span>
        <span v-else-if="item.name === 'cus_organ'">{{
          row[item.name] | organNameFormat
        }}</span>
        <span v-else-if="item.name === 'legal_type'">{{
          row[item.name] | legalType
        }}</span>
        <span
          v-else-if="item.name === 'warn_status'"
          :style="{ color: row[item.name] === '1' ? '#1890ff' : 'red' }"
        >
          {{ row[item.name] | warnStatus }}
        </span>
        <span v-else>{{ row[item.name] }}</span>
      </template>
      <div slot="rightBtn">
        <sun-button
          :btn-change-state="$attrs['btn-all'].btnChangeState"
          @handleChangeState="handleChangeState"
        />
      </div>
    </sun-table-dialog>
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm
} from '@/utils/message.js' // 提示信息
import Moment from 'moment'
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
// import { dateNowFormat } from '@/utils/date.js' // 日期格式化

import { configTable, configTable2 } from './info' // 表头、表单配置
import { SunTable, SunTableDialog, SunButton } from '@/components'

import { WarningPhoneMulti } from '@/api'
const { phoneMulti, accInfo } = WarningPhoneMulti
export default {
  name: 'CertificateTableList',
  components: { SunTable, SunTableDialog, SunButton },
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
      label: {
        width: '15%',
        textAlign: 'right',
        paddingRight: '2rem'
      },
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      checkedRows: [], // 选中行
      content: {
        width: '18%'
      },
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: 20 // 当前页显示条数
      },
      // downloadLoading: false,
      currentIndex: 0, // 当前行索引
      initData: {},
      dialog: {
        title: '一手机号多户详情',
        width: '98%',
        top: '5vh',
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
    oprenDetail(row) {
      const msg = {
        parameterList: [{}],
        auth_phone: row.auth_phone,
        cus_organ: row.cus_organ,
        oper_type: 'selectDetail',
        currentPage: 1,
        pageSize: 15
      }

      // query
      phoneMulti(msg).then((response) => {
        const { list } = response.retMap
        this.dialog.tableData = list
        this.dialog.visible = true
      })
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      const msg = {
        parameterList: [{}],
        ...this.defaultForm,
        organ_no: this.defaultForm.organ_no || `#${this.$store.getters.organNo}`,
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      // query
      phoneMulti(msg).then((response) => {
        const { returnList, totalNum } = response.retMap
        this.tableData = returnList
        this.pageList.totalNum = totalNum
        this.pageList.currentPage = currentPage
        this.showLoading()
      })
    },
    //
    handleClick(obj) {
      this.dialog2.activeName = obj.name
      if (obj.name === 'third') {
        this.showLoading3()
        const msg = {
          parameterList: [{}],
          oper_type: dictionaryGet('OPERATE_QUERY'),
          cus_no: this.currentRow.cus_no,
          noPage: '1'
        }
        accInfo(msg)
          .then((res) => {
            const {
              retMap: { list }
            } = res
            this.dialog2.tableData3 = list
            this.showLoading3()
          })
          .catch(() => {
            this.showLoading3()
          })
      }
    },

    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    }, // handleAdd
    // 选择行
    currentChange(val) {
      this.checkedRows = val
    },
    // 核实
    handleChangeState() {
      if (this.checkedRows.length === 0) {
        commonMsgWarn('未选中任何数据', this)
        return
      }
      if (this.checkedRows.length > 1) {
        commonMsgWarn('仅支持单笔操作!', this)
        return
      }
      if (this.checkedRows.warn_status === '1') {
        commonMsgWarn('不可对已核实的客户进行操作!', this)
        return
      }
      commonMsgConfirm('是否确定将预警状态改为已核实？', this, (flag) => {
        if (flag) {
          var msg = {
            parameterList: [{}],
            oper_type: 'changeWarnStatus',
            cus_no: this.checkedRows.cus_no,
            warn_status: '1',
            user_no: this.checkedRows.user_no
          }
          phoneMulti(msg).then((response) => {
            commonMsgSuccess('预警状态更改成功！', this)
            this.dialog.visible = false
          })
        }
      })
    },
    /**
     * 弹出框 - 确认*/
    dialogSumbit() {
      this.showLoading()
      const msg = {
        parameterList: [],
        ...this.dialog.formData,
        create_year: Moment(this.dialog.formData.create_year, 'YYYY').format(
          'YYYY'
        ),
        oper_type: 'add'
      }

      // add
      phoneMulti(msg)
        .then((response) => {
          this.showLoading()
          this.queryList()
          commonMsgSuccess(response.retMsg, this)
        })
        .catch(() => {
          this.showLoading()
        })
      this.changeVisible(false)
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
    dialogClose() {
      this.changeVisible()
    }
  }
}
</script>
<style lang="scss" scoped></style>
