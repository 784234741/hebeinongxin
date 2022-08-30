<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="dialogClose"
    v-bind="$attrs"
  >
    <!-- <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="tableData"
      fit
      border
      highlight-current-row
      :row-class-name="rowClassName"
      @current-change="currentChange"
    > -->
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      :selection="false"
      :index-number="true"
      @current-change="currentChange"
      @selection-change="selectionChange"
    >
      <template v-if="!$scopedSlots.default" slot="tableColumn">
        <el-table-column
          v-for="item in tableColumn"
          :key="item.id"
          :prop="item.name"
          :label="item.label"
          :width="item.width"
        >
          <!-- <slot :name="item.name" /> -->
        </el-table-column>
      </template>
      <template v-else slot="tableColumn">
        <el-table-column
          v-for="item in tableColumn"
          :key="item.id"
          :prop="item.name"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="{ row }">
            <slot :item="item" :row="row" />
          </template>
        </el-table-column>
      </template>
    </sun-table>
    <!-- </el-table> -->
    <div slot="footer" class="dialog-footer">
      <slot name="leftBtn" />
      <slot name="rightBtn" />
      <el-button v-if="btnCancle" @click="dialogClose">取 消</el-button>
      <el-button
        v-if="btnSubmit"
        type="primary"
        @click="dialogSubmit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { SunTable } from '@/components' // 按钮
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
export default {
  name: 'SunTableDialog',
  directives: { elDragDialog },
  components: { SunTable },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    tableColumn: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    btnCancle: {
      type: Boolean,
      default: true
    },
    btnSubmit: {
      type: Boolean,
      default: true
    },
    listLoading: {
      type: Boolean,
      default: false
    },
    pageList: {
      type: Object,
      default: () => {
        return {
          totalNum: 0
        }
      }
    }
  },
  data() {
    return {
      btn: false
    }
  },
  mounted() {},
  methods: {
    dialogClose() {
      this.$nextTick(() => {
        this.$emit('dialogClose', false)
      })
    },
    /**
     * 选中行*/
    currentChange(val) {
      this.$emit('currentChange', val)
    },
    selectionChange(val) {
      this.$emit('selectionChange', val)
    },
    /**
     * 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className*/
    rowClassName({ row, rowIndex }) {
      row.index = rowIndex // 将索引放置到row数据中
    },
    /**
     * 确定*/
    dialogSubmit() {
      this.$emit('dialogSubmit')
    }
  }
}
</script>

<style lang="scss" scoped></style>
