const validatePass = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,16}$/.test(value)) {
    callback(new Error('* 密码长度6~16，必须包含数字、字母、特殊符号'))
  } else {
    callback()
  }
}
export const config = (that) => ({
  user_no: {
    component: 'input',
    label: '用户号',
    colSpan: 23,
    name: 'user_no',
    config: {},
    componentProps: {
      disabled: true
    }
  },
  user_name: {
    component: 'input',
    label: '用户名',
    colSpan: 23,
    name: 'user_name',
    config: {},
    componentProps: {
      disabled: true
    }
  },
  j_userinfo_changepass_oldpass: {
    component: 'input',
    label: '旧密码',
    colSpan: 23,
    name: 'j_userinfo_changepass_oldpass',
    config: {
      rules: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }]
    },
    componentProps: {
      clearable: true,
      showPassword: true,
      placeholder: '请输入原密码'
    }
  },
  j_userinfo_changepass_newpass: {
    component: 'input',
    label: '新密码',
    colSpan: 23,
    name: 'j_userinfo_changepass_newpass',
    config: {
      rules: [
        { required: true, message: '新密码不能为空', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
      ]
    },
    componentProps: {
      clearable: true,
      showPassword: true,
      placeholder: '请输入新密码'
    }
  },
  j_userinfo_changepass_confirmpass: {
    component: 'input',
    label: '确认密码',
    colSpan: 23,
    name: 'j_userinfo_changepass_confirmpass',
    config: {
      rules: [
        { required: true, message: '确认密码不能为空', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' },
        {
          validator: function(rule, value, callback) {
            if (value !== that.dialog3.formData.j_userinfo_changepass_newpass) {
              callback(new Error('密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ]
    },
    componentProps: {
      clearable: true,
      showPassword: true,
      placeholder: '请输入新密码'
    }
  }
})
