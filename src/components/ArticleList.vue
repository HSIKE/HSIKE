<template>
  <keep-alive>
    <div class="articleList">
      <div class="head" v-html="breadCrumb"></div>
      <Loading v-if="loading"/>
      <div class="content" v-else-if="articles.length">
        <ul class="articles">
          <li class="arts" v-for="art in articles" :key="`a${art.Id}`">
            <div class="art">
              <img :src="art.cover" class="cover">
              <div class="art-box">
                <p class="title">
                  <router-link :to="`/article/${art.Id}`">{{ art.title }}</router-link>
                </p>
                <p class="description">{{ art.description }}</p>
                <div class="info">
                  <span>
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    {{ timeFormat(art.time) }}
                  </span><span>
                    <i class="fa fa-user-o"></i>
                    {{ art.author }}
                  </span><span>
                    <i class="fa fa-tags" aria-hidden="true"></i>
                    {{ art.tags }}
                  </span>
                  <router-link :to="`/article/${art.Id}`">
                    阅读全文
                  </router-link>
                </div>
              </div>
            </div>
            <em class="decoration"></em>
          </li>
        </ul>
        <div class="pageSwitch" v-if="articles.length===6 || page>1">
          <button @click="pagePrev">上一页</button>
          <span>{{ page }}</span>
          <button @click="pageNext">下一页</button>
        </div>
        <p class="noMore" v-else>没有更多了~~</p>
      </div>
      <NoResult v-else>
        <button @click="pagePrev" v-if="page>1" :title="`返回第${page-1}页`">back to page {{ page-1 }}</button>
      </NoResult>
    </div>
  </keep-alive>
</template>

<script>
  import NoResult from './NoResult';
  export default {
    name:"ArticleList",
    components:{ NoResult },
    data(){
      return{
        reqData:null,
        articles:[],
        page:1,
        loading:true
      }
    },
    methods:{
      getArticleList(data){
        this.$axios({
          url:`${this.$root.cors}/articles/articleList`,
          method:'get',
          params:data
        }).then(resp=>{
          this.loading=false;
          let data=resp.data;
          if(Array.isArray(data)) this.articles=data;
          else this.showAlert('天啦，出bug啦，赶紧点那边的联系方式让人来修~')
        }).catch(err=>this.showAlert('可能是服务器正在定期重启，等下刷新试试？'))
      },
      showAlert(msg){ this.$root.store.show.call(this.$root.store,msg) },
      pageNext(){
        if(this.articles.length<6) this.showAlert('Sorry...没有更多了');
        else{
          this.page++;
          this.getArticleList(this.getReqData)
        }
      },
      pagePrev(){
        if(this.page===1) this.showAlert('已经是第一页了！');
        else{
          this.page--;
          this.getArticleList(this.getReqData)
        }
      }
    },
    computed:{
      getReqData(){ return Object.assign({},this.$route.params,{ page:this.page }) },
      breadCrumb(){
        let par=this.$route.params;
        let txt='当前位置：';
        if(par.pid){
          txt += par.pid==='tag'
              ? ' 标签: '
              : `<span style="color:#aaa">${par.pid}</span> / `
        }
        txt+=(par.tag ? `<span style="color:#aaa">${par.tag} </span> / ` : '');
        if(Boolean(par.pid + par.tag + par.type )===false) txt += '<span style="color:#aaa"> 推荐 </span> / '
        txt+=` 第 <span style="color:#aaa">${ this.page }</span> 页`;
        return txt;
      },
      timeFormat(){ return (time)=> new Date(time).toLocaleString() },
    },
    watch:{
      $route(){
        this.page=1;
        this.loading=true;
        this.getArticleList(this.getReqData);
      }
    },
    created(){ this.getArticleList(this.getReqData) }
  }
</script>

<style scoped>
  .articleList{
    padding:0.556rem 0.833rem 2.5rem;
    background: white;
    height:100%;
    position: relative;
  }
  .articles{
    padding-top: 0.278rem;
  }
  .head{
    height:2.222rem;
    line-height: 2.222rem;
    font-size: 0.778rem;
    border-bottom: 1px solid #e3e3e3;
    color:#777;
  }
  .decoration{
    position: absolute;
    bottom:-1px;left:0;
    width:0;
    height: 1px;
    background: #009999;
    -webkit-transition: width .5s;
    -moz-transition: width .5s;
    -ms-transition: width .5s;
    -o-transition: width .5s;
    transition: width .5s;
  }
  .arts:hover .decoration{
    width:100%;
  }
  .arts{
    margin-bottom: 0.833rem;
    padding:0.833rem 0.556rem;
    border-bottom: 1px solid #e3e3e3;
    position: relative;
    
  }
  .art{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .cover{
    max-height: 6rem;
    -webkit-transition: transform 0.5s;
    -moz-transition: transform 0.5s;
    -ms-transition: transform 0.5s;
    -o-transition: transform 0.5s;
    transition: transform 0.5s;
  }
  .cover:hover{
    -webkit-transform: scale(1.05,1.05);
    -moz-transform: scale(1.05,1.05);
    -ms-transform: scale(1.05,1.05);
    -o-transform: scale(1.05,1.05);
    transform: scale(1.05,1.05);
  }
  .art-box{
    padding-bottom: 1.111rem;
    padding-left: 10px;
    position: relative;
    flex-grow: 1;
    align-self: stretch;
  }
  .title{
    height: 1.667rem;
    line-height: 1.667rem;
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
    margin:0.278rem 0 0.556rem;
    color:#666;
    font-size: 0.889rem;
    cursor: default;
    text-align: justify;
  }
  .info{
    font-size: 0.778rem;
    overflow: hidden;
    line-height: 1.111rem;
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 10px;
    right: 0;
  }
  .info span{
    float: left;
    margin-right: 0.833rem;
    color:#999;
    cursor: default;
  }
  .info a{
    float: right;
    color:#666;
  }
  .info a:hover{ color:#099 }
  .pageSwitch,.noMore{
    text-align: center;
    height: 1.667rem;
    line-height: 1.667rem;
    font-size: 0.778rem;
    color:#666;
    position: absolute;
    z-index: 1;
    left:0.833rem;
    right:0.833rem;
    bottom:0.833rem;
  }
  .pageSwitch span{
    display: inline-block;
    padding:0 0.278rem;
    height:1.667rem;
    line-height: 1.667rem;
  }
  .pageSwitch button{
    height:100%;
    padding:0 0.278rem;
    cursor: pointer;
  }
  .pageSwitch button:hover{ color:#099 }
  
</style>
