
<template>
  <div class="inquiry">
    <div class="inquiry-header">
      <i class="back icon" @click="back">&#xe737;</i>
      <p>问诊单</p>
      <span @click="back">取消</span>
    </div>
    <div class="top">
      
    </div>
    <div class="inquiry-content">
     <textarea placeholder="请详细描述性别、年龄、症状、持续时间、已经确诊的疾病以及接诊的医生的意见，我们将确保您的隐私安全" maxlength="200" @input="descInput" v-model="desc"></textarea>
      <i class="number">{{remnant}}/500</i>
      <div class="upload-img">
        <p>上传图片 <i>{{number}}/9</i><span>您上传的图片仅对解答问题的医生可见</span></p>
        <div class="uploadImg">
          <div class="img-box" id="img-box">
              <div class="example">
                <div id="mmm"></div>
                <label for="pic_selector"><img style="width:2.0rem;height:2.0rem" src="./add.png"></label>
                
                <input type="file" id="pic_selector" style="display:none" @change="readFile($event)"  multiple/>
              </div>
              
            </div>
        </div>
      </div> 
      <form ref="inquiry"></form>
      <div class="submit-inquiry" @click="pay_inquiry">立即支付</div>
     
      
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'inquiry',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      inquiry:"妇产科",
      attention:true,
      isSelected:true,
      remnant:"500",
      number:0,
      desc:"",
      arr:[],
      inquiry_fullscreenLoading:false
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
   
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
    changeText:function(){
    	this.attention=!this.attention

    },
    descInput:function(){
     let txtVal = this.desc.length;
     this.remnant = 500 - txtVal;
     },
     readFile:function(e){
        this.number++

        if(this.number<=9){
          this.createImage(e.target.files[0])
          this.arr.push(e.target.files[0])
        }else{
          console.log("taiduole")
        }
     },
     
     createImage:function(file) {
       var image = new Image();
       var reader = new FileReader();
       var vm = this;

       reader.onload = (e) => {
            var result = '<div style="width:2rem;height:2rem;" class="result" ><img style="width:100%;height:100%;" src="'+e.target.result+'" alt=""/></div>';  
           var div = document.createElement('div');  
           div.innerHTML = result;  
           div['className'] = 'float';  
           div.style.float="left"
            div.style.marginRight="15px"
            console.log(div)
           document.getElementById('mmm').appendChild(div);
       };
           reader.readAsDataURL(file);
    },
    pay_inquiry:function(){
      var vm = this
      var loading = weui.loading('loading', {
            className: 'custom-classname'
        });
     
      var localstorage = window.localStorage
      var user_id = JSON.parse(localstorage.getItem('medicine')).id
      var formdata=new FormData(vm.$refs.inquiry)
      formdata.append('userinfo.id',user_id)
      formdata.append('doctor.id',vm.$route.query.id)
      formdata.append('message',vm.desc)
      new Promise(function(resolve,reject){
        for(let i=0;i<vm.arr.length;i++){
          formdata.append('pics',vm.arr[i])
          console.log(vm.arr[i])
        }
        console.log(vm.arr)
        console.log(user_id,vm.$route.query.id,vm.desc)
        resolve(formdata)
      }).then(function(data){

          vm.$http.post('/traditionalChineseMedicine/inquiryBill/saveInquiryBill',data ,{emulateJSON:true}).then(function(res){
          console.log(res)
          if(res.body.errcode){
            Toast({
              message: res.body.msg,
              position: 'center',
              duration: 1000
            });
          }else{
            Toast({
              message: '问诊单录入成功',
              position: 'center',
              duration: 1000
            });
            setTimeout(function(){
              loading.hide();
              vm.$router.push('/payinquiry?id='+vm.$route.query.id+'&inquiryId='+res.body.data.id+'&money=')
            },1000)
          }
          
            
        },function(e){
          console.log(e)
        })
      })
      
      console.log(vm.arr)
        //   vm.$http.post('/traditionalChineseMedicine/inquiryBill/saveInquiryBill',formdata ,{emulateJSON:true}).then(function(res){
        //   console.log(res)
        //     Toast({
        //       message: res.body.msg,
        //       position: 'center',
        //       duration: 1000
        //     });
        //     setTimeout(function(){
        //       vm.$router.push('/payinquiry?id='+vm.$route.query.id+'&money=')
        //     },1000)
        // },function(e){
        //   console.log(e)
        // })
       
      
    },
    
  },
  components: { 
    // 'v-scroll':Scroll
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.inquiry
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .inquiry-header
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
  .inquiry-content
    width 100%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding 0 0.266667rem
    textarea
      width 100%
      height 6rem
      outline none
      border none
    i.number
      float right
    div.uploadImg
      margin-top 0.8rem
      width 100%
      border-top 0.133333rem solid #f5f5f5
      overflow hidden
      p
        font-size 16px
        i
          color red
          margin 0 0.133333rem
        span
          color red
          font-size 14px
    .submit-inquiry
      width 4.266667rem
      height 0.88rem
      margin 0.533333rem auto
      border-radius 0.88rem
      text-align center
      line-height 0.88rem
      background #607d8b
      color #fff
      outline none
      border none
      margin-left 2.5555rem
.footer
  z-index -10
</style>
