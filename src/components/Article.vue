<template>
  <div class="article">
    <Loading v-if="loading" style="height:800px"/>
    <div class="success" v-else-if="article">
      <div class="head">
        <p class="title">{{ article.title }}</p>
        <div class="info">
          {{ article.author }} 最后修改于: {{ timeFormat(article.time) }}<i></i>
          分类:
          <router-link class="links" :to="`/${article.pid}`">
            {{ article.pid }}
          </router-link><i></i>
          类型: {{ article.type }}<i></i>
          标签:
          <router-link class="links" v-for="tag in getTags(article.tags)"
              :key="`art-${tag}`" :to="`/tag/${tag}`">
            {{ tag }}&nbsp;
          </router-link>
        </div>
      </div>
      <div class="ql-container ql-snow">
        <p class="description" v-text="article.description"></p>
        <div class="ql-editor" v-html="article.content"></div>
        <p class="announce">
          作者自己是个菜鸡，正在学习中，如有错误、遗漏之处或者欢迎指正~~
        </p>
      </div>
      <div class="return">
        <router-link :to="`/${article.pid}`">返回文章列表</router-link>
      </div>
    </div>
    <div class="noResult" v-else>
      <div class="box">
        <p class="tips">
          点得不错，但很抱歉<br/>
          暂时没有找到你想看的<br/>
          可能还没来得及上传？<br/>
          或者已经被删除了？<br/>
          你可以选择：<br/>
          1、点击那里的 "联系我" 发起催更 &nbsp;
          <span style="color:#009999;font-weight:bold">→</span>
        </p>
        <button @click="pagePrev" v-if="page!==1">2、返回上一页</button>
        <button @click="$router.back()" v-else>2、返回之前页面</button>
      </div>
    </div>
  </div>
</template>

<script>
  import co from './coConfig';
  import Loading from "./Loading";
  export default {
    name:"Article",
    components:{ Loading },
    data(){
      return{
        article:null,
        loading:true
      }
    },
    methods:{
      getArticle(Id){
        this.$axios({
          url:`${co}/articles/getArticle`,
          method:'get',
          params:{ Id }
        }).then(resp=>{
          this.loading=false;
          let data=resp.data;
          if(Array.isArray(data)){
            data.length ? this.article=data[0] : this.showAlert('Sorry，这个真没有...');
          }else this.showAlert('服务器被玩坏了...获取数据失败...')
        })
      }
    },
    computed:{
      timeFormat(){ return time=>new Date(time).toLocaleString() },
      getTags(){ return tags=> tags.split('、') }
    },
    watch:{
      $route(v){
        this.loading=true;
        this.getArticle(v.params.Id);
      }
    },
    created(){ this.getArticle(this.$route.params.Id) }
  }
</script>

<style scoped>
  .article{
    background: white;
    padding:0 15px 20px;
    margin-left: -15px;
    margin-right: -15px;
    border:1px solid #e3e3e3;
  }
  .head{
    padding-top: 20px;
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e3e3e3;
  }
  
  .info{
    font-size: 13px;
    color:#999;
  }
  .title{
    font-size: 24px;
    line-height: 40px;
  }
  .links{ color:deepskyblue }
  .links:hover{ color: #ffa496 }
  .info i{
    display: inline-block;
    width:8px;
  }
  .description{
    text-indent: 2em;
    padding:0 15px 20px;
  }
  .return{
    text-align: right;
    padding:0 15px
  }
  .return a{
    height: 30px;
    cursor: pointer;
    font-size: 14px;
    margin-right: 15px;
  }
  .return a:hover{ color:#099 }
</style>
