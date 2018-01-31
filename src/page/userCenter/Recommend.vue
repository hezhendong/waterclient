<template>
  <div class="recommend" style="background:#f5f5f5">
    <div class="recommend-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>推荐我们</p>
    </div>
    <div class="top">
      
    </div>
    <div class="recommend-content">
      <h4>您的邀请码是</h4>
      <div>
        3026
      </div>
      <p>医生通过您的邀请码下载注册并成功入驻为本平台医生，您将获得丰厚的奖励</p>
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
    this.recommend_footer_hide()
    
  },
  methods : {
    back:function(){
      this.$router.go(-1)
    },
    recommend_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-100000'
    }
  },
   components: { 
   
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.recommend
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .recommend-header
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
  .recommend-content
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
    align-items center
    h4
      line-height 2.666667rem
      font-size 22px
    div 
      width 4.266667rem
      height 2.666667rem
      border 1px solid #607d8b
      color #607d8b
      text-align center
      line-height 2.666667rem
      font-size 18px
    p
      width 4rem
      margin-top 1.7rem


.footer	
  z-index -100
</style>

