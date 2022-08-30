<template>
  <el-dialog
    v-el-drag-dialog
    :visible="visible"
    :before-close="dialogClose"
    v-bind="$attrs"
  >
    <el-descriptions
      v-for="(item, index) in desMessage"
      :key="item.title + index"
      border
      :title="item.title"
      :label-style="label"
      :content-style="content"
    >
      <el-descriptions-item
        v-for="item2 in item.arr"
        :key="item2.name"
        :label="item2.label"
      >{{ desData[item2.name] }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'SunFormDialog',
  directives: { elDragDialog },
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
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
      }
    }
  },
  mounted() {
  },
  methods: {
    dialogClose() {
      this.$nextTick(() => {
        this.$emit('update:visible', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
