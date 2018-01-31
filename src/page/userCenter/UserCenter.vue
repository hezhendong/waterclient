<template>
  <div id="user_center">
    <div class="user_center-header">
      <p>个人中心</p>
    </div>
    <div class="top">
      
    </div>
    <div class="user_center-content">
      <router-link to='/clientmsg' class="user-header" >
      	<img :src="headPath">
      	<p style="margin-top:0.2rem">{{realName}}</p>
      	<p style="margin-top:0.2rem">{{phoneNumber}}</p>
      </router-link>
      <div class="myOrder">
      	<p>我的订单</p>
      	<ul>
      		
      		<em style="margin:0;padding:0;">
      			<router-link to='/order?id=1' style='color:#000'>
      				<img src="./loadsend.png">
      				<span>待发货</span>
      			</router-link>
      		</em>
      		<em style="margin:0;padding:0;">
      			<router-link to='/order?id=2' style='color:#000'>
      				<img src="./loadaccept.png">
      				<span>待收货</span>
      			</router-link>
      		</em>
      		<em style="margin:0;padding:0;">
      			<router-link to='/order?id=3' style="color:#000">
      				<img src="./success.png">
      				<span>已完成</span>
      			</router-link>
      		</em>
      		<em style="margin:0;padding:0;">
      			<router-link to='/order?id=4' style="color:#000">
      				<img src="./allorder.png">
      				<span>售后</span>
      			</router-link>
      		</em>
      	</ul>
      </div>
      <ul class="other-select">
      	<li>
      		<router-link to='/recipe' style="color:#000">
      			<img src="./myorder.png">
      			<span>我的处方</span>
      			<i class="icon">&#xe606;</i>
      		</router-link>
      	</li>
      	<li>
      		<router-link to='/recommend' style="color:#000">
      			<img src="./recommend.png">
      			<span>推荐我们</span>
      			<i class="icon">&#xe606;</i>
      		</router-link>
      	</li>
      	<li>
      		<router-link to='/opinion' style="color:#000">
      			<img src="./feek.png">
      			<span>意见反馈</span>
      			<i class="icon">&#xe606;</i>
      		</router-link>
      	</li>
      	<li>
      		<router-link to='/aboutus' style="color:#000">
      			<img src="./aboutus.png">
      			<span>关于我们</span>
      			<i class="icon">&#xe606;</i>
      		</router-link>
      	</li>
      	<li>
      		<a style="text-decoration:none" @click='isnt_login'>
      			<img src="./logout.png">
      			<span style='color:#000'>退出登录</span>
      			<i class="icon">&#xe606;</i>
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
 export default {
     data() {
       return {
         headPath:'',
         realName:'',
         phoneNumber:''
       }
    
     },
  mounted(){
    
    this.usercenter_footer_show()
    this.query_usermsg()
  },
  methods : {
    usercenter_footer_show:function(){
       document.getElementById('footer').style.zIndex="10000"
    },
    query_usermsg:function(){
      var localstorage = window.localStorage
      
      if(JSON.parse(localstorage.getItem('medicine')).headImage){
        this.headPath = 'http://116.62.136.166:7080/traditionalChineseMedicine'+JSON.parse(localstorage.getItem('medicine')).headImage
      }else{
        this.headPath = '../../../static/header.jpg'
      }
      this.realName = JSON.parse(localstorage.getItem('medicine')).realName
      this.phoneNumber = JSON.parse(localstorage.getItem('medicine')).phoneNumber
    },
    isnt_login:function(){
      var localstorage = window.localStorage
      localstorage.removeItem('medicine')
      this.$router.push('/login')
    }
  },
   components: { 
   
  },
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
#user_center
  width 100%
  height 100%
  z-index 10
  background #fff
  overflow hidden
  overflow-y auto
  position relative
  .user_center-header
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
  .user_center-content
    width 100%
    height auto
    overflow hidden
    overflow-y auto
    background #f5f5f5
    border-top 1px solid #fff
    .user-header
    	width 100%
    	height 4.0rem
    	display flex
    	flex-direction column
    	justify-content center
    	align-items center
    	background #607d8b
    	img
    		width 1.6rem
    		height 1.6rem
    		border-radius 1.6rem
    	p
    		color #fff
    		font-size 16px  

    .myOrder
    	width 100%
    	height 2.933333rem
    	border-bottom 3px solid #f5f5f5
    	box-sizing border-box
    	padding 0 0.266667rem
    	p
    		line-height 1.066667rem
    	ul
    		width 100%
    		height 1.813333rem
        color red
    		em
    			width 25%;
    			height 100%
          margin 0
          padding 0
    			float left
    			a
	    			display flex
	    			flex-direction column
	    			justify-content center
	    			align-items center
	    			text-decoration none
            span
              color #000
	    			img
	    				width auto
	    				height 0.533333rem
	.other-select
		box-sizing border-box
		padding 0 0.266667rem
		width 100%
		height 13.866667rem
		li
			width 100%
			height 1.333333rem
			border-bottom 0.133333rem solid #f5f5f5
      color #000
			a
				display flex
				justify-content space-between
				align-items center
				img
					width 0.4rem
					height auto
				span
					width 8.453333rem
					line-height 1.333333rem
          color #000
.footer	
  z-index 100
</style>

