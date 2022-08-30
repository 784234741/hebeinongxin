// 机构
import { Loading } from 'element-ui'
import { Common } from '@/api'
const {
  organTree,
  fieldController,
  fieldExternalDataController,
  organTreeSelf
} = Common

const state = {
  organTreeObject: {}, // 机构树对象，key: 机构号
  organTree: [], // 机构树
  dictionaryConst: {}, // 常量字典
  dictionaryLet: {}, // 后台传入字典
  routeSys: {}, // 菜单配置
  pageSize: 10, // 当前页默认条数
  externalData: {}, // 外表字典
  homeMoudles: [], // 默认显示模块
  homeMoudlesChecked: [] // 选择显示模块
}
/**
 * 机构初始化
 */
function children(parent, data, id, pid, name) {
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
      children(parent[i].children, data, id, pid, name)
    }
  }
  return parent
}
/**
 * 菜单配置：机构初始化
 */
function childrenFormat(parent, data, id, pid, name) {
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
            ...data[j],
            children: []
          }
          parent[i].children.push(obj)
        }
      }
      childrenFormat(parent[i].children, data, id, pid, name)
    }
  }
  return parent
}

/**
 * 通过key，格式化外表数据源
 * @param {String} key 值
 */
async function commonAosFormatExterSource(key) {
  if (typeof key === 'string' && key.constructor === String && key !== '') {
    const msg = {
      parameterList: [],
      oper_type: 'externalData',
      key: key
    }
    const data = await fieldExternalDataController(msg)
    const list = data.retMap.list
    list.forEach((item) => {
      item.label = item.value
      item.value = item.key
    })
    return list
  } else {
    alert('外表对应key有误')
  }
}
const mutations = {
  SET_TREE: (state, data) => {
    state.organTree = data
  },
  SET_TREE_OBJECT: (state, data) => {
    state.organTreeObject = data
  },
  SET_DICTIONARY: (state, data) => {
    state.dictionaryConst = data
  },
  SET_DICTIONARYLET: (state, data) => {
    state.dictionaryLet = Object.assign({}, state.dictionaryLet, data)
  },
  SET_TREE_ROUTE: (state, data) => {
    state.routeSys = data
  },
  SET_EXTERNAL_DATA: (state, data) => {
    state.externalData[data[0]] = data[1]
  },
  SET_HOME_MOUDLES: (state, data) => {
    state.homeMoudles = data
  },
  SET_HOME_MOUDLES_CHECKED: (state, data) => {
    state.homeMoudlesChecked = data
  }
}

const actions = {
  /**
   * 获取机构树*/
  async organData2({ commit, dispatch, state }, data) {
    const loadingFun = Loading.service({
      // 加载弹出框
      lock: true,
      text: '机构数据加载中，请稍后... ...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)',
      customClass: 'loadingSty'
    })
    const msg = {
      oper_type: 0
    }
    // const organNull = Object.keys(state.organTree).length
    const organNull = state.organTree.length
    if (organNull === 0) {
      // 数据为空重新请求
      const datas = await organTree(msg)

      loadingFun.close() // 加载结束
      const { organList } = datas.retMap

      // console.log('organList', organList)
      dispatch('objectDataTranslate', organList)
      dispatch('treeDataTranslate', organList)
    } else {
      loadingFun.close() // 加载结束
    }
  },
  /**
   * 获取机构树*/
  async organData({ commit, dispatch, state }, data) {
    const loadingFun = Loading.service({
      // 加载弹出框
      lock: true,
      text: '机构数据加载中，请稍后... ...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)',
      customClass: 'loadingSty'
    })
    const msg = {
      parameterList: [],
      oper_type: 'user_organ',
      organ_no: data
    }
    // const organNull = Object.keys(state.organTree).length
    const organNull = state.organTree.length
    if (organNull === 0) {
      // 数据为空重新请求
      const datas = await organTreeSelf(msg)

      loadingFun.close() // 加载结束
      const { privTreeList, parentOrgan, allTreeList } = datas.retMap
      const datainfo = {
        allTreeList,
        privTreeList,
        parentOrgan
      }

      // console.log('privTreeList', privTreeList)
      dispatch('objectDataTranslate', datainfo)
      dispatch('treeDataTranslate', datainfo)
    } else {
      loadingFun.close() // 加载结束
    }
  },
  commonInit({ rootState, dispatch }) {
    dispatch('organData', rootState.user.organNo) // 获取机构树
    dispatch('getFieldData') // 加载数据字典 同步数据字典
  },
  /**
   * 机构格式化为对象*/
  objectDataTranslate({ commit }, obj) {
    const data = obj.allTreeList
    const datas = {}
    for (const key of data) {
      datas[key.id] = key
    }
    commit('SET_TREE_OBJECT', datas)
  },
  /**
   * 树形数据转换
   * @param {*} data
   */
  treeDataTranslate({ commit }, obj) {
    const data = obj.privTreeList
    const parentOrgan = obj.parentOrgan
    const id = 'id'
    const pid = 'pId'
    const name = 'name'
    // 建立个树形结构,需要定义个最顶层的父节点，pId是1
    let parents = []
    for (let i = 0; i < data.length; i++) {
      if (data[i][pid] !== parentOrgan) {
        // console.log('111')
      } else {
        const obj = {
          label: data[i][name],
          id: data[i][id],
          pid: data[i][pid],
          children: []
        }
        parents = [...parents, obj] // 数组加数组值
      }
    }
    console.log('parents', parents)
    const datas = children(parents, data, id, pid, name)
    console.log('datas', datas)
    // 调用子节点方法,参数为父节点的数组
    commit('SET_TREE', datas)
    return datas
    // return []
  },
  /**
   * 树形数据转换: 菜单配置
   * @param {*} data
   */
  treeDataFormat({ commit }, data) {
    const id = 'menuId'
    const pid = 'parentId'
    const name = 'menuName'
    // 建立个树形结构,需要定义个最顶层的父节点，pId是1
    let parents = []
    for (let i = 0; i < data.length; i++) {
      if (data[i][pid] !== '0') {
        // console.log('111')
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
    const datas = childrenFormat(parents, data, id, pid, name)
    // 调用子节点方法,参数为父节点的数组
    commit('SET_TREE_ROUTE', datas)
    return datas
  },
  /**
   * 常量字典配置*/
  dictionary({ commit, state }, data) {
    commit('SET_DICTIONARY', data)
  },
  // 加载数据字典
  getFieldData({ commit, state }, data) {
    const msg = {
      parameterList: [''],
      sysMap: {
        oper_type: 'query',
        fieldTime: 'fieldTime'
      }
    }
    const organNull = Object.keys(state.dictionaryLet).length
    if (organNull === 0) {
      // 数据为空重新请求
      fieldController(msg).then((response) => {
        // 登录请求
        commit('SET_DICTIONARYLET', response.retMap)
      })
    }
  },

  // 加载外部数据字典表
  setExternalData({ commit, state }, data) {
    if (state.externalData[data]) {
      return
    }
    commonAosFormatExterSource(data).then((res) => {
      commit('SET_EXTERNAL_DATA', [data, res])
    })
  },

  // 设置主页默认显示模块
  setHomeMoudles({ commit, state }, data) {
    commit('SET_HOME_MOUDLES', data.default)
    commit('SET_HOME_MOUDLES_CHECKED', data.checked)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
