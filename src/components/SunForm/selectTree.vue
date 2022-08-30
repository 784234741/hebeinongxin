<template>
  <el-select
    ref="selectTree"
    v-model="value"
    style="width: 100%"
    :placeholder="placeholder"
    v-bind="$attrs"
    filterable
    clearable
    :filter-method="selectFilter"
    @clear="resetChecked"
    @remove-tag="removeTag"
  >
    <el-option value="" />
    <el-tree
      ref="treeOption"
      :show-checkbox="this.$attrs.multiple"
      highlight-current
      accordion
      node-key="id"
      check-on-click-node
      :data="options"
      :props="defaultProps"
      render-after-expand
      :filter-node-method="filterNode"
      @check="checkNode"
    />
  </el-select>
</template>

<script>
import debounce from './debounce'
export default {
  name: 'SelectTree',
  props: {
    placeholder: {
      type: String,
      default: () => {
        return '请选择'
      }
    },
    // 节点数据
    options: {
      type: Array, // 必须是树形结构的对象数组
      default: () => {
        return []
      }
    },
    // 设置lable value属性
    defaultProps: {
      type: Object,
      default: () => {
        return {
          value: 'id', // ID字段名
          label: 'label', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    // 默认勾选的节点
    defaultCheckNodes: {
      type: Array, // 已经分配的资源
      default: () => {
        return []
      }
    },
    valueM: {
      type: null, // 已经分配的资源
      default: null
    }
  },
  data() {
    return {
      value: []
    }
  },
  watch: {
    valueM(value) {
      if (value === null || value === '' || value.length === 0) {
        // 清空
        this.value = []
        this.$emit('input', '')
        this.resetChecked()
      } else {
        // 初次执行
        this.$emit('input', this.valueM)
        if (this.value.length === 0 || this.value === '') {
          if (this.$attrs.multiple && this.valueM !== null) {
            // 复选
            let valueT = []
            if (this.valueM.indexOf(',') !== -1) {
              valueT = this.valueM.split(',')
              this.$refs.treeOption.setCheckedKeys([...valueT]) // 设置默认值
            } else {
              valueT = this.valueM
              this.$refs.treeOption.setCheckedKeys([this.valueM]) // 设置默认值
            }
          } else {
            this.$refs.treeOption.setCurrentKey(this.valueM) // 设置默认值 单选
          }
          // if (typeof this.valueM === 'object' && this.valueM !== null && this.valueM !== '') {
          //   this.$refs.treeOption.setCheckedKeys(this.valueM)
          // }
          // 赋值
          this.$nextTick(() => {
            if (this.$attrs.multiple && this.valueM !== null) {
              const selectAll = this.$refs.treeOption.getCheckedNodes()
              // this.value = this.$refs.treeOption.getCheckedKeys()
              let datasValue = []
              selectAll.map((item) => {
                datasValue = [...datasValue, item.label]
              })
              this.value = datasValue
            } else {
              const selectOne = this.$refs.treeOption.getCurrentNode()
              // this.value = this.$refs.treeOption.getCurrentKey() // 设置默认值
              this.value = selectOne.label
            }
          })
        }
      }
    }
  },
  mounted() {},
  methods: {
    // select 搜索
    selectFilter: debounce(function(val) {
      this.$refs.treeOption.filter(val)
    }, 600),
    // 树节点过滤
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 删除tag时，
    removeTag(val) {
      console.log('val', this.$refs.treeOption)
      // 取消勾选
      const treeOption = this.$refs.treeOption
      treeOption.setChecked(val, false, false)

      // 重新给控件赋值
      this.$emit('input', this.value)
    },
    // 勾选节点，
    checkNode(node, treeStatus) {
      node.value = node.id
      node.currentLabel = node.label
      // 给selectTree的cachedOptions赋值 设置node.label，使用页面显示label值
      const selectTree = this.$refs.selectTree
      selectTree.cachedOptions.push(node)
      selectTree.handleOptionSelect(node, true)

      this.$emit('input', this.value)
    },
    // 清空
    resetChecked() {
      this.$refs.treeOption.setCheckedKeys([])
      this.$refs.treeOption.setCurrentKey('')
      // 重新搜索 用空值
      this.selectFilter('')
      // 设置所有的节点为闭合状态
      this.changeTreeNodeStatus(this.$refs.treeOption.store.root)
      this.$emit('input', '')
    },
    // 闭合改变节点的状态
    changeTreeNodeStatus(node) {
      node.expanded = false
      for (let i = 0; i < node.childNodes.length; i++) {
        // 改变节点的自身expanded状态
        node.childNodes[i].expanded = false
        // 遍历子节点
        if (node.childNodes[i].childNodes.length > 0) {
          this.changeTreeNodeStatus(node.childNodes[i])
        }
      }
    }
  }
}
</script>
<style scoped>
/* 去除tree上面的一行高度 */
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  padding: 0;
}
</style>
