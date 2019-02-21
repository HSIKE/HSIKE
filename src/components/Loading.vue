<template>
  <div class="loading">
    <div class="text">
      <img src="../assets/images/loading.gif">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
  export default {
    name:"Loading"
  }
</script>

<style scoped>
  .loading{
    width:100%;
    background:white;
    padding-top: 1px;
    position: relative;
    z-index: 1000;
  }
  .text{
    position: absolute;
    text-align: center;
    top:50%;left:50%;
    font-size: 12px;
    color:#009999;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
</style>
