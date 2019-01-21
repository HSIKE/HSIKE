<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  @import "assets/css/public.css";
  @import "assets/css/common.css";
  @import "assets/css/font-awesome.min.css";
  #app{
    width:100%;
  }
  #app>div{
    width:100%;
  }
</style>
