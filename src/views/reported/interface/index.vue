<template>
  <module :button-id="buttonId" />
</template>
<script>
import Module from '../module' // 表单
export default {
  name: 'ReportedInterface',
  components: { Module },
  data() {
    return {
      buttonId: ''
    }
  },
  mounted() {
    this.buttonId = this.$attrs.button_id
  }
}
</script>
<style scoped></style>
