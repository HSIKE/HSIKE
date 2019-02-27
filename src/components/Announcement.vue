<template>
  <div class="announcement">
    <Loading v-if="loading" style="height: 38.889rem;"/>
    <ul class="an-box clear">
      <li class="alignLeft clear">
        <p class="an-con">
          本站基于 Vue 2.x, 不支持 IE8 及以下版本。
          同时使用了大量的 CSS3 的样式及 HTML5 的 api，如 flex 布局、变换和过渡、history 路由模式和本地存储等，
          经测试 IE11 以下运行都存在问题
        </p>
        <span class="top">
          <i class="fa fa-thumb-tack"></i>
        </span>
      </li>
      <li v-for="an in announcements" :key="`anc${an.Id}`" v-if="announcements.length"
          :class="[(an.Id % 2 === 0) ? 'alignLeft' : 'alignRight','clear']">
        <p v-html="an.content" class="an-con"></p>
        <span v-if="an.type==='置顶'" class="top">
          <i class="fa fa-thumb-tack"></i>
        </span>
      </li>
    </ul>
    <div class="more">
      <p v-if="announcements.length<count">没有更多了~</p>
      <p v-else>
        <button @click="showMore">查看更多</button>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Announcement',
    data(){
      return{
        loading:true,
        announcements:[],
        count:6
      }
    },
    methods:{
      showAlert(msg){ this.$root.store.show.call(this.$root.store, msg) },
      ansSort(arr){ // 重排序，置顶优先显示
        let top=[];
        let normal=[];
        arr.forEach( (an)=> an.type==='置顶' ? top.unshift(an) : normal.unshift(an) );
        return top.concat(normal);
      },
      showMore(){ this.count+=4 },
      getAnnouncements(){
        this.$axios.get(`${this.$root.cors}/latestAns?count=${this.count}`)
            .then(resp=>{
              if(Array.isArray(resp.data)){
                this.loading=false;
                if(resp.data.length) this.announcements=this.ansSort(resp.data)
              }else this.showAlert('天啦，出bug啦，赶紧点那边的联系方式让人来修~');
            }).catch(err=>this.showAlert('可能是服务器正在定期重启，等下刷新试试？'));
      }
    },
    watch:{
      count(v){ this.getAnnouncements() }
    },
    created() { this.getAnnouncements() }
  }
</script>

<style scoped>
  .announcement{
    height:100%;
    position: relative;
    padding-bottom: 2.5rem;
  }
  .an-box{
    padding:1.667rem 0.833rem 1px;
  }
  .an-box li{
    margin-bottom: 1.111rem;
  }
  .top{
    color:orangered;
    margin:0.278rem 0.556rem;
  }
  .alignLeft .top{
    float: left;
  }
  .alignRight .top{
    float: right;
  }
  .an-con{
    max-width: 60%;
    background: #1d1613;
    border-radius: 7px;
    padding:0.556rem 0.833rem;
    position: relative;
    color: #c2a870;
    font-weight: lighter;
    word-break: break-word;
    text-align: justify;
  }
  .alignLeft .an-con{
    float: left;
  }
  .alignLeft .an-con:after{
    content: '';
    position: absolute;
    z-index:1;
    width:0;
    height:0;
    border:5px solid #1d1613;
    left:0;top:50%;
    -webkit-transform:translate(-5px,-5px) rotate(45deg);
    -moz-transform:translate(-5px,-5px) rotate(45deg);
    -ms-transform:translate(-5px,-5px) rotate(45deg);
    -o-transform:translate(-5px,-5px) rotate(45deg);
    transform:translate(-5px,-5px) rotate(45deg);
  }
  .alignRight .an-con{
    float: right;
  }
  .alignRight .an-con:after{
    content: '';
    position: absolute;
    z-index:1;
    width:0;
    height:0;
    border:5px solid #1d1613;
    right:0;top:50%;
    -webkit-transform:translate(5px,-5px) rotate(45deg);
    -moz-transform:translate(5px,-5px) rotate(45deg);
    -ms-transform:translate(5px,-5px) rotate(45deg);
    -o-transform:translate(5px,-5px) rotate(45deg);
    transform:translate(5px,-5px) rotate(45deg);
  }
  .more{
    position: absolute;
    z-index: 1;
    left:0.833rem;
    right:0.833rem;
    bottom:0.833rem;
  }
  .more p{
    text-align: center;
    height: 1.667rem;
    line-height: 1.667rem;
    font-size: 0.778rem;
    color:#999;
  }
  .more button{
    height:100%;
    padding:0 0.278rem;
    cursor: pointer;
    color:#666;
  }
</style>
