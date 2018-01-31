<template>
  <div class="recipe">
    <div class="recipe-header">
      <i class="back icon" @click="back_center">&#xe737;</i>
      <p>我的处方</p>
      <span @click="to_recipe">配处方</span>
    </div>
    <div class="top">
      
    </div>
    <div class="recipe-content">
      <div class="recipe-link">
        <span :class="{'iSrecipe':recipe_true}" @click="query_my_recipe" >自备良方</span>
        <span :class="{'iSrecipe':!recipe_true}" @click="query_doctor_recipe" >医生配方</span>
      </div>
      <ul v-if='recipe_true'>
        <li style="margin:0">
            <a v-for='(i,index) in my_recipe_list' @click.stop="to_pay_my(i.id,0,i.state)">
                  <strong>
                    <p class="recipe-top">
                      <b>{{i.createTime}}</b>
                      <em>自备良方</em>
                     </p>
                     <div class="recipe-msg">
                       <em class="msg">
                          <b v-for='j in i.list'>{{j.medicineName}}&nbsp;&nbsp;{{j.count}}克&nbsp;&nbsp;&nbsp;&nbsp;</b>
                          
                       </em>
                       <em class="price">
                         <b>￥{{i.one_price}}</b>
                         <b>X{{i.count}}</b>
                       </em>
                     </div>
                     <p class="recipe-bottom">
                        <strong>{{i.state}}</strong>
                        <span>总计：￥{{i.account_price}}</span>
                     </p>
                  </strong>
                  
                <i @click.stop="recipe_del(i.content,index,i.id)" class="icon dele_btn"><b>&#xe632;</b>
                删除</i>
            </a>

        </li>
        
    </ul>
    <ul v-if='!recipe_true'>
        <li style="margin:0;">
            <a v-for='i in doctor_recipe_list' @click="to_pay_doctor(i.id)">
                  <strong>
                    <p class="recipe-top">
                      <b>{{i.creationTime}}</b>
                      <em>医生处方</em>
                     </p>
                     <div class="recipe-msg">
                       <em class="msg">
                          <b v-for='j in i.list'>{{j.medicineName}}&nbsp;&nbsp;{{j.count}}克</b>
                          
                       </em>
                       <em class="price">
                         <b>￥{{i.price}}</b>
                         <b>X{{i.count}}</b>
                       </em>
                     </div>
                     <p class="recipe-bottom">
                        <span>总计：￥{{i.all_pirce}}</span>
                     </p>
                  </strong>
                  
                <i @click="recipe_del(index,id.id)" class="icon dele_btn"><b>&#xe632;</b>
                删除</i>
            </a>

        </li>
        
    </ul>
    
    </div>
  </div>
 
</template>

<script>
import Vue from 'vue'
import { mapActions,mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
import { MessageBox } from 'mint-ui';
export default {
  name: 'recipe',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      recipe:"妇产科",
      attention:true,
      isSelected:true,
      remnant:"500",
      number:0,
      desc:"",
      arr:[],
      recipe_true:true,
      my_recipe_list:[],
      doctor_recipe_list:[]
    }
  },
  mounted () {
    // console.log(this.checkout("ooo"))
    this.recipe_footer_hide()
    this.query_my_recipe()
    // console.log(this.dateShell)
     // this.query_doctor_recipe()
    this.storeOrderId(this.$route.query.id)
    this.storeOrderType(this.$route.query.storeOrderType)
  },
  created () {

  },
  watch:{
      my_recipe_list:function(){
        this.$nextTick(function(){
          this.recipe_init()
          this.computed_btn_height()
        })
      }
     },
  methods : {
    ...mapActions([
        'checkout'
      ]),
    ...mapMutations([
        'storeOrderId','storeOrderType'
      ]),
    back_center:function(){
      this.$router.push('/usercenter')
    },
    recipe_footer_hide:function(){
      document.getElementById('footer').style.zIndex='-100000'
    },
    query_doctor_recipe:function(){
      this.recipe_true = false
      this.doctor_recipe_list=[]
      var vm = this
      var localstorage = window.localStorage
      var userinfo_id = JSON.parse(localstorage.getItem('medicine')).id
      this.$http.post('/traditionalChineseMedicine/inquiryBill/queryPrescriptionBySelf',{
        userinfoId:userinfo_id,
        currentPage:'1',
        state:'-1',
        pageSize:'1000',
      },{emulateJSON:true}).then(function(res){
        console.log(res,'---------------')
        
        for(var i=0;i<res.body.data.data.length;i++){
          var obj = {}
          obj.price = res.body.data.data[i].price
          obj.id = res.body.data.data[i].id
          if(res.body.data.data[i].state==0){
            obj.state = '未够药'
          }else{
            obj.state = '已够药'
          }
          obj.list = res.body.data.data[i].list
          obj.count = res.body.data.data[i].count
          obj.creationTime =vm.dateShell(res.body.data.data[i].creationTime)
          var number_price = 0
          
          obj.all_pirce = res.body.data.data[i].price*res.body.data.data[i].count
          vm.doctor_recipe_list.push(obj)
        }
      },function(e){
        console.log(e)
      })
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
    computed_btn_height:function(){
      var i_height = document.querySelectorAll('.dele_btn');
          for(var j=0;j<i_height.length;j++){
            i_height[j].style.height = i_height[j].parentNode.offsetHeight+'px'
           
          }
    },
     query_my_recipe:function(){
      this.recipe_true = true
      this.my_recipe_list=[]
      var vm = this
      var localstorage = window.localStorage
      var userinfoId = JSON.parse(localstorage.getItem('medicine') ).id
      this.$http.post('/traditionalChineseMedicine/userinfo/queryPrescriptionSelf',{
        userinfoId:userinfoId,
        currentPage:'1',
        pageSize:'1000',
      },{emulateJSON:true}).then(function(res){
        console.log(res)
        
         vm.my_recipe_list=[]
        for(let i=0;i<res.body.data.data.length;i++){
          var obj = {}
          obj.createTime = vm.dateShell(res.body.data.data[i].creationTime)
          obj.list = res.body.data.data[i].list
          var account_money = 0
          for(let j=0;j<res.body.data.data[i].list.length;j++){
            console.log(res.body.data.data[i].list[j])
            console.log(res.body.data.data[i].list[j].price,'00000000000')
            account_money += res.body.data.data[i].list[j].price*res.body.data.data[i].list[j].count
            console.log(res.body.data.data[i].list[j].price,res.body.data.data[i].list[j].count)
          }
          if(res.body.data.data[i].state==1){
              obj.state = '审核中'
          }else if(res.body.data.data[i].state==2){
              obj.state = '审核通过'
          }else if(res.body.data.data[i].state==3){
            obj.state = '审核拒绝'
          }
          obj.one_price = account_money
          obj.id = res.body.data.data[i].id
          console.log(account_money,'--------')
          obj.account_price = account_money*res.body.data.data[i].count
          console.log(account_money)
          obj.count = res.body.data.data[i].count
          vm.my_recipe_list.push(obj)

        }
         console.log(vm.my_recipe_list)
      },function(e){
        console.log(e)
      })
     },
     to_pay_my:function(id,type,state){
      // console.log(id)
      if(state=='审核通过'){
        this.$router.push('/pay?id='+id+'&type=0')
      }else{
          Toast({
            position:'center',
            message:"您现在无法够药",
            duration:'1000'
          })
      }
      
     },
     to_pay_doctor:function(id){
      // console.log(id)
      this.$router.push('/electronicrecipe?id='+id+'&type=1')
     },
     to_recipe:function(){
      this.$router.push('/addrecipe')
     },
     recipe_init:function(){
          var $this=this;                           //将$this保存 区分以下触发事件的this
            var container = document.querySelectorAll('.recipe li a');
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
         recipe_del:function(name,idx,id){
                console.log(id)
                var vm = this
                MessageBox.confirm('确定执行此操作?').then(action => {
                  vm.my_recipe_list.splice(idx,1);                                        //删除List这条数据 DOM随之更新渲染
                  var container = document.querySelector('.swipeleft');           //将展开的DOM归位 除掉样式类
                      container.className="";
                      vm.expansion=null;
                      vm.$http.post('/traditionalChineseMedicine/userinfo/deletePrescriptionSelfById',{
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
  },
  components: { 
    // 'v-scroll':Scroll
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.recipe
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .recipe-header
    position fixed
    top 0
    width 100%
    height 1.173333rem
    background-color #607d8b
    color #fff
    z-index 1000000
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
  .recipe-content
    width 100%
    overflow hidden
    overflow-y auto
    box-sizing border-box
    padding 0 0.266667rem
    .recipe-link
      width 100%
      height 1.066667rem
      display flex
      justify-content space-around
      align-items center
      span
        width 2.666667rem
        height 100%
        text-align center
        line-height 1.06667rem
        color #bbb
      span.iSrecipe
        color #faa315
        border-bottom 1px solid #faa315
    ul
      width 100%
      height auto
     
.footer
  z-index -10
.recipe li{
  overflow:hidden;
  width:120%;
  border-top:1px solid #ddd;
  height:auto;
  margin:0;
}
.recipe li a{
  display:block;
  height:auto;
  -webkit-transition:all 0.3s;
  transition:all 0.3s;
  color:#bbb;
  overflow:hidden;
  border-bottom:5px solid #f5f5f5
  strong{
    width 86%
    display:inline-block
    height:auto;
    float:left;
    background-color #fff
    
    p.recipe-top{
      width:100%;
      font-size:14px;
      em{
        display:inline-block;
        float:right;
        margin-right:0.2666667rem;
        color:#faa315;
      }
    }
    div.recipe-msg{
      width:100%;
      em.msg{
        display:inline-block;
        width:70%;
        float:left;
        color:#666;
        font-size:16px;
      }
      em.price{
        display:inline-block;
        width :30%;

        b{
          display:block;
          text-align :center;
        }
      }
    }
  }
  p.recipe-bottom{
    width:100%;
    overflow:hidden;
    strong{
      float:left;
      color:red;
      width:auto;
    }
    span{
      display:inline-block;
      float:right;
      margin-right:0.266667rem;
      color:red;
      font-size:16px;
    }
  }
}
.recipe li i{
  float:right;
  width:14%;
  background:#E2421B;
  color:#fff;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}
.swipeleft{
  transform:translateX(-14%);
  -webkit-transform:translateX(-14%);
}
</style>

      