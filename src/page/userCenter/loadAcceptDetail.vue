<template>
  <div class="accept">
    <div class="accept-header">
      <i class="back icon" @click="accept_back">&#xe737;</i>
      <p>待收货</p>
    </div>
    <div class="top">
      
    </div>
    <div class="accept-content">
      <p>订单编号：{{order_number}}</p>
      <p>订单状态： <i>买家已付款，等待卖家发货</i> </p>
      <div class="operation">
        <span style="background:#68b6dc">查看物流</span>
        <span @click='success_order' style="background:#607d8b">确认收货</span>
      </div>
      <div class="address-img"></div>
      <div class="address">
        <h4>
          <i>{{realName}}</i>
          <em>{{phoneNumber}}</em>
        </h4>
        <h5>{{province}}{{city}}{{dist}}{{detail_address}}</h5>
      </div>
      <div class="address-img">
        
      </div>
      <div class="buy-detail">
        <p class="recipe-top">
          <b>{{createTime}}</b>
          <em>待收货</em>
         </p>
         <div class="recipe-msg">
           <span class="msg">
              <b v-for="list in recipe_list">{{list.medicineName}}&nbsp;&nbsp;{{list.count}}克</b>
           </span>
           <span class="price">
             <b>￥{{totalPrice}}</b>
             <b>X{{amount_count}}</b>
           </span>
         </div>
         <p class="recipe-bottom">
           <span>总计：￥{{totalPrice}}</span>
         </p>
      </div>
      <div class="real-pay">
        <p class="pay">实付金额： <b>￥{{totalPrice}}</b></p>
        <p>下单时间：{{createTime}}</p>
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
          isSelected:true,
          createTime:'',
          totalPrice:'',
          amount_count:'',
          order_number:'',
          province:'',
          city:'',
          dist:'',
          detail_address:'',
          recipe_list:[],
          phoneNumber:'',
          realName:''
       }
    
     },
  mounted(){
    this.success_order_footer_hide()
    this.query_order_by_id()
  },
  methods : {
      accept_back:function(){
          this.$router.push('/order?id=2')
      },
      success_order_footer_hide:function(){
        document.getElementById('footer').style.zIndex='-10000'
      },
      success_order:function(){
        var vm = this
        vm.$http.post('/traditionalChineseMedicine/patientOrder/updatePatientOrderState',{
          patientOrderId:vm.$route.query.id,
          state:'3'
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          Toast({
            position:'center',
            message:'已收货，订单完成',
            duration:'1000'
          })
          setTimeout(function(){
            vm.$router.push('/order?id=3')
          },1000)
        })
      },
      dateShell:function(longTypeDate){  
       var dateTypeDate = "";  
       var date = new Date(longTypeDate);  
       dateTypeDate += date.getFullYear();   //年  
       dateTypeDate += "-" + (date.getMonth()+1); //月   
       dateTypeDate += "-" + date.getDate();  //日  
       // dateTypeDate += ' '
       // dateTypeDate += date.getHours();
       // dateTypeDate += ":"+date.getMinutes();
       // dateTypeDate += ":"+date.getSeconds();
       return dateTypeDate;  
      },
      query_order_by_id:function(){
        var vm = this
        vm.$http.post('/traditionalChineseMedicine/patientOrder/queryByPatientOrderId',{
          patientOrderId:vm.$route.query.id
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          vm.createTime = vm.dateShell(res.body.data.creationTime)
          vm.order_number = res.body.data.orderNumber
          vm.phoneNumber = res.body.data.phoneNumber
          vm.province = res.body.data.province
          vm.city = res.body.data.city
          vm.dist = res.body.data.district
          vm.detail_address = res.body.data.detailedAddress
          vm.place_order_time=res.body.data.detailedAddress
          vm.totalPrice=res.body.data.totalPrice
          if(res.body.data.prescriptionSelf.count){

            vm.amount_count=res.body.data.prescriptionSelf.count
            vm.recipe_list=res.body.data.prescriptionSelf.list
          }else{
            vm.amount_count=res.body.data.userinfoPrescription.count
            vm.recipe_list=res.body.data.userinfoPrescription.list
          }
          
          
          vm.realName=res.body.data.realName
        },function(e){
          console.log(e)
        })
      }
  },
   components: { 

  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.accept
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .accept-header
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
  .accept-content
    width 100%
    height 80%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding:0 0.266667rem
    p
      width 100%
      line-height 1.0266667rem
      i
        color red
    div.operation
      width 100%
      height 1.333333rem
      display flex
      justify-content space-around
      align-items center
      span
        width 2rem
        height 0.586667rem
        border-radius 5px
        text-align center
        line-height 0.586667rem
        color #fff
    div.address-img
      width 100%
      height 1px 
      background url("./address.png") repeat-x
    div.address
      width 100%
      height 2.213333rem
      h4
        line-height 0.933333rem
        font-size 16px
      h5
        font-size 14px
    div.buy-detail
      width 100%
      height auto
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
          height auto 
          float left
          width 4.533333rem
          b
            margin-right 0.4rem
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
    div.real-pay
      width 100%
      height 1.466667rem
      border 5px 0 solid #f5f5f5
      p
        line-height 20px
        display flex
        justify-content flex-end
        font-size 14px
        color #989898
      p.pay
        font-size 18px
        b
          color red
          font-weight normal

.footer
  z-index -10
</style>

      