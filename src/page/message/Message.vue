<template>
  <div class="message">
    <div class="message-header">
      <p>消息</p>
    </div>
    <div class="top">
      
    </div>
    <div class="message-content">
      <ul>
        <li v-for='list in message_list'>
          <router-link :to='{path:"/chart",query:{id:list.targetId,msgNumber:list.unreadMessageCount,realname:list.latestMessage.content.user.list_name ? list.latestMessage.content.user.list_name : list.latestMessage.content.user.name}}'>
            <img :src="list.latestMessage.content.user.list_portrait ? list.latestMessage.content.user.list_portrait : list.latestMessage.content.user.portrait">
            <div class="msg_detail">
              <h4>{{list.latestMessage.content.user.list_name ? list.latestMessage.content.user.list_name : list.latestMessage.content.user.name}}</h4>
              <p>{{list.latestMessage.content.content}}</p>
            </div>
            <span class="msg-number" v-if='list.unreadMessageCount'>{{list.unreadMessageCount}}</span>
          </router-link>
          <em class="icon" @click="removeTarget(list.targetId)">&#xe60f;</em>
        </li>
        
      </ul>
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
         message_list:[],
         msg_box:[]
       }
    
     },
  mounted(){
    
    this.doctor_footer_show()
    this.gain_man_chart_list()
    console.log(this.$store.state.data.message_box_arr)
  },
  methods : {
    ...mapMutations([
        'storeMessageHas'
      ]),
    doctor_footer_show:function() {
      document.getElementById('footer').style.zIndex="10000"
    },
    removeTarget:function(targetId){
      MessageBox.confirm('删除后不能聊天，请谨慎删除?').then(action => {
          RongIMClient.getInstance().removeConversation(RongIMLib.ConversationType.PRIVATE,targetId,{
            onSuccess:function(bool){
               // 删除会话成功。
               console.log(bool)
            },
            onError:function(error){
               // error => 删除会话的错误码
            }
        });
      });
      
    },
    gain_man_chart_list:function(){
      var vm = this
      RongIMClient.getInstance().getConversationList({
        onSuccess: function(list) {
          // list => 会话列表集合。
          console.log(list,'|||||||||||||||||||||||')
          
          // console.log(list[0].unreadMessageCount)
          vm.message_list=list
          console.log(list)
          for(var i=0;i<vm.message_list.length;i++){
            if(vm.message_list[i].unreadMessageCount){
              vm.storeMessageHas(true)
              // console.log()
              return false;
            }else{
              vm.storeMessageHas(false)
            }
          }
        },
        onError: function(error) {
           // do something...
        }
      },null);
    //   RongIMClient.getInstance().removeConversation(RongIMLib.ConversationType.PRIVATE,"bb",{
    //     onSuccess:function(bool){
    //        // 删除会话成功。
    //     },
    //     onError:function(error){
    //        // error => 删除会话的错误码
    //     }
    // });
    }
  },
   components: { 
   
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.message
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .message-header
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
  .message-content
    width 100%
    height 100%
    overflow hidden
    background #f5f5f5
    ul
      width 100%
      height auto
      overflow hidden
      overflow-y auto
      -webkit-overflow-scrolling touch
      li
        width 100%
        height 2.133333rem
        a
          display block
          width 90%;
          height 2.133333rem
          display flex
          align-items center
          text-decoration none
          color #000
          float left
          img
            float left
            width 1.6rem
            height 1.6rem
            border-radius 1.6rem
            margin 0 0.266667rem
          div.msg_detail
            width 6.333333rem
            height 100%
            float left
            h4
              line-height 1.066667rem
              font-size 18px
            p
              width 6.333333rem
              line-height 0.8rem
              white-space:nowrap
              overflow:hidden
              text-overflow:ellipsis
          .msg-number
            width 0.666667rem
            height 0.433333rem
            border-radius 0.266667rem
            background red
            color #fff
            text-align center
            line-height 0.433333rem
        em
          display block
          float left
          margin-top .766667rem  
          margin-left 0.266667rem

</style>

      