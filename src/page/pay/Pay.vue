<template>
  <div class="pay">
    <div class="pay-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>领药单</p>
    </div>
    <div class="top">
      
    </div>
    <div class="pay-content">
      <div class="select-address">
        <div class="address-left" v-if='has_address' @click='to_address'>
          <i class="icon" >&#xe668;</i><span>请选择收货地址</span>
        </div>
        <div class="to-address" v-if='has_address'>
          <i class="icon">&#xe606;</i>
        </div>
        <div class="address-left" style="display:block" v-if='!has_address' @click='to_address'>
          <h4 style="display:block;float:left;width:100%;text-align:left"><i>{{realName}}</i><span>{{phoneNumber}}</span></h4>
          <p style="display:block;float:left;width:100%;text-align:left">{{province}}{{city}}{{district}}{{detailedAddress}}</p>
        </div>
        <div class="to-address" v-if='!has_address'>
          <i class="icon">&#xe606;</i>
        </div>
      </div>
      <div class="address-img"></div>
      <div class="medicion-detail">
        <p>{{createTime}}</p>
        <div class="medicion-box">
          <div class="medicion">
            <i v-for='recipe in recipe_arr'>{{recipe.medicineName}}&nbsp;&nbsp;{{recipe.count}}克</i>
          </div>
          <div class="price">
            <p>￥{{totalPrice}}</p>
            <p>X{{count}}</p>
          </div>
        </div>
        <div class="account-money">
            总计：￥{{all_price}}
        </div>
      </div>
      <div class="pay-way">
        <p>支付方式</p>
        <ul>
          <li @click="pay_way">
            <img src="./zhi.png" class="header-pay-img">
            <i>支付宝支付</i>
            <img src="./select.png" v-if="isSelected" class="ispay">
            <img src="./no-select.png" v-if="!isSelected" class="ispay">
          </li>
           <li @click="pay_way">
            <img src="./wei.png" class="header-pay-img">
            <i>支付宝支付</i>
            <img src="./no-select.png" v-if="isSelected" class="ispay">
            <img src="./select.png" v-if="!isSelected"  class="ispay">
          </li>
        </ul>
      </div>
    </div>
    <div class="btn-pay-box">
        <span>药费合计： <em> ￥{{all_price}}</em></span>
        <i @click="pay_money">付款</i>
        <!-- <el-button
          type="primary"
          @click="openFullScreen2">
          付款
        </el-button> -->
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
          recipe_arr:[],
          totalPrice:'',
          createTime:'',
          count:'',
          pay_type:'',
          has_address:true,
          province:'',
          city:'',
          district:'',
          detailedAddress:'',
          realName:'',
          phoneNumber:'',
          doctor_Id:'',
          fullscreenLoading: false,
          all_price:''
       }
    
     },
  mounted(){
    this.query_init_address()
    if(this.$route.query.id){
      this.storeOrderId(this.$route.query.id)
    }
    this.query_recipe()
    this.query_selected_address()
    console.log(this.$store.state.data.orderId,'{}{}{}{}{}{')
  },
  methods : {
    ...mapMutations([
        'storeOrderId','storeOrderType'
      ]),
      pay_way:function (state){
        this.isSelected=!this.isSelected
        if(this.isSelected){
          this.pay_type = '0'
        }else{
          this.pay_type = '1'
        }
      },
      
      pay_money:function(){
        
        var vm = this
        var buy_type = ''
        var order_id=''
        console.log(this.$route.query.type)
        if(this.$route.query.type){
          buy_type = this.$route.query.type
          order_id = this.$route.query.id
        }else{
          buy_type = vm.$store.state.data.orderType
          order_id = vm.$store.state.data.orderId
        }
        var loading = weui.loading('loading', {
            className: 'custom-classname'
        });
        if(buy_type==1){
          
          var localstorage = window.localStorage
          var userinfo = JSON.parse(localstorage.getItem('medicine')).id
          vm.totalPrice = String(vm.totalPrice)
          console.log(userinfo,vm.totalPrice,order_id,vm.realName,vm.phoneNumber,vm.province,vm.city,vm.district,vm.detailedAddress)
          
          this.$http.post('/traditionalChineseMedicine/patientOrder/creationPatientOrder',{
            'userinfo.id':userinfo,
            'userinfoPrescription.id':order_id,
            'type':'0',
            'totalPrice':vm.totalPrice,
            'realName':vm.realName,
            'phoneNumber':vm.phoneNumber,
            'province':vm.province,
            'city':vm.city,
            'district':vm.district,
            'detailedAddress':vm.detailedAddress,
          },{emulateJSON:true}).then(function(res){
            console.log(res)
            if(res.errcode){
              Toast({
                message: res.msg,
                position: 'center',
                duration: 1000
              });
            }else{
              console.log(userinfo,vm.doctor_Id,vm.totalPrice,vm.$route.query.id)
              vm.$http.post('/traditionalChineseMedicine/pay/payMoney',{
                userinfoId:userinfo,
                doctorId:vm.doctor_Id,
                userinfoPrescriptionId:order_id,
                payType:vm.pay_type,
                payMoney:vm.totalPrice,
                state:1,
              },{emulateJSON:true}).then(function(res){
                console.log(res)
                // loading.close();
                if(res.body.errcode){
                  Toast({
                    message: res.msg,
                    position: 'center',
                    duration: 1000
                  });
                }else{
                  Toast({
                    message: '支付成功',
                    position: 'center',
                    duration: 1000
                  });
                  setTimeout(function(){
                    vm.$router.push('/order?id=1')
                    loading.hide()
                  },1000)
                  vm.storeOrderId('')
                  vm.storeOrderType('')
                }
                
              },function(e){
                console.log(e)
              })
            }
          },function(e){
            console.log(e)
          })
        }else{
          var vm = this
          var loading = weui.loading('loading', {
            className: 'custom-classname'
        });
          var localstorage = window.localStorage
          var userinfo = JSON.parse(localstorage.getItem('medicine')).id
          vm.totalPrice = String(vm.totalPrice)
          console.log(userinfo,vm.totalPrice,vm.$route.query.id,vm.realName,vm.phoneNumber,vm.province,vm.city,vm.district,vm.detailedAddress)
          
          this.$http.post('/traditionalChineseMedicine/patientOrder/creationPatientOrder',{
            'userinfo.id':userinfo,
            'prescriptionSelf.id':order_id,
            'type':'1',
            'totalPrice':vm.totalPrice,
            'realName':vm.realName,
            'phoneNumber':vm.phoneNumber,
            'province':vm.province,
            'city':vm.city,
            'district':vm.district,
            'detailedAddress':vm.detailedAddress,
          },{emulateJSON:true}).then(function(res){
            console.log(res)
            if(res.errcode){
              Toast({
                message: res.msg,
                position: 'center',
                duration: 1000
              });
            }else{
              console.log(userinfo,vm.doctor_Id,vm.totalPrice,vm.pay_type)
              vm.$http.post('/traditionalChineseMedicine/pay/payMoney',{
                userinfoId:userinfo,
                payType:vm.pay_type,
                payMoney:vm.all_price,
                state:1,
              },{emulateJSON:true}).then(function(res){
                console.log(res)
                loading.close();
                if(res.body.errcode){
                  Toast({
                    message: res.msg,
                    position: 'center',
                    duration: 1000
                  });
                }else{
                  Toast({
                    message: '支付成功',
                    position: 'center',
                    duration: 1000
                  });
                  vm.storeOrderId('')
                  vm.storeOrderType('')
                  setTimeout(function(){
                    loading.hide()
                    vm.$router.push('/order?id=1')
                  },1000)
                }
                
              },function(e){
                console.log(e)
              })
            }
          },function(e){
            console.log(e)
          })
        }
        
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
      back:function(){
        this.$router.go(-1)
      },
      to_address:function(){
        var type =this.$route.query.type
        var id = this.$route.query.id
        this.$router.push('/address?id='+id+'&type='+type)
      },
      query_init_address:function(){
        // var vm = this
        // this.$http.post('/traditionalChineseMedicine/userinfo/queryDefaultAddress',{
        //     userinfoId:vm.$store.state.data.orderId
        // },{emulateJSON:true}).then(function(res){
        //   console.log(res)
        // },function(e){
        //   console.log(e)
        // })
      },
      query_selected_address:function(){
        var vm = this
        if(vm.$store.state.data.addressId){
            vm.has_address = false
          }else{
            vm.has_address = true
          }
          var localstorage=window.localStorage

        console.log(vm.$store.state.data.addressId,"-=-=-=-=-")
        this.$http.post('/traditionalChineseMedicine/userinfo/queryAddressById',{
            addressId:vm.$store.state.data.addressId
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          if(res.body.errcode==0){
            vm.realName = res.body.data.realName
            vm.phoneNumber = res.body.data.phoneNumber
            vm.province =res.body.data.province
            vm.city =res.body.data.city
            vm.district =res.body.data.district
            vm.detailedAddress =res.body.data.detailedAddress
          }
          
        },function(e){
          console.log(e)
        })
      },
      query_recipe:function(){
        var vm = this
        var buy_type = ''
        var order_id=''
        if(vm.$route.query.id){
          buy_type = vm.$route.query.type
          order_id = vm.$route.query.id
        }else{
          buy_type = vm.$store.state.data.orderType
          order_id = vm.$store.state.data.orderId
        }
       
          if(buy_type==1){
          console.log(vm.$route.query.id)
          this.$http.post('/traditionalChineseMedicine/inquiryBill/queryUserinfoPrescriptionById',{
            id:order_id
          },{emulateJSON:true}).then(function(res){
            console.log(res)

            this.recipe_arr = res.body.data.list 
            this.createTime =this.dateShell(res.body.data.creationTime)
            var count_money = 0
            for(var i=0;i<res.body.data.list.length;i++){
              count_money+=res.body.data.price*res.body.data.count
            }
            vm.totalPrice = count_money 

            vm.all_price = count_money*res.body.data.count 
            console.log(vm.all_price ,'all_price')
            vm.count = res.body.data.count 
            vm.doctor_Id = res.body.data.doctorId
          },function(e){
            console.log(e)
          })
        }else{
          this.$http.post('/traditionalChineseMedicine/userinfo/queryPrescriptionSelfById',{
            prescriptionSelfId:order_id
          },{emulateJSON:true}).then(function(res){
            console.log(res)

            this.recipe_arr = res.body.data.list 
            this.createTime =this.dateShell(res.body.data.creationTime)
            var count_money = 0
            for(var i=0;i<res.body.data.list.length;i++){
              count_money+=res.body.data.list[i].price*res.body.data.list[i].count
            }
            vm.totalPrice = count_money 
            vm.all_price = count_money*res.body.data.count 
            vm.count = res.body.data.count 
          },function(e){
            console.log(e)
          })
        }
      },
      
  },
   components: { 

  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.pay
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .pay-header
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
  .pay-content
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
        color #faa315
        text-align center
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
    .pay-way
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
          img.header-pay-img
            width 0.8rem
            height 0.8rem
          i
            width 7.466667rem
          img.ispay
            width 0.4rem
            height 0.4rem
  div.btn-pay-box
    width 100%
    height 1.066667rem
    display flex
    align-items center
    justify-content space-between
    position fixed
    bottom 0
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
    .el-button--primary
      background #607d8b
      border-radius 0
      border none
      outline none
.footer
  z-index -10
</style>

      