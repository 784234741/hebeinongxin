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
            <span v-else-if="item.name === 'legal_type'">{{
              row[item.name] | legalType
            }}</span>
            <span v-else-if="item.name === 'report_detail'">
              <span
                :style="{color: $store.state.settings.theme, cursor: 'pointer'}"
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
    >
      <template slot-scope="{ item, row }">
        <span
          v-if="item.name === 'cus_name'"
          :style="{color: $store.state.settings.theme, cursor: 'pointer'}"
          @click="openDialog(row)"
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
        <el-button type="primary" @click="check">核实</el-button>
      </div>
    </sun-table-dialog>

    <sun-tab-dialog
      :visible="dialog2.visible"
      :title="dialog2.title"
      :width="dialog2.width"
      :height="dialog2.height"
      :top="dialog2.top"
      :active-name="dialog2.activeName"
      :tab-arr="dialog2.tabArr"
      @dialogClose="changeVisible2"
      @handleClick="handleClick"
    >
      <template v-slot:first>
        <el-descriptions
          v-for="(item, index) in dialog2.tabMessage.first.message"
          :key="item.title + index"
          border
          :title="item.title"
          :label-style="label"
          :content-style="content"
        >
          <el-descriptions-item
            v-for="item2 in item.arr"
            :key="item2.name"
            :label="item2.label"
          >{{ initData[item2.name] }}</el-descriptions-item>
        </el-descriptions>
      </template>
      <template v-slot:third>
        <sun-table
          table-ref="thirdtableRef"
          :loading="dialog2.listLoading3"
          :table-data="dialog2.tableData3"
          :page-list="dialog2.pageList3"
        >
          <template slot="tableColumn">
            <el-table-column
              v-for="item in dialog2.tableColumn3"
              :key="item.id"
              :prop="item.name"
              :label="item.label"
              :width="item.width"
            >
              <div slot-scope="{ row }">
                <span v-if="item.name === 'open_organ'">{{
                  row[item.name] | organNameFormat
                }}</span>
                <span v-else-if="item.name === 'acc_type'">{{
                  row[item.name] | accType
                }}</span>
                <span v-else-if="item.name === 'acc_state'">{{
                  row[item.name] | accState
                }}</span>
                <span v-else>{{ row[item.name] }}</span>
              </div>
            </el-table-column>
          </template>
        </sun-table>
      </template>
    </sun-tab-dialog>
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm
} from '@/utils/message.js' // 提示信息
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
// import { dateNowFormat } from '@/utils/date.js' // 日期格式化

import { configTable, configTable2, configTable3 } from './info' // 表头、表单配置
import { SunTable, SunTableDialog, SunTabDialog } from '@/components'
// import Des from '../des.vue'

import { WarningLegalMulti } from '@/api'
const { legalMulti, cusInfo, accInfo } = WarningLegalMulti
export default {
  name: 'AssessmentTableList',
  components: { SunTable, SunTableDialog, SunTabDialog },
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
      checkedRows: [], // 选中行
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: 20 // 当前页显示条数
      },
      initData: {},
      dialog: {
        title: '一人多企详情',
        width: '98%',
        top: '5vh',
        visible: false,
        tableColumn: configTable2(),
        tableData: []
      },
      dialog2: {
        title: '',
        width: '98%',
        top: '1vh',
        height: '90vh',
        visible: false,
        activeName: 'first',
        tabArr: [
          { name: 'first', label: '客户信息' },
          { name: 'third', label: '关联账户信息' }
        ],
        tabMessage: {
          first: {
            message: [
              {
                title: '基本信息',
                arr: [
                  { label: '开户许可证核准号', name: 'license_no' },
                  { label: '统一社会信用代码', name: 'ent_credit_no' },
                  { label: '客户名称', name: 'cus_name' },
                  { label: '客户类型', name: 'cus_type' },
                  { label: '注册资本', name: 'reg_money' },
                  { label: '成立日期', name: 'start_date' },
                  { label: '核准日期', name: 'check_date' },
                  { label: '注销日期', name: 'end_date' },
                  { label: '人行行业类型', name: 'hd_type' },
                  { label: '存款人类别', name: 'depo_type' },
                  { label: '地区代码', name: 'adr_id' },
                  { label: '邮政编码', name: 'zcode' },
                  { label: '经办人', name: 'agent_name' },
                  { label: '经办人证件号', name: 'agent_id' },
                  { label: '经办人电话', name: 'agent_phone' },
                  { label: '经办人证件到期日', name: 'agent_end' },
                  { label: '注册地址', name: 'reg_adr' },
                  { label: '经营范围', name: 'reg_scope' }
                ]
              },
              {
                title: '法定代表人信息',
                arr: [
                  { label: '法定代表人', name: 'legal_name' },
                  { label: '法定代表人证件号', name: 'legal_id' },
                  { label: '法定代表人联系电话', name: 'legal_phone' },
                  { label: '法定代表人证件到期日', name: 'legal_end' }
                ]
              },
              {
                title: '组织机构代码证信息',
                arr: [{ label: '组织机构代码', name: 'org_no' }]
              }
            ]
          }
        },
        listLoading3: false,
        tableColumn3: configTable3(),
        tableData3: [],
        pageList3: {
          totalNum: 0,
          page: 1, // 当前页
          pageSize: 20 // 当前页显示条数
        }
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
      const msg = {
        parameterList: [{}],
        ...this.defaultForm,
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      // query
      legalMulti(msg).then((response) => {
        const { returnList, totalNum } = response.retMap
        this.tableData = returnList
        this.pageList.totalNum = totalNum
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
    // 导出
    handleExport() {},
    oprenDetail(row) {
      const msg = {
        parameterList: [{}],
        legal_type: row.legal_type,
        legal_id: row.legal_id,
        cus_organ: row.cus_organ,
        oper_type: 'selectDetail',
        currentPage: 1,
        pageSize: this.pageList.pageSize
      }
      // query
      legalMulti(msg).then((response) => {
        const { list } = response.retMap
        this.dialog.tableData = list
        this.dialog.visible = true
      })
    },
    /**
     * 加载中动画配置*/
    showLoading3() {
      this.dialog2.listLoading = !this.dialog2.listLoading
    },
    // 选择行
    selectionChange(val) {
      this.checkedRows = val
    },
    // 核实
    check() {
      if (this.checkedRows.length === 0) {
        commonMsgWarn('未选中任何数据', this)
        return
      }
      if (this.checkedRows.length > 1) {
        commonMsgWarn('仅支持单笔操作!', this)
        return
      }
      if (this.checkedRows[0].warn_status === '1') {
        commonMsgWarn('不可对已核实的客户进行操作!', this)
        return
      }
      commonMsgConfirm('是否确定将预警状态改为已核实？', this, (flag) => {
        if (flag) {
          const msg = {
            parameterList: [{}],
            oper_type: 'changeWarnStatus',
            cus_no: this.checkedRows[0].cus_no,
            warn_status: '1',
            user_no: this.$store.getters.userNo
          }
          legalMulti(msg).then((response) => {
            commonMsgSuccess('预警状态更改成功！', this)
            this.dialog.visible = false
          })
        }
      })
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

    openDialog(row) {
      this.currentRow = row
      this.dialog2 = Object.assign({}, this.dialog2, {
        title: '客户全息视图',
        visible: true
      })
      const msg = {
        parameterList: [{ cus_no: row.cus_no }],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: 1,
        cusInfo_pageNum: 15
      }
      cusInfo(msg).then((res) => {
        const {
          retMap: { list }
        } = res
        this.initData = list[0]
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
    },
    dialogClose() {
      this.changeVisible()
    }
  }
}
</script>
<style lang="scss" scoped></style>
