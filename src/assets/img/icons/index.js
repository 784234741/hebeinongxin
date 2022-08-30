import Vue from 'vue'
import SunSvgIcon from '@/components/SunSvgIcon'// svg component

// register globally
Vue.component('sun-svg-icon', SunSvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
