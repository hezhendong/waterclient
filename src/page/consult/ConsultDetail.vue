
<template>
  <div class="consult">
    <div class="consult-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>咨询详情</p>
    </div>
    <div class="top">
      
    </div>
    <div class="consult-content">
     	<h3>{{consult_title}}?</h3>
      <p v-html="consult_content"></p>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'consult',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      consult:"妇产科",
      attention:true,
      isSelected:true,
      consult_title:'',
      consult_content:''
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.consult_footer_hide()
    this.query_consult_byid()
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
    back:function(){
      this.$router.go(-1)
    },
    consult_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-1000000'
    },
    query_consult_byid:function(){
      var vm = this 
      this.$http.post('/traditionalChineseMedicine/information/queryConsultById',{
        id:vm.$route.query.id
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        this.consult_title=res.body.data.title
        this.consult_content=res.body.data.message
      },function(e){
        connsole.log(e)
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
.consult
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  -webkit-overflow-scrolling touch
  position relative
  .consult-header
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
  .consult-content
    width 100%
    overflow hidden
    overflow-y auto
    h3
      height 0.8rem
      font-size 18px
      text-align center
      color #666
      line-height 30px
    p
      color #000
      line-height 20px
      box-sizing border-box
      padding 0.266667rem

.footer
  z-index -10
</style>
