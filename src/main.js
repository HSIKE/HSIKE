import Vue from 'vue'
import Notes from './Notes'
import router from './router'
import axios from 'axios'

axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
Vue.prototype.$axios=axios;

const store={
  state:{
    status:false,
    alertMsg:[]
  },
  show(msg){
    this.state.status=true;
    Array.isArray(msg) ? this.state.alertMsg.concat(msg) : this.state.alertMsg.push(msg)
  },
  hide(){ this.state.status=false },
  reset(){ this.state.alertMsg=[] }
};
new Vue({
  el: '#notes',
  router,
  data:{ store },
  components: { Notes },
  template: '<Notes/>'
});
