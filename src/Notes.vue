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
            <div v-for='nav in navList' :key='`nav${nav.Id}`' class="box">
              <router-link class='nav-item' :to='`/${nav.value}`'>
                {{ nav.navName }}
              </router-link>
              <div class="dropDown" v-if="nav.children.length">
                <router-link class="nav-item" v-for="n in nav.children"
                    :to="`/${n.value}`" :key="`nav${n.Id}`">
                  {{ n.navName }}
                </router-link>
              </div>
            </div>
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
                <span><i class="fa fa-qq"></i></span>
                <span><i class="fa fa-weixin"></i></span>
                <i class="fa fa-github"></i>
              </div>
            </li>
            <li class="con-item recommend">
              <h4 class="title">
                <i class="fa fa-star-o"></i>
                &nbsp;推荐&nbsp;
                <span>Recommendations</span>
              </h4>
              <ul class="content" v-if="recommendations.length">
                <li v-for="item in recommendations" :key="`rec/${item.Id}`" class="rec">
                  <router-link :to="`/article/${item.Id}`">
                    {{ item.title }}
                  </router-link>
                </li>
              </ul>
              <div class="content" v-else>
                出了点小问题，暂时无法获取推荐项，刷新试试？
              </div>
            </li>
            <li class="con-item tags">
              <h4 class="title">
                <i class="fa fa-tags"></i>
                &nbsp;标签&nbsp;
                <span>Tags</span>
              </h4>
              <div class="content">
                <router-link to="/tag/原型链">原型链</router-link>
                <router-link to="/tag/作用域">作用域</router-link>
                <router-link to="/tag/定时器">定时器</router-link>
                <router-link to="/tag/选择器">选择器</router-link>
                <router-link to="/tag/盒子模型">盒子模型</router-link>
                <router-link to="/tag/标签类型">标签类型</router-link>
                <router-link to="/tag/ES6">ES6</router-link>
                <router-link to="/tag/数据类型">数据类型</router-link>
                <router-link to="/tag/样式优先级">样式优先级</router-link>
                <router-link to="/tag/this">this</router-link>
                <router-link to="/tag/H5">H5</router-link>
                <router-link to="/tag/Git">Git</router-link>
                <router-link to="/tag/弹性布局">弹性布局</router-link>
                <router-link to="/tag/事件流">事件流</router-link>
                <router-link to="/tag/浮动">浮动</router-link>
                <router-link to="/tag/正则">正则</router-link>
                <router-link to="/tag/定位">定位</router-link>
                <router-link to="/tag/继承">继承</router-link>
                <router-link to="/tag/过渡">过渡</router-link>
                <router-link to="/tag/闭包">闭包</router-link>
                <router-link to="/tag/变量">变量</router-link>
                <router-link to="/tag/动画">动画</router-link>
                <router-link to="/tag/单位">单位</router-link>
                <router-link to="/tag/媒体查询">媒体查询</router-link>
                <router-link to="/tag/响应式">响应式</router-link>
                <router-link to="/tag/居中">居中</router-link>
                <router-link to="/tag/本地存储">本地存储</router-link>
                <router-link to="/tag/面向对象">面向对象</router-link>
                <router-link to="/tag/原型">原型</router-link>
                <router-link to="/tag/条件语句">条件语句</router-link>
                <router-link to="/tag/循环">循环</router-link>
                <router-link to="/tag/变换">变换</router-link>
                <router-link to="/tag/CSS3">CSS3</router-link>
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
    name: 'Notes',
    components:{ ToTop },
    data(){
      return {
        navList:[],
        recommendations:[]
      }
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
              //console.log(resp);
              //this.navList=resp.data;
              let navs=resp.data,
                  navList=[];
              for (let item of navs){
                let children=[];
                for (let child of navs){
                  if (item.pid==0 && child.pid==item.Id){
                    //console.log(child,item);
                    children.push(child);
                  }
                }
                //console.log(children);
                Object.assign(item,{ children });
                //console.log(item);
                item.pid==0 ? navList.push(item) : '';
              }
              this.navList=navList;
              //console.log(this.navList = navList);
            });
        
      },
      getRecommend(){
        this.$axios.get(`${co}/articles/articleList`)
            .then(resp=>{ this.recommendations=resp.data })
      }
    },
    created() {
      this.getNavList();
      this.getRecommend();
    },
  }
</script>

<style>
  @import "assets/css/public.css";
  @import "assets/css/font-awesome.min.css";
  @import "assets/css/notes.css";
  @import "assets/css/quill.snow.css";
</style>
