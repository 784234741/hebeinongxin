<!--子页面配置-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/common/variable/variables.scss";

.app-main {
  height: calc(100vh - #{$tabHeight + $topHeight});
  width: 100%;
  position: relative;
  overflow: auto;
  background: $color_content;
}

// .fixed-header+.app-main {
//   padding-top: 50px;
// }

// .hasTagsView {
//   .app-main {
//     /* 84 = navbar + tags-view = 50 + 34 */
//     min-height: calc(100vh - 8.4rem);
//   }

//   .fixed-header+.app-main {
//     padding-top: 8.4rem;
//   }
// }
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 1.5rem;
  }
}
</style>
