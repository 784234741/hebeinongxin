<template>
  <div>
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
    <sun-table
      table-ref="tableRef"
      :component="tableHeight"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      :index-number="true"
      @current-change="handleCurrentChange"
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
          <div slot-scope="{row}">
            <span v-if="item.name === 'last_modi_date'">{{ row[item.name] | dateTimeFormat }}</span>
            <span v-else-if="item.name === 'role_mode'">{{ row[item.name] | roleType }}</span>
            <span v-else-if="item.name === 'role_level'">{{ row.role_level.substring(1) }}</span>
            <span v-else-if="item.name === 'role_organ_level'">{{ row.role_level.substring(0, 1) | organLevel }}</span>
            <span v-else-if="item.name === 'is_open'">{{ row.is_open | startSign }}</span>
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
import { commonMsgSuccess, commonMsgWarn, commonMsgConfirm } from '@/utils/message.js' // 提示信息
import { commonBlank } from '@/utils/common' // 提示信息
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { dateNowFormat } from '@/utils/date.js' // 日期格式化

import { config, configTable } from './info' // 表头、表单配置
import { SunButton, SunFormDialog, SunTable } from '@/components' // 按钮

import { SysRole } from '@/api'
const { query, add, update, del } = SysRole
export default {
  name: 'TableList',
  components: { SunFormDialog, SunButton, SunTable },
  filters: {
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
      btnArr: {
        btnAdd: true,
        btnModify: true,
        btnDelete: true
      },
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      tableHeight: {
        height: '300px'
      }, // 表格高度
      currentRow: [], // 选中行
      pageList: {
        totalNum: 0,
        currentPage: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      },
      downloadLoading: false,
      currentIndex: 0, // 当前行索引
      dialog: {
        title: '新增',
        width: '50rem',
        labelWidth: '12rem',
        visible: false,
        oprate: 'add',
        formData: {
          organ_level: '',
          role_level: '',
          role_no: '',
          role_name: '',
          role_mode: '',
          is_open: '',
          role_des: ''
        },
        config: config(this)
      },
      screenHeight: document.body.clientHeight
    }
  },
  watch: {
    loading(value) {
      this.listLoading = this.loading
    },
    screenHeight(val) {
      this.screenHeight = val
      this.tableHeight.height = this.screenHeight - 470
    }
  },
  beforeCreate: function() {
  },
  created() {
    this.listLoading = this.loading
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    /**
     * 页面尺寸配置*/
    resizeHandler() {
      const screenWidth = document.body.clientHeight
      this.screenHeight = screenWidth
    },
    // 表格选择行
    handleCurrentChange(val) {
      this.currentRow = val
      this.$emit('handleCurrentChange', val)
    },
    /**
     * 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className*/
    rowClassName({ row, rowIndex }) {
      row.index = rowIndex // 将索引放置到row数据中
    },
    /**
     *页码更新 */
    getList(param) {
      this.queryList(param.currentPage)
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      this.currentPage = {}
      this.showLoading()
      const msg = {
        'oper_type': dictionaryGet('OPERATE_QUERY'),
        'cur_roleNo': this.$store.getters.roleNo,
        ...this.defaultForm,
        'currentPage': currentPage,
        'pageSize': this.pageList.pageSize
      }

      query(msg).then(response => {
        const { roles, totalNum, pageNum } = response.retMap
        this.tableData = roles
        this.pageList.totalNum = totalNum
        this.pageList.currentPage = pageNum
        this.showLoading()
      }).catch(() => {
        this.showLoading()
      })
    },
    /**
     * btn - 新增*/
    handleAdd() {
      this.dialog.dialog = Object.assign({}, this.dialog, {
        title: '新增',
        oprate: 'add'
      })
      this.changeVisible(true)
    }, // handleAdd
    /**
     * btn - 修改*/
    handleModify() {
      if (commonBlank(this.currentRow)) {
        commonMsgWarn('请选择要修改的行', this)
        return
      }
      this.dialog = Object.assign({}, this.dialog, {
        title: '编辑',
        oprate: 'edit'
      })
      this.changeVisible(true)
      this.$nextTick(() => { // 弹出框加载完成后赋值
        const dataF = {}
        for (const key in this.dialog.formData) {
          dataF[key] = this.currentRow[key]
        }
        this.dialog.formData = dataF
        this.dialog.formData.organ_level = dataF.role_level.substring(0, 1)
        this.dialog.formData.role_level = dataF.role_level.substring(1)
      })
    },
    /**
     * btn - 删除*/
    handleDelete() {
      const rows = this.currentRow
      if (commonBlank(rows)) {
        commonMsgWarn('请选择要删除的行', this)
        return
      }
      const { role_no, role_name, role_mode, is_open } = rows
      commonMsgConfirm('是否确认删除当前选中行？', this, (param) => {
        if (param) {
          const msg = {
            'oper_type': dictionaryGet('OPERATE_DELETE'),
            'operation_value': [{
              'role_no': role_no,
              'role_name': role_name,
              'role_mode': role_mode,
              'is_open': is_open
            }]
          }
          del(msg).then(response => {
            // this.tableData.splice(this.currentRow[0].index, rows.length)
            this.queryList(1)
            commonMsgSuccess(response.retMsg, this)
          }).catch(() => {
          })
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
    dialogAddSubmit() {
      const formData1 = Object.assign({}, this.dialog.formData)
      formData1.role_no = formData1.role_no.toString()
      formData1.last_modi_date = dateNowFormat()
      this.showLoading()
      const msg = {
        'parameterList': [{
          ...formData1
        }],
        'oper_type': dictionaryGet('OPERATE_ADD')
      }
      add(msg).then(response => {
        this.queryList(1) // 重新查询
        this.showLoading()
        commonMsgSuccess(response.retMsg, this)
      }).catch(() => {
        this.showLoading()
      })
      this.changeVisible()
    },
    /**
     * 弹出框 - 确认 - 修改*/
    dialogEditSubmit() {
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
        if (param) {
          let formData1 = Object.assign({}, this.dialog.formData)
          formData1 = Object.assign({}, formData1, {
            role_no: formData1.role_no.toString(),
            last_modi_date: dateNowFormat(), // 初始化最后修改日期
            role_no_old: this.currentRow.role_no,
            is_open_old: this.currentRow.is_open,
            role_name_old: this.currentRow.role_name,
            role_des_old: this.currentRow.role_des,
            role_mode_old: this.currentRow.role_mode,
            organ_level_old: this.currentRow.role_level.substring(0, 1)
          })
          this.showLoading()
          const msg = { // 请求参数
            'parameterList': [{
              ...formData1
            }],
            'oper_type': dictionaryGet('OPERATE_MODIFY')
          }
          update(msg).then(response => {
            const index = this.currentRow.index
            formData1.role_level = formData1.organ_level + formData1.role_level // 角色机构 + 角色等级
            this.tableData.splice(index, 1, formData1)
            commonMsgSuccess(response.retMsg, this)
            this.showLoading()
          }).catch(() => {
            this.showLoading()
          })
          this.changeVisible(false) // 弹出框关闭
        }
      })
    },
    /**
     * 加载中动画配置*/
    showLoading() {
      this.listLoading = !this.listLoading
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
