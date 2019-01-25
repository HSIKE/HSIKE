<template>
  <div class='home'>
    <div class='header'>
      <div class='container'>
        <div class='row nav-bar'>
          <router-link class='logo' to='/home' exact>
            <img src='../assets/images/head-pic.png' alt='logo'/>
          </router-link>
          <div class='nav'>
            <router-link class='nav-item' to='/notes'>首页</router-link>
            <router-link class='nav-item' v-for='item in navList'
                :key='item.title' :to='item.link'>
              {{ item.title }}
            </router-link>
            <router-link class='nav-item login' to='/login' title='登录'>
              <i class="fa fa-user-circle-o"></i>
            </router-link>
          </div>
          <div class='search'>
            <input type='text' placeholder='试试看搜索？' autocomplete='false'
                @focus='searchFocus($event)' @blur='searchFocus($event)'>
            <i class="fa fa-search"></i>
          </div>
        </div>
      </div>
    </div>
    <div class='main'>
      <div class='container clear'>
        <div class='left'>
          <ul class='content'>
            <li class='con-item'></li>
          </ul>
        </div>
        <div class='right'>
          <div class='content'></div>
        </div>
      </div>
    </div>
    <div class='footer'>
    </div>
    <ToTop/>
  </div>
</template>

<script>
  import ToTop from "./ToTop";
  export default {
    name: 'Home',
    components:{ ToTop },
    data(){
      return {
        navList:[
          {id:1,title:'css',link:'/css'},
          {id:2,title:'html',link:'/html'},
          {id:3,title:'JavaScript',link:'/js'}
        ]
      }
    },
    created() {
      document.title='Mr.Huang'
    },
    methods:{
      searchFocus(e){
        let search=document.querySelector('div.search');
        e.type==='focus' ? search.classList.add('active')
                         : search.classList.remove('active');
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/common.css";
</style>
