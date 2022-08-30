<template>
  <div class="default-item">
    <div class="top-list-cont">
      <svg>
        <use :xlink:href="svgName" />
      </svg>
    </div>
    <div class="top-list-cont top-list-title">
      <span class="title-cont">{{ dataObj.name }}</span>
      <span class="title-num">0</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultItem',
  props: {
    dataObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    svgName: function() {
      if (this.dataObj.name === '久悬数量') {
        return '#icon-hanging'
      }
      if (this.dataObj.name === '账户报备') {
        return '#icon-accountR'
      }
      if (this.dataObj.name === '账户年检') {
        return '#icon-accountY'
      }
      return ''
    }
  },
  created() {}
}
</script>
<style scoped lang="scss">
.default-item {
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: #fff;
  .top-list-cont {
    width: 50%;
    height: 100%;
    position: relative;
    float: left;
     svg {
      width: 70%;
      height: 100%;
      margin-left: 15%;
    }
    .title-cont {
      top: 25%;
    }
    .title-num {
      margin-top: 2rem;
      font-weight: 600;
      font-size: 2.6rem;
      color: #2f9bff;
    }
  }
  .top-list-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
