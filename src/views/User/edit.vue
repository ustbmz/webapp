<template>
  <div>
    <my-header :title="'修改基本信息'" :bkColor='bkColor'></my-header>
    <div class="wrapper">
      <div class="logo">
        <img :src="pic" alt="" />
      </div>
      <div class="form">
        <div class="input-wrap">
          <mt-field label="昵称" placeholder="" v-model="name"></mt-field>
        </div>
        <div class="input-wrap">
          <mt-field label="城市" placeholder="" v-model="localtion"></mt-field>
        </div>
        <div class="input-wrap">
          <mt-field
            label="生日"
            placeholder=""
            type="date"
            v-model="birthday"
          ></mt-field>
        </div>
        <div class="input-wrap ">
          <mt-field
            label="签名"
            type="textarea"
            rows="4"
            v-model="regmark"
          ></mt-field>
        </div>

        <div class="input-wrap btline">
          <mt-field label="验证码" v-model="captcha">
            <div v-html="svg" @click="_getCode()"></div>
          </mt-field>
        </div>
        <div class="btns mt4">
          <mt-button type="primary" @click="confirm()" size="large">
            确认修改
          </mt-button>
          <mt-button class="mt2" @click="goBack()" size="large">
            取消
          </mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { updateUserInfo } from '@/api/user'
import store from '@/store'
import { SET_USER } from '@/store/mutation-types'
export default {
  name: 'edit',
  data () {
    return {
      bkColor: '#02d199',
      name: '',
      localtion: '',
      code: '',
      svg: '',
      captcha: '',
      pic: '',
      birthday: '2020-01-01',
      regmark: ''
    }
  },
  mounted () {
    this._getCode()
    this.name = this.user.name
    this.localtion = this.user.localtion
    this.regmark = this.user.regmark
    this.pic = this.user.pic
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isLogin: 'user/isLogin',
      token: 'user/token'
    })
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
    async confirm () {
      if (this.name === '') {
        this.$Toast('昵称不得为空')
        return
      }
      const result = await updateUserInfo({
        name: this.name,
        pic: this.pic,
        localtion: this.localtion,
        regmark: this.regmark,
        code: this.code
      })
      if (result.code === 200) {
        this.$Toast('修改成功')
        this.user.name = this.name
        this.user.pic = this.pic
        this.user.localtion = this.localtion
        this.user.regmark = this.regmark

        store.commit('user/' + SET_USER, this.user)

        this.$router.push({ name: 'user' })
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px 40px;
  .logo {
    padding-top: 20px;
    text-align: center;
    img {
      width: 30%;
      border-radius: 50%;
    }
  }
}
.form {
  padding-top: 30px;
  .input-wrap {
    flex-flow: row nowrap;
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
.mint-field .mint-cell-wrapper {
  border: none;
}
.mint-cell .mint-field {
  border: none;
}
.btline{
  border-bottom: 1px solid sandybrown;
}
</style>
