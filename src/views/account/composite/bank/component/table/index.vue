<template>
  <div class="sun-content">
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
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
            <span v-if="item.name === 'open_organ'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span v-else-if="item.name === 'cus_name'" class="jobServer" :style="{color: $store.state.settings.theme}">
              {{ row[item.name] }}
            </span>
            <span v-else-if="item.name === 'start_date'">{{
              row[item.name] | date10Format
            }}</span>
            <span
              v-else-if="item.name === 'status'"
              :style="row[item.name] === '正常' ? {color: $store.state.settings.theme} : {color: 'red'}"
            >{{ row[item.name] }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template></sun-table>
    <all-views
      :visible="dialog2.visible"
      :title="dialog2.title"
      :width="dialog2.width"
      :height="dialog2.height"
      :top="dialog2.top"
      :row="currentRow"
      :tab-arr="dialog2.tabArr"
      @dialogClose="changeVisible2"
    >
      <template slot-scope="{ data, config, allData }">
        <div v-if="data.type === 'describe'">
          <div
            v-for="(item, index) in config[data.name].message"
            :key="item.title + index"
            :style="boxStyle"
          >
            <el-descriptions
              :title="item.title"
              :column="3"
              :label-style="{
                color: '#354052'
              }"
              :content-style="{
                paddingLeft: '6px',
                color: '#767e91'
              }"
            >
              <el-descriptions-item
                v-for="item2 in item.arr"
                :key="item2.name"
                :label="item2.label"
              >
                {{ allData[data.name][item2.name] }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div v-else-if="data.type === 'table'">
          <sun-table
            :table-ref="data.name + 'tableRef'"
            :table-data="allData[data.name].tableData"
            :loading="allData[data.name].listLoading"
          >
            <template slot="tableColumn">
              <el-table-column
                v-for="item in allData[data.name].tableColumn"
                :key="item.id"
                :prop="item.name"
                :label="item.label"
                :width="item.width"
              >
                <div slot-scope="{ row }">
                  <span v-if="item.name === 'open_organ'">{{
                    row[item.name] | organNameFormat
                  }}</span>
                  <span v-else-if="item.name === 'acc_type'">{{
                    row[item.name] | accType
                  }}</span>
                  <span v-else-if="item.name === 'oper_type'">{{
                    row[item.name] | handleType
                  }}</span>
                  <span v-else-if="item.name === 'report_state'">{{
                    row[item.name] | repState
                  }}</span>
                  <span
                    v-else-if="
                      item.name === 'report_date' || item.name === 'trans_date'
                    "
                  >{{ row[item.name] | date10Format }}</span>
                  <span v-else>{{ row[item.name] }}</span>
                </div>
              </el-table-column>
            </template></sun-table>
        </div>
        <div v-else>123</div>
      </template>
    </all-views>
  </div>
</template>
<script>
// import {
//   commonMsgSuccess,
//   commonMsgWarn,
//   commonMsgConfirm
// } from '@/utils/message.js' // 提示信息
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量

import { configTable } from './info' // 表头、表单配置
import { SunTable, AllViews } from '@/components' // 按钮

import { SysCusInfo } from '@/api'
const { cusInfo } = SysCusInfo
export default {
  name: 'TableList',
  components: { SunTable, AllViews },
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
      boxStyle: {
        padding: '2rem 2rem 2rem 4rem',
        margin: '2rem 3rem 0',
        borderRadius: '4px',
        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
      },
      label: {
        width: '15%',
        textAlign: 'right',
        paddingRight: '2rem'
      },
      startStatus: {
        color: '#1890ff'
      },
      offStatus: {
        color: 'red'
      },
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      currentRow: null, // 选中行
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
      },
      dialog2: {
        title: '',
        width: '98%',
        top: '1vh',
        height: '90vh',
        visible: false,
        tabArr: [
          {
            name: 'khqx_khxx',
            label: '客户信息',
            type: 'describe',
            active: true
          },
          { name: 'glzhxx', label: '关联账户信息', type: 'table' },
          { name: 'khbgjl', label: '客户变更记录', type: 'table' },
          { name: 'khqx_bbxx', label: '报备信息', type: 'table' }
        ]
      }
    }
  },
  watch: {
    loading(value) {
      this.listLoading = this.loading
      this.dialog2.listLoading3 = this.loading
    }
  },
  created() {
    this.listLoading = this.loading
    this.dialog2.listLoading3 = this.loading
  },
  methods: {
    openDialog(row) {
      this.currentRow = row
      this.dialog2 = Object.assign({}, this.dialog2, {
        title: '客户全息视图',
        visible: true
      })
    },
    /**
     * 按钮：查询*/
    queryList(currentPage) {
      this.showLoading()
      const msg = {
        parameterList: [{ cus_name: this.defaultForm.cus_name }],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage || this.pageList.page,
        cusInfo_pageNum: this.pageList.pageSize
      }
      // query
      cusInfo(msg).then((response) => {
        const {
          retMap: { list, totalNum }
        } = response
        this.tableData = list
        this.pageList.totalNum = totalNum
        this.showLoading()
      })
    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible2(param) {
      this.dialog2.visible = param
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
    },
    /**
     * 加载中动画配置*/
    showLoading3() {
      this.dialog2.listLoading = !this.dialog2.listLoading
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
