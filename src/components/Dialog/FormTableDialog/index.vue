<template>
  <el-dialog
    :title="title"
    :width="width"
    :visible.sync="visible"
    :before-close="dialogClose"
  >
    <sun-form
      ref="refFormDialog"
      :config="formConfig"
      :default-form="formData"
      :query="btn"
      :reset="btn"
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
  name: 'FormTableDialog',
  components: { SunForm },
  directives: { elDragDialog },
  props: {
    title: {
      type: String,
      default: '编辑'
    },
    width: {
      type: String,
      default: '50%'
    },
    visible: {
      type: Boolean,
      default: false
    },
    formConfig: {
      type: Array,
      default: () => {
        return []
      }
    },
    formData: {
      type: Object,
      default: () => {
        return { }
      }
    }
  },
  data() {
    return {
      btn: false
    }
  },
  watch: {
    visible(value) { // 监听visible, 清空表单
      this.$nextTick(() => {
        if (value) {
          this.$refs['refFormDialog'].resetForm()
        }
      })
    }
  },
  mounted() {
  },
  methods: {
    dialogClose() {
      this.$refs['refFormDialog'].resetForm()
      this.$emit('changeVisible', false)
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
        this.$emit('dialogSubmit')
        this.dialogClose()
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
