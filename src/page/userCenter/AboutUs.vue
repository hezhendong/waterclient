<template>
  <div class="about-us">
    <div class="about-us-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>关于我们</p>
    </div>
    <div class="top">
      
    </div>
    <div class="about-us-content">
      <img src="../../assets/header.jpg">
      <p style="font-size:24px">中医药app</p>
      <p style="margin-bottom:0.8rem;color:#c2c2c2">v1.0</p>
      <p style="font-weight:bold">中医药，中医药</p>
      <p style="font-weight:bold">客服电话：400-800-5678</p>
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
         
       }
    
     },
  mounted(){
    
    this.about_us_footer_hide()
  },
  methods : {
    back:function(){
      this.$router.go(-1)
    },
    about_us_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-100000'
    }
  },
   components: { 
   
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.about-us
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .about-us-header
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
  .about-us-content
    width 100%
    height 80%
    overflow hidden
    overflow-y auto
    background #f5f5f5
    border-top 1px solid #fff
    box-sizing border-box
    padding 0 0.266667rem
    display flex
    flex-direction column
    justify-content center
    align-items center
    img
      width 1.866667rem
      height 1.866667rem
      margin-bottom 1.333333rem

.footer	
  z-index -100
</style>

