<template>
  <div class="address-box">
    <div class="address-box-header">
      <i class="back icon">&#xe737;</i>
      <p>修改收货地址</p>
    </div>
    <div class="top">
      
    </div>
    <div class="address-box-content">
      <div>
        <span>收货人姓名</span>
        <input type="text" placeholder="请输入收货人姓名" name="">
      </div>
       <div>
        <span>收货人姓名</span>
        <input type="text" placeholder="请输入收货人姓名" name="">
      </div>
      <p>收货地址</p><br/>
      <div class="address-dist">
        <v-distpicker></v-distpicker>
      </div>
      <textarea placeholder="请填写详细地址">
        
      </textarea>
      <div class="btn-address-box">
        保存
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
import VDistpicker from 'v-distpicker'
 export default {
     data() {
       return {
          "province": "",
          "city": "",
          "area": ""
       }
    
     },
  mounted(){
    
    
  },
  methods : {
    onSelected(data) {
        // this.address-box = data.province.value+","+data.city.value+","+data.area.value
        console.log(data)
      },
  },
   components: { 
    VDistpicker 
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.address-box
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .address-box-header
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
  .address-box-content
    width 100%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding:0 0.266667rem
    div
      width 100%
      height 1.413333rem
      display flex
      align-items center
      input
        border none
        margin-left 0.26667rem
        outline none
    div.address-dist
      width 100%
      height 0.8rem
      .address
          width 100%
          height 0.8rem
          select
            width 2.666667rem
            padding 0
            margin 0
            line-height 0
            font-size 14px
            border-radius 0
            height 0.8rem
            margin-right 0.213333rem
            margin-bottom 0.4rem
    textarea
      width 100%
      height 1.866667rem
      outline none
    div.btn-address-box
      width 4.266667rem
      height 0.88rem
      line-height 0.88rem
      color #fff
      background #607d8b
      border-radius 0.88rem
      text-align center
      display block
      margin 0 auto
      margin-top 1.333333rem

.footer
  z-index -10
</style>

      