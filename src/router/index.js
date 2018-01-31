import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/page/index/Index'
import Login from '@/page/login/Login'
import Reginster from '@/page/reginster/Reginster'
import ResetPassword from '@/page/resetPassword/ResetPassword'
import HotDoctor from '@/page/hotDoctor/HotDoctor'
import FindDoctor from '@/page/findDoctor/FindDoctor'
import Doctor from '@/page/doctor/Doctor'
import DoctorName from '@/page/findDoctor/DoctorName'

import Detail from '@/page/detail/Detail'
import MobileDetail from '@/page/detail/mobileDetail'
import UserMsg from '@/page/detail/UserMsg'
import ClientEvaluation from '@/page/detail/ClientEvaluation'
import Inquiry from '@/page/inquiry/Inquiry'
import PayForConsult from '@/page/payForConsult/PayForConsult'
import PaySuccess from '@/page/paySuccess/PaySuccess'

import BuySuccess from '@/page/buySuccess/BuySuccess'
import Consult from '@/page/consult/Consult'
import ConsultDetail from '@/page/consult/ConsultDetail'
import MobileConsultDetail from '@/page/consult/mobileConsultDetail'

import Rate from '@/page/rate/Rate'
import Recipe from '@/page/recipe/Recipe'
import AddRecipe from '@/page/addRecipe/Addrecipe'
import AddMedicion from '@/page/addRecipe/addMedicion'
import ElectronicRecipe from '@/page/electronicRecipe/ElectronicRecipe'
import Address from '@/page/address/Address'
import AddAddress from '@/page/addAddress/AddAddress'
import EditAddress from '@/page/editAddress/EditAddress'
import Pay from '@/page/pay/Pay'
import PayByAddress from '@/page/payByAddress/PayByAddress'
import PayInquiry from '@/page/pay/PayInquiry'


import UserDoctor from '@/page/userDoctor/UserDoctor'
import MyDoctor from '@/page/userDoctor/MyDoctor'
import MyAttention from '@/page/userDoctor/MyAttention'



import UserCenter from '@/page/userCenter/UserCenter'
import Order from '@/page/userCenter/Order'


import LoadSendDetail from '@/page/userCenter/loadSendDetail'
import LoadAcceptDetail from '@/page/userCenter/loadAcceptDetail'
import AfertSellDetail from '@/page/userCenter/afertSellDetail'
import SuccessOrder from '@/page/userCenter/SuccessOrder'
import LoadAfertSellDetail from '@/page/userCenter/LoadAfertSellDetail'
import PassAfertSellDetail from '@/page/userCenter/PassAfertSellDetail'
import WriteLogistics from '@/page/userCenter/WriteLogistics'
import AboutUs from '@/page/userCenter/AboutUs'
import Opinion from '@/page/userCenter/Opinion'
import Recommend from '@/page/userCenter/Recommend'
import ClientMsg from '@/page/userCenter/ClientMsg'
import ReturnMoney from '@/page/userCenter/ReturnMoney'
import ResetPhone from '@/page/userCenter/ResetPhone'

import Message from '@/page/message/Message'
import Chart from '@/page/message/chart'
import CheckRecipe from '@/page/addRecipe/CheckRecipe'


import Share from '@/page/share/Share'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reginster',
      name: 'Reginster',
      component: Reginster
    },
    {
      path: '/resetpassword',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/hotdoctor',
      name: 'HotDoctor',
      component: HotDoctor
    },
    {
      path: '/finddoctor',
      name: 'FindDoctor',
      component: FindDoctor
    },
    {
      path: '/doctor',
      name: 'Doctor',
      component: Doctor
    },
    {
      path: '/doctorname',
      name: 'DoctorName',
      component: DoctorName
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      redirect: '/detail/usermsg',
      children:[
        {
          path: '/detail/usermsg',
          name: 'UserMsg',
          component: UserMsg,
        },
        {
          path: '/detail/clientevaluation',
          name: 'ClientEvaluation',
          component: ClientEvaluation
        }
      ]
    },
    {
      path: '/mobiledetail',
      name: 'MobileDetail',
      component: MobileDetail
    },
    {
      path: '/inquiry',
      name: 'Inquiry',
      component: Inquiry
    },
    {
      path: '/payforconsult',
      name: 'PayForConsult',
      component: PayForConsult
    },
    {
      path: '/paysuccess',
      name: 'PaySuccess',
      component: PaySuccess
    },
    {
      path: '/consult',
      name: 'Consult',
      component: Consult
    },
    {
      path: '/consultdetail',
      name: 'ConsultDetail',
      component: ConsultDetail
    },
    {
      path: '/mobileconsultdetail',
      name: 'MobileConsultDetail',
      component: MobileConsultDetail
    },
    {
      path: '/rate',
      name: 'Rate',
      component: Rate
    },
    {
      path: '/recipe',
      name: 'Recipe',
      component: Recipe
    },
    {
      path: '/electronicrecipe',
      name: 'ElectronicRecipe',
      component: ElectronicRecipe
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/addaddress',
      name: 'AddAddress',
      component: AddAddress
    },
    {
      path: '/editaddress',
      name: 'EditAddress',
      component: EditAddress
    },
    {
      path: '/buysuccess',
      name: 'BuySuccess',
      component: BuySuccess
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/payinquiry',
      name: 'PayInquiry',
      component: PayInquiry
    },
    {
      path: '/paybyaddress',
      name: 'PayByAddress',
      component: PayByAddress
    },
    {
      path: '/userdoctor',
      name: 'UserDoctor',
      component: UserDoctor,
      redirect: '/userdoctor/mydoctor',
      children:[
        {
          path: '/userdoctor/mydoctor',
          name: 'MyDoctor',
          component: MyDoctor,
        },
         {
          path: '/userdoctor/myattention',
          name: 'MyAttention',
          component: MyAttention,
        }
      ]
    },
    {
      path: '/usercenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/order/loadsenddetail',
      name: 'LoadSendDetail',
      component: LoadSendDetail
    },
    {
      path: '/order/loadacceptdetail',
      name: 'LoadAcceptDetail',
      component: LoadAcceptDetail
    },
    {
      path: '/order/successorder',
      name: 'SuccessOrder',
      component: SuccessOrder
    },
    {
      path: '/order/afertselldetail',
      name: 'AfertSellDetail',
      component: AfertSellDetail
    },
    {
      path: '/order/loadafertselldetail',
      name: 'LoadAfertSellDetail',
      component: LoadAfertSellDetail
    },
    {
      path: '/order/passafertselldetail',
      name: 'PassAfertSellDetail',
      component: PassAfertSellDetail
    },
    {
      path: '/order/WriteLogistics',
      name: 'WriteLogistics',
      component: WriteLogistics
    }
    ,
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/opinion',
      name: 'Opinion',
      component: Opinion
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/clientmsg',
      name: 'ClientMsg',
      component: ClientMsg
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '/addrecipe',
      name: 'AddRecipe',
      component: AddRecipe
    },
    {
      path: '/addmedicion',
      name: 'AddMedicion',
      component: AddMedicion
    },
    {
      path: '/checkrecipe',
      name: 'CheckRecipe',
      component: CheckRecipe
    },
    {
      path: '/returnmoney',
      name: 'ReturnMoney',
      component: ReturnMoney
    },
    {
      path: '/resetphone',
      name: 'ResetPhone',
      component: ResetPhone
    },
    {//分享
      path: '/share',
      name: 'Share',
      component: Share
    }
  ]
})
