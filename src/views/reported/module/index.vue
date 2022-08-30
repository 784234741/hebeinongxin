<template>
  <div v-loading="loading" class="app-container">
    <div class="sun-content">
      <div class="filter-container">
        <sun-form
          :config="config"
          :default-form="defaultForm"
          :reset="false"
          :query="btnAll.btnQuery"
          @query="queryList"
        />
      </div>
    </div>
    <table-list
      ref="tableListRef"
      :default-form="defaultForm"
      :table-column="columns"
      :button-obj="buttonObj"
      :btn-all="btnAll"
      :eles="eles"
    />
  </div>
</template>
<script>
import { SunForm } from '@/components' // 表单
import { dictionaryGet } from '@/utils/dictionary' // 字典配置
import { permissionsBtn } from '@/utils/permissions' // 权限配置
import TableList from './component/table' // 表格
import store from '@/store'
import { v1 as uuidv1 } from 'uuid'
import { RepSys } from '@/api'
const { init } = RepSys
export default {
  name: 'Module',
  components: { SunForm, TableList },
  props: {
    buttonId: {
      type: String,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      module_no: '', // 页面id
      loading: false,
      isShow: false,
      config: {},
      defaultForm: {},
      columns: [],
      buttonObj: {},
      eles: {},
      externalDataArr: [],
      btnAll: {
        btnQuery: true,
        btnAdd: true,
        btnDelete: true,
        btnModify: true
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.init()
    })
  },
  methods: {
    /**
     * 页面初始化*/
    init() {
      // this.module_no = '#C10021'
      // this.module_no = '#C10016'
      // this.module_no = '#C10014'
      this.loading = true
      this.module_no = this.$route.meta.module_no
      const msg = {
        parameterList: [{}],
        oper_type: dictionaryGet('OPERATE_OTHER'),
        module_no: this.module_no
      }
      init(msg)
        .then((response) => {
          this.eles = Object.assign({}, response.retMap)
          this.eles = Object.assign(this.eles, { pkList: [] })
          var list = this.eles.list
          for (var i = 0, len = list.length; i < len; i++) {
            var pk_name = list[i]
            this.eles.pkList.push(pk_name.column_name)
          }
          const { queryBarList, columns, module_fun } = response.retMap
          this.cmModular_initQueryBar(queryBarList)
          this.formatColnums(columns)
          this.initButton(module_fun)
          this.$nextTick().then(() => {
            this.btnPermissions() // 按钮权限
            if (this.btnAll.btnQuery) {
              this.queryList()
            }
            this.loading = false
          })
        })
        .catch(() => {})
    },
    /**
     * 按钮权限配置*/
    btnPermissions() {
      this.btnAll = permissionsBtn(this.buttonId, this.btnAll)
    },
    /**
     * 构建查询栏*/
    cmModular_initQueryBar(queryBarList) {
      const form = {}
      const formData = {}
      for (let i = 0; i < queryBarList.length; i++) {
        const data = queryBarList[i]
        const formEle = this.cmModular_initFormEle(data)
        form[data.elem_english] = formEle
        formData[data.elem_english] = ''
      }
      this.config = Object.assign({}, form)
      this.defaultForm = Object.assign({}, formData)
    },
    /**
     * 构建表单内容*/
    cmModular_initFormEle(data) {
      const formEle = {
        component: '',
        label: data.elem_chinese,
        colSpan: 6,
        name: data.elem_english,
        config: {
          rules: []
        },
        componentProps: {
          clearable: true
        },
        options: []
      }
      if (data.show_type === '1') {
        // 文本框
        formEle.component = 'input'
        formEle.config.rules.push({
          min: 0,
          max: data.elem_length,
          message: '最多' + data.elem_length + '个字符',
          trigger: 'blur'
        })
        if (data.is_required === '1') {
          formEle.config.rules.push({
            required: true,
            message: data.elem_chinese + '为必输',
            trigger: 'blur'
          })
        }
      } else if (data.show_type === '3') {
        // 下拉框
        formEle.component = 'select'
        formEle.options = this.dictionaryArr(
          this.$store.state.common.dictionaryLet[data.data_sources]
        )
        if (data.is_required === '1') {
          formEle.config.rules.push({
            required: true,
            message: data.elem_chinese + '为必输',
            trigger: 'blur'
          })
        }
      } else if (data.show_type === '4') {
        // 下拉树
        formEle.component = 'select-tree'
        formEle.options = this.$store.getters.organTree
        if (data.is_required === '1') {
          formEle.config.rules.push({
            required: true,
            message: data.elem_chinese + '为必输',
            trigger: 'blur'
          })
        }
      }
      return formEle
    },
    /**
     * 初始化表头*/
    formatColnums(columns) {
      const cols = []
      const rn = {
        name: 'rn',
        label: '序号',
        id: uuidv1(),
        sources_type: '',
        data_sources: ''
      }
      cols.push(rn)
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].sources_type === '5') {
          this.formatExterSource(columns[i].data_sources)
        }
        const col = {
          name: columns[i].name,
          label: columns[i].label,
          id: uuidv1(),
          sources_type: columns[i].sources_type,
          data_sources: columns[i].data_sources
        }
        cols.push(col)
      }
      this.columns = cols
    },
    /**
     * 初始化按钮*/
    initButton(module_fun) {
      const moduleFunArr = module_fun.split(',')
      const obj = {
        btnAdd: false,
        btnMod: false,
        btnDel: false
      }
      for (let i = 0; i < moduleFunArr.length; i++) {
        if (moduleFunArr[i] === '2') {
          obj.btnAdd = true
        }
        if (moduleFunArr[i] === '3') {
          obj.btnMod = true
        }
        if (moduleFunArr[i] === '4') {
          obj.btnDel = true
        }
      }
      this.buttonObj = Object.assign({}, obj)
    },
    /**
     * 按钮：查询*/
    queryList() {
      this.$refs.tableListRef.queryList(1)
    },
    /**
     * 数据源转化为数组*/
    dictionaryArr(fieldStr) {
      let datas = []
      const fieldArr = fieldStr.split('&').sort()
      for (const key of fieldArr) {
        const arr = key.split('#-#')
        datas = [...datas, { id: arr[0], label: arr[2], value: arr[1] }]
      }
      return datas
    },
    /**
     * 外表数据源查询并存入字典*/
    async formatExterSource(key) {
      if (!this.$store.getters.externalData[key]) {
        await store.dispatch('common/setExternalData', key)
      }
    }
  }
}
</script>
<style scoped></style>
