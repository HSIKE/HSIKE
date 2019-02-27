<template>
  <div id="notes">
    <div ref="header" class='header'>
      <div class='container'>
        <div class='nav-bar'>
          <router-link class='logo' to='/' exact>
            <img src='./assets/images/avatar.png' alt='logo'/>
          </router-link>
          <ul class='nav'>
            <li class="nav-box">
              <router-link class='nav-item' to='/' exact>首页</router-link>
            </li>
            <li v-for='nav in navList' :key='`nav${nav.Id}`' class="nav-box">
              <router-link class='nav-item' :to='`/${nav.value}`'>
                {{ nav.navName }}
              </router-link>
              <div class="dropDown" v-if="nav.children.length">
                <router-link class="nav-item" v-for="n in nav.children"
                    :to="`/${n.value}`" :key="`nav${n.Id}`">
                  {{ n.navName }}
                </router-link>
              </div>
            </li>
            <li class="nav-box">
              <router-link class='nav-item login' to='/login' title='登录'>
                <i class="fa fa-user-circle-o"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div ref="main" class='main'>
      <div class='container clear'>
        <div class='left'>
          <ul class='con-left'>
            <li class='con-item announce'>
              <h4 class="title">
                <i class="fa fa-volume-up"></i>
                &nbsp;关于&nbsp;
                <span>Announcements</span>
              </h4>
              <Announce/>
            </li>
            <li class="con-item contact">
              <h4 class="title">
                <i class="fa fa-address-book-o"></i>
                &nbsp;联系我&nbsp;
                <span>Contact me</span>
              </h4>
              <div class="content contacts">
                <span class="qq" title="QQ" @click="showQQ">
                  <i class="fa fa-qq"></i><br/>
                </span><span class="wechat" title="微信" @click="showWechat">
                  <i class="fa fa-weixin"></i>
                </span><span class="email" title="邮箱">
                  <i class="fa fa-envelope-o" aria-hidden="true"></i>
                </span><a href="https://github.com/HSIKE?tab=repositories"
                   class="github" target="_blank" title="github">
                  <i class="fa fa-github"></i>
                </a>
              </div>
            </li>
            <li class="con-item search">
              <Search/>
            </li>
            <li class="con-item recommend">
              <h4 class="title">
                <i class="fa fa-star-o"></i>
                &nbsp;推荐&nbsp;
                <span>Recommendations</span>
              </h4>
              <Recommendation/>
            </li>
            <li class="con-item tags">
              <h4 class="title">
                <i class="fa fa-tags"></i>
                &nbsp;标签&nbsp;
                <span>Tags</span>
              </h4>
              <div class="content">
                <router-link to="/tag/作用域">作用域</router-link>
                <router-link to="/tag/选择器">选择器</router-link>
                <router-link to="/tag/盒子模型">盒子模型</router-link>
                <router-link to="/tag/数据类型">数据类型</router-link>
                <router-link to="/tag/变量">变量</router-link>
                <router-link to="/tag/闭包">闭包</router-link>
              </div>
            </li>
            <li class="con-item friends">
              <h4 class="title">
                <i class="fa fa-handshake-o"></i>
                &nbsp;友链&nbsp;
                <span>Links</span>
              </h4>
              <div class="content">
                <p style="font-size: 0.833rem;color:#888">暂时没有哦</p>
              </div>
            </li>
          </ul>
        </div>
        <div class='right'>
          <div class='con-right'>
            <transition name="fast-fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class='footer'>
      <p class="f-head">
        Designed & Coded By
        <a href="mailto:893008093@qq.com" style="font-style: italic">@Mr.Huang</a>,
        2019 / 02<br/>
        Based On
        <a href="https://cn.vuejs.org/v2/guide/" target="_blank">Vue-cli 3.0</a> +
        <a href="https://www.webpackjs.com/concepts/" target="_blank">webpack v4</a> +
        <a href="http://www.expressjs.com.cn/" target="_blank">Node / Express</a> +
        MySQL
      </p>
    </div>
    <transition name="fast-fade">
      <div class="qr_code" v-show="showContact" @click="hideContact">
        <img ref="qr_qq" src="./assets/images/qr_code_qq.jpg" alt="图片加载失败，刷新试试">
        <img ref="qr_wechat" src="./assets/images/qr_code_wechat.jpg" alt="图片加载失败，刷新试试">
      </div>
    </transition>
    <ToTop/>
    <Alert/>
  </div>
</template>

<script>
  import ToTop from './components/ToTop';
  import Alert from "./components/Alert";
  import Recommendation from "./components/Recommendation";
  import Announce from "./components/Announce";
  import Search from './components/Search';
  export default {
    name: 'Notes',
    components:{Search, Announce, Recommendation, Alert, ToTop },
    data(){ return {
      navList:[],
      showContact:false
    } },
    methods:{
      getNavList(){
        this.$axios.get(`${this.$root.cors}/navs/navList`)
            .then((resp)=>{
              let data=resp.data;
              if (Array.isArray(data)){
                if(data.length){
                  let navList=[];
                  for (let item of data){
                    let children=[];
                    for (let child of data){
                      if (item.pid==0 && child.pid==item.Id) children.push(child);
                    }
                    Object.assign(item,{ children });
                    if (item.pid==0){ navList.push(item) }
                  }
                  this.navList=navList;
                }else this.showAlert('获取分类导航失败...可能是站长删库跑路了...')
              }else this.showAlert('天啦，出bug啦，赶紧点那边的联系方式让人来修吧~')
            }).catch(err=>this.showAlert('可能是服务器定期重启，刷新试试？'))
      },
      showAlert(msg){ this.$root.store.show.call(this.$root.store, msg) },
      hideContact(){ this.showContact=false },
      showQQ(){
        this.showContact=true;
        this.$refs.qr_wechat.style.zIndex='1';
        this.$refs.qr_qq.style.zIndex='2';
      },
      showWechat(){
        this.showContact=true;
        this.$refs.qr_qq.style.zIndex='1';
        this.$refs.qr_wechat.style.zIndex='2';
      }
    },
    created() { this.getNavList() },
    mounted() {
      window.addEventListener('scroll',()=>{
        let top=window.pageYOffset||
            document.documentElement.scrollTop||
            document.body.scrollTop;
        let header=this.$refs.header;
        let main=this.$refs.main;
        if(top>=60){
          header.style.position='fixed';
          header.style.zIndex='3000';
          if(top<=120) header.style.top=-120+top+'px';
          if(top>=120) header.style.top='0';
          header.style.width='100vw';
          main.style.marginTop='90px'
        }else{
          header.style.position='static';
          main.style.marginTop=''
        }
      });
      this.$refs.header.addEventListener('mouseover',()=>{
        this.$refs.header.style.top='0'
      })
    }
  }
</script>

<style>
  @import "assets/css/public.css";
  @import "assets/css/font-awesome.min.css";
  @import "assets/css/notes.css";
  @import "assets/css/quill.snow.css";
  .fast-fade-enter-to,
  .fast-fade-leave{ opacity:1 }
  .fast-fade-enter,
  .fast-fade-leave-to{ opacity:0 }
  .fast-fade-enter-active,
  .fast-fade-leave-active{
    -webkit-transition: opacity 0.2s;
    -moz-transition: opacity 0.2s;
    -ms-transition: opacity 0.2s;
    -o-transition: opacity 0.2s;
    transition: opacity 0.2s;
  }
</style>
