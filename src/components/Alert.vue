<template>
  <transition name="fade" appear>
    <div class="alert" v-if="isShow">
      <div class="alert-con">
        <div class="msgs">
          <p v-for="(msg,index) in alertMsg" :key="`msg${index}`"
              v-html="`${msg}`"></p>
        </div>
        <div class="close clear">
          <button class="disable" @click="off" v-if="turnOff">永久关闭</button>
          <button class="ok" @click="iKnow">我知道了</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name:"Alert",
    computed:{
      isShow(){ return this.$root.store.state.isShow },
      alertMsg(){ return this.$root.store.state.alertMsg },
      turnOff(){ return this.$root.store.state.count >= 3 }
    },
    methods:{
      iKnow(){
        this.$root.store.hide.call(this.$root.store);
        setTimeout(()=>{
          this.$root.store.reset.call(this.$root.store)
        },500)
      },
      off(){ this.$root.store.off.call(this.$root.store) }
    }
  }
</script>

<style scoped>
  .alert{
    z-index: 3001;
    position: fixed;
    top:0;bottom:0;
    left:0;right:0;
    background: rgba(0, 0, 0, 0.09);
    cursor: default;
    color:#009999;
  }
  .alert-con{
    position: absolute;
    min-width: 300px;
    max-width: 400px;
    opacity: 1;
    background: white;
    top:50%;left:50%;
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
    font-size: 0.833rem;
    line-height: 1;
    padding:0.556rem 1.667rem 0 0.833rem;
  }
  .msgs p{ padding:0.278rem 0 }
  .close{
    height:1.667rem;
    padding:0.167rem 0.833rem;
  }
  .close button{
    font-size: 0.778rem;
    height:1.333rem;
    padding:0 0.278rem;
    cursor: pointer;
    color:#009999;
  }
  .close .disable{
    float: left;
    color:darkorange;
  }
  .close .disable:hover{ color:red }
  .close .ok{ float:right }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    -webkit-transition: opacity 0.5s;
    -moz-transition: opacity 0.5s;
    -ms-transition: opacity 0.5s;
    -o-transition: opacity 0.5s;
    transition: opacity 0.5s;
  }
</style>
