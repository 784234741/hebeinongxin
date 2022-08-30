<template>
  <div>
    <el-table
      :ref="tableRef"
      v-loading="loading"
      class="eltable"
      :data="tableData"
      style="width: 100%"
      :highlight-current-row="true"
      border
      v-bind="component"
      :row-class-name="rowClassName"
      :cell-style="{ borderColor: '#CBD6E1'}"
      :header-cell-style="{ borderColor: '#CBD6E1'}"
      @selection-change="selectionChange"
      @current-change="currentChange"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
      />
      <el-table-column
        v-if="indexNumber"
        type="index"
        width="50"
        label="序号"
      />
      <slot name="tableColumn" />
    </el-table>
    <sun-pagination v-show="pageList.totalNum>0" :total="pageList.totalNum" :page.sync="pageList.currentPage" :limit.sync="pageList.pageSize" @pagination="handlePagination" />
  </div>
</template>

<script>
import { v1 as uuidv1 } from 'uuid'
import SunPagination from '@/components/SunPagination' // 页码
export default {
  name: 'SunTable',
  components: { SunPagination },
  props: {
    tableRef: {
      type: String,
      default: 'tableRef'
    },
    component: {
      type: Object,
      default() {
        return {}
      }
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    indexNumber: { // 序号
      type: Boolean,
      default: false
    },
    selection: { // 复选框
      type: Boolean,
      default: false
    },
    pageList: {
      type: Object,
      default() {
        return {
          totalNum: 0,
          currentPage: 1, // 当前页
          pageSize: this.$store.getters.pageSize // 当前页显示条数
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uuid: uuidv1()
    }
  },
  methods: {
    // 选中行
    selectionChange(val) {
      this.$emit('selection-change', val)
    },
    // 选中行
    currentChange(val) {
      this.$emit('current-change', val)
    },
    /**
     * 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className*/
    rowClassName({ row, rowIndex }) {
      row.index = rowIndex // 将索引放置到row数据中
    },
    /**
     * 页码跳转
     * @param {Object}param 页码信息 { currentPage: val, pageSize: this.pageSize }
    */
    handlePagination(param) {
      this.$emit('pagination', param)
    }
  }
}
</script>

<style scoped>
.eltable {
  border: 1px solid #CBD6E1
}
</style>
