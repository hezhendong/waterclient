<template>
  <div class="index">
    <div class="header" @click='to_find_doctor'>
      <div class="search-box">
        <input type="text" placeholder="搜索" name="">
        <i class="icon">&#xe66e;</i>
      </div>
    </div>
    <div style="width:100%;height:1.173333rem"></div>
    <div class="my-swiper">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for='list in swiper_list'><img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+list.bannerImage"></mt-swipe-item>
        
      </mt-swipe>
    </div>
    <div class="hot">
      <h5><span>热门名医</span><i class="icon"><router-link to='/hotdoctor'>更多&#xe606;</router-link></i></h5>
      <div class="doctor-box">
        <router-link  v-for='doctor in hot_doctor_list' :to="{path:'/detail',query: {id:doctor.id}}">
          <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+doctor.headImage">
          <em>{{doctor.realName}}</em>
          <p>{{doctor.administrativeOffice}}</p>
          <p>{{doctor.specialize}}</p>
        </router-link>
      </div>
    </div>
    <div class="outpatient-server">
      <h5><span>热门门诊</span><i class="icon"><router-link to='/finddoctor'>更多&#xe606;</router-link></i></h5>
      <div class="server-box" style="margin-top:0.266667rem">
        <div style="background:#fff">
          <router-link v-for='list in property_list' :to='{path:"/doctor",query:{id:list.id}}'>
            <p class="title" style="width:100%;">{{list.title}}</p>
            <b>
                <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+list.imagePath">
                <em v-html="list.message">{{list.message}}</em>
            </b>
          </router-link>
        </div>
      </div>
    </div>
    <div class="refer-center">
      <h5 style="margin-bottom:0.266667rem"><span>咨询中心 </span><i class="icon"><router-link to='/consult'>更多&#xe606;</router-link></i></h5>
      <ul class="refer-box" style="margin-top:0.266667rem">
        <router-link v-for='list in refer_list' :to='{path:"/consultdetail",query:{id:list.id}}' style
        ='margin-top:0.266667rem'>
          <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+list.imagePath">
          <div>
            <p class="title">{{list.title}}</p>
            <p v-html="list.message">
              {{list.message}}
            </p>
          </div>
        </router-link>
      </ul>
    </div>
    <div style="width:100%;height:1.333333rem"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'index',
  data () {
    return {
      msg: '',
      hot_doctor_list:[],
      refer_list:[],
      property_list:[],
      swiper_list:[]
    }
  },
  http: {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  },
  mounted () {
    this.footer_show()
    this.query_hot_doctor()//热门门诊
    this.query_refer_list()//咨询中心
    this.query_hot_property()//热门门诊   
    this.query_swiper()//轮播图
    this.is_login() //判断是否登录
    var localstorage = window.localStorage
    var token = ''
    /***********************    只在第一次执行      ************************/
    if(localstorage.getItem('medicine')&&this.$store.state.data.im_start){
      this.init_im()
      this.storeImStart()
    }

  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    ...mapMutations([
        'storeImStart','storeMessageHas'
      ]),
    footer_show:function() {
      document.getElementById('footer').style.zIndex="10000"

    },
    query_hot_doctor:function(){
      this.$http.post('/traditionalChineseMedicine/doctor/queryDoctors',{
        showType:"0",
        doctorType:'1',
        currentPage:"1",
        pageSize:"4"
      },{emulateJSON:true}).then(function(res){
        console.log(res,"热门名医")
        this.hot_doctor_list = res.body.data.data
      },function(e){
        console.log(e)
      })
    },
    query_refer_list:function(){
      var vm = this 
      this.$http.post('/traditionalChineseMedicine/information/queryConsult',{
        currentPage:'1',
        pageSize:'10'
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        vm.refer_list = res.body.data.data
      },function(e){
        console.log(e)
      })
    },
    query_hot_property:function(){
      var vm = this
      this.$http.post('/traditionalChineseMedicine/information/queryDoctorPropertyByHot',{
        hotType:'1',
        state:'0',
        currentPage:'1',
        pageSize:'4'
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        vm.property_list = res.body.data.data
      },function(e){
        console.log(e)
        

      })
    },
    to_find_doctor:function(){
      this.$router.push('/doctorname')
    },
    query_swiper:function(){
      this.$http.post('/traditionalChineseMedicine/information/queryBanner',{
        state:'1'
      },{emulateJSON:true}).then(function(res){
        this.swiper_list = res.body.data
      },function(e){
        console.log(e)
      })
    },
    is_login:function(){
      var localstorage = window.localStorage
      if(localstorage.getItem('medicine')){

      }else{
        this.$router.push('login')
        Toast({
          position:'center',
          message:'您还未登录',
          duration:'1000'
        })
      }
    },
    init_im:function(){/**********************初始化融云***********************************/
      var vm = this
      RongIMClient.init('k51hidwqkn8kb')
      var localstorage = window.localStorage
      var token = JSON.parse(localstorage.getItem('medicine')).token
      // RongIMLib.RongIMEmoji.init();


      console.log(token,'============')
      // 初始化
      RongIMClient.connect(token,
         {
              onSuccess: function(userId) {

              console.log("Login successfully." + userId);
        },
        onTokenIncorrect: function() {
          console.log('token无效');
        },
        onError:function(errorCode){
              var info = '';
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时';
                  break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误';
                  break;
                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                  info = '不可接受的协议版本';
                  break;
                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                  info = 'appkey不正确';
                  break;
                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                  info = '服务器不可用';
                  break;
              }
              console.log(errorCode);
            }
      });
      RongIMClient.getInstance().hasRemoteUnreadMessages(token,{
        onSuccess:function(hasMessage){
            if(hasMessage){
                // 有未读的消息
                console.log(hasMessage,'是否有未读消息')
                vm.storeMessageHas(true)

            }else{
                // 没有未读的消息
                console.log(hasMessage,'是否有未读消息')
                vm.storeMessageHas(false)
            }
        },onError:function(err){
            // 错误处理...
        }
    });


     // 连接状态监听器
     RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            switch (status) {
                case RongIMLib.ConnectionStatus.CONNECTED:
                    console.log('链接成功');
                    break;
                case RongIMLib.ConnectionStatus.CONNECTING:
                    console.log('正在链接');
                    break;
                case RongIMLib.ConnectionStatus.DISCONNECTED:
                    console.log('断开连接');
                    break;
                case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                    console.log('其他设备登录');
                    break;
                  case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                    console.log('域名不正确');
                    break;
                case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                  console.log('网络不可用');
                  break;
                }
        }});

       /*消息监听器*/
       RongIMClient.setOnReceiveMessageListener({
          // 接收到的消息
          onReceived: function (message) {
              // 判断消息类型
              console.log(message.messageType,'first')
              switch(message.messageType){
                  case RongIMClient.MessageType.TextMessage:
                      // message.content.content => 消息内容
                      console.log(message)
                      /********************新消息显示***********************/
                      vm.storeMessageHas(true)
                      console.log(message.targetId,vm.$store.state.data.targetId)
                      if(vm.$store.state.data.targetId == message.targetId){
                        var my_li = document.createElement('li')
                        var content = RongIMLib.RongIMEmoji.emojiToHTML(message.content.content);
                        my_li.innerHTML= '<img class="header-img" src="'+message.content.user.portrait+'"><div class="message-box"><em>'+content+'</em></div>'
                        // document.getElementById('chart_content')
                        document.getElementById('chart_content').appendChild(my_li)
                        document.getElementById('chart_content').scrollTop = document.getElementById('chart_content').scrollHeight
                      }else{
                        
                        }
                      break;
                  case RongIMClient.MessageType.VoiceMessage:
                      // 对声音进行预加载                
                      // message.content.content 格式为 AMR 格式的 base64 码
                      console.log(message,'我是云因消息')

                      break;
                  case RongIMClient.MessageType.ImageMessage:
                     // message.content.content => 图片缩略图 base64。
                     // message.content.imageUri => 原图 URL。
                     console.log(message.content.content)
                     console.log(message.content.imageUri)
                     /********************新消息显示***********************/
                      vm.storeMessageHas(true)
                     if(vm.$store.state.data.targetId == message.targetId){
                        var my_li = document.createElement('li')

                        my_li.innerHTML= '<img class="header-img" src="'+message.content.user.portrait+'"><div class="message-box"><img src="'+message.content.imageUri+'"></div>'
                        // document.getElementById('chart_content')
                        document.getElementById('chart_content').appendChild(my_li)
                        document.getElementById('chart_content').scrollTop = document.getElementById('chart_content').scrollHeight
                      }else{
                        
                        }
                     break;
                  case RongIMClient.MessageType.DiscussionNotificationMessage:
                     // message.content.extension => 讨论组中的人员。
                     console.log(message)
                     break;
                  case RongIMClient.MessageType.LocationMessage:
                     console.log(message)
                     break;
                  case RongIMClient.MessageType.RichContentMessage:
                     console.log(message)
                     break;
                  case RongIMClient.MessageType.InformationNotificationMessage:
                      // do something...
                      console.log(message)
                     break;
                  case RongIMClient.MessageType.ContactNotificationMessage:
                      // do something...
                      console.log(message)
                     break;
                  case RongIMClient.MessageType.ProfileNotificationMessage:
                      // do something...
                      console.log(message)
                     break;
                  case RongIMClient.MessageType.CommandNotificationMessage:
                      // do something...
                      console.log(message)
                     break;
                  case RongIMClient.MessageType.CommandMessage:
                      // do something...
                      console.log(message)
                     break;
                  case RongIMClient.MessageType.UnknownMessage:
                      // do something...
                      console.log(message)
                     break;
                  default:
                      // do something...
              }
          }
      });
      

    
     /*链接融云*/ 

     RongIMClient.connect(token, {
        onSuccess: function(userId) {
          console.log("Connect successfully." + userId);
        },
        onTokenIncorrect: function() {
          console.log('token无效');
        },
        onError:function(errorCode){
              var info = '';
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时';
                  break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误';
                  break;
                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                  info = '不可接受的协议版本';
                  break;
                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                  info = 'appkey不正确';
                  break;
                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                  info = '服务器不可用';
                  break;
              }
              console.log(errorCode);
            }
      });
    }
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.index
  width 100%
  height 100%
  overflow hidden
  overflow-y auto
  -webkit-overflow-scrolling:touch;
  .header
    position fixed
    z-index 10000
    top 0
    width 100%
    height 1.173333rem
    background #607d8b
    display flex
    justify-content center
    align-items center
    div.search-box
      width 8.533333rem
      height 0.666667rem
      background #fff
      border-radius 8px
      overflow hidden
      input 
        outline none
        border none
        width 7.6rem
        height 100%
        margin-left 0.266667rem
    span
      width 0.96rem
      height 100%
      text-align center
      line-height 1.173333rem
      color #fff
  .my-swiper
    width 100%
    height 3.2rem
    overflow hidden
    img
      width 100%
      height 100%
  .hot
    width 100%
    height 6.866667rem
    h5
      width 100%
      height 0.96rem
      background #f5f5f5
      display flex
      justify-content space-between
      align-items center
      span
        font-size 16px
        color #b3b3b3
        margin-left 0.26667rem
      i
        margin-right .266667rem
        color #b3b3b3
        a
          color #b3b3b3
          text-decoration none
    .doctor-box
      width 100%
      height 5.32rem
      box-sizing border-box
      padding 0 .266667rem
      overflow hidden
      a
        text-decoration none
        width 25%
        height 100%
        float left 
        display flex
        flex-direction column
        align-items center
        color #000
        img 
          width 2.053333rem
          height 2.053333rem
          border-radius 2.053333rem
          margin-top 0.26667rem
        em
          font-size 16px
          margin 0.2rem 0
        p
          font-size 13px
          color #b3b3b3
          text-align center
  .outpatient-server
    width 100%
    height 8.3rem
    h5
      width 100%
      height 0.96rem
      background #f5f5f5
      display flex
      justify-content space-between
      align-items center
      span
        font-size 16px
        color #b3b3b3
        margin-left 0.26667rem
      i
        margin-right .266667rem
        color #b3b3b3
        a
          color #b3b3b3
          text-decoration none
    div.server-box
      width 100%
      height 6.9rem
      background #fff
      div
        width 100%
        height 100%
        box-sizing border-box
        padding 0 .266667rem
        display flex
        justify-content space-between
        flex-wrap wrap
        a
          color #000
          width 4.555557rem
          height 3.2rem
          border 1px solid #cecece
          border-radius 10px
          text-decoration none
          p.title
            line-height 1.146667rem
            font-size 16px
            text-align center

          b 
            width 100%
            height 1.973333rem
            display flex
            justify-content space-around
            align-items center
            overflow hidden
            img
              width 1.6rem
              height 1.6rem
              border-radius 10px
            em
              width 2.08rem
              height 1.2rem
              color #cecece
              overflow hidden
              font-size 0.38rem
              word-break:break-all;
              display:-webkit-box;
              -webkit-line-clamp:2;
              -webkit-box-orient:vertical;
              overflow:hidden;
  .refer-center
    width 100%
    height auto
    overflow hidden
    h5
      width 100%
      height 0.96rem
      background #f5f5f5
      display flex
      justify-content space-between
      align-items center
      margin-bottom 0.266667rem
      span
        font-size 16px
        color #b3b3b3
        margin-left 0.26667rem
      i
        margin-right .266667rem
        color #b3b3b3
        a
          color #b3b3b3
          text-decoration none
    ul
      width 100%
      height auto
      box-sizing border-box
      padding 0 .2666667rem
      a
        display block
        color #000
        width 100%
        height 2.453333rem
        overflow hidden
        img
          width 2.0rem
          height 2.0rem
          border-radius 10px
          float left
        div
          width 7.093333rem
          height 2.0rem
          float right 
          overflow hidden
          p.title
            height 0.8rem
            font-size 16px
            font-weight bold
            color #000
            overflow hidden
          p
            color #bbbbbb
            word-break:break-all;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            overflow:hidden;
</style>