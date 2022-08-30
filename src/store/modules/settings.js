import variables from '@/assets/scss/common/element-ui/element-variables.scss'
import defaultSettings from '@/settings'
import { updateThemeColor } from '@/components/ThemePicker/indexColor.js' // 配置整体风格

const { tagsView, fixedHeader, sidebarLogo } = defaultSettings
const state = {
  defaultCorlor: variables.theme,
  theme: variables.theme,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  isDefault: false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
    updateThemeColor(value)
  },
  isDefaultColor(state, val) {
    state.isDefault = val
    state.theme = variables.theme
  },
  defaultColors(state, val) {
    state.isDefault = val
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
