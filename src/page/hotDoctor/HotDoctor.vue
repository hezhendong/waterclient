<template>
  <div class="hot-doctor">
    <div class="hot-doctor-header">
      <i class="back icon" @click="back">&#xe737;</i>
      <p>热门名医</p>
    </div>
    <div class="top">
      
    </div>
    <div class="hot-doctor-content">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for='list in swiper_list'><img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+list.bannerImage"></mt-swipe-item>
        </mt-swipe>
      </div>
      <ul class="doctor-list">
        <router-link v-for= 'list in hot_doctor_list' :to="{path:'/detail',query: {id:list.id}}">
          <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+list.headImage">
          <i>{{list.realName}}</i>
          <p>{{list.technicalPost}}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'hot-doctor',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hot_doctor_list:[],
      swiper_list:[]
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.hot_doctor_footer_hide()
    this.query_doctor_list()
    this.query_swiper()
  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    back:function(){
      this.$router.go(-1)
    },
    hot_doctor_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-100000'
    },
    query_doctor_list:function(){
      var vm = this
      this.$http.post('/traditionalChineseMedicine/doctor/queryDoctors',{
        showType:'0',
        doctorType:"1",
        currentPage:'1',
        pageSize:'10'
      },{emulateJSON:true}).then(function(res){
        console.log(res.body)
        vm.hot_doctor_list=res.body.data.data
      },function(e){
        console.log(e)
      })
    },
    query_swiper:function(){
      this.$http.post('/traditionalChineseMedicine/information/queryBanner',{
        state:'1'
      },{emulateJSON:true}).then(function(res){
        console.log(res,'||||||||||||||')
        this.swiper_list = res.body.data
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
.hot-doctor
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .hot-doctor-header
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
  .hot-doctor-content
    width 100%
    overflow hidden
    overflow-y auto
    .banner
      width 100%
      height 3.2rem
      img
        width 100%
        height 100%
    ul.doctor-list
      box-sizing border-box
      padding 0 0.266667rem
      width 100%
      height auto
      a
        text-decoration none
        width 3.146667rem
        height 3.6rem
        display flex
        flex-direction column
        justify-content space-between
        align-items center
        margin-top 0.4rem
        float left
        color #000
        img
          width 2rem
          height 2rem
          border-radius 2rem
        i 
          font-size 16px
        p
          width 2rem
          height 1.333333rem
          font-size 10px
          overflow hidden
          color #bfbfbf
          text-align center

.footer
  z-index -10
</style>
