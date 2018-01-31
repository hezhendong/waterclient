<template>
  <div class="resetphone">
    <div class="resetphone-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>修改手机号</p>
    </div>
    <div class="top">
      
    </div>
    <div class="resetphone-content">
      <div><input type="text" name="" v-model='new_phone' @blur='reg_phone' placeholder="请输入新的手机号"></div>
      <div class="getNode"><input v-model="code" type="text" name="" placeholder="请输入短信验证码"><button @click="gain_code" ref='gain_timer'>发送验证码</button></div>
      <span class="btn-reset" @click="reset_phone">确定</span>
      <form ref='reset_phone_page'></form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
 export default {
     data() {
       return {
         new_phone:'',
         code:'',
         num:60,
         reset_msg:'重新获取'
       }
    
     },
  mounted(){
    this.resetphone_footer_hide()
    
  },
  methods : {
    back:function(){
      this.$router.go(-1)
    },
    resetphone_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-100000'
    },
    gain_code:function(){
      var vm = this
      this.$http.post('/traditionalChineseMedicine/information/sendMessage',{
        phoneNumber:vm.new_phone,
        state:'0',
        type:'2'
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        function start(){
          var timer = "";
          (function numChange(){
            window.clearTimeout(timer)
            if(vm.num>0){
                vm.num--
              vm.$refs.gain_timer.innerHTML = vm.num
              vm.$refs.gain_timer.setAttribute("disabled","disabled")
              window.setTimeout(start,1000)
            }else{
              window.clearTimeout(timer)
              vm.$refs.gain_timer.innerHTML =vm.reset_msg
              vm.$refs.gain_timer.removeAttribute("disabled")
              vm.num=60
            }
          })()
        }
        start()
      },function(e){
        console.log(e)
      })
    },
    reg_phone:function(){
      var vm = this
      var phone_reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/
      if(phone_reg.test(vm.new_phone)){

      }else{
        Toast({
          position:'center',
          message:'手机号格式不正确',
          duration:'1000'
        })
      }
    },
    reset_phone:function(){
      var vm = this
      var phone_reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/
      if(phone_reg.test(vm.new_phone)){
          vm.$http.post('/traditionalChineseMedicine/information/checkoutMessage',{
          phoneNumber:vm.new_phone,
          code:vm.code
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          if(res.body.errcode){
            Toast({
              position:'center',
              message:"验证码错误",
              duration:'1000'
            })
          }else{
            var localstorage=window.localStorage
            localstorage.setItem('medicine_phone',vm.new_phone)
            var id = JSON.parse(localstorage.getItem('medicine')).id
            var form = new FormData(vm.$refs.reset_phone_page)
            form.append('id',id)
            form.append('pic',null)
            form.append('phoneNumber',vm.new_phone)
            vm.$http.post('/traditionalChineseMedicine/doctor/updateDoctor',form,{emulateJSON:true}).then(function(res){
              console.log(res)
            },function(e){
              
            })
            setTimeout(function(){
              vm.$router.push('/clientmsg')
            },1000)
          }
        },function(e){
          console.log(e)
        })
      }else{
        Toast({
          position:'center',
          message:'手机号格式不争取',
          duration:'1000'
        })
      }
      
    }
  },
   components: { 
   
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.resetphone
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .resetphone-header
    position fixed
    top 0
    width 100%
    height 1.173333rem
    background-color #607d8b
    color #fff
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
    span 
      position absolute
      right 0.266667rem
      top 0
      height 100%
      line-height 1.173333rem

  .top
    width 100%
    height 1.173333rem
  .resetphone-content
    width 100%
    height 80%
    background #f5f5f5
    div
      width 100%
      height 1.2rem
      background #fff 
      margin 0.2667rem 0
      input
        width 9.466667rem
        height 100%
        margin-left 0.266667rem
        border none
        outline none
    div.getNode
      width 100%
      height 1.2rem
      background #fff 
      margin 0.2667rem 0
      input
        width 7.066667rem
        height 100%
      button
        display inline-block
        border none
        background-color #fff
        color #64808e
        outline none
        text-align center
    span
      display block
      width 4.26667rem
      height 0.88rem
      margin-left 2.87778rem
      border-radius 0.88rem
      background #64808e
      color #fff
      text-align center
      line-height 0.88rem
      margin-top 2.666667rem
.footer	
  z-index -100
</style>

