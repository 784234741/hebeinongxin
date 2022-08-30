<!--
 * 打印
 !-->
<template>
  <div ref="printHtml">
    <div v-for="item in tableData.column" :key="item.id" class="rowDiv">
      <div v-for="item2 in tableData.data" :key="item2.row_id">
        <span v-if="item.name === 'open_organ'">{{
          item2[item['name']] | organNameFormat
        }}</span>
        <span
          v-else-if="item.name === 'acc_no'"
          :style="{ color: $store.state.settings.theme }"
        >{{ item2[item['name']] }}</span>
        <span
          v-else-if="item.name === 'annual_state'"
          :style="
            item2[item['name']] === '1' || item2[item['name']] === '5'
              ? 'color: blue'
              : item2[item['name']] === '3'
                ? 'color: green; cursor: pointer'
                : item2[item['name']] === '4'
                  ? 'color: red; cursor: pointer'
                  : 'color: red'
          "
        >{{ item2[item['name']] | annualState }}</span>
        <span v-else-if="item.name === 'is_hand'">{{
          item2[item['name']] | isHand
        }}</span>
        <span v-else-if="item.name === 'report_state'">{{
          item2[item['name']] | reportStates
        }}</span>
        <span v-else-if="item.name === 'confirm_state'">{{
          item2[item['name']] | confirmState
        }}</span>
        <span v-else-if="item.name === 'annual_date'">{{
          item2[item['name']] | date10Format
        }}</span>
        <span v-else>{{ item2[item['name']] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    time: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
}
</script>
<style lang="scss" scoped>
.rowDiv {
  display: inline-block;
  vertical-align: top;
  // padding-right: 3px;
  font-size: 10px;
  text-align: center;
  span {
    display: block;
    height: 20px;
  }
}
</style>
