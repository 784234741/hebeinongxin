<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        ref="button"
        :btn-add="$attrs['btn-all'].btnAdd"
        :btn-delete="$attrs['btn-all'].btnDelete"
        :btn-export="$attrs['btn-all'].btnExport"
        @handleAdd="handleAdd"
        @handleDelete="handleDelete"
        @handleExport="handleExport"
      />
    </div>
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      :selection="true"
      :index-number="true"
      @current-change="currentChange"
      @pagination="getList"
    >
      <template slot="tableColumn">
        <el-table-column prop="organ_no" label="填报机构">
          <div slot-scope="{ row }">
            <span>{{ row.organ_no | organNameFormat }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="count_month" label="统计月份">
          <div slot-scope="{ row }">
            <span>{{ row.count_month }}</span>
          </div>
        </el-table-column>
        <el-table-column label="本月开户投诉（单位：起）">
          <el-table-column label="地方性银行" align="center">
            <el-table-column prop="mon_comp_peo_bank" label="人民银行受理">
              <div slot-scope="{ row }">
                <span>{{ row.mon_comp_peo_bank }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="mon_comp_bank" label="银行受理">
              <div slot-scope="{ row }">
                <span>{{ row.mon_comp_bank }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本年1月至本月开户投诉（单位：起）">
          <el-table-column label="地方性银行" align="center">
            <el-table-column prop="year_comp_peo_bank" label="人民银行受理">
              <div slot-scope="{ row }">
                <span>{{ row.year_comp_peo_bank }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="year_comp_bank" label="银行受理">
              <div slot-scope="{ row }">
                <span>{{ row.year_comp_bank }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本年1月至本月开户服务满意度调查" align="center">
          <el-table-column prop="question_num" label="收回有效调查问卷份数">
            <div slot-scope="{ row }">
              <span>{{ row.question_num }}</span>
            </div>
          </el-table-column>
          <el-table-column label="问卷结果" align="center">
            <el-table-column prop="great_satis" label="其中：非常满意的份数">
              <div slot-scope="{ row }">
                <span>{{ row.great_satis }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="be_quite_satis" label="其中：比较满意的份数">
              <div slot-scope="{ row }">
                <span>{{ row.be_quite_satis }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="satisfied" label="其中：满意的份数">
              <div slot-scope="{ row }">
                <span>{{ row.satisfied }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="dissatisfied" label="其中：不满意的份数">
              <div slot-scope="{ row }">
                <span>{{ row.dissatisfied }}</span>
              </div>
            </el-table-column>
            <el-table-column
              prop="be_very_dissatis"
              label="其中：非常不满意的份数"
            >
              <div slot-scope="{ row }">
                <span>{{ row.be_very_dissatis }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本年1月至本月累计减免费用（单位万元）" align="center">
          <el-table-column prop="acc_open_man" label="开户管理费">
            <div slot-scope="{ row }">
              <span>{{ row.acc_open_man }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="annual_fee" label="年费">
            <div slot-scope="{ row }">
              <span>{{ row.annual_fee }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="e_bank_open_fee" label="网银开通费">
            <div slot-scope="{ row }">
              <span>{{ row.e_bank_open_fee }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="other_management" label="其他与账户相关管理费">
            <div slot-scope="{ row }">
              <span>{{ row.other_management }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="total" label="合计">
            <div slot-scope="{ row }">
              <span>{{ row.total }}</span>
            </div>
          </el-table-column>
        </el-table-column>
      </template>
    </sun-table>
    <sun-forms-dialog
      :title="dialog.title"
      :visible="dialog.visible"
      :form-config="dialog.config"
      :top="dialog.top"
      :width="dialog.width"
      :label-width="dialog.labelWidth"
      @dialogClose="changeVisible"
      @dialogSubmit="dialogSumbit"
    />
    <!--新增弹出框-->
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm
} from '@/utils/message.js' // 提示信息
import { exportXlsx } from '@/utils/common.js'
import waves from '@/directive/waves' // waves directive
import { config, configTable } from './info' // 表头、表单配置
import { SunButton, SunTable, SunFormsDialog } from '@/components'
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量

import { organNameFormat } from '@/filters'
import { Staper } from '@/api'
const { query, add, del } = Staper
export default {
  name: 'TableList',
  components: { SunButton, SunTable, SunFormsDialog },
  directives: { waves },
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
      downloadLoading: false,
      tableData: [],
      currentRow: null, // 选中行
      pageList: {
        totalNum: 0,
        currentPage: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      },
      currentIndex: 0,
      dialog: {
        title: '新增',
        top: '5vh',
        width: '98%',
        visible: false,
        oprate: 'add',
        formData: {
          count_month: '',
          mon_comp_peo_bank: '',
          mon_comp_bank: '',
          year_comp_peo_bank: '',
          year_comp_bank: '',
          great_satis: '',
          be_quite_satis: '',
          satisfied: '',
          dissatisfied: '',
          be_very_dissatis: '',
          acc_open_man: '',
          annual_fee: '',
          e_bank_open_fee: '',
          other_management: ''
        },
        config: config(this)
      }
    }
  },
  methods: {
    currentChange(val) {
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
      // this.listLoading = !this.listLoading
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      const formData = this.defaultForm
      this.showLoading()
      const msg = {
        parameterList: [{}],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        organ_no: formData.organ_no || this.$store.getters.organNo,
        organ_no_login: formData.organ_no || this.$store.getters.organNo,
        count_month: formData.count_month,
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      query(msg)
        .then((response) => {
          const { returnList, totalNum } = response.retMap
          this.tableData = returnList
          this.pageList.totalNum = totalNum
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
      this.changeVisible(true)
      this.$nextTick(() => {
        const inputDoms = document.querySelectorAll(
          '.el-dialog__body .el-input__inner'
        )
        inputDoms.forEach((item, index) => {
          item.setAttribute('data-index', index)
        })
        this.inputDoms = inputDoms
      })
    },
    nextFocus(event) {
      const index = event.target.getAttribute('data-index')
      const nextIndex = parseInt(index) + 1
      if (nextIndex < this.inputDoms.length) {
        this.inputDoms[nextIndex].focus()
      } else {
        this.inputDoms[0].focus()
      }
    },
    /**
     * btn - 删除*/
    handleDelete() {
      if (!this.currentRow) {
        commonMsgWarn('请选择要删除的数据', this)
        return
      }
      commonMsgConfirm('确认删除该数据', this, (flag) => {
        if (flag) {
          const { organ_no, count_month } = this.currentRow
          const msg = {
            parameterList: [{}],
            oper_type: 'del',
            organ_no,
            count_month
          }
          // del
          del(msg)
            .then((response) => {
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
     * 弹出框 - 新增确认*/
    dialogSumbit(data) {
      this.showLoading()
      const param = {
        parameterList: [
          {
            ...data,
            count_month: data.count_month
          }
        ],
        oper_type: dictionaryGet('OPERATE_ADD'),
        organ_no: this.$store.getters.organNo
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
      this.changeVisible()
    },
    /**
     * btn - 导出 下载excel*/
    handleExport() {
      // 格式化表格数据
      const formatJson = (filterVal, jsonData) => {
        return jsonData.map((v) =>
          filterVal.map((j) => {
            if (j === 'organ_no') {
              return organNameFormat(v[j])
            } else {
              return v[j]
            }
          })
        )
      }
      const tHeader = []
      const filterVal = []
      this.tableColumn.map((item) => {
        tHeader.push(item.label)
        filterVal.push(item.name)
      })
      const data = formatJson(filterVal, this.tableData)
      exportXlsx(tHeader, data, '个人开户满意度监测表')
    }
  }
}
</script>
<style lang="scss" scoped></style>
