<template>
  <div id="notes">
    <div class='header'>
      <div class='container'>
        <div class='row nav-bar'>
          <router-link class='logo' to='/' exact>
            <img src='./assets/images/head-pic.png' alt='logo'/>
          </router-link>
          <div class='nav'>
            <router-link class='nav-item' to='/' exact>首页</router-link>
            <router-link class='nav-item' v-for='nav in navList'
                :key='`nav${nav.Id}`' :to='`/${nav.value}`'>
              {{ nav.navName }}
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
                <router-link to="/css">css</router-link>
                <router-link to="/article/1">article</router-link>
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
  import ToTop from './components/ToTop';
  import co from './components/coConfig'
  export default {
    name: 'App',
    components:{ ToTop },
    data(){
      return {
        navList:[]
      }
    },
    created() {
      this.getNavList();
    },
    methods:{
      searchFocus(e){
        let search=document.querySelector('div.search');
        e.type==='focus' ? search.classList.add('active')
                         : search.classList.remove('active');
      },
      getNavList(){
        this.$axios.get(`${co}/navs/navList`)
            .then((resp)=>{
              console.log(resp);
              this.navList=resp.data;
            })
      }
    }
  }
</script>

<style>
  @import "assets/css/public.css";
  @import "assets/css/font-awesome.min.css";
  @import "assets/css/common.css";
</style>
