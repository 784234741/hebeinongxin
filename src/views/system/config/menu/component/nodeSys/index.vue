<!--右侧属性配置-->
<template>
  <div class="app-container sun-content">
    <div class="sun-card-title">菜单维护</div>
    <sun-form
      ref="refFormNode"
      :config="config"
      :default-form="defaultForm"
      :query="false"
      :reset="false"
      :disabled-form="disabledForm"
      :label-width="'120px'"
      @validateForm="validateForm"
    >
      <!--图标 begin-->
      <div
        v-for="item in config.menu_class.options"
        :key="item.value"
        :slot="'menu_class_' + item.value"
      >
        <sun-svg-icon :icon-class="item.value" /> {{ item.value }}
      </div>
      <!--图标 end-->
    </sun-form>
    <sun-button
      :button-style="buttonStyle"
      :btn-add="btnVisible.add"
      :btn-modify="btnVisible.modify"
      :btn-save="btnVisible.save"
      :btn-check-btn="btnVisible.check"
      :btn-operator-btn="btnVisible.operator"
      @handleAdd="handleAdd"
      @handleModify="handleModify"
      @handleSave="handleSave"
      @handleCheckBtn="handleCheckBtn"
      @handleOperatorBtn="handleOperatorBtn"
    />
  </div>
</template>

<script>
import { SunForm, SunButton } from '@/components'
import { commonBlank } from '@/utils/common'
import { commonMsgWarn } from '@/utils/message'
import { config } from './info' // 表单配置
import svgIcons from '@/assets/img/icons/svg-icons' // 图标

export default {
  name: 'NodeSys',
  components: {
    SunForm,
    SunButton
  },
  props: {
    currentData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    oldData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      config: config(this),
      defaultForm: {
        menu_name: '',
        name: '',
        path: '',
        menu_class: '',
        menu_type: '1',
        home_show: '0',
        menu_desc: ''
      },
      disabledForm: false,
      buttonStyle: {
        textAlign: 'right'
      },
      btnVisible: {
        add: this.$attrs['btn-all'].btnAdd,
        modify: this.$attrs['btn-all'].btnModify,
        save: false,
        check: true,
        operator: false
      },
      operator: 'add', // 操作标识
      operator2: '',

      timeout: null,
      resultsAll: []
    }
  },
  watch: {
    currentData(value) {
      // 监听visible, 清空表单
      this.$nextTick(() => {
        const {
          label,
          path,
          name,
          menu_class,
          menu_type,
          home_show,
          menu_desc
        } = this.currentData
        this.defaultForm = {
          menu_name: label,
          name: name,
          path: path,
          menu_class: menu_class,
          menu_type: menu_type,
          home_show: home_show,
          menu_desc: menu_desc
        }
        this.disabledForm = true
      })
    }
  },
  mounted() {
    this.handleSvgIcons()
  },
  methods: {
    /**
     * 图标列表 */
    handleSvgIcons() {
      let datas = []
      for (const item of svgIcons) {
        const itemKey = {
          value: item,
          label: item
        }
        datas = [...datas, itemKey]
      }
      this.config.menu_class.options = datas
    },
    /**
     * 数据格式化
     * @param {Array} listData 用户英文名称过滤列表
    */
    resultsAllData(listData) {
      let datas = []
      for (const key of listData) {
        if (!commonBlank(key.name)) {
          datas = [...datas, {
            value: key.name,
            label: key.name
          }]
        }
        if (!commonBlank(key.children)) {
          datas = [...datas, ...this.resultsAllData(key.children)]
        }
      }
      return datas
    },
    // 新增
    handleAdd() {
      this.permissionsBtn.$emit('busEvent', 'add')
      // this.resultsAll = JSON.parse(JSON.stringify(this.oldData))
      this.resultsAll = this.resultsAllData(this.oldData)
      this.operator = 'add'
      this.$refs['refFormNode'].resetForm()
      this.disabledForm = false
      this.btnVisible = {
        add: false,
        modify: false,
        save: this.$attrs['btn-all'].btnSave,
        check: false,
        operator: true
      }
    },
    // 修改
    handleModify() {
      if (this.currentData.id === '1') {
        commonMsgWarn('根节点不允许修改', this)
        return
      }
      // this.resultsAll = JSON.parse(JSON.stringify(this.oldData))
      this.resultsAll = this.resultsAllData(this.oldData)
      this.operator = 'modify'
      this.disabledForm = false // 表单可操作
      this.btnVisible = {
        add: false,
        modify: false,
        save: this.$attrs['btn-all'].btnSave,
        check: false,
        operator: true
      }
    },
    // 保存 按钮配置
    handleSaveBtn() {
      this.disabledForm = true // 表单可操作
      this.btnVisible = {
        add: true,
        modify: true,
        save: false,
        check: true,
        operator: false
      }
    },
    // 保存
    handleSave() {
      this.$refs['refFormNode'].validateForm()
    },
    // 查看页面按钮配置
    handleCheckBtn() {
      this.$emit('handleCheckBtn', this.defaultForm)
    },
    // 编辑页面按钮配置
    handleOperatorBtn() {
      this.operator2 = 'btn'
      this.$refs['refFormNode'].validateForm()
      // this.$emit('handleOperatorBtn', this.defaultForm)
    },
    // 编辑页面按钮配置
    handleOperator() {
      this.$emit('handleOperatorBtn', this.defaultForm)
    },
    /**
     * 表单校验
     * @param {Boolean}valid 校验返回值*/
    validateForm(valid) {
      if (valid) {
        if (this.operator2 === 'btn') {
          // 编辑页面按钮
          this.handleOperator()
          this.operator2 = ''
        } else if (this.operator === 'add') {
          // 新增
          this.$emit('handleAdd', this.defaultForm)
        } else if (this.operator === 'modify') {
          // 修改
          this.$emit('handleModify', this.defaultForm)
        }
      } else {
        return false
      }
    },
    /**
     * 选中节点 - 按钮配置
     * @param {Object}data 当前选中行*/
    currentNode(data) {
      const {
        label,
        path,
        name,
        menu_class,
        menu_type,
        home_show,
        menu_desc
      } = data
      // 所有路由列表
      const allName = this.resultsAllData(this.oldData)
      this.resultsAll = []
      // for (const [index, item] of allName.entries()) {
      for (const item of allName) {
        if (item.value !== name) {
          this.resultsAll.push(item)
        }
      }
      this.disabledForm = true
      this.btnVisible.save = false
      this.btnVisible.modify = true
      this.btnVisible.add = true
      this.btnVisible.check = true
      this.btnVisible.operator = false
      this.defaultForm = {
        menu_name: label,
        name: name,
        path: path,
        menu_class: menu_class,
        menu_type: menu_type,
        home_show: home_show,
        menu_desc: menu_desc
      }
    },
    rulesBtn() {
      this.disabledForm = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .sun-content{
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: auto;
  }
</style>
