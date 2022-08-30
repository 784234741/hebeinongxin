<!--  -->
<template>
  <div class="app-container">
    <div class="sun-content">
      <div class="filter-container">
        <sun-form
          :config="config"
          :default-form="defaultForm"
          :reset="false"
          label-width="13rem"
          @query="queryList"
        >
          <!-- <template slot="header">
          </template> -->
        </sun-form>
      </div>
    </div>
    <table-list ref="tableListRef" :default-form="defaultForm" />
  </div>
</template>

<script>
import { SunForm } from '@/components' // 表单
import { config } from './info' // 表单配置
import TableList from './component/table' // 表格
export default {
  name: 'Address',
  components: { SunForm, TableList },
  data() {
    return {
      config: config(this),
      defaultForm: {
        cus_organ: '',
        reg_adr: ''
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.$nextTick().then(() => {
      this.organTreeGet()
      this.queryList()
    })
  },
  methods: {
    /**
     * 配置机构树*/
    organTreeGet() {
      this.config.cus_organ.options = this.$store.getters.organTree
    },
    /**
     * 按钮：查询*/
    queryList() {
      this.$refs.tableListRef.queryList(1)
    }
  }
}
</script>
<style scoped></style>
