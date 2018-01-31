<template>
  <div class="return-money">
    <div class="return-money-header">
      <i class="back icon" @click="back">&#xe737;</i>
      <p>退款</p>
    </div>
    <div class="top">
      
    </div>
    <div class="return-money-content">
      <div class="type_retrun">
        <i>退款类型</i>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :change="state_value(item.value)">
          </el-option>
        </el-select>
      </div>
      <div class="return-money">
        <i>*</i>
        <span>退款金额</span>
        <i>￥{{type_money}}</i>
      </div>
      <div class="reason">
        <i>*</i>
        <span>退款原因</span>
        
        <textarea v-model="return_reason" placeholder="请详细描述退款的原因">
          
        </textarea>
      </div>
      <div class="btn-return" @click='check_return'>确认提交</div>
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
         return_reason:"",
         type_return:"",
         type_money:"",
         options: [{
          value: '1',
          label: '仅退款'
          }, {
            value: '2',
            label: '退货退款'
          }],
          value: '1'
       }
    
     },
  mounted(){
    // console.log(this.value)
    this.return_footer_hide()
    console.log(this.$route.params.id,this.$route.params.price)
    this.type_money = this.$route.query.price
  },
  methods : {
    state_value:function(){
      console.log(this.value)
      this.type_return = this.value
    },
    return_footer_hide:function(){
      console.log("pp")
      document.getElementById('footer').style.zIndex='-10000'
    },
    gain_state:function(){
      console.log(this.type_return)
    },
    check_return:function(){
      console.log(this.type_return)
      var localstorage = window.localStorage
      var userId = JSON.parse(localstorage.getItem('medicine')).id
      var vm = this
      this.$http.post('/traditionalChineseMedicine/patientOrder/applyAfterSale',{
        'userinfo.id':userId,
        'patientOrder.id':vm.$route.query.id,
        'refundType':vm.type_return,
        'refundMoney':vm.$route.query.price,
        'refundReason':vm.return_reason
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        Toast({
          message: '申请成功',
          position: 'center',
          duration: 1000
        });
        setTimeout(function(){
          vm.$router.push('/order?id=4')
        },1000)
      },function(e){
        console.log(e)
      })
    },
    back:function(){
      this.$router.go(-1)
    }
  },
   components: { 
   
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.return-money
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .return-money-header
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
  .return-money-content
    width 100%
    height 80%
    overflow hidden
    overflow-y auto
    background #fff
    border-top 1px solid #fff
    box-sizing border-box
    div
      width 100%
      height auto;
      box-sizing border-box
      padding 0 0.266667rem
    div.type_retrun
      width 100%
      height 1.466667rem
      border-bottom 5px solid #f5f5f5
      line-height 1.466667rem
      i
        margin-right 0.266667rem
        float left
      div.el-select
        width 6rem
        height 0.5rem
        float left
    div.return-money
      i
        line-height 1.33333rem
        color red
        margin-right 0.266667rem
    div.reason
      i
        float left
        color red
        line-height 1.333333rem
        margin-right 0.266667rem
      span
        float left
        line-height 1.333333rem
      textarea
        width 70%
        height 6.373333rem
        border none
        margin-left 0.8rem
        margin-top 0.4rem
        outline none
    div.btn-return
      width 4.266667rem
      height 0.88rem
      background #607d8b
      line-height 0.88rem
      text-align center
      border-radius 0.88rem
      color #fff
      margin 0 auto
      margin-top  1.333333rem

.footer	
  z-index -100
</style>

