import Vue from 'vue'
import Notes from './Notes'
import router from './router'
import axios from 'axios'

axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
Vue.prototype.$axios=axios;

new Vue({
  el: '#notes',
  router,
  components: { Notes },
  template: '<Notes/>'
});
