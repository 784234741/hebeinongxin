<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :btn-modify="$attrs['btn-all'].btnModify"
        @handleModify="handleModify"
        @handleDelete="handleDelete"
      />
    </div>
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      :selection="true"
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
        >
          <div slot-scope="{ row }">
            <span
              v-if="item.name === 'organ_no' || item.name === 'parent_organ' || item.name === 'organ_report'"
            >{{ row[item.name] | organNameFormat }}</span>
            <span v-else-if="item.name === 'report_way'">{{
              row[item.name] | reportWay
            }}</span>
            <span v-else-if="item.name === 'per_report'">{{
              row[item.name] | perReport
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
    /><!--新增、修改弹出框-->
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm
} from '@/utils/message.js' // 提示信息
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { dateNowFormat } from '@/utils/date.js' // 日期格式化

import { config, configTable } from './info' // 表头、表单配置
import { SunButton, SunTable, SunFormDialog } from '@/components' // 按钮

import { SysOrgan } from '@/api'
const { organInfo } = SysOrgan
export default {
  name: 'TableList',
  components: { SunFormDialog, SunButton, SunTable },
  props: {
    defaultForm: {
      type: Object,
      default: function() {
        return {}
      }
    },
    rolelist: {
      type: Array,
      default: function() {
        return []
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
        page: 1, // 当前页
        pageSize: 20 // 当前页显示条数
      },
      currentIndex: 0, // 当前行索引
      dialog: {
        title: '新增',
        width: '90rem',
        labelWidth: '13rem',
        visible: false,
        oprate: 'add',
        formData: {
          bank_code: '',
          organ_no: '',
          per_report: '',
          report_way: '1',
          organ_report: ''
        },
        config: config(this)
      }
    }
  },
  created() {
    this.dialog.config.organ_report.options = this.$store.getters.organTree
  },
  methods: {
    // 表格选择多行
    handleSelectionChange(val) {
      const currentRow = val
      if (currentRow.length > 1) {
        currentRow.sort(function(a, b) {
          return a.rn - b.rn
        }) // 选中行排序
      }
      this.currentRow = val
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      // 查询条件集合
      const msg = {
        parameterList: [],
        oper_type: 'selectOrganRInfo',
        ...this.defaultForm,
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize,
        organ_no: this.defaultForm.organ_no || `#${this.$store.getters.organNo}`
      }
      // query
      organInfo(msg).then((response) => {
        const { organs, allRow } = response.retMap
        this.tableData = organs
        this.pageList.totalNum = allRow
        this.showLoading()
      })
    },
    /**
     * btn - 编辑*/
    handleModify() {
      const rows = this.currentRow.length
      this.dialog.config.organ_no.componentProps.disabled = true
      if (rows === 0) {
        commonMsgWarn('请选择要修改的行', this)
        return
      }
      if (rows > 1) {
        commonMsgWarn('只能选择一行', this)
        return
      }
      this.dialog = Object.assign({}, this.dialog, {
        title: '编辑',
        oprate: 'edit'
      })
      this.changeVisible(true)
      this.$nextTick(() => {
        // 弹出框加载完成后赋值
        this.dialog.formData = Object.assign({}, this.currentRow[0])
      })
    },
    /**
     * btn - 删除*/
    handleDelete() {
      const rows = this.currentRow
      if (rows.length === 0) {
        commonMsgWarn('请选择要删除的行', this)
        return
      }
      commonMsgConfirm('是否确认删除当前选中用户信息？', this, (param) => {
        if (param) {
          const msg = {
            parameterList: [{}],
            oper_type: dictionaryGet('OPERATE_DELETE')
          }
          // del
          organInfo(msg)
            .then((response) => {
              this.tableData.splice(this.currentRow[0].rn - 1, rows.length)
              commonMsgSuccess(response.retMsg, this)
            })
            .catch(() => {})
        }
      })
    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    }, // handleAdd
    /**
     * 弹出框 - 确认*/
    dialogSumbit() {
      const param = this.dialog.oprate
      if (param === 'add') {
        this.dialogAddSubmit()
      } else {
        this.dialogEditSubmit()
      }
    },
    /**
     * 弹出框 - 确认 - 新增*/
    dialogAddSubmit() {},
    /**
     * 弹出框 - 确认 - 编辑*/
    dialogEditSubmit() {
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
        if (param) {
          this.showLoading()
          const formData1 = Object.assign({}, this.dialog.formData)
          const msg = {
            parameterList: [
              {
                organ_no: formData1.organ_no,
                organ_report: formData1.organ_report,
                report_way: formData1.report_way,
                bank_code: formData1.bank_code,
                per_report: formData1.per_report
              }
            ],
            oper_type: 'updateOrganRInfo'
          }
          // update
          organInfo(msg)
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
    }
  }
}
</script>
<style lang="scss" scoped></style>
