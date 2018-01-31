
<template>
  <div class="detail">
    <div class="detail-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>医生详情</p>
    </div>
    <div class="top">
      
    </div>
    <div class="detail-content">
     	<div class="detail-doctor">
     		<img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+header_img">
     		<p>{{doctor_name}}</p>
     		<p><span>{{post}}</span></p>
     		<i @click="changeText" v-if="attention">关注</i>
     		<i @click="return_false_attention" v-if="!attention" style="background:#cecece">取消关注</i>
     	</div>
     	<div class="career">
     		<span>
     			<i style="text-align:center;font-size:0.48rem;">{{years}}</i>
     			<em style="text-align:center">从业年限</em>
     		</span>
     		<img src="./line.png">
     		<span style="text-align:center">
     			<i style="font-size:0.48rem;">{{call_time}}次</i>
     			<em style="text-align:center">回答次数</em>
     		</span>
     		<img src="./line.png">
     		<span>
     			<i style="text-align:center;color:#faa315;font-size:0.48rem;">{{praise}}分</i>
     			<em class="my_rate"><el-rate style="width:100%;display:flex;" id="my_rate_star" disabled v-model="praise"></el-rate></em>
     		</span>
     	</div>
     	<div class="to-other-page">
     		<router-link :to="{path:'/detail/usermsg',query: {id:doctor_id}}" style="line-height:1.066667rem;text-align:center;text-decoration:none">个人信息</router-link>
     		<router-link :to="{path:'/detail/clientevaluation',query: {id:doctor_id}}" style="line-height:1.066667rem;text-align:center;text-decoration:none">用户评价</router-link>
     	</div>
     	<div class="router-box">
     		<router-view></router-view>
     	</div>
     	<div class="btn-pay" @click="to_pay_ask">支付￥{{call_pay}}问医生</div>
      
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'detail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      detail:"妇产科",
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
      call_pay:''
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.detail_footer_hide()
    console.log(this.$store.state.data.id)
    this.query_doctor_msg()
    this.is_attention()
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
    detail_footer_hide:function(){
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
        // // vm.evaluation_list=res.body.data.doctorsTow
        // if(res.body.data.doctor.outpatientAddress){
        //   vm.evaluation_list = res.body.data.doctor.outpatientAddress.split(',')
        // }else{
        //   vm.evaluation_list=['无外出门诊信息']
        // }
        vm.header_img=res.body.data.headImage
        vm.doctor_name=res.body.data.realName
        vm.post=res.body.data.technicalPost
        vm.years=res.body.data.timeLimit
        vm.call_time=res.body.data.answerNumber
        vm.call_pay = res.body.data.consultingFee
        vm.praise=Number(res.body.data.score)
      },function(e){
        console.lgo(e)
      })
    },
    to_pay_ask:function(){
      var vm =this
      var doctorId = vm.$route.query.id
      vm.storeDoctorName(vm.doctor_name)
      this.$router.push("/inquiry?id="+doctorId)
    },
    is_attention:function(){
      var localstorage = window.localStorage
      var userid = JSON.parse(localstorage.getItem('medicine')).id
      var vm = this
      console.log(userid,vm.$route.query.id,'-----------')
      this.$http.post('/traditionalChineseMedicine/userinfo/queryAttentionByUserinfoIdAndDoctorId',{
        userinfoId:userid,
        doctorId:vm.$route.query.id
      },{emulateJSON:true}).then(function(res){
        console.log(res,'is_attention')
        if(res.body.data!==null){
          vm.attention=false
          console.log('|||||||||||||||||||||||||')
        }else{
          vm.attention=true
          console.log('_____________________')
        }
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
.detail
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .detail-header
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
  .detail-content
    width 100%
    overflow hidden
    overflow-y auto
    .detail-doctor
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
          font-size 11px
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
   		height 1.066667rem
   		display flex
   		justify-content space-around
   		a
   			width 1.813333rem
   			text-align center
        text-decoration none
        line-height 1.0666667rem
        color #000
   		a.router-link-active
   			color #ff8400
   			border-bottom 1px solid #ff8400

   	.router-box
   		box-sizing border-box
   		width 100%
   		height auto
   		overflow hidden
   		overflow-y auto
   		padding 0 0.266667rem
   	div.btn-pay
   		position fixed
   		width 4.266667rem
   		height 0.853333rem
   		border-radius 0.853333rem
   		background #607d8b
   		bottom 0.933333rem
   		left 2.8666667rem
   		text-align center
   		line-height 0.853333rem
   		color #fff


.footer
  z-index -10
</style>
