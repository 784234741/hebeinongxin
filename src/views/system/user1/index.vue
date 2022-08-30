<template>
  <div class="app-container">
    <div class="sun-content">
      <div class="filter-container">
        <sun-form
          :config="config"
          :default-form="defaultForm"
          @query="queryList"
        >
          <!-- <template slot="header">
          </template> -->
        </sun-form>
      </div>
    </div>
    <table-list
      ref="tableListRef"
      :rolelist="config.role_no.options"
      :default-form="defaultForm"
      :btn-all="btnAll"
      @roleNoFormat="roleNoFormat"
    />
  </div>
</template>

<script>
import { SunForm } from '@/components' // 表单
import { config } from './info' // 表单配置
import TableList from './component/table' // 表格
import { dictionaryFieds, treeDataTranslate } from '@/utils/dictionary' // 字典配置
import { permissionsBtn } from '@/utils/permissions' // 权限配置

import { SysUser } from '@/api'
const { roleNoTree } = SysUser
export default {
  name: 'User',
  components: { SunForm, TableList },
  data() {
    return {
      config: config(this),
      defaultForm: {
        organ_no: '',
        user_no: '',
        login_mode: '',
        login_state: '',
        role_no: [],
        user_status: ''
      },
      rolelist: [],
      btnAll: { // 当前页需要配置权限的按钮  权限获取
        btnQuery: false,
        btnAdd: true,
        btnDelete: true,
        btnModify: true,
        btnLoginOut: true,
        btnBatch: true,
        btnResetPsd: true,
        btnEnableDisable: true
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.btnPermissions() // 按钮权限
      this.organTreeGet()
      this.queryList()
    })
  },
  methods: {
    /**
     * 按钮权限配置*/
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
    },
    /**
     * 配置机构树*/
    organTreeGet() {
      this.config.organ_no.options = this.$store.getters.organTree
      this.config.login_mode.options = dictionaryFieds('USER_LOGIN_TYPE')
      this.config.login_state.options = dictionaryFieds('USER_LOGIN_STATE')
      this.config.user_status.options = dictionaryFieds('USER_STATE')
      this.roleNo()
    },
    /**
     * 按钮：查询*/
    queryList() {
      this.$refs.tableListRef.queryList(1)
    },
    /**
     * 角色获取
     */
    roleNo() {
      const role_level = this.$store.getters.organLevel + '00'
      const msg = {
        oper_type: 'rolelist',
        role_level: role_level
      }
      roleNoTree(msg).then((response) => {
        const { rolelist } = response.retMap
        this.rolelist = rolelist
        this.config.role_no.options = treeDataTranslate(rolelist)
      })
    },
    /**
     * 格式化role_no
     */
    roleNoFormat(role_no, callback) {
      var role_nos = role_no.split(',')
      var retValue = ''
      for (const key of role_nos) {
        for (const key1 of this.rolelist) {
          if (key === key1.role_no) {
            retValue += ',' + key1.role_name
          }
        }
      }
      callback(retValue.substring(1))
    }
  }
}
</script>
<style scoped></style>
