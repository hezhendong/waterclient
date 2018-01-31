<template>
  <div class="order">
    <div class="order-header">
      <i class="back icon" @click="order_back">&#xe737;</i>
      <p>订单列表</p>
    </div>
    <div class="top">
      
    </div>
    <div class="order-content">
      <div class="order-link">
        <span v-for="(i,index) in header_message">
          <a @click="to_order(index)" :class="{'link':index==flag||index==init_number}">{{i.name}}</a>
        </span>
      </div>
      <div class="order-box">
        <ul>
         
            <router-link v-for='doctor in arr' :to="{path:doctor._path,query: {id:doctor.id}}">
              <p class="recipe-top">
              <i>{{doctor.timer}}</i>
              <em>{{doctor.state}}{{doctor.auditType?doctor.auditType:''}}</em>
             </p>
             <div class="recipe-msg">
               <span class="msg">
                  <b v-for='i in doctor.list'>{{i.medicineName}}&nbsp;&nbsp;{{i.count}}克</b>
                  
               </span>
               <span class="price">
                 <b>￥{{doctor.totalPrice}}</b>
                 <b>X{{doctor.count}}</b>
               </span>
             </div>
             <p class="recipe-bottom">
               <span>总计：￥{{doctor.totalPrice}}</span>
               <em class="check" v-if="my_check" @click="check_receive(doctor.id)">
                 确认收货
               </em>
               <em class="see" v-if="my_see" @click="see_logist(doctor.id)">
                 查看物流
               </em>
                <em class="return" v-if="my_return">
                  <router-link :to="{path:'/returnmoney',query: {'id':doctor.id,price:doctor.totalPrice}}">
                    退款
                  </router-link>
               </em>
             </p>
            </router-link>
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
import { MessageBox } from 'mint-ui';
 export default {
     data() {
       return {
          isSelected:true,
          flag:'====',
          header_message:[
          {"name":"待发货","value":"1"},
          {"name":"待收货","value":"2"},
          {"name":"已完成","value":"3"},
          {"name":"售后","value":"4"}
          ],
          init_number:'',
          arr:[],
          my_see:false,
          my_check:false,
          my_return:false,
       }
    
     },
  mounted(){
    this.query_order_list()
    this.init_number = this.$route.query.id-1
    console.log(this.init_number,this.flag)
    this.order_footer_hide()
  },
  methods : {
      order_way:function (state){
        this.isSelected=!this.isSelected
      },
      order_back:function(){
        this.$router.push('/usercenter')
      },
      order_footer_hide:function(){
        document.getElementById('footer').style.zIndex='-100000'
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
      to_order:function(index){
        console.log(index)
        // this.flag=!this.flag
        if(index!==3){
          this.flag = index
          this.init_number='!0'
          var vm = this
          var state = this.flag+1
          vm.arr=[]
          var localstorage=window.localStorage
          var userinfoId = JSON.parse(localstorage.getItem('medicine')).id
          this.$http.post('/traditionalChineseMedicine/patientOrder/queryPatientOrder',{
            userinfoId:userinfoId,
            state:state,
            currentPage:'1',
            pageSize:'1000'
          },{emulateJSON:true}).then(function(res){
            console.log(res,';;;;;;;;;;;;;;;;;;')
            for(var i=0;i<res.body.data.data.length;i++){
              var obj={}
              obj.timer = vm.dateShell(res.body.data.data[i].userinfo.creationTime)
               
              if(state==1){
                obj.state ='待发货'
                vm.my_see=false
                vm.my_check=false
                vm.my_return=false
                obj._path = '/order/loadsenddetail'
              }else if(state==2){
                obj.state ='待收货'
                vm.my_see=true
                vm.my_check=true
                 vm.my_return=false
                 obj._path = '/order/loadacceptdetail'
              }else if(state==3){
                obj.state ='已完成'
                vm.my_see=false
                vm.my_check=false
                vm.my_return=true
                obj._path = '/order/successorder'
              }else if(state==4){
                obj.state ='售后'
                vm.my_see=false
                vm.my_check=false
                vm.my_return=false
                obj._path = '/order/afertselldetail'
              }
              if(obj.list = res.body.data.data[i].userinfoPrescription){
                obj.list = res.body.data.data[i].userinfoPrescription.list
                obj.count = res.body.data.data[i].userinfoPrescription.count
              }else{
                obj.list = res.body.data.data[i].prescriptionSelf.list
                obj.count = res.body.data.data[i].prescriptionSelf.count
              }
              obj.totalPrice = res.body.data.data[i].totalPrice
              obj.id = res.body.data.data[i].id
              vm.arr.push(obj)
            }
            console.log(vm.arr,'|||||||||||||')
          },function(e){
            console.log(e)
          })
        }else{
          var vm = this
          vm.my_see=false
          vm.my_check=false
          vm.my_return=false
          vm.arr=[]
          var localstorage=window.localStorage
          vm.flag = 3
          vm.init_number = 3
          var userinfoId = JSON.parse(localstorage.getItem('medicine')).id
          this.$http.post('/traditionalChineseMedicine/patientOrder/queryAfterSale',{
            id:userinfoId
          },{emulateJSON:true}).then(function(res){
            console.log(res)
            for(var i=0;i<res.body.data.data.length;i++){
              var obj={}
              obj.timer = vm.dateShell(res.body.data.data[i].creationTime)
              obj._path = '/order/afertselldetail'
              if(obj.list = res.body.data.data[i].patientOrder.userinfoPrescription){
                obj.list = res.body.data.data[i].patientOrder.userinfoPrescription.list
                obj.count = res.body.data.data[i].patientOrder.userinfoPrescription.count
              }else{
                obj.list = res.body.data.data[i].patientOrder.prescriptionSelf.list
                obj.count = res.body.data.data[i].patientOrder.prescriptionSelf.count
              }
              obj.totalPrice = res.body.data.data[i].patientOrder.totalPrice
              obj.id = res.body.data.data[i].patientOrder.id
              vm.arr.push(obj)
            }
          },function(e){
            console.log(e)
          })
        }
        
      },
      query_order_list:function(){
        var vm = this
        vm.arr=[]
        var localstorage=window.localStorage
        var userinfoId = JSON.parse(localstorage.getItem('medicine')).id
        console.log(vm.$route.query.id,'0000')
        if(vm.$route.query.id!=='4'){
          this.$http.post('/traditionalChineseMedicine/patientOrder/queryPatientOrder',{
          userinfoId:userinfoId,
          state:vm.$route.query.id,
          currentPage:'1',
          pageSize:'1000'
        },{emulateJSON:true}).then(function(res){
            console.log(res)
            for(var i=0;i<res.body.data.data.length;i++){
              var obj={}
              obj.timer = vm.dateShell(res.body.data.data[i].userinfo.creationTime)
               
              if(vm.$route.query.id==1){
                obj.state ='待发货'
                vm.my_see=false
                vm.my_check=false
                vm.my_return=false
                obj._path = '/order/loadsenddetail'
              }else if(vm.$route.query.id==2){
                obj.state ='待收货'
                vm.my_see=true
                vm.my_check=true
                 vm.my_return=false
                 obj._path = '/order/loadacceptdetail'
              }else if(vm.$route.query.id==3){
                obj.state ='已完成'
                vm.my_see=false
                vm.my_check=false
                vm.my_return=true
                obj._path = '/order/successorder'
              }else if(vm.$route.query.id==4){
                obj.state ='售后'
                vm.my_see=false
                vm.my_check=false
                vm.my_return=false
                obj._path = '/order/afertselldetail'
              }
              if(obj.list = res.body.data.data[i].userinfoPrescription){
                obj.list = res.body.data.data[i].userinfoPrescription.list
                obj.count = res.body.data.data[i].userinfoPrescription.count
              }else{
                obj.list = res.body.data.data[i].prescriptionSelf.list
                obj.count = res.body.data.data[i].prescriptionSelf.count
              }
              
              obj.totalPrice = res.body.data.data[i].totalPrice
              obj.id = res.body.data.data[i].id
              vm.arr.push(obj)

              console.log(vm.arr,"pppppppppppppppppp")
            }
          },function(e){
            console.log(e)
          })
        }else{
          vm.$http.post('/traditionalChineseMedicine/patientOrder/queryAfterSale',{
            userinfoId:userinfoId
          },{emulateJSON:true}).then(function(res){
            console.log(res)
            for(var i=0;i<res.body.data.data.length;i++){
              var obj = {}
              obj.timer = vm.dateShell(res.body.data.data[i].userinfo.creationTime)
              if(res.body.data.data[i].refundType==1){
                obj.state ='仅退款'
                vm.my_see=false
                vm.my_check=false
                vm.my_return=false
                obj._path = '/order/afertselldetail'
              }else if(res.body.data.data[i].refundType==2){
                obj.state ='退货退款'
                vm.my_see=false
                vm.my_check=false
                vm.my_return=false
                obj._path = '/order/afertselldetail'
              }
              if(res.body.data.data[i].auditType==0){
                obj.auditType = '审核中'
              }else if(res.body.data.data[i].auditType==1){
                obj.auditType = '已同意'
              }else if(res.body.data.data[i].auditType==2){
                obj.auditType = '已拒绝'
              }else if(res.body.data.data[i].auditType==3){
                obj.auditType = '已撤销'
              }
              if(obj.list = res.body.data.data[i].patientOrder.userinfoPrescription){
                obj.list = res.body.data.data[i].patientOrder.userinfoPrescription.list
                obj.count = res.body.data.data[i].patientOrder.userinfoPrescription.count
              }else{
                obj.list = res.body.data.data[i].patientOrder.prescriptionSelf.list
                obj.count = res.body.data.data[i].patientOrder.prescriptionSelf.count
              }
              
              obj.totalPrice = res.body.data.data[i].patientOrder.totalPrice
              obj.id = res.body.data.data[i].patientOrder.id
              vm.arr.push(obj)
              console.log(vm.arr)
            }
          },function(e){
            console.log(e)
          })
        }
          
      },
      check_receive:function(id){

      },
      see_logist:function(id){

      }
  },
   components: { 

  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.order
  width 100%
  height 100%
  
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .order-header
    position fixed
    top 0
    width 100%
    height 1.173333rem
    background-color #607d8b
    color #fff
    z-index 100000000
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
  .order-content
    width 100%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding:0 0.266667rem
    .order-link
      width 100%
      height 1.066667rem
      span
        display flex
        width 25%
        height 100%
        justify-content center
        float left
        a
          display inline-block
          width 1.446667rem
          height 100%
          text-align center
          line-height 1.066667rem
          text-decoration none
          box-sizing border-box
          color #000
        a.link
          color #607d8b
          border-bottom 1px solid #607d8b
    .order-box
      width 100%
      height auto
      ul
        width 100%
        height auto
        a
          display inline-block
          width 100%
          height auto
          overflow hidden
          color #000
          border-top 0.266667rem solid #f5f5f5
          overflow hidden
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
            em.return
              background #607d8b
              color #fff
              a
                color #fff
                border none

.footer
  z-index -10
</style>

      