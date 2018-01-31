<template>
  <div class="payByAddress">
    <div class="payByAddress-header">
      <i class="back icon">&#xe737;</i>
      <p>领药单</p>
    </div>
    <div class="top">
      
    </div>
    <div class="payByAddress-content">
      <div class="select-address">
        <div class="address-left">
         <h4>
           <span>微微微</span>
           <i>17191073719</i>
         </h4>
         <p>浙江省杭州市余杭区南北盛德国际耳洞722</p>
        </div>
        <div class="to-address">
          <i class="icon">&#xe688;</i>
        </div>
      </div>
      <div class="address-img"></div>
      <div class="medicion-detail">
        <p>2017-10-10</p>
        <div class="medicion-box">
          <div class="medicion">
            <i>黄芩&nbsp;&nbsp;10克</i>
            <i>黄芩&nbsp;&nbsp;10克</i>
            <i>黄芩&nbsp;&nbsp;10克</i>
            <i>黄芩&nbsp;&nbsp;10克</i>
          </div>
          <div class="price">
            <p>￥200.00</p>
            <p>X1</p>
          </div>
        </div>
        <div class="account-money">
            总计：￥200.00
        </div>
      </div>
      <div class="payByAddress-way">
        <p>支付方式</p>
        <ul>
          <li @click="payByAddress_way">
            <img src="./zhi.png" class="header-payByAddress-img">
            <i>支付宝支付</i>
            <img src="./select.png" v-if="isSelected" class="ispayByAddress">
            <img src="./no-select.png" v-if="!isSelected" class="ispayByAddress">
          </li>
           <li @click="payByAddress_way">
            <img src="./wei.png" class="header-payByAddress-img">
            <i>支付宝支付</i>
            <img src="./no-select.png" v-if="isSelected" class="ispayByAddress">
            <img src="./select.png" v-if="!isSelected"  class="ispayByAddress">
          </li>
        </ul>
      </div>
    </div>
    <div style="width:100%;height:6.2rem;background:#f5f5f5"></div>
    <div class="btn-payByAddress-box">
        <span>药费合计： <em> ￥200.00</em></span>
        <i @click="payByAddress_money">付款</i>
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
          isSelected:true,
       }
    
     },
  mounted(){
    
  },
  methods : {
      payByAddress_way:function (state){
        this.isSelected=!this.isSelected
      },
      payByAddress_money:function (){
        
      }
  },
   components: { 

  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.payByAddress
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .payByAddress-header
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
  .payByAddress-content
    width 100%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding:0 0.266667rem
    .select-address
      width 100%
      height 2.266667rem
      display flex
      justify-content center
      align-items center
      div.address-left
        width 9.2rem
        height auto
        line-height 1.12rem
        span
          font-size 16px
        i
          margin-left 0.533333rem
        p
          width 6.4rem
          line-height 0.426667rem
    div.address-img
      width 100%
      height 3px
      background url('./address.png') repeat-x
    .medicion-detail
      width 100%
      height auto
      overflow hidden
      p
        line-height 1.333333rem
      div.medicion
        width 50%
        height auto
        overflow hidden
        float left
      div.price
        width 50%
        height auto
        float left
        display flex
        flex-direction column
        justify-content flex-end
        align-items flex-end
        p
          line-height 0.533333rem
      div.account-money
        width 100%
        line-height 0.8rem
        font-size 16px
        color red
        display flex
        justify-content flex-end
    .payByAddress-way
      width 100%
      height 3.866667rem
      ul
        width 100%
        height 2.666667rem
        li
          width 100%
          height 1.333333rem
          display flex
          flex-direction row
          align-items center
          justify-content space-between
          img.header-payByAddress-img
            width 0.8rem
            height 0.8rem
          i
            width 7.466667rem
          img.ispayByAddress
            width 0.4rem
            height 0.4rem
  div.btn-payByAddress-box
    width 100%
    height 1.066667rem
    display flex
    align-items center
    justify-content space-between
    span
      margin-left 0.266667rem
      em 
        color red
    i
      width 2.666667rem
      height 100%
      text-align center
      background #607d8b
      line-height 1.066667rem
      color #fff
.footer
  z-index -10
</style>

      