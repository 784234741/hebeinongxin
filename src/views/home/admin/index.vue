<template>
  <div class="dashboard-editor-container">
    <panel-group />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 2rem;
  background-color: rgb(240, 242, 245);
  position: relative;
}

</style>
