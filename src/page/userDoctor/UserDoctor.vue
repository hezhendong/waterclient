<template>
  <div class="userDoctor">
    <div class="userDoctor-header">
      <p>我的医生</p>
    </div>
    <div class="top">
      
    </div>
    <div class="userDoctor-content">
      <div class="userDoctor-msg">
        <div class="userDoctor-link">
          <router-link to="/userdoctor/mydoctor">我的医生</router-link>
          <router-link to="/userdoctor/myattention">我的关注</router-link>
        </div>
        <div class="userDoctor-router">
          <router-view></router-view>
        </div>
      </div>
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
    
    this.doctor_footer_show()
  },
  methods : {
    doctor_footer_show:function() {
      document.getElementById('footer').style.zIndex="10000"
    }
  },
   components: { 
   
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.userDoctor
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .userDoctor-header
    position fixed
    top 0
    width 100%
    height 1.173333rem
    background-color #607d8b
    color #fff
    z-index 1000000
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
  .userDoctor-content
    width 100%
    height 100%
    overflow hidden
    overflow-y auto
    -webkit-overflow-scrolling touch
    background #f5f5f5
    .userDoctor-msg
      box-sizing border-box
      width 100%
      height auto
      padding 0 0.266667rem
      background #fff
      .userDoctor-link
        display flex
        justify-content space-around
        width 100%
        height 1.066667rem
        border-bottom 5px solid #f5f5f5
        a
          width 2.4rem
          text-align center
          line-height 1.066667rem
          color #000
          font-weight bold
          text-decoration none
        a.router-link-active
          border-bottom 2px solid #6e8895
          color #6e8895
</style>

      