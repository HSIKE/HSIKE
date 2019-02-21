<template>
  <div class='search'>
    <input type='text' placeholder='试试看搜索？' autocomplete='false'
        @focus='searchFocus($event)' @blur='searchFocus($event)'>
    <i class="fa fa-search"></i>
  </div>
</template>

<script>
  export default {
    name:"Search"
  }
</script>

<style scoped>
  .search{
    float: right;
    height:40px;
    width:130px;
    margin-right: 15px;
    position: relative;
    background: white;
  /*-webkit-transition: all .4s;
  -moz-transition: all .4s;
  -ms-transition: all .4s;
  -o-transition: all .4s;
  transition: all .4s;*/
  input{
    padding:8px 15px;
    font-size: 16px;
    height:100%;
    width:100%;
    color: #00dada;
  &::placeholder{
     color: #dcdcdc;
     font-size: 14px;
   }
  }
  i{
    position: absolute;
    right:10px;top:10px;
    font-size: 16px;
    color:#dcdcdc;
    font-weight:200;
  }
  &.active{
     position: absolute;
     width:50%;
     right:0;
     margin-right: 0;
     -webkit-box-shadow: 0 0 5px 1px rgba(0, 133, 255, 0.18);
     -moz-box-shadow: 0 0 5px 1px rgba(0, 133, 255, 0.18);
     box-shadow: 0 0 5px 1px rgba(0, 133, 255, 0.18);
  i{ display: none }
  }
  }
</style>
