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
    /><!--????????????????????????-->
    <sun-form-dialog
      :title="dialogBatch.title"
      :visible="dialogBatch.visible"
      :form-config="dialogBatch.config"
      :form-data="dialogBatch.formData"
      :label-width="dialogBatch.labelWidth"
      @dialogClose="changeVisibleBatch"
      @dialogSubmit="dialogSumbitBatch"
    /><!--????????????-->
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm,
  commonMsgError,
  commonMsgInfo
} from '@/utils/message.js' // ????????????
import { dictionaryGet, treeDataOrgan, dictionaryFieds } from '@/utils/dictionary.js' // ????????????
import { dateNowFormat } from '@/utils/date.js' // ???????????????
import cryptoAES from '@/utils/cryptoAES' // ??????

import { config, configTable, configBatch } from './info' // ?????????????????????
import { SunButton, SunFormDialog, SunTable } from '@/components' // ??????

import { dateTimeFormat, organNameFormat, userState, loginType, loginState } from '@/filters' // ??????

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
      currentRow: [], // ?????????
      pageList: {
        totalNum: 0,
        currentPage: 1, // ?????????
        pageSize: this.$store.getters.pageSize // ?????????????????????
      },
      downloadLoading: false,
      currentIndex: 0, // ???????????????
      userLevel: '', // ???????????????????????????
      dialog: {
        title: '??????',
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
        title: '????????????',
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
    // ??????????????????
    handleSelectionChange(val) {
      const currentRow = val
      if (currentRow.length > 1) {
        currentRow.sort(function(a, b) {
          return a.index - b.index
        }) // ???????????????
      }
      this.currentRow = val
    },
    /**
     * ?????? className ??????????????????????????????????????????????????????????????????????????? className*/
    rowClassName({ row, rowIndex }) {
      row.index = rowIndex // ??????????????????row?????????
    },
    /**
     *???????????? */
    getList(param) {
      this.queryList(param.currentPage)
    },
    /**
     * ???????????????*/
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
     * btn - ??????*/
    handleAdd() {
      this.disabledLevel(this.userLevel, this.rolelist)
      const { organ_no, user_no, role_no,???right_organ_no } = this.dialog.config
      organ_no.componentProps.disabled = false
      user_no.componentProps.disabled = false
      role_no.componentProps.disabled = false
      right_organ_no.options = treeDataOrgan(
              this.$store.getters.organNo
            )
      organ_no.options = this.$store.getters.organTree
      role_no.options = this.rolelist
      this.dialog.dialog = Object.assign({}, this.dialog, {
        title: '??????',
        oprate: 'add'
      })
      this.changeVisible(true)
    }, // handleAdd
    /**
     * btn - ???????????????????????????*/
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
     * btn - ?????????????????????*/
    getData(params, id) {
      params[0]['children'].forEach(item => {
        if (item['id'] === id) {
          params[0]['children'] = [item]
          this.rolelist = params
        }
      })
    },
    /**
     * btn - ??????*/
    handleModify() {
      for (const i in this.currentRow[0]) {
        if (i === 'last_login_time' || i === 'last_logout_time') {
          this.currentRow[0][i] = dateTimeFormat(this.currentRow[0][i])
        }
      }
      const rows = this.currentRow.length
      if (rows === 0) {
        commonMsgWarn('????????????????????????', this)
        return
      }
      const { organ_no, user_no, role_no } = this.dialog.config
      organ_no.componentProps.disabled = true
      user_no.componentProps.disabled = true
      role_no.componentProps.disabled = true
      organ_no.options = this.$store.getters.organTree
      role_no.options = this.rolelist
      this.dialog = Object.assign({}, this.dialog, {
        title: '??????',
        oprate: 'edit'
      })
      this.changeVisible(true)
      this.$nextTick(() => {
        // ??????????????????????????????
        // this.dialog.formData = Object.assign({}, this.currentRow[0])
        const dataF = {}
        for (const key in this.dialog.formData) {
          dataF[key] = this.currentRow[0][key]
        }
        this.dialog.formData = dataF
      })
    },
    /**
     * btn - ??????*/
    handleDelete() {
      const rows = this.currentRow
      if (rows.length === 0) {
        commonMsgWarn('????????????????????????', this)
        return
      }
      commonMsgConfirm('?????????????????????????????????????????????', this, (param) => {
        if (param) {
          let users = []
          for (let i = 0; i < rows.length; i++) {
            if (
              dictionaryGet('SYS_ADMIN').indexOf(',' + rows[i].user_no + ',') >=
              0
            ) {
              commonMsgWarn(
                '???????????????????????????????????????' + rows[i].user_no + '???',
                this
              )
              return
            }
            if (rows[i].login_state === 1) {
              commonMsgWarn('????????????????????????????????????????????????????????????', this)
              return
            }
            users = [...users, { user_no: rows[i].user_no }]
          }
          // // ????????????0-?????????/1-??????/2-??????
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
     * ????????? - ??????
     * @param {Boolean} param ???????????????????????????*/
    changeVisible(param) {
      this.dialog.visible = param
    }, // handleAdd
    /**
     * ????????? - ??????*/
    dialogSumbit() {
      const param = this.dialog.oprate
      if (param === 'add') {
        this.dialogAddSubmit()
      } else {
        this.dialogEditSubmit()
      }
    },
    /**
     * ????????? - ?????? - ??????*/
    dialogAddSubmit() {
      const formData1 = Object.assign({}, this.dialog.formData)
      formData1.role_no = formData1.role_no.toString()
      formData1.last_modi_date = dateNowFormat()
      this.showLoading()

      // const formD = { ...formData1 }
      // formD.role_no = formD.role_no.join(',')
      formData1['password'] = cryptoAES.encrypt(dictionaryGet('DEFAULT_PSWD')) // ??????
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
          // this.tableData.unshift(formData1) // ????????????
          this.queryList(1) // ????????????
          this.showLoading()
          commonMsgInfo(
            '????????????????????????????????????' + dictionaryGet('DEFAULT_PSWD'),
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
     * ????????? - ?????? - ??????*/
    dialogEditSubmit() {
      commonMsgConfirm('?????????????????????????????????', this, (param) => {
        if (param) {
          if (this.currentRow[0].login_state === '1') {
            commonMsgWarn('?????????????????????????????????????????????', this)
            return
          }
          let formData1 = Object.assign({}, this.dialog.formData)
          formData1 = Object.assign({}, formData1, {
            role_no: formData1.role_no.toString(),
            last_modi_date: dateNowFormat() // ???????????????????????????
          })
          this.showLoading()
          const { user_no, role_no, user_name, login_mode, tellerlvl } =
            this.currentRow[0] // ?????????
          const msg = {
            // ????????????
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
          this.changeVisible(false) // ???????????????
        }
      })
    },
    /**
     * ?????????????????????*/
    showLoading() {
      this.listLoading = !this.listLoading
    },
    /**
     * btn: ????????????*/
    handleLoginOut() {
      const rows = this.currentRow
      if (rows.length === 0) {
        commonMsgWarn('????????????????????????????????????', this)
        return
      }
      commonMsgConfirm('???????????????????????????????????????????????????', this, (param) => {
        if (param) {
          let users = []
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].login_state === '0') {
              commonMsgWarn('????????????????????????????????????????????????????????????', this)
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
     * btn: ????????????*/
    handleBatch() {
      this.dialogBatch.visible = true
      this.dialogBatch.config.organ_no.options = treeDataOrgan(
        this.$store.getters.organNo
      )
    },
    /**
     * btn: ???????????? ????????? ??????*/
    changeVisibleBatch() {
      this.dialogBatch.visible = false
    },
    /**
     * btn: ???????????? ????????? ??????*/
    dialogSumbitBatch() {
      commonMsgConfirm('?????????????????????????????????', this, (param) => {
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
              commonMsgError('????????????', this)
              this.changeVisibleBatch()
            })
        }
      })
    },
    /**
     * btn: ????????????*/
    handleResetPsd() {
      const rows = this.currentRow
      if (rows.length === 0) {
        commonMsgWarn('???????????????????????????????????????', this)
        return
      }
      commonMsgConfirm(
        '????????????????????????????????????????????????????????????',
        this,
        (param) => {
          if (param) {
            let users = []
            for (const key of rows) {
              if (
                dictionaryGet('SYS_ADMIN').indexOf(',' + key.user_no + ',') >= 0
              ) {
                commonMsgWarn(
                  '???????????????????????????????????????' + key.user_no + '???',
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
     * btn: ??????/??????*/
    handleEnableDisable() {
      const rows = this.currentRow
      if (rows.length === 0) {
        commonMsgWarn('?????????????????????/???????????????!', this)
        return
      }
      commonMsgConfirm(
        '??????????????????/??????????????????????????????????????????',
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
                  '???????????????????????????????????????' + key.user_no + '???',
                  this
                )
                return
              }
              if (user_status !== key.user_status) {
                commonMsgWarn('????????????????????????????????????', this)
                return
              }
              users = [...users, { user_no: key.user_no }]
            }
            const msg = {
              parameterList: users,
              oper_type: 'stop',
              user_status: user_status === '1' ? '3' : '1',
              stopStr: user_status === '1' ? '??????' : '??????'
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
