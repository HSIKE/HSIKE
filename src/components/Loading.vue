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
    height:100%;
    padding-top: 1px;
    position: relative;
  }
  .text{
    text-align: center;
    font-size: 12px;
    position: relative;
    top: 50%;
    margin-left: 50%;
    color:#009999;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
</style>
