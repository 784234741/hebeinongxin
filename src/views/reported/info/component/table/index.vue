<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :btn-report-add="$attrs['btn-all'].btnReportAdd"
        :btn-export="$attrs['btn-all'].btnExport"
        :btn-print-basic-account="$attrs['btn-all'].btnPrintBasicAccount"
        :btn-print-password="$attrs['btn-all'].btnPrintPassword"
        @handleReportAdd="handleReportAdd"
        @handleExport="handleExport"
        @handlePrintBasicAccount="handlePrintBasicAccount"
        @handlePrintPassword="handlePrintPassword"
      />
    </div>

    <sun-table
      ref="tableww"
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      @current-change="currentChange2"
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
              class="changeColor"
              :style="{ color: $store.state.settings.theme, cursor: 'pointer' }"
              @click="openDialog(row)"
            >{{ row[item.name] }}</span>
            <span v-else-if="item.name === 'report_state'">{{
              row[item.name] | repState
            }}</span>
            <span v-else-if="item.name === 'acc_type'">{{
              row[item.name] | accType
            }}</span>
            <span v-else-if="item.name === 'oper_type'">{{
              row[item.name] | handleType
            }}</span>
            <span v-else-if="item.name === 'sys_type'">{{
              row[item.name] | reportSysType
            }}</span>
            <span
              v-else-if="
                item.name === 'trans_date' || item.name === 'report_date'
              "
            >
              {{ row[item.name] | date10Format }}
            </span>
            <span
              v-else-if="item.name === 'report_detail'"
              :style="{ color: $store.state.settings.theme, cursor: 'pointer' }"
              @click="openDetail(row)"
            >
              报备详情</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template>
    </sun-table>
    <!--table展示的数据-->

    <sun-describe-dialog
      :title="dialog.title"
      :width="dialog.width"
      :top="dialog.top"
      :describe-config="dialog.describeConfig"
      :column="dialog.column"
      :box-style="dialog.boxStyle"
      :visible.sync="dialog.visible"
      :des-message="dialog.desLabelData"
      :des-data="dialog.desData"
    >
      <template slot-scope="{ item, value }">
        <span v-if="item === 'acc_type'"> {{ value | accType }}</span>
        <span v-if="item === 'bcashsign'"> {{ value | bCashSign }}</span>
        <span v-else-if="item === 'acc_state'"> {{ value | accState }}</span>
        <span v-else-if="item === 'saccfundkind'"> {{ value | moneyType }}</span>
        <span v-else-if="item === 'imode'"> {{ value | accNameType }}</span>
        <span v-else-if="item === 'sdeptmankind'"> {{ value | managerType }}</span>
        <span v-else-if="item === 'open_organ'">
          {{ value | organNameFormat }}</span>
        <span v-else-if="item === 'sdepkind' || item === 'depo_type'"> {{ value | depoType }}</span>
        <span v-else-if="item === 'saccfiletype1' || item === 'file_type2'">
          {{ value | saccFileType }}</span>
        <span v-else-if="item === 'saccfiletype2' || item === 'file_type2'">
          {{ value | saccFileType }}</span>
        <span v-else-if="item === 'filetype' || item === 'file_type2'">
          {{ value | saccFileType }}</span>
        <span v-else-if="item === 'hd_type'"> {{ value | hdType }}</span>
        <span v-else-if="item === 'deletereason'">
          {{ value | accCloseReason }}</span>
        <span v-else-if="item === 'saccreason'"> {{ value | saccreason }}</span>
        <span
          v-else-if="item === 'scurtype'"
          :style="rowObj.oper_type === '1' ? 'color: red' : ''"
        >
          {{ value | amCurrencyType }}</span>
        <span
          v-else-if="item === 'cruArray' || item === 'cur_array'"
          :style="rowObj.oper_type === '1' ? 'color: red' : ''"
        >
          {{ value | cnyType }}</span>
        <span
          v-else-if="item === 'sdepmancrekind'"
          :style="rowObj.oper_type === '1' ? 'color: red' : ''"
        >
          {{ value | legalType }}</span>
        <span
          v-else-if="item === 'sdepfundkind'"
          :style="rowObj.oper_type === '1' ? 'color: red' : ''"
        >
          {{ value | regCnyType }}</span>
        <span
          v-else-if="item === 'fundkind'"
          :style="rowObj.oper_type === '1' ? 'color: red' : ''"
        >
          {{ value | moneyType }}</span>
        <span
          v-else-if="item === 'idepmanagestype'"
          :style="rowObj.oper_type === '1' ? 'color: red' : ''"
        >
          {{ value | managerType }}</span>
        <span
          v-else-if="
            item === 'start_date' ||
              item === 'begindate' ||
              item === 'daccvailddate' ||
              item === 'legal_end' ||
              item === 'agent_end'
          "
        >
          {{ value | date10Format }}</span>
        <span
          v-else-if="
            item === 'sdeptmancrekind' ||
              item === 'saccdepcrekind'
          "
        >
          {{ value | legalType }}</span>
        <span
          v-else-if="
            item === 'sdepname' ||
              item === 'sdeptel' ||
              item === 'sdepaddress' ||
              item === 'sdeppostcode' ||
              item === 'sdepmanagername' ||
              item === 'sdepmancrecode' ||
              item === 'sDepManRegion' ||
              item === 'reg_amt' ||
              item === 'saccfilecode1' ||
              item === 'sdepcountaxcode' ||
              item === 'sdepareataxcode' ||
              item === 'sdepwork'
          "
          :style="rowObj.oper_type === '1' ? 'color: red' : ''"
        >
          {{ value }}</span>

        <span
          v-else-if="item === 'trade_type1'"
        ><el-button
          type="primary"
          style="width: 80px; height: 25px; position: absolute; top: -1px"
          class="btn"
          round
          @click="handleBtn1('first')"
        >查看详情</el-button></span>
        <span
          v-else-if="item === 'entList'"
        ><el-button
          type="primary"
          class="btn"
          style="width: 80px; height: 25px; position: absolute; top: -1px"
          round
          @click="handleBtn2"
        >查看详情</el-button></span>
        <span v-else>{{ value }}</span>
      </template>
    </sun-describe-dialog>
    <!--详情报备弹框-->

    <sun-table-dialog
      :title="dialog3.title"
      :visible="dialog3.visible"
      :table-data="dialog3.tableData"
      :table-column="dialog3.tableColumn3"
      :btnCancle="details"
      :btnSubmit="details"
      @currentChange="currentChange"
      @dialogClose="dialogClose3"
      @dialogSubmit="dialogSubmit3"
    >
      <template slot-scope="{ item, row }">
        <span v-if="item.name === 'trade_type'">
          {{ row[item.name] | hdType }}
        </span>
        <span v-else-if="item.name === 'fd_type'">
          {{ row[item.name] | legalType }}
        </span>
        <span v-else>
          {{ row[item.name] }}
        </span>
      </template>
      <template　v-if="details" slot="leftBtn" style="width: 100px">
        <sun-button
          :btn-add="true"
          :btn-delete="true"
          :button-style="buttonStyle"
          @handleAdd="handleAdd"
          @handleDelete="handleDelete"
        />
      </template>
    </sun-table-dialog>
    <!--行业归属和关联企业弹框-->

    <sun-form-dialog
      :title="dialog2.title"
      :visible="dialog2.visible"
      :form-config="dialog2.config"
      :form-data="dialog2.formData"
      @dialogClose="changeVisible2"
      @dialogSubmit="dialogSumbit2"
    />
    <!--报备新增弹框-->

    <sun-forms-dialog
      :title="dialog4.title"
      :visible="dialog4.visible"
      :form-config="dialog4.configTableData"
      :top="dialog4.top"
      :width="dialog4.width"
      :loading="dialogLoading"
      @dialogClose="changeVisible4"
      @dialogSubmit="dialogSumbit4"
    />
    <!--报备新增弹框确定的二次弹框-->

    <sun-form-dialog
      :title="dialog5.title"
      :visible="dialog5.visible"
      :form-config="dialog5.config"
      :form-data="dialog5.formData"
      @dialogClose="dialogClose5"
      @dialogSubmit="dialogSumbit5"
    />
    <!--关联企业和行业归属新增弹框-->

    <Print
      v-show="hasPrint"
      ref="printRef"
      :message="message"
      :print-flag="printFlag"
    />
    <!--打印存款人信息或密码-->

    <print-alls
      v-show="hasPrintall"
      ref="printRefs"
      :print-data="printData"
      :is-print="isPrint"
    />
    <!--打印存款人信息和密码---两个页面-->

    <print-cancel
      v-show="hasPrintcancel"
      ref="printCancelRef"
      :print-datas="printcancelData"
      :print-cancels="printCancels"
      :table-column="printcancelColumn"
    />
    <!--打印销户转户-->

    <sun-describe-dialog
      :title="dialog6.title"
      :width="dialog6.width"
      :top="dialog6.top"
      :describe-config="dialog6.describeConfig"
      :column="dialog6.column"
      :box-style="dialog6.boxStyle"
      :visible.sync="dialog6.visible"
      :des-message="dialog6.desLabelData"
      :des-data="dialog6.desData"
      @handleSumit6="handleSumit6"
    >
      <template slot-scope="{ item, value }">
        <span> {{ value }}</span>
      </template>
    </sun-describe-dialog>
    <!--打印销户转户弹框-->
  </div>
</template>
<script>
import {
  commonMsgWarn,
  commonMsgConfirm,
  commonMsgSuccess
} from '@/utils/message.js' // 提示信息
import { dictionaryGet, dictionaryFieds } from '@/utils/dictionary.js' // 字典常量
import { exportXlsx, commonBlank } from '@/utils/common'
import {
  accType,
  repState,
  reportSysType,
  handleType,
  date10Format
} from '@/filters'

import {
  configTable,
  config,
  configData,
  configTable3,
  configTable4,
  configTableData,
  passData,
  dialogData2,
  cancelConfig,
  nontemporaryData
} from './info' // 表头、表单配置
import {
  SunTable,
  SunButton,
  SunFormDialog,
  SunDescribeDialog,
  SunTableDialog,
  SunFormsDialog
} from '@/components'
import Print from '../print.vue'
import PrintAlls from '../printAlls.vue'
import printCancel from '../printCancel.vue'

import { ReportInfo } from '@/api'
const { reportInfo, accInfo, cusInfo, nationInfo } = ReportInfo
export default {
  name: 'AssessmentTableList',
  components: {
    SunTable,
    SunButton,
    SunFormDialog,
    Print,
    PrintAlls,
    printCancel,
    SunDescribeDialog,
    SunTableDialog,
    SunFormsDialog
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
      configData: configData(this), // 报备详情数据
      nontemporaryData: nontemporaryData(this), // 非临时更改日期弹框字段
      passData: passData(this), // 二次弹框销户数据
      listLoading: false, // 加载table数据是否显示loading
      dialogLoading: false, // 第二屏的loading
      tableColumn: configTable(), // 表格列数据
      details: true,// 判断行业归属弹框按钮展示
      printFlag: '', // 打印存款账户和密码页面类型
      hasPrint: true, // 是否显示存款账户和密码页面
      message: {}, // 需要打印的数据
      date: [], // 打印基本存款信息的日期
      objCopy: {}, // dialog2的formData深拷贝
      datas: this.$store.getters.externalData, // 地区
      nations: [], // 国家或地区
      tableData: [], // 表格数据
      comData: [], // 关联企业详情数据
      typeData: [], // 行业归属数据
      currentRow: null, // 选中行
      tableRow: null, // table选中行
      objData: {}, // 报备新增点确定获取的数据
      rowObj: {}, // 报备详情行的数据
      hasPrintcancel: true, // 打印销户转户页面
      printCancels: false, // 是否显示打印销户转户页面内容
      printcancelData: {}, // 打印销户转户数据
      printcancelColumn: cancelConfig(this), // 打印销户转户表头
      isPrint: false, // 是否显示打印存款人账户和密码弹框,
      hasPrintall: true, // 是否显示打印存款人信息和密码弹框
      printData: {
        base_info: {},
        acc_pwd: {}
      }, // 打印存款人账户和密码数据
      buttonStyle: {
        marginLeft: '10px',
        float: 'right'
      }, // 新增删除按钮的样式
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: 20 // 当前页显示条数
      },
      downloadLoading: false,
      currentIndex: 0, // 当前行索引
      // 报备详情弹框
      dialog: {
        visible: false,
        column: 3,
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
        desLabelData: [],
        desData: {}
      },
      // 报备新增弹框
      dialog2: {
        title: '基本信息录入',
        visible: false,
        config: {},
        formData: {
          oper_type: '',
          cus_type: '',
          acc_no: '',
          acc_type: '',
          depo_type: '',
          is_change: '',
          change_vailddate: ''
        }
      },
      // 行业归属和关联企业
      dialog3: {
        title: '',
        visible: false,
        tableColumn3: [],
        tableData: []
      },
      // 二次弹框
      dialog4: {
        top: '5vh',
        width: '98%',
        visible: false,
        configTableData: {}
      },
      // 行业归属和关联企业新增框数据
      dialog5: {
        title: '',
        visible: false,
        config: dialogData2(this),
        formData: {
          hy_type: '',
          fd_ent_name: '',
          fd_prin_name: '',
          fd_entorg_code: '',
          fd_type: '',
          fd_code: ''
        }
      },
      // 打印销户转户弹框数据
      dialog6: {
        visible: false,
        column: 1,
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
          marginBottom: '3rem',
          borderRadius: '4px',
          boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
        },
        desLabelData: [],
        desData: {}
      }
    }
  },
  watch: {
    message: {
      handler(newVal, oldVal) {
        if (this.hasPrint === false) {
          this.hasPrint = true
        }
        setTimeout(() => {
          this.hasPrint = false
        }, 500)
      },
      deep: true
    },
    printData: {
      handler(newVal, oldVal) {
        if (this.hasPrintall === false) {
          this.hasPrintall = true
        }
        setTimeout(() => {
          this.hasPrintall = false
        }, 500)
      },
      deep: true
    },
    printcancelData: {
      handler(newVal, oldVal) {
        if (this.hasPrintcancel === false) {
          this.hasPrintcancel = true
        }
        setTimeout(() => {
          this.hasPrintcancel = false
        }, 500)
      },
      deep: true
    }
  },
  mounted() {
    this.getNations()
    this.dialog4.configTableData = configTableData(this)
    this.dialog2.config = config(this)
  },
  methods: {
    // 获取国家地区的数据
    getNations() {
      const params = {
        parameterList: [],
        oper_type: 'externalData',
        key: 'NATION_CODE'
      }
      nationInfo(params).then(res => {
        if (res.retCode === '200') {
          this.nations = res.retMap.list
        }
      })
    },
    // 点击报备新增按钮
    handleReportAdd() {
      this.dialog2.visible = true
      const { acc_type, depo_type } = this.dialog2.config
      acc_type.componentProps.disabled = false
      depo_type.componentProps.disabled = false
    },
    // 打印账户信息
    handlePrintBasicAccount() {
      if (commonBlank(this.tableRow)) {
        commonMsgWarn('请选择需要打印的数据', this)
        return
      }
      console.log('tableRow', this.tableRow)
      const accxml = this.tableRow.accxml
      const myDate = new Date()
      const year = myDate.getFullYear()
      const month = myDate.getMonth() + 1
      const day = myDate.getDate()
      if (!commonBlank(accxml)) {
        const msg = {
          parameterList: [{}],
          oper_type: 'printAcc',
          accxml
        }
        cusInfo(msg).then((res) => {
          this.printFlag = 'basic'
          this.message = res.retMap
          this.message.year = year
          this.message.month = month
          this.message.day = day
          setTimeout(() => {
            this.$print(this.$refs.printRef)
          }, 100)
        })
      } else {
        commonMsgWarn('打印所需数据为空，无法打印', this)
      }
    },
    // 打印存款人密码
    handlePrintPassword() {
      if (commonBlank(this.tableRow)) {
        commonMsgWarn('请选择需要打印的数据', this)
        return
      }
      const pswxml = this.tableRow.pswxml
      if (!commonBlank(pswxml)) {
        const msg = {
          parameterList: [{}],
          oper_type: 'printPSW',
          pswxml
        }
        cusInfo(msg).then((res) => {
          this.printFlag = 'password'
          this.message = res.retMap

          setTimeout(() => {
            this.$print(this.$refs.printRef)
          }, 100)
        })
      } else {
        commonMsgWarn('打印所需数据为空，无法打印', this)
      }
    },
    // 根据账户类型传不同的数据
    showDialog(acc_type, obj) {
      const {
        basic_type,
        budget_com,
        temporary_org,
        nontemporary_org,
        special_com,
        general_acc,
        nonbudget_com
      } = this.configData
      switch (acc_type) {
        case '1':
          this.dialog.desLabelData = basic_type.data
          this.dialog.top = basic_type.top
          this.dialog.title = basic_type.title ? basic_type.title : ''
          this.dialog.width = basic_type.width
          this.dialog.column = basic_type.column
          break
        case '2':
          if (obj.imode === '0' || obj.imode === '2') {
            budget_com.data[2].visible = true
            budget_com.data[1].visible = false
            this.dialog.desLabelData = budget_com.data
            if (obj.imode === '2') {
              const arr2 = JSON.parse(JSON.stringify(budget_com.data))
              arr2[0].arr = [...arr2[0].arr, { label: '账户名称前缀', name: 'saccprefix' }, { label: '账户名称后缀', name: 'saccpostfix' }]
              this.dialog.desLabelData = arr2
            }
          } else {
            budget_com.data[2].visible = false
            budget_com.data[1].visible = true
            this.dialog.desLabelData = budget_com.data
          }
          this.dialog.top = budget_com.top
          this.dialog.title = budget_com.title ? budget_com.title : ''
          this.dialog.width = budget_com.width
          this.dialog.column = basic_type.column
          break
        case '3':
          this.dialog.desLabelData = temporary_org.data
          this.dialog.top = temporary_org.top
          this.dialog.title = temporary_org.title ? temporary_org.title : ''
          this.dialog.width = temporary_org.width
          this.dialog.column = temporary_org.column
          break
        case '4':
          if (obj.saccreason === '2') nontemporary_org.data[1].visible = true
          else nontemporary_org.data[1].visible = false
          this.dialog.desLabelData = nontemporary_org.data
          this.dialog.top = nontemporary_org.top
          this.dialog.title = nontemporary_org.title
            ? nontemporary_org.title
            : ''
          this.dialog.width = nontemporary_org.width
          this.dialog.column = nontemporary_org.column
          break
        case '5':
          this.dialog.desLabelData = special_com.data
          this.dialog.top = special_com.top
          this.dialog.title = special_com.title ? special_com.title : ''
          this.dialog.width = special_com.width
          this.dialog.column = special_com.column
          break
        case '6':
          this.dialog.desLabelData = general_acc.data
          this.dialog.top = general_acc.top
          this.dialog.title = general_acc.title ? general_acc.title : ''
          this.dialog.width = general_acc.width
          this.dialog.column = general_acc.column
          break
        case '7':
          if (obj.imode === '0' || obj.imode === '2') {
            nonbudget_com.data[2].visible = true
            nonbudget_com.data[1].visible = false
            this.dialog.desLabelData = nonbudget_com.data
            if (obj.imode === '2') {
              const arr2 = JSON.parse(JSON.stringify(nonbudget_com.data))
              arr2[0].arr = [...arr2[0].arr, { label: '账户名称后缀', name: 'saccpostfix' }]
              this.dialog.desLabelData = arr2
            }
          } else {
            nonbudget_com.data[2].visible = false
            nonbudget_com.data[1].visible = true
            this.dialog.desLabelData = nonbudget_com.data
          }
          this.dialog.top = nonbudget_com.top
          this.dialog.title = nonbudget_com.title ? nonbudget_com.title : ''
          this.dialog.width = nonbudget_com.width
          this.dialog.column = nonbudget_com.column
          break
      }
    },
    // 是否显示存款人类别
    isVisible(acc_type) {
      const { depo_type } = this.dialog2.config
      this.dialog2.config.acc_type.componentProps.disabled = false
      depo_type.componentProps.disabled = false
      if (
        acc_type === '2' ||
        acc_type === '3' ||
        acc_type === '6' ||
        acc_type === '7'
      ) {
        depo_type.hidden = true
        depo_type.config.rules[0].required = false
      } else {
        depo_type.hidden = false
        depo_type.config.rules[0].required = true
      }
    },
    // 弹框确定按钮
    dialogSumbit2() {
      const { formData } = this.dialog2
      this.objCopy = JSON.parse(JSON.stringify(formData))
      const { acc_type, depo_type, acc_no, oper_type } = formData
      let report_type = ''
      if (acc_type === '1') {
        // 基本户
        if (
          depo_type === '01' ||
          depo_type === '02' ||
          depo_type === '13' ||
          depo_type === '14'
        ) {
          report_type = '2'
        } else {
          report_type = '1'
        }
      } else if (acc_type === '2') {
        // 预算单位专户
        report_type = '1'
      } else if (acc_type === '3') {
        // 临时机构临时户
        report_type = '1'
      } else if (acc_type === '4') {
        // 非临时机构临时户
        if (
          depo_type === '01' ||
          depo_type === '02' ||
          depo_type === '13' ||
          depo_type === '14'
        ) {
          report_type = '2'
        } else {
          report_type = '1'
        }
      } else if (acc_type === '5') {
        // 特殊单位专户
        report_type = '1'
      } else if (acc_type === '6') {
        // 一般户
        report_type = '2'
      } else if (acc_type === '7') {
        // 非预算单位专户
        report_type = '2'
      }
      if (!acc_type) {
        commonMsgWarn(
          '账户类型未更新，请到账户信息查询界面进行更新后再进行报备',
          this
        )
        return
      }
      commonMsgConfirm(
        '确定同步核心和ecif的信息，进行要素录入操作，并报备？',
        this,
        (flag) => {
          if (flag) {
            this.dialog4.visible = true
            this.dialogLoading = true
            if (oper_type === '3') {
              const msg = {
                parameterList: [{}],
                oper_type: 'get_acc_info',
                acc_no: acc_no
              }
              reportInfo(msg).then((res) => {
                if (res.retCode === '200') {
                  this.objData = res.retMap
                  this.passData.form_info1.formData.acc_no = this.objCopy.acc_no
                  this.dialog4.title = '销户报备参数录取'
                  this.dialog4.width = '50%'
                  if (acc_type !== '1' && acc_type !== '4') {
                    if (report_type === '2') {
                      this.passData.form_info1.data.close_reason.options =
                        dictionaryFieds('ACC_CLOSE_REASON').filter(
                          (item) => item.value !== '1'
                        )
                    }
                  } else {
                    this.passData.form_info1.data.close_reason.options =
                      dictionaryFieds('ACC_CLOSE_REASON')
                  }
                  this.dialog4.configTableData = this.passData
                  this.dialogLoading = false
                } else {
                  commonMsgWarn('报备失败', this)
                  this.dialogLoading = false
                  this.dialog4.visible = false
                  return
                }
              })
            } else {
              const {
                oper_type,
                cus_type,
                acc_no,
                acc_type,
                depo_type,
                is_change,
                change_vailddate
              } = this.objCopy
             
              const params = {
                oper_type: 'sync_cus_info',
                oper_type2: oper_type,
                cus_type,
                acc_no,
                acc_type,
                depo_type,
                is_change,
                organ_no: this.$store.getters.organNo,
                user_no: this.$store.getters.userNo,
                change_vailddate
              }
              reportInfo(params).then((res) => {
                if (res.retCode === '200') {
                  this.details = true
                  res.retMap['userCheckbox'] = []
                  const { bank_acc_type } = res.retMap
                  if (oper_type === '1' && is_change === '1') {
                    if (bank_acc_type === '1' && acc_type !== '1') {
                      commonMsgWarn(
                        '账户类型不匹配，核心账户类型为：基本户',
                        this
                      )
                      this.dialog4.visible = false
                      return
                    }
                    if (bank_acc_type === '2' && acc_type !== '6') {
                      commonMsgWarn(
                        '账户类型不匹配，核心账户类型为：一般户',
                        this
                      )
                      this.dialog4.visible = false
                      return
                    }
                    if (
                      bank_acc_type === '3' &&
                      acc_type !== '4' &&
                      acc_type !== '3'
                    ) {
                      commonMsgWarn(
                        '账户类型不匹配，核心账户类型为：临时户',
                        this
                      )
                      this.dialog4.visible = false
                      return
                    }
                    if (
                      bank_acc_type === '5' &&
                      acc_type !== '2' &&
                      acc_type !== '5' &&
                      acc_type !== '7'
                    ) {
                      commonMsgWarn(
                        '账户类型不匹配，核心账户类型为：专用户',
                        this
                      )
                      this.dialog4.visible = false
                      return
                    }
                  }
                  this.dialog2.visible = false
                  this.dialog4.width = '98%'
                  this.dialog4.configTableData = configTableData(this)
                  this.objData = res.retMap
                  const {
                    basic_type,
                    budget_com,
                    temporary_org,
                    nontemporary_org,
                    special_com,
                    general_acc,
                    nonbudget_com
                  } = this.dialog4.configTableData
                  if (
                    (acc_type === '1' ||
                      acc_type === '3' ||
                      acc_type === '5') &&
                    !(
                      depo_type === '01' ||
                      depo_type === '02' ||
                      depo_type === '13' ||
                      depo_type === '14'
                    )
                  ) {
                    if (acc_type === '1') {
                      this.dialog4.configTableData.basic_type.form_info2.data.sdepwork.config.rules[0].required = false
                    } else if (acc_type === '3') {
                      this.dialog4.configTableData.temporary_org.form_info2.data.sdepwork.config.rules[0].required = false
                    } else if (acc_type === '5') {
                      this.dialog4.configTableData.special_com.form_info2.data.sdepwork.config.rules[0].required = false
                    }
                  }
                  if (oper_type === '2' && this.dataArr.acc_type === '1' && depo_type === '03') {
                    this.dialog4.configTableData.basic_type.form_info2.data.sdepwork.config.rules[0].required = true
                  }
                  switch (acc_type) {
                    case '1':
                      this.getFormData(basic_type, res.retMap)
                      var names = '基本存款账户'
                      this.nations.forEach(item => {
                        if (basic_type.form_info2.formData.sDepManRegion === item.key) {
                          basic_type.form_info2.formData.sDepManRegion = item.value
                        }
                      })
                      this.dialog4.configTableData = basic_type
                      this.reName(oper_type, names)
                      break
                    case '2':
                      this.getFormData(budget_com, res.retMap)
                      var names2 = '预算单位专用存款账户'
                      this.dialog4.configTableData = budget_com
                      this.reName(oper_type, names2)
                      break
                    case '3':
                      this.getFormData(temporary_org, res.retMap)
                      var names3 = '临时机构临时存款账户'
                      this.nations.forEach(item => {
                        if (temporary_org.form_info2.formData.sDepManRegion === item.key) {
                          temporary_org.form_info2.formData.sDepManRegion = item.value
                        }
                      })
                      this.dialog4.configTableData = temporary_org
                      this.reName(oper_type, names3)
                      break
                    case '4':
                      this.getFormData(nontemporary_org, res.retMap)
                      var names4 = '非临时机构临时存款账户'
                      nontemporary_org.form_info1.formData.saccreason = ''
                      this.dialog4.configTableData = nontemporary_org
                      this.reName(oper_type, names4)
                      break
                    case '5':
                      this.getFormData(special_com, res.retMap)
                      var { fdepfund, sdepfundkind } = res.retMap
                      if (fdepfund && sdepfundkind) {
                        special_com.form_info2.data.fdepfund.componentProps.disabled = true
                        special_com.form_info2.data.sdepfundkind.componentProps.disabled = true
                      }
                      var names5 = '特殊单位专用存款账户'
                      this.nations.forEach(item => {
                        if (special_com.form_info2.formData.sDepManRegion === item.key) {
                          special_com.form_info2.formData.sDepManRegion = item.value
                        }
                      })
                      this.dialog4.configTableData = special_com
                      this.reName(oper_type, names5)
                      break
                    case '6':
                      this.getFormData(general_acc, res.retMap)
                      var names6 = '一般存款账户'
                      this.dialog4.configTableData = general_acc
                      this.reName(oper_type, names6)
                      break
                    case '7':
                      this.getFormData(nonbudget_com, res.retMap)
                      var names7 = '非预算单位专用存款账户'
                      nonbudget_com.form_info1.formData.area_code = ''
                      this.dialog4.configTableData = nonbudget_com
                      this.reName(oper_type, names7)
                      break
                  }
                  this.dialogLoading = false
                } else {
                  commonMsgWarn('报备失败', this)
                  this.dialogLoading = false
                  this.dialog4.visible = false
                  return
                }
              }).catch(error => {
                console.log(error)
                this.dialogLoading = false
                this.dialog4.visible = false
                return
              })
            }
          }
        }
      )
    },
    // 报备新增二次弹框标题
    reName(oper_type, names) {
      if (oper_type === '1') {
        this.dialog4.title = names + '——开户'
      } else if (oper_type === '2') {
        console.log(this.objCopy)
        if (this.objCopy.change_vailddate === '1') {
          this.dialog4.title = names + '——展期'
        }
        this.dialog4.title = names + '——变更'
      } else {
        this.dialog4.title = names + '——销户'
      }
    },
    // 变更和销户 自动获取输入框值
    disabledInput(data) {
      const { oper_type, acc_no } = data
      const { formData, config } = this.dialog2
      if (acc_no && (oper_type === '3' || oper_type === '2')) {
        const msg = {
          oper_type: 'getDepoType',
          acc_no
        }
        reportInfo(msg).then((res) => {
          if (res.retCode === '200') {
            const { accMap } = res.retMap
            if (!accMap.acc_type) {
              commonMsgWarn('账户类型未更新，请到账户信息查询界面进行更新后再进行报备', this)
              return
            }
            this.isVisible(accMap.acc_type)
            this.dataArr = accMap
            formData.acc_type = accMap.acc_type
            formData.depo_type = accMap.depo_type
            config.acc_type.componentProps.disabled = true
            config.depo_type.componentProps.disabled = true
            if (
              oper_type === '2' &&
              accMap.acc_type === '4' &&
              (accMap.depo_type === '01' ||
                accMap.depo_type === '02' ||
                accMap.depo_type === '13' ||
                accMap.depo_type === '14')
            ) {
              config.change_vailddate.hidden = false
              config.change_vailddate.config.rules[0].required = true
            } else {
              config.change_vailddate.hidden = true
              config.change_vailddate.config.rules[0].required = false
            }
          }
        })
      } else {
        config.acc_type.componentProps.disabled = false
        config.depo_type.componentProps.disabled = false
        config.change_vailddate.config.rules[0].required = false
      }
    },
    // 设置多表单formdata值
    getFormData(type, data) {
      for (const k in type) {
        for (const k2 in type[k]) {
          if (k2 === 'formData') {
            for (const k3 in type[k][k2]) {
              type[k][k2][k3] = data[k3]
            }
          }
        }
      }
    },
    // 关联企业弹框取消
    dialogClose3() {
      this.dialog3.visible = false
    },
    // 关联企业弹框确定
    dialogSubmit3() {
      // console.log(this.currentRow);
      console.log(this.dialog3.tableData)
      console.log(this.objData)
      if (this.dialog3.title === '行业归属') {
        const arr = this.dialog3.tableData.map((item) => item.trade_type)
        const strings = arr.join()
        this.objData.trade_type = strings
      } else {
        const { fd_ent_name, fd_prin_name, fd_entorg_code, fd_type, fd_code } =
          this.dialog3.tableData[0]
        const { entList } = this.objData
        const obj = {}
        if (this.dialog3.tableData.length > 1) {
          this.dialog3.tableData.forEach((item) => {
            obj.fd_ent_name = item[fd_ent_name]
            obj.fd_prin_name = item[fd_prin_name]
            obj.fd_entorg_code = item[fd_entorg_code]
            obj.fd_type = item[fd_type]
            obj.fd_code = item[fd_code]
            entList.push(obj)
          })
        } else {
          const obj = {
            fd_ent_name,
            fd_prin_name,
            fd_entorg_code,
            fd_type,
            fd_code
          }
          this.objData.entList = [obj]
        }
      }
      this.dialog3.visible = false
    },
    // 关联企业弹框删除
    handleDelete() {
      if (commonBlank(this.currentRow)) {
        commonMsgWarn('请选择需要删除的数据', this)
        return
      }
      if (this.dialog3.title === '行业归属') {
        const isIn = this.dialog3.tableData.findIndex(
          (item) => item.trade_type === this.currentRow.trade_type
        )
        if (isIn >= 0) {
          this.dialog3.tableData.splice(isIn, 1)
        }
      } else {
        const isIn = this.dialog3.tableData.findIndex(
          (item) =>
            item.fd_code === this.currentRow.fd_code &&
            item.fd_type === this.currentRow.fd_type
        )
        if (isIn >= 0) {
          this.dialog3.tableData.splice(isIn, 1)
        }
      }
    },
    // 关联企业弹框新增
    handleAdd() {
      if (this.dialog3.title === '行业归属') {
        if (this.dialog5.config.hy_type.hidden === true) {
          for (const i in this.dialog5.config) {
            this.dialog5.config[i].hidden = !this.dialog5.config[i].hidden
          }
        }
      } else {
        if (this.dialog5.config.hy_type.hidden === false) {
          for (const i in this.dialog5.config) {
            this.dialog5.config[i].hidden = !this.dialog5.config[i].hidden
          }
        }
      }
      this.dialog5.visible = true
    },
    // 行业归属
    handleBtn1(times) {
      this.dialog3.title = '行业归属'
      this.dialog3.visible = true
      this.dialog3.tableColumn3 = configTable4()
      let arr = []
      let tradeType
      if (times === 'first') {
        tradeType = this.dialog.desData.trade_type
      } else {
        tradeType = this.objData.trade_type
      }
      if (!commonBlank(tradeType)) {
        arr = tradeType.split(',').map((trade_type, index)=> ({
          index,
          trade_type
        }))
      }
      this.dialog3.tableData = tradeType ? arr : []
    },
    // 关联企业
    handleBtn2() {
      const { entList } = this.objData
      this.dialog3.title = '关联企业详情'
      this.dialog3.visible = true
      this.dialog3.tableColumn3 = configTable3()
      this.dialog3.tableData = entList || []
    },
    // 选择单行
    currentChange(val) {
      console.log(val)
      this.currentRow = val
    },
    // table选择行
    currentChange2(val) {
      console.log(val)
      this.tableRow = val
    },
    // 报备新增二次弹框取消
    changeVisible4() {
      this.dialog4.visible = false
    },
    // 打印销户转户弹框
    handleSumit6() {
      this.dialog6.visible = false
    },
    // 报备新增弹框确定的二次弹框
    dialogSumbit4(params) {
      // console.log(params)
      // console.log(this.objData)
      // console.log(this.objCopy)
      const { sdepcountaxcode, sdepareataxcode, sdepnotaxfile } = params
      const { oper_type, acc_type, depo_type, change_vailddate } = this.objCopy
      let report_type = ''
      let interface_no = ''
      if (acc_type === '1') {
        // 基本户
        if (
          depo_type === '01' ||
          depo_type === '02' ||
          depo_type === '13' ||
          depo_type === '14'
        ) {
          report_type = '2'
          if (oper_type === '1') {
            interface_no = 'HD101'
          } else if (oper_type === '2') {
            interface_no = 'HD103'
          } else if (oper_type === '3') {
            interface_no = 'HD120'
          }
        } else {
          report_type = '1'
          if (oper_type === '1') {
            interface_no = 'HD100'
          } else if (oper_type === '2') {
            interface_no = 'HD102'
          } else if (oper_type === '3') {
            interface_no = 'HD119'
          }
        }
      } else if (acc_type === '2') {
        // 预算单位专户
        report_type = '1'
        if (oper_type === '1') {
          interface_no = 'HD106'
        } else if (oper_type === '2') {
          interface_no = 'HD107'
        } else if (oper_type === '3') {
          interface_no = 'HD119'
        }
      } else if (acc_type === '3') {
        // 临时机构临时户
        report_type = '1'
        if (oper_type === '1') {
          interface_no = 'HD115'
        } else if (oper_type === '2') {
          interface_no = 'HD116'
        } else if (oper_type === '3') {
          interface_no = 'HD119'
        }
      } else if (acc_type === '4') {
        // 非临时机构临时户
        if (
          depo_type === '01' ||
          depo_type === '02' ||
          depo_type === '13' ||
          depo_type === '14'
        ) {
          report_type = '2'
          if (oper_type === '1') {
            interface_no = 'HD110'
          } else if (oper_type === '2') {
            interface_no = 'HD111'
          } else if (oper_type === '3') {
            interface_no = 'HD120'
          }
        } else {
          report_type = '1'
          if (oper_type === '1') {
            interface_no = 'HD113'
          } else if (oper_type === '2') {
            interface_no = 'HD114'
          } else if (oper_type === '3') {
            interface_no = 'HD119'
          }
        }
      } else if (acc_type === '5') {
        // 特殊单位专户
        report_type = '1'
        if (oper_type === '1') {
          interface_no = 'HD117'
        } else if (oper_type === '2') {
          interface_no = 'HD118'
        } else if (oper_type === '3') {
          interface_no = 'HD119'
        }
      } else if (acc_type === '6') {
        // 一般户
        report_type = '2'
        if (oper_type === '1') {
          interface_no = 'HD104'
        } else if (oper_type === '2') {
          interface_no = 'HD105'
        } else if (oper_type === '3') {
          interface_no = 'HD119'
        }
      } else if (acc_type === '7') {
        // 非预算单位专户
        report_type = '2'
        if (oper_type === '1') {
          interface_no = 'HD108'
        } else if (oper_type === '2') {
          interface_no = 'HD109'
        } else if (oper_type === '3') {
          interface_no = 'HD119'
        }
      }
      if (interface_no === 'HD111' && change_vailddate === '1') {
        interface_no = 'HD112'
      }
	console.log(oper_type);
	console.log(acc_type);
	console.log(sdepcountaxcode);
	console.log(sdepareataxcode);
	console.log(sdepnotaxfile);
      if (oper_type === '1') {
        if (
          (acc_type === '1' || acc_type === '3' || acc_type === '5') &&
          (depo_type === '01' ||
            depo_type === '02' ||
            depo_type === '13' ||
            depo_type === '14')
        ) {
          if (!sdepcountaxcode  && !sdepareataxcode && !sdepnotaxfile ) {
            commonMsgWarn(
              '请录入地税登记证号或国税登记证号或无需办理税务登记证的文件或税务机关出具的证明!',
              this
            )
            return
          }
        }
        if (acc_type === '1' || acc_type === '3' || acc_type === '5') {
          if ((sdepcountaxcode || sdepareataxcode) && sdepnotaxfile) {
            commonMsgWarn(
              '国税登记证号、地税登记证号、无需办理税务登记证的文件或税务机关出具的证明不能同时存在',
              this
            )
            return
          }
        }
        if (
          oper_type !== '3' &&
          (acc_type === '1' || acc_type === '3' || acc_type === '5')
        ) {
          const { sdepfundkind, fdepfund, userCheckbox } =
            this.dialog4.configTableData.form_info2.formData
          if (!sdepfundkind && !fdepfund && !userCheckbox.length) {
            commonMsgWarn('请录入注册资金币种、注册资金金额或选择未标明注册资金!', this)
            return
          }
        }
      }
      this.handleInterface(params, report_type, interface_no)
      this.dialog4.visible = false
    },
    // 接口判断
    handleInterface(params, report_type, interface_no) {
      const { oper_type, acc_type, depo_type } = this.objCopy
      if (oper_type !== '3') {
        const {
          accno,
          acc_name,
          saccreason,
          sdepmancrekind,
          imode,
          fdepfund,
          saccbasearea,
          saccfundkind,
          sdepmancrecode,
          daccvailddate,
          choiceType,
          bank_acc_type,
          cny_type,
          open_organ,
          sdepcountaxcode,
          area_code,
          acc_serial_no
        } = this.objData
        const msg = {
          acc_no: accno,
          oper_type: 'select_acc'
        }
        reportInfo(msg).then((res) => {
          if (oper_type === '1' && res.retMap.num) {
            commonMsgWarn('该账户已存在', this)
            return
          } else {
            const msg2 = {
              oper_type: 'add',
              report_info: { ...params, sDepManRegion: params.sDepManRegion ? this.objData.sDepManRegion : '', },
              organ_no: open_organ,
              oper_type1: oper_type,
              acc_name,
              acc_type,
              report_type,
              acc_no: accno,
              acc_serial_no
            }
            reportInfo(msg2).then((res2) => {
              if (res2.retCode === '200') {
                params = {
                  serial_no: res2.retMap.serial_no,
                  ...params
                }
              } else {
                commonMsgWarn('新增失败', this)
                return
              }
              let msg3 = ''
              if (acc_type === '1') {
                console.log(this.objData)
                console.log(params)
                msg3 = {
                  oper_type: 'report_submit',
                  acc_no: accno,
                  acc_type,
                  oper_type1: oper_type,
                  report_info: {
                    isAdd: '0',
                    isDetail: true,
                    acc_name,
                    acctype: acc_type,
                    saccreason,
                    imode,
                    fdepfund,
                    saccbasearea,
                    saccfundkind,
                    daccvailddate,
                    choiceType,
                    bank_acc_type,
                    cny_type,
                    open_organ,
                    sdepcountaxcode,
                    saccfiletype2: '',
                    saccfilecode2: '',
                    organ_no: this.objData.open_organ,
                    interface_no,
                    reportAgainFlag: '1',
                    ...params,
                    trade_type: params.trade_type ? this.objData.trade_type : '',
                    sdepmancrecode: params.sdepcercode ? params.sdepcercode : '',
                    sDepManRegion: params.sDepManRegion ? this.objData.sDepManRegion : '',
                    sdepmancrekind: params.sdepcerkind ? params.sdepcerkind : ''
                  },
                  interface_no,
                  reportParams_change_flag: params.sdepregarea !== area_code
                }
                const { report_info } = msg3
                if (interface_no === 'HD100' || interface_no === 'HD101') {
                  if (params.sdepregarea !== area_code) {
                    report_info.area_code = params.sdepregarea
                  }
                  report_info.accno = accno // 普通模式
                  report_info.saccno = accno // 复核模式
                  report_info.acctype = '1'
                }
                if (interface_no === 'HD102') {
                  report_info.saccno = accno
                  report_info.accType = '1'
                  report_info.accchoosesign = '1'
                }
                if (interface_no === 'HD103') {
                  report_info.saccno = accno
                  report_info.choiceType = '0'
                  report_info.accchoosesign = '1' // 复核模式录入用
                }
              } else if (acc_type === '2' || acc_type === '7') {
                msg3 = {
                  oper_type: 'report_submit',
                  acc_no: accno,
                  acc_type,
                  oper_type1: oper_type,
                  report_info: {
                    areacode: '1111',
                    isAdd: '0',
                    isDetail: true,
                    acc_name,
                    acctype: acc_type,
                    saccreason,
                    imode,
                    fdepfund,
                    saccbasearea,
                    saccfundkind,
                    daccvailddate,
                    choiceType,
                    bank_acc_type,
                    cny_type,
                    open_organ,
                    saccfiletype2: '',
                    saccfilecode2: '',
                    organ_no: this.objData.open_organ,
                    interface_no,
                    reportAgainFlag: '1',
                    ...params,
                    sdepmancrecode: params.sdepcercode ? params.sdepcercode : '',
                    sdepmancrekind: params.sdepcerkind ? params.sdepcerkind : ''
                  },
                  interface_no,
                  reportParams_change_flag: params.sdepregarea !== area_code
                }
                const { report_info } = msg3
                if (acc_type === '7') {
                  if (interface_no === 'HD109') {
                    report_info.saccno = accno
                    report_info.saccfiletype1 = params.filetype
                    report_info.saccfilecode1 = params.filecode
                    report_info.sremark = params.remark
                    report_info.saccfundkind = params.fundkind
                    report_info.accountNameType = params.imode
                    report_info.saccdepnametmp = params.saccdepname
                    report_info.saccdepcrekindtmp = params.saccdepcrekind
                    report_info.saccdepcrecodetmp = params.saccdepcrecode
                    report_info.saccdepname = params.saccdepname
                    report_info.saccdepcrekind = params.saccdepcrekind
                    report_info.saccdepcrecode = params.saccdepcrecode
                    report_info.saccdepmanname = params.saccdepmanname
                    report_info.saccdeptel = params.saccdeptel
                    report_info.saccdeppostcode = params.saccdeppostcode
                    report_info.saccdepaddress = params.saccdepaddress
                    report_info.saccdepnametmp2 = params.saccdepname
                    report_info.saccdepcrekindtmp2 = params.saccdepcrekind
                    report_info.saccdepcrecodetmp2 = params.saccdepcrecode
                    report_info.saccprefix = params.saccprefix
                    report_info.saccpostfix = params.saccpostfix
                  }
                }
                if (acc_type === '2') {
                  if (interface_no === 'HD107') {
                    report_info.accchoosesign = '1'
                    report_info.accType = '2'
                    report_info.saccno = params.accno
                    if (params.imode === '1') {
                      report_info.saccdepname2 = params.saccdepname
                      report_info.saccdepcrekind2 = params.saccdepcrekind
                      report_info.saccdepcrecode2 = params.saccdepcrecode
                    } else {
                      report_info.saccdepname = params.saccdepname
                      report_info.saccdepcrekind = params.saccdepcrekind
                      report_info.saccdepcrecode = params.saccdepcrecode
                    }
                  }
                }
              } else if (acc_type === '6') {
                msg3 = {
                  oper_type: 'report_submit',
                  acc_no: accno,
                  acc_type,
                  oper_type1: oper_type,
                  report_info: {
                    organ_no: this.objData.open_organ,
                    interface_no,
                    reportAgainFlag: '1',
                    ...params
                  },
                  interface_no,
                  reportParams_change_flag: params.sdepregarea !== area_code
                }
                const { report_info } = msg3
                if (interface_no === 'HD105') {
                  report_info.saccno = accno
                  report_info.saccfiletype1 = params.filetype
                  report_info.saccfilecode1 = params.filecode
                  report_info.sremark = params.remark
                }
              } else if (acc_type === '3') {
                msg3 = {
                  oper_type: 'report_submit',
                  acc_no: accno,
                  acc_type,
                  oper_type1: oper_type,
                  report_info: {
                    areacode: '1111',
                    acc_name,
                    acctype: acc_type,
                    idepmanagestype: params.sdeptmankind,
                    organ_no: this.objData.open_organ,
                    sdepcountaxcode,
                    interface_no,
                    reportAgainFlag: '1',
                    ...params,
                    trade_type: params.trade_type ? this.objData.trade_type : '',
                    sDepManRegion: params.sDepManRegion ? this.objData.sDepManRegion : '',
                  },
                  interface_no,
                  reportParams_change_flag: params.sdepregarea !== area_code
                }
                if (interface_no === 'HD116') {
                  const { report_info } = msg3
                  report_info.accchoosesign = '1'
                  report_info.accType = '3'
                  report_info.saccno = accno
                }
              } else if (acc_type === '4') {
                msg3 = {
                  oper_type: 'report_submit',
                  acc_no: accno,
                  acc_type,
                  oper_type1: oper_type,
                  report_info: {
                    saccno: accno,
                    organ_no: this.objData.open_organ,
                    interface_no,
                    reportAgainFlag: '1',
                    ...params
                  },
                  interface_no,
                  reportParams_change_flag: params.sdepregarea !== area_code
                }
                const { report_info } = msg3
                if (interface_no === 'HD110') {
                  if (params.sdepregarea !== area_code) {
                    report_info.area_code = params.sdepregarea
                  }
                }
                if (
                  interface_no === 'HD110' ||
                  interface_no === 'HD111' ||
                  interface_no === 'HD112' ||
                  interface_no === 'HD114'
                ) {
                  report_info.saccno = accno
                  if (interface_no === 'HD111' || interface_no === 'HD112') {
                    report_info.choiceType = '0'
                    report_info.accchoosesign = '1' // 复核模式
                  } else if (interface_no === 'HD114') {
                    report_info.accType = '4'
                    report_info.accchoosesign = '1'
                  }
                }
                if (interface_no === 'HD113') {
                  if (params.sdepregarea !== area_code) {
                    report_info.area_code = params.sdepregarea
                  }
                  report_info.accno = accno
                  report_info.acctype = '4'
                }
              } else {
                msg3 = {
                  oper_type: 'report_submit',
                  acc_no: accno,
                  acc_type,
                  oper_type1: oper_type,
                  report_info: {
                    acctype: acc_type,
                    saccno: accno,
                    organ_no: this.objData.open_organ,
                    interface_no,
                    reportAgainFlag: '1',
                    ...params,
                    trade_type: params.trade_type ? this.objData.trade_type : '',
                    sDepManRegion: params.sDepManRegion ? this.objData.sDepManRegion : ''
                  },
                  interface_no,
                  reportParams_change_flag: params.sdepregarea !== area_code
                }
                const { report_info } = msg3
                if (interface_no === 'HD118') {
                  report_info.accchoosesign = '1'
                  report_info.accType = '5'
                  report_info.saccno = accno
                }
              }
              reportInfo(msg3).then((res3) => {
                console.log(this.objData)
                console.log(params)
                if ((oper_type === '2' && this.objData.daccvailddate !== params.daccvailddate && params.daccvailddate) || (oper_type === '1' && acc_type === '4' && (depo_type === '01' || depo_type === '02' || depo_type === '13' || depo_type === '14'))) {
                  if (oper_type === '1') {
                    this.nontemporaryData.data.data[0].title = '临时存款账户开户成功'
                  } else {
                    this.nontemporaryData.data.data[0].title = '变更临时存款账户展期成功'
                  }
                  this.dialog6.visible = true
                  console.log(this.nontemporaryData)
                  this.dialog6.desLabelData = this.nontemporaryData.data.data
                  this.dialog6.desData = res3.retMap
                }
                if (res3.retCode === '200') {
                  const msg4 = {
                    oper_type: 'report_update',
                    acc_no: accno,
                    managestype: params.idepmanagestype,
                    file_type1: params.saccfiletype1,
                    adr_id: params.sdepregarea
                  }
                  reportInfo(msg4).then((res4) => {
                    if (res4.retCode === '200') {
                      commonMsgSuccess('报备成功', this)
                      this.queryList()
                      if (interface_no === 'HD101') {
                        commonMsgConfirm(
                          '报备成功，即将打印基本存款账户信息以及存款人密码',
                          this,
                          (flag) => {
                            if (flag) {
                              const { accxml, pswxml } = res3.retMap
                              if (!commonBlank(accxml)) {
                                const msg5 = {
                                  parameterList: [{}],
                                  oper_type: 'printAcc',
                                  accxml
                                }
                                const msg6 = {
                                  parameterList: [{}],
                                  oper_type: 'printPSW',
                                  pswxml
                                }
                                cusInfo(msg5).then((res5) => {
                                  const myDate = new Date()
                                  const year = myDate.getFullYear()
                                  const month = myDate.getMonth() + 1
                                  const day = myDate.getDate()
                                  this.printData.year = year
                                  this.printData.month = month
                                  this.printData.day = day
                                  this.printData.base_info = res5.retMap
                                  cusInfo(msg6).then((res6) => {
                                    this.isPrint = true
                                    this.printData.acc_pwd = res6.retMap
                                    setTimeout(() => {
                                      this.$print(this.$refs.printRefs)
                                    }, 100)
                                  })
                                })
                              } else {
                                commonMsgWarn(
                                  '打印所需数据为空，无法打印',
                                  this
                                )
                              }
                            } else {
                              commonMsgConfirm(
                                '即将打印存款人查询密码',
                                this,
                                (flag) => {
                                  if (flag) {
                                    const pswxml = res3.retMap.pswxml
                                    if (!commonBlank(pswxml)) {
                                      const msg6 = {
                                        parameterList: [{}],
                                        oper_type: 'printPSW',
                                        pswxml
                                      }
                                      cusInfo(msg6).then((res6) => {
                                        this.printFlag = 'password'
                                        this.message = res.retMap
                                        setTimeout(() => {
                                          this.$print(this.$refs.printRef)
                                        }, 100)
                                      })
                                    }
                                  }
                                }
                              )
                            }
                          }
                        )
                      }
                    }
                  })
                }
              })
            })
          }
        })
      } else {
        const { open_organ, acc_name } = this.objData
        const { acc_no, close_reason } = params
        const msg = {
          acc_no,
          oper_type: 'select_acc'
        }
        reportInfo(msg).then((res) => {
          const msg2 = {
            oper_type: 'add',
            report_info: {
              isAdd: '1',
              interface_no,
              accno: acc_no,
              deletereason: close_reason,
              organ_no: open_organ
            },
            reportParams_change_flag: false,
            organ_no: open_organ,
            oper_type1: oper_type,
            acc_name,
            acc_type,
            report_type,
            acc_no
          }
          reportInfo(msg2).then((res2) => {
            if (res2.retCode === '200') {
              const msg3 = {
                oper_type: 'report_submit',
                report_info: {
                  isAdd: '1',
                  interface_no,
                  accno: acc_no,
                  deletereason: close_reason,
                  organ_no: open_organ,
                  serial_no: res2.retMap.serial_no
                },
                reportParams_change_flag: false,
                interface_no,
                oper_type1: oper_type,
                acc_type,
                report_type,
                acc_no
              }
              reportInfo(msg3).then((res3) => {
                if (res3.retCode === '200') {
                  const msg4 = {
                    acc_no,
                    oper_type: 'report_updata'
                  }
                  reportInfo(msg4).then((res4) => {
                    if (res4.retCode === '200') {
                      if (close_reason === '1') {
                        this.printcancelData = res3.retMap
                        this.printCancels = true
                        setTimeout(() => {
                          this.$print(this.$refs.printCancelRef)
                        }, 100)
                      }
                      commonMsgSuccess('销户成功', this)
                      this.queryList()
                      this.dialog2.visible = false
                    }
                  })
                }
              })
            }
          })
        })
      }
    },
    // /**
    //  * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      const msg = {
        parameterList: [
          {
            oper_type: this.defaultForm.oper_type,
            report_state: this.defaultForm.report_state
          }
        ],
        open_organ:
          this.defaultForm.organ_no || `#${this.$store.getters.organNo}`,
        acc_type: this.defaultForm.acc_type,
        start_date:
          this.defaultForm.date_two !== null
            ? this.defaultForm.date_two[0]
            : '',
        end_date:
          this.defaultForm.date_two !== null
            ? this.defaultForm.date_two[1]
            : '',
        acc_no: this.defaultForm.acc_no,
        cus_no: this.defaultForm.cus_no,
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      // query
      reportInfo(msg).then((response) => {
        const { list, totalNum, failNum, succNum } = response.retMap
        this.tableData = list
        this.pageList.totalNum = totalNum
        if (currentPage) {
          this.pageList.currentPage = currentPage
        }
        this.$emit('dataNum', { failNum, succNum })
        this.showLoading()
      })
    },
    // 关联企业新增弹框的取消
    dialogClose5() {
      this.dialog5.visible = false
    },
    // 关联企业新增弹框的确定
    dialogSumbit5(data) {
      // console.log(data);
      const {
        fd_ent_name,
        fd_prin_name,
        fd_entorg_code,
        fd_type,
        fd_code,
        hy_type
      } = data
      if (this.dialog3.title === '行业归属') {
        const obj = { trade_type: hy_type }
        this.dialog3.tableData = [...this.dialog3.tableData, obj]
      } else {
        const obj = {
          fd_ent_name,
          fd_prin_name,
          fd_entorg_code,
          fd_type,
          fd_code
        }
        if (this.dialog3.tableData.length) {
          this.dialog3.tableData = [...this.dialog3.tableData, obj]
        } else {
          this.dialog3.tableData = [obj]
        }
      }
      this.dialog5.visible = false
    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    },
    // 报备新增弹框
    changeVisible2(param) {
      this.dialog2.visible = param
    },

    // 点击账号详情框
    openDialog(row) {
      console.log('row', row)
      const { information } = this.configData
      this.dialog.desLabelData = information.data
      this.dialog.top = information.top
      this.dialog.title = information.title ? information.title : ''
      this.dialog.width = information.width
      this.dialog.column = information.column
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
    // 报备详情
    openDetail(row) {
      console.log('rows', row)
      this.details = false
      this.rowObj = row
      const datas = this.tableData.find(
        (item) => item.serial_no === row.serial_no
      )
      const { report_info } = datas
      const obj = JSON.parse(report_info)
      if (obj.acctype === '1' || obj.acctype === '3' || obj.acctype === '5') {
        this.nations.forEach(item => {
          if (obj.sDepManRegion === item.key) {
            obj.sDepManRegion = item.value
          }
        })
      }
      this.dialog.desData = obj
      this.dialog.visible = true
      const { passAcc } = this.configData
      if (row.oper_type === '3') {
        this.dialog.desLabelData = passAcc.data
        this.dialog.top = passAcc.top
        this.dialog.title = passAcc.title
        this.dialog.width = passAcc.width
        this.dialog.column = passAcc.column
      } else {
        this.showDialog(row.acc_type, obj)
      }
    },
    /**
     *页码更新 */
    getList(pageParam) {
      const { currentPage, pageSize } = pageParam
      this.pageList.pageSize = pageSize
      this.pageList.page = currentPage
      this.queryList()
      setTimeout(() => {
        console.log(this.pageList)
      })
    },
    /**
     * 加载中动画配置*/
    showLoading() {
      this.listLoading = !this.listLoading
    },
    /**
     * btn - 下载excel*/
    handleExport() {
      // 格式化表格数据
      const formatJson = (filterVal, jsonData) => {
        console.log(filterVal);
        console.log(jsonData);
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
      // console.log(tHeader);
      // console.log(data);
      // exportXlsx(tHeader, data, '报备信息查询')
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .el-col-18 {
    .el-form-item__label {
      width: 11rem !important;
    }
    .el-form-item__content {
      margin-left: 11rem !important;
    }
  }

  .el-descriptions-item:nth-child(2),
  .el-descriptions-item:nth-child(3) {
    position: relative;
  }
  .btn {
    span {
      position: absolute;
      top: 5px;
      left: 10px;
    }
  }
}
.scroe_dialog {
  height: 66vh;
  overflow: auto;
}
.el-input__inner {
  border: none !important;
}
.changeColor {
  color: red;
}
.aaa > span {
  position: absolute;
  top: 5px;
  left: 12px;
}
</style>
