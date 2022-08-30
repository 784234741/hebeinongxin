<!--
 * 新增年检规则：输入配置
 !-->
<template>
  <div>
    <el-col
      :style="{
        visibility: endIndex !== 0 ? 'visible' : 'hidden'
      }"
      :span="3"
    >
      <!--行合并条件: or或、 and且-->
      <el-form-item :prop="'operSym' + endIndex">
        <el-select
          v-model="formValue['operSym' + endIndex]"
          clearable
          :disabled="types === 'detail' ? true : false"
          @change="hanldeSelect"
        >
          <el-option
            v-for="item in data.operSym"
            :key="'operSym' + item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="3">
      <!--括号： (、）-->
      <el-form-item :prop="'leftBrak' + endIndex">
        <el-select
          v-model="formValue['leftBrak' + endIndex]"
          clearable
          :disabled="types === 'detail' ? true : false"
          @change="hanldeSelect"
        >
          <el-option
            v-for="item in data.leftBrak"
            :key="'leftBrak' + item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col
      :span="4"
    ><!--规则字段-->
      <el-form-item
        :prop="'typeData' + endIndex"
        :rules="[{ required: true, message: '此处不能为空' }]"
      >
        <el-select
          v-model="formValue['typeData' + endIndex]"
          clearable
          :disabled="types === 'detail' ? true : false"
          @change="hanldeSelect(formValue['typeData' + endIndex], 'typeData')"
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
        <el-select
          v-model="formValue['condition' + endIndex]"
          clearable
          :disabled="types === 'detail' ? true : false"
          @change="hanldeSelect"
        >
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
        v-if="data.type === 'select'"
        :span="5"
      ><!--选择和输入的值-->
        <el-form-item :prop="'values' + endIndex">
          <el-select
            v-model="formValue['values' + endIndex]"
            :disabled="types === 'detail' ? true : false"
            @change="hanldeSelect"
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
      <el-col
        v-else
        :span="4"
      ><!--规则字段-->
        <el-form-item :prop="'values' + endIndex">
          <el-input
            v-model="formValue['values' + endIndex]"
            :disabled="types === 'detail' ? true : false"
            @input="handleInput($event)"
          />
        </el-form-item>
      </el-col>
    </template>
    <el-col :span="3">
      <!--括号： (、）-->
      <el-form-item :prop="'rightBrak' + endIndex">
        <el-select
          v-model="formValue['rightBrak' + endIndex]"
          clearable
          :disabled="types === 'detail' ? true : false"
          @change="hanldeSelect"
        >
          <el-option
            v-for="item in data.rightBrak"
            :key="'rightBrak' + item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col v-if="types !== 'detail'" :span="2">
      <el-button type="danger" icon="el-icon-minus" circle @click="delBtn" />
      <!--删除-->
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'DynamicConfig',
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
    // console.log(this.data)
    // console.log(this.types)
  },
  methods: {
    /*
     ** 删除
     */
    delBtn() {
      this.$emit('delBtn', [this.endIndex, this.posIndex])
    },
    /**
     * 下拉框值改变
     * @param {String}param 选择的值
     * @param {String}type 下拉框类型
     */
    hanldeSelect(param, type) {
      this.$forceUpdate()
      if (type === 'typeData') {
        const val = param.slice(1)
        this.$emit('enterData', [val, this.posIndex, true])
      }
    },
    /**
     * input框值改变
     */
    handleInput(e) {
      this.$forceUpdate()
    }
  }
}
</script>

<style></style>
