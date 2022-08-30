<template>
  <div
    :class="classObj"
    class="app-wrapper"
    :style="{
      background: $store.state.settings.isDefault
        ? $store.state.settings.defaultCorlor
        : isChanged
    }"
  >
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import bgPng from '@/assets/img/main/bg.png'
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler' // 整体页面是否根据总宽配置 左侧显示方式
import { mapState } from 'vuex'
import { sendWebsocket, closeWebsocket } from '@/utils/websocket.js'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      // showSettings: state => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    isChanged() {
      if (
        this.$store.getters.theme === this.$store.state.settings.defaultCorlor
      ) {
        return `url(${bgPng})`
      } else {
        return this.$store.state.settings.theme
      }
    }
  },
  beforeDestroy() {
    // 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
    // 在需要主动关闭ws的地方都可以调用该方法
    closeWebsocket()
  },
  created() {
    // this.requstWs()
    // 配置默认色
    this.$store.dispatch('settings/changeSetting', {
      key: 'theme',
      value: this.$store.getters.theme
    })
  },
  methods: {
    // ws连接成功，后台返回的ws数据，组件要拿数据渲染页面等操作
    wsMessage(data) {
      const dataJson = data
      console.log(dataJson)
      // 这里写拿到数据后的业务代码
      this.$notify({
        title: '通知',
        message: '右下角弹出的消息',
        position: 'bottom-right'
      })
    },
    // ws连接失败，组件要执行的代码
    wsError() {
      // 比如取消页面的loading
    },
    // 初始化websocket连接
    requstWs() {
      // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
      closeWebsocket()
      // 跟后端协商，需要什么参数数据给后台
      const obj = {
        monitorUrl: 'xxxxxxxxxxxxx',
        userName: 'xxxxxxxxxx'
      }
      // 发起ws请求
      sendWebsocket(
        `ws://${process.env.VUE_APP_BASE_API}`,
        obj,
        this.wsMessage,
        this.wsError
      )
    },
    /**
     * 左侧布局显示隐藏*/
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/common/variable/mixin.scss';
@import '~@/assets/scss/common/variable/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background: $bgContent no-repeat;
  background-size: 100% $topHeight;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
