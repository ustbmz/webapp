<template>
  <div>
    <my-header :title="'登录'"></my-header>
    <div class="wrapper">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <div class="form">
        <div class="input-wrap">
          <svg-icon icon="person"></svg-icon>
          <input type="text" placeholder="请输入用户名" v-model="username" />
        </div>
        <div class="input-wrap">
          <svg-icon icon="lock"></svg-icon>
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="input-wrap flex">
          <div class="code-input">
            <svg-icon icon="check"></svg-icon>
            <input type="text" placeholder="请输入验证码" v-model="code" />
          </div>
          <div v-html="svg" @click="_getCode()"></div>
        </div>
        <div class="form-controls">
          <router-link :to="{ name: 'reg' }">注册</router-link>
          <router-link :to="{ name: 'forget' }">忘记密码</router-link>
        </div>
        <div class="btns">
          <mt-button type="primary" @click="_login()" size="large"
            >登录</mt-button
          >
        </div>
        <div class="form-bottom">
          <svg-icon icon="qq" class="iconQQ"></svg-icon>
          <svg-icon icon="weixin" class="iconWX"></svg-icon>
          <svg-icon icon="weibo" class="iconWB"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    ...mapActions({
      getCode: 'user/getCode',
      login: 'user/login'
    }),
    async _getCode () {
      const result = await this.getCode()
      if (result.code === 200) {
        this.svg = result.data
      }
    },
    async _login () {
      const result = await this.login({
        username: this.username,
        password: this.password,
        code: this.code
      })
      if (result.code === 200) {
        this.$Toast('登录成功')
        setTimeout(() => {
          this.$router.push({ name: 'index' })
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: $header-height 30px 0 30px;
  .logo {
    padding-top: 10px;
    text-align: center;
    img {
      width: 40%;
    }
  }
}
.form {
  padding-top: 30px;
  .input-wrap {
    line-height: 80px;
    border-bottom: 1px solid $border-color;
    margin-bottom: 20px;
    input {
      width: 80%;
      outline: none;
    }
    .svg-icon {
      font-size: 36px;
      vertical-align: middle;
      padding: 0 20px;
      color: #666;
    }
    // .code {
    //   float: right;
    //   position: relative;
    //   top: -12px;
    // }
    &.flex {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .code-input {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-left: 5px;
        input {
          width: 100%;
        }
      }
    }
  }
}
.form-controls {
  margin: 20px 0 30px 0;
  display: flex;
  flex-direction: row nowarp;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: #999;
  }
}

.form-bottom {
  display: flex;
  font-size: 48px;
  justify-content: space-around;
  flex-flow: row nowrap;
  margin-top: 60px;
  .svg-icon {
    font-size: 60px;
    color: #666;
  }
  .iconQQ {
    color: #7ca9c9;
  }
  .iconWB {
    color: #e6162d;
  }
  .iconWX {
    color: #2fd63a;
  }
}
</style>
