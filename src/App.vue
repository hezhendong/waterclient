<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Footer from './components/Footer'
export default {
  name: 'app',
  components:{
    'v-footer':Footer
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message_arr:[],
      flag:'',
      token:''
    }
  },
  mounted(){
    // weui.alert('alert');
    this.setPxRem()
   
    var vm = this
    var old_url = 'http://192.168.3.170/#/index'
    var _url = encodeURI(old_url)
    console.log(_url)
    //window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2788893ab918c76a&redirect_uri='+_url+'&scope=snsapi_base&response_type=code#wechat_redirect'
    
    
    var localstorage = window.localStorage
    
    if(localstorage.getItem('medicine')){
      vm.token = JSON.parse(localstorage.getItem('medicine'))
      RongIMLib.RongIMEmoji.init();
    }
    console.log(vm.token,'------------------')
  },
  watch:{
    token:function(new_data){
      console.log(new_data,'token')
    }
  },
  methods : {
    ...mapMutations([
        'storeMessAge'
      ]),
    setPxRem:function(){
      var cssEl = document.createElement('style');
      document.documentElement.firstElementChild.appendChild(cssEl);
      var dpr = 1;
      //把viewport分成10份的rem，html标签的font-size设置为1rem的大小;
      var pxPerRem = document.documentElement.clientWidth * dpr / 10;
      console.log(pxPerRem)
      cssEl.innerHTML = 'html{font-size:' + pxPerRem + 'px!important;}';
    },
    //唤醒键盘的时候让输入框在键盘上面
    keyboard:function(event){
      var thisTarget = event.target || event.srcElement;
      setTimeout(function(){
        thisTarget.scrollIntoView(true);
      },500)
    },
    
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../static/css/reset.css'
@import '../static/css/icon.css'
html,body{
  width: 100%;
  height: 100%;
  overflow:hidden;
}
#app
  width: 100%;
  height: 100%;
  position relative
  .container
    width 100%
    height 100%
  .footer
    position absolute
    bottom 0px
    width 100%
    height 1.333333rem
</style>
