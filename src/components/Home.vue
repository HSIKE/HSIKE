<template>
  <div class='home'>
    <div class='header'>
      <div class='container'>
        <div class='row nav-bar'>
          <router-link class='logo' to='/notes' exact>
            <img src='../assets/images/head-pic.png' alt='logo'/>
          </router-link>
          <div class='nav'>
            <router-link class='nav-item' to='/notes' exact>首页</router-link>
            <router-link class='nav-item' v-for='item in navList'
                :key='item.title' :to='`/notes${item.link}`'>
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
          <ul class='con-left'>
            <li class='con-item statement'>
              <h4 class="title">
                <i class="fa fa-volume-up"></i>
                &nbsp;关于&nbsp;
                <span>Announcement</span>
              </h4>
              <div class="content">
                <router-link to="/notes/css">test</router-link>
                <router-link to="/notes/article">test</router-link>
              </div>
            </li>
            <li class="con-item contact">
              <h4 class="title">
                <i class="fa fa-address-book-o"></i>
                &nbsp;联系我&nbsp;
                <span>Contact me</span>
              </h4>
              <div class="content">
              </div>
            </li>
            <li class="con-item recommend">
              <h4 class="title">
                <i class="fa fa-star-o"></i>
                &nbsp;推荐&nbsp;
                <span>Recommendations</span>
              </h4>
              <div class="content">
              </div>
            </li>
            <li class="con-item tags">
              <h4 class="title">
                <i class="fa fa-tags"></i>
                &nbsp;标签&nbsp;
                <span>Tags</span>
              </h4>
              <div class="content">
              </div>
            </li>
            <li class="con-item friends">
              <h4 class="title">
                <i class="fa fa-handshake-o"></i>
                &nbsp;友链&nbsp;
                <span>Links</span>
              </h4>
              <div class="content">
              </div>
            </li>
          </ul>
        </div>
        <div class='right'>
          <div class='con-right'>
            <router-view></router-view>
          </div>
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
    created() { document.title='Mr.Huang'; },
    methods:{
      searchFocus(e){
        let search=document.querySelector('div.search');
        e.type==='focus' ? search.classList.add('active')
                         : search.classList.remove('active');
      }
    },
    updated(){
      console.log(this.$route);
    }
  }
</script>

<style scoped>
  @import "../assets/css/common.css";
</style>
