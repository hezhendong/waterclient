<template>
  <div class="find-doctor">
    <div class="find-doctor-header">
      <i class="back icon" @click="back">&#xe737;</i>
      <p>找科室</p>
    </div>
    <div class="top">
      
    </div>
    <div class="find-doctor-content">
      <div class="search" @click='show_input'>
        <i class="icon" v-if='!input_show'>&#xe66e;</i><span v-if='!input_show'>搜索</span>
        <input type="text" ref='find_doctor' v-model='doctor_msg' name="" @keydown='search_doctor_list($event)'>
      </div>
      
      <div class="find-doctor-list">
          <div class="list-header" ref='o'>
            按科室找医生
          </div>
          <ul>
            <router-link v-for='list in office_list' :to='{path:"/doctor",query:{id:list.id}}'>
              <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+list.imagePath">
              <div >
                <h5>{{list.title}}</h5>
                <em v-html='list.message'></em>
              </div>
              <span>
                <i class="icon">&#xe606;</i>
              </span>
            </router-link>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'find-doctor',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      doctor_msg:'',
      input_show:false,
      office_list:[],
      search_doctor:''
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.find_doctor_footer_hide()
    // this.search_doctor_list(event)
    this.query_office_list()
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
    find_doctor_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-100000'
    },
    search_doctor_list:function(event){
      console.log(event,'-------------')
      // if(event.keyCode == 13){
      //     var vm = this
      //   vm.$http.post('/traditionalChineseMedicine/doctor/queryDoctors',{
      //     showType:'0',
      //     doctorType:'1',
      //     doctorName:vm.doctor_msg
      //   },{emulateJSON:true}).then(function(res){
      //     console.log(res)
      //   },function(e){
      //     console.log(e)
      //   })
      // }else{}
      
    },
    query_office_list:function(){
      var vm = this
      vm.$http.post('/traditionalChineseMedicine/information/queryDoctorPropertyByHot',{
        hotType:'1',
        state:'0',
        currentPage:"1",
        pageSize:'10'
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        vm.office_list = res.body.data.data
      },function(e){
        console.log(e)
      })
    },
    show_input:function(){
      // var vm = this
      // this.doctor_msg=''
      // vm.input_show = true
      // vm.$refs.find_doctor.style.display='block'
      // vm.$refs.find_doctor.focus()
      
      
      // console.log(this.$refs.o)
      this.$router.push('/doctorname')
    }
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.find-doctor
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .find-doctor-header
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
  .find-doctor-content
    width 100%
    overflow hidden
    overflow-y auto
    .search
      width 100%
      height 0.933333rem
      border-bottom 0.186667rem solid #f5f5f5
      display flex
      justify-content center
      align-items center
      input
        border none
        outline none
        width 80%
        height 100%
        margin-left 0.133333rem
        display none
      i
        color f5f5f5
        margin-right 0.266667rem

    .find-doctor-list
      box-sizing border-box
      width 100%
      height auto
      padding 0 0.266667rem
      .list-header
        width 100%
        height 1rem
        line-height 1rem
        font-size 18px
        border-bottom 1px solid #f5f5f5
      ul
        width 100%
        height auto
        a
          width 100%
          height 2.5rem
          display flex
          justify-content space-between
          align-iems center
          border-bottom 1px solid #f5f5f5
          text-decoration none

          img 
            width 1.9rem
            height 1.9rem
            border-radius 10px
          div
            width 6rem
            h5
              color #000
              line-height 1rem
              font-size 18px
            em
              display block
              height 1rem
              overflow hidden
              color #b0b0b0
              font-size 0.373333rem
              white-space normal!important
              text-overflow ellipsis
              word-wrap break-word
              -webkit-line-clamp 3
              -webkit-box-orient vertical
              line-height 0.5rem
          span
            line-height 2rem
            color #000


.footer
  z-index -10
</style>
