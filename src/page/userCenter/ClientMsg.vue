<template>
  <div class="clientmsg">
    <div class="clientmsg-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>个人信息</p>
    </div>
    <div class="top">
      
    </div>
    <div class="clientmsg-content">
      <div class="user-header">
        <label for='head_image'>
          <i>头像</i>
        <img src="../../../static/header.jpg" v-if='!headPath'>
        <img v-if='headPath' :src="headPath">
        </label>
        <input style="display:none" type="file" name="" @change='select_headImage($event)' id="head_image">
      </div>
      <ul>
        <li>
          <i>姓名</i>
          <span><input type="text" v-model='realName' name=""></span>
        </li>
        <li>
          <i>性别</i>
          <span @click="select_sex"><input type="text" readonly v-model='sex_name' name=""><i class="icon">&#xe606;</i></span>
        </li>
        <li>
          <i>年龄</i>
          <span @click="select_age"><input type="text" v-model='age' name="" readonly> <i class="icon">&#xe606;</i></span>
        </li>
        <li>
          <a @click='to_reset'>
            <i>手机号</i>
          <span><input type="text" readonly="readonly" v-model='phoneNumber' name=""><i class="icon">&#xe606;</i></span>
          </a>
          
        </li>
      </ul>
      <div @click='save_clientMsg' class="btn-save" v-if='has_save'>保存信息</div>
      <form ref='form' style="display:none" v-if='false'></form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
 export default {
     data() {
       return {
         realName:'',
         sex:'',
         phoneNumber:'',
         age:'',
         headPath:'',
         form_data:null,
         userId:'',
         has_save:true,
         sex_name:''
       }
    
     },
  mounted(){
    
    this.gain_localstorage()
    this.clientmsg_footer_hide()
    this.form_data = new FormData(this.$refs.form)
  },
  methods : {
    back:function(){
      this.$router.go(-1)
    },
    select_sex:function(){
      var vm = this
      // 单列picker
      weui.picker([
      {
          label: '男',
          value: 1
      },
      {
          label: '女',
          value: 0
      }
      ], {
         className: 'custom-classname',
         container: 'body',
         defaultValue: [1],
         onChange: function (result) {
             console.log(result)
             
         },
         onConfirm: function (result) {
             console.log(result,'|||||||||')
             vm.sex_name=result[0].label
             vm.sex=result[0].value
         },
         id: 'singleLinePicker'
      });
    },
    select_age:function(){
      var vm = this
      weui.picker([
      {
          label: '1'
      },
      {
          label: '2'
      },
      {
          label: '3'
      },
      {
          label: '4'
      },
      {
          label: '5'
      },
      {
          label: '6'
      },
      {
          label: '7'
      },
      {
          label: '8'
      },
      {
          label: '9'
      },
      {
          label: '10'
      },
      {
          label: '11'
      },
      {
          label: '12'
      },
      {
          label: '13'
      },
      {
          label: '14'
      },
      {
          label: '15'
      },
      {
          label: '16'
      },
      {
          label: '17'
      },
      {
          label: '18'
      },
      {
          label: '19'
      },
      {
          label: '20'
      },
      {
          label: '21'
      },
      {
          label: '22'
      },
      {
          label: '23'
      },
      {
          label: '24'
      },
      {
          label: '25'
      },
      {
          label: '26'
      },
      {
          label: '27'
      },
      {
          label: '28'
      },
      {
          label: '29'
      },
      {
          label: '30'
      },
      {
          label: '31'
      },
      {
          label: '32'
      },
      {
          label: '33'
      },
      {
          label: '34'
      },
      {
          label: '35'
      },
      {
          label: '37'
      },
      {
          label: '38'
      },
      {
          label: '39'
      },
      {
          label: '40'
      },
      {
          label: '41'
      },
      {
          label: '42'
      },
      {
          label: '43'
      },
      {
          label: '44'
      },
      {
          label: '45'
      },
      {
          label: '46'
      },
      {
          label: '47'
      },
      {
          label: '48'
      },
      {
          label: '49'
      },
      {
          label: '50'
      },
      {
          label: '51'
      },
      {
          label: '52'
      },
      {
          label: '53'
      },
      {
          label: '54'
      },
      {
          label: '55'
      },
      {
          label: '56'
      },
      {
          label: '57'
      },
      {
          label: '58'
      },
      {
          label: '59'
      },
      {
          label: '60'
      },
      {
          label: '61'
      },
      {
          label: '62'
      },
      {
          label: '63'
      },
      {
          label: '64'
      },
      {
          label: '65'
      },
      {
          label: '66'
      },
      {
          label: '67'
      },
      {
          label: '68'
      },
      {
          label: '69'
      },
      {
          label: '60'
      },
      {
          label: '71'
      },
      {
          label: '72'
      },
      {
          label: '73'
      },
      {
          label: '74'
      },
      {
          label: '75'
      },
      {
          label: '76'
      },
      {
          label: '77'
      },
      {
          label: '78'
      },
      {
          label: '79'
      },
      {
          label: '80'
      },
      {
          label: '81'
      },
      {
          label: '82'
      },
      {
          label: '83'
      },
      {
          label: '84'
      },
      {
          label: '85'
      },
      {
          label: '86'
      },
      {
          label: '87'
      },
      {
          label: '88'
      },
      {
          label: '99'
      },
      {
          label: '90'
      },
      {
          label: '91'
      },
      {
          label: '92'
      },
      {
          label: '93'
      },
      {
          label: '94'
      },
      {
          label: '95'
      },
      {
          label: '96'
      },
      {
          label: '97'
      },
      {
          label: '98'
      },
      {
          label: '99'
      },
      {
          label: '100'
      }
      ], {
         className: 'custom-classname',
         container: 'body',
         defaultValue: [1],
         onChange: function (result) {
             console.log(result)
             
         },
         onConfirm: function (result) {
             console.log(result,'|||||||||')
             vm.age=result[0].label
         },
         id: 'singleLinePicker'
      });
    },
    clientmsg_footer_hide(){
      document.getElementById('footer').style.zIndex='-100000'
    },
    to_reset:function(){
      var vm =this 
      console.log(vm.sex,'+++++++++++')
      
      var localstorage = window.localStorage
      var user_id = JSON.parse(localstorage.getItem('medicine')).id
      this.form_data.append('id',user_id)
      this.form_data.append('age',vm.age)
      this.form_data.append('sex',vm.sex)
      this.form_data.append('realName',vm.realName)
      console.log(user_id,vm.phoneNumber,vm.age,vm.realName)
      vm.$http.post('/traditionalChineseMedicine/userinfo/updateUserinfo',vm.form_data,{emulateJSON:true}).then(function(res){
        console.log(res)
        var json_msg = JSON.stringify(res.body.data)
        localstorage.setItem('medicine',json_msg)
        localstorage.removeItem('medicine_phone')
        vm.$router.push('/resetphone')
      },function(e){
        console.log(e)
      })
    },
    gain_localstorage:function(){
      var localstorage = window.localStorage
      var vm =this
     
      if(JSON.parse(localstorage.getItem('medicine')).headImage){
        this.headPath = 'http://116.62.136.166:7080/traditionalChineseMedicine'+JSON.parse(localstorage.getItem('medicine')).headImage
      }else{
        this.headPath = '../../../static/header.jpg'
      }
      this.realName = JSON.parse(localstorage.getItem('medicine')).realName
      this.age = JSON.parse(localstorage.getItem('medicine')).age
      if(JSON.parse(localstorage.getItem('medicine')).sex){
        vm.sex_name = '男'
      }else{
        vm.sex_name = '女'
      }
      this.phoneNumber = JSON.parse(localstorage.getItem('medicine')).phoneNumber
      this.userId = JSON.parse(localstorage.getItem('medicine')).id
    },
    select_headImage:function(e){
      console.log(e)
      this.form_data.append('pic',e.target.files[0])
      this.change_base(e.target.files[0])
    },
    change_base:function(file){
      var vm = this
      var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
                // console.log(this.result)
                vm.headPath = this.result
                
        }
    },
    save_clientMsg:function(){
      this.has_save=false
      var vm =this 
      var localstorage = window.localStorage
      var user_id = JSON.parse(localstorage.getItem('medicine')).id
      this.form_data.append('id',user_id)
      this.form_data.append('phoneNumber',vm.phoneNumber)
      this.form_data.append('age',vm.age)
      this.form_data.append('sex',vm.sex)
      this.form_data.append('realName',vm.realName)
      console.log(user_id,vm.phoneNumber,vm.age,vm.realName)
      vm.$http.post('/traditionalChineseMedicine/userinfo/updateUserinfo',vm.form_data,{emulateJSON:true}).then(function(res){
        console.log(res)
        var json_msg = JSON.stringify(res.body.data)
        localstorage.setItem('medicine',json_msg)
        localstorage.removeItem('medicine_phone')
        Toast({
          position:'center',
          message:"修改成功",
          duration:'1000'
        })
        setTimeout(function(){
          vm.$router.push('/usercenter')
        },1000)
      },function(e){
        console.log(e)
      })
    }
  },
   components: { 
   
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.clientmsg
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .clientmsg-header
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
  .clientmsg-content
    width 100%
    height auto
    overflow hidden
    overflow-y auto
    background #fff
    border-top 1px solid #fff
    box-sizing border-box
    padding 0 0.266667rem
    div.user-header
      width 100%
      height 1.466667rem
      label
        width 100%
        height 100%
        display flex
        justify-content space-between
        align-items center
        border-bottom 3px solid #f5f5f5
        img
          width 0.853333rem
          height 0.853333rem
          border-radius 0.853333rem
          float right
    ul
      width 100%
      li
        width 100%
        height 1.333333rem
        display flex
        justify-content space-between
        align-items center
        span
          input
            border none
            outline none
            text-align right
        a
          display block
          width 100%
          height 1.333333rem
          display flex
          justify-content space-between
          align-items center
    div.btn-save
      width 4.266667rem
      height 0.88rem
      border-radius 0.88rem
      line-height 0.88rem
      text-align center
      color #fff
      background #607d8b
      margin 0 auto
      margin-top 2.666667rem
.footer	
  z-index -100
</style>

