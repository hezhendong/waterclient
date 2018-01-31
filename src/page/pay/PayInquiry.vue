<template>
  <div class="payInquiry">
    <div class="payInquiry-header">
      <i class="back icon" @click="back">&#xe737;</i>
      <p>购买服务</p>
    </div>
    <div class="top">
      
    </div>
    <div class="payInquiry-content">
      <div class="select-address">
       <span>{{client_user_name}}</span><i style="float:right">￥{{pay_money}}</i>
      </div>
      <div class="payInquiry-way">
        <p>支付方式</p>
        <ul>
          <li @click="payInquiry_way">
            <img src="./zhi.png" class="header-payInquiry-img">
            <i>支付宝支付</i>
            <img src="./select.png" v-if="isSelected" class="ispayInquiry">
            <img src="./no-select.png" v-if="!isSelected" class="ispayInquiry">
          </li>
           <li @click="payInquiry_way">
            <img src="./wei.png" class="header-payInquiry-img">
            <i>支付宝支付</i>
            <img src="./no-select.png" v-if="isSelected" class="ispayInquiry">
            <img src="./select.png" v-if="!isSelected"  class="ispayInquiry">
          </li>
        </ul>
      </div>
      <div class="btn-payInquiry" @click="pay_for_inquiry">立即支付</div>
      <!-- <el-button
        type="primary"
        element-loading-text="付款成功,请等待医生答复"
        @click="openFullScreen2">
        立即支付
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
          pay_type:'0',
          pay_money:'',
          client_user_name:'',
          pay_doctor_name:'',
          pay_doctor_phoneNumber:'',
          pay_doctor_headImage:'',
          fullscreenLoading: false
       }
    
     },
  mounted(){
    this.query_doctor_msg_by_id()
    this.pay_for_inquiry_footer_hide()
    
    var localstorage = window.localStorage
    this.client_user_name = JSON.parse(localstorage.getItem('medicine')).realName
    
  },
  methods : {
      payInquiry_way:function (state){
        this.isSelected=!this.isSelected
        var vm =this
        if(this.isSelected){
          vm.pay_type = 0
        }else{
          vm.pay_type = 0
        }
      },
      back:function(){
        this.$router.go(-1)
      },
      pay_for_inquiry_footer_hide:function(){
        document.getElementById('footer').style.zIndex='-10000'
      },
      pay_for_inquiry:function (){
        // console.log(this.pay_doctor_name,'========')
        //  var loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });
        var loading = weui.loading('loading', {
            className: 'custom-classname'
        });
        var vm = this
        var localstorage = window.localStorage
        var userinfoId = JSON.parse(localstorage.getItem('medicine')).id
        console.log(userinfoId,vm.$route.query.id,vm.pay_type,vm.pay_money,vm.$route.query.inquiryId)
        new Promise(function(resolve,reject){
          vm.$http.post('/traditionalChineseMedicine/pay/payMoney',{
              userinfoId:userinfoId,
              doctorId:vm.$route.query.id,
              payType:vm.pay_type,
              payMoney:vm.pay_money,
              state:0,
              InquiryBillId:vm.$route.query.inquiryId
          },{emulateJSON:true}).then(function(res){
            console.log(res)
            if(res.body.errcode){
              Toast({
                message: res.body.msg,
                position: 'center',
                duration: 1000
              });
              // loading.close();
              
              setTimeout(function(){
                vm.$router.push('/paysuccess')
              },1000)
            }else{
              loading.hide();
              
            }
            
            resolve('pppp')
          })
        }).then(function(data){
          setTimeout(function(){
            vm.$router.push('/paysuccess')
          },'1000')
          
        })
      },
      
      // start_send_msg:function(){
      //   var vm = this
      //   console.log(vm.msg)
      //   var localstorage=window.localStorage
      //   var id = JSON.parse(localstorage.getItem('medicine')).phoneNumber
      //   var name = JSON.parse(localstorage.getItem('medicine')).realName
      //   var portrait = 'http://116.62.136.166:7080/traditionalChineseMedicine'+JSON.parse(localstorage.getItem('medicine')).headImage
      //   console.log(id,name,portrait)
      //   var user={
      //     name:name,
      //     id:id,
      //     portrait:portrait,
      //     doctor_id:vm.pay_doctor_phoneNumber,
      //     doctor_name:vm.pay_doctor_name,
      //     doctor_portrait:vm.pay_doctor_name,
      //     doctor_headImage:vm.pay_doctor_headImage
      //   }
      //   // var user={
      //   //   name:'殴打搜到',
      //   //   id:'dsd',
      //   //   parse:'adsd',
      //   //   list_name:vm.doctor_name
      //   // }
      //    var msg = new RongIMLib.TextMessage({content:'你好,',user:user});
      //    var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
      //    // var targetId = 11; // 目标 Id
      //    // console.log(targetId)
      //    var instance = RongIMClient.getInstance()
      //    RongIMClient.getInstance().sendMessage(conversationtype, vm.pay_doctor_phoneNumber, msg, {
      //           onSuccess: function (message) {
      //               //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
      //               console.log("Send successfully");
      //               console.log(message,'----------')


      //               vm.$router.push('/chart?phone='+vm.$route.query.id+'&id='+vm.pay_doctor_phoneNumber+'&realname='+vm.pay_doctor_name)





      //               // var conversationType = RongIMLib.ConversationType.PRIVATE;
      //               RongIMClient.getInstance().clearUnreadCount(conversationtype,vm.pay_doctor_phoneNumber,{
      //                 onSuccess:function(){
      //                   console.log('清除未读消息成功');
      //                     // 清除未读消息成功。
      //                 },
      //                 onError:function(error){
      //                     // error => 清除未读消息数错误码。
      //                 }
      //             });

      //           },
      //           onError: function (errorCode,message) {
      //               var info = '';
      //               switch (errorCode) {
      //                   case RongIMLib.ErrorCode.TIMEOUT:
      //                       info = '超时';
      //                       break;
      //                   case RongIMLib.ErrorCode.UNKNOWN_ERROR:
      //                       info = '未知错误';
      //                       break;
      //                   case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
      //                       info = '在黑名单中，无法向对方发送消息';
      //                       break;
      //                   case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
      //                       info = '不在讨论组中';
      //                       break;
      //                   case RongIMLib.ErrorCode.NOT_IN_GROUP:
      //                       info = '不在群组中';
      //                       break;
      //                   case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
      //                       info = '不在聊天室中';
      //                       break;
      //                   default :
      //                       info = x;
      //                       break;
      //               }
      //               console.log('发送失败:' + info);
      //           }
      //       }
      //   );


      // },
      query_doctor_msg_by_id:function(){
        var vm =this
          this.$http.post('/traditionalChineseMedicine/doctor/queryDoctorById',{
          doctorId:vm.$route.query.id
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          vm.pay_money = res.body.data.consultingFee
          vm.pay_doctor_name = res.body.data.realName
          vm.pay_doctor_phoneNumber = res.body.data.phoneNumber
          vm.pay_doctor_headImage = res.body.data.headImage
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
.payInquiry
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .payInquiry-header
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
  .payInquiry-content
    width 100%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding:0 0.266667rem
    .select-address
      width 100%
      height 2rem
      line-height 2rem
      i
        color red
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
    .payInquiry-way
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
          img.header-payInquiry-img
            width 0.8rem
            height 0.8rem
          i
            width 7.466667rem
          img.ispayInquiry
            width 0.4rem
            height 0.4rem
  div.btn-payInquiry
    width 4.266667rem
    height 0.88rem
    margin 0 auto
    margin-top 2.666667rem
    text-align center
    line-height 0.88rem
    border-radius 0.88rem
    color #fff
    background-color #607d8b
  .el-button--primary
    width 4.266667rem
    height 0.88rem
    margin 0 auto
    margin-top 2.666667rem
    text-align center
    line-height 0.88rem
    border-radius 0.88rem
    color #fff
    background-color #607d8b
    outline none
    border none
    line-height 0
    margin-left 2.4666rem
.footer
  z-index -10
</style>

      