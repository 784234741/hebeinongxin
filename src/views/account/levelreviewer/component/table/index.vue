<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :btn-check-out="$attrs['btn-all'].btnCheckOut"
        @handleCheckOut="handleCheckOut"
      />
    </div>
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      @current-change="currentChange2"
      @pagination="getList"
    >
      <template slot="tableColumn">
        <el-table-column
          v-for="item in tableColumn"
          :key="item.id"
          :prop="item.name"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <div slot-scope="{ row }">
            <span v-if="item.name === 'organ_no'">{{ row[item.name] | organNameFormat }}</span>
            <span v-else-if="item.name === 'risk_type'">{{ row[item.name] | riskType }}</span>
            <span v-else-if="item.name === 'risk_level'">{{ row[item.name] | riskLevel }}</span>
            <span v-else-if="item.name === 'last_modi_date'">{{ row[item.name] | date10Format }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template></sun-table>

    <sun-table-dialog
      :title="dialog.title"
      :width="dialog.width"
      :top="dialog.top"
      :visible="dialog.visible"
      :table-column="dialog.tableColumn"
      :table-data="dialog.tableData"
      :btn-cancle="false"
      :btn-submit="false"
      @dialogClose="dialogClose"
      @currentChange="currentChange"
    >
      <template slot-scope="{ item, row }">
        <span v-if="item.name === 'organ_no'">{{ row[item.name] | organNameFormat }}</span>
        <span v-else-if="item.name === 'risk_type'">{{ row[item.name] | riskType }}</span>
        <span v-else-if="item.name === 'risk_level'">{{ row[item.name] | riskLevel }}</span>
        <span v-else-if="item.name === 'last_modi_date'">{{ row[item.name] | date10Format }}</span>
        <span v-else>{{ row[item.name] }}</span>
      </template>
      <div slot="rightBtn">
        <sun-button
          :btn-relieve="$attrs['btn-all'].btnRelieve"
          :btn-check-out="$attrs['btn-all'].btnCheckOut"
          @handleRelieve="handleRelieve"
          @handleCheckOut="handleCheckOut"
        />
      </div>
    </sun-table-dialog>

    <!-- <Des
      :title="dialog.title"
      :width="dialog.width"
      :top="dialog.top"
      :visible.sync="dialog.visible"
      :des-message="dialog.desLabelData"
      :des-data="dialog.desData"
    /> -->
  </div>
</template>
<script>
// import { dictionaryGet } from '@/utils/dictionary.js' // ????????????
// import { dateNowFormat } from '@/utils/date.js' // ???????????????

import { configTable } from './info' // ?????????????????????
import { SunTable, SunTableDialog, SunButton } from '@/components'
// import Des from '../des.vue'

import { RiskLevel } from '@/api'
import { commonMsgConfirm, commonMsgInfo, commonMsgSuccess, commonMsgWarn } from '@/utils/message'
const { riskLevel } = RiskLevel
export default {
  name: 'TableList',
  components: { SunTable, SunTableDialog, SunButton },
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
      label: {
        width: '15%',
        textAlign: 'right',
        paddingRight: '2rem'
      },
      content: {
        width: '18%'
      },
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      currentRow: [], // ?????????
      pageList: {
        totalNum: 0,
        page: 1, // ?????????
        pageSize: 20 // ?????????????????????
      },
      initData: {},
      dialog: {
        title: '????????????',
        width: '78%',
        top: '5vh',
        visible: false,
        tableColumn: configTable(),
        tableData: []
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
     * ???????????????*/
    queryList(currentPage) {
      this.showLoading()
      const formData = JSON.parse(JSON.stringify(this.defaultForm))
      const msg = {
        parameterList: [],
        ...formData,
        is_review: '1',
        oper_type: 'selectReason',
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize,
        organ_no: this.defaultForm.organ_no || `#${this.$store.getters.organNo}`
      }
      riskLevel(msg).then((response) => {
        const { returnList, totalNum } = response.retMap
        this.tableData = returnList
        this.pageList.totalNum = totalNum
        this.showLoading()
      })
    },
    currentChange2(val) {
      this.currentRow = val
    },
    // ??????
    handleCheckOut() {
      console.log(this.currentRow)
      const rows = this.currentRow
      if (rows === null) {
        commonMsgWarn('????????????????????????', this)
        return
      }
      commonMsgConfirm('??????????????????????????????', this, (flag) => {
        if (flag) {
          const msg = {
            parameterList: [{}],
            oper_type: 'checkRisk',
            acc_no: rows.acc_no,
            cus_no: rows.cus_no,
            cus_name: rows.cus_name,
            risk_type: rows.risk_type
          }
          riskLevel(msg).then((response) => {
            this.queryList(1) // ????????????
            commonMsgSuccess('?????????', this)
            this.dialog.visible = false
          })
        }
      })
    },
    /**
     * ????????? - ??????*/
    dialogSumbit() {
      const param = this.dialog2.oprate
      if (param === 'add') {
        this.dialogAddSubmit()
      } else {
        this.dialogEditSubmit()
      }
    },
    /**
     * ????????? - ?????? - ??????*/
    dialogAddSubmit() {
      const formData1 = Object.assign({}, this.dialog2.formData)
      const param = {
        'parameterList': [{
          ...formData1
        }],
        'oper_type': 'add'
      }
      riskLevel(param).then(response => {
        this.queryList(1) // ????????????
        commonMsgInfo('??????????????????', this, (param) => {
          if (param) {
            commonMsgSuccess(response.retMsg, this)
          }
        })
      }).catch(() => {
        this.showLoading()
      })
      this.changeVisible2()
    },
    // ????????????
    currentChange(val) {
      this.currentRow = val
    },
    /**
     * ????????? - ??????
     * @param {Boolean} param ???????????????????????????*/
    changeVisible(param) {
      this.dialog.visible = param
    },
    /**
     * ????????? - ??????
     * @param {Boolean} param ???????????????????????????*/
    changeVisible2(param) {
      this.dialog2.visible = param
    },
    /**
     *???????????? */
    getList(pageParam) {
      const { currentPage, pageSize } = pageParam
      this.pageList.pageSize = pageSize
      this.pageList.page = currentPage
      this.queryList()
    },
    /**
     * ?????????????????????*/
    showLoading() {
      this.listLoading = !this.listLoading
    },
    dialogClose() {
      this.changeVisible()
    },
    dialogClose2() {
      this.changeVisible2()
    }
  }
}
</script>
<style lang="scss" scoped></style>
