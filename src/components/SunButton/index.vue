<template>
  <el-row :style="buttonStyle">
    <el-button
      v-if="btnQuery"
      v-waves
      class="filter-item"
      type="primary"
      :disabled="btnQueryDisabled"
      @click="handleClick('handleQuery')"
    >
      查询
    </el-button>
    <el-button
      v-if="btnAdd"
      v-waves
      class="filter-item"
      type="primary"
      :disabled="btnAddDisabled"
      @click="handleAdd"
    >
      新增
    </el-button>
    <el-button
      v-if="btnModify"
      v-waves
      class="filter-item"
      type="success"
      :disabled="btnModifyDisabled"
      @click="handleModify"
    >
      修改
    </el-button>
    <el-button
      v-if="btnDelete"
      v-waves
      class="filter-item"
      type="danger"
      :disabled="btnDeleteDisabled"
      @click="handleDelete"
    >
      删除
    </el-button>

    <el-button
      v-if="btnLoginOut"
      v-waves
      class="filter-item"
      type="danger"
      @click="handleLoginOut"
    >
      强制登出
    </el-button>
    <el-button
      v-if="btnBatch"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleBatch"
    >
      批量配置
    </el-button>
    <el-button
      v-if="btnResetPsd"
      v-waves
      class="filter-item"
      type="warning"
      :disabled="btnResetPsdDisabled"
      @click="handleResetPsd"
    >
      重置密码
    </el-button>
    <el-button
      v-if="btnEnableDisable"
      v-waves
      class="filter-item"
      type="danger"
      @click="handleEnableDisable"
    >
      启用/停用
    </el-button>
    <el-button
      v-if="btnCheckBtn"
      v-waves
      class="filter-item"
      type="primary"
      :disabled="btnCheckBtnDisabled"
      @click="handleClick('handleCheckBtn')"
    >
      查看页面按钮
    </el-button>
    <el-button
      v-if="btnOperatorBtn"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleClick('handleOperatorBtn')"
    >
      编辑页面按钮
    </el-button>
    <el-button
      v-if="btnReportAdd"
      v-waves
      class="filter-item"
      type="primary"
      :disabled="btnAddDisabled"
      @click="handleClick('handleReportAdd')"
    >
      报备新增
    </el-button>
    <el-button
      v-if="btnSave"
      v-waves
      class="filter-item"
      type="primary"
      :disabled="btnSaveDisabled"
      @click="handleClick('handleSave')"
    >
      保存
    </el-button>
    <el-button
      v-if="btnCancle"
      v-waves
      class="filter-item"
      type="danger"
      :disabled="btnSaveDisabled"
      @click="handleClick('handleCancle')"
    >
      取消
    </el-button>
    <el-button
      v-if="btnPrev"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleClick('handlePrev')"
    >
      上一步
    </el-button>
    <el-button
      v-if="btnNext"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleClick('handleNext')"
    >
      下一步
    </el-button>
    <el-button
      v-if="btnPrint"
      v-waves
      lass="filter-item"
      type="primary"
      @click="handlePrint"
    >
      打印
    </el-button>
    <el-button
      v-if="btnReset"
      v-waves
      class="filter-item"
      type="warning"
      @click="handleReset"
    >
      重置
    </el-button>
    <el-button
      v-if="btnImport"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleImport"
    >
      导入
    </el-button>
    <el-dropdown v-if="btnExportAll" trigger="click" style="margin: 0 10px">
      <el-button class="filter-item" type="primary">导出</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <span @click="handleExport('handleExport', 'all')">全部数据</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="handleExport('handleExport', 'page')">当前页数据</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-button
      v-if="btnExport"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleClick('handleExport')"
    >
      导出
    </el-button>
    <el-button
      v-if="btnHandreport"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleHandreport"
    >
      手动报备
    </el-button>
    <el-button
      v-if="btnDownload"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleDownload"
    >
      下载
    </el-button>
    <el-button
      v-if="btnWatchpsd"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleWatchpsd"
    >
      查看密码
    </el-button>
    <el-button
      v-if="editAccType"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleClick('editAccType')"
    >
      修改账户类型
    </el-button>
    <el-button
      v-if="btnReport"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleReport"
    >
      线下报备
    </el-button>
    <el-button
      v-if="btnHanging"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleHanging"
    >
      久悬上报
    </el-button>
    <el-button
      v-if="btnEmpty"
      v-waves
      class="filter-item"
      type="warning"
      :disabled="btnEmptyDisabled"
      @click="handleClick('handleEmpty')"
    >
      清空
    </el-button>
    <el-button
      v-if="btnChangeState"
      v-waves
      class="filter-item"
      type="primary"
      :disabled="btnAddDisabled"
      @click="handleClick('handleChangeState')"
    >
      核实
    </el-button>

    <el-button
      v-if="btnSubmit"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleClick('handleSubmit')"
    >
      提交
    </el-button>

    <el-button
      v-if="btnPrintBasicAccount"
      v-waves
      class="filter-item"
      type="primary"
      :disabled="btnAddDisabled"
      @click="handleClick('handlePrintBasicAccount')"
    >
      打印基本存款账户信息
    </el-button>
    <el-button
      v-if="btnPrintPassword"
      v-waves
      class="filter-item"
      type="primary"
      :disabled="btnAddDisabled"
      @click="handleClick('handlePrintPassword')"
    >
      打印基本存款人密码
    </el-button>
    <el-button
      v-if="btnRelieve"
      v-waves
      class="filter-item"
      type="primary"
      :disabled="btnAddDisabled"
      @click="handleClick('handleRelieve')"
    >
      解除
    </el-button>
    <el-button
      v-if="btnCheckOut"
      v-waves
      class="filter-item"
      type="primary"
      :disabled="btnAddDisabled"
      @click="handleClick('handleCheckOut')"
    >
      复核
    </el-button>
    <el-button
      v-if="btnSynchro"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleClick('handleSynchro')"
    >
      同步
    </el-button>
    <el-button
      v-if="btnHandCheck"
      v-waves
      class="filter-item"
      type="primary"
      @click="handleCheck"
    >
      手工年检
    </el-button>
  </el-row>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils/common.js'
export default {
  name: 'SunButton',
  directives: { waves },
  props: {
    buttonStyle: {
      type: Object,
      default: function() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    btnQuery: {
      type: Boolean,
      default: false
    },
    btnQueryDisabled: {
      type: Boolean,
      default: false
    },
    btnAdd: {
      type: Boolean,
      default: false
    },
    btnAddDisabled: {
      type: Boolean,
      default: false
    },
    btnModify: {
      type: Boolean,
      default: false
    },
    btnModifyDisabled: {
      type: Boolean,
      default: false
    },
    btnDelete: {
      type: Boolean,
      default: false
    },
    btnDeleteDisabled: {
      type: Boolean,
      default: false
    },
    btnLoginOut: {
      type: Boolean,
      default: false
    },
    btnBatch: {
      type: Boolean,
      default: false
    },
    btnResetPsd: {
      type: Boolean,
      default: false
    },
    btnResetPsdDisabled: {
      type: Boolean,
      default: false
    },
    btnEnableDisable: {
      type: Boolean,
      default: false
    },
    btnSave: {
      type: Boolean,
      default: false
    },
    btnCancle: {
      type: Boolean,
      default: false
    },
    btnExport: {
      type: Boolean,
      default: false
    },
    btnExportAll: {
      type: Boolean,
      default: false
    },
    btnPrint: {
      type: Boolean,
      default: false
    },
    btnSaveDisabled: {
      type: Boolean,
      default: false
    },
    btnCheckBtn: {
      type: Boolean,
      default: false
    },
    btnCheckBtnDisabled: {
      type: Boolean,
      default: false
    },
    btnOperatorBtn: {
      type: Boolean,
      default: false
    },
    btnPrev: {
      type: Boolean,
      default: false
    },
    btnNext: {
      type: Boolean,
      default: false
    },
    btnReset: {
      type: Boolean,
      default: false
    },
    btnImport: {
      type: Boolean,
      default: false
    },
    btnWatchpsd: {
      type: Boolean,
      default: false
    },
    btnHandreport: {
      type: Boolean,
      default: false
    },
    btnDownload: {
      type: Boolean,
      default: false
    },
    editAccType: {
      type: Boolean,
      default: false
    },
    btnEmpty: {
      type: Boolean,
      default: false
    },
    btnEmptyDisabled: {
      type: Boolean,
      default: false
    },
    btnChangeState: {
      type: Boolean,
      default: false
    },
    btnSubmit: {
      type: Boolean,
      default: false
    },
    btnReport: {
      type: Boolean,
      default: false
    },
    btnHanging: {
      type: Boolean,
      default: false
    },
    btnReportAdd: {
      type: Boolean,
      default: false
    },
    btnPrintBasicAccount: {
      type: Boolean,
      default: false
    },
    btnPrintPassword: {
      type: Boolean,
      default: false
    },
    btnRelieve: {
      type: Boolean,
      default: false
    },
    btnCheckOut: {
      type: Boolean,
      default: false
    },
    btnSynchro: {
      type: Boolean,
      default: false
    },
    btnHandCheck: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ExportLoading: false
    }
  },
  methods: {
    // 新增
    handleAdd() {
      this.$emit('handleAdd')
    },
    // 修改
    handleModify() {
      this.$emit('handleModify')
    },
    // 删除
    handleDelete() {
      this.$emit('handleDelete')
    },
    // 强制登出
    handleLoginOut() {
      this.$emit('handleLoginOut')
    },
    // 批量配置
    handleBatch() {
      this.$emit('handleBatch')
    },
    // 重置密码
    handleResetPsd() {
      this.$emit('handleResetPsd')
    },
    // 保存
    handleSave() {
      this.$emit('handleSave')
    },
    // 取消
    handleCancle() {
      this.$emit('handleCancle')
    },
    // 启动/停用
    handleEnableDisable() {
      this.$emit('handleEnableDisable')
    },
    // 打印
    handlePrint() {
      this.$emit('handelPrint')
    },
    // 公共方法
    handleClick(param) {
      this.$emit(param)
    },
    // 导出
    handleExport(param, arg) {
      this.$emit(param, arg)
    },
    // 重置
    handleReset() {
      this.$emit('handleReset')
    },
    // 提交
    handleSubmit() {
      this.$emit('handleSubmit')
    },
    // 导入
    handleImport() {
      this.$emit('handleImport')
    },
    // 手动报备
    handleHandreport() {
      this.$emit('handleHandreport')
    },
    // 下载
    handleDownload() {
      this.$emit('handleDownload')
    },
    // 查看密码
    handleWatchpsd() {
      this.$emit('handleWatchpsd')
    },
    // 线下报备
    handleReport() {
      this.$emit('handleReport')
    },
    // 解除
    handleRelieve() {
      this.$emit('handleRelieve')
    },
    // 复核
    handleCheckOut() {
      this.$emit('handleCheckOut')
    },
    // 久悬上报
    handleHanging() {
      this.$emit('handleHanging')
    },
    // 手工年检
    handleCheck() {
      this.$emit('handleCheck')
    },
    /**
     * 导出组件方法
     * @param {String} header 表头配置
     * @param {String} tableData 表数据
     * @param {String} fileName excel表名*/
    componentExport(header, tableData, fileName = 'table-list') {
      this.ExportLoading = true
      import('@/components/Vendor/Export2Excel').then((excel) => {
        const tHeader = header
        const filterVal = header
        let data = ''
        tableData.map((v) =>
          filterVal.map((j) => {
            if (j === 'timestamp') {
              data = parseTime(v[j])
            } else {
              data = v[j]
            }
          })
        )
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: fileName
        })
        this.ExportLoading = false
      })
    }
  }
}
</script>
<style scoped></style>
