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
        <el-table-column label="本月抽查暗访银行数量">
          <el-table-column label="地方性银行" align="center">
            <el-table-column prop="thismonth_visit_bank_num" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.thismonth_visit_bank_num }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="thismonth_visit_network_num" label="网点数">
              <div slot-scope="{ row }">
                <span>{{ row.thismonth_visit_network_num }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="抽查暗访结果">
          <el-table-column
            prop="thismonth_visit_result_num"
            label="存在问题网点数"
          >
            <div slot-scope="{ row }">
              <span>{{ row.thismonth_visit_result_num }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本年1月至本月抽查暗访银行数量">
          <el-table-column label="地方性银行" align="center">
            <el-table-column prop="tothismonth_visit_bank_num" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.tothismonth_visit_bank_num }}</span>
              </div>
            </el-table-column>
            <el-table-column
              prop="tothismonth_visit_network_num"
              label="网点数"
            >
              <div slot-scope="{ row }">
                <span>{{ row.tothismonth_visit_network_num }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="抽查暗访结果">
          <el-table-column
            prop="tothismonth_visit_result_num"
            label="存在问题网点数"
          >
            <div slot-scope="{ row }">
              <span>{{ row.tothismonth_visit_result_num }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="账户服务相关问责情况" align="center">
          <el-table-column label="银行内部督导问责情况" align="center">
            <el-table-column prop="notice_person" label="通报人员（人）">
              <div slot-scope="{ row }">
                <span>{{ row.notice_person }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="notice_network" label="通报网点（个）">
              <div slot-scope="{ row }">
                <span>{{ row.notice_network }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="reduce_performance" label="扣减绩效（人次）">
              <div slot-scope="{ row }">
                <span>{{ row.reduce_performance }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="adjust_position" label="调整职务（人次）">
              <div slot-scope="{ row }">
                <span>{{ row.adjust_position }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="remove_position" label="解除职务（人次）">
              <div slot-scope="{ row }">
                <span>{{ row.remove_position }}</span>
              </div>
            </el-table-column>
          </el-table-column>
          <el-table-column label="人民银行问责" align="center">
            <el-table-column prop="interview_network" label="约谈网点">
              <div slot-scope="{ row }">
                <span>{{ row.interview_network }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="punish_network" label="处罚网点">
              <div slot-scope="{ row }">
                <span>{{ row.punish_network }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="punish_cash" label="处罚金额">
              <div slot-scope="{ row }">
                <span>{{ row.punish_cash }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="负面清单公示情况">
          <el-table-column label="地方性银行" align="center">
            <el-table-column prop="publish_negative_bank_num" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.publish_negative_bank_num }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="publish_negative_network_num" label="网点数">
              <div slot-scope="{ row }">
                <span>{{ row.publish_negative_network_num }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="公示服务监督电话">
          <el-table-column label="地方性银行" align="center">
            <el-table-column prop="publish_tel_bank_num" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.publish_tel_bank_num }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="publish_tel_network_num" label="网点数">
              <div slot-scope="{ row }">
                <span>{{ row.publish_tel_network_num }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="企业账户服务“三公开”公示情况">
          <el-table-column label="地方性银行" align="center">
            <el-table-column
              prop="company_publish_three_bank_num"
              label="银行家数"
            >
              <div slot-scope="{ row }">
                <span>{{ row.company_publish_three_bank_num }}</span>
              </div>
            </el-table-column>
            <el-table-column
              prop="company_publish_three_network"
              label="网点数"
            >
              <div slot-scope="{ row }">

                <span>{{ row.company_publish_three_network }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="个人账户服务“三公开”公示情况">
          <el-table-column label="地方性银行" align="center">
            <el-table-column
              prop="person_publish_three_bank_num"
              label="银行家数"
            >
              <div slot-scope="{ row }">
                <span>{{ row.person_publish_three_bank_num }}</span>
              </div>
            </el-table-column>
            <el-table-column

              prop="person_publish_three_network"
              label="网点数"
            >
              <div slot-scope="{ row }">

                <span>{{ row.person_publish_three_network }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="账户服务和风险防控同时纳入网点和员工业绩考核银行家数"
        >
          <el-table-column prop="acc_bank_no" label="地方性银行" align="center">
            <div slot-scope="{ row }">
              <span>{{ row.acc_bank_no }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="取消个人开户数量和非柜面业务签约量考核银行家数">
          <el-table-column prop="dis_bank_no" label="地方性银行" align="center">
            <div slot-scope="{ row }">
              <span>{{ row.dis_bank_no }}</span>
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
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm
} from '@/utils/message.js' // 提示信息
import waves from '@/directive/waves' // waves directive
import { config, configTable } from './info' // 表头、表单配置
import { SunTable, SunButton, SunFormsDialog } from '@/components' // 按钮 页码
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { Staacc } from '@/api'
import { organNameFormat } from '@/filters'
import { exportXlsx } from '@/utils/common'
const { query, add, del } = Staacc
export default {
  name: 'TableList',
  components: { SunTable, SunButton, SunFormsDialog },
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
      currentRow: null,
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
        // formData: {
        //   count_month: '',
        //   thismonth_visit_bank_num: '',
        //   thismonth_visit_network_num: '',
        //   thismonth_visit_result_num: '',
        //   tothismonth_visit_bank_num: '',
        //   tothismonth_visit_network_num: '',
        //   tothismonth_visit_result_num: '',
        //   notice_person: '',
        //   notice_network: '',
        //   reduce_performance: '',
        //   adjust_position: '',
        //   remove_position: '',
        //   interview_network: '',
        //   punish_network: '',
        //   punish_cash: '',
        //   publish_negative_bank_num: '',
        //   publish_negative_network_num: '',
        //   publish_tel_bank_num: '',
        //   publish_tel_network_num: '',
        //   company_publish_three_bank_num: '',
        //   company_publish_three_network_num: '',
        //   person_publish_three_bank_num: '',
        //   person_publish_three_network_num: '',
        //   acc_bank_no: '',
        //   dis_bank_no: '',
        //   organ_no: ''
        // },
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
     *页码更新 */
    getList() {
      this.queryList(this.pageList.page)
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
      this.dialog.dialog = Object.assign({}, this.dialog, {
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
    }, // handleAd
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
          del(msg)
            .then((response) => {
              this.queryList(1)
              commonMsgSuccess(response.retMsg, this)
            })
            .catch(() => {})
        }
      })
    },
    currentChange(val) {
      this.currentRow = val
    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    }, // handleAdd
    /**
     * 弹出框 - 确认*/
    dialogSumbit(data) {
      const msg = {
        parameterList: [
          {
            ...data,
            count_month: data.count_month
          }
        ],
        oper_type: dictionaryGet('OPERATE_ADD'),
        organ_no: this.$store.getters.organNo
      }
      add(msg).then((res) => {
        this.queryList(1)
        commonMsgSuccess(res.retMsg, this)
      })
      this.changeVisible(false)
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
      exportXlsx(tHeader, data, '账户服务管理统计表')
    },
    /**
     * 加载中动画配置*/
    showLoading() {
      // this.listLoading = !this.listLoading
    }
  }
}
</script>
<style lang="scss" scoped></style>
