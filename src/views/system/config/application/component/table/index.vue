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
        >
          <div slot-scope="{ row }">
            <span v-if="item.name === 'ser_type'">{{
              row[item.name] | serverType
            }}</span>
            <span v-else-if="item.name === 'irp_type'">{{
              row[item.name] | irpType
            }}</span>
            <span v-else-if="item.name === 'is_open'">{{
              row[item.name] | startSign
            }}</span>
            <span v-else-if="item.name === 'last_modi_date'">{{
              row[item.name] | dateTimeFormat
            }}</span>
            <span v-else-if="item.name === 'organ_no'">{{
              row[item.name] | organNameFormat
            }}</span>
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

import { config, configTable } from './info' // 表头、表单配置
import { SunButton, SunFormDialog, SunTable } from '@/components'

import { SysApplication } from '@/api'
const { server } = SysApplication
export default {
  name: 'TableList',
  components: { SunFormDialog, SunButton, SunTable },
  filters: {
    // dateTimeFormat,
    // organNameFormat
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
        width: '90rem',
        labelWidth: '12rem',
        visible: false,
        oprate: 'add',
        formData: {
          organ_no: '',
          ser_id: '',
          ser_name: '',
          ser_ip: '',
          ser_port: null,
          ser_content: '',
          ser_type: '',
          is_open: ''
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
    /**
     * 多行数据拼写报文的方法
     * @param dataArr	选择行的数组
     * @param attrArr  放置的参数数组
     */
    commonChoices(dataArr, attrArr) {
      const jsonArr = []
      for (let i = 0; i < dataArr.length; i++) {
        const jsonObj = {}
        for (let j = 0; j < attrArr.length; j++) {
          const name = attrArr[j]
          jsonObj[name] = dataArr[i][name]
        }
        jsonArr.push(jsonObj)
      }
      return jsonArr
    },
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
      const msg = {
        parameterList: [{ ...this.defaultForm }],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      // 查询
      server(msg).then((response) => {
        const { returnList, totalNum } = response.retMap
        this.tableData = returnList
        this.pageList.totalNum = totalNum
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
      this.changeVisible(true)
    }, // handleAdd
    /**
     * btn - 编辑*/
    handleModify() {
      const rows = this.currentRow.length
      if (rows === 0) {
        commonMsgWarn('请选择要修改的行', this)
        return
      }
      if (rows > 1) {
        commonMsgWarn('请选择一行', this)
        return
      }
      this.dialog = Object.assign({}, this.dialog, {
        title: '编辑',
        oprate: 'edit'
      })
      this.changeVisible(true)
      this.$nextTick(() => {
        // 弹出框加载完成后赋值
        const keys = Object.keys(this.dialog.formData)
        const obbb = {}
        keys.forEach((item) => {
          obbb[item] = this.currentRow[0][item]
        })
        this.dialog.formData = obbb
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
        const dels = this.commonChoices(rows, [
          'ser_id',
          'ser_name',
          'ser_type',
          'ser_ip',
          'irp_type',
          'thread_num'
        ])
        const msg = {
          parameterList: dels,
          oper_type: dictionaryGet('OPERATE_DELETE')
        }
        server(msg)
          .then((response) => {
            commonMsgSuccess('删除成功', this)
            this.queryList(this.pageList.page)
          })
          .catch((err) => {
            console.log(err)
          })
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
      this.showLoading()
      const msg = {
        parameterList: [
          {
            irp_type: '',
            thread_num: '',
            ...this.dialog.formData
          }
        ],
        oldMsg: {},
        user_no: this.$store.getters.userNo,
        oper_type: dictionaryGet('OPERATE_ADD')
      }

      // 新增
      server(msg)
        .then((response) => {
          commonMsgSuccess('新增成功', this)
          this.showLoading()
          this.queryList(this.pageList.page)
        })
        .catch((err) => {
          console.log(err)
          this.showLoading()
        })
      this.changeVisible(false) // 弹出框关闭
    },

    /**
     * 弹出框 - 确认 - 编辑*/
    dialogEditSubmit() {
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
        if (param) {
          this.showLoading()
          const msg = {
            parameterList: [
              {
                irp_type: '',
                thread_num: '',
                ...this.dialog.formData
              }
            ],
            oldMsg: { ...this.currentRow[0] },
            user_no: this.$store.getters.userNo,
            oper_type: dictionaryGet('OPERATE_MODIFY')
          }
          // 修改
          server(msg)
            .then((response) => {
              commonMsgSuccess('修改成功', this)
              this.showLoading()
              this.queryList(this.pageList.page)
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
