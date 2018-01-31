<template>
  <div class="load-send">
    <div class="load-send-header">
      <i class="back icon" @click="sell_back">&#xe737;</i>
      <p>售后详情</p>
    </div>
    <div class="top">
      
    </div>
    <div class="load-send-content">
     <p>订单编号：09023912039123</p>
      <p >退款状态： <i style="color :red">{{state}}</i></p>
      <p style="color:red;font-size:18px" v-if='!can_repeal'>{{state_detail}}！</p>
      <span class="repeal" v-if='can_repeal' @click='repeal_order'>撤销申请</span>
      <div class="user-address">
        <h5><i>{{realName}}</i><span>{{phoneNumber}}</span></h5>
        <p>{{province}}{{city}}{{dis}}{{addressDetail}}</p>
      </div>
      <div class="medicion-detail">
        <p class="recipe-top">
          <i>{{timer}}</i>
         </p>
         <div class="recipe-msg">
           <span class="msg">
              <b v-for='medicine in medicine_list'>{{medicine.medicineName}}&nbsp;&nbsp;{{medicine.price}}克</b>
           </span>
           <span class="price">
             <b>￥{{price}}</b>
             <b>X{{count}}</b>
           </span>
         </div>
         <p class="recipe-bottom">
           <span>总计：￥{{price}}</span>
         </p>
      </div>
    </div>
    <div class="afert">
      <p>退款金额 <em style="color:red">￥{{price}}</em> </p>
      <p>退款原因 <span>{{reseaon}}</span>  </p>
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
         realName:'',
         phoneNumber:'',
         province:'',
         city:'',
         dis:'',
         addressDetail:'',
         price:'',
         state:'',
         reseaon:'',
         orderNumber:'',
         count:'',
         medicine_list:[],
         state_detail:'',
         timer:'',
         can_repeal:true
       }
    
     },
  mounted(){
    this.query_afert_sell()
    
  },
  methods : {
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
    query_afert_sell:function(){
      var vm = this
      this.$http.post('/traditionalChineseMedicine/patientOrder/queryAfterSaleByOrderId',{
        id:vm.$route.query.id
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        vm.realName = res.body.data.patientOrder.realName
        vm.phoneNumber = res.body.data.patientOrder.phoneNumber
        vm.province = res.body.data.patientOrder.province
        vm.city = res.body.data.patientOrder.city
        vm.dis = res.body.data.patientOrder.district
        vm.detailedAddress = res.body.data.patientOrder.detailedAddress
        vm.price = res.body.data.patientOrder.totalPrice
        vm.reseaon = res.body.data.refundReason
        if(res.body.data.auditType=='0'){
          vm.state='审核中！'
          vm.state_detail='审核中请耐心等待'
          vm.can_repeal = true

        }else if(res.body.data.auditType=='1'){
          vm.state='申请已通过'
          vm.state_detail=res.body.data.totalPrice+'元已路返回，请注意查收'
          vm.can_repeal = false
        }else if(res.body.data.auditType=='2'){
          vm.state='申请已拒绝'
          vm.state_detail='您的申请可能不符合条件'
          vm.can_repeal = false
        }else if(res.body.data.auditType=='3'){
          vm.state='申请已撤销'
          vm.state_detail='您已撤销售后申请'
          vm.can_repeal = false
        }
        if(res.body.data.patientOrder.prescriptionSelf){
          vm.count = res.body.data.patientOrder.prescriptionSelf.count
        }else{
          vm.count = res.body.data.patientOrder.userinfoPrescription.count
        }
        
        vm.orderNumber = res.body.data.patientOrder.orderNumber
        vm.timer = vm.dateShell(res.body.data.creationTime)
        
        
        if(res.body.data.patientOrder.prescriptionSelf&&res.body.data.patientOrder.prescriptionSelf.list.length>0){
          vm.medicine_list = res.body.data.patientOrder.prescriptionSelf.list
        }else{
          vm.medicine_list = res.body.data.patientOrder.userinfoPrescription.list
        }
      })
    },
    sell_back:function(){
      this.$router.push('/order?id=4')
    },
    repeal_order:function(){
      var vm = this
      vm.$http.post('/traditionalChineseMedicine/patientOrder/auditAfterSale',{
        patientOrderId:vm.$route.query.id,
        auditType:'3'
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        Toast({
          position:'center',
          message:'撤销成功',
          duration:'1000'
        })
        setTimeout(function(){
          vm.query_afert_sell()
        },1000)
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
.load-send
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .load-send-header
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
  .load-send-content
    width 100%
    height auto
    overflow hidden
    overflow-y auto
    background #f5f5f5
    border-top 1px solid #fff
    box-sizing border-box
    padding 0 0.266667rem
    .repeal
      width 4.266667rem
      height 0.533333rem
      border-radius 7px
      background #607d8b
      color #fff
      text-align center
      line-height 0.533333rem
      margin-left 2.5rem
  .user-address
    h5
      span
        display inline-block
        margin-left 0.266667rem
    

  p
    line-height 0.8rem
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

.footer	
  z-index -100
</style>

