<!--参数配置页面  -->
<template>
  <div class="dictionary">
    <div class="dictionary-box">
      <div class="dictionary-left">
        <div class="title">数据字典</div>
        <el-tree
          ref="tree"
          :props="props"
          :load="loadNode"
          node-key="FIELD_ID"
          :highlight-current="true"
          lazy
          :expand-on-click-node="false"
          :default-expanded-keys="expandedkeys"
          @node-click="nodeClick"
          @node-expand="nodeExpand"
        />
      </div>
      <div class="dictionary-right">
        <div class="title">字典查询</div>

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="字典号/字典名">
            <el-input
              v-model="formInline.searchValue"
              placeholder="支持模糊查询"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="btnAll.btnQuery"
              type="primary"
              @click="onSubmit"
            >查询</el-button>
          </el-form-item>
        </el-form>

        <div>
          <div class="title">字典配置</div>

          <sun-form
            label-width="12rem"
            :config="config"
            :default-form="defaultForm"
            :query="false"
            :reset="false"
          >
            <template v-slot:footer>
              <div class="button-line">
                <SunButton
                  v-if="notSave"
                  :btn-add="btnAll.btnAdd"
                  :btn-modify="btnAll.btnModify"
                  :btn-delete="btnAll.btnDelete"
                  @handleAdd="handleAdd"
                  @handleModify="handleModify"
                  @handleDelete="handleDelete"
                />
                <SunButton
                  v-else
                  :btn-save="true"
                  :btn-cancle="true"
                  @handleSave="handleSave"
                  @handleCancle="handleCancle"
                />
              </div>
            </template>
          </sun-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { SysParams } from '@/api'
import { SunForm, SunButton } from '@/components'
import { commonMsgConfirm, commonMsgSuccess } from '@/utils/message'
import { commonBlank } from '@/utils/common'
import { config } from './info'
import { permissionsBtn } from '@/utils/permissions' // 权限配置

import { SysDictionary } from '@/api'
const { getTreeData } = SysDictionary

export default {
  name: 'Dictionary',
  components: { SunForm, SunButton },
  data() {
    return {
      notSave: true,
      formInline: {
        searchValue: ''
      },
      oper_type: '', // 操作类型
      expandedkeys: ['000000'], // 默认展开项
      config: config(this, {
        disableConfig: {
          PARENT_FIELD: true,
          FIELD_NO: true,
          else: true
        }
      }),
      preDefaultForm: {}, // 表单默认值备份
      selectedNode: {}, // 点击选中的节点
      selectedNode2: null,
      defaultForm: {
        fieldNo: '',
        fieldType: '',
        fieldDesc: null,
        fieldMode: 'varchar',
        fieldId: '',
        fieldSize: 0,
        parentField: '000000',
        lastModiDate: '',
        fieldName: '',
        fieldLength: 0
      },
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      btnAll: {
        // 当前页需要配置权限的按钮  权限获取
        btnQuery: false,
        btnModify: true,
        btnAdd: true,
        btnDelete: true
      }
    }
  },
  created() {
    this.btnPermissions()
  },
  mounted() {},
  methods: {
    // 时间格式化
    formateDate(string) {},
    /**
     * 按钮权限配置*/
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
    },
    // 节点展开
    nodeExpand(node, node2) {
      this.selectedNode = node
      this.selectedNode2 = node2
    },
    // 点击节点
    nodeClick(node, node2) {
      this.selectedNode = node
      this.selectedNode2 = node2
      this.defaultForm = {
        fieldNo: node.FIELD_NO,
        fieldType: node.FIELD_TYPE,
        fieldDesc: node.FIELD_DESC,
        fieldMode: node.FIELD_MODE,
        fieldId: node.FIELD_ID,
        fieldSize: node.FIELD_SIZE,
        parentField: node.PARENT_FIELD,
        lastModiDate: node.LAST_MODI_DATE,
        fieldName: node.FIELD_NAME,
        fieldLength: node.FIELD_LENGTH
      }
      if (this.oper_type !== '') {
        this.notSave = true
        this.config = config(this, {
          disableConfig: {
            PARENT_FIELD: true,
            FIELD_NO: true,
            else: true
          }
        })
      }
    },
    // 加载树
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([
          {
            name: '数据字典',
            FIELD_NO: '000000',
            FIELD_TYPE: '00',
            FIELD_DESC: null,
            FIELD_MODE: 'varchar',
            FIELD_ID: '000000',
            FIELD_SIZE: 0,
            PARENT_FIELD: '000000',
            LAST_MODI_DATE: '20170516172446',
            FIELD_NAME: '数据字典',
            FIELD_LENGTH: 0,
            IS_PARENT: '1'
          }
        ])
      }
      if (node.level === 1) {
        // 获取树初始数据
        const msg = {
          parameterList: [{ parentField: '000000' }],
          oper_type: 'asysc'
        }
        getTreeData(msg).then((response) => {
          const { list } = response.retMap
          list.shift()
          list.forEach((item) => {
            item['name'] = item.FIELD_NAME
          })
          resolve(list)
        })
      }
      if (node.level > 1) {
        const msg = {
          parameterList: [{ parentField: node.data.FIELD_ID }],
          oper_type: 'asysc'
        }
        getTreeData(msg).then((response) => {
          const { list } = response.retMap
          list.forEach((item) => {
            if (item.IS_PARENT === '0') {
              item['leaf'] = true
            }
            item['name'] = item.FIELD_NAME
          })
          return resolve(list)
        })
        return
      }
    },
    // 新增add
    handleAdd() {
      if (commonBlank(this.selectedNode)) {
        this.$message({
          message: '请选择父节点',
          type: 'warning'
        })
        return
      }
      this.notSave = false
      this.oper_type = 'insert'
      this.preDefaultForm = this.defaultForm
      this.defaultForm = {
        fieldNo: '',
        fieldType: '',
        fieldDesc: '',
        fieldMode: '',
        fieldId: this.selectedNode.FIELD_ID !== '000000' ? '后台生成' : '',
        fieldSize: '',
        parentField:
          this.selectedNode.FIELD_ID !== '000000'
            ? this.selectedNode.FIELD_ID
            : '000000',
        lastModiDate: '当前数据库时间',
        fieldName: '',
        fieldLength: ''
      }
      this.config = config(this, {
        disableConfig: {
          PARENT_FIELD: true,
          FIELD_NO: this.selectedNode.FIELD_ID !== '000000',
          else: false
        }
      })
    },
    // 修改
    handleModify() {
      const node = this.$refs.tree.getCurrentNode()

      if (!node) {
        // commonMsgWarn('请选择删除的节点', that)
        this.$message({
          message: '请选择修改的节点',
          type: 'warning'
        })
        return
      }
      this.notSave = false
      this.oper_type = 'modify'
      this.preDefaultForm = this.defaultForm
      this.config = config(this, {
        disableConfig: {
          PARENT_FIELD: true,
          FIELD_NO: true,
          else: false
        }
      })
    },
    // 删除
    handleDelete() {
      const that = this
      const node = this.$refs.tree.getCurrentNode()
      if (!node) {
        // commonMsgWarn('请选择删除的节点', that)
        this.$message({
          message: '请选择删除的节点',
          type: 'warning'
        })
        return
      }
      const fieldId = node.FIELD_ID
      const parentField = node.PARENT_FIELD
      function del(flag) {
        if (!flag) {
          return
        }
        const msg = {
          parameterList: [
            {
              fieldId,
              parentField
            }
          ],
          oper_type: 'delete'
        }
        getTreeData(msg)
          .then((response) => {
            commonMsgSuccess(response.retMsg, that)
            that.$refs.tree.remove(node)
            that.defaultForm = {
              fieldNo: '',
              fieldType: '',
              fieldDesc: null,
              fieldMode: 'varchar',
              fieldId: '',
              fieldSize: 0,
              parentField: '000000',
              lastModiDate: '',
              fieldName: '',
              fieldLength: 0
            }
          })
          .catch((err) => {
            if (err.message.indexOf('hasChildren') !== -1) {
              that.$message({
                message: '有子节点, 不能删除！',
                type: 'warning'
              })
            }
          })
      }
      commonMsgConfirm('是否确认删除？', this, del)
    },
    // 保存save
    handleSave() {
      const msg = {
        parameterList: [
          {
            ...this.defaultForm,
            fieldSize: this.defaultForm.fieldSize + '',
            fieldLength: this.defaultForm.fieldLength + ''
          }
        ],
        oper_type: this.oper_type === 'insert' ? 'insert' : 'update',
        oldField: {
          id: this.selectedNode.FIELD_ID,
          name: this.selectedNode.name,
          field_desc: this.selectedNode.FIELD_DESC,
          field_no: this.selectedNode.FIELD_NO,
          field_name: this.selectedNode.FIELD_NAME,
          field_length: this.selectedNode.FIELD_LENGTH,
          field_size: this.selectedNode.FIELD_SIZE,
          field_mode: this.selectedNode.FIELD_MODE,
          field_type: this.selectedNode.FIELD_TYPE,
          last_modi_date: this.selectedNode.LAST_MODI_DATE
        }
      }
      getTreeData(msg).then((response) => {
        commonMsgSuccess(response.retMsg, this)
        if (this.oper_type === 'insert') {
          this.notSave = true
          const nodeData = {
            name: this.defaultForm.fieldName,
            FIELD_NO: this.defaultForm.fieldNo,
            FIELD_TYPE: this.defaultForm.fieldType,
            FIELD_DESC: this.defaultForm.fieldDesc,
            FIELD_MODE: this.defaultForm.fieldMode,
            FIELD_SIZE: this.defaultForm.fieldSize,
            PARENT_FIELD: this.defaultForm.parentField,
            LAST_MODI_DATE: this.defaultForm.lastModiDate,
            FIELD_NAME: this.defaultForm.fieldName,
            FIELD_LENGTH: this.defaultForm.fieldLength,
            IS_PARENT: '0',
            FIELD_ID: response.retMap.field_id,
            leaf: true
          }
          // this.selectedNode2.doCreateChildren([nodeData])
          this.expandedkeys.push(this.defaultForm.parentField)
          // 动态添加节点
          this.$refs.tree.append(nodeData, this.selectedNode2)
          this.$nextTick(() => {
            setTimeout(() => {
              // 设置选中状态
              this.$refs.tree.setCurrentKey(response.retMap.field_id)
              // 获取选中节点
              const node = this.$refs.tree.getNode(response.retMap.field_id)
              // 触发节点点击方法
              this.nodeClick(node.data, node)
            }, 300)
          })
        } else {
          const nodeeditData = {
            name: this.defaultForm.fieldName,
            FIELD_NO: this.defaultForm.fieldNo,
            FIELD_TYPE: this.defaultForm.fieldType,
            FIELD_DESC: this.defaultForm.fieldDesc,
            FIELD_MODE: this.defaultForm.fieldMode,
            FIELD_SIZE: this.defaultForm.fieldSize,
            PARENT_FIELD: this.defaultForm.parentField,
            LAST_MODI_DATE: response.retMap.last_modi_date,
            FIELD_NAME: this.defaultForm.fieldName,
            FIELD_LENGTH: this.defaultForm.fieldLength,
            FIELD_ID: this.selectedNode.FIELD_ID
          }
          // 更新节点数据
          this.selectedNode2.setData(nodeeditData) // setData方法调用后，自己的子节点辉丢失
          // 对该节点下子节点进行更新
          this.selectedNode2.loaded = false
          this.selectedNode2.expand() // 主动调用展开节点方法，重新查询该节点下的所有子节点
          this.notSave = true
          this.$nextTick(() => {
            setTimeout(() => {
              // 触发节点点击方法
              this.nodeClick(this.selectedNode2.data, this.selectedNode2)
            }, 300)
          })
        }
      })
    },
    // 取消
    handleCancle() {
      this.defaultForm = this.preDefaultForm
      this.config = config(this, {
        disableConfig: {
          PARENT_FIELD: true,
          FIELD_NO: true,
          else: true
        }
      })
      this.notSave = true
    },
    // 搜索
    onSubmit() {
      const { searchValue } = this.formInline
      if (searchValue === '') {
        return
      }
      const msg = {
        parameterList: [],
        oper_type: 'searchParentSon',
        fieNo: 0,
        fieldIdOrName: searchValue,
        flag: '1'
      }
      getTreeData(msg).then((response) => {
        const { field_id, listParentId } = response.retMap
        this.expandedkeys.push(...listParentId)
        setTimeout(() => {
          this.$refs.tree.setCurrentKey(field_id)
          const node = this.$refs.tree.getNode(field_id)
          this.nodeClick(node.data)
        }, 300)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.dictionary {
  padding: 20px;
  height: 100%;
  .dictionary-box {
    background-color: #fff;
    padding: 30px;
    height: 100%;

    border-radius: $pageRadius;
    display: flex;
    justify-content: flex-start;
    .title {
      font-size: $titleFont;
      padding: 2rem 0;
      font-weight: bold;
    }
    & > div {
      height: 100%;
    }
    .dictionary-left {
      overflow: auto;
      width: 300px;
      margin-right: 30px;
      border-right: 1px solid #f1f1f1;
    }
    .dictionary-right {
      display: flex;
      flex-direction: column;
      width: calc(100% - #{330px});
      .button-line {
        display: flex;
        padding-top: 8rem;
        justify-content: center;
      }
    }
  }
}
</style>
