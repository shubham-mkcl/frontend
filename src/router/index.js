import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Signin from '../components/Signin'
import Signup from '../components/Signup'
import Dashboard from '../components/Dashboard'
import Profile from "../components/Profile"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path:"/signup",
    name:"signup",
    component:Signup
  },
  {
    path:"/dashboard",
    name:"dashboard",
    component:Dashboard
  },
  {
    path:"/profile",
    name:"profile",
    component:Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
