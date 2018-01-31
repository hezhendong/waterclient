
<template>
  <div class="chart">
    <div class="chart-header" ref='header'>
      <i class="back icon" @click="back_message">&#xe737;</i>
      <p>{{doctor_name}}</p>
      <span @click="envalue_doctor" v-if='can_evalue'>评价</span>
    </div>
    <div class="top">
      
    </div>
    <div class="chart-content" ref='chart_content' id="chart_content">
       <!-- <li class="doctor-message">
        <img src="../../assets/logo.png">
        <div class="message-box">
          你好是？你是谁？大家好，各位各位请看看啊看啊看啊看啊看看啊，呜呜呜呜无为之治自治州子牙那颜颜颜
        </div>
      </li> -->
      <p><a @click='gain_history_msg(20)' v-if='hashistorymsg'>查看历史聊天记录</a></p>
      <li v-for='list in history_list' :class="{'doctor-message' : my_user_id==list.senderUserId}">
        <img class="header-img" :src="list.headPath">
        <div class="message-box">
          <em v-if='list.messageType=="ImageMessage"'><img  :src="list.imgUrl"></em>
          <em v-if='list.messageType=="TextMessage"' v-html='list.content'></em>
          <em v-if='list.messageType=="VoiceMessage"' @click='auto_play(list.content.content)'>音频</em>
        </div>
      </li>
    </div>
    <div class="import-footer"  ref='import_footer'>
      <i ><label for="upload_chart_img">＋</label></i>
      <input type="file" name="" id="upload_chart_img" style="display:none" @change="upload_message_img($event)">
      <input type="text" v-model='msg' name="" >
      <span @click='send_msg'>发送</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
import Qiniu from '../../../static/js/qiniu-upload.js'
export default {
  name: 'chart',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      chart:"妇产科",
      attention:true,
      isSelected:true,
      remnant:"500",
      number:0,
      desc:"",
      history_arr:[],
      msg:'',
      doctor_name:'',
      doctor_id:'',
      my_user_id:'',
      history_list:[],
      old_scrollTop:'',
      new_scrollTop:'',
      user_name:'',
      portrait:'',
      hashistorymsg:true,
      can_evalue:true,
      doctor_real_id:'',
      inquiryId:'',
      first:false,
      new_date:'',
      click_history:true,
      base_64:''
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    console.log(Qiniu,'----------')
    var vm = this
    this.chart_footer_hide()
    this.computed_content_height()
    this.gain_man_chart_list()
    this.gain_url_name()
    var localstorage = window.localStorage
    this.my_user_id = JSON.parse(localstorage.getItem('medicine')).phoneNumber
    this.scrollTop = this.$refs.chart_content.clientHeight
    this.user_name=JSON.parse(localstorage.getItem('medicine')).realName
    this.portrait=JSON.parse(localstorage.getItem('medicine')).headImage
    if(vm.$route.query.msgNumber>1){
      console.log(vm.$route.query.msgNumber,'{{{{{{{{{{{{{}}}}}}}}}}')
      vm.gain_history_msg(vm.$route.query.msgNumber)
    }else{
      console.log('------------第一次获取消息')
      vm.gain_history_msg(2)
    }
    
    this.query_doctor_byPhone()
    this.is_return()
    this.gain_inqiry()
    // RongIMClient.getInstance().clearConversations(function(){
    //   console.log('已清空')
    // })
    this.removeMsg()
    
  },
  created () {
    
  },
  methods : {
    upload_message_img:function(e){
      var that = this
      var file = e.target.files[0]
      Qiniu.imageStartUpload(file,function(data){
        console.log("文件上传完成：", data);
        // getFileUrl(data);
        console.log(data)
        that.base_64=data.thumbnail
        that.urlItem(data)
        // console
      });
      
    },
    removeMsg:function(){
      var vm = this
      var targetId = vm.$route.query.id
      var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
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
    urlItem:function(data){
    var vm = this
     
      console.log(data,'config初始化')
        var fileType = RongIMLib.FileType.IMAGE;
          RongIMClient.getInstance().getFileUrl(fileType, data.filename, null, {
            onSuccess: function(result){
              data.downloadUrl = result.downloadUrl;
              // var msg = messageItem[data.fileType](data);
              // sendMessage(msg);
              console.log(result,'-------------------------------------------===========-=-=-=+++++++')
              var user={
              name:vm.user_name,
              id:vm.my_user_id,
              portrait:'http://116.62.136.166:7080/traditionalChineseMedicine'+vm.portrait,
              list_name:vm.doctor_name,
              list_portrait:vm.doctor_portrait
            }
             var targetId = vm.$route.query.id
             console.log(targetId)
             var base64Str = vm.base_64;
             var imageUri = data.downloadUrl; // 上传到自己服务器的 URL。
             var msg = new RongIMLib.ImageMessage({content:base64Str,imageUri:imageUri,user:user});
             var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
        
             RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                        onSuccess: function (message) {
                            //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                            console.log("Send successfully");
                            var chart_content_html = ''
                            var my_li = document.createElement('li')
                            my_li.className = 'doctor-message'
                            my_li.innerHTML= '<img src="http://116.62.136.166:7080/traditionalChineseMedicine'+vm.portrait+'" class="header-img"><div class="message-box"><em><img src="'+imageUri+'"/></em></div>'
                           
                        
                            vm.$refs.chart_content.appendChild(my_li)
                            vm.$refs.chart_content.scrollTop = vm.$refs.chart_content.scrollHeight
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
            onError: function(error){
              console.log(error);
            }
          });
  
    },
    zipImag:function(){
      
    },
    ...mapActions([
        'checkout','storeTargetId'
      ]),
    ...mapMutations([
        'storeTargetId','storeIsSendMsg'
      ]),
    back_message:function(){
      this.$router.push('/message')
      this.storeTargetId('')
    },
    gain_url_name:function(){
      var vm = this
      var _url = window.location.href
      var doctor_name = _url.match(/realname=[\s\S]+/g).toString().replace(/realname=/,'')
      this.doctor_name = decodeURI(doctor_name)
      this.doctor_id = _url.match(/id=\d+/g).toString().replace(/id=/,'')
      vm.storeTargetId(vm.doctor_id)
       var conversationtype = RongIMLib.ConversationType.PRIVATE;
       RongIMClient.getInstance().clearUnreadCount(conversationtype,vm.doctor_id,{
              onSuccess:function(){
                console.log('清除未读消息成功');
                  // 清除未读消息成功。
              },
              onError:function(error){
                  // error => 清除未读消息数错误码。
              }
          });
    },
    chart_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-10000'
    },
    computed_content_height:function(){
      var vm = this
      var header_height = vm.$refs.header.clientHeight 
      var footer_height = vm.$refs.import_footer.clientHeight 
      var document_height = document.documentElement.clientHeight 
      vm.$refs.chart_content.style.height = document_height-footer_height-header_height+'px'
    },
    is_return:function(){
      var vm  = this
      var localstorage=window.localStorage
      var userinfoId = JSON.parse(localstorage.getItem('medicine')).id
      this.$http.post('/traditionalChineseMedicine/inquiryBill/queryIBByuserIdAndDoctorPhoneNumber',{
        userinfoId:userinfoId,
        phoneNumber:vm.$route.query.id
      },{emulateJSON:true}).then(function(res){
        console.log(res,'-------------')
        if(res.body.data.state==4){
          Toast({
            position:'center',
            message:'已结束咨询',
            duration:'1000'
          })
          vm.$refs.import_footer.style.display='none'
        }else{

        }
      },function(e){
        console.log(e)
      })
    },
    send_msg:function(){
      var vm = this
      var localstorage = window.localStorage
      var userinfoId = JSON.parse(localstorage.getItem('medicine')).id
      this.$http.post('/traditionalChineseMedicine/inquiryBill/queryIBByuserIdAndDoctorPhoneNumber',{
        userinfoId:userinfoId,
        phoneNumber:vm.$route.query.id
      },{emulateJSON:true}).then(function(res){
        console.log(res,'{{{{{{{{{{}}}}}}}}}}')
        if(res.body.data.state==4){
          Toast({
            position:'center',
            message:'已结束咨询',
            duration:'1000'
          })
          vm.$refs.import_footer.style.display='none'
        }else{
          var user={
              name:vm.user_name,
              id:vm.my_user_id,
              portrait:'http://116.62.136.166:7080/traditionalChineseMedicine'+vm.portrait,
              list_name:vm.doctor_name,
              list_portrait:vm.doctor_portrait
            }
            // var user={
            //   name:'殴打搜到',
            //   id:'dsd',
            //   parse:'adsd',
            //   list_name:vm.doctor_name
            // }
             var msg = new RongIMLib.TextMessage({content:vm.msg,user:user});
             var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
             // var targetId = 11; // 目标 Id
             // console.log(targetId)
             var targetId = vm.$route.query.id
             console.log(targetId)
             var instance = RongIMClient.getInstance()
             RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                    onSuccess: function (message) {
                        //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                        console.log("Send successfully");
                        document.activeElement.blur()
                        var chart_content_html = ''
                        var my_li = document.createElement('li')
                        my_li.className = 'doctor-message'
                        my_li.innerHTML= '<img src="http://116.62.136.166:7080/traditionalChineseMedicine'+vm.portrait+'" class="header-img"><div class="message-box"><em>'+vm.msg+'</em></div>'
                       
                    
                        vm.$refs.chart_content.appendChild(my_li)
                        vm.$refs.chart_content.scrollTop = vm.$refs.chart_content.scrollHeight
                        vm.msg=''
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
        }
      },function(e){
      })
      


    },
    gain_user_msg:function(){
      var conversationType = RongIMLib.ConversationType.PRIVATE;
      var targetId = this.$route.query.id;
      RongIMLib.RongIMClient.getInstance().getConversation(conversationType,'18368020213',{
          onSuccess:function(con){
              if (con) {
                con.conversationTitle="我是会话的Title";
                RongIMLib.RongIMClient.getInstance().updateConversation(con);
                console.log("updateConversation Success!");
              }
          }
      });
    },
    // 查询医生
    query_doctor_byPhone:function(){
      var vm = this
      console.log(vm.$route.query.id,'ooo')
      vm.$http.post('/traditionalChineseMedicine/doctor/queryDoctorByPhoneNumber',{
        phoneNumber:vm.$route.query.id
      },{emulateJSON:true}).then(function(res){
        vm.doctor_name=res.body.data.realName
        vm.doctor_portrait='http://116.62.136.166:7080/traditionalChineseMedicine'+res.body.data.headImage
        vm.doctor_real_id= res.body.data.id
      },function(e){
        console.log(e)
      })
    },
    gain_history_msg:function(count){
      console.log(count,'0000000000000000')
      var vm = this
      if(vm.new_date){
        vm.click_history=false
        var conversationType = RongIMLib.ConversationType.PRIVATE; //单聊,其他会话选择相应的消息类型即可。
        var targetId = vm.$route.query.id; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
        var timestrap = vm.new_date; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
        // console.log(timestrap)
        console.log(count,targetId)
        RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, null, count, {
          onSuccess: function(list, hasMsg) {
               // list => Message 数组。
            // hasMsg => 是否还有历史消息可以获取。
            // console.log(list,'ppppppppp')
            // vm.history_list = list
            var first_arr=[]
            console.log(list,'list')
            vm.new_date = new Date().getTime()
            console.log(list,vm.new_date,'|||||||||||||||||||||new_date')
            for(var i=0;i<list.length;i++){
              var obj = {}
              obj.content = RongIMLib.RongIMEmoji.emojiToHTML(list[i].content.content);
              obj.headPath = list[i].content.user.portrait
              obj.messageType = list[i].messageType
              obj.imgUrl = list[i].content.imageUri
              obj.senderUserId = list[i].senderUserId
              first_arr.push(obj)
            }
            console.log(vm.history_list,'=============')
            if(list.length>0){
              console.log(vm.history_list)
              vm.history_list = first_arr.concat(vm.history_list)
              console.log(vm.history_list)
            }else{
              vm.history_list = vm.history_list
              vm.hashistorymsg=false
            }

            vm.new_scrollTop = vm.$refs.chart_content.clientHeight
            vm.$refs.chart_content.scrollTop = vm.new_scrollTop-vm.old_scrollTop
            // vm.old_scrollTop=vm.$refs.chart_content.clientHeight
          },
          onError: function(error) {
            console.log("GetHistoryMessages,errorcode:" + error);
          }
        });
      }else{
        var conversationType = RongIMLib.ConversationType.PRIVATE; //单聊,其他会话选择相应的消息类型即可。
        var targetId = vm.$route.query.id; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
        var timestrap = 0; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
        // console.log(timestrap)
        console.log(count,targetId)
        RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
          onSuccess: function(list, hasMsg) {
               // list => Message 数组。
            // hasMsg => 是否还有历史消息可以获取。
            // console.log(list,'ppppppppp')
            // vm.history_list = list
            console.log(list)
            vm.new_date = new Date().getTime()
            var first_arr = []
            for(var i=0;i<list.length;i++){
              var obj = {}
              obj.content = RongIMLib.RongIMEmoji.emojiToHTML(list[i].content.content);
              obj.headPath = list[i].content.user.portrait
              obj.messageType = list[i].messageType
              obj.imgUrl = list[i].content.imageUri
              obj.senderUserId = list[i].senderUserId
              first_arr.push(obj)
            }
            console.log(vm.history_list,'=============')
            if(list.length>0&&!hasMsg){
              vm.history_list = first_arr
            }else if(hasMsg){
              vm.history_list = first_arr
            }else{
              vm.hashistorymsg=false
            }

            vm.new_scrollTop = vm.$refs.chart_content.clientHeight
            vm.$refs.chart_content.scrollTop = vm.new_scrollTop-vm.old_scrollTop
            // vm.old_scrollTop=vm.$refs.chart_content.clientHeight
          },
          onError: function(error) {
            console.log("GetHistoryMessages,errorcode:" + error);
          }
        });
      }
      
    },
    gain_man_chart_list:function(){

      var vm = this
      console.log(vm.$store.state.data.targetId,'===================')
      var _url = window.location.href
      var doctor_id = _url.match(/id=\d+/g).toString().replace(/id=/,'')
      var list_of_target_doctor = vm.$store.state.data.message_box_arr
      for(var i=0;i<list_of_target_doctor.length;i++){
        console.log(list_of_target_doctor[i],"+++++")
        if(doctor_id == list_of_target_doctor[i].targetId){
          vm.history_arr = list_of_target_doctor[i].messageList
          // return false;
          console.log(vm.history_arr)
          // list_of_target_doctor.indexof(vm.history_arr,1)
          console.log(list_of_target_doctor.indexOf(list_of_target_doctor[i]))
          var index_of = list_of_target_doctor.indexOf(list_of_target_doctor[i])
          var list_of_target_doctor = list_of_target_doctor.splice(index_of,1)
          console.log(list_of_target_doctor,'--------')
        }
      }
    },
    gainRongHistoryMsg:function(){

    },
    envalue_doctor:function(){
      var vm= this
      this.$router.push('/rate?id='+vm.inquiryId+'&phone='+vm.$route.query.id)
    },
    gain_inqiry:function(){
      var userId = JSON.parse(window.localStorage.getItem('medicine')).id
     var vm = this
      this.$http.post('/traditionalChineseMedicine/inquiryBill/queryIBByuserIdAndDoctorPhoneNumber',{
        userinfoId:userId,
        phoneNumber:vm.$route.query.id
      },{emulateJSON:true}).then(function(res){
        console.log(res,'状态')
        vm.inquiryId = res.body.data.id
      },function(e){
        console.log(e)
      })
    }
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.chart
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .chart-header
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
  .chart-content
    width 100%
    height auto
    overflow hidden
    overflow-y auto
    -webkit-overflow-scrolling touch
    box-sizing border-box
    padding 0 0.266667rem
    li
      width 70%
      height auto
      overflow hidden
      list-style none
      padding 0.266667rem 0
      img.header-img
        width 1.333333rem
        height 1.333333rem
        border-radius 1.333333rem
        float left
        margin-right 0.266667rem
      img
        width 3rem
        height auto
      div
        width 5rem
        height 100%
        float left
        overflow hidden
        em
          display block
          float left
          border-radius 0.166667rem
          padding 0.266667rem
          background-color rgba(0,0,0,0.3)
    li.doctor-message
      float right 
      img.header-img
        float right
        margin-right 0px
        margin-left 0.266667rem
      div 
        width 5rem
        height 100%
        float left
        overflow hidden
        em
          display block
          float right
          border-radius 0.166667rem
          padding 0.266667rem
          background-color rgba(0,0,0,0.3)

  .import-footer
    width 100%
    height 1.2rem
    position fixed
    bottom 0
    border-top 1px solid #cecece
    display flex
    justify-content space-around
    align-items center
    i
      display inline-block
      width 0.6rem
      height 0.6rem
      text-align center
      line-height 0.6rem
      border 1px solid #666
      border-radius 0.6rem
    input
      width 6.933333rem
      height 0.933333rem
      border-radius 7px
      outline none

    
</style>
