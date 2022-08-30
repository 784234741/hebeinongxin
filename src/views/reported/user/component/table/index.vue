<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        ref="button"
        :btn-add="$attrs['btn-all'].btnAdd"
        :btn-modify="$attrs['btn-all'].btnModify"
        :btn-delete="$attrs['btn-all'].btnDelete"
        :btn-reset="$attrs['btn-all'].btnReset"
        :btn-watchpsd="false"
        @handleAdd="handleAdd"
        @handleModify="handleModify"
        @handleDelete="handleDelete"
        @handleReset="handleReset"
        @handleWatchpsd="handleWatchpsd"
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
            <span v-if="item.name === 'sys_type'">{{
              row[item.name] | reportSysType
            }}</span>
            <span v-else-if="item.name === 'organ_no'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span v-else-if="item.name === 'user_type'">{{
              row[item.name] | reportUserType
            }}</span>
            <span v-else-if="item.name === 'user_level'">{{
              row[item.name] | reportUserLevel
            }}</span>
            <span
              v-else-if="item.name === 'is_used'"
              :style="
                row[item.name] === '1'
                  ? { color: 'red' }
                  : { color: $store.state.settings.theme }
              "
            >{{ row[item.name] == '1' ? '使用中' : '未使用' }}</span>
            <span v-else-if="item.name === 'is_open'">{{
              row[item.name] | startSign
            }}</span>
            <span v-else-if="item.name === 'last_modi_date'">{{
              row[item.name] | dateTimeFormat
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
    <sun-form-dialog
      :title="dialogPsd.title"
      :visible="dialogPsd.visible"
      :form-config="dialogPsd.config"
      :form-data="dialogPsd.formData"
      :width="dialogPsd.width"
      :label-width="dialogPsd.labelWidth"
      @dialogClose="changeVisiblePsd"
      @dialogSubmit="dialogPsdSumbit"
    /><!--查看密码弹出框-->
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm,
  commonMsgInfo
} from '@/utils/message.js' // 提示信息
import { organNameFormat } from '@/filters'
import { config, configTable, configPsd } from './info' // 表头、表单配置
import { SunButton, SunTable, SunFormDialog } from '@/components'
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { arrChoices } from '@/utils/common.js'
import cryptoAES from '@/utils/cryptoAES'
import { RepUser } from '@/api'
const { query, add, update, del, reset, psdAuth } = RepUser
export default {
  name: 'TableList',
  components: { SunButton, SunTable, SunFormDialog },
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
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      currentRow: [], // 选中行
      modelPath: '',
      modelName: 'account002.xls', // 下载模板名称
      pageList: {
        totalNum: 0,
        currentPage: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      },
      dialog: {
        title: '新增',
        oprate: 'add',
        width: '90rem',
        labelWidth: '12rem',
        visible: false,
        formData: {
          organ_no: '',
          sys_type: '',
          user_level: '',
          user_type: '',
          user_no: '',
          password: '',
          password2: '',
          is_open: ''
        },
        config: config(this)
      },
      dialogPsd: {
        title: '授权确认',
        oprate: 'psd',
        width: '90rem',
        labelWidth: '12rem',
        visible: false,
        formData: {
          organ_no: '',
          user_no: '',
          password: '',
          auth_type: ''
        },
        config: configPsd(this)
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
      const msg = {
        parameterList: [
          {
            organ_no:
              this.defaultForm.organ_no || `#${this.$store.getters.organNo}`,
            user_no: this.defaultForm.user_no,
            is_open: this.defaultForm.is_open
          }
        ],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage,
        pageSize: this.pageList.pageSize
      }
      query(msg)
        .then((response) => {
          const { returnList, totalNum, currentPage, path } = response.retMap
          this.tableData = returnList
          this.pageList.totalNum = totalNum
          this.pageList.currentPage = currentPage
          this.modelPath = path + '/' + this.modelName
          this.showLoading()
        })
        .catch(() => {
          this.showLoading()
        })
    },
    /**
     * btn - 新增*/
    handleAdd() {
      this.dialog.config.organ_no.options = this.$store.getters.organTree
      this.dialog = Object.assign({}, this.dialog, {
        title: '新增',
        oprate: 'add'
      })
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
      this.dialog.config.organ_no.options = this.$store.getters.organTree
      this.dialog = Object.assign({}, this.dialog, {
        title: '修改',
        oprate: 'edit'
      })
      this.changeVisible(true)
      this.$nextTick(() => {
        // 弹出框加载完成后赋值
        this.dialog.formData = Object.assign(
          {},
          this.dialog.formData,
          this.currentRow[0]
        )
        this.dialog.formData.password = cryptoAES.decrypt(this.currentRow[0].password)
        this.dialog.formData.password2 = this.dialog.formData.password
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
          for (let i = 0; i < rows.length; i++) {
            if (
              dictionaryGet('SYS_ADMIN').indexOf(',' + rows[i].user_no + ',') >=
              0
            ) {
              commonMsgWarn(
                '无权删除系统超级管理员用户' + rows[i].user_no + '！',
                this
              )
              return
            }
            if (rows[i].login_state === 1) {
              commonMsgWarn('删除数据中存在已登录的用户，请重新勾选！', this)
              return
            }
          }
          const dels = arrChoices(rows, [
            'organ_no',
            'user_no',
            'user_type',
            'user_level',
            'sys_type',
            'is_open'
          ])
          const msg = {
            parameterList: dels,
            oper_type: dictionaryGet('OPERATE_DELETE')
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
     * btn - 重置*/
    handleReset() {
      const rows = this.currentRow.length
      const arr = this.currentRow[0]
      if (rows === 0) {
        commonMsgWarn('请选择要重置的用户', this)
        return
      } else if (rows > 1) {
        commonMsgWarn('同时只能操作一条数据!', this)
        return
      } else if (arr.is_used !== '1') {
        commonMsgWarn('只能重置使用中的报备用户', this)
        return
      } else {
        commonMsgConfirm('是否确认将选中用户重置为未使用？', this, (param) => {
          if (param) {
            var msg = {
              parameterList: [],
              oper_type: 'force_update',
              user_no: arr.user_no,
              organ_no: arr.organ_no
            }
            reset(msg)
              .then((response) => {
                commonMsgSuccess(response.retMsg, this)
                this.queryList(1)
              })
              .catch(() => {})
          }
        })
      }
    },
    /**
     * btn - 查看密码*/
    handleWatchpsd() {
      this.dialogPsd.formData.organ_no = organNameFormat(
        this.$store.getters.organNo
      )
      this.changeVisiblePsd(true)
    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    },
    changeVisiblePsd(param) {
      this.dialogPsd.visible = param
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
      const formData = Object.assign({}, this.dialog.formData)
      formData.password = cryptoAES.encrypt(formData.password) // 加密
      delete formData.password2
      this.showLoading()
      const param = {
        parameterList: [formData],
        before_data: {},
        is_lock: this.$store.getters.userNo,
        oper_type: dictionaryGet('OPERATE_ADD')
      }
      add(param)
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
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
        if (param) {
          const formData = Object.assign({}, this.dialog.formData)
          const before_data = this.currentRow[0]
          this.showLoading()
          const param = {
            parameterList: [
              {
                organ_no: formData.organ_no,
                sys_type: formData.sys_type,
                user_level: formData.user_level,
                user_type: formData.user_type,
                user_no: formData.user_no,
                password: cryptoAES.encrypt(formData.password),
                is_open: formData.is_open
              }
            ],
            before_data: before_data,
            is_lock: this.$store.getters.userNo,
            oper_type: dictionaryGet('OPERATE_MODIFY')
          }
          update(param)
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
     * 弹出框 - 查看密码*/
    dialogPsdSumbit() {
      if (this.dialogPsd.formData.user_no === this.$store.getters.userNo) {
        commonMsgWarn('不能为自己授权', this)
        return
      }
      const param = {
        parameterList: [''],
        authType: this.dialogPsd.formData.auth_type,
        authRole: dictionaryGet('REPORT_USER_ROLE'),
        authOrgan: '01121',
        userNo: this.dialogPsd.formData.user_no,
        organNo: this.$store.getters.organNo,
        password: cryptoAES.encrypt(this.dialogPsd.formData.password),
        fingerValue: '',
        oper_type: 'commonAuth'
      }
      psdAuth(param)
        .then((response) => {
          const rows = this.currentRow.length
          if (rows === 0) {
            commonMsgWarn(
              '请选择需要查看密码的报备用户（需同机构授权人授权）',
              this
            )
            return
          } else if (rows > 1) {
            commonMsgWarn('只支持单条数据查看，请正确选择一条数据', this)
            return
          }
          const psd = cryptoAES.decrypt(this.currentRow[0].password)
          this.changeVisiblePsd(true)
          commonMsgSuccess(psd, this)
        })
        .catch(() => {
          commonMsgWarn('授权失败', this)
        })
    },
    levelChange() {}
  }
}
</script>
<style lang="scss" scoped></style>
