<template>
  <div class="login">
    <div class="btn-cut">
      <span @click="changeState($event)" :class="{'selected':!flag}">账号登录</span>
      <span @click="changeState($event)" :class="{'selected':flag}">快捷登录</span>
    </div>
    <ul class="account" v-if="flag">
      <li>
        <img src="./user.png"><input type="text" v-model='realname' @focus="init_phone" @blur="check_phone" name="" placeholder="请输入手机号">
      </li>
      <li>
        <img src="./password.png"><input type="password" v-model='password' @focus="init_password" @blur="check_password"  placeholder="请输入密码" name="">
      </li>
      <p>
        <i><router-link to='/reginster'>注册新用户</router-link></i>
        <i><router-link to='/resetpassword'>忘记密码</router-link></i>
      </p>
      <div class="btn-login" @click="login_password">登录</div>
    </ul>
    <ul class="fast" v-if="!flag">
      <li>
        <img src="./user.png"><input v-model='realname' placeholder="请输入手机号" type="text" name="">
      </li>
      <li>
        <img src="./code.png"><input type="code" v-model='code' placeholder="请输入验证码" name="">
        <button @click="gain_login_code($event)">获取验证码</button>
      </li>
      <p>
        <i><router-link to='/reginster'>注册新用户</router-link></i>
        <i><router-link to='/resetpassword'>忘记密码</router-link></i>
      </p>
      <div class="btn-login" @click="login_code">登录</div>
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
      flag:true,
      realname:"",
      code:"",
      password:"",
      phone_reg:/^1[3|4|5|7|8][0-9]\d{4,8}$/,
      password_reg: /^[a-zA-Z0-9]\w{5,17}$/,
      num:60
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.login_footer_hide()
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
    changeState: function(e){
      this.flag = !this.flag
    },
    gain_login_code:function(e){
      var vm = this
      console.log(this.realname)
      if(vm.phone_reg.test(vm.realname)){
        
        vm.$http.post('/traditionalChineseMedicine/information/sendMessage',{
          phoneNumber:vm.realname,
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
    login_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-1000'
    },
    check_phone:function(){
      var vm = this
      if(this.phone_reg.test(this.realname)){

      }else{
        Toast({
              message: '手机格式不正确',
              position: 'center',
              duration: 1000
            });
      }
    },
    check_password:function(){
      var vm = this
      if(this.password_reg.test(this.password)){
        
      }else{
        Toast({
              message: '密码格式不正确',
              position: 'center',
              duration: 1000
            });
      }
    },
    init_phone:function(){
      this.realname=''
    },
    init_password:function(){
      this.password=''
    },
    login_code:function(){
        var vm = this
        if(this.phone_reg.test(this.realname)){
          vm.$http.post('/traditionalChineseMedicine/information/checkoutMessage',{
               phoneNumber:vm.realname,
               code:vm.code
             },{emulateJSON:true}).then(function(res){
               console.log(res)
               if(res.errocde){
                 Toast({
                   message: res.body.msg,
                   position: 'center',
                   duration: 1000
                 });
               }else{
                console.log(vm.realname)
                  vm.$http.post('/traditionalChineseMedicine/userinfo/shortcutLogin',{
                    phoneNumber:'18668127573'
                  },{emulateJSON:true}).then(function(res){
                    console.log(res)
                    if(res.body.errcode){
                      Toast({
                         message: res.body.msg,
                         position: 'center',
                         duration: 1000
                       });
                    }else{
                      vm.storeUserInfo(res.body.data)
                      vm.storeUserId(res.body.data.id)
                      vm.$router.push('/index')
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
               message: '手机格式不正确',
               position: 'center',
               duration: 1000
             });
        }
    },
    login_password:function(){
         var vm = this
         if(this.phone_reg.test(this.realname)){
           if(vm.password_reg.test(vm.password)){
             vm.$http.post('/traditionalChineseMedicine/userinfo/login',{
               phoneNumber:vm.realname,
               password:vm.password
             },{emulateJSON:true}).then(function(res){
               console.log(res)
               if(res.body.errcode){
                 Toast({
                   message: res.body.msg,
                   position: 'center',
                   duration: 1000
                 });
               }else{
                 vm.storeUserInfo(res.body.data)
                 vm.storeUserId(res.body.data.id)
                 vm.$router.push('/index')
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
.login
  width 100%
  height 100%
  background #fff
  overflow hidden
  display flex
  flex-direction column
  align-items center
  div.btn-cut
    width 7.6rem
    height 0.933333rem
    display flex
    flex-direction row
    justify-content space-between
    font-size 16px
    span
      width 3.2rem
      height 0.933333rem
      text-align center
      line-height 0.933333rem
      border-radius 8px
      background #607d8b
      color #fff
      margin-top 3.253333rem
      font-weight bold
    span.selected
      width 3.2rem
      height 0.933333rem
      text-align center
      line-height 0.933333rem
      border-radius 8px
      background #fff
      border 1px solid #607d8b
      color #607d8b
      margin-top 3.253333rem
  ul.account
    width 7.6rem
    height auto
    margin-top 6.4rem
    li
      width 100%
      height 1.333333rem
      border-bottom 1px solid #607d8b
      line-height 1.333333rem
      margin-top 0.266667rem
      input
        width 3rem
        border none
        outline none
        margin-left 0.4rem
      img
        width auto 
        height 0.48rem
  ul.fast
    width 7.6rem
    height auto
    margin-top 6.4rem
    li
      width 100%
      height 1.333333rem
      border-bottom 1px solid #607d8b
      line-height 1.333333rem
      margin-top 0.266667rem
      input
        width 3.5rem
        border none
        outline none
        margin-left 0.4rem
      button
        width auto
        height 100%
        text-align center
        line-height 1.333333rem
        background none
        border none
        outline none
        color #607d8b
        padding 0 0.26667rem
      img
        width auto
        height 0.48rem
  p
    width 7.6rem
    display flex
    flex-direction row 
    justify-content space-between
    
    a
      text-decoration none
      color #607d8b
  div.btn-login
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
