<template>
  <keep-alive>
    <div class="articleList">
      <div class="head" v-html="breadCrumb"></div>
      <div class="content" v-if="articles.length">
        <ul class="articles">
          <li class="art" v-for="art in articles" :key="`a${art.Id}`">
            <p class="title">{{ art.title }}</p>
            <p class="description">{{ art.description }}</p>
            <div class="info">
              <span>{{ timeFormat(art.time) }}</span>
              <span>{{ art.author }}</span>
              <span>{{ art.tags }}</span>
              <router-link :to="`/article/${art.Id}`">
                阅读全文
              </router-link>
            </div>
          </li>
        </ul>
        <div class="pageSwitch">
          <button @click="pagePrev">prev</button>
          <button @click="pageNext">next</button>
        </div>
      </div>
      <div class="noResult" v-else>
        <h3>无结果</h3>
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
          this.articles=
              (typeof r)==='string' ? [] : r;
        })
      },
      pageNext(){ this.page+=1 },
      pagePrev(){ this.page-=1 }
    },
    computed:{
      getReqData(){ return Object.assign({},this.$route.params,{ page:this.page }) },
      breadCrumb(){
        let par=this.$route.params;
        let txt='当前位置：笔记';
        txt+=(par.pid ? ` / <span style="color:#ffa496">${par.pid}</span>` : '');
        txt+=(par.tag ? ` / <span style="color:#ffa496">${par.tag}</span>` : '');
        txt+=(par.type ? ` / <span style="color:#ffa496">${par.type}</span>` : ' / <span style="color:#ffa496">推荐</span>');
        txt+=` / 第 <span style="color:#ffa496">${ this.page }</span> 页`;
        return txt;
      },
      timeFormat(){
        return (time)=> new Date(time).toLocaleString()
      }
    },
    watch:{
      $route(){
        this.page=1;
        //console.log('路由监控触发')
        /*this.reqData=Object.assign({},v.params,{ page:this.page })*/
      },
      getReqData(v){ this.getArticleList(v) }
    },
    created(){
      //let firstReq=Object.assign({},this.$route.params,{ page:this.page });
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
    color:#888;
  }
  .art{
    margin-top: 20px;
  }
</style>
