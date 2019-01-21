<template>
  <div class='home'>
    <div class='header'>
      <div class='container'>
        <div class='row nav-bar'>
          <router-link class='logo' to='/home'>
            <img src='../assets/images/head-pic.png' alt='logo'/>
          </router-link>
          <div class='nav'>
            <a href='../../static/pages/login.html'>登录</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    created() {
      document.title='Mr.Huang的前端笔记'
    }
  }
</script>

<style scoped>

</style>