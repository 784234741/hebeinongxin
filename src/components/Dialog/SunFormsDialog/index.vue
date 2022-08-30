<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="visible"
    :before-close="dialogClose"
    element-loading-text="数据加载中..."
    v-bind="$attrs"
  >
    <div v-for="(item, key) in formConfig" :key="key">
      <div v-if="!item.hidden" class="form_box">
        <sun-form
          :ref="key"
          :config="item.data"
          :default-form="item.formData"
          :query="false"
          :reset="false"
          :label-width="item.labelWidth"
          @validateForm="validateForm"
        >
          <template slot="header">
            <div class="form_title">
              {{ item.title }}
              <span v-if="item.titleNote" style="color: red">{{
                item.titleNote
              }}</span>
            </div>
          </template>
        </sun-form>
      </div>
    </div>

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
  name: 'SunFormsDialog',
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
    labelWidth: {
      type: String,
      default: '10rem'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btn: false,
      passNum: 0,
      keyArr: []
    }
  },
  watch: {
    visible(value) {
      // 监听visible, 清空表单
      this.$nextTick(() => {
        this.keyArr.forEach((item) => {
          this.$refs[item][0].resetForm()
          this.$refs[item][0].resetForm()
        })
      })
    },
    formConfig: {
      deep: true,
      handler(newVal, oldVal) {
        const afterNewVal = JSON.parse(JSON.stringify(newVal))
        for (const i in afterNewVal) {
          if (afterNewVal[i]['hidden']) {
            delete afterNewVal[i]
          }
        }
        this.keyArr = Object.keys(afterNewVal)
      }
    }
  },
  mounted() {
    this.keyArr = Object.keys(this.formConfig)
  },
  methods: {
    dialogClose() {
      this.keyArr.forEach((item) => {
        this.$refs[item][0].resetForm()
      })

      this.$nextTick(() => {
        this.$emit('dialogClose', false)
      })
    },
    /**
     * 确定*/
    dialogSubmit() {
      this.keyArr.forEach((item) => {
        this.$refs[item][0].validateForm()
      })
      this.passNum = 0
    },
    /**
     * 表单校验
     * @param {Boolean}valid 校验返回值*/
    validateForm(valid) {
      if (valid) {
        this.passNum++
        if (this.passNum === this.keyArr.length) {
          let data = {}
          for (const key in this.formConfig) {
            data = {
              ...this.formConfig[key].formData,
              ...data
            }
          }
          this.$emit('dialogSubmit', data)
        }
        // this.$emit('dialogSubmit')
        // this.dialogClose()
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form_box {
  padding: 1rem 2rem 1rem 1rem;
  border: 1px solid #f1f1f1;
  margin-bottom: 2rem;
  border-radius: 1rem;
  .form_title {
    padding-left: 1rem;
    margin-bottom: 3rem;
    font-size: 1.4rem;
    font-weight: bold;
    color: #767e91;
  }
}
</style>
