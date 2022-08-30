<template>
  <div class="sun-content">
    <div class="sun-content-tree">
      <el-tree
        ref="tree"
        v-loading="loading"
        :data="treeData"
        show-checkbox
        auto-expand-parent
        check-strictly
        node-key="id"
        :default-expanded-keys="[defaultId, ...expandedKeys]"
        highlight-current
        :props="defaultProps"
        @check="handleCheckChange"
      />
    </div>
    <div class="sun-cont-footer">
      <sun-button
        :btn-empty="btnArr.btnEmpty"
        :btn-save="btnArr.btnSave"
        @handleEmpty="handleEmpty"
        @handleSave="handleSave"
      />
      <!-- <div class="footer-left">双击按钮节点设置按钮操作页面要素的权限</div> -->
    </div>
  </div>
</template>

<script>
import { SunButton } from '@/components'
import { commonMsgConfirm, commonMsgSuccess } from '@/utils/message'
import { commonCompareIncludeModule } from '@/utils/permissions'
import { dictionaryGet } from '@/utils/dictionary'
import { SysRole } from '@/api'
const { tree, clickRow, clickRowModel, treeSave, treeModel } = SysRole

export default {
  name: 'TreeList',
  components: { SunButton },
  props: {},
  data() {
    return {
      currentData: {}, // 选中行数据
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [], // 树形组件的数据
      treeDataMenuBtn: [], // 菜单、按钮
      treeDataModel: [], // 监测模型
      defaultId: '#000000', // 默认展开根节点
      expandedKeys: [], // 展开节点配置
      oldCurrentRole: '', // 上一次选中的角色号
      lastRowType: '0', // 上一次所点击行角色类型;普通角色0 模型角色1
      btnArr: {
        btnEmpty: false,
        btnSave: false
      },
      oldSelectDatas: [], // 默认选中节点
      backdata: [], // 保存数据合并
      module: '25' // 预警权限编号
    }
  },
  watch: {},
  beforeCreate: function() {},
  created() {
    // this.initTree()
  },
  methods: {
    /**
     * 初始化树
     */
    initTree() {
      this.showLoading()
      this.btnEnabled(false)
      this.oldSelectDatas = []
      this.oldCurrentRole = ''
      if (this.treeData.length > 0) {
        this.$refs.tree.setCheckedKeys([]) // 清空所有选中
        this.treeData = []
      }

      // 初始化树操作 获取菜单、按钮
      const msg = {
        oper_type: 'INIT'
      }
      tree(msg)
        .then((response) => {
          const { menuList, buttonList } = response.retMap
          const btnData = this.buttonFormate(buttonList)
          const mentData = [...menuList, ...btnData]
          const treeData = [
            {
              // 配置根节点
              id: this.defaultId,
              label: 'PC端',
              path: '/',
              children: [...this.treeDataTranslate(mentData)]
            }
          ]
          this.treeData = treeData
          this.treeDataMenuBtn = treeData
          this.showLoading()
        })
        .catch(() => {
          this.showLoading()
        })
      // 初始化树操作 监测系统初始化模型树
      if (commonCompareIncludeModule(this.module)) {
        const msgM = {
          oper_type: 'initModelTree'
        }
        treeModel(msgM)
          .then((response) => {
            const { busiTypeList, modelList } = response.retMap
            const modelBusi = this.modelFormate(
              busiTypeList,
              '-1',
              'BUSI_NO',
              'BUSI_NAME',
              0
            )
            const modelLi = this.modelFormate(
              modelList,
              'MODEL_BUSI_TYPE',
              'BUSI_NO',
              'NAME',
              1
            )
            this.treeDataModel = [
              ...this.treeDataTranslate([...modelBusi, ...modelLi])
            ]
          })
          .catch(() => {})
      }
    },
    /**
     * 初始化数据切换
     * @param {Array} data 右侧数据*/
    treeModelMenu(data) {
      this.btnEnabled(false)
      this.treeData = data
    },
    /**
     * 单击树节点: 节点选中状态发生变化时的回调  begin ----------------------------------------------
     * @param {Object}data：currentObj 该节点所对应的对象
     * @param {Boolean}checked：treeStatus 节点本身是否被选中
     */
    handleCheckChange(currentObj, treeStatus) {
      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      const selected = treeStatus.checkedKeys.indexOf(currentObj.id) // -1未选中
      // 选中
      if (selected !== -1) {
        this.selectedParent(currentObj) // 子节点只要被选中父节点就被选中
        this.uniteChildSame(currentObj, true) // 统一处理子节点为相同的勾选状态
      } else {
        if (currentObj.children.length !== 0) {
          // 未选中 处理子节点全部未选中
          this.uniteChildSame(currentObj, false)
        }
      }
    },
    /**
     * 统一处理子节点为相同的勾选状态
     * @param {Object} treeList 选中节点
     * @param {Boolean} isSelected 选中状态
     * */
    uniteChildSame(treeList, isSelected) {
      this.$refs.tree.setChecked(treeList, isSelected)
      for (let i = 0; i < treeList.children.length; i++) {
        this.uniteChildSame(treeList.children[i], isSelected)
      }
    },
    /**
     * 统一处理父节点为选中
     * @param {Object}currentObj 当前选中节点的父节点*/
    selectedParent(currentObj) {
      const currentNode = this.$refs.tree.getNode(currentObj)
      if (currentNode.parent.key !== undefined) {
        this.$refs.tree.setChecked(currentNode.parent, true)
        this.selectedParent(currentNode.parent)
      }
    },
    /* 单击树节点: 节点选中状态发生变化时的回调  end ----------------------------------------------*/

    /**
     * 单击行、初始化树
     * @param {Object}row 当前行数据*/
    clickRowHandle(row) {
      this.currentData = row
      this.btnEnabled(true)
      const { role_no, role_mode } = this.currentData
      if (this.oldCurrentRole !== role_no) {
        if (commonCompareIncludeModule(this.module) && role_mode === '3') {
          // 监测系统且模型是3模型类型的角色
          if (this.lastRowType === '0') {
            this.treeModelMenu(this.treeDataModel)
            this.lastRowType = '1'
          }
          this.$emit('treeTitle', '模型权限配置')
          this.updatedTreeModel()
        } else {
          if (this.lastRowType === '1') {
            this.treeModelMenu(this.treeDataMenuBtn)
            this.lastRowType = '0'
          }
          this.$emit('treeTitle', '角色权限配置') // 标题配置
          this.updatedTree()
        }
      }
      this.oldCurrentRole = role_no
    },
    /**
     * 单击行、初始化树选中逻辑*/
    updatedTree() {
      this.btnEnabled(true)
      this.showLoading()
      const { role_no } = this.currentData
      const msg = {
        parameterList: [
          {
            roleNo: role_no
          }
        ],
        oper_type: 'QUERY'
      }
      clickRow(msg)
        .then((response) => {
          const { list } = response.retMap // 获取所有按钮的选中配置
          let selectKeys = []
          for (const item of list) {
            if (item.buttonId) {
              const btnArr = item.buttonId.split(',')
              const btnArrId = btnArr.map((itemBtn) => {
                return itemBtn + '&' + item.menuId
              })
              selectKeys = [...selectKeys, ...btnArrId, item.menuId]
            } else {
              selectKeys = [...selectKeys, item.menuId]
            }
          }
          this.$refs.tree.setCheckedKeys([...selectKeys]) // 设置选中
          if (selectKeys.length > 0) {
            this.$refs.tree.setCheckedKeys([...selectKeys, this.defaultId]) // 设置选中
          }
          this.oldSelectDatas = this.$refs.tree.getCheckedKeys() // 获取所有选中节点及半选中的节点
          this.showLoading()
        })
        .catch(() => {
          this.showLoading()
        })
    },
    /**
     * 单击行、初始化树选中逻辑 监测系统*/
    updatedTreeModel() {
      this.showLoading()
      const { role_no } = this.currentData
      const msg = {
        parameterList: [
          {
            roleNo: role_no
          }
        ],
        oper_type: dictionaryGet('OPERATE_QUERY')
      }
      clickRowModel(msg)
        .then((response) => {
          const { smUserModelList } = response.retMap // 获取所有按钮的选中配置
          let selectKeys = []
          for (const item of smUserModelList) {
            if (item.modelId) {
              selectKeys = [...selectKeys, item.modelId]
            }
          }
          this.$refs.tree.setCheckedKeys([...selectKeys]) // 设置选中
          this.expandedKeys = [...selectKeys] // 展开
          this.oldSelectDatas = this.$refs.tree.getCheckedKeys() // 获取所有选中节点及半选中的节点
          this.showLoading()
        })
        .catch(() => {
          this.showLoading()
        })
    },
    /**
     * 初始化树：按钮配置格式化
     * @param {Array}data 按钮数据*/
    buttonFormate(data) {
      let dataBtn = []
      for (const item of data) {
        dataBtn = [
          ...dataBtn,
          {
            menu_id: item.BUTTON_ID + '&' + item.MENU_ID,
            parent_id: item.MENU_ID,
            menu_name: item.BUTTON_NAME,
            ...item
          }
        ]
      }
      return dataBtn
    },
    /**
     * 初始化树：监测系统数据初始化
     * @param {Array}data 当前获取的监测数据
     * @param {String} pId 父节点
     * @param {String} id 节点
     * @param {String} name
     * @param {String} elements 元素配置*/
    modelFormate(data, pId, id, name, elements) {
      let dataBtn = []
      for (const item of data) {
        dataBtn = [
          ...dataBtn,
          {
            menu_id: item[id],
            parent_id: item[pId],
            menu_name: item[name],
            elements: elements,
            ...item
          }
        ]
      }
      return dataBtn
    },
    /**
     * 初始化树：格式化树*/
    treeDataTranslate(data) {
      const id = 'menu_id'
      const pid = 'parent_id'
      const name = 'menu_name'

      // 建立个树形结构,需要定义个最顶层的父节点，pId是1
      let parents = []
      for (let i = 0; i < data.length; i++) {
        if (data[i][pid] !== this.defaultId) {
          console.log()
        } else {
          const obj = {
            label: data[i][name],
            id: data[i][id],
            pid: data[i][pid],
            ...data[i],
            children: []
          }
          parents = [...parents, obj] // 数组加数组值
        }
      }
      const datas = this.children(parents, data, id, pid, name)
      return datas
    },
    /**
     * 初始化树： 子节点格式化*/
    children(parent, data, id, pid, name) {
      if (data === undefined) {
        return []
      }
      if (parent.length === 0) {
        return
      }
      if (data.length !== 0) {
        for (let i = 0; i < parent.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (parent[i].id === data[j][pid]) {
              const obj = {
                label: data[j][name],
                id: data[j][id],
                pid: data[i][pid],
                children: []
              }
              parent[i].children.push(obj)
            }
          }
          this.children(parent[i].children, data, id, pid, name)
        }
      }
      return parent
    },
    /**
     * 树加载中动画配置*/
    showLoading() {
      this.loading = !this.loading
    },
    /**
     * 按钮显示权限配置
     */
    btnEnabled(param) {
      const { btnEmpty, btnSave } = this.$attrs['btn-all']
      if (param) {
        this.btnArr.btnEmpty = btnEmpty // 清空按钮
        this.btnArr.btnSave = btnSave // 保存按钮
      } else {
        this.btnArr.btnEmpty = param // 清空按钮
        this.btnArr.btnSave = param // 保存按钮
      }
    },
    /**
     * btn： 保存*/
    handleSave() {
      this.backdata = []
      const { role_no } = this.currentData
      commonMsgConfirm('是否确认保存', this, (param) => {
        if (param) {
          this.showLoading()
          const checkedAll = this.$refs.tree.getCheckedKeys() // 获取所有选中nodes
          // 新旧数据格式化
          const oldData = this.nodesSpilt(this.oldSelectDatas)
          const newData = this.nodesSpilt(checkedAll)
          // 新旧数据比对
          const addNodes = this.dataFilter(newData, oldData)
          const deleteNodes = this.dataFilter(oldData, newData)
          const updateNodes = this.dataFilterUpdate(newData, oldData)

          // 传递数据格式化 begin
          this.filterData(role_no, addNodes, 'addNodes')
          this.filterData(role_no, deleteNodes, 'deleteNodes')
          this.filterData(role_no, updateNodes, 'updateNodes')
          // 操作数据格式化 end
          const msg = {
            parameterList: this.backdata,
            oper_type: 'UPDATE',
            eleList: [],
            role_no: role_no
          }
          treeSave(msg)
            .then((response) => {
              const { retMsg } = response
              commonMsgSuccess(retMsg, this)
              this.showLoading()
              this.$emit('queryList')
            })
            .catch(() => {
              this.showLoading()
            })
        }
      })
    },
    /**
     * 保存：数据格式化
     * @param {String} role_no 角色
     * @param {Array} arr 格式化数组
     * @param {String} oper_nodes 格式化类型*/
    filterData(role_no, arr, oper_nodes) {
      for (const key of arr) {
        let button_id = ''
        let menu_id = ''
        if (key !== '') {
          if (key.indexOf('&') !== -1) {
            const dataArr = key.split('&')
            menu_id = dataArr[0]
            dataArr.splice(0, 1)
            button_id = dataArr.join(',')
          } else {
            menu_id = key
          }
          if (menu_id !== this.defaultId) {
            this.backdata = [
              ...this.backdata,
              {
                roleNo: role_no,
                menuId: menu_id,
                buttonId: button_id,
                operNodes: oper_nodes
              }
            ]
          }
        }
      }
    },
    /**
     * 取nodes的字符串，若遇到以"#"开头的默认为菜单id，查找下一个是否是以"#"开始，诺不是则是按钮id，将其和菜单一起拼成一个字符串
     * 格式为#800001,#110001&modif&add&delete,#800013&showProQueryBtn&fedback&reply
     * @param {Array}str 拼接数组*/
    nodesSpilt: function(str) {
      const strs = str
      let newStr = []
      if (strs.length === 0) {
        return newStr
      }
      for (const item of strs) {
        const currentStr = item.indexOf('#')
        if (currentStr === 0) {
          newStr = [...newStr, item]
        } else {
          const len = newStr.length - 1
          if (newStr.length === 0) {
            const dataArr = item.split('&')
            newStr = [...newStr, dataArr[1] + '&' + dataArr[0]]
          } else if (
            newStr[len].split('&').length > 1 &&
            newStr[len].split('&')[0] === item.split('&')[1]
          ) {
            newStr[len] = newStr[len] + '&' + item.split('&')[0]
          } else {
            const dataArr2 = item.split('&')
            newStr = [...newStr, dataArr2[1] + '&' + dataArr2[0]]
          }
        }
      }
      // 去重配置
      let newStrs = []
      let oldStrs = []
      let newS = []
      for (const itemN of newStr) {
        if (itemN.split('&').length > 1) {
          oldStrs = [...oldStrs, itemN]
        } else {
          newStrs = [...newStrs, itemN]
        }
      }
      for (const itemF of newStrs) {
        let flag = '0'
        for (const itemO of oldStrs) {
          if (itemF.substring(0, 7) === itemO.substring(0, 7)) {
            newS = [...newS, itemO]
            flag = '1'
            break
          }
        }
        if (flag === '0') {
          newS = [...newS, itemF]
        }
      }
      return newS
    },
    /**
     * 编辑数据过滤 : 新增、删除 one有two没有的情况
     * @param {Array}one 数据比对1
     * @param {Array}two 数据比对2 */
    dataFilter(one1, two) {
      const one = one1.sort()
      let As = []
      for (const key of one) {
        let flag = 0
        for (const item of two) {
          if (key.substring(0, 7) === item.substring(0, 7)) {
            flag = 1
            break
          }
        }
        if (flag === 0) {
          As = [...As, key]
        }
      }
      return As
    },
    /**
     * 编辑数据过滤 更新
     * @param {Array}one 数据比对1
     * @param {Array}two 数据比对2 */
    dataFilterUpdate(one, two) {
      let As = []
      for (const key of one) {
        let flag = 0
        for (const item of two) {
          if (key === item) {
            flag = 1
            break
          }
        }
        if (flag === 0) {
          // As = [...As, key]
          for (const itemF of two) {
            if (key.substring(0, 7) === itemF.substring(0, 7)) {
              flag = 2
              break
            }
          }
        }
        if (flag === 2) {
          As = [...As, key]
        }
      }
      return As
    },
    /**
     * btn： 清空*/
    handleEmpty() {
      this.$refs.tree.setCheckedKeys([]) // 清空所有选中
    }
  }
}
</script>
<style lang="scss" scoped>
.sun-content-tree {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 4.5rem;
  left: 0;
  overflow: auto;
}
.sun-cont-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: right;
}
</style>
