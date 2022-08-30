<!--  -->
<template>
  <div ref="printHtmls" v-if="isPrint">
    <div>
      <div style="font-weight: bold; text-align: center; padding-top: 60px; padding-bottom: 60px; font-size: 26px">
        基本存款账户信息
      </div>
      <div style="padding-bottom: 50px">
        <span
          style="
            display: inline-block;
            width: 200px;
            text-align: right;
            font-size: 22px;
            font-weight: bold;
          "
        >账户名称:</span>
        <span
          style="display: inline-block; padding-left: 30px; font-size: 22px"
        >{{ printData.base_info.accName }}
        </span>
      </div>
      <div style="padding-bottom: 50px">
        <span
          style="
            display: inline-block;
            width: 200px;
            text-align: right;
            font-size: 22px;
            font-weight: bold;
          "
        >账户号码:</span>
        <span
          style="display: inline-block; padding-left: 30px; font-size: 22px"
        >{{ printData.base_info.accNo }}
        </span>
      </div>
      <div style="padding-bottom: 50px">
        <span
          style="
            display: inline-block;
            width: 200px;
            text-align: right;
            font-size: 22px;
            font-weight: bold;
          "
        >开户银行:</span>
        <span
          style="display: inline-block; padding-left: 30px; font-size: 22px"
        >{{ printData.base_info.bankName }}
        </span>
      </div>
      <div style="padding-bottom: 50px">
        <span
          style="
            display: inline-block;
            width: 200px;
            text-align: right;
            font-size: 22px;
            font-weight: bold;
          "
        >&emsp;&emsp;&emsp;法定代表人:(单位负责人)</span>
        <span
          style="display: inline-block; padding-left: 30px; font-size: 22px"
        >{{ printData.base_info.legalName }}
        </span>
      </div>
      <div style="padding-bottom: 50px">
        <span
          style="
            display: inline-block;
            width: 200px;
            text-align: right;
            font-size: 22px;
            font-weight: bold;
          "
        >基本存款账户编号:</span>
        <span
          style="display: inline-block; padding-left: 30px; font-size: 22px"
        >{{ printData.base_info.baselicno }}
        </span>
      </div>
      <div style="padding: 100px 50px 0 0; text-align: right; font-size: 22px; font-weight: bold">
        {{printData.year}}年{{printData.month}}月{{printData.day}}日
      </div>
    </div>
    <div style="margin-top: 1100px; padding-top: 100px">
      <div style="margin-bottom: 20px">
        <span
          style="
            display: inline-block;
            width: 200px;
            text-align: right;
            font-size: 22px;
            font-weight: bold;
          "
        >存款人姓名:</span>
        <span
          style="display: inline-block; padding-left: 30px; font-size: 22px"
        >{{ printData.acc_pwd.cusName }}
        </span>
      </div>
      <div style="margin-bottom: 20px">
        <span
          style="
            display: inline-block;
            width: 200px;
            text-align: right;
            font-size: 22px;
            font-weight: bold;
          "
        >存款人查询密码:</span>
        <span
          style="display: inline-block; padding-left: 30px; font-size: 22px"
        >{{ printData.acc_pwd.sdepPsw }}
        </span>
      </div>
      <div style="padding-left: 70px; font-size: 14px; margin-top: 100px">
        请妥善保管，存款人可凭此密码到基本存款账户的开户银修改密码或打印已开立银行结算账户清单。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    printData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isPrint: {
      type: Boolean,
      default: false
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
