<!--参数配置页面  -->
<template>
  <div class="sysParams-out">
    <!-- <sun-sun-button :btn-save="true" :btn-cancle="true" /> -->
    <div class="sysParams">
      <div v-for="(item, key) in configObj" :key="key" class="outBox">
        <div class="title">{{ item.title }}</div>
        <div v-for="(item2, index) in item.arr" :key="index" class="innerBox">
          <div v-if="item2.c_param_desc !== ''" class="subTitle">
            {{ item2.c_param_desc }}
          </div>
          <sun-form
            :config="item2.config"
            :default-form="item2.defaultForm"
            label-width="22rem"
            :query="false"
            :reset="false"
          />
        </div>
      </div>

      <div class="button-line">
        <el-button type="primary" @click="update">更新</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { SysParams } from '@/api'
import { SunForm } from '@/components' // 表单
import { commonBlank } from '@/utils/common'
import { dictionaryGet, dictionaryFieds } from '@/utils/dictionary'
import { commonMsgSuccess } from '@/utils/message'
const { systemParam } = SysParams
export default {
  name: 'Params',
  components: { SunForm },
  data() {
    return {
      configObj: {},
      jsonData: []
    }
  },
  watch: {
  },
  created() {
    const msg = {
      parameterList: [],
      oper_type: dictionaryGet('OPERATE_QUERY'),
      content_about: 'AOS,DIGITAL'
    }
    systemParam(msg).then((res) => {
      const resobj = res.retMap
      resobj.classifyParamList.push(resobj.moduleParamList[0])
      const objObj = {}

      for (const k in resobj) {
        if (k === 'syslist') {
          objObj['syslist'] = {
            title: '系统公共参数设置',
            arr: [
              {
                c_param_desc: '',
                config: this.toFormConfig(resobj.syslist, this),
                defaultForm: this.toDefaultForm(resobj.syslist)
              }
            ]
          }
        }
        if (k === 'classifyParamList') {
          objObj['AM'] = {
            title: resobj.classifyParamList[0].param_desc,
            arr: resobj.classifyParamList.map((item) => {
              return {
                c_param_desc: item.c_param_desc,
                config: this.toFormConfig(item.module_params, this),
                defaultForm: this.toDefaultForm(item.module_params)
              }
            })
          }
        }

        if (k === 'classiSysfyParamList') {
          objObj['classiSysfyParamList'] = {
            title: '数据字典相关',
            arr: [
              {
                c_param_desc: '',
                config: [],
                defaultForm: {}
              }
            ]
          }
        }
      }
      this.configObj = objObj
    })
  },
  mounted() {
    this.$nextTick(() => {})
  },
  beforeDestroy() {},
  methods: {
    // 更新
    update() {
      const msg = {
        parameterList: [''],
        oper_type: dictionaryGet('OPERATE_MODIFY'),
        jsonData: this.jsonData,
        user_no: this.$store.getters.userNo
      }
      systemParam(msg).then((res) => {
        commonMsgSuccess(res.retMsg, this)
      })
    },
    // 构造options
    madeOptions(itemv) {
      const dataArr = []
      let choseStr = ''
      if (itemv.choosable.indexOf('-2-|') !== -1) {
        choseStr = itemv.choosable.substr(itemv.choosable.indexOf('-2-|') + 4)
        if (itemv.choosable.indexOf('，@，') >= 0) {
          // 自定义下拉数据
          const arr = choseStr.split('，@，')
          for (let int = 0; int < arr.length; int++) {
            const a = arr[int].split('-')
            const b = {
              value: a[0],
              label: arr[int]
            }
            dataArr.push(b)
          }
        } else {
          dataArr.push(choseStr)
        }
        // itemv['options'] = dataArr
        return dataArr
      }
      if (itemv.choosable.indexOf('-3-|') !== -1) {
        // 数据来源外表
        choseStr = itemv.choosable.substr(itemv.choosable.indexOf('-3-|') + 4)
        return this.$store.getters.externalData[choseStr]
      }
      if (itemv.choosable.indexOf('-1-|') !== -1) {
        // 数据字典多选下拉框
        const choseStr = itemv.choosable.substr(
          itemv.choosable.indexOf('-1-|') + 4
        )
        return dictionaryFieds(choseStr, true)
      }
    },
    // 构造表单配置
    toFormConfig(arr, that) {
      const configObj = {}
      arr.forEach((item) => {
        if (commonBlank(item.choosable)) {
          // 输入框
          configObj[item.param_item] = {
            component: 'input',
            label: item.param_desc,
            colSpan: 12,
            is_null: item.is_null,
            name: item.param_item,
            config: {
              // form-item 配置
            },
            componentProps: {
              change: function(item, defaultForm) {
                that.jsonData.push({
                  name: item.name,
                  value: defaultForm[item.name],
                  is_null: item.is_null
                })
              }
            }
          }
        } else if (item.choosable.startsWith('1|')) {
          // 文本域
          configObj[item.param_item] = {
            component: 'input',
            label: item.param_desc,
            colSpan: 24,
            is_null: item.is_null,
            name: item.param_item,
            config: {
              // form-item 配置
            },
            componentProps: {
              type: 'textarea',
              autosize: { minRows: 2, maxRows: 4 },
              change: function(item, defaultForm) {
                that.jsonData.push({
                  name: item.name,
                  value: defaultForm[item.name],
                  is_null: item.is_null
                })
              }
            }
          }
        } else if (
          item.choosable.startsWith('3-1-|') ||
          item.choosable.startsWith('3-2-|') ||
          item.choosable.startsWith('3-3-|')
        ) {
          // 下拉框
          // this.$set(this.optionsObj, item.param_item, [])
          // const dataArr = []
          configObj[item.param_item] = {
            component: 'select',
            label: item.param_desc,
            colSpan: 12,
            is_null: item.is_null,
            name: item.param_item,
            config: {},
            componentProps: {
              placehodler: '请选择',
              filterable: true,
              change: (item, defaultForm) => {
                that.jsonData.push({
                  name: item.name,
                  value: defaultForm[item.name],
                  is_null: item.is_null
                })
              }
            },
            options: this.madeOptions(item)
          }
        } else if (
          item.choosable.startsWith('4-1-|') ||
          item.choosable.startsWith('4-2-|') ||
          item.choosable.startsWith('4-3-|')
        ) {
          // 多选框
          configObj[item.param_item] = {
            component: 'select',
            label: item.param_desc,
            colSpan: 12,
            is_null: item.is_null,
            name: item.param_item,
            config: {},
            componentProps: {
              multiple: true,
              change: (item, defaultForm) => {
                that.jsonData.push({
                  name: item.name,
                  value: defaultForm[item.name].join(','),
                  is_null: item.is_null
                })
              }
            },
            options: this.madeOptions(item)
          }
        } else if (item.choosable.startsWith('5|')) {
          // 数字输入框
          configObj[item.param_item] = {
            component: 'number',
            label: item.param_desc,
            colSpan: 12,
            name: item.param_item,
            config: {
              // form-item 配置
            },
            componentProps: {
              // input组件配置
              change: (item, defaultForm) => {
                that.jsonData.push({
                  name: item.name,
                  value: defaultForm[item.name],
                  is_null: item.is_null
                })
              }
            }
          }
        }
      })
      return configObj
    },
    toDefaultForm(arr) {
      const keys = {}
      arr.forEach((item) => {
        if (
          item.choosable.startsWith('4-1-|') ||
          item.choosable.startsWith('4-2-|') ||
          item.choosable.startsWith('4-3-|')
        ) {
          keys[item.param_item] = item.param_value.split(',')
        } else {
          keys[item.param_item] = item.param_value
        }
      })
      return keys
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.sysParams-out {
  padding: 20px;
  .sysParams {
    .outBox {
      background-color: #fff;
      border-radius: 1rem;
      padding: 20px 40px 20px 10px;
      margin-bottom: 2rem;
      .title {
        padding: 20px;
        font-size: $titleFont;
        font-weight: bold;
      }
      .innerBox {
        border: 1px solid #f1f1f1;
        border-radius: 1rem;
        padding: 20px;
        margin-bottom: 4rem;
        position: relative;

        .subTitle {
          left: 50%;
          transform: translateX(-50%);
          top: -2rem;
          font-size: 1.4rem;
          font-weight: bold;
          position: absolute;
          background-color: #fff;
          padding: 1rem 2rem;
        }
      }
      // margin: 1rem;
    }
    .form-title {
      padding: 20px;
      font-size: $titleFont;
      font-weight: bold;
    }
    .form-box {
      background-color: #fff;
      margin-bottom: 20px;
      padding: 20px 40px 20px 10px;
    }
    .form-group {
      .form-title-group {
        padding: 30px 20px;
        font-size: $titleFont;
        font-weight: bold;
        text-align: center;
      }
      .form-group-form {
        padding: 10px 30px 10px 10px;
      }
    }
    .button-line {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
