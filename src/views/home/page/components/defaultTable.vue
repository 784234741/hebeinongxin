<template>
  <div class="default-table">
    <div class="table-title">预警数量展示</div>
    <div class="table-body">
      <el-table :data="tableData">
        <el-table-column prop="warn_type" label="预警类型" />
        <el-table-column prop="warn_num" label="预警数量" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { SysDialogController } from '@/api'
const { acHomePageInit } = SysDialogController
export default {
  name: 'DefaultTable',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    const msg = { parameterList: [], oper_type: 'selectWarnNum' }
    acHomePageInit(msg).then((res) => {
      const {
        retMap: { list }
      } = res
      this.tableData = list
    })
  }
}
</script>
<style scoped lang="scss">
.default-table {
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  .table-title {
    height: 50px;
    line-height: 50px;
    font-size: 1.6rem;
    font-weight: bold;
    padding-left: 1rem;
  }
  .table-body {
    height: calc(100% - 50px - 2rem);
    overflow: auto;
  }
}
</style>
