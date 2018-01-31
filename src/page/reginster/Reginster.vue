<template>
  <div class="reginster">
    <div class="reginster-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>注册</p>
    </div>
    <div class="reginster-content">
      <div class="header-img">
        <img src="../../assets/header.jpg">
      </div>
      <ul class="reginster-msg">
        <li>
          <img src="./user.png"><input v-model='realname' @blur='blur_phone' type="text" name="" placeholder="请输入您的手机号">
        </li>
        <li>
          <img src="./code.png"><input v-model='code' type="text" placeholder="请输入您的手机验证码" name=""><button @click="gain_code($event)">获取验证码</button>
        </li>
        <li>
          <img src="./password.png"><input  v-model='password' @blur='blur_password' placeholder="请输入6-14位密码" type="password" name="">
        </li> 
      </ul>
      <p>
        <input type="checkbox" name="" id="check_box" checked="checked"><span>我已同意 <a href="#">《用户注册协议》</a></span>
      </p>
      <div class="btn-reginster" @click="reginster">
          注册
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'reginster',
  data () {
    return {
      realname:"",
      code:"",
      password:"",
      phone_reg:/^1[3|4|5|7|8][0-9]\d{4,8}$/,
      password_reg: /^[a-zA-Z0-9]\w{5,17}$/,
      num:60,
      is_click:true
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.reginster_footer_hide()
  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout','storeUserInfo'
      ]),
    ...mapMutations([
        'storeUserId'
      ]),
    back:function(){
      this.$router.go(-1)
    },
    reginster_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-1000'
    },
    blur_phone:function(){
      if(this.phone_reg.test(this.realname)){

      }else{
        Toast({
          position:'center',
          duration:"1000",
          message:'手机号格式有误'
        })
      }
    },
    blur_password:function(){
      if(this.password_reg.test(this.password)){

      }else{
        Toast({
          position:'center',
          duration:"1000",
          message:'密码格式有误'
        })
      }
    },
    reginster:function(){
      var vm = this
      console.log(vm.realname)
      console.log(document.getElementById('check_box').checked)
      if(document.getElementById('check_box').checked){
         if(this.password_reg.test(this.password)){
          vm.$http.post('/traditionalChineseMedicine/information/checkoutMessage',{
            phoneNumber:vm.realname,
            code:vm.code
          },{emulateJSON:true}).then(function(res){
            console.log(res)
            if(res.body.errcode){
              Toast({
                message: res.body.msg,
                position: 'center',
                duration: 1000
              });
            }else{
              console.log(vm.realname,vm.password)
              vm.$http.post('/traditionalChineseMedicine/userinfo/register',{
                phoneNumber:vm.realname,
                password:vm.password,
                userType:0
              },{emulateJSON:true}).then(function(res){
                console.log(res)
                if(res.body.errcode){
                  Toast({
                    message: res.body.msg,
                    position: 'center',
                    duration: 1000
                  });
                }else{
                  Toast({
                    message: res.body.msg,
                    position: 'center',
                    duration: 1000
                  });
                  // vm.storeUserId(res.body.data.data.id)
                  // vm.$router.push('/login')
                }
              },function(e){
                console.log(e)
              })
            }
          },function(e){
            console.log(e)
          })
        }else{
          Toast({
            message: '密码格式不正确',
            position: 'center',
            duration: 1000
          });
        }
      }else{
        Toast({
          position:'center',
          message:'请认真阅读用户协议',
          duration:'1000'
        })
      }
      
    },
    gain_code:function(e){
      var vm = this
      console.log(vm.realname)
      if(this.phone_reg.test(this.realname)){
        
        vm.$http.post('/traditionalChineseMedicine/information/sendMessage',{
          phoneNumber:vm.realname,
          state:1,
          type:0
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
      
    }
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.reginster
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  .reginster-header
    position absolute
    top 0
    width 100%
    height 1.173333rem
    position relative
    i
      position absolute
      width 12px
      left 0.266667rem
      font-size 20px
      top 0.213333rem
    p
      text-align center
      line-height 1.173333rem
      font-size 18px 
  .reginster-content
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

        button
          width 1.866667rem
          height 100%
          text-align center
          line-height 1.333333rem
          border none
          background none
          color #607d8b
          outline none
        img
          width auto
          height 0.48rem
    p
      width 7.733333rem
      line-height 30px
      a
        color #607d8b
      input 
        width 15px
        height 15px
        float left
        margin-top 0.266667rem
        border 1px solid #000
        border-radius 2px
        -webkit-appearance checkbox
    div.btn-reginster
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
