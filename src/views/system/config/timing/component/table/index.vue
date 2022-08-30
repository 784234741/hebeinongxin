<template>
  <div class="sun-content">
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
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      @current-change="currentChange"
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
            <span v-if="item.name === 'service_module'">{{
              row[item.name] | serviceModule
            }}</span>
            <span
              v-else-if="item.name === 'job_server'"
              class="jobServer"
              @click="openDialog(row)"
            >
              {{ row[item.name] }}
            </span>
            <span
              v-else-if="item.name === 'job_status'"
              :style="row[item.name] === '0' ? offStatus : startStatus"
            >{{ row[item.name] === '0' ? '暂停中' : '运行中' }}</span>
            <span v-else-if="item.name === 'last_modi_date'">{{
              row[item.name] | dateTimeFormat
            }}</span>
            <span
              v-else-if="item.name === 'operator'"
              class="operator"
              @click="turnOn($event, row)"
            >
              <span data-type="1">立即执行</span>
              <span data-type="2">{{
                row.job_status === '0' ? '启动' : '暂停'
              }}</span>
              <!-- <span data-type="3">查看日志</span> -->
            </span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template></sun-table>
    <sun-form-dialog
      :title="dialog.title"
      :visible="dialog.visible"
      :form-config="dialog.config"
      :form-data="dialog.formData"
      :width="dialog.width"
      top="6vh"
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
import { commonBlank } from '@/utils/common'

import { config, configTable } from './info' // 表头、表单配置
import { SunButton, SunFormDialog, SunTable } from '@/components' // 按钮

import { SysTiming } from '@/api'
const { scheduleData } = SysTiming
export default {
  name: 'TableList',
  components: { SunTable, SunFormDialog, SunButton },
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
      startStatus: {
        color: 'green'
      },
      offStatus: {
        color: 'red'
      },
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      currentRow: [], // 选中行
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      },
      downloadLoading: false,
      currentIndex: 0, // 当前行索引
      dialog: {
        title: '新增',
        width: '60rem',
        labelWidth: '13rem',
        visible: false,
        top: '6vh',
        oprate: 'add',
        formData: {
          job_key: '',
          job_name: '',
          job_desc: '',
          job_type: '',
          service_module: '',
          job_class_name: '',
          cron_expression: '',
          job_server: []
        },
        config: config(this)
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
    openDialog(row) {
      this.currentRow = row
      this.handleModify(true)
    },
    // 选择单行
    currentChange(val) {
      this.currentRow = val
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      const msg = {
        parameterList: [''],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        ...this.defaultForm,
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      scheduleData(msg).then((response) => {
        const { list, totalNum } = response.retMap
        this.tableData = list
        this.pageList.totalNum = totalNum
        this.showLoading()
      })
    },
    /**
     * btn - 新增*/
    handleAdd() {
      this.dialog = Object.assign({}, this.dialog, {
        title: '新增',
        oprate: 'add',
        config: config(this)
      })
      this.dialog.formData = {
        job_key: '自动生成',
        job_name: '',
        job_desc: '',
        job_type: '',
        service_module: '',
        job_class_name: '',
        cron_expression: '',
        job_server: []
      }

      this.changeVisible(true)
    }, // handleAdd
    /**
     * btn - 编辑*/
    handleModify(check) {
      const row = this.currentRow
      if (commonBlank(row)) {
        commonMsgWarn('请选择需要修改的机构', this)
        return
      }
      if (row.job_status === '1') {
        commonMsgWarn('只能修改暂停状态的服务，请先手动暂停定时服务', this)
        return
      }
      this.dialog = Object.assign({}, this.dialog, {
        title: check ? '查看' : '编辑',
        oprate: check ? 'view' : 'edit'
      })
      this.changeVisible(true)
      this.$nextTick(() => {
        if (check) {
          this.dialog.config = config(this, true)
        } else {
          this.dialog.config = config(this)
        }
        // 弹出框加载完成后赋值
        this.dialog.formData = Object.assign({}, row)
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
      } else if (param === 'view') {
        this.changeVisible(false)
      } else {
        this.dialogEditSubmit()
      }
    },
    /**
     * 弹出框 - 确认 - 新增*/
    dialogAddSubmit() {
      const msg = {
        parameterList: [{ oper_type: dictionaryGet('OPERATE_QUERY') }],
        oper_type: dictionaryGet('OPERATE_ADD'),
        ...this.dialog.formData,
        procedure_name: this.dialog.formData.job_class_name
      }
      scheduleData(msg)
        .then((response) => {
          this.queryList()
          commonMsgSuccess(response.retMsg, this)
        })
        .catch(() => {})
      this.changeVisible(false) // 弹出框关闭
    },
    /**
     * 弹出框 - 确认 - 编辑*/
    dialogEditSubmit() {
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
        if (param) {
          this.showLoading()
          const msg = {
            parameterList: [{}],
            oper_type: dictionaryGet('OPERATE_MODIFY'),
            ...this.dialog.formData,
            procedure_name: this.dialog.formData.job_class_name,
            job_server_before: this.currentRow.job_server // 改动前的服务器信息
          }
          scheduleData(msg)
            .then((response) => {
              commonMsgSuccess(response.retMsg, this)
              this.showLoading()
              this.queryList()
            })
            .catch(() => {
              this.showLoading()
            })
          this.changeVisible(false) // 弹出框关闭
        }
      })
    },
    /**
     * btn - 删除*/
    handleDelete() {
      const row = this.currentRow
      if (row.length === 0) {
        commonMsgWarn('请选择要删除的行', this)
        return
      }
      commonMsgConfirm('是否确认删除当前选中行？', this, (param) => {
        if (param) {
          const msg = {
            parameterList: [{}],
            oper_type: dictionaryGet('OPERATE_DELETE'),
            job_key: row.job_key,
            job_name: row.job_name,
            job_server: row.job_server
          }
          scheduleData(msg)
            .then((response) => {
              commonMsgSuccess(response.retMsg, this)
              this.queryList()
            })
            .catch(() => {})
        }
      })
    },
    turnOn(e, row) {
      // const msg = {
      //   parameterList: [''],
      //   sysMap: {
      //     oper_type: 'pauseOperation',
      //     job_key: '20200202000000000002',
      //     job_server: '20190129000000000001'
      //   }
      // }
      const { job_key, job_server } = row
      let msg = {}
      let str = ''
      if (e.target.dataset.type === '1') {
        str = `是否手动执行当前选中定时服务: ${row.job_name}`
        msg = {
          parameterList: [],
          oper_type: 'executeOperation',
          job_key,
          job_server
        }
      }
      if (e.target.dataset.type === '2') {
        str = `是否确认${
          row.job_status === '0' ? '恢复' : '启动'
        }当前选中定时服务: ${row.job_name}`
        msg = {
          parameterList: [],
          oper_type:
            row.job_status === '0' ? 'resumeOperation' : 'pauseOperation',
          job_key,
          job_server
        }
      }
      commonMsgConfirm(str, this, (parm) => {
        if (parm) {
          scheduleData(msg).then((response) => {
            this.queryList()
          })
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
<style lang="scss" scoped>
.jobServer {
  color: #1890ff;
  cursor: pointer;
}
.operator {
  span {
    display: inline-block;
    margin-left: 1rem;
    color: #1890ff;
    cursor: pointer;
  }
}
</style>
