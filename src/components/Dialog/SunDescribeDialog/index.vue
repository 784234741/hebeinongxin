<template>
  <el-dialog
    :visible="visible"
    :before-close="dialogClose"
    v-bind="$attrs"
  >
    <div
      v-for="(item, index) in desMessage"
      :key="item.title + index"
      :style="boxStyle"
      v-if="!item.visible"
    >
      <el-descriptions
        :title="item.title"
        v-bind="describeConfig"
        :column="column"
        style="margin-bottom: 20px"
      >
        <el-descriptions-item
          v-for="item2 in item.arr"
          :key="item2.name"
          :label="item2.label"
        >
          <slot :item="item2.name" :value="desData[item2.name]" />
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- <div v-if="desMessage.length === 1" style="width: 100%; text-align: center">
      <el-button  @click="handleSubmit" type="primary">确定</el-button>
    </div> -->

  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'SunDescribeDialog',
  directives: { elDragDialog },
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    describeConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    boxStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    desMessage: {
      type: Array,
      default: () => {
        return []
      }
    },
    desData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    column: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    dialogClose() {
      this.$nextTick(() => {
        this.$emit('update:visible', false)
      })
    },
    handleSubmit() {
      this.$emit('handleSumit6')
    }
  }
}
</script>

<style lang="scss" scoped></style>
