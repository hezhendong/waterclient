import Vue from 'vue'
import Vuex from 'vuex'
import  StoreData from './modules/storeData'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    data:StoreData
  }
})

export default store
