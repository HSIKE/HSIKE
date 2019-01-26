import Vue from 'vue'
import Router from 'vue-router'
import Welcome from "../components/Welcome";
import Home from "../components/Home";
import ArticleList from "../components/ArticleList";
import Article from "../components/Article";

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      name:'welcome',
      component:Welcome,
    },
    {
      path:'/notes',
      name:'notes',
      component:Home,
      children:[
        {
          path:'article/:id?',
          name:'article',
          component:Article
        },
        {
          path:':sort?/:tag?',
          name:'list',
          component:ArticleList
        },
        
      ]
    }
  ],
  linkActiveClass:'active',
  linkExactActiveClass:'ex-active'
})
