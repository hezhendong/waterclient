<template>
  <div class="recipe-add">
    <div class="recipe-add-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>新增配药方</p>
    </div>
    <div class="top">
      
    </div>
    <div class="recipe-add-content">
      <h4>方名</h4>
      <div class="recipe-name">
        <input type="text" v-model='recipe_name' placeholder="请输入配方名"  name="">
      </div>
      <h4>处方 <span @click="to_add_medicion">编辑</span>  </h4>
      <div class="recipe-detail">
        <i v-for='i in medicion_arr_all'><span>{{i.medicineName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{i.count}}克</i>
      </div>
      <div class="recipe-count">
        <span>剂数</span><i><input type="text" v-model="account" name="" @blur='gain_computed_price'></i>
      </div>
      <div class="recipe-price">
        <span>总价格</span>￥<i><input type="text" v-model="computed_price" name="" readonly="readonly"></i>
      </div>
      <div class="recipe-img">
        <p>医生处方照片 <i>上传医生开的处方照片</i></p>
        <label for="upload-recipe-img" v-if="!upload_success"><img src="../inquiry/add.png"></label>
        <input type="file" id="upload-recipe-img" @change="upload_img_recipe($event)" name="">
        <img :src="upload_img" style="margin-left:25%;width:50%;height:auto;" v-if="upload_success">
      </div>
      <form id="form" ref="form"></form>
      <div class="btn-dosage" @click="add_recipe">完成</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'recipe-add',
  data () {
    return {
      attention:true,
      isSelected:true,
      remnant:"500",
      number:0,
      desc:"",
      arr:[],
      recipe_name:'',
      medicion_arr_all:[],
      upload_img:'',
      upload_success:false,
      pictrue:null,
      account:1,
      json_data:'',
      all_price:0,
      computed_price:0
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.recipe_footer_hide()
    if(this.$store.state.data.recipe){
      this.recipe_name = this.$store.state.data.recipe
    }else{
      this.recipe_name=''
    }
    var vm = this
    console.log(this.$store.state.data.medicion,"-------------")
    if(this.$store.state.data.medicion){
      var medicion_arr = this.$store.state.data.medicion.split('_')
      console.log(medicion_arr)
      var next_arr = []
      for(let i=0;i<medicion_arr.length;i++){
        console.log(medicion_arr[i])
        var ll=medicion_arr[i]
        console.log(JSON.parse(ll))
        next_arr.push(JSON.parse(ll))
        console.log(ll,ll.count,'||||||||||')
        vm.all_price+=Number(JSON.parse(ll).price)*Number(JSON.parse(ll).count)
        this.computed_price=Number(this.all_price)*Number(this.account)
      }

      console.log()
      this.json_data = JSON.stringify(next_arr)
      this.medicion_arr_all = next_arr

    }
    
  },
  updated () {

    
  },
  watch : {

  },
  methods : {
    gain_computed_price:function(){
      if(this.account){
        this.computed_price=Number(this.all_price)*Number(this.account)
      }
    },
    ...mapActions([
        'checkout'
      ]),
    ...mapMutations([
        'storeRecipe','storeMedicion','storeOrderType'
      ]),
    back:function(){
      this.$router.go(-1)
    },
     createImage:function(file) {
       var image = new Image();
       var reader = new FileReader();
       var vm = this;

       reader.onload = (e) => {
            vm.upload_img = e.target.result;
            console.log(e.target.result)
       };
           reader.readAsDataURL(file);
    },
    upload_img_recipe:function(e){
      this.upload_success=true
      this.createImage(e.target.files[0])
      this.pictrue = e.target.files[0]
     },
    recipe_footer_hide:function(){
      document.getElementById('footer').style.zIndex="-10000"
    },
    to_add_medicion:function(){
      this.storeRecipe(this.recipe_name)
      this.$router.push('/addmedicion')
    },
    changeText:function(){
      this.attention=!this.attention

    },
    add_recipe:function(){
      var vm = this
      console.log(vm.$refs)
      var userInfoId = JSON.parse(window.localStorage.getItem('medicine')).id

      console.log("ppp",vm.$refs.form)
      console.log(userInfoId,"用户id")
      var form = new FormData(vm.$refs.form)
      form.append('pic',vm.pictrue)
      form.append('userinfoId',userInfoId)
      form.append('title',vm.recipe_name)
      form.append('count',vm.account)
      form.append('json',vm.json_data)
      this.$http.post('/traditionalChineseMedicine/userinfo/savePrescriptionSelf',form,{emulateJSON:true}).then(function(res){
        console.log(res)
        if(res.errcode){
          Toast({
            message: res.msg,
            position: 'center',
            duration: 1000
          });
        }else{
          Toast({
            message: '保存成功',
            position: 'center',
            duration: 1000
          });
          vm.storeRecipe('')
          vm.storeMedicion('')
          vm.storeOrderType('1')
          vm.$router.push('/checkrecipe?id='+res.body.data.id)
        }
      },function(e){
        console.log(e)
      })
    }
     
  },
  components: { 
    // 'v-scroll':Scroll
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.recipe-add
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .recipe-add-header
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
  .recipe-add-content
    width 100%
    overflow hidden
    overflow-y auto
    h4
      width 100%
      height 0.853333rem
      line-height 0.853333rem
      font-size 14px
      background #f5f5f5
      box-sizing border-box
      padding 0 0.266667rem
      span
        float right
        color #faa315
    div.recipe-detail
      box-sizing border-box
      width 100%
      height auto
      padding 0 0.266667rem
      overflow hidden
      i
        display inline-block
        line-height 0.8rem
        margin-right 0.533333rem
        
        span
          font-size 18px
    div.recipe-count
      box-sizing border-box
      width 100%
      height 1.333333rem
      padding 0 0.266667rem
      span  
        width 1.866667rem
        font-size 0.373333rem
      i
        width 1.733333rem
        height 0.666667rem
        text-align center
        line-height 0.666667rem
        border 1px solid #bbb
        border-radius 8px
        input
          width 100%
          height 100%
          border none
          outline none
          text-align center
    div.recipe-price
      box-sizing border-box
      width 100%
      height 1.333333rem
      padding 0 0.266667rem
      span  
        width 1.5rem
        font-size 0.373333rem
      i
        width 1.733333rem
        height 0.666667rem
        text-align center
        line-height 0.666667rem
        border 1px solid #bbb
        border-radius 8px
        input
          width 100%
          height 100%
          border none
          outline none
          text-align center
    div.recipe-name
      box-sizing border-box
      width 100%
      height 1.333333rem
      padding 0 0.266667rem
      input
        width 100%
        height 1.333333rem
        border none
        outline none
    div.recipe-img
      box-sizing border-box
      width 100%
      height auto
      overflow hidden
      padding 0 0.266667rem
      border-top 7px solid #f5f5f5
      p
        line-height 1.04rem
        font-size 16px
        i
          font-size 14px
          color red
      img
        width 2.133333rem
        height 2.133333rem
      input
        display none
    div.btn-dosage
      width 4.266667rem
      height 0.88rem
      border-radius 0.88rem
      background #607d8b
      text-align center
      line-height 0.88rem
      color #fff
      margin 0 auto
      margin-top 2rem
      margin-bottom 1rem
.footer
  z-index -10
</style>

      