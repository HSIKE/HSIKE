import Vue from 'vue'
import Router from 'vue-router'
import Welcome from "../components/Welcome";
import Home from "../components/Home";

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      name:'welcome',
      component:Welcome
    },
    {
      path:'/notes',
      name:'home',
      component:Home
    }
  ],
  linkActiveClass:'active',
  linkExactActiveClass:'ex-active'
})
