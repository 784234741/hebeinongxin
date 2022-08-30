import { Login } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import cryptoAES from '@/utils/cryptoAES'
import { resetRouter } from '@/router'
import store from '@/store'

// 登录
const { login, logout } = Login
const state = {
  token: getToken(),
  userNo: '',
  avatar: '',
  introduction: '',
  userName: '',
  password: '',
  roleNo: '',
  roles: [],
  organNo: '', // 机构号
  organLevel: '', // 机构级别
  loginInfo: {} // 登入信息
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.userNo = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_LOGININFO: (state, data) => {
    state.loginInfo = data
    state.organNo = data.organNo
    state.organLevel = data.organLevel
    state.userName = data.userName
    state.roleNo = data.roleNo
    state.password = data.password
  }
}

const actions = {
  /**
   * 用户登录
   * @param userInfo: 用户登录信息
   */
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const passwordAES = cryptoAES.encrypt(password) // 加密
    const msg = {
      parameterList: [
        {
          userNo: username.trim(),
          password: passwordAES,
          isCheck: '1',
          loginTerminal: '1',
          loginType: '1'
        }
      ],
      oper_type: '0',
      loginKind: 'user_no'
    }
    return new Promise((resolve, reject) => {
      login(msg)
        .then((response) => {
          // 登录请求
          const { loginFlag } = response.retMap
          if (loginFlag === 'loginSuccess') {
            const { Authorization, loginUser } = response.retMap
            commit('SET_TOKEN', Authorization)
            commit('SET_NAME', loginUser.userNo)
            const info = {
              ...response.retMap,
              ...response.retMap.loginUser,
              ...response.retMap.loginOrgan
            }
            commit('SET_LOGININFO', info)
            localStorage.setItem('store', JSON.stringify(store.state))
            setToken(Authorization)
            resolve()
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * 免密登录
   * @param userInfo: 免密登录
   */
  autoLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    // const passwordAES = cryptoAES.encrypt(password) // 加密
    const msg = {
      parameterList: [
        {
          userNo: username.trim(),
          password: password,
          isCheck: '1',
          loginTerminal: '1',
          loginType: '1'
        }
      ],
      oper_type: '0',
      loginKind: 'user_no'
    }
    return new Promise((resolve, reject) => {
      login(msg)
        .then((response) => {
          // 登录请求
          const { loginFlag } = response.retMap
          if (loginFlag === 'loginSuccess') {
            const { Authorization, loginUser } = response.retMap
            commit('SET_TOKEN', Authorization)
            commit('SET_NAME', loginUser.userNo)
            const info = {
              ...response.retMap,
              ...response.retMap.loginUser,
              ...response.retMap.loginOrgan
            }
            commit('SET_LOGININFO', info)
            localStorage.setItem('store', JSON.stringify(store.state))
            setToken(Authorization)
            resolve()
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const roles = ['admin']
      commit('SET_ROLES', roles)
      resolve({ roles })
      // getInfo().then(response => {
      //   const data = response.retMap
      //   if (!data) {
      //     reject('验证失败，请重新登录。')
      //   }

      //   const { roles, avatar, introduction } = data
      //   // roles must be a non-empty array
      //   if (!roles || roles.length <= 0) {
      //     reject('角色必须是非空数组!')
      //   }
      //   commit('SET_ROLES', roles)
      //   // commit('SET_NAME', name)
      //   // commit('SET_AVATAR', avatar)
      //   // commit('SET_INTRODUCTION', introduction)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // 系统退出
  logout({ commit, state, dispatch }) {
    localStorage.clear() // 清空所有缓存
    return new Promise((resolve, reject) => {
      const msg = {
        oper_type: '0',
        user_no: state.userNo,
        login_terminal: state.loginInfo.loginTerminal,
        flag: '1'
      }
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
      logout(msg)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()
          location.reload()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 移除 token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }

  // dynamically modify permissions
  // async changeRoles({ commit, dispatch }, role) {
  //   const token = role + '-token'

  //   commit('SET_TOKEN', token)
  //   setToken(token)

  //   const { roles } = await dispatch('getInfo')

  //   resetRouter()

  //   // generate accessible routes map based on roles
  //   const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
  //   // dynamically add accessible routes
  //   router.addRoutes(accessRoutes)

  //   // reset visited views and cached views
  //   dispatch('tagsView/delAllViews', null, { root: true })
  // }
}

export default {
  namespaced: true, // 开启namespace:true，该模块就成为命名空间模块了
  state,
  mutations,
  actions
}
