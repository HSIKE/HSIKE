<template>
  <div class="article">
    <div class="success" v-if="article">
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
        <div class="description" v-text="article.description"></div>
        <div class="ql-editor" v-html="article.content"></div>
      </div>
      <div class="return">
        <router-link :to="`/${article.pid}`">返回文章列表</router-link>
      </div>
    </div>
    <div class="failed" v-else>失败</div>
  </div>
</template>

<script>
  import co from './coConfig';
  export default {
    name:"Article",
    data(){
      return{ article:null }
    },
    methods:{
      getArticle(Id){
        this.$axios({
          url:`${co}/articles/getArticle`,
          method:'get',
          params:{ Id }
        }).then(resp=>{
          console.log(resp.data);
          (typeof resp.data)==='object' ? this.article=resp.data : ''
        })
      }
    },
    computed:{
      timeFormat(){ return time=>new Date(time).toLocaleString() },
      getTags(){ return tags=> tags.split('、')}
    },
    watch:{
      $route(v){ this.getArticle(v.params.Id) }
    },
    created(){
      //console.log(this.$route.params.id);
      //console.log('css'.split('、'));
      this.getArticle(this.$route.params.Id)
    }
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
  .return{ text-align: right }
  .return a{
    height: 30px;
    cursor: pointer;
    font-size: 14px;
    margin-right: 15px;
  }
  .return a:hover{ color:#099 }
</style>
