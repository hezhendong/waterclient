<template>
  <div class="search_doctor" ref='search_doctor'>
    <div class="search_doctor-header" ref='search_doctor_height'>
      <i class="back icon" @click='back_l'>&#xe737;</i>
      <p>搜索医生</p>
    </div>
    <div class="top"></div>
    <div class="search_doctor-content" ref='search_doctor_content'>
        <!-- <div class="search" @click='input_flag_change'>
          <i class="icon" v-if='input_flag'>&#xe66e;</i><span v-if='input_flag'>搜索</span>
          <input type="search" v-model="search_doctor" name=""  @search='search'>
        </div> -->
        <div class="weui-search-bar" id="searchBar">
          <div class="weui-search-bar__form">
              <div class="weui-search-bar__box">
                  <i class="weui-icon-search"></i>
                  <input type="search" class="weui-search-bar__input" v-model="search_doctor" @search='search' placeholder="搜索" required="">
                  <a href="javascript:" class="weui-icon-clear"></a>
              </div>
              <label class="weui-search-bar__label">
                  <i class="weui-icon-search"></i>
                  <span>搜索</span>
              </label>
          </div>
          <a href="javascript:" class="weui-search-bar__cancel-btn">取消</a>
        </div>
        <div class="for-you-list">
          <ul>
            <router-link v-for="doctor in doctor_list" :to='{path:"detail",query:{id:doctor.id}}'>
              <div class="top">
                <div class="img-box">
                  <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+doctor.headImage">
                </div>
                <div>
                  <h5>
                    <span>{{doctor.realName}}</span>
                    <i>{{doctor.individualResume}}</i>
                    <i>{{doctor.technicalPost}}</i>
                  </h5>
                  <p style="display:flex;">
                    <span style="display:block;height:100%;float:left;width:1.3rem;">擅长：</span>
                    <span>{{doctor.specialize}}</span>
                  </p>
                </div>
              </div>
              <div class="bottom">
                <em class="star_box">
                  <p>{{doctor.score}}分</p>
                  <el-rate v-model="doctor.score"></el-rate>
                </em>
                <i>￥{{doctor.consultingFee}}</i>
              </div>
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
  name: 'search_doctor',
  data () {
    return {
      search_doctor:"",
      input_flag:true,
      office_search_doctor_list:[],
      start_value1:4,
      server_detail:'',
      headImage:'',
      doctor_list:[]
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.search_doctor_footer_hide()
    // this.gain_office_detail()
    // this.computed_content_height()
    // this.getList()
    this.search()
    weui.searchBar('#searchBar');
  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    back_l:function(){
      this.$router.go(-1)
    },
    search_doctor_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-10000'
    },
    input_flag_change:function(){
      var vm = this 
      vm.input_flag = false
      vm.$refs.input_flag.style.display='block'
      vm.$refs.input_flag.focus()
    },
    search:function(){
      var vm = this
      vm.$http.post('/traditionalChineseMedicine/doctor/queryDoctors',{
            showType:"0",
            doctorName:vm.search_doctor,
            state:'1',
            currentPage:'1',
            pageSize:'100'
            },{emulateJSON : true}).then(function (res) {
          console.log(res)
          document.activeElement.blur();
          vm.doctor_list = res.body.data.data
          if(res.body.data.data.length==0){
            Toast({
              position:'center',
              message:"没有您搜索的医生",
              duration:'500'
            })
          }else{
            vm.doctor_list=res.body.data.data
          }
        },function(e){
          console.log(e)
        })
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.search_doctor
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  -webkit-overflow-scrolling touch
  .search_doctor-header
    position fixed
    top 0
    width 100%
    height 1.173333rem
    background-color #607d8b
    color #fff
    z-index 1000000
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
  .search_doctor-content
    position relative
    width 100%
    height 100%
    overflow hidden
    overflow-y auto
    -webkit-overflow-scrolling touch
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
      i
        color f5f5f5
        margin-right 0.2666667rem
      
    .search_doctor_list
      box-sizing border-box
      width 100%
      height auto
      padding 0 0.266667rem
      margin-top 0.7rem
      overflow hidden
      overflow-y auto
      .search_doctor_header
        width 100%
        height 3.013333rem
        display flex
        justify-content space-between
        img
          width 1.733333rem
          height 1.6rem
          border-radius 10px
        div
          width 7.2rem
          h5
            line-height 0.8rem
            font-size 20px
          p
            color #888888
    .for-you
      width 100%
      height 1.6rem
      box-sizing border-box
      padding-left 0.53333rem
      line-height 1.6rem
      font-size 18px
      background #f5f5f5
    .for-you-list
      width 100%
      height auto
      box-sizing border-box
      padding 0 0.23333rem
      ul
        width 100%
        height auto
        a
          width 100%
          height 2.586667rem
          text-decoration none
          color #000
          overflow hidden
          div.top
            width 100%
            height 1.68rem
            div.img-box
              width 1.68rem
              height 1.68rem
              display flex
              justify-content center
              align-items center
              float left
              img
                width 1.253333rem
                height 1.253333rem
                border-radius 1.253333rem
            div
              width 7.466667rem
              height 100%
              float left
              margin-right 0.1rem
              h5
                span
                  font-size 16px 
                i
                  font-size 14px
                  margin-left 0.266667rem
                  color #888888
              p
                color #888888
          div.bottom
            width 100%
            height 1rem
            display flex
            justify-content space-between
            i
              color red
              font-size 20px
              line-height 0.8rem
            em.star_box
              display inline-block
              width 2rem
              position relative
              p
                text-align center
              .el-rate
                position absolute
                top 10px
                span
                  width 15px
                  height 15px
                  i
                    width 15px
                    height 15px
                    font-size 15px
        li
          width 100%
          height 2.586667rem
          text-decoration none
          color #000
          div.top
            width 100%
            height 1.68rem
            div.img-box
              width 1.68rem
              height 1.68rem
              display flex
              justify-content center
              align-items center
              float left
              img
                width 1.253333rem
                height 1.253333rem
                border-radius 1.253333rem
            div
              width 7.466667rem
              height 100%
              float left
              margin-right 0.1rem
              h5
                span
                  font-size 16px 
                i
                  font-size 14px
                  margin-left 0.266667rem
                  color #888888
              p
                color #888888
          div.bottom
            width 100%
            height 0.8rem
            display flex
            justify-content space-between
            i
              color red
              font-size 20px
              line-height 0.8rem
            span
              p
                text-align center
              .el-rate
                height 0.4rem
                margin 0
                padding 0
                margin-top -0.3rem
                span
                  width 0.4rem
                  height 0.4rem
                  margin-right 0.08rem
                  float left
                  top 0
                  i
                    width 0.4rem
                    height 0.4rem
                    font-size 15px
                    float left
                    top 0
.footer
  z-index -10
</style>
