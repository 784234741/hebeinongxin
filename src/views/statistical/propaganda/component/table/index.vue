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
        <el-table-column prop="organ_no" label="填报机构" width="200" align="center">
          <div slot-scope="{ row }">
            <span>{{ row.organ_no | organNameFormat }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="count_month" label="统计月份">
          <div slot-scope="{ row }">
            <span>{{ row.count_month }}</span>
          </div>
        </el-table-column>
        <el-table-column
          prop="trad_media_pub"
          label="通过广播、电视、报刊传统媒体宣传（次）"
          width="170"
        >
          <div slot-scope="{ row }">
            <span>{{ row.trad_media_pub }}</span>
          </div>
        </el-table-column>
        <el-table-column
          prop="new_media_pub"
          label="通过官网、微信公众号等新兴媒体宣传（次)"
          width="170"
        >
          <div slot-scope="{ row }">
            <span>{{ row.new_media_pub }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="propaganda" label="现场宣传">
          <div slot-scope="{ row }">
            <span>{{ row.propaganda }}</span>
          </div>
        </el-table-column>
        <el-table-column
          prop="other_special_pub"
          label="其它特殊宣传（次)"
          width="90"
        >
          <div slot-scope="{ row }">
            <span>{{ row.other_special_pub }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="cover_people" label="覆盖人次">
          <div slot-scope="{ row }">
            <span>{{ row.cover_people }}</span>
          </div>
        </el-table-column>
        <el-table-column label="断卡”行动专题宣传(线上)">
          <el-table-column prop="times_one" label="次数" width="90">
            <div slot-scope="{ row }">
              <span>{{ row.times_one }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="cover_people_one" label="覆盖人次" width="90">
            <div slot-scope="{ row }">
              <span>{{ row.cover_people_one }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="断卡”行动专题宣传(线下)">
          <el-table-column prop="times_two" label="次数" width="90">
            <div slot-scope="{ row }">
              <span>{{ row.times_two }}</span>
            </div>
          </el-table-column>
          <el-table-column prop="cover_people_two" label="覆盖人次" width="90">
            <div slot-scope="{ row }">
              <span>{{ row.cover_people_two }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <el-table-column label="优化服务宣传" align="center">
          <el-table-column
            prop="local_publicity"
            label="在经济园区、孵化器、高校等实地宣传（次）"
            width="170"
          >
            <div slot-scope="{ row }">
              <span>{{ row.local_publicity }}</span>
            </div>
          </el-table-column>
          <el-table-column
            prop="official_publicity"
            label="官网和微信公众号（篇）"
            width="170"
          />
          <el-table-column prop="media_publicity" label="媒体(篇)">
            <div slot-scope="{ row }">
              <span>{{ row.media_publicity }}</span>
            </div>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column
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
        </el-table-column> -->
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
    >
      <template slot="empty"> lwlwlwlwlwl </template> </sun-forms-dialog><!--新增、修改弹出框-->
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
import { SunTable, SunButton, SunFormsDialog } from '@/components' // 按钮 页码
import { SaPropaganda } from '@/api'
import { config } from './info'
const { query, publicityWork } = SaPropaganda
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
          publicityWork(msg)
            .then((response) => {
              this.queryList()
              commonMsgSuccess(response.retMsg, this)
            })
            .catch(() => {})
        }
      })
    },
    currentChange(val) {
      this.currentRow = val
    },
    handleExport() {
      // this.downloadLoading = true
      import('@/components/Vendor/Export2Excel').then((excel) => {
        const multiHeader = [
          [
            '填报机构',
            '统计月份',
            '通过广播、电视、报刊传统媒体宣传（次）',
            '通过官网、微信公众号等新兴媒体宣传（次）',
            '现场宣传（次）',
            '其它特殊宣传（次）',
            '覆盖人次（人）',
            '断卡”行动专题宣传(线上)',
            '',
            '断卡”行动专题宣传(线下)',
            '',
            '优化服务宣传',
            '',
            ''
          ]
        ]
        const header = [
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '次数',
          '覆盖人次',
          '次数',
          '覆盖人次',
          '在经济园区、孵化器、高校等实地宣传（次）',
          '官网和微信公众号（篇）',
          '媒体（篇）'
        ]
        const filterVal = [
          'organ_no',
          'count_month',
          'trad_media_pub',
          'new_media_pub',
          'propaganda',
          'other_special_pub',
          'cover_people',
          'times_one',
          'cover_people_one',
          'times_two',
          'cover_people_two',
          'local_publicity',
          'official_publicity',
          'media_publicity'
        ]
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        // const data = this.tableData
        const merges = [
          'A1:A2',
          'B1:B2',
          'C1:C2',
          'D1:D2',
          'E1:E2',
          'F1:F2',
          'G1:G2',
          'H1:I1',
          'J1:K1',
          'L1:N1'
        ]
        const filename = '宣传工作情况统计'
        excel.export_json_to_excel({
          multiHeader,
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
        oper_type: 'OPERATE_ADD',
        organ_no: this.$store.getters.organNo
      }
      publicityWork(msg).then((res) => {
        commonMsgSuccess(res.retMsg, this)
        this.queryList()
      })
      this.changeVisible(false)
    },
    // handleAdd
    /**
     * btn - 下载excel*/
    /* handleDownload(event) {
      if (event === 'all') {
        this.tableData = []
      } else if (event === 'page') {
        this.tableData = []
      }
      this.$refs.buttonExport.componentExport(this.header, this.tableData)
    }, */
    /**
     * 加载中动画配置*/
    showLoading() {
      this.listLoading = !this.listLoading
    }
  }
}
</script>
<style lang="scss" scoped></style>
