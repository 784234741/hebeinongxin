<!--
 * 新增年检规则：输入配置
 !-->
<template>
  <div>
    <el-col
      :span="4"
    ><!--规则字段-->
      <el-form-item
        :prop="'typeData' + endIndex"
        :rules="[{ required: true, message: '此处不能为空' }]"
      >
        <el-select
          v-model="formValue['typeData' + endIndex]"
          :disabled="types === 'detail' ? true : false"
          @change="handleType(formValue['typeData' + endIndex])"
        >
          <el-option
            v-for="item in data.typeData"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col
      :span="4"
    ><!--条件-->
      <el-form-item
        :prop="'condition' + endIndex"
        :rules="[{ required: true, message: '此处不能为空' }]"
      >
        <el-select v-model="formValue['condition' + endIndex]" :disabled="true">
          <el-option
            v-for="item in data.condition"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <template>
      <el-col
        :span="5"
      ><!--选择和输入的值-->
        <el-form-item
          :prop="'values' + endIndex"
          :rules="[{ required: true, message: '此处不能为空' }]"
        >
          <el-select
            v-model="formValue['values' + endIndex]"
            :disabled="types === 'detail' ? true : false"
          >
            <el-option
              v-for="item in data.values"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </template>
    <el-col v-if="types !== 'detail'" :span="2">
      <el-button type="danger" icon="el-icon-minus" circle @click="delBtn" />
      <!--删除-->
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'OutPut',
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    endIndex: {
      // 数据后面得数字
      type: Number,
      default: 0
    },
    posIndex: {
      // 点击得第几行数据
      type: Number,
      default: 0
    },
    formValue: {
      // 表单对象
      type: Object,
      default: function() {
        return {}
      }
    },
    types: {
      // 点击的是哪个按钮
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {
    // console.log(111)
    // console.log(this.data)
  },
  methods: {
    /**
     * 删除
     */
    delBtn() {
      this.$emit('delBtn', [this.endIndex, this.posIndex])
    },
    /**
     * 下拉框值改变
     * @param {String}param 选择的值
     */
    handleType(param) {
      const val = param.slice(1)
      this.$emit('outputData', [val, this.posIndex])
    }
  }
}
</script>

<style></style>
