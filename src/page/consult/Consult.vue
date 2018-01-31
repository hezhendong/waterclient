
<template>
  <div class="consult">
    <div class="consult-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>咨询中心</p>
    </div>
    <div class="top">
      
    </div>
    <div class="consult-content">
     
        <router-link v-for='list in consult_list' :to='{path:"/consultdetail",query:{id:list.id}}'>
          <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+list.imagePath">
          <div>
            <h4>{{list.title}}？</h4>
            <b v-html="list.message"></b>
          </div>
        </router-link>
        
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
import Scroll from '../../components/scroll'
export default {
  name: 'consult',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      consult:"妇产科",
      attention:true,
      isSelected:true,
      consult_list:[],
      listdata:[

      ], // 下拉更新数据存放数组
      downdata:[
//
      ],
      loading1:false,
      counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num : 6,  // 一次显示多少条
      pageStart : 0, // 开始页数
      pageEnd : 0, // 结束页数
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.consult_footer_hide()
    this.gainList()
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
    gainList:function(){
      var vm = this
      vm.$http.post('/traditionalChineseMedicine/information/queryConsult',{
        currentPage:'1',
        pageSize:'1000'
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        vm.consult_list=res.body.data.data
      },function(e){
        console.log(e)
      })
    }
  },
  components: { 
    'v-scroll':Scroll
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
  position relative
  .consult-header
    position fixed
    top 0
    width 100%
    height 1.173333rem
    background-color #607d8b
    color #fff
    z-index 100000
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
    height 100%
    ul
      box-sizing border-box
      width 100%
      padding 0 0.266667rem
      position relative
      height 500px
      overflow-y auto
      position relative
      -webkit-overflow-scrolling touch
    a
      box-sizing border-box
      padding 0 0.2666667rem
      width 100%
      height 2.08rem
      display flex
      justify-content space-between
      margin 0.533333rem 0
      text-decoration none
      color #000
      overflow hidden
      img
        width 2.08rem
        height 2.08rem
        border-radius 10px
      div
        width 6.986667rem
        height 100%
        h4
          height 0.8rem
          font-size 18px
        b
          display block
          color #cacaca
          line-height 0.48rem
          padding 0
          p
            padding 0
            color #cacaca
            word-break:break-all;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            overflow:hidden;


.footer
  z-index -10
</style>
