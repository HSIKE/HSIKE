<template>
  <div class="content">
    <Loading style="height:120px" v-if="loading"/>
    <div class="success" v-else-if="recommendations.length">
      <router-link class="rec"
          v-for="item in recommendations"
          :to="`/article/${item.Id}`"
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
              if(Array.isArray(data)){
                data.length
                ? this.recommendations=data
                : this.showAlert('Sorry，这个真没有...');
              }else this.showAlert('抱歉，服务器被玩坏了...获取推荐失败...')
            })
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
  }
  .rec:hover{
    color:#099;
  }
</style>
