<template>
  <div class="list" id="app">
    <div class="address-box-header">
      <i class="back icon" @click="back">&#xe737;</i>
      <p>收货地址</p>
    </div>
    <div class="top">
      
    </div>
    <ul>
        <li v-for="(item,index) in list">
            <a>
                  <em class="icon is_selected" @click='selected($event,index,item.id)'>&#xe6ca;</em>
                  <b>
                    <h4><strong>{{item.realName}}</strong><strong>{{item.phoneNumber}}</strong></h4>
                    <p>{{item.province}}{{item.city}}{{item.district}}{{item.detailedAddress}}</p>
                  </b>
                  <span><router-link :to="{path:'/addaddress',query: {id:item.id}}">编辑</router-link></span>
                <i @click="del(item.content,index,item.id)" class="icon"><b>&#xe632;</b>
                删除</i>
            </a>

        </li>
        
    </ul>
    <div class="btn-addAddress"><router-link to="/addaddress">添加收货地址</router-link></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
import { MessageBox } from 'mint-ui';
 export default {
     data() {
     return {
        list:[
              
            ],
            expansion : null,
     }
    
     },
     mounted(){
      
      this.query_address_list()
      this.address_footer_hide()
      var that = this
      
     },
     watch:{
      list:function(){
        this.$nextTick(function(){
          this.init()
        })
      }
     },
     methods:{
      ...mapMutations([
          'storeOrderId','storeOrderType','storeAddressId'
        ]),
        address_footer_hide:function(){
          document.getElementById('footer').style.zIndex='-10000'
        },
        back:function(){
          this.$router.go(-1)
        },
         init:function(){
          var $this=this;                           //将$this保存 区分以下触发事件的this
            var container = document.querySelectorAll('.list li a');
            for(var i = 0; i < container.length; i++){                          //为每个特定DOM元素绑定touchstart touchmove时间监听 判断滑动方向
                var x,  X;
                container[i].addEventListener('touchstart', function(event) {   //记录初始触控点横坐标
                    x = event.changedTouches[0].pageX;
                });
                container[i].addEventListener('touchmove', function(event){
                    X = event.changedTouches[0].pageX;                          //记录当前触控点横坐标
                    if($this.expansion){                                       //判断是否展开，如果展开则收起
                        $this.expansion.className = "";
                    }     
                    if(X - x > 10){                                             //右滑
                        this.className = "";                                    //右滑收起
                    }
                    if(x - X > 10){                                             //左滑
                        this.className = "swipeleft";                           //左滑展开
                        $this.expansion = this;
                    }
                });
            }
         },
         del:function(name,idx,id){
                
                var vm = this
                MessageBox.confirm('确定执行此操作?').then(action => {
                  vm.list.splice(idx,1);                                        //删除List这条数据 DOM随之更新渲染
                  var container = document.querySelector('.swipeleft');           //将展开的DOM归位 除掉样式类
                      container.className="";
                      vm.expansion=null;
                      vm.$http.post('/traditionalChineseMedicine/userinfo/deleteAdress',{
                        id:id
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
                            message: '删除成功',
                            position: 'center',
                            duration: 1000
                          });
                        }
                      },function(e){
                        console.log(e)
                      })
                  });
                
            },
        selected:function(e,index,id){
          var is_selected = document.querySelectorAll('.list li a .is_selected');
          console.log(is_selected)
          for(var i=0;i<is_selected.length;i++){
            is_selected[i].style.color = '#bbb'
          }
          e.target.style.color="#faa315"
          this.storeAddressId(id)
          this.$router.push('/pay')
        },
        query_address_list:function(){
          console.log(this.$store,"你好我是你的id")
          var localstorage = window.localStorage
          var userinfo = JSON.parse(localstorage.getItem('medicine')).id
          var vm = this
          this.$http.post("/traditionalChineseMedicine/userinfo/queryAddressByUserId",{
            userinfoId:userinfo
          },{emulateJSON:true}).then(function(res){
            console.log(res)
            vm.list = res.data.data
            this.init()
          },function(e){
            console.log(e)
          })
        }
     }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.list{
overflow:hidden;
margin-top:.2rem;
border-top:1px solid #ddd;
width :100%;
height :auto;
background-color:#fff;
}
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
.list li{
  overflow:hidden;
  width:120%;
  border-top:1px solid #ddd;
  border-bottom:1px solid #ddd;
  height:2.266667rem
}
.list li a{
  display:block;
  height:2.266667rem;
  -webkit-transition:all 0.3s;
  transition:all 0.3s;
  color:#bbb;
  em{
    display:inline-block;
    width:1.146667rem;
    height :100%;
    line-height:2.266667rem;
    text-align:center;
    float:left;
  }
  b{
    display:inline-block
    height:100%;
    float:left;
    h4{
      font-size:18px;
      height:1.12rem;
      line-height:1.12rem;
      display:flex;
      justify-content:space-between;
    }
    p{
      width:6.213333rem;
      font-size:14px;
    }
  }
  span{
    display:inline-block;
    width:1.333333rem;
    height:0.613333rem;
    border-radius:0.613333rem;
    color:#fff;
    background-color:#68b6db;
    text-align:center;
    line-height:0.613333rem;
    float:left;
    margin-top:0.76rem;
    margin-left:0.5rem;
    a{
      color:#fff;
    }
  }
}
.list li i{
  float:right;
  width:15%;
  background:#E2421B;
  color:#fff;
  height:100%;
  display:flex;
  line-height:0;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  b{
    height:16px;
    margin-bottom:4px;
  }
}
.swipeleft{
  transform:translateX(-15%);
  -webkit-transform:translateX(-15%);
}
.btn-addAddress
  width 4.266667rem
  height 0.88rem
  text-align center
  line-height 0.88rem
  background-color #607d8b
  border-radius 0.88rem
  color #fff
  margin 0 auto
  margin-top 2.666667rem
  a
    color #fff
    text-decoration none
</style>

      