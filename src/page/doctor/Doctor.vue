<template>
  <div class="doctor" ref='doctor'>
    <div class="doctor-header" ref='doctor_height'>
      <i class="back icon" @click='back_l'>&#xe737;</i>
      <p>{{doctor}}</p>
    </div>
    <div class="top"></div>
    
    <div class="doctor-content" ref='doctor_content'>
        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <!-- <div class="search" @click='input_flag_change'>
          <i class="icon" v-if='input_flag'>&#xe66e;</i><span v-if='input_flag'>搜索</span>
          <input type="search" name="" @search="search_doctor" v-model='doctor_name'  ref='input_flag'>
        </div> -->
        <div class="weui-search-bar" id="searchBar">
          <div class="weui-search-bar__form">
              <div class="weui-search-bar__box">
                  <i class="weui-icon-search"></i>
                  <input type="search" class="weui-search-bar__input" v-model='doctor_name' @search='search_doctor' placeholder="搜索" required="">
                  <a href="javascript:" class="weui-icon-clear"></a>
              </div>
              <label class="weui-search-bar__label">
                  <i class="weui-icon-search"></i>
                  <span>搜索</span>
              </label>
          </div>
          <a href="javascript:" class="weui-search-bar__cancel-btn">取消</a>
        </div>
        <div class="server_introduce">
            <div class="doctor_header">
              <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+headImage">
              <div>
                <h5>{{doctor}}</h5>
                <p v-html='server_detail'></p>
              </div>
            </div>
        </div>
        <div class="for-you">
          为您推荐
        </div>
        <div class="for-you-list">
          <ul>
            <!-- <router-link v-for='list in office_doctor_list' to=''>
              <div class="top">
                <div class="img-box">
                  <img :src="list.headImage">
                </div>
                <div>
                  <h5>
                    <span>{{list.realName}}</span>
                    <i>{{list.administrativeOffice}}</i>
                    <i>{{list.technicalPost}}</i>
                  </h5>
                  <p>
                    {{list.specialize}}
                  </p>
                </div>
              </div>
              <div class="bottom">
                <span>

                </span>
                <i>￥{{list.consultingFee}}</i>
              </div>
            </router-link> -->
            <router-link v-for="list in listdata" :to='{path:"detail",query:{id:list.id}}'>
              <div class="top">
                <div class="img-box">
                  <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+list.headImage">
                </div>
                <div>
                  <h5>
                    <span>{{list.realName}}</span>
                    <i>{{list.administrativeOffice}}</i>
                    <i>{{list.technicalPost}}</i>
                  </h5>
                  <p style="overflow:hidden">
                     <span style="display:block;height:100%;float:left;width:1.3rem;">擅长：</span>
                     <span >{{list.specialize}}</span>
                  </p>
                </div>
              </div>
              <div class="bottom">
                <em class="star_box"> 
                  <!-- <p>{{list.score}}分</p> -->
                  <el-rate v-model="list.score"></el-rate>
                </em>
                <i>￥{{list.consultingFee}}</i>
              </div>
            </router-link>
            <router-link v-for="doctor in downdata" :to='{path:"detail",query:{id:doctor.id}}'>
              <div class="top">
                <div class="img-box">
                  <img :src="'http://47.96.170.156:8380/traditionalChineseMedicine'+doctor.headImage">
                </div>
                <div>
                  <h5>
                    <span>{{doctor.realName}}</span>
                    <i>{{doctor.administrativeOffice}}</i>
                    <i>{{doctor.technicalPost}}</i>
                  </h5>
                  <p>
                    <span style="display:block;height:100%;float:left;width:1.3rem;">擅长：</span>
                     <span >{{list.specialize}}</span>
                  </p>
                </div>
              </div>
              <div class="bottom">
                <em class="star_box">
                  <el-rate v-model="doctor.score"></el-rate>
                </em>
                <i>￥{{doctor.consultingFee}}</i>
              </div>
            </router-link>
          </ul>
        </div>
      </v-scroll>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
import Scroll from '../../components/scroll'
export default {
  name: 'doctor',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      doctor:"",
      input_flag:true,
      office_doctor_list:[],
      start_value1:4,
      server_detail:'',
      headImage:'',
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
      sheetVisible:false,
      doctor_name:''
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.doctor_footer_hide()
    this.gain_office_detail()
    this.computed_content_height()
    weui.searchBar('#searchBar');
    // this.getList()
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
    doctor_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-10000'
    },
    input_flag_change:function(){
      var vm = this 
      vm.input_flag=false
      vm.$refs.input_flag.style.display='block'
      vm.$refs.input_flag.focus()
    },
    gain_office_detail:function(){
      var vm = this
     
      vm.$http.post('/traditionalChineseMedicine/information/queryDoctorPropertyById',{
        id:vm.$route.query.id
      },{emulateJSON:true}).then(function(res){
          console.log(res)
          vm.doctor = res.body.data.title
          vm.server_detail = res.body.data.message
          vm.headImage = res.body.data.imagePath
          console.log(res.body.data.title)
          var page = vm.counter
          vm.$http.post('/traditionalChineseMedicine/doctor/queryDoctors',{
              showType:"0",
              administrativeOffice:res.body.data.title,
              state:'1',
              currentPage:'1',
              pageSize:'6'
              },{emulateJSON : true}).then(function (res) {
            console.log(res,"first")
            vm.loading1 = false
            vm.listdata = res.body.data.data
              if(res.body.data.data.length==0||res.body.data.data.length<6){
                vm.$el.querySelector('.load-more span').innerHTML='无更多数据'
                
              }
              console.log(res)
          })
      },function(e){
        console.log(e)
      })
        
    },
    computed_content_height: function(){
      var content_height = document.getElementById('app').clientHeight
      var top_height = this.$refs.doctor_height.offsetHeight
      console.log(content_height,top_height)
      this.$refs.doctor_content.style.height = content_height-top_height+'px'
    },
      onRefresh(done) {
        //this.getList();

        done() // call done
      },
      onInfinite(done) {
        let vm = this;
        vm.counter++;
        vm.pageEnd = vm.num * vm.counter;
        vm.pageStart = vm.pageEnd - vm.num;
        console.log(vm.counter,"count")
        vm.$http.post('/traditionalChineseMedicine/doctor/queryDoctors',{
              showType:"0",
              administrativeOffice:vm.doctor,
              state:'1',
              currentPage:vm.counter,
              pageSize:'6'
              },{emulateJSON : true}).then(function (res) {
              // if(){

              // }
              let arr = res.body.data.data;
              console.log(res.body.data.data,'|||||||||||||||')
              let i = 0;
              
              let end = res.body.data.data.length;
              console.log(i)
              console.log(end)
              console.log("====")
              for(i; i<end; i++){
                var obj={}
                // obj.id=res.body.data.list[i].id
                // obj.price=res.body.data.list[i].price
                // obj.path ="http://114.215.241.137:7080/watercleanner"+res.body.data.list[i].fileList[0].path
                obj.id = res.body.data.data[i].id
                obj.headImage = res.body.data.data[i].imagePath
                obj.realName = res.body.data.data[i].realName
                obj.technicalPost = res.body.data.data[i].technicalPost
                obj.administrativeOffice = res.body.data.data[i].administrativeOffice
                obj.specialize = res.body.data.data[i].specialize
                obj.consultingFee = res.body.data.data[i].consultingFee
                vm.downdata.push(obj);
                console.log(vm.downdata)
              }
              if(end <6){
                  console.log("9090")
                  vm.$el.querySelector('.load-more span').innerHTML = '已无更多数据';
                  return;
                }
              console.log(vm.downdata)
              done()
          })
      },
      search_doctor:function(e){
        var vm = this
        vm.$http.post('/traditionalChineseMedicine/doctor/queryDoctors',{
            showType:"0",
            administrativeOffice:vm.doctor,
            state:'1',
            doctorName:vm.doctor_name,
            currentPage:'1',
            pageSize:'10'
            },{emulateJSON : true}).then(function (res) {
          console.log(res)
          document.activeElement.blur();
          if(res.body.data.data.length){
            vm.listdata = res.body.data.data
            
          }else{
            Toast({
              position:'center',
              message:'没有您搜索的医生',
              duration:'1000'
            })
          }
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
.doctor
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  .doctor-header
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
  .doctor-content
    position relative
    width 100%
    height 500px
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
      i
        color f5f5f5
        margin-right 0.2666667rem
      
    .server_introduce
      box-sizing border-box
      width 100%
      height auto
      padding 0 0.266667rem
      margin-top 0.7rem
      .doctor_header
        width 100%
        height auto
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
      height 1.4rem
      box-sizing border-box
      padding-left 0.53333rem
      line-height 1.4rem
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
              width 2.2rem
              position relative
              p
                text-align center
                font-size 9px
              .el-rate
                position absolute
                top 0px
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
