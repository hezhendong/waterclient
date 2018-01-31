
<template>
  <div class="paySuccess">
    <div class="paySuccess-header">
      <i class="back icon">&#xe737;</i>
      <p>支付成功</p>
    </div>
    <div class="top">
      
    </div>
    <div class="paySuccess-content">
      <img src="./pay.png">
      <p>您的订单已提交！</p>
      <p>刻在我的订单中查看订单信息！</p>
      <div class="btn-success">完成</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'paySuccess',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      paySuccess:"妇产科",
      attention:true,
      isSelected:true
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))

  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    changeText:function(){
    	this.attention=!this.attention

    }
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.paySuccess
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .paySuccess-header
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
  .top
    width 100%
    height 1.173333rem
  .paySuccess-content
    width 100%
    height 13rem
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding 0 0.266667rem
    display flex
    flex-direction column
    justify-content center
    align-items center
    img
      width 2.08rem
      height 2.08rem
      margin-bottom 1.2rem
    div.btn-success
      width 4.266667rem
      height 0.88rem
      text-align center
      line-height 0.88rem
      background #607d8b
      color #fff
      border-radius 0.88rem
      margin-top 1.333333rem
.footer
  z-index -10
</style>
