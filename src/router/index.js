import Vue from 'vue'
import Router from 'vue-router'
//import Home from "../components/Home";
import ArticleList from "../components/ArticleList";
import Article from "../components/Article";
import Login from "../components/Login";
import Register from "../components/Register";

Vue.use(Router);

export default new Router({
  mode:'history',
  base:'notes',
  routes: [
    {
      path:'/article/:id',
      name:'article',
      component:Article
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'register',
      name:'register',
      component:Register
    },
    {
      path:'/:pid?/:tag?',
      name:'articleList',
      component:ArticleList,
    },
  ],
  linkActiveClass:'active',
  linkExactActiveClass:'ex-active'
})
