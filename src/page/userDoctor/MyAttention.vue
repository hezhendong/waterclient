<template>
  <div class="myAttention">
    <ul>
      <router-link v-for='doctor in attention_doctor' :to="{path:'/detail/usermsg',query:{id:doctor.doctor.id}}">
        <img :src="'http://116.62.136.166:7080/traditionalChineseMedicine'+doctor.doctor.headImage">
        <div>
          <h5>
            {{doctor.doctor.realName}}
          </h5>
          <p>
            <i>{{doctor.doctor.technicalPost}}</i>
            <i>{{doctor.doctor.administrativeOffice}}</i>
          </p>
        </div>
        <span>已关注</span>
      </router-link>
     
    </ul>
    <div style="width:100%;height:1.33333rem"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  name: 'myAttention',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      attention_doctor:[]
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.computed_height()
    this.query_attention_doctor()
  },
  created () {

  },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    computed_height:function(){
      var parent_height = document.getElementsByClassName('userDoctor-content')[0].clientHeight
      var header_height = document.getElementsByClassName('userDoctor-link')[0].clientHeight
    },
    query_attention_doctor:function(){
      var vm = this
      var localstorage = window.localStorage
      var local = JSON.parse(localstorage.getItem("medicine")).id
      this.$http.post('/traditionalChineseMedicine/userinfo/queryMyAttentionOrMyFans',{
        userinfoId:local,
        currentPage:"1",
        pageSize:"10"
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        vm.attention_doctor=res.body.data.data
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
.myAttention
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  ul
    width 100%
    height auto
    a
      display flex
      width 100%
      height 1.466667rem
      border-bottom 1px solid #f5f5f5
      align-items center
      color #000
      text-decoration none
      img
        width 0.96rem
        height 0.96rem
        border-radius 0.96rem
      div
        width 6.8rem
        height 0.96rem
        margin-left 0.5rem
        h5
          line-height 0.666667rem
        p
          font-size 12px
          i
            color #cecece
      span
        font-size 14px
        color #faa315
</style>
