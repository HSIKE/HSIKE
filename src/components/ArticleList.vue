<template>
  <keep-alive>
    <div class="articleList">
      <div class="head" v-html="breadCrumb"></div>
      <div class="content" v-if="articles.length">
        <ul class="articles">
          <li class="art" v-for="art in articles" :key="`a${art.Id}`">
            <p class="title">
              <router-link :to="`/article/${art.Id}`">{{ art.title }}</router-link>
            </p>
            <p class="description">{{ art.description }}</p>
            <div class="info">
              <span>
                <i class="fa fa-clock-o" aria-hidden="true"></i>
                {{ timeFormat(art.time) }}
              </span>
              <span>
                <i class="fa fa-user-o"></i>
                {{ art.author }}
              </span>
              <span>
                <i class="fa fa-tags" aria-hidden="true"></i>
                {{ art.tags }}
              </span>
              <router-link :to="`/article/${art.Id}`">
                阅读全文
              </router-link>
            </div>
            <em class="decoration"></em>
          </li>
        </ul>
        <div class="pageSwitch">
          <button @click="pagePrev">上一页</button>
          <button @click="pageNext">下一页</button>
        </div>
      </div>
      <div class="noResult" v-else>
        <p>
          Oops~ Something Unexpected Happens<br/>
          No Article Was Found<br/>
          Sorry For That...
        </p>
        <button @click="pagePrev" v-if="page!==1">返回上一页</button>
        <button @click="$router.back()" v-if="page===1">返回之前页面</button>
      </div>
    </div>
  </keep-alive>
</template>

<script>
  import co from './coConfig';
  export default {
    name:"ArticleList",
    data(){
      return{
        reqData:null,
        articles:[],
        page:1,
      }
    },
    methods:{
      getArticleList(data){
        this.$axios({
          url:`${co}/articles/articleList`,
          method:'get',
          params:data
        }).then(resp=>{
          let r=resp.data;
          console.log(r);
          this.articles=((typeof r)==='string' ? [] : r);
        })
      },
      pageNext(){ this.page+=1 },
      pagePrev(){ this.page===1 ? alert('已经是第一页了！') : this.page-=1 }
    },
    computed:{
      getReqData(){ return Object.assign({},this.$route.params,{ page:this.page }) },
      breadCrumb(){
        let par=this.$route.params;
        let txt='当前位置：笔记';
        txt+=(par.pid ? ` / <span style="color:#aaa">${par.pid}</span>` : '');
        txt+=(par.tag ? ` / <span style="color:#aaa">${par.tag}</span>` : '');
        txt+=(par.tag || par.pid ? '' : ' / <span style="color:#aaa">推荐</span>');
        txt+=` / 第 <span style="color:#aaa">${ this.page }</span> 页`;
        return txt;
      },
      timeFormat(){ return (time)=> new Date(time).toLocaleString() }
    },
    watch:{
      $route(){ this.page=1 },
      getReqData(v){ this.getArticleList(v) }
    },
    created(){
      this.getArticleList(this.getReqData);
    }
  }
</script>

<style scoped>
  .articleList{
    padding:10px 15px 15px;
    margin-left: -15px;
    margin-right: -15px;
    background: white;
    border:1px solid #e3e3e3;
  }
  .head{
    height:40px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #e3e3e3;
    color:#777;
  }
  .decoration{
    position: absolute;
    bottom:-1px;left:0;
    width:0;
    height: 1px;
    background: #009999;
    transition: width .5s;
  }
  .art:hover .decoration{
    width:100%;
  }
  .art{
    margin-bottom: 15px;
    padding:15px 10px;
    border-bottom: 1px solid #e3e3e3;
    position: relative;
  }
  .title{
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    width:100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title a:hover{ color:#099 }
  .description{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:3;
    text-overflow: ellipsis;
    overflow: hidden;
    width:100%;
    line-height:1.2;
    padding:0 10px;
    margin:10px 0;
    color:#666;
    font-size: 16px;
    cursor: default;
  }
  .info{
    font-size: 14px;
    overflow: hidden;
    line-height: 20px;
  }
  .info span{
    float: left;
    margin-right: 15px;
    color:#999;
    cursor: default;
  }
  .info a{
    float: right;
    color:#666;
  }
  .info a:hover{ color:#099 }
  .pageSwitch{
    text-align: center;
    height: 30px;
  }
  .pageSwitch button{
    height:100%;
    padding:0 10px;
    cursor: pointer;
    color:#555;
  }
  .pageSwitch button:hover{ color:#099 }
  .noResult{
    padding:30px 0;
    text-align: center;
    color:#666;
  }
  .noResult p{ line-height: 30px }
  .noResult button{
    margin-top: 15px;
    color:#444;
    cursor: pointer;
  }
  .noResult button:hover{ color:#099 }
</style>
