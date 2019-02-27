<template>
  <div class="login">
    <p class="prompt">暂未开放注册 ... 只允许网站管理员登录...</p>
    <ul class="login-con">
      <li class="userName">
        <span>用户名：</span>
        <input type="text" placeholder="用户名或邮箱" v-model="userName">
      </li>
      <li class="pwd">
        <span>密码：</span>
        <input type="password" placeholder="用户密码" v-model="password">
      </li>
      <li class="confirm">
        <span></span>
        <p @click="keepIn" :style="isChecked">
          <i class="fa fa-check"></i>
        </p>七天免登录
        <button @click="logIn">登录</button>
      </li>
    </ul>
    <p class="toAdmin" v-show="isLogin">
      <a href="/admin/">已登录，前往后台管理界面</a>
    </p>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import qs from 'qs';
  export default {
    name:"Login",
    data(){
      return{
        userName:'',
        password:'',
        keep:false,
        isLogin:/loginUser/.test(document.cookie),
        userData:null
      }
    },
    computed:{
      isChecked(){
        return this.keep ? {background:'#099',borderColor:'#099'} : {background:'white',borderColor:'#e3e3e3'}
      }
    },
    methods:{
      keepIn(){ this.keep=!this.keep },
      showAlert(msg){ this.$root.store.show.call(this.$root.store,msg) },
      logIn(){
        let data={
          userName:this.userName,
          password:md5(this.password),
          keep:this.keep
        };
        this.$axios({
          url:`${this.$root.cors}/users/login`,
          method:'post',
          data:qs.stringify(data)
        }).then(resp=>{
          let data=resp.data;
          let d=new Date();
          d.setDate(d.getDate()+7);
          if(Array.isArray(data)){
            this.userData=data[0];
            if(this.keep) document.cookie=`loginUser=${data[0].userName};expires=${d.toUTCString()}`;
            else document.cookie=`loginUser=${data[0].userName}`;
            this.isLogin=true;
            this.userName='';
            this.password='';
            this.keep=false;
          }else if((typeof resp.data)==='string') this.showAlert(data);
          else this.showAlert('天啦，出bug啦，赶紧点那边的联系方式让人来修~')
        }).catch(err=>this.showAlert('可能是服务器正在定期重启，等下刷新试试？'))
      }
    }
  }
</script>

<style scoped>
  .login{
    padding:1.111rem 0.833rem;
    background:white;
    height: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .login-con{
    margin-top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .prompt{
    text-align: center;
    color:#777;
  }
  li{
    line-height: 1.667rem;
    height: 1.667rem;
    font-size: 0.889rem;
    margin-bottom: 1.111rem;
  }
  span{
    display: inline-block;
    width:32%;
    text-align: right;
    vertical-align: center;
  }
  input{
    width:40%;
    border:1px solid #e3e3e3;
    height: 100%;
    padding:0.278rem 0.556rem;
    border-radius: 3px;
  }
  input::placeholder{
    color:#999;
    font-size: 0.722rem;
  }
  input:focus{
    border-color: deepskyblue;
  }
  .confirm{
    font-size: 0.667rem;
  }
  .confirm p{
    display: inline-block;
    width:0.889rem;
    height:0.889rem;
    line-height: 0.778rem;
    border-radius: 3px;
    font-size: 0.778rem;
    border:1px solid #e3e3e3;
    color:white;
    margin-right: 0.278rem;
  }
  .confirm button{
    width:20%;
    font-size: 0.889rem;
    height:1.667rem;
    vertical-align: middle;
    margin-left: 0.833rem;
    background: #099;
    color:white;
    border-radius: 3px;
    cursor: pointer;
  }
  .toAdmin{
    text-align: center;
    font-size: 0.889rem;
  }
  .toAdmin:hover{
    color:#099;
  }
</style>
