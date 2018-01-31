<template>
  <div class="footer" id="footer">
    <ul>
      <li>
        <router-link to="/index">
          <img class="one" src="./hospital.png">
          <img class="two" src="./select-hospital.png">
          <span>首页</span>
        </router-link>
      </li>
      <li>
        <router-link to="/message" style="position:relative">
          <img class="one" src="./msg.png">
          <img class="two" src="./select-msg.png">
          <span>消息</span>
          <em v-if='this.$store.state.data.message_is_has' style="position:absolute;color:red;width:0.3rem;height:0.3rem;background:red;border-radius:0.3rem;right:0.65rem;top:0;"></em>
        </router-link>
      </li>
      <li>
        <router-link to="/userdoctor">
          <img class="one" src="./doctor.png">
          <img class="two" src="./select-doctor.png">
          <span>我的医生</span>
        </router-link>
      </li>
      <li>
        <router-link to="/usercenter">
          <img class="one" src="./user.png">
          <img class="two" src="./select-user.png">
          <span>个人中心</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hasmessage:false
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
      ]),
    footer_hide:function(){
      document.getElementById('footer')[0].style.zIndex="-10000"
    },
    has_message:function(){
      

     
    }
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  #footer
    width 100%
    height 1.333333rem
    background #fff
    z-index 10000
    overflow hidden
    ul 
      width 100%
      height 1.333333rem
      background #fff
      li
        width 25%
        height 1.333333rem
        float left
        overflow hidden
        padding 0 
        margin 0
        a
          display flex
          width 100%
          height 100%
          flex-direction column
          justify-content center
          align-items center
          color #607d8b
          img
            width auto
            height 0.506667rem
          img.one
            display block
          img.two
            display none
        a.router-link-exact-active
          text-decoration none
          .one
            display none
          .two
            display block
        a.router-link-active
          text-decoration none
          .one
            display none
          .two
            display block
</style>
