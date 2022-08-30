<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :btn-add="buttonObj.btnAdd && $attrs['btn-all'].btnAdd"
        :btn-modify="buttonObj.btnMod && $attrs['btn-all'].btnModify"
        :btn-delete="buttonObj.btnDel && $attrs['btn-all'].btnDelete"
        @handleAdd="handleAdd"
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
      :index-number="false"
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
          align="center"
        >
          <div slot-scope="{ row }">
            <span>{{
              row[item.name] | moduleFilters(item.name, tableColumn)
            }}</span>
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
    />
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm
} from '@/utils/message.js' // 提示信息
import { SunButton, SunTable, SunFormDialog } from '@/components'
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { organNameFormat } from '@/filters'
import store from '@/store'
import { RepSys } from '@/api'
const { query, del, add, update } = RepSys
export default {
  name: 'TableList',
  components: { SunButton, SunTable, SunFormDialog },
  filters: {
    moduleFilters: (data, name, tableColumn) => {
      for (let i = 0; i < tableColumn.length; i++) {
        if (name === 'organ_no') {
          return organNameFormat(data)
        } else if (
          tableColumn[i].name === name &&
          tableColumn[i].data_sources !== ''
        ) {
          let valueS = ''
          let arr = []
          if (tableColumn[i].sources_type === '5') {
            arr = store.getters.externalData[tableColumn[i].data_sources]
          } else {
            const fieldStr =
              store.getters.dictionaryLet[tableColumn[i].data_sources]
            const fieldArr = fieldStr.split('&').sort()
            for (const key of fieldArr) {
              const keyarr = key.split('#-#')
              arr = [
                ...arr,
                { id: keyarr[0], label: keyarr[2], value: keyarr[1] }
              ]
            }
          }
          arr.map(function(item) {
            if (item.value === data) {
              valueS = item.label
            }
          })
          return valueS
        }
      }
      return data
    }
  },
  props: {
    defaultForm: {
      type: Object,
      default: function() {
        return {}
      }
    },
    tableColumn: {
      type: Array,
      default: function() {
        return {}
      }
    },
    buttonObj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    eles: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      listLoading: false,
      tableData: [],
      currentRow: [], // 选中行
      pageList: {
        totalNum: 0,
        currentPage: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      },
      dialog: {
        title: '',
        oprate: '',
        width: '60rem',
        labelWidth: '15rem',
        visible: false,
        formData: {},
        config: {}
      },
      variable: {
        fileSep: ',&,', // 字段间分隔符
        dataSep: ',-,', // 数据分隔符
        flagSep: ',@,' // 数据和是否模糊查询(或是否后台自动生成)标识间分隔符
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      const currentRow = val
      if (currentRow.length > 1) {
        currentRow.sort(function(a, b) {
          return a.index - b.index
        }) // 选中行排序
      }
      this.currentRow = val
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
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      const dataString1 = this.getDataString(
        this.eles.queryBarList,
        this.defaultForm
      )
      const msg = {
        parameterList: [{ dataString: dataString1 }],
        procedure_name: this.eles.procedure_name,
        oper_type: dictionaryGet('OPERATE_QUERY'),
        table_name: this.eles.table_name,
        currentPage: currentPage,
        cmModular_pageNum: this.pageList.pageSize,
        dialogList: this.eles.dialogList,
        pkList: this.eles.pkList,
        columnInfoList: this.eles.columnInfoList,
        add_way: this.eles.add_way
      }
      query(msg)
        .then((response) => {
          const { list, totalNum, currentPage } = response.retMap
          this.tableData = list
          this.pageList.totalNum = totalNum
          this.pageList.currentPage = currentPage
          this.showLoading()
        })
        .catch(() => {
          this.showLoading()
        })
    },
    /**
     * btn - 新增*/
    handleAdd() {
      this.dialog = Object.assign({}, this.dialog, {
        title: '新增',
        oprate: 'add'
      })
      this.initDiglog()
      this.changeVisible(true)
    },
    /**
     * btn - 修改*/
    handleModify() {
      const rows = this.currentRow.length
      if (rows === 0) {
        commonMsgWarn('请选择要修改的行', this)
        return
      } else if (rows > 1) {
        commonMsgWarn('只支持单条数据修改，请正确选择一条数据', this)
        return
      }
      this.dialog = Object.assign({}, this.dialog, {
        title: '修改',
        oprate: 'edit'
      })
      this.initDiglog()
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
          let dataString1 = "('"
          for (let i = 0; i < rows.length; i++) {
            const custom_no = rows[i].custom_no
            dataString1 += custom_no + "','"
          }
          dataString1 = dataString1.substring(0, dataString1.length - 2) + ')'
          const msg = {
            parameterList: [],
            oper_type: dictionaryGet('OPERATE_DELETE'),
            operation_value: {
              parameterList: [{ dataString: dataString1 }],
              sysMap: {
                oper_type: dictionaryGet('OPERATE_DELETE'),
                table_name: this.eles.table_name,
                moduleName: this.eles.moduleName,
                arr: JSON.stringify(rows),
                add_way: this.eles.add_way,
                pkList: this.eles.pkList,
                columnInfoList: this.eles.columnInfoList,
                columns: this.eles.columns,
                queryList: this.eles.queryBarList,
                procedure_name: this.eles.procedure_name
              }
            }
          }
          del(msg)
            .then((response) => {
              commonMsgSuccess(response.retMsg, this)
              this.queryList(1)
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
    },
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
     * 弹出框 - 新增确认*/
    dialogAddSubmit() {
      this.showLoading()
      const dataString1 = this.getDataString(
        this.eles.dialogList,
        this.dialog.formData
      )
      const msg = {
        parameterList: [{ dataString: dataString1 }],
        oper_type: dictionaryGet('OPERATE_ADD'),
        operation_value: {
          mainDataMap: {
            parameterList: [{ dataString: dataString1 }],
            sysMap: {
              oper_type: dictionaryGet('OPERATE_ADD'),
              table_name: this.eles.table_name,
              currentPage: this.pageList.currentPage,
              moduleName: this.eles.moduleName,
              add_way: this.eles.add_way,
              pkList: this.eles.pkList,
              pkValue: [],
              columnInfoList: this.eles.columnInfoList,
              columns: this.eles.columns,
              queryList: this.eles.queryBarList,
              procedure_name: this.eles.procedure_name
            }
          }
        }
      }
      add(msg)
        .then((response) => {
          commonMsgSuccess(response.retMsg, this)
          this.showLoading()
          this.queryList(1)
        })
        .catch(() => {
          this.showLoading()
        })
      this.changeVisible(false)
    },
    /**
     * 弹出框 - 修改确认*/
    dialogEditSubmit() {
      this.showLoading()
      const pkValue = []
      const arr = this.currentRow[0]
      if (this.eles.add_way === '2') {
        for (var i = 0; i < this.eles.pkList.length; i++) {
          var x = this.eles.pkList[i]
          pkValue.push(arr[x])
        }
      }
      const dataString1 = this.getDataString(
        this.eles.dialogList,
        this.dialog.formData
      )
      const msg = {
        parameterList: [{ dataString: dataString1 }],
        oper_type: dictionaryGet('OPERATE_MODIFY'),
        operation_value: {
          mainDataMap: {
            parameterList: [{ dataString: dataString1 }],
            sysMap: {
              oper_type: dictionaryGet('OPERATE_MODIFY'),
              table_name: this.eles.table_name,
              currentPage: this.pageList.currentPage,
              moduleName: this.eles.moduleName,
              add_way: this.eles.add_way,
              pkList: this.eles.pkList,
              pkValue: pkValue,
              columnInfoList: this.eles.columnInfoList,
              columns: this.eles.columns,
              queryList: this.eles.queryBarList,
              procedure_name: this.eles.procedure_name
            }
          }
        }
      }
      update(msg)
        .then((response) => {
          commonMsgSuccess(response.retMsg, this)
          this.showLoading()
          this.queryList(1)
        })
        .catch(() => {
          this.showLoading()
        })
      this.changeVisible(false)
    },
    /**
     * 弹出框 - 初始化*/
    initDiglog() {
      const form = {}
      const formData = {}
      for (let i = 0; i < this.eles.dialogList.length; i++) {
        const data = this.eles.dialogList[i]
        const formEle = this.cmModular_initFormEle(data)
        form[data.elem_english] = formEle
        formData[data.elem_english] = ''
      }
      this.dialog.config = Object.assign({}, form)
      this.dialog.formData = Object.assign({}, formData)
    },
    /**
     * 构建表单内容*/
    cmModular_initFormEle(data) {
      const formEle = {
        component: '',
        label: data.elem_chinese,
        colSpan: 24,
        name: data.elem_english,
        config: {
          rules: []
        },
        componentProps: {
          clearable: true,
          disabled: false
        },
        options: []
      }
      if (data.show_type === '1') {
        // 文本框
        formEle.component = 'input'
        formEle.config.rules.push({
          min: 0,
          max: data.elem_length,
          message: '最多' + data.elem_length + '个字符',
          trigger: 'blur'
        })
        if (data.is_required === '1') {
          formEle.config.rules.push({
            required: true,
            message: data.elem_chinese + '为必输',
            trigger: 'blur'
          })
        }
        if (data.is_modify === '0' && this.dialog.oprate === 'edit') {
          formEle.componentProps.disable = true
        }
      } else if (data.show_type === '3') {
        // 下拉框
        formEle.component = 'select'
        if (data.sources_type === '5') {
          formEle.options = this.$store.getters.externalData[data.data_sources]
        } else {
          formEle.options = this.$parent.dictionaryArr(
            this.$store.state.common.dictionaryLet[data.data_sources]
          )
        }
        if (data.is_required === '1') {
          formEle.config.rules.push({
            required: true,
            message: data.elem_chinese + '为必输',
            trigger: 'blur'
          })
        }
        if (data.is_modify === '0' && this.dialog.oprate === 'edit') {
          formEle.componentProps.disable = true
        }
      } else if (data.show_type === '4') {
        // 下拉树
        formEle.component = 'select-tree'
        formEle.options = this.$store.getters.organTree
        if (data.is_required === '1') {
          formEle.config.rules.push({
            required: true,
            message: data.elem_chinese + '为必输',
            trigger: 'blur'
          })
        }

        if (data.is_modify === '0' && this.dialog.oprate === 'edit') {
          formEle.componentProps.disabled = true
        }
      }
      return formEle
    },
    /**
     * 拼装查询条件*/
    getDataString(arr, formData) {
      let dataString = ''
      const dataSep = this.variable.dataSep
      const flagSep = this.variable.flagSep
      const fileSep = this.variable.fileSep
      // 拼装查询条件
      for (let i = 0; i < arr.length; i++) {
        const data = arr[i]
        dataString += data.show_type + data.elem_english + dataSep
        dataString += formData[data.elem_english] + flagSep
        if (data.is_fuzzyquery && data.is_fuzzyquery !== '0') {
          dataString += data.is_fuzzyquery + fileSep
        } else {
          dataString += '0' + fileSep
        }
      }
      return dataString
    }
  }
}
</script>
<style lang="scss" scoped></style>
