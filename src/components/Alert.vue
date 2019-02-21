<template>
  <transition name="fade" appear>
    <div class="alert" v-if="status">
      <div class="alert-con">
        <!--<h4 class="title">错误信息：</h4>-->
        <div class="msgs">
          <p v-for="(msg,index) in alertMsg" :key="`msg${index}`"
              v-text="`${msg}`"></p>
        </div>
        <div class="close">
          <button @click="resetMsg">我知道了</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name:"Alert",
    computed:{
      status(){ return this.$root.$data.store.state.status },
      alertMsg(){ return this.$root.$data.store.state.alertMsg },
    },
    methods:{
      resetMsg(){
        this.$root.$data.store.hide.call(this.$root.$data.store);
        setTimeout(()=>{
          this.$root.$data.store.reset.call(this.$root.$data.store)
        },1000)
      }
    }
  }
</script>

<style scoped>
  .alert{
    z-index: 3000;
    position: fixed;
    top:0;bottom:0;
    left:0;right:0;
    background: rgba(0, 0, 0, 0.09);
    cursor: default;
    color:#009999;
  }
  .alert-con{
    position: absolute;
    width:400px;
    opacity: 1;
    background: white;
    top:50%;left:50%;
    /*border:1px solid #0080ad;*/
    -webkit-box-shadow: 0 0 5px 1px rgba(0, 133, 255, 0.18);
    -moz-box-shadow: 0 0 5px 1px rgba(0, 133, 255, 0.18);
    box-shadow: 0 0 5px 1px rgba(0, 133, 255, 0.18);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  
  .msgs{
    font-size: 15px;
    line-height: 1;
    padding:15px 15px 5px;
  }
  .msgs p{
    padding:3px 0;
  }
  .close{
    height:31px;
    padding:3px 15px;
    text-align: right;
  }
  .close button{
    font-size: 14px;
    height:24px;
    padding:0 5px;
    cursor: pointer;
    color:#009999;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    -webkit-transition: opacity 1s;
    -moz-transition: opacity 1s;
    -ms-transition: opacity 1s;
    -o-transition: opacity 1s;
    transition: opacity 1s;
  }
</style>
