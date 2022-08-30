<template>
  <div>
    <el-dialog
      v-el-drag-dialog
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
  </div>
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
      // 监听visible, 清空表单
      this.$nextTick(() => {
        this.$refs['refFormDialog'].resetForm()
      })
    }
  },
  mounted() {},
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
        this.$emit('dialogSubmit')
        // this.dialogClose()
      } else {
        return false
      }
    }
  }
}
</script>
