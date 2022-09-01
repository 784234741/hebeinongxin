<template>
  <el-dialog
    ref="refDialog"
    :visible.sync="visible"
    :before-close="dialogClose"
    v-bind="$attrs"
  >
    <sun-form
      ref="refFormDialog"
      :config="formConfig"
      :default-form="formData"
      :query="btn"
      :reset="btn"
      :label-width="labelWidth"
      @validateForm="validateForm"
    >
      <!-- <template slot="header">
      </template> -->
    </sun-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="dialogSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import SunForm from '@/components/SunForm' // 表单
export default {
  name: 'SunFormDialog',
  components: { SunForm },
  directives: { elDragDialog },
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formConfig: {
      type: null,
      default: () => {
        return null
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    labelWidth: {
      type: String,
      default: '10rem'
    }
  },
  data() {
    return {
      btn: false
    }
  },
  watch: {
    visible(value) {
      this.getHeight()

      // 监听visible, 清空表单
      this.$nextTick(() => {
        this.getHeight()
        // this.$refs['refFormDialog'].resetForm()
      })
    }
  },
  mounted() {
    // window.addEventListener('resize', this.getHeight)
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.getHeight)
  },
  methods: {
    dialogClose() {
      this.$refs['refFormDialog'].resetForm()
      this.$nextTick(() => {
        this.$emit('dialogClose', false)
      })
    },
    /**
     * 确定*/
    dialogSubmit() {
      this.$refs['refFormDialog'].validateForm()
    },
    /**
     * 表单校验
     * @param {Boolean}valid 校验返回值*/
    validateForm(valid) {
      if (valid) {
        this.$emit('dialogSubmit', this.formData)
        // this.dialogClose()
      } else {
        return false
      }
    },
    // 获取浏览器窗口高度与弹窗高度
    getHeight() {
      this.$nextTick(() => {
        this.windowHeight = window.innerHeight
        this.dialogHeight = this.$refs.refDialog.$refs.dialog.offsetHeight
        // 判断二者之间大小关系，做出相应操作
        // 当浏览器窗口>弹窗高度
        if (this.windowHeight > this.dialogHeight) {
          const dialogTop = this.windowHeight - this.dialogHeight
          // 设置弹窗上外边距
          this.$refs.refDialog.$refs.dialog.style.marginTop =
            dialogTop / 2 + 'px'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
