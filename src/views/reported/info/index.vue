<!--  -->
<template>
  <div class="app-container">
    <div class="sun-content">
      <div class="filter-container">
        <div class="left_container">
          <sun-form
            :config="config"
            :default-form="defaultForm"
            :reset="false"
            @query="queryList"
          >
            <!-- <template slot="header">
          </template> -->
          </sun-form>
        </div>
        <div class="right_container">
          <div class="inner_box">
            <div class="num" style="color: green">{{ succNum }}</div>
            <div class="des">成功上报数</div>
          </div>
          <div class="inner_box">
            <div class="num" style="color: red">{{ failNum }}</div>
            <div class="des">失败数</div>
          </div>
        </div>
      </div>
    </div>
    <table-list
      ref="tableListRef"
      :default-form="defaultForm"
      :btn-all="btnAll"
      @dataNum="dataNum"
    />
  </div>
</template>

<script>
import { SunForm } from '@/components' // 表单
import { config } from './info' // 表单配置
import TableList from './component/table' // 表格
import { permissionsBtn } from '@/utils/permissions' // 权限配置
export default {
  name: 'ReportedInfo',
  components: { SunForm, TableList },
  data() {
    return {
      failNum: 0,
      succNum: 0,
      config: config(this),
      defaultForm: {
        oper_type: '',
        acc_type: '',
        organ_no: '',
        report_state: '',
        date_two: [],
        acc_no: '',
        cus_no: '',
        userCheckbox: []
      },
      btnAll: {
        // 当前页需要配置权限的按钮  权限获取
        btnReportAdd: false,
        btnExport: false,
        btnPrintBasicAccount: false,
        btnPrintPassword: false
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.$store.dispatch('common/setExternalData', 'AREA_CODE')
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.btnPermissions() // 按钮权限
    this.$nextTick().then(() => {
      this.organTreeGet()
      this.queryList()
    })
  },
  methods: {
    /**
     * 配置机构树*/
    organTreeGet() {
      this.config.organ_no.options = this.$store.getters.organTree
    },
    /**
     * 按钮：查询*/
    queryList() {
      this.$refs.tableListRef.queryList(1)
    },
    dataNum(data) {
      const { failNum, succNum } = data
      this.failNum = failNum
      this.succNum = succNum
    },
    btnPermissions() {
      this.btnAll = permissionsBtn(this.$attrs.button_id, this.btnAll)
    }
  } 
}
</script>
<style scoped lang="scss">
.filter-container {
  position: relative;
  .left_container {
    width: 82%;
    display: inline-block;
  }
  .right_container {
    width: 18%;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .inner_box {
      width: 12rem;
      height: 7rem;
      border: 1px solid #f1f1f1;
      border-radius: 1rem;
      margin-bottom: 2rem;
      text-align: center;
      background: #f8f8f8;
      .num {
        height: 4rem;
        line-height: 4rem;
        font-size: 2rem;
        font-weight: bold;
      }
    }
  }
}
</style>
