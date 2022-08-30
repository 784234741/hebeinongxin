<template>
  <div class="login-container">
    <div class="login-logo" />
    <!--白色logo-->
    <div class="login-content login-tab">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="off"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">{{ title }}</h3>
        </div>
        <span class="form-label">员工帐户</span>
        <el-form-item prop="username">
          <!-- <span class="svg-container">
                <sun-svg-icon icon-class="user" />
              </span> -->
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="off"
            @keyup.enter.native="passWordFocus"
          />
        </el-form-item>
        <span class="form-label">员工密码</span>
        <el-tooltip
          v-model="capsTooltip"
          content="大写锁定已开启"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <!-- <span class="svg-container">
                  <sun-svg-icon icon-class="password" />
                </span> -->
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <sun-svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button
          :loading="loading"
          type="primary"
          class="login_btn"
          @click.native.prevent="handleLogin"
        >{{ loginBtn }}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import '@/assets/scss/login.scss' // 样式
import defaultSettings from '@/settings'
import { dateNowFormat } from '@/utils/date'
import { commonMsgError } from '@/utils/message'
import { Login } from '@/api'
const { title } = defaultSettings
const { timeCheck } = Login
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能少于5位'))
      } else {
        callback()
      }
    }
    return {
      title: title,
      loginBtn: '登录',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入正确的用户名' }],
        password: [{ required: true, validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined, // 重定向
      activeName: 'first' // 当前选项卡
    }
  },
  watch: {
    $route: {
      // 对路由变化作出响应...
      handler: function(route) {
        const query = route.query
        if (query) {
          // this.redirect = query.redirect // 保存页面退出后的默认选项卡
        }
      },
      immediate: true // 确认是否以当前的初始值执行handler的函数。
    }
  },
  mounted() {
    this.$refs.username.focus()
    // this.checkTime()
  },
  destroyed() {},
  methods: {
    /**
     * 大写锁定键开启关闭*/
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    /**
     * 焦点配置 - 在用户名框中回车*/
    passWordFocus() {
      this.$refs.password.focus()
    },
    /**
     * 密码显示隐藏*/
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    /**
     * 登录*/
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch((response) => {
              const { loginMsg } = response.retMap
              commonMsgError(loginMsg, this)
              this.loading = false
            })
        } else {
          return false
        }
      })
    }, // end
    /**
     * 客户访问时间校验*/
    checkTime() {
      const msg = {
        cunrrentTime: dateNowFormat(),
        oper_type: 'TimeCheck'
      }
      timeCheck(msg)
        .then((response) => {})
        .catch(() => {
          this.$router.push({ path: '/error' })
        })
    } // checkTime
  }
}
</script>

<!--私有样式-->
<style lang="scss" scoped></style>
