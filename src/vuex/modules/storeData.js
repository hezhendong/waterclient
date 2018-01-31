/**
 * Created by Administrator on 2017/8/2.
 */
// 390470198185951232
const state={
  id:'',
  recipe:'',
  medicion:'',
  orderId:'',
  orderType:'',
  addressId:'',
  targetId:'',
  message_box_arr:[],
  is_send_msg:'',
  doctor_realName_name:'',
  im_start:true,
  message_is_has:false

}
const mutations = {
  storeUserId (state,data) {
    state.id=data
    console.log(data,"==-=-=-=--=-=")
  },
  storeMessageHas (state,data) {
    state.message_is_has=data
    console.log(data,"message_is_has")
  },
  storeRecipe (state,data) {
    state.recipe=data
    console.log(data,"==-=-=-=--=-=")
  },
  storeTargetId (state,data){
    state.targetId=data
  },
  storeMedicion (state,data) {
    state.medicion=data
    console.log(data,"==-=-=-=--=-=")
  },
  storeOrderId (state,data) {
    state.orderId=data
    console.log(data,"==-=-=-=--=-=")
  },
  storeOrderType (state,data) {
    state.orderType=data
    console.log(data,'type')
  },
  storeAddressId (state,data) {
    state.addressId=data
    console.log(data,"==-=-=-=--=-=")
  },
  storeMessAge (state,data){
    state.message_box_arr=data
  },
  storeIsSendMsg (state,data){
    state.is_send_msg=data
  },
  storeDoctorName (state,data){
    state.doctor_realName_name=data
  },
  storeImStart (state){
    state.im_start=false
  }
}
const actions = {
  checkout ({ commit, state }, products) {
    console.log(products)
  },
  storeUserInfo ({ commit, state }, data) {
    // console.log(products)
    var localstorage = window.localStorage
    var data_json = JSON.stringify(data)
    localstorage.setItem('medicine',data_json)
  },
  gainUserInfo ({ commit, state }) {
    var localstorage = window.localStorage
    var local = JSON.parse(localstorage.getItem("medicine")).id
    // return local
    console.log(local)
  },
  dateShell ({ commit, state },longTypeDate){  
     var dateTypeDate = "";  
     var date = new Date(longTypeDate);  
     dateTypeDate += date.getFullYear();   //年  
     dateTypeDate += "-" + (date.getMonth()+1); //月   
     dateTypeDate += "-" + date.getDate();  //日  
     dateTypeDate += ' '
     dateTypeDate += date.getHours();
     dateTypeDate += ":"+date.getMinutes();
     dateTypeDate += ":"+date.getSeconds();
     return dateTypeDate;  
  }
}
export default {
  state,
  mutations,
  actions
}
