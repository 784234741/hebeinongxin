/* * @Author: qianyun * @Date: 2021-11-30 11:26:11 * @Last Modified by: qianyun
* @Last Modified time: 2022-02-17 15:25:35 */
<!--表单组件-->
<template>
  <el-form
    :ref="refForm"
    :label-position="labelPosition"
    :model="defaultForm"
    :label-width="labelWidth"
    :inline="inlineForm"
    :label-suffix="labelSuffixForm"
    :hide-required-asterisk="hideRequiredAsteriskForm"
    :show-message="showMessageForm"
    :inline-message="inlineMessageForm"
    :status-icon="statusIconForm"
    :validate-on-rule-change="validateOnRuleChangeForm"
    :size="sizeForm"
    :disabled="disabledForm"
    :class="classForm"
    :style="styleForm"
  >
    <slot name="header" /><!--插槽-->
    <el-row :gutter="colSpace">
      <!--input组件-->
      <el-col v-for="item in config" :key="item.id" :span="item.colSpan || 24">
        <el-form-item
          v-show="!item.hidden"
          :ref="item.ref"
          :label="item.label + '：'"
          :prop="item.name"
          :label-width="item.config ? item.config.labelWidth : ''"
          :required="item.config ? item.config.required : false"
          :rules="item.config ? item.config.rules : []"
          :error="item.config ? item.config.error : ''"
          :show-message="item.config ? item.config.showMessage : true"
          :inline-message="item.config ? item.config.inlineMessage : false"
          :size="item.config ? item.config.size : ''"
        >
          <!--input begin-->
          <el-input
            v-if="
              item.component === 'input' &&
                (item.componentProps ? item.componentProps.type : '') === 'age'
            "
            v-model.number="defaultForm[item.name]"
            :style="compStyle"
            v-bind="item.componentProps"
            v-on="item.methods"
            @keydown.native.enter="
              item.componentProps
                ? typeof item.componentProps.keydown === 'function'
                  ? item.componentProps.keydown($event)
                  : false
                : false
            "
          />
          <el-input
            v-else-if="item.component === 'input'"
            v-model="defaultForm[item.name]"
            :style="compStyle"
            v-bind="item.componentProps"
            v-on="item.methods"
            @blur="
              item.componentProps
                ? typeof item.componentProps.blur === 'function'
                  ? item.componentProps.blur(item, defaultForm)
                  : false
                : false
            "
            @focus="
              item.componentProps
                ? typeof item.componentProps.focus === 'function'
                  ? item.componentProps.focus(item, defaultForm)
                  : false
                : false
            "
            @change="
              item.componentProps
                ? typeof item.componentProps.change === 'function'
                  ? item.componentProps.change(item, defaultForm)
                  : false
                : false
            "
            @input="
              item.componentProps
                ? typeof item.componentProps.input === 'function'
                  ? item.componentProps.input(item, defaultForm)
                  : false
                : false
            "
            @clear="
              item.componentProps
                ? typeof item.componentProps.clear === 'function'
                  ? item.componentProps.clear(item, defaultForm)
                  : false
                : false
            "
            @keydown.native.enter="
              item.componentProps
                ? typeof item.componentProps.keydown === 'function'
                  ? item.componentProps.keydown($event)
                  : false
                : false
            "
          />
          <el-autocomplete
            v-else-if="item.component === 'input-search'"
            v-model="defaultForm[item.name]"
            popper-class="my-autocomplete"
            :fetch-suggestions="item.componentProps.querySearch"
            :style="compStyle"
            v-bind="item.componentProps"
            v-on="item.methods"
          >
            <template slot-scope="scope">
              <div class="name">{{ scope.item.value }}</div>
            </template>
          </el-autocomplete>
          <!--radio begin-->
          <el-radio-group
            v-else-if="item.component === 'radio'"
            v-model="defaultForm[item.name]"
            :label="item.label"
            v-bind="item.componentProps"
            v-on="item.methods"
          >
            <el-radio
              v-for="radioData in item.options"
              :key="item.id + radioData.label"
              :name="item.componentProps ? item.componentProps.name : ''"
              :disabled="
                item.componentProps ? item.componentProps.disabled : false
              "
              :border="item.componentProps ? item.componentProps.border : false"
              :size="item.componentProps ? item.componentProps.size : ''"
              :label="radioData.label"
            >{{ radioData.text }}</el-radio>
          </el-radio-group>
          <!--radio end-->
          <!--checkbox begin-->
          <el-checkbox-group
            v-else-if="item.component === 'checkbox'"
            v-model="defaultForm[item.name]"
            :label="item.label"
            v-bind="item.componentProps"
            v-on="item.methods"
          >
            <el-checkbox
              v-for="checkData in item.options"
              :key="item.id + checkData.label"
              :name="item.componentProps ? item.componentProps.name : ''"
              :disabled="
                item.componentProps ? item.componentProps.disabled : false
              "
              :border="item.componentProps ? item.componentProps.border : false"
              :size="item.componentProps ? item.componentProps.size : ''"
              :true-label="
                item.componentProps ? item.componentProps.trueLabel : null
              "
              :false-label="
                item.componentProps ? item.componentProps.falseLabel : null
              "
              :checked="
                item.componentProps ? item.componentProps.checked : false
              "
              :indeterminate="
                item.componentProps ? item.componentProps.indeterminate : false
              "
              :label="checkData.label"
            >{{ checkData.text }}</el-checkbox>
          </el-checkbox-group>
          <!--checkbox end-->
          <!--InputNumber 计数器 begin-->
          <el-input-number
            v-else-if="item.component === 'number'"
            v-model="defaultForm[item.name]"
            :style="compStyle"
            v-bind="item.componentProps"
            v-on="item.methods"
            @blur="
              item.componentProps
                ? typeof item.componentProps.blur === 'function'
                  ? item.componentProps.blur(item, defaultForm)
                  : false
                : false
            "
            @focus="
              item.componentProps
                ? typeof item.componentProps.focus === 'function'
                  ? item.componentProps.focus(item, defaultForm)
                  : false
                : false
            "
            @change="
              item.componentProps
                ? typeof item.componentProps.change === 'function'
                  ? item.componentProps.change(item, defaultForm)
                  : false
                : false
            "
          />
          <!--InputNumber 计数器 end-->
          <!--Select 选择器 begin-->
          <el-select
            v-else-if="item.component === 'select'"
            v-model="defaultForm[item.name]"
            :style="compStyle"
            v-bind="item.componentProps"
            v-on="item.methods"
            @blur="
              item.componentProps
                ? typeof item.componentProps.blur === 'function'
                  ? item.componentProps.blur(item, defaultForm)
                  : false
                : false
            "
            @focus="
              item.componentProps
                ? typeof item.componentProps.focus === 'function'
                  ? item.componentProps.focus(item, defaultForm)
                  : false
                : false
            "
            @change="
              item.componentProps
                ? typeof item.componentProps.change === 'function'
                  ? item.componentProps.change(item, defaultForm)
                  : false
                : false
            "
            @clear="
              item.componentProps
                ? typeof item.componentProps.clear === 'function'
                  ? item.componentProps.clear(item, defaultForm)
                  : false
                : false
            "
            @visible-change="
              item.componentProps
                ? typeof item.componentProps.visibleChange === 'function'
                  ? item.componentProps.visibleChange(item, defaultForm)
                  : false
                : false
            "
            @remove-tag="
              item.componentProps
                ? typeof item.componentProps.removeTag === 'function'
                  ? item.componentProps.removeTag(item, defaultForm)
                  : false
                : false
            "
          >
            <el-option
              v-for="optionData in item.options"
              :key="
                item.id ? item.id + optionData.value + item.name : item.value
              "
              :label="optionData.label"
              :value="optionData.value"
              :disabled="optionData.disabled ? optionData.disabled : false"
            >
              <slot :name="item.name + '_' + optionData.value" /><!--插槽-->
            </el-option>
          </el-select>
          <!--Select 选择器 end-->
          <!--Cascader 级联选择器 begin-->
          <el-cascader
            v-else-if="item.component === 'cascader'"
            v-model="defaultForm[item.name]"
            :style="compStyle"
            :options="item.options"
            v-bind="item.componentProps"
            v-on="item.methods"
          />
          <!--Cascader 级联选择器 end-->

          <!--Switch 开关 begin-->
          <el-switch
            v-else-if="item.component === 'switch'"
            v-model="defaultForm[item.name]"
            v-bind="item.componentProps"
            v-on="item.methods"
          />
          <!--Switch 开关 end-->

          <!--Slider 滑块 begin-->
          <el-slider
            v-else-if="item.component === 'slider'"
            v-model="defaultForm[item.name]"
            v-bind="item.componentProps"
            v-on="item.methods"
          />
          <!--Slider 滑块 end-->

          <!--TimePicker 时间选择器 begin-->
          <el-time-select
            v-else-if="item.component === 'time-select'"
            v-model="defaultForm[item.name]"
            :style="compStyle"
            v-bind="item.componentProps"
            v-on="item.methods"
          />
          <!--TimePicker 时间选择器 end-->

          <!--DatePicker 日期选择器 begin-->
          <el-date-picker
            v-else-if="item.component === 'date-picker'"
            v-model="defaultForm[item.name]"
            :style="compStyle"
            v-bind="item.componentProps"
            v-on="item.methods"
            @keydown.native.enter="
              item.componentProps
                ? typeof item.componentProps.keydown === 'function'
                  ? item.componentProps.keydown($event)
                  : false
                : false
            "
          />
          <!--DatePicker 日期选择器 end-->

          <!--Upload 上传 begin-->
          <el-upload
            v-else-if="item.component === 'upload'"
            class="upload-demo"
            v-bind="item.componentProps"
            v-on="item.methods"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <slot :name="item.component" />
          </el-upload>
          <!--Upload 上传 end-->

          <!--Rate 评分begin-->
          <el-rate
            v-else-if="item.component === 'rate'"
            v-model="defaultForm[item.name]"
            v-bind="item.componentProps"
            v-on="item.methods"
          />

          <!--Rate 评分 end-->
          <div v-else-if="item.component === 'info'">
            {{ item.text }}
          </div>
          <div v-else-if="item.component === 'empty'">
            <slot :name="item.name" />
          </div>
          <div v-else-if="item.component === 'select-tree'">
            <select-tree
              ref="treeSelect"
              v-model="defaultForm[item.name]"
              :value-m="defaultForm[item.name]"
              :options="item.options"
              :multiple="
                item.componentProps ? item.componentProps.multiple : false
              "
              :disabled="
                item.componentProps ? item.componentProps.disabled : false
              "
            />
          </div>
          <div v-else-if="item.component === 'button'">
            <el-button
              v-bind="item.componentProps"
              v-on="item.methods"
            >{{ item.label }}
            </el-button>
          </div>
        </el-form-item>
      </el-col>
      <el-button
        v-if="query"
        v-waves
        class="filter-item"
        type="primary"
        icon=""
        style="float: left; margin-left: 2rem"
        @click="queryForm"
      >
        查询
      </el-button>
      <el-button
        v-if="submits"
        v-waves
        class="filter-item"
        type="primary"
        icon=""
        style="float: left; margin-left: 2rem"
        @click="submitData"
      >
        确定
      </el-button>
      <el-button
        v-if="submit"
        v-waves
        class="filter-item"
        type="primary"
        icon=""
        style="float: left; margin-left: 2rem"
        @click="submitForm"
      >
        提交
      </el-button>
      <el-button
        v-if="reset"
        v-waves
        class="filter-item"
        type="primary"
        icon=""
        style="float: left"
        @click="resetForm"
      >
        重置
      </el-button>
    </el-row>
    <slot name="footer" /><!--插槽-->
  </el-form>
</template>

<script>
import { v1 as uuidv1 } from 'uuid'
import waves from '@/directive/waves' // waves directive
import SelectTree from './selectTree.vue' // 下拉树
export default {
  name: 'SunForm',
  directives: { waves },
  components: { SelectTree },
  props: {
    /* ---------------------------- form 配置 begin ---------------------------- */
    refForm: {
      type: String,
      default: 'refForm2'
    },
    labelWidth: {
      // 表单域标签的宽度
      type: String,
      default: '10rem'
    },
    inlineForm: {
      // 行内表单模式
      type: Boolean,
      default: false
    },
    labelSuffixForm: {
      // 表单域标签的后缀
      type: String,
      default: ''
    },
    hideRequiredAsteriskForm: {
      // 是否隐藏必填字段的标签旁边的红色星号
      type: Boolean,
      default: false
    },
    showMessageForm: {
      // 是否显示校验错误信息
      type: Boolean,
      default: true
    },
    inlineMessageForm: {
      // 是否以行内形式展示校验信息
      type: Boolean,
      default: false
    },
    statusIconForm: {
      // 是否在输入框中显示校验结果反馈图标
      type: Boolean,
      default: false
    },
    validateOnRuleChangeForm: {
      // 是否在 rules 属性改变后立即触发一次验证
      type: Boolean,
      default: true
    },
    sizeForm: {
      // 用于控制该表单内组件的尺寸
      type: String,
      default: 'medium'
    },
    disabledForm: {
      // 是否禁用该表单内的所有组件
      type: Boolean,
      default: false
    },
    classForm: {
      type: String,
      default: ''
    },
    styleForm: {
      type: Object,
      default: function() {
        return {}
      }
    },
    /* ---------------------------- form 配置 end ---------------------------- */
    config: {
      type: null,
      default: function() {
        return null
      }
    },
    defaultForm: {
      type: Object,
      default: function() {
        return {}
      }
    },
    /* ---------------------------- button 配置 begin ---------------------------- */
    query: {
      type: Boolean,
      default: true
    },
    reset: {
      type: Boolean,
      default: true
    },
    submits: {
      type: Boolean,
      default: false
    },
    submit: {
      type: Boolean,
      default: false
    },
    compStyle: {
      // 组件样式
      type: Object,
      default: function() {
        return {
          width: '100%'
        }
      }
    }
    /* ---------------------------- button 配置 end ---------------------------- */
  },
  data() {
    return {
      radio: '3',
      labelPosition: 'right', // 标签对齐方式 left、right、top
      colSpace: 0, // 列与列之间的间隙
      selectData: {
        // select - tree
        tree: null
      }
      // compStyle: { width: '100%' } // 组件样式
    }
  },
  /* 在实例创建完成后被立即同步调用*/
  created() {
    this.$forceUpdate()
    // 配置表单key
    if (Array.isArray(this.config)) {
      this.config.map((item) => {
        item['id'] = uuidv1()
      })
    } else {
      for (const key in this.config) {
        this.config[key]['id'] = uuidv1()
      }
    }
  },
  mounted() {},
  methods: {
    /**
     * 查询*/
    queryForm() {
      this.$emit('query', this.defaultForm)
    },
    // 确定
    submitData() {
      this.$emit('submitData', this.defaultForm)
    },
    /**
     * 提交*/
    submitForm() {
      this.$emit('submit', this.defaultForm)
    },
    /**
     * 重置*/
    resetForm() {
      this.$refs[this.refForm].resetFields()
      this.$refs[this.refForm].clearValidate() // 清除校验
      console.log(this.defaultForm)
    },
    /**
     * 校验*/
    validateForm() {
      this.$refs[this.refForm].validate((valid) => {
        this.$emit('validateForm', valid)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-autocomplete {
  width: 100%;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
