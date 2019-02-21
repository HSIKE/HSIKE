<template>
  <keep-alive>
    <div class="articleList">
      <div class="head" v-html="breadCrumb"></div>
      <Loading v-if="loading" style="height:600px"/>
      <div class="content" v-else-if="articles.length">
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
          <span>{{ page }}</span>
          <button @click="pageNext">下一页</button>
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
  </keep-alive>
</template>

<script>
  import co from './coConfig';
  import Loading from "./Loading";
  export default {
    name:"ArticleList",
    components:{ Loading },
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
          url:`${co}/articles/articleList`,
          method:'get',
          params:data
        }).then(resp=>{
          this.loading=false;
          let data=resp.data;
          if(Array.isArray(data)){
            this.articles=data;
            if(data.length===0) this.showAlert('Sorry...这个真没有...');
          }else this.showAlert('服务器被玩坏了...获取数据失败...')
        })
      },
      showAlert(msg){ this.$root.$data.store.show.call(this.$root.$data.store,msg) },
      pageNext(){
        if(this.articles.length<10) this.showAlert('Sorry，没有更多了...请别点了...');
        else{
          this.page+=1;
          this.getArticleList(this.getReqData);
        }
      },
      pagePrev(){
        if(this.page===1) this.showAlert('请不要再点了，已经是第一页了');
        else{
          this.page-=1;
          this.getArticleList(this.getReqData)
        }
      }
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
    padding:10px 15px 15px;
    min-height: 800px;
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
    text-align: justify;
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
    font-size: 14px;
    color:#555;
  }
  .pageSwitch span{
    display: inline-block;
    padding:0 5px;
    height:30px;
    line-height: 30px;
  }
  .pageSwitch button{
    height:100%;
    padding:0 5px;
    cursor: pointer;
  }
  .pageSwitch button:hover{ color:#099 }
</style>
