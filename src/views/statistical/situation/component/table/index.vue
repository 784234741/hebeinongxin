<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :btn-export="$attrs['btn-all'].btnExport"
        :btn-add="$attrs['btn-all'].btnAdd"
        :btn-delete="$attrs['btn-all'].btnDelete"
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
      :index-number="false"
      @pagination="getList"
      @current-change="currentChange"
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
        <el-table-column label="实现对非柜面额度采取不同级别管控情况">
          <el-table-column label="地方性银行">
            <el-table-column prop="non_cou_con_bank" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.non_cou_con_bank }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="non_cou_con_site" label="网点数">
              <div slot-scope="{ row }">
                <span>{{ row.non_cou_con_site }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="实现手机银行可疑交易人脸识别情况">
          <el-table-column label="地方性银行">
            <el-table-column prop="mob_sus_face_bank" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.mob_sus_face_bank }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="mob_sus_face_site" label="网点数">
              <div slot-scope="{ row }">
                <span>{{ row.mob_sus_face_site }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="实现网上银行可疑交易人脸识别情况">
          <el-table-column label="地方性银行">
            <el-table-column prop="online_sus_fac_bank" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.online_sus_fac_bank }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="online_sus_fac_site" label="网点数">
              <div slot-scope="{ row }">
                <span>{{ row.online_sus_fac_site }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="电子营业执照在企业开户环节的应用">
          <el-table-column label="地方性银行">
            <el-table-column prop="ele_bus_open_acc_bank" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.ele_bus_open_acc_bank }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="ele_bus_open_acc_site" label="网点数">
              <div slot-scope="{ row }">
                <span>{{ row.ele_bus_open_acc_site }}</span>
              </div>
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="ele_bus_open_acc_opac"
            label="累计开户数（户）"
          >
            <div slot-scope="{ row }">
              <span>{{ row.ele_bus_open_acc_opac }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="电子印章在企业开户环节的应用">
          <el-table-column label="地方性银行">
            <el-table-column prop="ele_seal_open_acc_bank" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.ele_seal_open_acc_bank }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="ele_seal_open_acc_site" label="网点数">
              <div slot-scope="{ row }">
                <span>{{ row.ele_seal_open_acc_site }}</span>
              </div>
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="ele_seal_open_acc_opac"
            label="累计开户数（户）"
          >
            <div slot-scope="{ row }">
              <span>{{ row.ele_seal_open_acc_opac }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="市场监管部门企业注册登记受理终端机具在银行网点布放情况"
        >
          <el-table-column label="地方性银行">
            <el-table-column prop="ent_reg_term_dep_bank" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.ent_reg_term_dep_bank }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="ent_reg_term_dep_site" label="网点数">
              <div slot-scope="{ row }">
                <span>{{ row.ent_reg_term_dep_site }}</span>
              </div>
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="ent_reg_term_dep_opac"
            label="累计开户数（户）"
          >
            <div slot-scope="{ row }">
              <span>{{ row.ent_reg_term_dep_opac }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="建立延长开户时间和拒绝开户复核机制">
          <el-table-column label="地方性银行">
            <el-table-column prop="pro_ope_ref_rev_bank" label="银行家数">
              <div slot-scope="{ row }">
                <span>{{ row.pro_ope_ref_rev_bank }}</span>
              </div>
            </el-table-column>
            <el-table-column prop="pro_ope_ref_rev_site" label="网点数">
              <div slot-scope="{ row }">
                <span>{{ row.pro_ope_ref_rev_site }}</span>
              </div>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本月延长开户时间复核">
          <el-table-column prop="mon_ext_ope_acc_a" label="账户数">
            <div slot-scope="{ row }">
              <span>{{ row.mon_ext_ope_acc_a }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="mon_ext_ope_acc_r" label="复核后不延长账户数">
            <div slot-scope="{ row }">
              <span>{{ row.mon_ext_ope_acc_r }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="proportion_one" label="占比">
            <div slot-scope="{ row }">
              <span>{{ row.proportion_one }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本年1月至本月延长开户时间复核">
          <el-table-column prop="year_ext_ope_acc_a" label="账户数">
            <div slot-scope="{ row }">
              <span>{{ row.year_ext_ope_acc_a }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="year_ext_ope_acc_r" label="复核后不延长账户数">
            <div slot-scope="{ row }">
              <span>{{ row.year_ext_ope_acc_r }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="proportion_two" label="占比">
            <div slot-scope="{ row }">
              <span>{{ row.proportion_two }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本月拒绝开户复核">
          <el-table-column prop="mon_ref_open_rev_a" label="账户数">
            <div slot-scope="{ row }">
              <span>{{ row.mon_ref_open_rev_a }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="mon_ref_open_rev_r" label="复核后开户数">
            <div slot-scope="{ row }">
              <span>{{ row.mon_ref_open_rev_r }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="proportion_three" label="占比">
            <div slot-scope="{ row }">
              <span>{{ row.proportion_three }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="本年1月至本月拒绝开户复核">
          <el-table-column prop="year_ref_open_rev_a" label="账户数">
            <div slot-scope="{ row }">
              <span>{{ row.year_ref_open_rev_a }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="year_ref_open_rev_r" label="复核后开户数">
            <div slot-scope="{ row }">
              <span>{{ row.year_ref_open_rev_r }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="proportion_four" label="占比">
            <div slot-scope="{ row }">
              <span>{{ row.proportion_four }}</span>
            </div>
          </el-table-column>
        </el-table-column>
      </template></sun-table>
    <sun-forms-dialog
      :title="dialog.title"
      :visible="dialog.visible"
      :form-config="dialog.config"
      :top="dialog.top"
      :width="dialog.width"
      :label-width="dialog.labelWidth"
      @dialogClose="changeVisible"
      @dialogSubmit="dialogSumbit"
    /><!--新增、修改弹出框-->
  </div>
</template>

<script>
import { organNameFormat } from '@/filters'
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm
} from '@/utils/message.js' // 提示信息
import waves from '@/directive/waves' // waves directive
import { config } from './info' // 表头配置
import { SunTable, SunButton, SunFormsDialog } from '@/components' // 按钮 页码
import { SaSituation } from '@/api'
const { query, Addquery } = SaSituation
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
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
      downloadLoading: false,
      tableData: [],
      currentRow: null,
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      },
      currentIndex: 0,
      dialog: {
        title: '新增',
        top: '5vh',
        width: '98%',
        visible: false,
        oprate: 'add',
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
    handleDelete() {
      if (!this.currentRow) {
        commonMsgWarn('请选择要删除的数据', this)
        return
      }
      const del = (flag) => {
        if (flag) {
          const { organ_no, count_month } = this.currentRow
          const msg = {
            parameterList: [{}],
            oper_type: 'del',
            organ_no,
            count_month
          }

          // add
          query(msg)
            .then((response) => {
              this.queryList()
              commonMsgSuccess(response.retMsg, this)
            })
            .catch(() => {})
        }
      }

      commonMsgConfirm('确认删除该数据', this, del)
    },
    currentChange(val) {
      this.currentRow = val
    },
    /**
     *页码更新 */
    getList() {
      this.queryList(this.pageList.page)
    },
    changeVisible(param) {
      this.dialog.visible = param
    },
    dialogSumbit(data) {
      const msg = {
        parameterList: [
          {
            ...data,
            count_month: data.count_month
          }
        ],
        oper_type: 'OP001',
        organ_no: this.$store.getters.organNo
      }
      Addquery(msg).then((res) => {
        commonMsgSuccess(res.retMsg, this)
        this.queryList()
      })
      this.changeVisible(false)
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      const formData = this.defaultForm
      this.showLoading()
      const msg = {
        parameterList: [{}],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        count_month: formData.open_mon,
        organ_no: formData.organ_no || this.$store.getters.organNo,
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      // query
      query(msg).then((response) => {
        const {
          retMap: { returnList, totalNum }
        } = response
        this.tableData = returnList
        this.pageList.totalNum = totalNum
        this.showLoading()
      })
    },
    /**
     * btn - 下载excel*/
    handleExport() {
      // this.downloadLoading = true
      import('@/components/Vendor/Export2Excel').then((excel) => {
        const multiHeader = [
          [
            '填报机构',
            '统计月份',
            '实现对非柜面额度采取不同级别管控情况',
            '',
            '实现手机银行可疑交易人脸识别情况',
            '',
            '实现网上银行可疑交易人脸识别情况',
            '',
            '电子营业执照在企业开户环节的应用',
            '',
            '',
            '电子印章在企业开户环节的应用',
            '',
            '',
            '市场监管部门企业注册登记受理终端机具在银行网点布放情况',
            '',
            '',
            '建立延长开户时间和拒绝开户复核机制',
            '',
            '本月延长开户时间复核',
            '',
            '',
            '本年1月至本月延长开户时间复核',
            '',
            '',
            '本月拒绝开户复核',
            '',
            '',
            '本年1月至本月拒绝开户复核'
          ]
        ]
        const head = [
          '',
          '',
          '银行家数',
          '网点数',
          '银行家数',
          '网点数',
          '银行家数',
          '网点数',
          '银行家数',
          '网点数',
          '',
          '银行家数',
          '网点数',
          '',
          '银行家数',
          '网点数',
          '',
          '银行家数',
          '网点数',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          ''
        ]
        const header = [
          '',
          '',
          '地方性银行',
          '',
          '地方性银行',
          '',
          '地方性银行',
          '',
          '地方性银行',
          '',
          '累计开户数',
          '地方性银行',
          '',
          '累计开户数',
          '地方性银行',
          '',
          '累计开户数',
          '地方性银行',
          '',
          '账户数',
          '复核后不延长账户数',
          '占比',
          '账户数',
          '复核后不延长账户数',
          '占比',
          '账户数',
          '复核后开户数',
          '占比',
          '账户数',
          '复核后开户数',
          '占比'
        ]
        const filterVal = [
          'organ_no',
          'count_month',
          'non_cou_con_bank',
          'non_cou_con_site',
          'mob_sus_face_bank',
          'mob_sus_face_site',
          'online_sus_fac_bank',
          'online_sus_fac_site',
          'ele_bus_open_acc_bank',
          'ele_bus_open_acc_site',
          'ele_bus_open_acc_opac',
          'ele_seal_open_acc_bank',
          'ele_seal_open_acc_site',
          'ele_seal_open_acc_opac',
          'ent_reg_term_dep_bank',
          'ent_reg_term_dep_site',
          'ent_reg_term_dep_opac',
          'pro_ope_ref_rev_bank',
          'pro_ope_ref_rev_site',
          'mon_ext_ope_acc_a',
          'mon_ext_ope_acc_r',
          'proportion_one',
          'year_ext_ope_acc_a',
          'year_ext_ope_acc_r',
          'proportion_two',
          'mon_ref_open_rev_a',
          'mon_ref_open_rev_r',
          'proportion_three',
          'year_ref_open_rev_a',
          'year_ref_open_rev_r',
          'proportion_four'
        ]
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        // const data = this.tableData
        const merges = [
          'A1:A3',
          'B1:B3',
          'C1:D1',
          'C2:D2',
          'E1:F1',
          'E2:F2',
          'G1:H1',
          'G2:H2',
          'I1:K1',
          'I2:J2',
          'K2:K3',
          'L1:N1',
          'L2:M2',
          'N2:N3',
          'O1:Q1',
          'O2:P2',
          'Q2:Q3',
          'R1:S1',
          'R2:S2',
          'T1:V1',
          'T2:T3',
          'U2:U3',
          'V2:V3',
          'W1:Y1',
          'W2:W3',
          'X2:X3',
          'Y2:Y3',
          'Z1:AB1',
          'Z2:Z3',
          'AA2:AA3',
          'AB2:AB3',
          'AC1:AE1',
          'AC2:AC3',
          'AD2:AD3',
          'AE2:AE3'
        ]
        const filename = '账户情况统计'
        excel.export_json_to_excel2({
          multiHeader,
          head,
          header,
          merges,
          data,
          filename
        })
        // this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === 'organ_no') {
            // 过滤器在这里加
            return organNameFormat(v[j])
            // 过滤器在这里加
          } else {
            return v[j]
          }
        })
      )
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
