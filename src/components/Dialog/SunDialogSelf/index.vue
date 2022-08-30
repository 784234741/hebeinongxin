<template>
  <el-dialog
    v-el-drag-dialog
    :visible.sync="visible"
    :before-close="dialogClose"
    v-bind="$attrs"
  >
    <slot />
    <div slot="footer" class="dialog-footer">
      <sun-button
        :btn-submit="btnAlls.btnSubmit"
        @handleSubmit="handleSubmit"
      />
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { permissionsBtn } from '@/utils/permissions' // 权限配置
import {
  SunButton
} from '@/components'
export default {
  name: 'SunDialogSelf',
  directives: { elDragDialog },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    btnAlls: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  components: {
    SunButton
  },
  data() {
    return {
      btn: false,
    }
  },
  watch: {
    visible(value) {
      // 监听visible, 清空表单
      this.$nextTick(() => {})
    }
  },
  mounted() {},
  methods: {
    dialogClose() {
      this.$nextTick(() => {
        this.$emit('dialogClose', false)
      })
    },
    handleSubmit() {
      this.$emit('dialogSubmit')
    }
  }
}
</script>

<style lang="scss" scoped></style>
