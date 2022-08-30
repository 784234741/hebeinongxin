<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        v-bind="$attrs['btn-all']"
        @handleAdd="handleAdd"
        @handleModify="handleModify"
        @handleDelete="handleDelete"
        @handleLoginOut="handleLoginOut"
        @handleBatch="handleBatch"
        @handleResetPsd="handleResetPsd"
        @handleEnableDisable="handleEnableDisable"
      />
    </div>
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      :selection="true"
      :index-number="true"
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
            <span v-if="item.name === 'last_modi_date'">{{
              row[item.name] | dateTimeFormat
            }}</span>
            <span v-else-if="item.name === 'organ_no'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span v-else-if="item.name === 'role_no'">{{
              row[item.name] | roleNoFormat
            }}</span>
            <span v-else-if="item.name === 'user_status'">
              <el-tag
                :type="
                  row[item.name] === '1'
                    ? 'primary'
                    : row[item.name] === '2'
                      ? 'warning'
                      : 'danger'
                "
                disable-transitions
              >{{ row[item.name] | userState }}</el-tag>
            </span>
            <span v-else-if="item.name === 'login_mode'">{{
              row[item.name] | loginType
            }}</span>
            <span v-else-if="item.name === 'login_state'">
              <el-tag
                :type="row[item.name] === '1' ? 'success' : 'danger'"
                disable-transitions
              >{{ row[item.name] | loginState }}</el-tag>
            </span>
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
      :title="dialogBatch.title"
      :visible="dialogBatch.visible"
      :form-config="dialogBatch.config"
      :form-data="dialogBatch.formData"
      :label-width="dialogBatch.labelWidth"
      @dialogClose="changeVisibleBatch"
      @dialogSubmit="dialogSumbitBatch"
    /><!--批量配置-->
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm,
  commonMsgError,
  commonMsgInfo
} from '@/utils/message.js' // 提示信息
import { dictionaryGet, treeDataOrgan, dictionaryFieds } from '@/utils/dictionary.js' // 字典常量
import { dateNowFormat } from '@/utils/date.js' // 日期格式化
import cryptoAES from '@/utils/cryptoAES' // 加密

import { config, configTable, configBatch } from './info' // 表头、表单配置
import { SunButton, SunFormDialog, SunTable } from '@/components' // 按钮

import { dateTimeFormat, organNameFormat, userState, loginType, loginState } from '@/filters' // 指令

import { SysUser } from '@/api'
const {
  query,
  add,
  update,
  del,
  forcedLogout,
  batchSys,
  resetPsd,
  enableDisable
} = SysUser
let that
export default {
  name: 'TableList',
  components: { SunFormDialog, SunButton, SunTable },
  filters: {
    roleNoFormat: (role_no) => {
      let itemName = null
      that.$emit('roleNoFormat', role_no, (val) => {
        itemName = val
      })
      return itemName
    },
    paperType() {
      return
    }
  },
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
        currentPage: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      },
      downloadLoading: false,
      currentIndex: 0, // 当前行索引
      userLevel: '', // 获取当前用户的级别
      dialog: {
        title: '新增',
        width: '90rem',
        labelWidth: '12rem',
        visible: false,
        oprate: 'add',
        formData: {
          organ_no: '',
          user_no: '',
          tellerlvl: '1',
          user_name: '',
          phone: '',
          login_state: '0',
          user_status: '1',
          login_mode: '1',
          right_organ_no: [],
          single_login: '1',
          role_no: [],
          last_login_time: '',
          last_logout_time: ''
        },
        config: config(this)
      },
      dialogBatch: {
        title: '批量配置',
        // width: '90rem',
        labelWidth: '12rem',
        visible: false,
        oprate: 'add',
        formData: {
          organ_no: '',
          user_status: '',
          is_change_children: ''
        },
        config: configBatch(this)
      }
    }
  },
  watch: {
    loading(value) {
      this.listLoading = this.loading
    }
  },
  beforeCreate: function() {
    that = this
  },
  created() {
    this.listLoading = this.loading
    this.userLevel = this.$store.getters.organLevel
  },
  methods: {
    // 表格选择多行
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
      this.showLoading()
      const formData = JSON.parse(JSON.stringify(this.defaultForm))
      formData.role_no = formData.role_no.join()
      const msg = {
        parameterList: [{ ...formData }],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage,
        user_pageNum: this.pageList.pageSize,
        organ_no: this.$store.getters.organNo,
        cur_roleNo: this.$store.getters.roleNo
      }
      query(msg)
        .then((response) => {
          const { returnList, totalNum, currentPage } = response.retMap
          this.tableData = returnList
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
      this.disabledLevel(this.userLevel, this.rolelist)
      const { organ_no, user_no, role_no,　right_organ_no } = this.dialog.config
      organ_no.componentProps.disabled = false
      user_no.componentProps.disabled = false
      role_no.componentProps.disabled = false
      right_organ_no.options = treeDataOrgan(
              this.$store.getters.organNo
            )
      organ_no.options = this.$store.getters.organTree
      role_no.options = this.rolelist
      this.dialog.dialog = Object.assign({}, this.dialog, {
        title: '新增',
        oprate: 'add'
      })
      this.changeVisible(true)
    }, // handleAdd
    /**
     * btn - 回显用户级别并禁用*/
    disabledLevel(num, datas) {
      if (num === '1') {
        this.dialog.formData.tellerlvl = '2'
        datas.pop()
        this.getData(datas, '22')
      } else if (num === '3') {
        this.dialog.formData.tellerlvl = num
        datas.pop()
        this.getData(datas, '33')
      } else {
        this.dialog.formData.tellerlvl = num
        this.getData(datas, '44')
      }
      this.dialog.config.tellerlvl.componentProps.disabled = true
    },
    /**
     * btn - 筛选角色号数据*/
    getData(params, id) {
      params[0]['children'].forEach(item => {
        if (item['id'] === id) {
          params[0]['children'] = [item]
          this.rolelist = params
        }
      })
    },
    /**
     * btn - 编辑*/
    handleModify() {
      for (const i in this.currentRow[0]) {
        if (i === 'last_login_time' || i === 'last_logout_time') {
          this.currentRow[0][i] = dateTimeFormat(this.currentRow[0][i])
        }
      }
      const rows = this.currentRow.length
      if (rows === 0) {
        commonMsgWarn('请选择要修改的行', this)
        return
      }
      const { organ_no, user_no, role_no } = this.dialog.config
      organ_no.componentProps.disabled = true
      user_no.componentProps.disabled = true
      role_no.componentProps.disabled = true
      organ_no.options = this.$store.getters.organTree
      role_no.options = this.rolelist
      this.dialog = Object.assign({}, this.dialog, {
        title: '编辑',
        oprate: 'edit'
      })
      this.changeVisible(true)
      this.$nextTick(() => {
        // 弹出框加载完成后赋值
        // this.dialog.formData = Object.assign({}, this.currentRow[0])
        const dataF = {}
        for (const key in this.dialog.formData) {
          dataF[key] = this.currentRow[0][key]
        }
        this.dialog.formData = dataF
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
          let users = []
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
            users = [...users, { user_no: rows[i].user_no }]
          }
          // // 提交类型0-不审核/1-本地/2-远程
          // let submitRetData = userConfigSys.variable.ret6Json;
          const msg = {
            oper_type: dictionaryGet('OPERATE_DELETE'),
            operation_value: users
          }
          del(msg)
            .then((response) => {
              // this.tableData.splice(this.currentRow[0].index, rows.length)
              this.queryList(1)
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
    dialogAddSubmit() {
      const formData1 = Object.assign({}, this.dialog.formData)
      formData1.role_no = formData1.role_no.toString()
      formData1.last_modi_date = dateNowFormat()
      this.showLoading()

      // const formD = { ...formData1 }
      // formD.role_no = formD.role_no.join(',')
      formData1['password'] = cryptoAES.encrypt(dictionaryGet('DEFAULT_PSWD')) // 加密
      const param = {
        parameterList: [
          {
            ...formData1
          }
        ],
        oper_type: dictionaryGet('OPERATE_ADD')
      }
      add(param)
        .then((response) => {
          // this.tableData.unshift(formData1) // 数据更新
          this.queryList(1) // 重新查询
          this.showLoading()
          commonMsgInfo(
            '新增用户成功，初始密码为' + dictionaryGet('DEFAULT_PSWD'),
            this,
            (param) => {
              if (param) {
                commonMsgSuccess(response.retMsg, this)
              }
            }
          )
        })
        .catch(() => {
          this.showLoading()
        })
      this.changeVisible()
    },
    /**
     * 弹出框 - 确认 - 编辑*/
    dialogEditSubmit() {
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
        if (param) {
          if (this.currentRow[0].login_state === '1') {
            commonMsgWarn('该用户登录中，暂时不支持修改！', this)
            return
          }
          let formData1 = Object.assign({}, this.dialog.formData)
          formData1 = Object.assign({}, formData1, {
            role_no: formData1.role_no.toString(),
            last_modi_date: dateNowFormat() // 初始化最后修改日期
          })
          this.showLoading()
          const { user_no, role_no, user_name, login_mode, tellerlvl } =
            this.currentRow[0] // 当前行
          const msg = {
            // 请求参数
            parameterList: [
              {
                ...formData1
              }
            ],
            oper_type: dictionaryGet('OPERATE_MODIFY'),
            oldMsg: [user_name, login_mode, tellerlvl].join(','),
            olduser_no: user_no,
            oldrole_no: role_no
          }
          update(msg)
            .then((response) => {
              const index = this.currentRow[0].index
              this.tableData.splice(index, 1, formData1)
              commonMsgSuccess(response.retMsg, this)
              this.showLoading()
            })
            .catch(() => {
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
    },
    /**
     * btn: 强制登出*/
    handleLoginOut() {
      const rows = this.currentRow
      if (rows.length === 0) {
        commonMsgWarn('请选择需要强制登出的用户', this)
        return
      }
      commonMsgConfirm('是否确认对所选用户做强制登出操作？', this, (param) => {
        if (param) {
          let users = []
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].login_state === '0') {
              commonMsgWarn('所选数据中存在未登录的用户，请重新勾选！', this)
              return
            }
            users = [...users, { user_no: rows[i].user_no }]
          }
          const msg = {
            parameterList: users,
            oper_type: 'forcedLogout',
            oper_user_no: this.$store.getters.userNo
          }
          forcedLogout(msg)
            .then((response) => {
              this.queryList(1)
              commonMsgSuccess(response.retMsg, this)
            })
            .catch(() => {})
        }
      })
    },
    /**
     * btn: 批量配置*/
    handleBatch() {
      this.dialogBatch.visible = true
      this.dialogBatch.config.organ_no.options = treeDataOrgan(
        this.$store.getters.organNo
      )
    },
    /**
     * btn: 批量配置 弹出框 关闭*/
    changeVisibleBatch() {
      this.dialogBatch.visible = false
    },
    /**
     * btn: 批量配置 弹出框 确定*/
    dialogSumbitBatch() {
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
        if (param) {
          const msg = {
            ...this.dialogBatch.formData
          }
          batchSys(msg)
            .then((response) => {
              this.queryList(1)
              commonMsgSuccess(response.retMsg, this)
              this.changeVisibleBatch()
            })
            .catch(() => {
              commonMsgError('提交失败', this)
              this.changeVisibleBatch()
            })
        }
      })
    },
    /**
     * btn: 重置密码*/
    handleResetPsd() {
      const rows = this.currentRow
      if (rows.length === 0) {
        commonMsgWarn('请选择需要重置密码的用户行', this)
        return
      }
      commonMsgConfirm(
        '是否确认重置当前选中用户密码为初始密码？',
        this,
        (param) => {
          if (param) {
            let users = []
            for (const key of rows) {
              if (
                dictionaryGet('SYS_ADMIN').indexOf(',' + key.user_no + ',') >= 0
              ) {
                commonMsgWarn(
                  '无权重置系统超级管理员用户' + key.user_no + '！',
                  this
                )
                return
              }
              users = [...users, { user_no: key.user_no }]
            }
            const msg = {
              parameterList: users,
              oper_type: dictionaryGet('OPERATE_OTHER')
            }
            resetPsd(msg)
              .then((response) => {
                commonMsgInfo(response.retMsg, this)
              })
              .catch(() => {})
          }
        }
      )
    },
    /**
     * btn: 启用/停用*/
    handleEnableDisable() {
      const rows = this.currentRow
      if (rows.length === 0) {
        commonMsgWarn('请选择需要启用/停用的用户!', this)
        return
      }
      commonMsgConfirm(
        '是否确认启用/停用当前选中的系统用户信息？',
        this,
        (param) => {
          if (param) {
            let users = []
            const user_status = rows[0].user_status
            for (const key of rows) {
              if (
                dictionaryGet('SYS_ADMIN').indexOf(',' + key.user_no + ',') >= 0
              ) {
                commonMsgWarn(
                  '无权重置系统超级管理员用户' + key.user_no + '！',
                  this
                )
                return
              }
              if (user_status !== key.user_status) {
                commonMsgWarn('用户状态不一致无法操作！', this)
                return
              }
              users = [...users, { user_no: key.user_no }]
            }
            const msg = {
              parameterList: users,
              oper_type: 'stop',
              user_status: user_status === '1' ? '3' : '1',
              stopStr: user_status === '1' ? '停用' : '启用'
            }
            enableDisable(msg)
              .then((response) => {
                this.queryList(this.pageList.currentPage)
                commonMsgSuccess(response.retMsg, this)
              })
              .catch(() => {})
          }
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
