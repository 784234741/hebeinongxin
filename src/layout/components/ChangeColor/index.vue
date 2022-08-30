<template>
  <el-dialog title="换肤" :visible.sync="dialogVisible" width="30%">
    <div class="drawer-item">
      <span>Theme Color</span>
      <theme-picker
        style="float: right; height: 26px; margin: -3px 8px 0 0"
        @change="themeChange"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="defaultColor">默认颜色</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisibles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { SysUser } from '@/api'
const { update } = SysUser
import ThemePicker from '@/components/ThemePicker'
import { commonMsgSuccess } from '@/utils/message.js' // 提示信息
export default {
  name: 'ChangeColor',
  components: { ThemePicker },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    dialogShow() {
      this.dialogVisible = true
    },
    themeChange(val) {
      this.$store.commit('settings/defaultColors', false)
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    },
    defaultColor() {
      this.$store.commit('settings/isDefaultColor', true)
    },
    dialogVisibles() {
      this.dialogVisible = false
      const msg = {
        parameterList: [''],
        sysMap: {
          user_no: 'admin',
          custom_attr: {
            theme: this.$store.state.settings.theme
          },
          oper_type: 'updateTheme'
        }
      }
      update(msg).then((res) => {
        if (res.retCode === '200') {
          commonMsgSuccess('换肤成功', this)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
