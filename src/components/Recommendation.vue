<template>
  <div class="content">
    <Loading style="height:8rem" v-if="loading"/>
    <div class="success" v-else-if="recommendations.length">
      <router-link class="rec"
          v-for="item in recommendations"
          :to="`/article/${item.Id}`"
          :title="item.title"
          :key="`rec/${item.Id}`" v-text="item.title">
      </router-link>
    </div>
    <div class="failed" v-else>
      出了点小问题，暂时无法获取推荐项，刷新试试？
    </div>
  </div>
</template>
<script>
  export default {
    name:"Recommendation",
    data(){
      return{
        recommendations:[],
        loading:true
      }
    },
    methods:{
      getRecommend(){
        this.$axios.get(`${this.$root.cors}/articles/articleList`)
            .then(resp=>{
              this.loading=false;
              let data=resp.data;
              if(Array.isArray(data)) this.recommendations=data;
              else this.showAlert('出了点小问题...如果能告诉我一下就太谢谢了~')
            }).catch(err => this.showAlert('天啦，出bug啦，赶紧点那边的联系方式让人来修~'))
      },
    },
    created(){ this.getRecommend() }
  }
</script>
<style scoped>
  .rec{
    display: block;
    width:100%;
    line-height: 1.333rem;
    font-size: 0.833rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:#666;
  }
  .rec:hover{
    color:#099;
  }
</style>
