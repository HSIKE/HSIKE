<template>
  <div class='search'>
    <input ref="ipt" type='text' placeholder='试试看搜索？' autocomplete='false'
           @focus="iptFocus($event)" @blur="iptBlur" v-model="iptVal"
           @keydown.enter="search">
    <button ref="btn" @click="search"><i class="fa fa-search"></i></button>
  </div>
</template>

<script>
  export default {
    name:"Search",
    data(){ return{ iptVal:'' } },
    methods:{
      iptFocus(e){
        this.$refs.btn.style.color='#099';
        e.target.placeholder='按下Enter键可以直接搜索哦~';
      },
      iptBlur(e){
        this.$refs.btn.style.color='';
        e.target.placeholder='试试看搜索？';
      },
      search(){
        this.iptVal=this.iptVal.replace(/\s/g,'');
        if(this.iptVal){
          this.$router.push(`/tag/${this.iptVal}`);
          this.$refs.ipt.placeholder='试试看搜索？';
          this.iptVal='';
          this.$refs.ipt.blur();
        }else this.$refs.ipt.placeholder='请输入要搜索的内容！'
      }
    }
  }
</script>

<style scoped>
  .search {
    height: 2.222rem;
    width: 100%;
    position: relative;
    background: white;
  }
  input{
    padding:0.444rem 0.833rem;
    font-size: 0.889rem;
    height:100%;
    width:100%;
    color: #099;
  }
  input::placeholder{
    color: #bdbdbd;
    font-size: 0.778rem;
  }
  button{
    position: absolute;
    z-index: 1;
    right:0;
    top:0;
    height:100%;
    width:2.222rem;
    font-size: 1.111rem;
    color:#999;
    cursor: pointer;
  }
</style>
