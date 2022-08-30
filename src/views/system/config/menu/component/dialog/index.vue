<!--按钮配置-->
<template>
  <div>
    <sun-table-dialog
      :title="title"
      :visible="visible"
      :table-column="tableColumn"
      :table-data="tableData"
      :btn-submit="btnSubmit"
      :list-loading="loadingTable"
      @dialogClose="dialogClose"
      @dialogSubmit="dialogSubmit"
      @currentChange="currentChange"
    >
      <template v-if="btnVisible" slot="leftBtn" style="width: 100px">
        <sun-button
          :btn-add="true"
          :btn-modify="true"
          :btn-delete="true"
          :button-style="buttonStyle"
          @handleAdd="handleAdd"
          @handleModify="handleModify"
          @handleDelete="handleDelete"
        />
      </template> </sun-table-dialog><!--页面按钮配置-->
    <sun-form-dialog
      :title="dialog.title"
      :visible="dialog.visible"
      :form-config="dialog.config"
      :form-data="dialog.formData"
      :label-width="dialog.labelWidth"
      @dialogClose="changeVisible"
      @dialogSubmit="dialogSubmitDialog"
    /><!--新增、修改弹出框-->
  </div>
</template>

<script>
import { SunTableDialog, SunFormDialog, SunButton } from '@/components'
import { commonMsgWarn, commonMsgConfirm } from '@/utils/message' // 提示信息
import { commonBlank } from '@/utils/common' // 提示信息
import { configTable, config } from './info' // 表单
import { SysMenu } from '@/api'

const { btnQuery } = SysMenu

export default {
  name: 'TableDialogComp',
  components: {
    SunTableDialog,
    SunFormDialog,
    SunButton
  },
  data() {
    return {
      title: '按钮配置',
      visible: false, // 表格弹出框展示
      tableColumn: configTable(this), // 表头
      loadingTable: false, // 加载
      tableData: [], // 表格数据
      tableDataOld: [], // 表格旧数据保存
      tableDataNew: [], // 表格最新数据保存
      currentData: {}, // 当前选中行
      buttonStyle: {
        width: '200px',
        float: 'left'
      },
      dialog: {
        title: '按钮选择',
        // width: '60rem',
        labelWidth: '12rem',
        visible: false,
        oprate: 'add',
        formData: {
          btn_sys: ''
        },
        config: config(this)
      },
      listAdd: {}, // 新增行
      btnVisible: false, // 查看
      btnSubmit: true, // 确认按钮
      operator: 'add' // 新增 add, 修改 modify
    }
  },
  created() {
    this.permissionsBtn.$on('busEvent', (res) => {
      if (res === 'add') {
        this.tableData = []
      }
    })
  },
  methods: {
    /**
     * 弹出框: 关闭*/
    dialogClose() {
      this.tableData = JSON.parse(JSON.stringify(this.tableDataNew)) // 取消则还原数据
      this.visible = false
    },
    /**
     * 弹出框: 确定*/
    dialogSubmit() {
      this.$emit('handleDtnData', this.tableData, this.tableDataOld) // 配置按钮权限
      this.visible = false
    },
    /**
     * 弹出框: 单击行，获取按钮权限
     * @param 当前选中节点*/
    currentNodeBtn(data) {
      if (!data) {
        return
      }
      // 查询按钮权限
      const msg = {
        parameterList: [
          {
            menuId: data.menu_id
          }
        ],
        oper_type: 'QUERYBUTTON'
      }
      btnQuery(msg)
        .then((response) => {
          const { butlist } = response.retMap
          // commonMsgSuccess(retMsg, this)
          this.tableData = butlist
          this.tableDataOld = JSON.parse(JSON.stringify(butlist))
          // this.loadingTable = false
        })
        .catch(() => {
          // this.loadingTable = false
        })
    },
    /**
     * 弹出框: 打开*/
    dalogOpen(param) {
      this.tableDataNew = JSON.parse(JSON.stringify(this.tableData))
      if (param === 'check') {
        // 查看
        this.btnVisible = false
        this.btnSubmit = false
      } else {
        this.btnVisible = true
        this.btnSubmit = true
      }
      this.visible = true
    },
    /**
     * 弹出框: 选中行*/
    currentChange(val) {
      this.currentData = val
    },
    /* 表单弹出框：新增*/
    handleAdd() {
      this.operator = 'add'
      this.dialog.visible = true // 打开弹出框
    },
    /* 表单弹出框：修改*/
    handleModify() {
      if (commonBlank(this.currentData)) {
        commonMsgWarn('请选择要修改的行', this)
        return
      }
      this.operator = 'modify'
      this.dialog.visible = true // 打开弹出框
      this.$nextTick(() => {
        // 弹出框加载完成后赋值
        this.dialog.formData = Object.assign(
          {},
          {
            btn_sys: this.currentData.buttonId
          }
        )
      })
    },
    /* 表单弹出框：删除*/
    handleDelete() {
      if (commonBlank(this.currentData)) {
        commonMsgWarn('请选择要删除的行', this)
        return
      }
      commonMsgConfirm('是否确认删除当前选中行？', this, (param) => {
        if (param) {
          this.showLoading()
          this.tableData.splice(this.currentData.index, 1)
          this.showLoading()
          this.changeVisible()
        }
      })
    },
    /* 表单弹出框：关闭*/
    changeVisible() {
      this.dialog.visible = false
    },
    /* 表单弹出框：确定*/
    dialogSubmitDialog() {
      const { value, label } = this.listAdd
      // 判断当前按钮是否已设置 begin
      for (const key of this.tableData) {
        if (key.buttonId === value) {
          commonMsgWarn('当前按钮已配置，请重新选择！', this)
          return
        }
      }
      // 判断当前按钮是否已设置 end
      const param = {
        buttonId: value,
        buttonName: label
      }
      this.showLoading()
      if (this.operator === 'add') {
        this.tableData.unshift(param)
        this.showLoading()
        this.changeVisible()
      } else {
        const index = this.currentData.index
        this.tableData.splice(index, 1, param)
        this.showLoading()
        this.changeVisible()
      }
    },
    /* 加载中 */
    showLoading() {
      this.loadingTable = !this.loadingTable
    }
  }
}
</script>

<style lang="scss" scoped></style>
