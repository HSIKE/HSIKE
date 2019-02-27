<template>
  <div class="article">
    <Loading v-if="loading"/>
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
        <router-link :to="`/${article.pid}`" v-html="`看看其他 ${article.pid} 笔记？`"></router-link>
      </div>
    </div>
    <NoResult v-else>
      <button>try some <span style="font-style: italic">recommended</span> notes</button>
    </NoResult>
  </div>
</template>

<script>
  import NoResult from './NoResult';
  export default {
    name:"Article",
    components: { NoResult },
    data(){
      return{
        article:null,
        loading:true
      }
    },
    methods:{
      getArticle(Id){
        this.$axios.get(`${this.$root.cors}/articles/getArticle?Id=${Id}`)
            .then(resp=>{
              this.loading=false;
              let data=resp.data;
              if(Array.isArray(data)){
                data.length
                ? this.article=data[0]
                : this.article=null;
              }else this.showAlert('天啦，出bug啦，赶紧点那边的联系方式让人来修吧~')
            }).catch(err => this.showAlert('可能是服务器正在定期重启，等下刷新试试？'))
      },
      showAlert(msg){ this.$root.store.show.call(this.$root.store, msg) }
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
    padding:0 0.833rem 1.111rem;
    color:#555;
    height:100%;
  }
  .head{
    padding-top: 1.111rem;
    text-align: center;
    padding-bottom: 0.556rem;
    margin-bottom: 0.833rem;
    border-bottom: 1px solid #e3e3e3;
  }
  
  .info{
    font-size: 0.722rem;
    color:#999;
  }
  .title{
    font-size: 1.222rem;
    line-height: 2.222rem;
  }
  .links{ color:#099 }
  .links:hover{ color: #ffa496 }
  .info i{
    display: inline-block;
    width:0.444rem;
  }
  .description{
    text-indent: 2em;
    padding:0 0.833rem 1.111rem;
    font-size: 0.944rem;
  }
  .announce{
    padding:0 0.833rem;
    font-size: 0.889rem;
    color:#777;
  }
  .return{
    text-align: right;
    padding:0 0.833rem
  }
  .return a{
    height: 1.667rem;
    cursor: pointer;
    font-size: 0.778rem;
    margin-right: 0.833rem;
  }
  .return a:hover{ color:#099 }
</style>
