<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="16" style="position:relative">
        <div class="app-container sun-content sun-content-center">
          <div class="sun-card-title">
            {{ title }}
          </div>
          <div class="sun-card-content sun-card-left">
            <sun-form
              :config="config"
              :query="btnAll.btnQuery"
              :default-form="defaultForm"
              @query="queryList"
            />
            <table-list
              ref="tableListRef"
              :default-form="defaultForm"
              :btn-all="btnAll"
              @query="queryList"
              @handleCurrentChange="handleCurrentChange"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="8" style="position:relative">
        <div class="app-container sun-content sun-content-center">
          <div class="sun-card-title">
            <span v-if="isRole">{{ '{' + theRole + '}' }}</span>
            {{ treeTitle }}
          </div>
          <div class="sun-card-content">
            <TreeList ref="treeRef" :btn-all="btnAll" @treeTitle="treeTitleHandle" @queryList="queryList" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { SysRole } from '@/api'

import { SunForm } from '@/components' // 表单
import { config } from './info' // 表单配置
import TableList from './component/table' // 表格
import TreeList from './component/tree' // 表格

import { dictionaryFieds } from '@/utils/dictionary' // 字典配置
import { permissionsBtn } from '@/utils/permissions' // 权限配置

const { roleInfo } = SysRole // 测试接口

export default {
  name: 'Role',
  components: { SunForm, TableList, TreeList },
  data() {
    return {
      title: '角色定义配置',
      treeTitle: '角色权限配置',
      treeTitleM: '角色权限配置',
      config: config(this),
      defaultForm: {
        role_no: '',
        organ_level: '',
        role_mode: '',
        is_open: ''
      },
      currentData: {}, // 当前选中行
      checkedArr: [], // 存储树形组件的id值
      theRole: '', // 左侧树用户角色号
      isRole: false, // 角色号是否显示
      btnAll: { // 当前页需要配置权限的按钮  权限获取
        btnQuery: false,
        btnAdd: true,
        btnDelete: true,
        btnModify: true,
        btnEmpty: true,
        btnSave: true
      }
    }
  },
  created() {
    this.config.organ_level.options = dictionaryFieds('ORGAN_LEVEL') // 角色机构
    this.config.role_mode.options = dictionaryFieds('ROLE_MODE') // 角色类别
    this.config.is_open.options = dictionaryFieds('IS_OPEN') // 角色类别
    this.btnPermissions() // 按钮权限
    this.$nextTick().then(() => {
      if (this.btnAll.btnQuery) {
        this.queryList()
      }
      // this.roleInfoTitle()
    })
  },
  methods: {
    /**
     * 按钮权限配置*/
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
    },
    /**
     * 按钮：查询*/
    queryList() {
      this.treeTitle = this.treeTitleM
      this.$refs.tableListRef.queryList(1) // 查询左侧表格
      this.$refs.treeRef.initTree() // 查询右侧树
    },
    /**
     * 渲染树的选中节点
     */
    setCheckedKeys(id) {
      this.$refs.tree.setCheckedKeys(id)
    },
    /**
     * 页面要素配置*/
    roleInfoTitle() {
      // 查询角色信息（sm_role_tb）
      const msg = {
        'oper_type': 'role_no'
      }
      roleInfo(msg).then(response => {
        // const { roleNoList } = response.retMap
      }).catch(() => {
      })
    },
    /**
     * 右侧树title配置*/
    treeTitleHandle(param) {
      if (this.currentData) {
        const { role_no, role_name } = this.currentData
        this.treeTitle = `{${role_no}_${role_name}} ${param}`
      }
    },
    /**
     * 选中当前行
     * @param {Object} row 选中行数据*/
    handleCurrentChange(row) {
      if (row) {
        this.currentData = row
        this.$refs.treeRef.clickRowHandle(row)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 2rem 2rem 0
}
.sun-card-left{
  overflow: hidden;
}
</style>
