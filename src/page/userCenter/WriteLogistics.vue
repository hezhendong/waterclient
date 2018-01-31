<template>
  <div class="logistics">
    <div class="logistics-header">
      <i class="back icon">&#xe737;</i>
      <p>售后详情</p>
    </div>
    <div class="top">
      
    </div>
    <div class="logistics-content">
      <ul>
        <li>
          <em>*</em>
          <span>退款编号</span>
          <input type="text" placeholder="请输入退款编号" name="">
        </li>
        <li>
          <em>*</em>
          <span>物流公司</span>
          <input type="text" placeholder="请输入快递公司名称" name="">
        </li>
        <li>
          <em>*</em>
          <span>物流单号</span>
          <input type="text" placeholder="请输入快递单号" name="">
        </li>
      </ul>
      <div class="btn-logistics">确认提交</div>
     </div>
    <div style="width:100%;height:2.506667rem"></div>
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
    
    
  },
  methods : {
  },
   components: { 
   
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.logistics
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .logistics-header
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
  .logistics-content
    width 100%
    height auto
    overflow hidden
    overflow-y auto
    background #fff
    border-top 1px solid #fff
    box-sizing border-box
    padding 0 0.266667rem
    ul
      width 100%
      height auto
      li
        width 100%
        height 1.33333rem
        display flex
        align-items center
        em
          color red
          
        span
          font-size 18px
          margin-left 0.2666rem
        input
          outline none
          border none
          height 100%
          margin-left 0.2666rem
  .btn-logistics
    width 4.266667rem
    height 0.88rem
    text-align center
    line-height 0.88rem
    border-radius 0.88rem
    color #fff
    background #607d8b
    margin 0 auto
    margin-top 2rem

.footer	
  z-index -100
</style>

