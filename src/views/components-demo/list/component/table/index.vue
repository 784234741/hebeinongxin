<template>
  <div class="sun-content">
    <div class="list-btn">
      <el-button v-waves class="filter-item" type="primary" @click="handleAdd">
        新增
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" @click="handleDownload">
        导出
      </el-button>
      <el-button v-waves lass="filter-item" type="primary" @click="print">
        打印
      </el-button>
    </div>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="tableData"
      fit
      border
      highlight-current-row
    >
      <el-table-column
        v-for="item in tableColumn"
        :key="item.id"
        :prop="item.name"
        :label="item.label"
        :width="item.width"
      >
        <div v-if="item.name == 'operate'" slot-scope="{row,$index}">
          <el-button type="primary" size="small" @click="handleUpdate(row, $index)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="small" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </div>
        <div v-else slot-scope="{row}">
          <span>{{ row[item.name] }}</span>
        </div>
      </el-table-column>
    </el-table>
    <sun-pagination v-show="pageList.total>0" :total="pageList.total" :page.sync="pageList.page" :limit.sync="pageList.pageSize" @pagination="getList" />
    <sun-form-dialog
      :title="dialog.title"
      :visible="dialog.visible"
      :form-config="dialog.config"
      :form-data="dialog.formData"
      :width="dialog.width"
      @dialogClose="changeVisible"
      @dialogSubmit="dialogSumbit"
    /><!--新增弹出框-->
  </div>
</template>

<script>
import { parseTime } from '@/utils/common.js'
import { commonMsgSuccess } from '@/utils/message.js'
import waves from '@/directive/waves' // waves directive
import { config, configTable } from './info' // 表头配置
import SunPagination from '@/components/SunPagination' // 页码
import SunFormDialog from '@/components/Dialog/SunFormDialog' // 弹出框
import { SysUser } from '@/api'
const { add, update } = SysUser
export default {
  name: 'TableList',
  components: { SunPagination, SunFormDialog },
  directives: { waves },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    pageList: {
      type: Object,
      default: () => {
        return {
          total: 0,
          page: 1, // 当前页
          pageSize: 20 // 当前页显示条数
        }
      }
    },
    loading: { // 表格加载
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listLoading: false,
      tableColumn: configTable(),
      downloadLoading: false,
      currentIndex: 0, // 当前行索引
      dialog: {
        title: '新增',
        width: '90rem',
        visible: false,
        oprate: 'add',
        formData: {
          name: '',
          userRadio: '1',
          usernumber: 0
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
     * btn - 新增*/
    handleAdd() {
      this.dialog = Object.assign({}, this.dialog, {
        title: '新增',
        oprate: 'add'
      })
      this.changeVisible(true)
    }, // handleAdd
    /**
     * btn - 编辑
     * @param {Object} row 行数据
     * @param {Number} index 当前行索引*/
    handleUpdate(row, index) {
      this.dialog = Object.assign({}, this.dialog, {
        title: '编辑',
        oprate: 'edit'
      })
      this.currentIndex = index
      this.changeVisible(true)
      this.$nextTick(() => {
        this.dialog.formData = Object.assign({}, row)
      })
    },
    /**
     * btn - 删除*/
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.tableData.splice(index, 1)
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
      this.showLoading()
      const param = {
        ...this.dialog.formData
      }
      add(param).then(response => {
        this.tableData.unshift(formData1)
        this.showLoading()
        commonMsgSuccess(response.message, this)
      }).catch(() => {
        this.showLoading()
      })
    },
    /**
     * 弹出框 - 确认 - 编辑*/
    dialogEditSubmit() {
      const formData1 = Object.assign({}, this.dialog.formData)
      this.showLoading()
      const param = {
        ...this.dialog.formData
      }
      update(param).then(response => {
        const index = this.currentIndex
        this.tableData.splice(index, 1, formData1)
        commonMsgSuccess(response.message, this)
        this.showLoading()
      }).catch(() => {
        this.showLoading()
      })
    },
    /**
     *btn - 打印 */
    print() {
      this.$print(this.$refs.tableRef)
    },
    /**
     *页码更新 */
    getList() {
      this.$emit('query', this.pageList)
    },
    /**
     * btn - 下载excel*/
    handleDownload() {
      this.downloadLoading = true
      import('@/components/Vendor/Export2Excel').then(excel => {
        const tHeader = ['date', 'name', 'address']
        const filterVal = ['date', 'name', 'address']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    /**
     * 下载excel 过滤
     * @param {object}filterVal 表头*/
    formatJson(filterVal) {
      return this.tableData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
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
