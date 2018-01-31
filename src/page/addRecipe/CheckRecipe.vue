<template>
  <div class="recipe-add">
    <div class="recipe-add-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>配药方</p>
    </div>
    <div class="top">
      
    </div>
    <div class="recipe-add-content">
      <h4>方名</h4>
      <div class="recipe-name">
        {{title}}
      </div>
      <h4>处方 </h4>
      <div class="recipe-detail">
        <i v-for='i in recipe_list'><span>{{i.medicineName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{i.count}}克</i>
      </div>
      <div class="recipe-count">
        <span>剂数    {{count}}</span>
        <span>药价    {{all_money}}</span>
      </div>
      <div class="recipe-img">
        <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+image" style="width:60%;margin-left:20%;height:auto">
      </div> 
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
      count:'',
      all_money:'',
      recipe_list:[],
      title:'',
      recipeId:'',
      image:''
    }
  },
  mounted () {
    
    this.query_byId_recipe()
    this.recipe_add_footer_hide()
  },
  created () {

  },
  methods : {
    back:function(){
      this.$router.go(-1)
    },
    query_byId_recipe:function(){
      var vm = this
      var localstorage = window.localStorage

      this.$http.post('/traditionalChineseMedicine/userinfo/queryPrescriptionSelfById',{
        prescriptionSelfId:vm.$route.query.id
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        vm.recipeId=res.body.data.id
        vm.count = res.body.data.count
        vm.recipe_list = res.body.data.list
        vm.title=res.body.data.title
        var all_money = 0
        for(var i=0;i<res.body.data.list.length;i++){
          all_money+=Number(res.body.data.list[i].count)*Number(res.body.data.list[i].price)
        }
        vm.all_money=all_money*res.body.data.count
        localstorage.setItem('recipe_id',res.body.data.id)
        vm.image = res.body.data.prescriptionPhoto
      },function(e){
        console.log(e)
      })
    },
    recipe_add_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-10000'
    },
    add_recipe:function(){
      var vm = this
      Toast({
        position:'center',
        message:"审核中请耐心等待",
        duration:'1000'
      })
      setTimeout(function(){
          vm.$router.push('/recipe')
      },1000)
      
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
  z-index 1000
  background #fff
  overflow hidden
  overflow-y auto
  -webkit-overflow-scrolling touch
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

      