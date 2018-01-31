<template>
  <div class="address-box">
    <div class="address-box-header">
      <i class="back icon" @click="back">&#xe737;</i>
      <p>添加收货地址</p>
    </div>
    <div class="top">
      
    </div>
    <div class="address-box-content">
      <div>
        <span>收货人姓名</span>
        <input type="text" v-model='realName' placeholder="请输入收货人姓名" name="">
      </div>
       <div>
        <span>收货人电话</span>
        <input type="text" placeholder="请输入收货人电话" v-model='phoneNumber' name="">
      </div>
      <p>收货地址</p><br/>
      <div class="address-dist">
        <v-distpicker @selected="onSelected" :province="province" :city="city" :area="area"></v-distpicker>
      </div>
      <textarea placeholder="请填写详细地址" v-model='detailedAddress'>
        
      </textarea>
      <div class="btn-address-box" @click="save_address">
        保存
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
import VDistpicker from 'v-distpicker'
 export default {
     data() {
       return {
          "province": "北京市",
          "city": "北京城区",
          "area": "东城区",
          'realName':"",
          detailedAddress:"",
          phoneNumber:""
       }
    
     },
  mounted(){
    console.log(this.$route.query.id,"地址ID")
    this.address_footer_hide()
  },
  methods : {
     address_footer_hide:function(){
          document.getElementById('footer').style.zIndex='-10000'
        },
    back:function(){
      this.$router.go(-1)
    },
    onSelected(data) {
        // this.address-box = data.province.value+","+data.city.value+","+data.area.value
        console.log(data)
        this.province = data.province.value
        this.city = data.city.value
        this.area = data.area.value
      },
    save_address:function(){
      var localstorage = window.localStorage
      var userinfoId = JSON.parse(localstorage.getItem('medicine')).id
      var vm = this
      if(vm.$route.query.id){
        this.$http.post('/traditionalChineseMedicine/userinfo/saveOrUpdateAddress',{
          userinfoId:userinfoId,
          province:vm.province,
          city:vm.city,
          district:vm.area,
          detailedAddress:vm.detailedAddress,
          realName:vm.realName,
          phoneNumber:vm.phoneNumber,
          state:'0',
          id:vm.$route.query.id
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          if(res.errcode){
            Toast({
              message: res.msg,
              position: 'center',
              duration: 1000
            });
          }else{
            Toast({
              message: '修改成功',
              position: 'center',
              duration: 1000
            });
            setTimeout(function(){
              vm.$router.push('/address')
            },1000)
          }
        },function(e){
          console.log(e)
        })
      }else{
        this.$http.post('/traditionalChineseMedicine/userinfo/saveOrUpdateAddress',{
          userinfoId:userinfoId,
          province:vm.province,
          city:vm.city,
          district:vm.area,
          detailedAddress:vm.detailedAddress,
          realName:vm.realName,
          phoneNumber:vm.phoneNumber,
          state:'0'
        },{emulateJSON:true}).then(function(res){
          console.log(res)
          if(res.errcode){
            Toast({
              message: res.msg,
              position: 'center',
              duration: 1000
            });
          }else{
            Toast({
              message: '添加成功',
              position: 'center',
              duration: 1000
            });
            setTimeout(function(){
              vm.$router.push('/address')
            },1000)
          }
        },function(e){
          console.log(e)
        })
      }
      
    }
  },
   components: { 
    VDistpicker 
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.address-box
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .address-box-header
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
  .address-box-content
    width 100%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding:0 0.266667rem
    div
      width 100%
      height 1.413333rem
      display flex
      align-items center
      input
        border none
        margin-left 0.26667rem
        outline none
    div.address-dist
      width 100%
      height 0.8rem
      select
        width 2.666667rem
        padding 0
        margin 0
        line-height 0
        font-size 14px
        border-radius 0
        height 0.8rem
        margin-right 0.213333rem
        margin-bottom 0.4rem
        line-height 0.8rem
    textarea
      width 100%
      height 1.866667rem
      outline none
    div.btn-address-box
      width 4.266667rem
      height 0.88rem
      line-height 0.88rem
      color #fff
      background #607d8b
      border-radius 0.88rem
      text-align center
      display block
      margin 0 auto
      margin-top 1.333333rem

.footer
  z-index -10
</style>

      