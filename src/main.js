import Vue from 'vue'
import Notes from './Notes'
import router from './router'
import axios from 'axios'

axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
Vue.prototype.$axios=axios;

const store={
  disabled:Boolean(localStorage.getItem('alertDisabled')) || false,// 是否被禁用
  state:{
    status:false,
    alertMsg:[],
    count:0
  },
  show(msg){
    if(!this.disabled){
      this.state.status=true;
      this.state.count++;
      if(msg) Array.isArray(msg) ? this.state.alertMsg.concat(msg) : this.state.alertMsg.push(msg);
      if(this.state.count>=3)
        this.state.alertMsg.push('','<span style="color:darkorange">↓↓↓ 觉得这个提示很烦？点击永久关闭可以禁用</span>')
    }
  },
  hide(){ this.state.status=false },
  reset(){ this.state.alertMsg=[] },
  off(){
    this.state.status=false;
    setTimeout(()=>{ this.state.alertMsg=[] },500);
    this.disabled=true;
    localStorage.setItem('alertDisabled','true');
  }
};
new Vue({
  el: '#notes',
  router,
  data:{ store },
  components: { Notes },
  template: '<Notes/>'
});
