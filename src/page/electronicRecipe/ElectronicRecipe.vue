<template>
  <div class="electronic">
    <div class="electronic-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>电子处方</p>
    </div>
    <div class="top">
      
    </div>
    <div class="electronic-content">
      <h4>患者</h4>
      <div class="user-msg">
        <span>{{userName}}</span>
        <i>{{sex}}</i>
        <i>{{age}}</i>
      </div>
      <h4>诊断</h4>
      <div class="result">
        {{diagnose}}
      </div>
      <h4>处方</h4>
      <div class="electronic-recipe">
        <div class="medicine">
          <i v-for='list in doctor_recipe_arr'>{{list.medicineName}}&nbsp;&nbsp;{{list.count}}克</i>
        </div>
        <div class="count">
          <span>
            剂数&nbsp;&nbsp;&nbsp;&nbsp;<b>{{count}}</b>
          </span>
          <span>药价： <em>￥{{totalPrice}}</em></span>
        </div>
      </div>
      <h4>煎服法</h4>
      <div class="methord">
          {{usage1}}
      </div>
      <h4>医嘱</h4>
      <div class="doctor-entrust">
        {{advice}}
      </div>
      <div class="btn-dosage" @click='doctor_to_pay'>去配药</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'electronic',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      electronic:"妇产科",
      attention:true,
      isSelected:true,
      remnant:"500",
      number:0,
      desc:"",
      doctor_recipe_arr:[],
      creationTime:'',
      totalPrice:'',
      count:'',
      advice:'',
      diagnose:'',
      usage1:'',
      userName:'',
      sex:'',
      age:''
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.electronic_footer_hide()
    this.query_doctor_recipe()
    this.storeOrderId(this.$route.query.id)
    this.storeOrderType(this.$route.query.type)
  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    ...mapMutations([
        'storeOrderId','storeOrderType'
      ]),
    changeText:function(){
      this.attention=!this.attention

    },
    dateShell:function(longTypeDate){  
     var dateTypeDate = "";  
     var date = new Date(longTypeDate);  
     dateTypeDate += date.getFullYear();   //年  
     dateTypeDate += "-" + (date.getMonth()+1); //月   
     dateTypeDate += "-" + date.getDate();  //日  
     // dateTypeDate += ' '
     // dateTypeDate += date.getHours();
     // dateTypeDate += ":"+date.getMinutes();
     // dateTypeDate += ":"+date.getSeconds();
     return dateTypeDate;  
    },
    back:function(){
      this.$router.go(-1)
    },
    electronic_footer_hide:function(){
      document.getElementById('footer').style.zIdex="-1000"
    },
    doctor_to_pay:function(){
      var vm = this
      this.$router.push('/pay?id='+vm.$route.query.id+'&type='+vm.$route.query.type)
    },
    query_doctor_recipe:function(){
      var vm= this
      this.$http.post('/traditionalChineseMedicine/inquiryBill/queryUserinfoPrescriptionById',{
            id:vm.$route.query.id
          },{emulateJSON:true}).then(function(res){
            console.log(res)

            this.doctor_recipe_arr = res.body.data.list 
            this.createTime =this.dateShell(res.body.data.creationTime)
            var count_money = 0
            for(var i=0;i<res.body.data.list.length;i++){
              count_money+=res.body.data.list[i].price*res.body.data.list[i].count
            }
            vm.totalPrice = count_money*res.body.data.count 
            vm.count = res.body.data.count 
            vm.doctor_Id = res.body.data.doctorId
            vm.diagnose = res.body.data.diagnose
            vm.usage1 = res.body.data.usage1
            vm.advice = res.body.data.advice
          },function(e){
            console.log(e)
          })
        var localstorage = window.localStorage

        vm.userName = JSON.parse(localstorage.getItem('medicine')).realName
        if(JSON.parse(localstorage.getItem('medicine')).sex){
          vm.sex = '男'
        }else{
          vm.sex = '女'
        }
        
        vm.age = JSON.parse(localstorage.getItem('medicine')).age
    }
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.electronic
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  -webkit-overflow-scrolling touch
  position relative
  .electronic-header
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
    span 
      position absolute
      right 0.266667rem
      top 0
      height 100%
      line-height 1.173333rem

  .top
    width 100%
    height 1.173333rem
  .electronic-content
    width 100%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding 0 0.266667rem
    h4
      width 100%
      height 0.853333rem
      line-height 0.853333rem
      font-size 14px
      background #f5f5f5
      box-sizing border-box
      padding 0 0.266667rem
    div.user-msg
      box-sizing border-box
      width 100%
      height 1.333333rem
      padding 0 0.266667rem
      display flex
      justify-content center
      align-items center
      background #fff
      span
        width 7.386667rem
        height 0.72rem
        line-height 0.72rem
      i
        width 2.213333rem
        height 0.72rem
        border-left 1px solid #cacaca
        text-align center
        line-height 0.72rem
    div.result
      box-sizing border-box
      width 100%
      height 2.026667rem
      padding 0.266667rem
      background #fff
    div.electronic-recipe
      box-sizing border-box
      width 100%
      height auto 
      overflow hidden
      padding 0.266667rem
      line-height 0.533333rem
      background #fff
      div.medicine
        width 100%
        height auto
        line-height 1.333333rem
        border-bottom 1px solid #f5f5f5
      div.count
        width 100%
        height 1.333333rem
        span
          width 50%
          float left
          display flex
          align-items center
          line-height 1.333333rem
          b
            width 0.8rem
            height 0.5rem
            border-radius 3px
            border 1px solid #cecece
            text-align center
            line-height 0.5rem
          em
            color #faa315
            font-size 16px
    div.methord
      width 100%
      height 2.0rem
      box-sizing border-box
      padding 0 0.266667rem
      background #fff
    div.doctor-entrust
      width 100%
      height 2.0rem
      box-sizing border-box
      padding 0 0.266667rem
      background #fff
    div.btn-dosage
      width 4.266667rem
      height 0.88rem
      border-radius 0.88rem
      background #607d8b
      text-align center
      line-height 0.88rem
      color #fff
      margin 0 auto
      margin-top 0.48rem
      margin-bottom 1rem
.footer
  z-index -10
</style>

      