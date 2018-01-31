<template>
  <div class="resetPassword">
    <div class="resetPassword-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>找回密码</p>
    </div>
    <div class="resetPassword-content">
      <div class="header-img">
        <img src="../../assets/header.jpg">
      </div>
      <ul class="resetPassword-msg">
        <li>
          <img src="./user.png"><input type="text" v-model="realname" @focus="init_realname" @blur='check_realname' name="" placeholder="请输入您的手机号">
        </li>
        <li>
          <img src="./code.png"><input type="text" v-model="code" name="" placeholder="请输入验证码"><button @click="gain_password_code($event)">获取验证码</button>
        </li>
        <li>
          <img src="./password.png"><input type="text" name="" @focus="init_password" @blur='check_password' placeholder="请输入6-14位密码" v-model='password'>
        </li> 
        <li>
          <img src="./password.png"><input type="text" name="" @focus="init_nextpassword" @blur='check_nextpassword' placeholder="请重新输入密码" v-model='nextpassword'>
        </li>
      </ul>
      <div class="btn-resetPassword" @click="reset_success">
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
      realname:"",
      code:"",
      password:"",
      phone_reg:/^1[3|4|5|7|8][0-9]\d{4,8}$/,
      password_reg: /^[a-zA-Z0-9]\w{5,17}$/,
      num:60,
      nextpassword:""
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.find_password()
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
    find_password:function(){
      document.getElementById('footer').style.zIndex='-1000'
    },
    back:function(){
      this.$router.go(-1)
    },
    gain_password_code:function(e){
      var vm = this
      console.log(this.realname)
      if(vm.phone_reg.test(vm.realname)){
        
        vm.$http.post('/traditionalChineseMedicine/information/sendMessage',{
          phoneNumber:vm.realname,
          state:'0',
          type:"2"
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
    init_realname:function(){
      this.realname=''
    },
    init_password:function(){
      this.password=''
    },
    init_nextpassword:function(){
      this.nextpassword=''
    },
    check_realname:function(){
      var vm = this 
      if(vm.phone_reg.test(vm.realname)){

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
      if(vm.password_reg.test(vm.password)){

      }else{
        Toast({
          message: '密码格式不正确',
          position: 'center',
          duration: 1000
        });
      }
    },
    check_nextpassword:function(){
      var vm = this
      if(vm.password==vm.nextpassword){

      }else{
        Toast({
          message: '两次输入的密码有误',
          position: 'center',
          duration: 1000
        });
      }
    },
    reset_success:function(){
      var vm = this
      if(vm.phone_reg.test(vm.realname)){
        if(vm.password_reg.test(vm.password)){
          if(vm.password==vm.nextpassword){
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
                vm.$http.post('/traditionalChineseMedicine/userinfo/updatePassword',{
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
                    vm.storeUserId(res.body.data.data.id)
                    vm.storeUserInfo(res.body.data.data)
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
              message: '两次输入的密码有误',
              position: 'center',
              duration: 1000
            });
          }
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
      top 0.266667rem
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
        button
          width 1.866667rem
          color #607d8b
          background none
          border none
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
.footer
  z-index -10
</style>
