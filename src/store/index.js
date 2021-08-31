import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated:false,
 },
 mutations: {
   check(state,app){
     if(app.$session.exists("username")){
       state.isAuthenticated=true
     }else{
       state.isAuthenticated=false
     }
   }
 },
 getters:{
  
 },
 actions: {
 },
 modules: {
 }
})
