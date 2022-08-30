<template>
  <div class="home-main">
    <router-link to="system/config/application" />
    <router-view />
    <!-- <component :is="currentRole" /> -->
    <div v-if="visible" class="save-button" @click="save">
      <!-- <el-button type="primary" @click="save">保存</el-button> -->
      <svg>
        <use xlink:href="#icon-baocun" />
      </svg>
    </div>
    <grid-layout
      :layout.sync="layout"
      :col-num="36"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[30, 20]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        @resize="resizeEvent"
        @move="moveEvent"
        @resized="resizedEvent"
        @container-resized="containerResizedEvent"
        @moved="movedEvent"
      >
        <div class="box">
          <Calendar v-if="item.i === '#11a000'" />
          <component
            :is="currentTabComponent(item)"
            v-else-if="defaultArr(item)"
            :data-obj="item"
          />
          <div v-else class="other">
            <div class="other-page">
              <component
                :is="require(`@/views/${item.path}`).default"
                :key="item.path"
              />
            </div>
          </div>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import Calendar from './page/Calendar.vue'
import DefaultItem from './page/components/defaultItem.vue'
import DefaultTable from './page/components/defaultTable.vue'
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import saveSvg from '@/assets/img/icons/svg/baocun.svg'
import { SysDialogController } from '@/api'
const { sysDialogController } = SysDialogController

export default {
  name: 'Home',
  components: {
    Calendar,
    DefaultItem,
    DefaultTable,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      visible: false,
      layout: [],
      saveSvg: saveSvg
    }
  },
  computed: {},
  created() {
    this.getBoxInit()
  },
  mounted() {
    this.$bus.$on('getBoxInit', this.getBoxInit)
    // 获取外表字典
    this.$store.dispatch('common/setExternalData', 'ROLE_NO')
    this.$store.dispatch('common/setExternalData', 'MODULE_ID')
  },
  methods: {
    currentTabComponent(item) {
      if (item.i === '#E00027') {
        return 'defaultTable'
      } else {
        return 'defaultItem'
      }
    },
    defaultArr(item) {
      return (
        item.i === '#11d000' ||
        item.i === '#11e000' ||
        item.i === '#11f000' ||
        item.i === '#E00027'
      )
    },
    // 获取模块初始化数据
    getBoxInit(param) {
      const msg = {
        parameterList: [{ user_no: this.$store.getters.userNo }],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        role_no: this.$store.getters.roleNo
      }
      const layout = []
      sysDialogController(msg).then((res) => {
        const moudlesObj = {}
        moudlesObj.default = res.retMap.defaultSysDialogs
        if (
          res.retMap.sysDialogs != null &&
          res.retMap.sysDialogs.length !== 0
        ) {
          moudlesObj.checked = res.retMap.sysDialogs
        } else {
          moudlesObj.checked = JSON.parse(JSON.stringify(moudlesObj.default))
        }
        this.$store.dispatch('common/setHomeMoudles', moudlesObj)
        moudlesObj.checked.forEach((item, index) => {
          layout.push({
            x: parseInt(item.page_x),
            y: parseInt(item.page_y),
            w: parseInt(item.page_width),
            h: parseInt(item.page_height),
            i: item.page_id,
            path: item.page_url,
            name: item.page_name
          })
        })
        let hash = {}
        this.layout = layout.reduce((preValue, value) => {
          if (!hash[value.name]) {
            hash[value.name] = true
            preValue.push(value)
          }
          return preValue
        }, [])
      })
    },
    // 改变盒子大小
    resizeEvent() {},
    // 移动盒子
    moveEvent() {},
    // 改变盒子大小后
    resizedEvent() {
      this.visible = true
    },
    // 外容器大小变化
    containerResizedEvent() {},
    // 移动盒子后
    movedEvent() {
      this.visible = true
    },
    save() {
      const parameterList = []
      this.layout.forEach((item) => {
        parameterList.push({
          page_order: 0,
          page_id: item.i,
          page_width: item.w,
          page_height: item.h,
          page_x: item.x,
          page_y: item.y
        })
      })
      const msg = {
        parameterList: parameterList,
        oper_type: dictionaryGet('OPERATE_MODIFY')
      }
      sysDialogController(msg).then((res) => {
        this.visible = false
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/assets/scss/common/variable/variables.scss';
.home-main {
  .save-button {
    position: fixed;
    top: 12vh;
    right: 2vw;
    padding: 1rem;
    display: flex;
    justify-content: right;
    z-index: 1;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background-color: $primary;
    opacity: 0.6;
    &:hover {
      cursor: pointer;
    }
    svg {
      fill: #fff;
    }
  }
  .box {
    width: 100%;
    height: 100%;
    overflow: auto;
    .other {
      width: 100%;
      height: 100%;
      padding: 1rem;
      border-radius: 1rem;
      background-color: #fff;
      .other-page {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
}
</style>
