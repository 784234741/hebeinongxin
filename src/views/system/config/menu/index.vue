<!--菜单配置-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="14" style="position:relative">
        <div class="app-container sun-content sun-content-center">
          <div class="sun-card-title">
            菜单管理
          </div>
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"
          />
          <el-tree
            ref="tree"
            v-loading="loading"
            class="sun-card-content"
            :data="data"
            :props="defaultProps"
            node-key="id"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            highlight-current
            :current-node-key="defaultId"
            :default-expanded-keys="[defaultId]"
            @current-change="getCurrentNode"
          >
            <span slot-scope="{ node, dataT }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span
                v-if="node.data.id!=='1' && node.data.id!=='#100000' && node.data.id!=='#110000' && node.data.id!=='#111000'
                  && btnAll.btnDelete"
              >
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, dataT)"
                >
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="10">
        <node-sys
          ref="refNodeSys"
          :old-data="data"
          :current-data="currentData"
          :btn-all="btnAll"
          @handleAdd="handleAdd"
          @handleModify="handleModify"
          @handleCheckBtn="handleCheckBtn"
          @handleOperatorBtn="handleOperatorBtn"
        />
      </el-col>
    </el-row>
    <TableDialogComp ref="refTableDialog" @handleDtnData="handleDtnData" />
  </div>
</template>
<script>
import { v1 as uuidv1 } from 'uuid'
import NodeSys from './component/nodeSys' // 树节点配置
import TableDialogComp from './component/dialog' // 页面按钮配置
import { commonMsgSuccess, commonMsgError, commonMsgConfirm, commonMsgWarn } from '@/utils/message.js' // 提示信息
import { commonBlank } from '@/utils/common'
import { permissionsBtn } from '@/utils/permissions' // 权限配置
import { SysMenu } from '@/api'
import Vue from 'vue'

const { getTreeData, saveTreeData, delTreeData } = SysMenu
Vue.prototype.permissionsBtn = new Vue() // 按钮权限
export default {
  name: 'Menu',
  components: {
    NodeSys,
    TableDialogComp
  },
  data() {
    return {
      loading: false, // 加载中
      filterText: '',
      currentData: {}, // 当前选中行
      oldData: [], // 格式化前路由
      data: [], // 格式化后路由
      defaultId: '1', // 默认选中
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      btnData: [], // 按钮配置：更新数据存储
      oldBtnData: [], // 按钮配置： 原始数据保存
      operator: 'add', // 操作标识
      btnAll: { // 当前页需要配置权限的按钮  权限获取
        btnAdd: true,
        btnModify: true,
        btnDelete: true,
        btnSave: true
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    // 监听树更新
    data(val) {
      if (val) {
        this.$nextTick(() => {
          this.currentData = this.$refs.tree.getCurrentNode()
          this.$refs.refTableDialog.currentNodeBtn()
        })
      }
    }
  },
  created() {
    this.initTree()
  },

  methods: {
    /**
     * 按钮权限配置*/
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
    },
    /**
     * 左侧树节点 按钮权限配置
     * @param {Array}data 按钮权限数据
     * @param {Array}oldBtnData 按钮权限数据 原始数据保存*/
    handleDtnData(data, oldBtnData) {
      this.btnData = data
      this.oldBtnData = oldBtnData
    },
    /**
     * 树初始化
    */
    initTree() {
      this.loading = true
      const msg = {
        'oper_type': 'QUERYALL'
      }
      getTreeData(msg).then(response => {
        this.loading = false
        const { menulist, menuMsg } = response.retMap
        if (commonBlank(menulist)) { // 路由返回为空
          commonMsgError(menuMsg, this)
          return
        }
        this.data = [] // 当前树数据
        let dataTree = []
        // this.oldData = menulist
        for (const key of menulist) {
          const data = { ...key }
          data['label'] = data.meta.title
          data['id'] = data.menu_id
          if (!commonBlank(data.children)) {
            data.children = this.formatTree(data.children)
          }
          dataTree = [...dataTree, data]
        }
        // 原数据存储
        // for (const item of this.oldData) {
        //   item['value'] = item.name
        // }
        this.data = [{ // 配置根节点
          id: this.defaultId,
          menu_id: '#000000',
          label: '菜单配置',
          path: '/',
          menu_type: '1',
          home_show: '0',
          children: [
            ...dataTree
          ]
        }]
      }).catch((error) => {
        this.loading = false
        commonMsgError(error, this)
      })
    },
    // 菜单树初始化
    formatTree(menulist) {
      let dataList = []
      for (const key of menulist) {
        const data = { ...key }
        data['label'] = data.meta.title
        data['id'] = data.menu_id
        if (!commonBlank(data.children)) {
          data.children = this.formatTree(data.children)
        }
        dataList = [...dataList, data]
      }
      return dataList
    },
    /**
     * 新增节点 - 保存*/
    handleAdd(defaultForm) {
      const data = this.currentData
      const { path, menu_class, menu_name, home_show, name, menu_type, menu_desc } = defaultForm
      const newChild = { // 新增节点
        id: uuidv1(),
        label: menu_name,
        children: [],
        component: path, // 组件
        meta: { icon: menu_class, title: menu_name },
        ...defaultForm
      }
      const msg = {
        'parameterList':
        [
          {
            'menuName': menu_name, // 菜单名称
            'menuUrl': path, // 菜单路径
            'menu_class': menu_class, // 菜单图标
            'menu_type': menu_type, // 菜单分类
            'menu_attr': '', // 菜单属性
            'home_show': home_show,
            'name': name,
            'query_conditions': '', // 查询条件
            'menuDesc': menu_desc, // 菜单描述
            'menu_def': '', // 菜单定义
            'menuBelong': '0', // 配置选择 0-pc
            'isLock': this.$store.getters.userNo,
            'parentId': data.menu_id,
            'menuLevel': '1',
            'addBtn': this.btnFormate(this.btnData, 'add'), // 按钮权限
            'addEle': '' // 元素权限
            // 'redirect': '' // 重定向
          }
        ],
        'oper_type': 'ADDMENU',
        'isPC': true
      }
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
        if (param) {
          saveTreeData(msg).then(response => {
            const { retMsg } = response
            commonMsgSuccess(retMsg, this)
            if (!data.children) {
              this.$set(data, 'children', [])
            }
            data.children.push({ ...data, ...newChild })
            this.$refs.refNodeSys.handleSaveBtn()
            this.initTree()
          })
        }
      })
    },
    /**
     * 修改节点 - 保存
     * @param {Object}defaultForm 右侧表单配置 */
    handleModify(defaultForm) {
      const data = this.currentData
      const { path, menu_class, menu_name, home_show, name, menu_type, menu_desc } = defaultForm
      const modifyChild = {
        component: path,
        name: name,
        ...defaultForm
      }
      const btnDataDel = this.btnDataDel(this.btnData, this.oldBtnData) // 获取删除按钮数据
      const msg = {
        'parameterList':
        [
          {
            'menuName': menu_name, // 菜单名称
            'menuUrl': path, // 菜单路径
            'menu_class': menu_class, // 菜单图标
            'menu_type': menu_type, // 菜单分类
            'menu_attr': '', // 菜单属性
            'home_show': home_show,
            'name': name,
            'query_conditions': '', // 查询条件
            'menuDesc': menu_desc, // 菜单描述
            'menu_def': '', // 菜单定义
            'menuBelong': '0', // 配置选择 0-pc
            'isLock': this.$store.getters.userNo,
            'menuId': data.menu_id,
            'menuLevel': '1',
            'addBtn': this.btnFormate(this.btnData, 'add'), // 按钮权限
            'delBtn': this.btnFormate(btnDataDel, 'del'), // 删除的按钮
            'addEle': '', // 元素权限
            'delEle': '' // 元素权限
            // 'redirect': '' // 重定向
          }
        ],
        'oper_type': 'UPDATEMENU',
        'isPC': true
      }
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
        if (param) {
          saveTreeData(msg).then(response => {
            const { retMsg } = response
            commonMsgSuccess(retMsg, this)
            const newData = Object.assign({}, data, modifyChild)

            // 删除当前节点
            const node = this.$refs.tree.getNode(this.currentData)
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
            // 追加修改节点
            this.$refs.tree.insertBefore(newData, this.currentData)
            this.$refs.refNodeSys.handleSaveBtn()
            this.initTree()
          })
        }
      })
    },
    /**
     * 删除节点
     * @param {Object}node node节点*/
    remove(node) {
      const dataId = node.data.id
      // if (dataId === '1') {
      //   commonMsgWarn('根节点不允许删除', this)
      //   return
      // }
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === dataId)
      if (node.childNodes.length > 0) {
        commonMsgWarn('有子菜单,不允许删除!', this)
        // commonMsgConfirm('确认删除当前节点及下级节点', this, (param) => {
        //   if (param) {
        //     this.removeNode(children, node.data, index)
        //   }
        // })
      } else {
        commonMsgConfirm('确认删除当前节点', this, (param) => {
          if (param) {
            this.removeNode(children, node.data, index)
          }
        })
      }
    },
    /**
     * 删除节点
     * @param {Array}children 交节点的子节点
     * @param {Number}index 当前节点索引
     * @param {Object}data 节点数据*/
    removeNode(children, data, index) {
      const msg = {
        'parameterList': [{
          'menuId': data.menu_id
        }],
        'oper_type': 'DELETEPAGE'
      }
      delTreeData(msg).then(response => {
        const { retMsg } = response
        commonMsgSuccess(retMsg, this)
        children.splice(index, 1)
      })
    },
    /**
     * 初始化按钮
     * 如：'btnAdd&新增,btnDel&删除'
     * @param {Array} data 按钮配置数据
     * @param {String} param 当前格式化类型 'add'、'del'*/
    btnFormate(data, param) {
      // 按钮格式初始化
      let btnData = []
      for (const key of data) {
        if (param === 'add') {
          btnData = [...btnData, `${key.buttonId}&${key.buttonName}`]
        } else {
          btnData = [...btnData, `${key.buttonId}`]
        }
      }
      return btnData.join(',')
    },
    /**
     * 获取删除的按钮
     * @param {Array} data 按钮配置最新数据
     * @param {Array} oldData 按钮配置原数据*/
    btnDataDel(data, oldData) {
      let delData = [] // 删除的数据
      for (const itemOld of oldData) {
        let flag = '0'
        for (const item of data) {
          if (itemOld.buttonId === item.buttonId) {
            flag = '0'
            break
          } else {
            flag = '1'
          }
        }
        if (flag === '1') {
          delData = [...delData, itemOld]
        }
      }
      return delData
    },
    /**
     * 选中节点
     * @param {Object}data 选中行数据
    */
    getCurrentNode(data) {
      this.currentData = data
      this.$nextTick(() => {
        this.$refs.refNodeSys.currentNode(data)
        this.$refs.refTableDialog.currentNodeBtn(data)
      })
    },
    // 查看页面按钮配置
    handleCheckBtn() {
      this.$refs.refTableDialog.dalogOpen('check')
    },
    // 编辑页面按钮配置， 打开按钮配置弹出框
    handleOperatorBtn() {
      this.$refs.refTableDialog.dalogOpen('operator')
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 2rem 2rem 0
}
.sun-content-center{
  overflow: auto;
}
.sun-card-content{
  top: 0rem;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 0.8rem;
  }
</style>
