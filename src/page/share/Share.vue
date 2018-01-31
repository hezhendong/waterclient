
<template>
  <div class="mobiledetail">
    <ul class="input-box">
      <li>
        <input type="text" placeholder="手机号" name="" v-model='share_phone'>
      </li>
      <li>
        <input type="text" placeholder="请输入验证码" name="" v-model='share_code'>
        <button @click="share_gain_code($event)">获取验证码</button>
      </li>
    </ul>
    <div class="submit-btn">
      <p>注册成功后请用该手机号直接登录</p>
      <div class="btn-success">进入补君堂</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'mobiledetail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      share_phone:'',
      num:60,
      phone_reg:/^1[3|4|5|7|8][0-9]\d{4,8}$/
    }
  },
  mounted () {
    this.share_footer_hide()
  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    ...mapMutations([
        'storeDoctorName'
      ]),
    share_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-10000000'
    },
    share_gain_code:function(e){
      var vm = this
      console.log(this.share_phone)
      if(vm.phone_reg.test(vm.share_phone)){
        
        vm.$http.post('/traditionalChineseMedicine/information/sendMessage',{
          phoneNumber:vm.share_phone,
          state:0,
          type:2
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          function start(){
            var timer = "";
            (function numChange(){
              window.clearTimeout(timer)
              if(vm.num>0){
                //console.log("000")
                  vm.num=vm.num-1
                  //console.log(num)
                // $(".gain_reginster_code").html(num)
                e.target.innerHTML=vm.num
                e.target.setAttribute("disabled","disabled")
                window.setTimeout(start,1000)
              }else{
                window.clearTimeout(timer)
                // $(".gain_reginster_code").html("重新获取")
                e.target.innerHTML='重新获取'
                e.target.removeAttribute("disabled")
                vm.num=60
              }
            })()
          }
          start()
        },function(e){
          console.log(e)
        })
      }else{
        // console.log("______")
        Toast({
          message: '手机格式不正确',
          position: 'center',
          duration: 1000
        });
      }
      
    },
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.mobiledetail
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  background-image url('../../../static/share.png') 
  background-size 95% 95%
  background-repeat no-repeat
  background-position center center
  position relative
  ul.input-box
    position absolute
    top 1.8rem
    left 1.666rem
    li
      width 6.7rem
      height 1rem
      line-height 1rem
      background #fff
      margin-bottom 0.8rem
      overflow hidden
      input
        height 100%
        outline none
        float left
        border none
        width 4rem
        margin-left 0.266667rem
      button
        width 2rem
        background #fff
        border none
        outline none
        height 100%
        color #6b8693
</style>
