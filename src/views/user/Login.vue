<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="账户: admin"
            v-decorator="[
              'username',
              {
                rules: [
                  { required: true, message: '请输入帐户名或邮箱地址' },
                  { validator: handleUsernameOrEmail }
                ],
                validateTrigger: 'change'
              }
            ]"
          >
            <a-icon slot="prefix" type="user" :style="{ color: '#889aa4' }" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            ref="password"
            tabindex="2"
            size="large"
            :type="passwordType"
            autocomplete="false"
            placeholder="密码: admin or ant.design"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码' }],
                validateTrigger: 'blur'
              }
            ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: '#889aa4' }" />
            <a-icon slot="suffix" :type="passwordType === 'password' ?  'eye-invisible' : 'eye'" @click="showPwd" :style="{ color: '#889aa4' }" />
          </a-input>
        </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          >确定</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// import md5 from 'md5'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      passwordType: 'password',
      loginBtn: false,
      loginType: 0,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {},
  methods: {
    ...mapActions(['Login']),
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regexEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      console.log(rule)
      console.log(value)
      if (regexEmail.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback && callback()
    },

    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['username', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (err) {
          console.log(err)
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
          return
        }
        console.log('login from', values)
        const loginParams = { ...values }
        delete loginParams.username
        loginParams[!state.loginType ? 'email' : 'username'] = values.username
        // md5加密
        // loginParams.password = md5(values.password)
        // console.log(loginParams)
        // 接口调用
        Login(loginParams)
          .then(() => this.loginSuccess())
          .catch(err => this.requestFailed(err))
          .finally(() => {
            state.loginBtn = false
          })
      })
    },
    loginSuccess (res) {
      this.$router.push({ name: 'dashboard' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `欢迎回来`
        })
      }, 1000)
    },
    requestFailed (err) {
      console.log(err)
      console.log(this)
      this.$notification.error({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    },

    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      // 校验
      this.$nextTick(() => {
        this.$refs.password.blur()
      })
    }
  }
}
</script>

<style lang="less" scoped>

.main /deep/ .ant-input {
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 1000px #2d3a4b inset;
  -webkit-box-shadow: 0 0 0 1000px #2d3a4b inset;
  -webkit-text-fill-color: #fff; // 字体颜色
  border-radius: 5px;
  color: #fff;
}

.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
