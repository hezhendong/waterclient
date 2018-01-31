<template>
  <div class="resetPassword">
    <div class="resetPassword-header">
      <i class="back">&lt;</i>
      <p>找回密码</p>
    </div>
    <div class="resetPassword-content">
      <div class="header-img">
        <img src="../../assets/header.jpg">
      </div>
      <ul class="resetPassword-msg">
        <li>
          <i>头像</i><input type="text" name="">
        </li>
        <li>
          <i>验证</i><input type="text" name=""><span>获取验证码</span>
        </li>
        <li>
          <i>密码</i><input type="text" name="">
        </li> 
        <li>
          <i>密码</i><input type="text" name="">
        </li>
      </ul>
      <div class="btn-resetPassword">
          完成
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'resetPassword',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))

  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout'
      ])
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.resetPassword
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  .resetPassword-header
    position absolute
    top 0
    width 100%
    height 1.173333rem
    position relative
    i
      position absolute
      width 10px
      left 0.266667rem
    p
      text-align center
      line-height 1.173333rem
      font-size 18px 
  .resetPassword-content
    width 100%
    height auto
    display flex
    flex-direction column
    align-items center
    div.header-img
      width 7.733333rem
      height 5.333333rem
      display flex
      justify-content center
      align-items center
      img
        width 2.346667rem
        height 2.346667rem
        border-radius 20px
    ul
      width 7.733333rem
      li
        width 100%
        height 1.333333rem
        border-bottom 1px solid #607d8b
        line-height 1.333333rem
        margin-top 0.266667rem
        input
          border none
          outline none
          margin-left 0.4rem
        span
          width 1.866667rem
          color #607d8b
    p
      width 7.733333rem
      line-height 30px
      a
        color #607d8b
      input 
        float left
        margin-top 0.266667rem
    div.btn-resetPassword
      width 7.6 rem
      height 1.2rem
      border-radius 1.2rem
      background #607d8b
      color #fff
      text-align center
      line-height 1.2rem
      font-size 16px
      margin-top 1.2rem
      font-weight bold
</style>
