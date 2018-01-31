
<template>
  <div class="pay">
    <div class="pay-header">
      <i class="back icon">&#xe737;</i>
      <p>购买服务</p>
    </div>
    <div class="top">
      
    </div>
    <div class="pay-content">
     <div class="pay_header">
       <span>图文资讯&nbsp;&nbsp;张三</span>
       <i>￥20</i>
     </div>
     <div class="pay-way">
      <p>支付方式</p>
       <ul>
         <li>
           <img class="pay-img" src="../../assets/header.jpg">
           <span>支付宝支付</span>
           <i><img src=""></i>
         </li>
         <li>
           <img class="pay-img" src="../../assets/header.jpg">
           <span>微信支付</span>
           <i><img src=""></i>
         </li>
       </ul>
     </div>
     <div class="btn-pay" @click=''>立即支付</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'pay',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pay:"妇产科",
      attention:true,
      isSelected:true
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
     this.query_doctor_detail()
  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    changeText:function(){
    	this.attention=!this.attention

    },
    send_msg:function(){
      var vm = this
      console.log(vm.msg)
      var user={
        name:vm.user_name,
        id:vm.user_id,
        parse:vm.parse,
        list_name:vm.doctor_name
      }
       var msg = new RongIMLib.TextMessage({content:vm.msg,user:user});
       var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
       // var targetId = 11; // 目标 Id
       // console.log(targetId)
       var targetId = vm.$route.query.id
       var instance = RongIMClient.getInstance()
       RongIMClient.getInstance().sendMessage(conversationtype,targetId , msg, {
              onSuccess: function (message) {
                  //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                  console.log("Send successfully");
                  vm.$router.push('')
                  // console.log(message,'----------')
                  // var chart_content_html = ''
                  // var my_li = document.createElement('li')
                  // my_li.className = 'doctor-message'
                  // my_li.innerHTML= '<img src="../../../assets/logo.png"><div class="message-box">'+vm.msg+'</div>'
                 
              
                  // vm.$refs.chart_content.appendChild(my_li)
                  // vm.$refs.chart_content.scrollTop = vm.$refs.chart_content.scrollHeight
                  // vm.msg=''
                  // 是否已经发送消息
                  vm.storeIsSendMsg('1')
                  // var conversationType = RongIMLib.ConversationType.PRIVATE;
                  RongIMClient.getInstance().clearUnreadCount(conversationtype,targetId,{
                    onSuccess:function(){
                      console.log('清除未读消息成功');
                        // 清除未读消息成功。
                    },
                    onError:function(error){
                        // error => 清除未读消息数错误码。
                    }
                });

              },
              onError: function (errorCode,message) {
                  var info = '';
                  switch (errorCode) {
                      case RongIMLib.ErrorCode.TIMEOUT:
                          info = '超时';
                          break;
                      case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                          info = '未知错误';
                          break;
                      case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                          info = '在黑名单中，无法向对方发送消息';
                          break;
                      case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                          info = '不在讨论组中';
                          break;
                      case RongIMLib.ErrorCode.NOT_IN_GROUP:
                          info = '不在群组中';
                          break;
                      case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                          info = '不在聊天室中';
                          break;
                      default :
                          info = x;
                          break;
                  }
                  console.log('发送失败:' + info);
              }
          }
      );
    },
    query_doctor_detail:function(){
      let vm = this 
      vm.$http.post('/traditionalChineseMedicine/doctor/queryDoctorById',{
        id:vm.$route.query.id
      },{emulateJSON:true}).then(function(res){
        console.log(res)
      },function(e){
        console.log(e)
      })
     },
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .top
    width 100%
    height 1.173333rem
  .pay-content
    width 100%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding 0 0.266667rem
    .pay_header
      width 100%
      height 1.466667rem
      display flex
      justify-content space-between
      align-items center
      i
        color red
        font-size 18px
    .pay-way
      width 100%
      height 3.733333rem
      ul
        width 100%
        height 100%
        li
          width 100%
          height 1.333333rem
          display flex
          align-items center
          border-bottom 1px solid #f5f5f5
          img.pay-img
            width 0.8rem
            height 0.8rem
          span
            width 7.6rem
            height 100%
            line-height 1.33333rem
            margin-left 0.533333rem
    .btn-pay
      width 4.266667rem
      height 0.88rem
      border-radius 0.88rem
      background #607d8b
      color #fff
      line-height 0.88rem
      text-align center
      margin 0 auto
      margin-top 2.666667rem
.footer
  z-index -10
</style>
