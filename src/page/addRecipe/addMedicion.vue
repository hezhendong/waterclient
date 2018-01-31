<template>
  <div class="medicion-add">
    <div class="medicion-add-header">
      <i class="back icon" @click='back'>&#xe737;</i>
      <p>药物</p>
    </div>
    <div class="top">
      
    </div>
    <div class="medicion-add-content">
      <h4>药物</h4>
      <div class="recipe-name">
        <input type="text" v-model='medicion_name' @focus="init_medicion" placeholder="请输入药物名称" name="">
        <ul class="my_meicion_list" v-if='data_list'>
          <li v-for='list in medicion_lists' @click='add_medicion_classify(list.price,list.medicinalName)' >
            {{list.medicinalName}}
          </li>
        </ul>
        <span @click="query_medicion_list">确定</span>
      </div>
      <div class="recipe-detail">
        <table>
          <thead>
            <tr>
              <td>药物</td>
              <td>剂量</td>
              <td>单价</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for='list in new_list' class="recipe-list">
              <td width="30" class="medicine_name">{{list.medicineName}}</td>
              <td width="40"><input type="text" v-model='list.count' class="medicion_count" name="">克</td>
              <td width="40"><i class="medicion_price">{{list.price}}</i>元</td>
              <td width="10" @click="remove_this_list($event)" style="color:#ffaa00">X</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-dosage" @click='gain_recipe_medicion'>完成</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'medicion-add',
  data () {
    return {
      attention:true,
      isSelected:true,
      remnant:"500",
      number:0,
      desc:"",
      arr:[],
      medicion_arr:[],
      medicion_name:'',
      new_list:[],
      last_arr:[],
      medicion_lists:[],
      data_list:false
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.recipe_footer_hide()
  },
  created () {

  },
  updated(){
    // console.log()
    this.new_list = this.medicion_arr
  },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    ...mapMutations([
        'storeMedicion'
      ]),
    back:function(){
      this.$router.go(-1)
    },
    recipe_footer_hide:function(){
      document.getElementById('footer').style.zIndex="-10000"
    },
     add_medicion_classify:function(price,name){
      console.log(price,name)
      var obj = {}
      var vm = this
      obj.medicineName=name
      obj.count = ''
      obj.price =price
      vm.medicion_arr.push(obj)
      console.log(vm.medicion_arr)
      vm.data_list=false
     },
     remove_this_list:function(e){
      console.log(e.target.parentNode)
      e.target.parentNode.remove()
      this.last_arr=[]
     },
     init_medicion:function(){
      this.medicion_name=''
     },
     gain_recipe_medicion:function(){
      var all_medicion = document.querySelectorAll(".recipe-list")
      
      for(var i=0;i<all_medicion.length;i++){
        var obj={}
        var vm = this
        obj.medicineName = all_medicion[i].getElementsByClassName('medicine_name')[0].innerHTML
        obj.price = all_medicion[i].getElementsByClassName('medicion_price')[0].innerHTML
        obj.count =  all_medicion[i].getElementsByClassName('medicion_count')[0].value
        obj = JSON.stringify(obj)
        vm.last_arr.push(obj)
        console.log(vm.last_arr)
      }
      console.log(vm.last_arr)
      var lll = vm.last_arr
      var arr_string = lll.join("_")
      console.log(arr_string)
      vm.storeMedicion(arr_string)
      vm.$router.push('/addrecipe')
     },
     query_medicion_list:function(){
      var vm =this
      this.$http.post('/traditionalChineseMedicine/information/queryMedicinalMaterials',{
        currentPage:'1',
        medicinalName:vm.medicion_name,
        pageSize:'10',
        medicinalMaterialsType:'-1'
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        if(res.errcode){
          Toast({
              message: res.msg,
              position: 'center',
              duration: 1000
            });
        }else{
          if(res.body.data.data.length==0){
            Toast({
              message: '你输入的药材不存在',
              position: 'center',
              duration: 1000
            });
            vm.medicion_name=''
          }else{
            console.log(res.body.data.data)
            vm.data_list=true
            vm.medicion_lists = res.body.data.data
          }
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
<style lang="stylus" rel="stylesheet/stylus">
.medicion-add
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  -webkit-overflow-scrolling touch
  position relative
  .medicion-add-header
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
  .medicion-add-content
    width 100%
    height auto
    overflow hidden
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
      overflow hidden
      padding 0 0.266667rem
      border-top 5px solid #f5f5f5
      table
        width 100%
        height auto
        thead
          width 100%
          height 0.88rem
          tr
            td
              height 0.88rem
        tbody
          tr
            td
              height 1.306667rem
              input 
                width 1.6rem
                height 0.666667rem
                border-radius 10px
                text-align center
                margin-right 0.266667rem
                outline none
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
    div.recipe-name
      box-sizing border-box
      width 100%
      height 1.333333rem
      padding 0 0.266667rem
      position relative
      input
        width 70%
        height 1.333333rem
        border none
        outline none
      ul.my_meicion_list
        position absolute
        width 40%
        height 4.333333rem
        overflow hidden
        overflow-y auto
        -webkit-overflow-scrolling touch
        background-color #fff
        border 1px solid #bbb
        z-index 1000
        li
          list-style none
          line-height 0.533333rem
          font-size 16px
          box-sizing border-box
          padding 0 0.1rem
          
      span
        width 15%
        height 50%
        background-color #68b6db
        color #fff
        border-radius 0.533333rem
        float right
        margin-top 0.35rem
        text-align center
        line-height 0.666667rem
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
      margin-top 2.66667rem
      margin-botom 1rem
.footer
  z-index -10
</style>

      