<template>
  <div class="default-item">
    <div class="default-item-inner">
      <el-calendar v-model="value" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeCalendar',

  data() {
    return {
      value: new Date()
    }
  },
  computed: {},
  created() {}
}
</script>
<style scoped lang="scss">
.default-item {
  padding: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: #fff;
  .default-item-inner{
    height: 100%;
    width: 100%;
    overflow: auto;
  }
}
</style>
