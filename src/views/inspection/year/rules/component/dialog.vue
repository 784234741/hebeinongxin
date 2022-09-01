<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="dialogClose"
    v-bind="$attrs"
  >
    <div class="main-content">
      <div class="content">
        <div class="titles">基本信息</div>
        <sun-form
          ref="refFormDialog"
          :config="formConfig"
          :default-form="datas.formData"
          :query="btn"
          :reset="btn"
          label-width="10rem"
          @validateForm="validateForm"
        />
      </div>
      <div class="content">
        <div class="titles">
          输入配置<span
            v-show="datas.btn !== 'detail'"
            class="addBtns"
            @click="addEnter"
          >添加</span>
        </div>
        <el-form ref="enterForm" :model="dialog.allEnterData">
          <el-row
            v-for="(item, index) in dialog.allEnterConfig"
            :key="item.index"
            :gutter="10"
            style="margin-bottom: 1rem"
          >
            <Config
              :data="item"
              :pos-index="index"
              :end-index="item.index"
              :form-value="dialog.allEnterData"
              :types="datas.btn"
              @delBtn="delEnter"
              @enterData="enterChange"
            />
          </el-row>
        </el-form>
      </div>
      <div class="content output-content">
        <div class="titles">
          输出配置<span
            v-show="datas.btn !== 'detail'"
            class="addBtns"
            @click="addOutput"
          >添加</span>
        </div>
        <el-form ref="outputForm" :model="dialog2.allOutputData">
          <el-row
            v-for="(item, index) in dialog2.allOutputConfig"
            :key="item.index"
            :gutter="10"
            style="margin-bottom: 1rem"
          >
            <out-put
              :data="item"
              :pos-index="index"
              :end-index="item.index"
              :form-value="dialog2.allOutputData"
              :types="datas.btn"
              @delBtn="delOutput"
              @outputData="outputChange"
            />
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button type="danger" @click="dialogClose">取 消</el-button>
      <el-button
        v-if="datas.btn !== 'detail'"
        type="primary"
        @click="dialogSubmit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
import { commonBlank, deepClone } from '@/utils/common'
import {
  commonMsgWarn,
  commonMsgConfirm,
  commonMsgSuccess
} from '@/utils/message.js' // 提示信息
import SunForm from '@/components/SunForm' // 表单
import Config from './dynamic' // 输入配置组件
import OutPut from './output' // 输出配置组件
import { yearCheck } from '@/api' // 接口
const { ruleQuery } = yearCheck
export default {
  name: 'Dialogs',
  components: { SunForm, Config, OutPut },
  directives: { elDragDialog },
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    datas: {
      type: Object,
      default: () => {
        return {}
      }
    }, // 所有数据
    formConfig: {
      type: null,
      default: () => {
        return null
      }
    } // 表单配置
  },
  data() {
    return {
      btn: false,
      dialog: {
        allEnterConfig: [], // 所有的输入配置(数组对象)
        allEnterData: {}, // 所有的输入配置数据
        enterNum: 0, // 输入配置个数
        enterConfig: {
          operSym: [
            {
              value: '&&',
              label: '与'
            },
            {
              value: '||',
              label: '或'
            }
          ], // 且或等操作符
          leftBrak: [{ value: '(', label: '(' }], // 前括号
          typeData: [], // 类型下拉框数据
          condition: [], // 条件
          type: 'select', // 判断value框是select/input
          values: [], // 选择和输入的值
          rightBrak: [{ value: ')', label: ')' }] // 后括号
        }, // 输入配置下拉框值
        enterData: {
          operSym: '', // 且或等操作符
          leftBrak: '', // 前括号
          typeData: '', // 类型下拉框数据
          condition: '', // 条件
          values: '', // 选择和输入的值
          rightBrak: '' // 后括号
        }
      }, // 输入配置数据
      dialog2: {
        allOutputConfig: [], // 所有的输出配置(数组对象)
        allOutputData: {}, // 所有的输处配置数据
        outNum: 0, // 输出配置个数
        outputConfig: {
          typeData: [], // 类型下拉框数据
          condition: [], // 条件
          values: [] // 选择和输入的值
        }, // 输入配置下拉框值
        outputData: {
          typeData: '', // 类型下拉框数据
          condition: '', // 条件
          values: '' // 选择和输入的值
        }
      } // 输出配置数据
    }
  },
  watch: {
    visible(value) {
      // 监听visible, 清空表单
      this.$nextTick(() => {
        // this.$refs['refFormDialog'].resetForm()
      })
      if (value) {
        if (this.datas.btn !== 'add') {
          this.initData()
        }
      }
    }
  },
  mounted() {
    this.initConfig()
  },
  methods: {
    /**
     * 修改和详情反显表单配置
     */
    initData() {
      this.oldformData = deepClone(this.datas)
      const { enterNum, outPutNum, enterObj, outPutObj } = this.datas
      this.dialog.allEnterConfig = []
      this.dialog.enterNum = 0
      this.dialog2.allOutputConfig = []
      this.dialog2.outNum = 0
      // 根据输入配置个数动态创建表单
      const numArr = []
      let nums = 0
      while (nums < enterNum) {
        numArr.push(nums)
        nums++
      }
      numArr.forEach((item) => {
        this.addEnter()
      })

      // 根据输出配置个数动态创建表单
      const outNumArr = []
      let outNum = 0
      while (outNum < outPutNum) {
        outNumArr.push(outNum)
        outNum++
      }
      outNumArr.forEach((item) => {
        this.addOutput()
      })

      this.$nextTick(() => {
        this.dialog.allEnterData = enterObj
        this.dialog2.allOutputData = outPutObj

        // 根据类型下拉框数据回显后面values值和下拉框数据
        for (const item in this.dialog.allEnterData) {
          if (item.includes('typeData')) {
            const num = parseInt(item.slice(-1))
            const val = this.dialog.allEnterData[item].slice(1)
            this.enterChange([val, num])
          }
        }
        for (const item in this.dialog2.allOutputData) {
          if (item.includes('typeData')) {
            const num = parseInt(item.slice(-1))
            const val = this.dialog2.allOutputData[item].slice(1)
            this.outputChange([val, num])
          }
        }
      })
    },
    /**
     * 添加输入配置规则
     */
    addEnter() {
      this.dialog.allEnterConfig = [
        ...this.dialog.allEnterConfig,
        { ...this.dialog.enterConfig, index: this.dialog.enterNum }
      ]
      this.dialog.allEnterData = {
        ...this.dialog.allEnterData,
        ...this.createEnterData(this.dialog.enterNum)
      }
      this.dialog.enterNum++
      // console.log(this.dialog)
    },
    /**
     * 删除输入配置规则
     * @param {Array} param // 删除的第几行和删除对应的数据
     */
    delEnter(param) {
      this.dialog.allEnterConfig.splice(param[1], 1)
      for (const i in this.dialog.enterData) {
        delete this.dialog.allEnterData[i + param[0]]
      }
      if (commonBlank(this.dialog.allEnterConfig)) this.dialog.enterNum = 0
      // console.log(this.dialog)
    },
    /**
     * 添加输出配置规则
     */
    addOutput() {
      this.dialog2.allOutputConfig = [
        ...this.dialog2.allOutputConfig,
        { ...this.dialog2.outputConfig, index: this.dialog2.outNum }
      ]
      this.dialog2.allOutputData = {
        ...this.dialog2.allOutputData,
        ...this.createOutData(this.dialog2.outNum)
      }
      this.dialog2.outNum++
      // console.log(this.dialog2)
    },
    /**
     * 删除输出配置规则
     * @param {Array} param // 删除的第几行和删除对应的数据
     */
    delOutput(param) {
      this.dialog2.allOutputConfig.splice(param[1], 1)
      for (const i in this.dialog2.outputData) {
        delete this.dialog2.allOutputData[i + param[0]]
      }
      if (commonBlank(this.dialog2.allOutputConfig)) this.dialog2.outNum = 0
      // console.log(this.dialog2)
    },
    /**
     * 切换输入配置规则设置value
     * @param {Array} param // 选择的值和后面表单的类型
     */
    enterChange(param) {
      // console.log(param)
      if (
        param[0] === '0004' ||
        param[0] === '0009' ||
        param[0] === '0010' ||
        param[0] === '0015'
      ) {
        this.dialog.allEnterConfig[param[1]].type = 'select'
        if (param[0] === '0004') {
          this.dialog.allEnterConfig[param[1]].values = dictionaryFieds(
            'AM9200',
            true
          )
        } else if (param[0] === '0009') {
          this.dialog.allEnterConfig[param[1]].values = dictionaryFieds(
            'AM9300',
            true
          )
        } else if (param[0] === '0010') {
          this.dialog.allEnterConfig[param[1]].values = dictionaryFieds(
            'AM1300',
            true
          )
        } else {
          this.dialog.allEnterConfig[param[1]].values = dictionaryFieds(
            'AM6a00',
            true
          )
        }
      } else {
        this.dialog.allEnterConfig[param[1]].type = 'input'
      }
      if (param[2]) {
        this.dialog.allEnterData['values' + param[1]] = ''
      }
      // console.log(this.dialog)
    },
    /**
     * 切换输入配置规则设置value
     * @param {Array} param // 选择的值和后面表单的类型
     */
    outputChange(param) {
      // console.log(param)
      if (param[0] === '0002') {
        this.dialog2.allOutputConfig[param[1]].values = dictionaryFieds(
          'AM9800',
          true
        )
      } else if (param[0] === '0012') {
        this.dialog2.allOutputConfig[param[1]].values = dictionaryFieds(
          'AM9800',
          true
        )
      } else {
        this.dialog2.allOutputConfig[param[1]].values = dictionaryFieds(
          'AM6e00',
          true
        )
      }
    },
    /**
     * 初始化输入和输出配置下拉框值
     */
    initConfig() {
      this.$nextTick(() => {
        this.dialog.enterConfig.typeData = this.datas.typeData
        this.dialog2.outputConfig.typeData = this.datas.outPutData
      })
      this.dialog.enterConfig.condition = dictionaryFieds('AM9700', true)
      this.dialog2.outputConfig.condition = dictionaryFieds('AM9700', true)
    },

    /**
     * 获取输入配置规则字段数据
     * @param {Number} param // 数据后面的数字
     */
    createEnterData(param) {
      return {
        [`operSym${param}`]: '',
        [`leftBrak${param}`]: '',
        [`typeData${param}`]: '',
        [`condition${param}`]: '',
        [`values${param}`]: '',
        [`rightBrak${param}`]: ''
      }
    },
    /**
     * 获取输出配置规则字段数据
     * @param {Number} param // 数据后面的数字
     */
    createOutData(param) {
      return {
        [`typeData${param}`]: '',
        [`condition${param}`]: '==',
        [`values${param}`]: ''
      }
    },
    /**
     * 关闭
     */
    dialogClose() {
      this.$refs['refFormDialog'].resetForm()
      this.$nextTick(() => {
        this.$emit('dialogClose', false)
      })
      this.dialog.allEnterConfig = []
      this.dialog2.allOutputConfig = []
    },
    /**
     * 确定
     */
    dialogSubmit() {
      console.log(this.dialog)
      console.log(this.dialog2)
      console.log(this.datas.formData)
      console.log(this.oldformData.formData)
      this.$refs['refFormDialog'].validateForm()
      this.$refs.enterForm.validate((valid) => {
        // 表单校验
        if (valid) {
          // 拼接输入配置
          const { allEnterConfig, allEnterData, enterData } = this.dialog
          let str = ''
          for (const key of allEnterConfig.keys()) {
            for (const i in enterData) {
              if (!(key === 0 && i === 'operSym')) {
                if (i === 'operSym') {
                  str += '#head#' + allEnterData[i + key]
                } else {
                  str += '##' + allEnterData[i + key]
                }
              }
            }
          }
          // 拼接输出配置
          const { allOutputConfig, allOutputData, outputData } = this.dialog2
          let str2 = ''
          for (const key of allOutputConfig.keys()) {
            for (const i in outputData) {
              if (i === 'typeData' && key) {
                str2 += '#head#' + allOutputData[i + key] + '##'
              } else {
                str2 += allOutputData[i + key] + '##'
              }
            }
          }
          const rule_param = str + '@' + str2 // 拼接后的输入输出配置
          if (commonBlank(str) && commonBlank(str2)) {
            commonMsgWarn('输入或输出规则为空', this)
            return
          }
          commonMsgConfirm('是否确认提交？', this, (flag) => {
            if (flag) {
              let msg = {}
              if (this.datas.btn === '新增') {
                const { rule_desc, is_open, prio_level, organ_no, rule_type } =
                  this.datas.formData
                msg = {
                  parameterList: [
                    {
                      rule_no:
                        this.datas.btn === 'add'
                          ? ''
                          : this.datas.formData.rule_no,
                      rule_table: '',
                      rule_desc,
                      is_open,
                      prio_level,
                      rule_param,
                      organ_no,
                      is_lock:
                        this.datas.btn === 'add'
                          ? 'admin'
                          : this.datas.formData.is_lock,
                      rule_type
                    }
                  ],
                  oper_type: 'OP001'
                }
              } else {
                const {
                  rule_no,
                  rule_desc,
                  is_open,
                  prio_level,
                  organ_no,
                  rule_type
                } = this.datas.formData
                msg = {
                  parameterList: [
                    {
                      rule_no,
                      rule_desc,
                      is_open,
                      prio_level,
                      rule_param,
                      organ_no,
                      is_lock: 'admin',
                      rule_table: '',
                      rule_type
                    }
                  ],
                  oper_type: 'OP003',
                  oldRuleDesc: this.oldformData.formData.rule_desc,
                  oldIsOpen: this.oldformData.formData.is_open,
                  oldRuleParam: this.oldformData.formData.rule_param,
                  oldOrganNo: this.oldformData.formData.organ_no,
                  oldRuleType: this.oldformData.formData.rule_type
                }
              }
              ruleQuery(msg).then((res) => {
                const { retCode, retMsg } = res
                if (retCode === '200') {
                  commonMsgSuccess(retMsg, this)
                  this.$parent.dialogChange(false)
                  this.$parent.queryList()
                }
              })
            }
          })
        }
      })
    },
    /**
     * 表单校验
     * @param {Boolean}valid 校验返回值
     */
    validateForm(valid) {
      if (valid) {
        this.$emit('dialogSubmit', this.datas.formData)
        // this.dialogClose()
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  height: 450px;
  overflow: auto;
  .content {
    width: 100%;
    margin-bottom: 5px;
    padding: 0 10px;
    border: 1px solid #cdcdcd;

    .titles {
      line-height: 30px;
      padding-bottom: 20px;
      text-align: left;
      .addBtns {
        padding-left: 10px;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
  }
  .output-content {
    .el-form {
      padding-left: 100px;
    }
  }
}
.dialog-footer {
  text-align: right;
}
</style>
