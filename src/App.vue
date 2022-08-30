// 代码主入口
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'App',
  data() {
    return {
      datas: {}
    }
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息1
    if (localStorage.getItem('store') && getToken()) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem('store'))
        )
      )
      this.$nextTick(() => {
        // localStorage.clear() // 清空所有缓存
      })
    }
    // store存储 begin
    window.onbeforeunload = (event) => {
      for (const key in this.$store.state) {
        if (key !== 'tagsView') {
          this.$set(this.datas, key, this.$store.state[key])
        }
      }
      const storeS = JSON.stringify(this.datas)
      const e = event || window.event
      if (e) {
        // e.returnValue = '关闭提示'
      }

      if (getToken()) {
        localStorage.setItem('store', storeS)
      } else {
        // localStorage.clear() // 清空所有缓存
      }

      // return '关闭提示?'
    }
    // store存储 end
  },
  mounted() {}
}
</script>
