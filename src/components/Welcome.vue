<template>
  <!--欢迎页-->
  <div class='welcome'>
    <!--Welcome, new here.-->
    <div class="greet">
      <div class='container'>
        <div class='row'>
          <div class="title">
            <h2>WELCOME</h2>
            <h4>H.SiK.E</h4>
          </div>
          <img class='me-logo' src='../assets/images/head-pic.png' alt='oops, 出了点问题，图片无法加载'>
          <router-link class="entry" to="/home" title="点此进入">
            Mr.Huang的web前端笔记
          </router-link>
          <p class="motto">
            Speak Less, Read More,<br/>
            Think More, Code More, Do More.
          </p>
        </div>
      </div>
    </div>
    <div class="down">
      <a href="#me"><i class="fa fa-angle-double-down"></i></a>
    </div>
    <!--关于本人-->
    <div id="me" class="about-me">
      <div class="container">
        <div class="row myself">
          <div class="title">
            <h2>About Me</h2>
            <h4>关于本人</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="down">
      <a href="#site"><i class="fa fa-angle-double-down"></i></a>
    </div>
    <!--关于本站-->
    <div id="site" class="about-site">
      <div class="container">
        <div class="row site">
          <div class="title">
            <h2>About This Site</h2>
            <h4>关于本站</h4>
          </div>
          <div class="tech">
            <img src="../assets/images/vue.png">
          </div>
        </div>
      </div>
    </div>
    <div class="down">
      <a href="#tips"><i class="fa fa-angle-double-down"></i></a>
    </div>
    <div class="tips" id="tips">
      <div class="container">
        <div class="container content">
          <div class="title">
            <h2>Some Tips</h2>
            <h4>一些小建议</h4>
          </div>
        </div>
      </div>
    </div>
    <button @click="backToTop" class="back-to-top" ref="top">
      <i class="fa fa-angle-double-up"></i>
    </button>
  </div>
</template>

<script>
  import backToTop from '../assets/js/backToTop'
  export default {
    name: 'Welcome',
    methods: {
      backToTop,
    },
    created() {
      window.onscroll=()=>{
        let top=window.pageYOffset||
            document.documentElement.scrollTop||
            document.body.scrollTop;
        this.$refs.top.style.right=top>500 ? '10px' : '';
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/welcome.css";
</style>