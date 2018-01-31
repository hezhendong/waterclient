<template>
  <div class="options">
    <div class="options-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>意见反馈</p>
    </div>
    <div class="top">
      
    </div>
    <div class="options-content">
      <textarea placeholder="请输入您宝贵的意见" v-model='feek'>
        
      </textarea>
      <div class="btn-option" @click='submit_feek'>提交</div>
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
         feek:''
       }
    
     },
  mounted(){
    this.opinion_footer_hide()
    
  },
  methods : {
    back:function(){
      this.$router.go(-1)
    },
    opinion_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-100000'
    },
    submit_feek:function(){
      var vm = this
      let localstorage = window.localStorage
      var userId = JSON.parse(localstorage.getItem('medicine')).id
      if(vm.feek){
        this.$http.post('/traditionalChineseMedicine/information/saveFeedBack',{
          message:vm.feek,
          userId:userId,
          type:'0'
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          Toast({
            position:'center',
            message:"感谢您的反馈",
            duration:'1000'
          })
          vm.feek=''
          setTimeout(function(){
            vm.$router.push('/usercenter')
          },1000)
        },function(e){
          console.log(e)
        })
      }else{
        Toast({
            position:'center',
            message:"请填写反馈意见",
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
.options
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .options-header
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
  .options-content
    width 100%
    height 80%
    overflow hidden
    overflow-y auto
    background #f5f5f5
    border-top 1px solid #fff
    box-sizing border-box
    padding 0 0.266667rem
    textarea
      width 100%
      height 6rem
      outline none
    div.btn-option
      width 4.266667rem
      height 0.88rem
      color #fff
      background #607d8b
      text-align center
      line-height 0.88rem
      border-radius 0.88rem
      margin 0 auto
      margin-top 2rem


.footer	
  z-index -100
</style>

