
<template>
  <div class="mobiledetail">
    <div class="mobiledetail-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>医生详情</p>
    </div>
    <div class="top">
      
    </div>
    <div class="mobiledetail-content">
     	<div class="mobiledetail-doctor">
     		<img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+header_img">
     		<p>{{doctor_name}}</p>
     		<p><span>{{post}}</span></p>
     		<i @click="changeText" v-if="attention">关注</i>
     		<i @click="return_false_attention" v-if="!attention" style="background:#cecece">取消关注</i>
     	</div>
     	<div class="career">
     		<span>
     			<i style="text-align:center;font-size:18px;">{{years}}</i>
     			<em style="text-align:center">从业年限</em>
     		</span>
     		<img src="./line.png">
     		<span style="text-align:center">
     			<i style="font-size:18px;">{{call_time}}次</i>
     			<em style="text-align:center">回答次数</em>
     		</span>
     		<img src="./line.png">
     		<span>
     			<i style="text-align:center;color:#faa315;font-size:18px;">{{praise}}分</i>
     			<em class="my_rate"><el-rate style="width:100%;display:flex;" id="my_rate_star" disabled v-model="praise"></el-rate></em>
     		</span>
     	</div>
     	<div class="to-other-page" style="box-sizing:border-box;padding:0 0.26667rem;">
         <div>
           <h4 style="line-height:1rem;font-size:18px;">个人简介</h4>
           <p>{{user_msg}}</p>
         </div>
         <div>
           <h4 style="line-height:1rem;font-size:18px;">擅长疾病</h4>
           <p>{{user_ill}}</p>
         </div>
         <div>
           <h4 style="line-height:1rem;font-size:18px;">门诊信息</h4>
           <p v-for='list in address_detail' style="line-height:25px;">{{list}}</p>
         </div>
     	</div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'mobiledetail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mobiledetail:"妇产科",
      attention:null,
      isSelected:true,
      header_img:'',
      doctor_name:"",
      post:'',
      years:"",
      call_time:"",
      praise:null,
      doctor_id:'',
      value1:5,
      evaluation_list:[],
      call_pay:'',
      user_msg:'',
      user_ill:'',
      address_detail:[]
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.mobiledetail_footer_hide()
    // console.log(this.$store.state.data.id)
    this.query_doctor_msg()
    // this.is_attention()
  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    ...mapMutations([
        'storeDoctorName'
      ]),
    changeText:function(){
    	this.attention=false
     
        var vm = this
        var doctorId = vm.$route.query.id
        var localstorage = window.localStorage 
        var user_id = JSON.parse(localstorage.getItem('medicine')).id
        console.log(user_id,doctorId)
        vm.$http.post('/traditionalChineseMedicine/userinfo/attentionDoctor',{
          'userinfo.id':user_id,
          'doctor.id':doctorId
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          Toast({
            message: res.body.msg,
            position: 'center',
            duration: 1000
          });
        },function(e){
          console.log(e)
        })
    },
    return_false_attention:function(){

      var vm = this
        var doctorId = vm.$route.query.id
        var localstorage = window.localStorage 
        var user_id = JSON.parse(localstorage.getItem('medicine')).id
        console.log(user_id,doctorId)
        vm.$http.post('/traditionalChineseMedicine/userinfo/deleteAttenTionDoctor',{
          'userinfoId':user_id,
          'doctorId':doctorId
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          Toast({
            message: res.body.msg,
            position: 'center',
            duration: 1000
          });
          vm.attention = true
        },function(e){
          console.log(e)
        })
    },
    mobiledetail_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-10000'
    },
    back:function(){
      this.$router.go(-1)
    },
    query_doctor_msg:function(){
      var vm =this
      var doctorId = vm.$route.query.id
      vm.doctor_id = doctorId
      console.log(this.doctor_id,'----------------')
      this.$http.post('/traditionalChineseMedicine/doctor/queryDoctorById',{
        doctorId:doctorId
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        vm.header_img=res.body.data.headImage
        vm.doctor_name=res.body.data.realName
        vm.post=res.body.data.technicalPost
        vm.years=res.body.data.timeLimit
        vm.call_time=res.body.data.answerNumber
        vm.call_pay = res.body.data.consultingFee
        vm.praise=Number(res.body.data.score)
        vm.user_ill=res.body.data.specialize
        vm.user_msg=res.body.data.individualResume
        console.log(res.body.data.outpatientAddress)
        if(res.body.data.outpatientAddress){
          vm.address_detail = eval(res.body.data.outpatientAddress)
          console.log(vm.address_detail)
        }else{
          vm.address_detail = ['无门诊信息']
        }
      },function(e){
        console.lgo(e)
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
.mobiledetail
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .mobiledetail-header
    position fixed
    top 0
    width 100%
    height 1.173333rem
    background-color #607d8b
    color #fff
    z-index 10000000000000
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
  .mobiledetail-content
    width 100%
    overflow hidden
    overflow-y auto
    .mobiledetail-doctor
    	width 100%
    	height 4.72rem
    	background #dcf4ff
    	display flex
    	flex-direction column
    	justify-content space-around
    	align-items center
    	img 
    		width 1.866667rem
    		height 1.866667rem
    		border-radius 1.866667rem
    	i
    		width 2.133333rem
    		height 0.453333rem
    		border-radius 0.453333rem
    		background #607d8b
    		color #fff
    		text-align center 
    		line-height 0.453333rem
    .career
    	width 100%
    	height 1.333333rem
    	display flex
    	justify-content center
    	align-items center
    	border-bottom 0.133333rem solid #f5f5f5
    	span
    		width 33.3%
    		height 0.8rem
    		display flex
    		flex-direction column
    		justify-content center
    		align-items center
        i
          text-align center  
        em.my_rate
          display block
          height 100%
      #my_rate_star
        display flex
        justify-content center
        span
          width 20px
          height 100%
    	img
    		width 1px
    		height 0.8rem
   	.to-other-page
   		width 100%
   		height auto
      div 
        width 100%
        height auto
        h4
          line-height 1rem
          font-size 18px
</style>
