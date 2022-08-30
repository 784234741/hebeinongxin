<!--
 * 年检信息查询页面table
 !-->
<template>
  <div class="sun-content">
    <!--table-->
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
            <span v-if="item.name === 'open_organ'">{{
              row[item.name] | organNameFormats
            }}</span>
            <span
              v-else-if="item.name === 'acc_no'"
              :style="{ color: $store.state.settings.theme, cursor: 'pointer' }"
              @click="accDetail(row)"
            >{{ row[item.name] }}</span>
            <span
              v-else-if="item.name === 'annual_state'"
              :style="
                row[item.name] === '1' || row[item.name] === '5'
                  ? 'color: blue'
                  : row[item.name] === '3'
                    ? 'color: green; cursor: pointer'
                    : row[item.name] === '4'
                      ? 'color: red; cursor: pointer'
                      : 'color: red'
              "
              @click="stateDetail(row)"
            >{{ row[item.name] | annualState }}</span>
            <span v-else-if="item.name === 'report_state'">{{
              row[item.name] | reportStates
            }}</span>
            <span v-else-if="item.name === 'is_hand'">{{
              row[item.name] | isHand
            }}</span>
            <span v-else-if="item.name === 'confirm_state'">{{
              row[item.name] | confirmState
            }}</span>
            <span
              v-else-if="
                item.name === 'annual_date' || item.name === 'report_date'
              "
            >{{ row[item.name] | date10Format }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template>
    </sun-table>

    <!--按钮-->
    <div class="list-btn">
      <sun-button
        :btn-hand-check="$attrs['btn-all'].btnhandCheck"
        :btn-print="$attrs['btn-all'].btnPrint"
        :btn-export-all="$attrs['btn-all'].btnExport"
        @handelPrint="handlePrint"
        @handleExport="handleExport"
        @handleCheck="handleCheck"
      />
    </div>

    <!--点击账号详情弹框-->
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
        <span v-else-if="item === 'acc_state'"> {{ value | accState }}</span>
        <span v-else-if="item === 'scur_type'">
          {{ value | amCurrencyType }}</span>

        <span v-else-if="item === 'open_organ'">
          {{ value | organNameFormat }}</span>
        <span v-else-if="item === 'hd_type'"> {{ value | hdType }}</span>
        <span
          v-else-if="
            item === 'start_date' ||
              item === 'expire_date' ||
              item === 'end_date' ||
              item === 'legal_end' ||
              item === 'open_date' ||
              item === 'close_date' ||
              item === 'agent_end'
          "
        >
          {{ value | date10Format }}</span>
        <span v-else> {{ value }}</span>
      </template>
    </sun-describe-dialog>

    <!--点击年检状态详情弹框-->
    <sun-table-dialog
      :title="dialog2.title"
      :width="dialog2.width"
      :visible="dialog2.visible"
      :table-data="dialog2.tableData"
      :table-column="dialog2.tableColumn"
      :btn-cancle="false"
      :btn-submit="false"
      @dialogClose="dialogClose2"
    >
      <template slot-scope="{ item, row }">
        <span v-if="item.name === 'field_id'">
          {{ row[item.name] | depoType }}</span>
        <span v-else>{{ row[item.name] }}</span>
      </template>
    </sun-table-dialog>
    <!--打印-->
    <Print
      v-show="hasPrint"
      ref="printRef"
      :table-data="tableData"
      :time="time"
    />
  </div>
</template>

<script>
import {
  commonMsgWarn,
  commonMsgConfirm
  // commonMsgSuccess
} from '@/utils/message.js' // 提示信息
import { dateNowFormat } from '@/utils/date.js' // 日期格式化
import { dateTimeFormat } from '@/filters' // 日期格式化
import { column, configDetail, stateColumn } from './info' // 配置信息
import {
  SunTable,
  SunButton,
  SunDescribeDialog,
  SunTableDialog
} from '@/components' // 公共组件
import { commonBlank, exportXlsx, commonReportExport } from '@/utils/common' // 公共方法
import Print from './print.vue' // 打印组件
import {
  organNameFormat,
  annualState,
  date10Format,
  isHand,
  confirmState,
  reportStates
} from '@/filters' // 过滤器
import { yearCheck } from '@/api' // 接口
const { yearQuery, queryDetail } = yearCheck
export default {
  name: 'QueryTable',
  components: {
    SunTable,
    SunButton,
    SunDescribeDialog,
    SunTableDialog,
    Print
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
      hasPrint: false, // 打印插件
      time: '', // 当前时间
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
        visible: false,
        column: 3,
        width: '98%',
        title: '',
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
        // boxStyle: {
        //   padding: '2rem 2rem 2rem 4rem',
        //   marginBottom: '3rem',
        //   borderRadius: '4px',
        //   boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
        // },
        desLabelData: configDetail(),
        desData: {}
      }, // 账号详情弹框数据
      dialog2: {
        title: '',
        width: '98%',
        visible: false,
        tableData: [], // 数据
        tableColumn: stateColumn() // 表头
      }, // 年检状态详情数据
      fieldData: [] // 字段信息数组
    }
  },
  created() {
    this.getField()
  },
  mounted() {
    this.queryList()
  },
  methods: {
    /**
     *获取字段信息
     */
    getField() {
      const msg = { parameterList: [], oper_type: 'getCompField' }
      yearQuery(msg).then((res) => {
        const {
          retMap: { list }
        } = res
        this.fieldData = list
      })
    },
    /**
     *打印 */
    handlePrint() {
      console.log(this.tableData)
      this.time = dateTimeFormat(dateNowFormat())
      this.hasPrint = true
      setTimeout(() => {
        this.$print(this.$refs.printRef)
        this.hasPrint = false
      }, 100)
    },
    /**
     * 导出
     * @param {String}param 标记导出当前页和全部
     */
    handleExport(param) {
      // if (param === 'all') {
      // } else {
      //   const {
      //     open_organ,
      //     acc_no,
      //     acc_name,
      //     year_no,
      //     annual_state,
      //     confirm_state
      //   } = this.defaultForm
      //   const dateNow = date10Format(new Date()) // `导出用户操作日志_${dateNow}.xls`
      //   const fileName = `导出年检信息_${dateNow}.xls` // 保存到本地的文件名
      //   const formatInfo =
      //     'open_organ#@ORGAN_NO,annual_state#AM9100,is_hand#AM7500,confirm_state#AM9400,annual_date#%yyyy-MM-dd,confirm_date#%yyyy-MM-dd,handle_time#%yyyy-MM-dd HH:mm:ss,recheck_time#%yyyy-MM-dd HH:mm:ss' // 服务器文件路径（包括文件名）
      //   const headerInfo =
      //     '年检年度：2021  机构：01121-省联社财务部  柜员：admin-系统超级管理员  导出时间：2022-08-19 16:24:39#N#1,10#R#序号#N#2,1#C#开户机构#N#2,1#C#账号#N#2,1#C#账户名称#N#2,1#C#年检状态#N#2,1#C#年检日期#N#2,1#C#是否手工年检#N#2,1#C#状态确认#N#2,1#C#确认日期#N#2,1#C#联系方式#N#2,1#C#经办柜员#N#2,1#C#经办时间#N#2,1#C#复核柜员#N#2,1#C#复核时间#N#2,1#C#工商经营状态#N#2,1#C#企业名称#N#1,3#C#法人代表#N#1,3#C#注册地址#N#1,3#C#统一社会信用代码#N#1,3#C#异常信息#N#1,4#R#人行数据#N#1,1#C#工商数据#N#1,1#C#核心数据#N#1,1#C#人行数据#N#1,1#C#工商数据#N#1,1#C#核心数据#N#1,1#C#人行数据#N#1,1#C#工商数据#N#1,1#C#核心数据#N#1,1#C#人行数据#N#1,1#C#工商数据#N#1,1#C#核心数据#N#1,1#C#严重违法失信信息#N#1,1#C#企业行政处罚信息#N#1,1#C#企业经营异常信息#N#1,1#C#失信人与被执行人信息#N#1,1' // 导出表格表头
      //   const dataInfo =
      //     '2|rn,open_organ,acc_no,acc_name,annual_state,annual_date,is_hand,confirm_state,confirm_date,phone,handle_user,handle_time,recheck_user,recheck_time,status,hd_01,ser_01,core_01,hd_02,ser_02,core_02,hd_04,ser_04,core_04,hd_07,ser_07,core_07' // 导出表格表头对应的字段
      //   const pathMsgCur = `exportAnnualInfo.do?exportFlag=1&pageSize=${
      //     this.tableData.pageList.pageSize
      //   }&currentPage=${
      //     this.tableData.pageList.page
      //   }&acc_name=${acc_name}&acc_no=${acc_no}&open_organ=01121&year_no=${year_no}&annual_state=${annual_state}&confirm_state=${confirm_state}&exportField=${encodeURIComponent(
      //     JSON.stringify(this.fieldData)
      //   )}` // 导出当前页下载文件的请求路径+请求参数
      //   const pathMsgAll = `exportAnnualInfo.do?exportFlag=1&exportType=1&sql1=undefined&pageSize=${this.tableData.pageList.pageSize}&currentPage=-1&organ_no=&user_no=&start_date=&end_date=&content=` // 导出当前页下载文件
      //   // console.log(dateNow)
      //   // console.log(fileName)
      //   // console.log(formatInfo)
      //   // console.log(headerInfo)
      //   // console.log(pathMsgCur)
      //   // console.log(pathMsgCur)
      //   // console.log(pathMsgAll)
      //   // 导出当前页
      //   commonReportExport(
      //     fileName,
      //     formatInfo,
      //     headerInfo,
      //     dataInfo,
      //     pathMsgCur
      //   )
      // 导出全部
      // commonReportExport(
      //   fileName,
      //   formatInfo,
      //   headerInfo,
      //   dataInfo,
      //   pathMsgAll
      // )
      // }
      if (param === 'all') {
      } else {
        // 格式化表格数据
        const formatJson = (filterVal, jsonData) => {
          return jsonData.map((v) =>
            filterVal.map((j) => {
              if (j === 'open_organ') {
                return organNameFormat(v[j])
              } else if (j === 'annual_state') {
                return annualState(v[j])
              } else if (j === 'is_hand') {
                return isHand(v[j])
              } else if (j === 'confirm_state') {
                return confirmState(v[j])
              } else if (j === 'annual_date' || j === 'report_date') {
                return date10Format(v[j])
              } else if (j === 'report_state') {
                return reportStates(v[j])
              } else {
                return v[j]
              }
            })
          )
        }
        const tHeader = []
        const filterVal = []
        this.tableData.column.map((item) => {
          tHeader.push(item.label)
          filterVal.push(item.name)
        })
        const data = formatJson(filterVal, this.tableData.data)
        exportXlsx(tHeader, data, '年检信息查询')
      }
    },
    /**
     * 点击账号查看详情
     * @param {Object}param 选中行
     */
    accDetail(param) {
      this.dialog.visible = true
      this.dialog.title = `账户信息详情——${param.acc_no}`
      const msg = {
        parameterList: [],
        acc_no: param.acc_no,
        oper_type: 'selects'
      }
      queryDetail(msg).then((res) => {
        const {
          retCode,
          retMap: { list }
        } = res
        if (retCode === '200') {
          this.dialog.desData = list[0]
        }
      })
    },
    /**
     * 点击年检状态查看详情
     * @param {Object}param 选中行
     */
    stateDetail(param) {
      if (
        (param.annual_state === '3' && param.confirm_state === '0') ||
        param.annual_state === '4'
      ) {
        const msg = {
          parameterList: [{ comp_id: param.comp_id }],
          oper_type: 'selectCompDetail'
        }
        yearQuery(msg).then((res) => {
          const {
            retCode,
            retMap: { list }
          } = res
          if (retCode === '200') {
            this.dialog2.tableData = list
          }
        })
        if (param.annual_state === '3') {
          this.dialog2.title = '年检通过详情'
        } else if (param.annual_state === '4') {
          this.dialog2.title = '年检失败详情'
        }
        this.dialog2.visible = true
      }
    },
    /**
     * 关闭年检详情弹框
     * @param {Boolean}param false
     */
    dialogClose2(param) {
      this.dialog2.visible = param
    },
    /**
     *手工年检 */
    // handleSumit6() {},

    /**
     *手工年检 */
    handleCheck() {
      if (commonBlank(this.tableRow)) {
        commonMsgWarn('未选中数据', this)
        return
      }
      if (this.tableRow.length > 1) {
        commonMsgWarn('只能选中一条数据', this)
        return
      }
      const { annual_state, confirm_state } = this.tableRow
      if (
        (annual_state === '3' && confirm_state === '0') ||
        annual_state === '4'
      ) {
        commonMsgConfirm(
          annual_state === '3'
            ? '是否确认更新本地年检状态为不通过？'
            : '是否确认更新本地年检状态为通过？',
          this,
          (flag) => {
            this.handleCheckPort(this.tableRow)
          }
        )
      } else {
        commonMsgWarn('不可对该账户手工年检!', this)
        return
      }
    },
    /**
     * 更改年检状态接口
     * @param {Object}pageParam 选中行数据
     */
    handleCheckPort(param) {
      const { year_no, acc_no, annual_state, comp_id } = param
      const msg = {
        parameterList: [
          {
            year_no,
            acc_no,
            annual_state,
            comp_id
          }
        ],
        oper_type: 'modifyAnnualState',
        user_no: this.$store.getters.userNo
      }
      yearQuery(msg).then((res) => {
        if (res.retCode === '200') {
          this.queryList()
        }
      })
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
    },
    /*
     ** table选择行
     */
    currentChange(val) {
      this.tableRow = val
    },
    /*
     ** 查询数据
     */
    queryList() {
      const { pageSize, page } = this.tableData.pageList
      const {
        open_organ,
        acc_no,
        acc_name,
        year_no,
        annual_state,
        confirm_state,
        report_state
      } = this.defaultForm
      const msg = {
        parameterList: [
          {
            year_no,
            acc_no,
            annual_state,
            confirm_state,
            report_state
          }
        ],
        oper_type: 'OP004',
        open_organ,
        acc_name,
        currentPage: page,
        pageSize,
        cus_no: '',
        home_page: '',
        annual_state,
        report_state
      }
      yearQuery(msg).then((res) => {
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
