<template>
  <el-dialog
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
          <slot :name="item.name" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
export default {
  name: 'SunTabDialog',
  components: {},
  directives: { elDragDialog },
  props: {
    title: {
      type: String,
      default: '编辑'
    },
    activeName: {
      type: String,
      default: 'first'
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
    tabArr: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  watch: {},
  mounted() {},
  methods: {
    dialogClose() {
      this.$emit('dialogClose', false)
    },
    handleClick(obj) {
      this.$emit('handleClick', obj)
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
      .el-descriptions__header{
        padding-top: 3rem;
        margin-bottom: 2rem;
        justify-content: center;
      }
    }
  }
}
</style>
