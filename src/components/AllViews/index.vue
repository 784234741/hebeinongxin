<template>
  <el-dialog
    v-el-drag-dialog
    :title="title"
    :width="width"
    :top="top"
    :visible.sync="visible"
    :before-close="dialogClose"
  >
    <div :style="{ height: height }">
      <el-tabs :value="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tabArr"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <slot :data="item" :config="describeConfig" :allData="allData" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script>
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { describeConfig, allData } from './info'
import { SysAccInfo } from '@/api'
const { accInfo, reportInfo, cusInfo } = SysAccInfo

export default {
  name: 'AllViews',
  components: {},
  directives: { elDragDialog },
  props: {
    title: {
      type: String,
      default: '编辑'
    },
    width: {
      type: String,
      default: '60rem'
    },
    height: {
      type: String,
      default: '70vh'
    },
    top: {
      type: String,
      default: '10vh'
    },
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tabArr: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      describeConfig: describeConfig(),
      allData: allData(),
      requestState: [],
      activeName: ''
    }
  },
  watch: {
    visible(a, b) {
      if (a === true) {
        const name = this.tabArr.filter((item) => {
          return item.active !== undefined
        })[0].name
        this.activeName = name
        this.handleClick({ name })
      } else {
        this.requestState = []
        this.allData = allData()
        this.activeName = ''
      }
    }
  },
  mounted() {},
  methods: {
    dialogClose() {
      this.$emit('dialogClose2', false)
    },
    handleClick(obj) {
      if (
        (obj.name === 'zhxx' || obj.name === 'khxx') &&
        this.requestState.indexOf('zhxx') === -1
      ) {
        // 账户信息
        const msg = {
          parameterList: [],
          acc_no: this.row.acc_no,
          oper_type: 'selects'
        }
        accInfo(msg).then((res) => {
          const {
            retMap: { list }
          } = res
          this.requestState.push('zhxx', 'khxx')
          this.allData.zhxx = { ...this.allData.zhxx, ...list[0] }
          this.allData.khxx = { ...this.allData.khxx, ...list[0] }
        })
      } else if (
        // 报备信息
        obj.name === 'bbxx' &&
        this.requestState.indexOf('bbxx') === -1
      ) {
        const msg = {
          parameterList: [{}],
          acc_no: this.row.acc_no,
          oper_type: dictionaryGet('OPERATE_QUERY'),
          noPage: '1'
        }
        reportInfo(msg)
          .then((res) => {
            const {
              retMap: { list }
            } = res
            this.requestState.push('bbxx')
            this.allData.bbxx.listLoading = false
            this.allData.bbxx.tableData = list
          })
          .catch(() => {})
      } else if (
        // 报备信息
        obj.name === 'khqx_bbxx' &&
        this.requestState.indexOf('khqx_bbxx') === -1
      ) {
        const msg = {
          parameterList: [{}],
          oper_type: dictionaryGet('OPERATE_QUERY'),
          cus_no: this.row.cus_no,
          noPage: '1'
        }
        reportInfo(msg)
          .then((res) => {
            const {
              retMap: { list }
            } = res
            this.requestState.push('khqx_bbxx')
            this.allData.khqx_bbxx.listLoading = false
            this.allData.khqx_bbxx.tableData = list
          })
          .catch(() => {
            this.allData.khqx_bbxx.listLoading = false
          })
      } else if (
        obj.name === 'glzhxx' &&
        this.requestState.indexOf('glzhxx') === -1
      ) {
        // 关联账户信息
        const msg = {
          parameterList: [],
          cus_no: this.row.cus_no,
          oper_type: dictionaryGet('OPERATE_QUERY'),
          noPage: '1'
        }
        accInfo(msg)
          .then((res) => {
            const {
              retMap: { list }
            } = res
            this.requestState.push('glzhxx')
            this.allData.glzhxx.listLoading = false
            this.allData.glzhxx.tableData = list
          })
          .catch(() => {
            this.allData.glzhxx.listLoading = false
          })
      } else if (
        obj.name === 'khbgjl' &&
        this.requestState.indexOf('khbgjl') === -1
      ) {
        // 客户变更记录
        const msg = {
          parameterList: [{}],
          oper_type: 'selectCus',
          cus_no: this.row.cus_no,
          noPage: '1'
        }
        cusInfo(msg).then((res) => {
          const {
            retMap: { list }
          } = res
          this.requestState.push('khbgjl')
          this.allData.khbgjl.listLoading = false
          this.allData.khbgjl.tableData = list
        })
      } else if (
        obj.name === 'yxxx' &&
        this.requestState.indexOf('yxxx') === -1
      ) {
        this.requestState.push('yxxx')
        this.$emit('handleClick', 'yxxx')
      } else if (
        obj.name === 'khqx_khxx' &&
        this.requestState.indexOf('khqx_khxx') === -1
      ) {
        // 客户全息视图--客户信息
        const msg = {
          parameterList: [{ cus_no: this.row.cus_no }],
          oper_type: dictionaryGet('OPERATE_QUERY'),
          currentPage: 1,
          cusInfo_pageNum: 15
        }
        cusInfo(msg).then((res) => {
          const {
            retMap: { list }
          } = res
          this.requestState.push('khqx_khxx')
          this.allData.khqx_khxx = { ...this.allData.khqx_khxx, ...list[0] }
        })
      } else {
        console.log('122')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-dialog {
    margin: 0 auto;
  }
  .el-dialog__body {
    padding: 5px 10px;
    .el-tabs__content {
      height: calc(90vh - 58px);
      overflow: auto;
      padding-bottom: 2rem;
      .el-tab-pane{
        width: 100%;
        height: 100%;
      }
      //   .el-descriptions__header {
      //     padding-top: 3rem;
      //     margin-bottom: 2rem;
      //     justify-content: center;
      //   }
    }
  }
}
</style>
