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
            <span v-if="item.name === 'organ_no'">{{
              row[item.name] | organNameFormats
            }}</span>
            <span v-else-if="item.name === 'last_modi_date'">{{
              row[item.name] | dateTimeFormat
            }}</span>
            <span v-else-if="item.name === 'is_open'">{{
              row[item.name] | startSign
            }}</span>
            <span
              v-else-if="item.name === 'rule_desc'"
              :style="{ color: 'blue', cursor: 'pointer' }"
              @click="detail(row)"
            >{{ row[item.name] }}</span>
            <span v-else-if="item.name === 'rule_type'">{{
              row[item.name] | amAnnualType
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
    <Dialog
      :title="dialog.title"
      :width="dialog.width"
      :visible="dialog.visible"
      :datas="dialog"
      :form-config="dialog.config"
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
import { dateTimeFormat, date10Format } from '@/filters' // 日期格式化
import { column, config } from './info' // 配置信息
import { dictionaryFieds } from '@/utils/dictionary' // 字典配置

import Dialog from './dialog'
import { yearCheck } from '@/api' // 接口
const { ruleQuery } = yearCheck
export default {
  name: 'RuleTable',
  components: {
    SunTable,
    SunButton,
    Dialog
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
        width: '80%',
        arr: [], // 配置数组
        config: config(),
        btn: 'add', // 点击的是哪个按钮
        formData: {
          rule_no: '',
          organ_no: '',
          rule_type: '1',
          is_open: '',
          prio_level: '',
          last_modi_date: date10Format(dateNowFormat()),
          rule_desc: ''
        },
        typeData: [], // 输入配置规则字段数据
        outPutData: [], // 输出配置规则字段数据
        enterConfig: [], // 输入配置数据
        enterObj: {}, // 输入配置对象
        enterNum: 0, // 输入配置后面数字
        outPutConfig: [], // 输出配置数据
        outPutObj: {}, // 输出配置对象
        outPutNum: 0 // 输出配置后面数字
      }, // 弹框配置
      tableRow: {}, // 表格选中数据
      preModify: {} // 修改之前数据
    }
  },
  mounted() {
    this.queryList()
    this.getDialogData()
    this.dialog.config.organ_no.options = this.$store.getters.organTree
  },
  methods: {
    /**
     * 获取输入配置规则字段数据
     */
    async getDialogData() {
      const msg = { parameterList: [], oper_type: 'getRuleColumns' }
      const { retMap, retCode } = await ruleQuery(msg)
      if (retCode === '200') {
        for (const [idx, i] of retMap.list.entries()) {
          if (i.source_code === '1' || i.source_code === '3') {
            this.dialog.typeData.push({
              value: '$' + i.column_code,
              name: i.column_name,
              source_id: i.source_id,
              data_code: i.data_code,
              source_code: i.source_code,
              data_type: i.data_type
            })
          } else if (i.source_code === '2' || i.source_code === '3') {
            if (i.column_id !== 'is_annual' || idx === 0) {
              this.dialog.outPutData.push({
                value: '$' + i.column_code,
                name: i.column_name,
                source_id: i.source_id,
                data_code: i.data_code,
                source_code: i.source_code,
                data_type: i.data_type
              })
            }
          }
        }
        this.dialog.typeData = retMap.list
      }
    },
    /**
     * 规则描述查看详情
     * @param {Object} param 选中行数据
     */
    detail(param) {
      this.rebackVal(param)
      this.dialogChange(true)
      this.dialog.btn = 'detail'
      this.endisableForm(true)
      this.dialog.formData = { ...this.dialog.formData, ...this.tableRow }
      this.dialog.title = '规则配置'
    },
    /**
     * 新增按钮
     */
    handleAdd() {
      this.dialogChange(true)
      this.dialog.btn = 'add'
      this.endisableForm(false)
      this.dialog.title = '新增年检规则配置'
    },
    /**
     * 修改按钮
     */
    handleModify() {
      if (commonBlank(this.tableRow)) {
        commonMsgWarn('请选择修改的数据', this)
        return
      }
      this.rebackVal(this.tableRow)
      this.dialogChange(true)
      this.dialog.btn = 'modify'
      this.endisableForm(false)
      this.dialog.formData = { ...this.dialog.formData, ...this.tableRow }
      this.dialog.title = '修改年检规则配置'
    },
    /**
     * 删除按钮
     */
    handleDelete() {
      if (commonBlank(this.tableRow)) {
        commonMsgWarn('请选择删除的数据', this)
        return
      }
    },
    /**
     * 修改回显输入输出配置值
     * @param {Object} param // 选中行数据
     */
    rebackVal(param) {
      Object.assign(this.dialog, {
        enterObj: {},
        enterNum: 0,
        outPutObj: {},
        outPutNum: 0
      })
      const enterArr = param.rule_param.match(/\((.+?)\)/g) // 输入配置值
      const output = param.rule_param.match(/@(\S*)/)[1].replace('#head#', '') // 输出配置值
      const outputArr = output.split('##')
      outputArr.pop()

      let arr = []
      // 设置输入配置值(对象数组)
      for (const item of enterArr) {
        const arr2 = item.split('##')
        arr = [...arr, ...arr2]
      }
      const { enterObj, outPutObj } = this.dialog
      for (const [key, val] of arr.entries()) {
        const { enterNum } = this.dialog
        if (key % 5 === 0) {
          enterObj['leftBrak' + enterNum] = val
        } else if (key % 5 === 1) {
          enterObj['typeData' + enterNum] = val
        } else if (key % 5 === 2) {
          enterObj['condition' + enterNum] = val
        } else if (key % 5 === 3) {
          enterObj['values' + enterNum] = val
        } else {
          enterObj['rightBrak' + enterNum] = val
        }
        if (key % 5 === 4) {
          this.dialog.enterNum++
        }
      }
      // 设置输出配置值(对象数组)
      for (const [key, val] of outputArr.entries()) {
        const { outPutNum } = this.dialog
        if (key % 3 === 0) {
          outPutObj['typeData' + outPutNum] = val
        } else if (key % 3 === 1) {
          outPutObj['condition' + outPutNum] = val
        } else {
          outPutObj['values' + outPutNum] = val
        }
        if (key % 3 === 2) {
          this.dialog.outPutNum++
        }
      }
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
    dialogSubmit() {},
    /**
     * 弹框打开关闭
     * @param {Boolean}param 关闭/打开
     */
    dialogChange(param) {
      this.dialog.visible = param
    },
    /**
     * 禁用/启用form表单
     * @param {Boolean}param 禁用/启用
     */
    endisableForm(param) {
      this.dialog.config.organ_no.componentProps.disabled = param
      this.dialog.config.is_open.componentProps.disabled = param
      this.dialog.config.prio_level.componentProps.disabled = param
      this.dialog.config.rule_desc.componentProps.disabled = param
    },
    /**
     * 选中行
     * @param {Object}val 选中行数据
     */
    currentChange(val) {
      this.tableRow = val
    },
    /**
     * 页码更新
     * @param {Object}pageParam 页码数据
     */
    getList(pageParam) {
      // const { currentPage, pageSize } = pageParam
      // this.tableData.pageList.pageSize = pageSize
      // this.tableData.pageList.page = currentPage
      // this.queryList()
    },
    /*
     ** 查询数据
     */
    queryList() {
      const msg = {
        parameterList: [
          {
            is_open: '',
            organ_no: '',
            rule_no: '',
            rule_desc: '',
            rule_type: ''
          }
        ],
        oper_type: 'OP004',
        currentPage: 1,
        pageSize: 15,
        organ_no: '#01121'
      }
      ruleQuery(msg).then((res) => {
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
