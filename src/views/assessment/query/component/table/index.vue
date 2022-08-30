<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :btn-add="$attrs['btn-all'].btnAdd"
        :btn-delete="$attrs['btn-all'].btnDelete"
        @handleAdd="handleAdd"
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
            <span
              v-if="item.name === 'detail'"
              :style="{color: $store.state.settings.theme, cursor: 'pointer'}"
              @click="openDialog(row)"
            >{{ '详情' }}</span>
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
    <sun-dialog-self
      :title="dialog2.title"
      :visible="dialog2.visible"
      width="96%"
      top="5vh"
      :btn-alls="$attrs['btn-all']"
      @dialogClose="changeVisible2"
      @dialogSubmit="dialogSumbit2"
    >
      <div class="scroe_dialog">
        <el-table
          :data="dialog2.tableData2"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px"
          height="450"
        >
          <el-table-column
            v-for="item in dialog2.tableColumn2"
            :key="item.id"
            :prop="item.name"
            :label="item.label"
            :width="item.width"
          >
            <div slot-scope="{ row }">
              <span v-if="item.name === 'check_score'">
                <el-input v-model="row[item.name]" />
              </span>
              <span v-else-if="item.name === 'score_reason'">
                <el-input v-model="row[item.name]" />
              </span>
              <span v-else>{{ row[item.name] }}</span>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </sun-dialog-self>
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm
} from '@/utils/message.js' // 提示信息
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
// import { dateNowFormat } from '@/utils/date.js' // 日期格式化
import Moment from 'moment'

import { configTable, configTable2, config } from './info' // 表头、表单配置
import { SunButton, SunTable, SunFormDialog } from '@/components'
import SunDialogSelf from '@/components/Dialog/SunDialogSelf'

import { SysAssessment } from '@/api'
const { accManageCheck } = SysAssessment
export default {
  name: 'AssessmentTableList',
  components: { SunTable, SunFormDialog, SunButton, SunDialogSelf },
  props: {
    defaultForm: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  // dialog2.tableData2[parseInt(row.ID) - 1].score_reason
  data() {
    return {
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      currentRow: null, // 选中行
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
          create_year: ''
        },
        config: config(this)
      },
      dialog2: {
        title: '查看详情',
        width: '100%',
        visible: false,
        tableColumn2: configTable2(),
        tableData2: [
          {
            id: '1',
            check_item: '制度建设（15分）',
            check_content: '制定企业账户业务处理流程',
            check_require:
              '制定切实可行的企业账户业务处理流程和账户资料审核机制，消除冗余环节，并将账户事项、办理手续、审核流程在各营业网点公示。',
            item_score: '5',
            check_standard:
              '未制定账户业务处理流程和账户审核机制的，扣5分；未在营业网点公示的，每发现一个网点扣1分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '2',
            check_item: '制度建设（15分）',
            check_content: '建立健全账户资料交接登记制度',
            check_require:
              '建立健全账户资料交接登记制度，记录账户业务受理、资料审核、资料交接及账户后备案时间和经办人员。',
            item_score: '5',
            check_standard:
              '未建立账户资料交接登记制度的，扣5分；制度不健全的或者未按制度情况执行的，酌情扣1-5分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '3',
            check_item: '制度建设（15分）',
            check_content: '建立健全账户工作内控制度',
            check_require:
              '消息报送、业务咨询、宣传辅导、投诉处理、系统安全管理等方面的账户服务内部管理制度应健全，并在业务发生变化时及时进行修订和完善。',
            item_score: '5',
            check_standard:
              '未建立相关内控制度的，每少一项扣2分，未及时修订和完善内控制度的扣2分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '4',
            check_item: '日常管理（20分）',
            check_content: '明确账户工作部门及人员',
            check_require:
              '根据账户工作的具体内容明确归口管理部门及对口业务部门、落实具体工作人员，负责本行（社）账户管理具体工作。',
            item_score: '5',
            check_standard:
              '未明确账户工作组织机构扣1分；未落实具体工作人员负责账户管理工作，扣1分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '5',
            check_item: '日常管理（20分）',
            check_content: '定期对账户业务检查和考核',
            check_require:
              '各分行至少每半年对辖内机构营业网点账户业务进行一次检查和考核，确保各项账户管理制度得到有效执行。每季度至少一次对企业账户进行对账，对账核对结果不一致的是否及时查明原因并进行有效控制。日常监测或每季度不定期登陆国家企业信用信息公示系统核实企业情况。',
            item_score: '5',
            check_standard:
              '未按要求对账户业务进行检查和考核的，未定期对账的，核对结果不一致的未及时查明原因的，对应对账未对账情况未进行有效控制的，酌情扣1-5分。\t',
            check_score: '',
            score_reason: ''
          },

          {
            id: '6',
            check_item: '日常管理（20分）',
            check_content: '明确账户工作部门及人员',
            check_require:
              '各账户行（社）账户业务所归口管理部门、人员情况应及时向上级管理机构和人民银行备案，并在相关情况发生变化时告知人民银行账户业务管理部门；已进行集中办理账户业务的账户行（社）指定专人向人民银行报送相关账户资料。',
            item_score: '10',
            check_standard:
              '账户工作组织机构、部门和人员变动后未及时报送上级管理机构和当地人民银行备案，每次扣2分；集中办理账户的账户行（社）未指定专人办理业务的扣1分；未落实账户专管员制度的每次扣1分。\t',
            check_score: '',
            score_reason: ''
          },
          {
            id: '7',
            check_item: '系统管理（15分）',
            check_content: '系统建设',
            check_require: '按工作要求完成系统升级换版及系统推广等工作。',
            item_score: '5',
            check_standard: '未按要求完成各项工作，根据造成影响情况扣1-5分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '8',
            check_item: '系统管理（15分）',
            check_content: '运维管理',
            check_require:
              '按照业务规定，加强对人民币银行结算账户管理系统安全运行管理；及时办理银行机构代码和系统管理员相关信息维护工作；做好操作员的用户名、密码保管和交接登记。',
            item_score: '5',
            check_standard:
              '因日常维护工作不到位或操作失误，影响系统正常运行的，根据造成影响情况扣1到5分；操作员口令和密码不按规定进行交接和变更，造成密码遗忘或丢失，影响正常业务开展的，每次扣1分；相关信息发生变更时，未及时报送人民银行进行银行机构代码信息维护的，每次扣1分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '9',
            check_item: '系统管理（15分）',
            check_content: '应急管理',
            check_require:
              '建立健全系统应急处置预案，及时上报突发事件，并及时进行应急处置。',
            item_score: '5',
            check_standard:
              '未建立应急管理机制或者应急管理机制不健全的扣5分，突发事件处置不及时或不当的每次扣1分，未及时上报突发事件，导致不良影响的每次扣1分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '10',
            check_item: '业务管理（40分）',
            check_content: '业务人员岗位设置',
            check_require:
              '各营业网点有专人负责银行结算账户业务的审查和管理，并建立岗位责任制，业务实行双人复核制度，对企业提交的账户申请资料的真实性、完整性和合规性进行双人审查，并签章予以确认。',
            item_score: '10',
            check_standard:
              '各网点未指定专人办理账户业务的，经查实一个网点扣2分，未落实双人复核制度的扣1分，对企业提交的账户申请资料的真实性、完整性和合规性审查不充分的，每个账户扣1分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '11',
            check_item: '业务管理（40分）',
            check_content: '业务咨询投诉',
            check_require:
              '营业网点指定专人负责账户业务知识的柜面宣传和咨询；各网点应在显著位置公示举报投诉电话，要指定专人及时、妥善处置社会公众的投诉和举报。',
            item_score: '10',
            check_standard:
              '各网点未指定专人负责账户业务知识的柜面宣传和咨询的，经查实一个网点扣1分；各网点未指定专人的，经查实一个网点扣1分，未能妥善处置社会公众的投诉和举报的，发现一次扣1分；各行（社）被投诉一次，扣3分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '12',
            check_item: '业务管理（40分）',
            check_content: '业务办理',
            check_require:
              '各行（社）要在受理企业账户申请之日起2个工作日内完成核实客户意愿、尽职调查、对账户资料的审核等工作，在企业提交账户资料齐全的情况下，以最快时间完成账户业务；对需上门核实或面签法定代表人的企业及时开展上门核实或面签，确保资料审核与上门核实或面签等环节紧密衔接；在人民币银行结算账户管理系统核实企业基本存款账户唯一性；登陆国家企业信用信息公示系统核实企业真实经营状况、企业变更情况，落实企业银行账户实名制；账户开立、变更或销户后，应及时在账户管理系统完成备案并保证备案信息准确，并在两个工作日内将账户资料复印10件或影像报送至当地人民银行分支机构；临时存款账户到期应及时办理延期或销户业务。',
            item_score: '10',
            check_standard:
              '按照业务规定，银行在受理企业账户申请之日起2个工作日内未完成核实客户意愿、尽职调查、对账户资料的审核等工作，每个账户扣1分；对需上门核实或面签法定代表人的企业未及时开展上门核实或面签的，每个账户扣1分；未在人民币银行结算账户管理系统核实企业基本存款账户唯一性每个账户扣3分；未登陆国家企业信用信息公示系统核实企业真实经营状况、企业变更情况，落实企业银行账户实名制每个账户扣3分；未及时在账户管理系统进行备案的或备案信息不准确的，每个账户扣1分；分数扣完为止。临时存款账户到期未及时办理延期或销户业务的，每个账户扣3分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '13',
            check_item: '业务管理（40分）',
            check_content: '业务培训',
            check_require:
              '定期组织开展账户业务培训，积极推动人行41号文件的落实，并开展相关学习、宣传、培训；积极参加上级联社组织的账户业务宣传。',
            item_score: '5',
            check_standard:
              '未定期组织开展账户业务培训的，扣1分；未对企业账户岗位变更人员开展培训的扣1分；未采取有效措施推动41号文件和分类账户管理制度的，扣2分；未配合上级行社开展账户业务宣传的扣2分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '14',
            check_item: '业务管理（40分）',
            check_content: '账户信息与调研等其他工作',
            check_require:
              '及时分析、总结账户业务中的问题及经验，并提出合理化建议；及时完成上级联社要求的信息反馈、征求意见、工作调研及其他工作安排。',
            item_score: '5',
            check_standard:
              '不配合上级联社开展业务和系统信息调研的，扣2分；未及时报送相关信息或报送信息质量不符合要求的，每次扣2分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '15',
            check_item: '日常反馈（10分）',
            check_content: '日常反馈',
            check_require:
              '各行（社）按照文件规定办理业务的情况；对报送资料认真审核，减少报送差错率；对企业疑义认真做好解释工作，避免产生纠纷。',
            item_score: '10',
            check_standard:
              '存在违规办理业务的情况，查到一次，扣5分；以每个季度差错率统计为准，报送资料差错率较高的，一个季度扣2分；与企业产生纠纷并被投诉的，一次扣3分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '16',
            check_item: '加分项（1-10分）',
            check_content: '积极采取措施，提升开户质量的，酌情加分。',
            check_require:
              '积极采取各种措施，提升账户服务与管理水平、优化企业开户服务并取得成效的，可酌情加分。',
            item_score: '10',
            check_standard: '积极采取措施，起到突出效果的，视情况加1-10分。',
            check_score: '',
            score_reason: ''
          },
          {
            id: '17',
            check_item: '不得分项（0分）',
            check_content:
              '影响系统运行等重大风险事件的；发生资金安全事故或出现较大负面舆情，在社会上造成不良影响的。',
            check_require:
              '账户行（社）违反规定为企业开立多头基本存款账户的；账户行（社）开立匿名、假名账户或者与身份不明的企业进行交易的；账户行（社）明知企业出租、出借、出售、购买银行账户未加制止，仍为其办理支付业务的。',
            item_score: '',
            check_standard: '企业账户服务考核不得分。',
            check_score: '',
            score_reason: ''
          }
        ],
        defaulDialogForm: [
          {
            check_score: '5',
            score_reason: ''
          },
          {
            check_score: '5',
            score_reason: ''
          },
          {
            check_score: '5',
            score_reason: ''
          },
          {
            check_score: '5',
            score_reason: ''
          },
          {
            check_score: '5',
            score_reason: ''
          },
          {
            check_score: '5',
            score_reason: ''
          },

          {
            check_score: '5',
            score_reason: ''
          },
          {
            check_score: '5',
            score_reason: ''
          },
          {
            check_score: '5',
            score_reason: ''
          },
          {
            check_score: '5',
            score_reason: ''
          }
        ],
        loadingTable: ''
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
    input(e) {
      console.log(e)
    },
    // 合并表格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex <= 13) {
          if (rowIndex === 0 || rowIndex === 3 || rowIndex === 6) {
            return {
              rowspan: 3,
              colspan: 1
            }
          } else if (rowIndex === 9) {
            return {
              rowspan: 5,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
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
        parameterList: [],
        ...this.defaultForm,
        organ_no:
          this.defaultForm.organ_no || `#${this.$store.getters.organNo}`,
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize
      }
      // query
      accManageCheck(msg).then((response) => {
        const { returnList, totalNum } = response.retMap
        this.tableData = returnList
        this.pageList.totalNum = totalNum
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
    }, // handleAdd
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
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    }, // handleAdd
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible2(param) {
      this.dialog2.visible = param
    }, // handleAdd
    /**
     * 弹出框 - add确认*/
    dialogSumbit() {
      this.showLoading()
      const msg = {
        parameterList: [],
        ...this.dialog.formData,
        create_year: Moment(this.dialog.formData.create_year, 'YYYY').format(
          'YYYY'
        ),
        oper_type: 'add'
      }
      // add
      accManageCheck(msg)
        .then((response) => {
          this.showLoading()
          this.queryList()
          commonMsgSuccess(response.retMsg, this)
        })
        .catch(() => {
          this.showLoading()
        })
      this.changeVisible(false)
    },
    // 打分确定
    dialogSumbit2() {
      this.showLoading()
      const msg = {
        parameterList: [],
        oper_type: 'add_relate',
        organ_no: this.currentRow.organ_no,
        datas: [...this.dialog2.tableData2],
        relate_id: this.currentRow.relate_id
      }

      // add
      accManageCheck(msg)
        .then((response) => {
          this.showLoading()
          this.queryList()
          commonMsgSuccess(response.retMsg, this)
          this.changeVisible2(false)
        })
        .catch(() => {
          this.showLoading()
        })
    },
    // 删除
    handleDelete() {
      if (!this.currentRow) {
        commonMsgWarn('请选择要删除的数据', this)
        return
      }
      const del = (flag) => {
        if (flag) {
          const { organ_no, create_year } = this.currentRow
          const msg = {
            parameterList: [{}],
            oper_type: 'del',
            organ_no,
            create_year
          }

          // add
          accManageCheck(msg)
            .then((response) => {
              this.queryList()
              commonMsgSuccess(response.retMsg, this)
            })
            .catch(() => {})
        }
      }

      commonMsgConfirm('确认删除该数据', this, del)
    },
    // 打开弹框
    openDialog(row) {
      this.currentRow = row
      const msg = {
        parameterList: [],
        oper_type: 'select_grade',
        relate_id: row.relate_id
      }
      accManageCheck(msg).then((res) => {
        const {
          retMap: { list }
        } = res
        this.dialog2.tableData2.forEach((item, index) => {
          item.check_score = list[index].CHECK_SCORE
          item.score_reason = list[index].SCORE_REASON
        })
        this.changeVisible2(true)
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
.scroe_dialog {
  // height: 66vh;
  overflow: auto;
  ::v-deep .el-input__inner {
    border: none !important;
  }
}
</style>
