<!--  -->
<template>
  <div ref="printHtml" v-if="printCancels" style="padding-top: 80px">
    <h2 style="text-align: center">已开立其他银行账户清单</h2>
    <div style="padding: 20px 0">
      <span
        style="
          display: inline-block;
          width: 200px;
          font-size: 22px;
        "
      >存款人名称:</span>
      <span
        style="display: inline-block; padding-left: 30px; font-size: 22px"
      >{{ printDatas.dep_name }}
      </span>
    </div>
    <div style="padding-bottom: 50px">
      <span
        style="
          display: inline-block;
          width: 200px;
          font-size: 22px;
        "
      >基本存款账户编号:</span>
      <span
        style="display: inline-block; padding-left: 30px; font-size: 22px"
      >{{ printDatas.baselicno }}
      </span>
    </div>
    <div style="padding-bottom: 50px">
      <span
        style="
          display: inline-block;
          width: 200px;
          font-size: 22px;
        "
      >账户销户日期:</span>
      <span
        style="display: inline-block; padding-left: 30px; font-size: 22px"
      >{{ printDatas.delete_date }}
      </span>
    </div>
    <el-table
      :data="printDatas.acc_list"
      height="300"
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
      />
      <el-table-column
        v-for="item in tableColumn"
        :key="item.id"
        :prop="item.name"
        :label="item.label"
        :width="item.width"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    printCancels: {
      type: Boolean,
      default: false
    },
    printDatas: {
      type: Object,
      default: function() {
        return {}
      }
    },
    tableColumn: {
      type: Array,
      default: function() {
        return []
      }
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
<style scoped>
</style>
