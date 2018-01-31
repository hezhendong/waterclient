
<template>
  <div class="evaluation">
    <ul>
      <li v-for='list in evaluation_list'>
        <div class="evaluation-box">
          <div class="left">
            <span>{{list.realName}}</span><br/>
            <span>{{list.creationTime}}</span>
          </div>
          <div class="right">
            <el-rate v-model="list.score" disabled></el-rate>
          </div>
        </div>
        <p>{{list.content}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'evaluation',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      evaluation:"妇产科",
      attention:true,
      isSelected:true,
      value1:4,
      evaluation_list:[]
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    console.log(this.$route.query.id)
    this.query_doctor_evaluate()
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
    dateFormatUtil:function (longTypeDate){  
       var dateTypeDate = "";  
       var date = new Date(longTypeDate);  
       dateTypeDate += date.getFullYear();   //年  
       dateTypeDate += "-" + (date.getMonth()+1); //月   
       dateTypeDate += "-" + date.getDate();  //日  
       dateTypeDate += ' '
       dateTypeDate += date.getHours();
       dateTypeDate += ":"+date.getMinutes();
       dateTypeDate += ":"+date.getSeconds();
       return dateTypeDate;  
    },
    query_doctor_evaluate:function(){
      var vm =this
      var doctorId = vm.$route.query.id
      vm.doctor_id = doctorId
      console.log(doctorId,'--------------')
      this.$http.post('/traditionalChineseMedicine/inquiryBill/queryEvaluation',{
        doctorId:doctorId
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        vm.user_ill=res.body.data.specialize
        vm.user_msg=res.body.data.individualResume
       
          
          for(var i=0;i<res.body.data.data.length;i++){
            var obj={};
            obj.creationTime = vm.dateFormatUtil(res.body.data.data[i].creationTime)
            obj.realName = res.body.data.data[i].userinfo.realName
            obj.score = Number(res.body.data.data[i].star)
            obj.content = res.body.data.data[i].comment

            vm.evaluation_list.push(obj)
          }
        console.log(vm.evaluation_list)
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
.evaluation
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  ul
    box-sizing border-box
    width 100%
    height auto
    padding 0 0.266667rem
    li
      width 100%
      height auto
      border-bottom 1px solid #f5f5f5
      margin-top 0.533333rem
      overflow hidden
      div.evaluation-box
        width 100%
        height 0.933333rem
        display flex
        justify-content space-between
        align-items center
        margin-bottom 0.266667rem
      p
        color #c2c2c2
        margin-bottom 0.533333rem
.footer
  z-index -10
</style>
