
<template>
  <div class="rate">
    <div class="rate-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>评价</p>
    </div>
    <div class="top">
      
    </div>
    <div class="rate-content">
     	<h5>本次为您解答的医生是：</h5>
      <div class="doctor-msg">
        <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+imagePath">
        <span>
          <em>{{doctorname}}</em>
          <p><i>{{administrativeOffice}}</i><i>{{technicalPost}}</i></p>
        </span>
      </div>
      <div class="rate-detail">
        <el-rate v-model="value1"></el-rate>
        <textarea placeholder="医生服务好吗？判断建议怎么样？给别的患者留个参考呗" v-model='content'> 
          
        </textarea>
      </div>
      <div class="btn-rate" @click='rate_doctor'>
        提交
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'rate',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      attention:true,
      isSelected:true,
      value1: 4,
      doctorname:'',
      content:'',
      administrativeOffice:'',
      evliation_doctorName:'',
      doctorOffice:'',
      technicalPost:'',
      imagePath:'',
      doctor_rate_id:''

    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.rate_footer_hide()
    this.query_doctor_phone()
  },
  created () {
    console.log(this.value1)
  },
  updated(){
    console.log(this.value1)
  },
  methods : {
    back:function(){
      this.$router.go(-1)
    },
    ...mapActions([
        'checkout'
      ]),
    changeText:function(){
    	this.attention=!this.attention

    },
    rate_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-1000000'
    },
    query_doctor_phone:function(){
      var vm = this
      this.$http.post('/traditionalChineseMedicine/doctor/queryDoctorByPhoneNumber',{
        phoneNumber:vm.$route.query.phone
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        vm.imagePath = res.body.data.headImage
        vm.doctorname = res.body.data.realName
        vm.technicalPost = res.body.data.technicalPost
        vm.administrativeOffice = res.body.data.administrativeOffice
        vm.doctor_rate_id = res.body.data.id
      },function(e){
        console.log(e)
      })
    },
    rate_doctor:function(){
      var vm = this
      var userId = JSON.parse(window.localStorage.getItem('medicine')).id
      console.log(userId,vm.doctor_rate_id,vm.value1,vm.content)
      this.$http.post('/traditionalChineseMedicine/inquiryBill/saveEvaluation',{
        userId:userId,
        doctorId:vm.doctor_rate_id,
        inquiryId:vm.$route.query.id,
        star:vm.value1,
        comment:vm.content
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        if(res.body.errcode){
          Toast({
            position:'center',
            message:res.body.msg,
            duration:'1000'
          })
        }else{
          Toast({
            position:'center',
            message:'评价成功',
            duration:'1000'
          })
          setTimeout(function(){
            vm.$router.push('/index')
          },'1000')
        }
      },function(e){
        console.log(e)
      })
    },
    inquiryId_detai:function(){
      var inquiryId = this.$route.query.id
      this.$http.post('/traditionalChineseMedicine/inquiryBill/queryInquiryBillById',{
        id:inquiryId
      },{emulateJSON:true}).then(function(res){
        console.log(res)
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
.rate
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .rate-header
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
  .rate-content
    width 100%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding 0 0.266667rem
    h5
      width 100%
      height 1.6rem
      line-height 1.6rem
      font-size 18px
    div.doctor-msg
      width 100%
      height 1.6rem
      display flex
      align-items center
      justify-content space-around
      img
        width 0.933333rem
        height 0.933333rem
        border-radius 0.933333rem
      span
        width 8.16rem
        height 100%
        em
          width 100%
          line-height 0.8rem
          font-size 18px
        p
          i
            font-size 12px 
            color #cacaca
            margin-left 0.266667rem
    div.rate-detail
        width 100%
        height auto
        div.el-rate
          width 100%
          height 1.653333rem
          display flex
          justify-content center
          align-items center
          span
            width 0.72rem
            height 0.72rem
            margin-left 0.133333rem
            i
              font-size 0.72rem
        textarea 
          width 100%
          height 3.866667rem
          border 1px solid #cacaca
          outline none
    div.btn-rate
      width 4.266667rem
      height 0.88rem
      text-align center
      line-height 0.88rem
      color #fff
      background #607d8b
      border-radius 0.88rem
      margin 0 auto
      margin-top 1.466667rem
.footer
  z-index -10
</style>
