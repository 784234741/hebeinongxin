<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :btn-add="$attrs['btn-all'].btnAdd"
        @handleAdd="add"
      />
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
            <span v-if="item.name === 'organ_no'">{{ row[item.name] | organNameFormat }}</span>
            <span v-else-if="item.name === 'detail'">
              <span
                style="color: #1890ff; cursor: pointer"
                @click="openDetail(row)"
              >原因</span>
            </span>
            <span v-if="item.name === 'this_level'">{{ row[item.name] | riskLevel }}</span>
            <span v-else-if="item.name === 'acc_type'">{{ row[item.name] | accType }}</span>
            <span v-else-if="item.name === 'last_modi_date'">{{ row[item.name] | date10Format }}</span>
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
        <span v-if="item.name === 'organ_no'">{{ row[item.name] | organNameFormat }}</span>
        <span v-else-if="item.name === 'risk_type'">{{ row[item.name] | riskType }}</span>
        <span v-else-if="item.name === 'risk_level'">{{ row[item.name] | riskLevel }}</span>
        <span v-else-if="item.name === 'last_modi_date'">{{ row[item.name] | date10Format }}</span>
        <span v-else>{{ row[item.name] }}</span>
      </template>
      <div slot="rightBtn">
        <sun-button
          :btn-relieve="$attrs['btn-all'].btnRelieve"
          @handleRelieve="handleRelieve"
        />
      </div>
    </sun-table-dialog>
    <sun-form-dialog
      :title="dialog2.title"
      :visible="dialog2.visible"
      :form-config="dialog2.config"
      :form-data="dialog2.formData"
      :width="dialog2.width"
      :label-width="dialog2.labelWidth"
      @dialogClose="changeVisible2"
      @dialogSubmit="dialogSumbit"
    /><!--新增、修改弹出框-->

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

import { configTable, configTable2, config } from './info' // 表头、表单配置
import { SunTable, SunTableDialog, SunFormDialog, SunButton } from '@/components'
// import Des from '../des.vue'

import { RiskLevel } from '@/api'
import { commonMsgConfirm, commonMsgInfo, commonMsgSuccess, commonMsgWarn } from '@/utils/message'
const { riskLevel } = RiskLevel
export default {
  name: 'TableList',
  components: { SunTable, SunTableDialog, SunFormDialog, SunButton },
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
      content: {
        width: '18%'
      },
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      currentRow: [], // 选中行
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: 20 // 当前页显示条数
      },
      initData: {},
      dialog: {
        title: '风险原因',
        width: '78%',
        top: '5vh',
        visible: false,
        tableColumn: configTable2(),
        tableData: []
      },
      dialog2: {
        title: '新增账户风险',
        width: '50rem',
        labelWidth: '12rem',
        visible: false,
        oprate: 'add',
        formData: {
          acc_no: '',
          risk_type: '',
          reason: ''
        },
        config: config(this)
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
     * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      const formData = JSON.parse(JSON.stringify(this.defaultForm))
      const msg = {
        parameterList: [],
        ...formData,
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize,
        organ_no: this.defaultForm.organ_no || `#${this.$store.getters.organNo}`
      }
      riskLevel(msg).then((response) => {
        const { returnList, totalNum } = response.retMap
        this.tableData = returnList
        this.pageList.totalNum = totalNum
        this.showLoading()
      })
    },
    // 打开原因界面
    openDetail(row) {
      const msg = {
        parameterList: [{}],
        acc_no: row.acc_no,
        oper_type: 'selectReason',
        currentPage: 1,
        pageSize: this.pageList.pageSize
      }
      // query
      riskLevel(msg).then((response) => {
        this.dialog.tableData = response.retMap.returnList
        this.dialog.visible = true
      })
    },
    // 解除
    handleRelieve() {
      const rows = this.currentRow
      console.log(rows)
      if (rows.length === 0) {
        commonMsgWarn('请选择要解除的行', this)
        return
      }
      commonMsgConfirm('是否解除该账户风险？', this, (flag) => {
        if (flag) {
          const msg = {
            parameterList: [{}],
            oper_type: 'relieveRisk',
            acc_no: rows.acc_no,
            cus_no: rows.cus_no,
            cus_name: rows.cus_name,
            risk_type: rows.risk_type
          }
          riskLevel(msg).then((response) => {
            commonMsgSuccess('该解除申请已提交管理员复核', this)
            this.dialog.visible = false
          })
        }
      })
    },
    // 新增账户风险
    add() {
      this.dialog2.dialog = Object.assign({}, this.dialog2, {
        title: '新增账户风险',
        oprate: 'add'
      })
      this.changeVisible2(true)
      this.$nextTick(() => { // 弹出框加载完成后赋值
        const dataF = {}
        if (this.currentRow) {
          dataF.acc_no = this.currentRow.acc_no
          this.dialog2.formData = dataF
        }
      })
    },
    /**
     * 弹出框 - 确认*/
    dialogSumbit() {
      const param = this.dialog2.oprate
      if (param === 'add') {
        this.dialogAddSubmit()
      } else {
        this.dialogEditSubmit()
      }
    },
    /**
     * 弹出框 - 确认 - 新增*/
    dialogAddSubmit() {
      const formData1 = Object.assign({}, this.dialog2.formData)
      const param = {
        'parameterList': [{
          ...formData1
        }],
        'oper_type': 'add'
      }
      riskLevel(param).then(response => {
        this.queryList(1) // 重新查询
        commonMsgInfo('新增风险成功', this, (param) => {
          if (param) {
            commonMsgSuccess(response.retMsg, this)
          }
        })
      }).catch(() => {
        this.showLoading()
      })
      this.changeVisible2()
    },
    // 选择单行
    currentChange(val) {
      this.currentRow = val
    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible2(param) {
      this.dialog2.visible = param
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
    dialogClose() {
      this.changeVisible()
    },
    dialogClose2() {
      this.changeVisible2()
    }
  }
}
</script>
<style lang="scss" scoped></style>
