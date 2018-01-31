<template>
  <div class="pass-sell">
    <div class="pass-sell-header">
      <i class="back icon">&#xe737;</i>
      <p>售后详情</p>
    </div>
    <div class="top">
      
    </div>
    <div class="pass-sell-content">
     <p>订单编号：09023912039123</p>
      <p >退款状态： <i style="color :red">审核通过</i></p>
      <p class="hint" style="color:#607d8b;font-size:14px">审核通过后请填退货物流信息，商家收到货确认无误后退款</p>
      <div class="shop-address">
        <p>商家地址：XXXXXXXXXXXX</p>
        <p>联系人：XXXXXXXXXXXX</p>
        <p>商家联系方式：XXXXXXXXXXXX</p>
      </div>
      <div class="medicion-detail">
        <p class="recipe-top">
          <i>2017-10-10</i>
         </p>
         <div class="recipe-msg">
           <span class="msg">
              <b>黄芩&nbsp;&nbsp;10克</b>
              <b>黄芩&nbsp;&nbsp;10克</b>
              <b>黄芩&nbsp;&nbsp;10克</b>
              <b>黄芩&nbsp;&nbsp;10克</b>
              <b>黄芩&nbsp;&nbsp;10克</b>
              <b>黄芩&nbsp;&nbsp;10克</b>
           </span>
           <span class="price">
             <b>￥200.00</b>
             <b>X1</b>
           </span>
         </div>
         <p class="recipe-bottom">
           <span>总计：￥200.00</span>
         </p>
      </div>
    </div>
    <div class="afert">
      <p>退款金额 <em style="color:red">$200.00</em> </p>
      <p>退款原因 <span>不想买，老板太热情了，让我很尴尬</span>  </p>
    </div>
    <div class="btn-reason">填写物流信息</div>
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
.pass-sell
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .pass-sell-header
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
  .pass-sell-content
    width 100%
    height auto
    overflow hidden
    overflow-y auto
    background #f5f5f5
    border-top 1px solid #fff
    box-sizing border-box
    padding 0 0.266667rem
  p
    line-height 0.8rem
  div.operation
    width 100%
    height 1.33333rem
    display flex
    justify-content center
    align-items center
    span
      width 5.333333rem
      height 0.666667rem
      border-radius 5px
      background #607d8b
      color #fff
      text-align center
      line-height 0.666667rem
  .medicion-detail
    width 100%
    height auto
    border-top 4px solid #f5f5f5
    p.recipe-top
        width 100%
        height 0.8rem
        line-height 0.8rem
        font-size 14px
        i
          float left
        em
          float right 
          color #faa315
      div.recipe-msg
        width 100%
        height auto
        overflow hidden
        span.msg
          width 60%
          height auto 
          float left
          b
            margin-right 0.4rem
            font-size 16px
        span.price
          width 1.653333rem
          
          float right 
          display flex
          flex-direction column
          align-items center
          justify-content center
          b
            font-size 16px
      p.recipe-bottom
        width 100%
        height 0.933333rem
        font-size 18px
        span
          float left
          line-height 0.933333rem
        em
          width 2.0rem
          height 0.673333rem
          border-radius 5px
          font-size 14px
          float right
          text-align center
          line-height 0.673333rem
          margin-left 5px
        em.see
          background #68b6dc
          color #fff
        em.check
          background #607d8b
          color #fff
  .afert
    width 100%
    height 3rem
    border-top 5px solid #f5f5f5
    box-sizing border-box
    padding 0 0.266667rem
    font-size 16px
    p
      line-height 0.8rem
      span
        color #c2c2c2
  .btn-reason
    width 5.333333rem
    height 0.88rem
    background #607d8b
    color #fff
    text-align center
    line-height 0.88rem
    margin 0 auto
    margin-top 2.666667rem
    border-radius 0.88rem

.footer	
  z-index -100
</style>

