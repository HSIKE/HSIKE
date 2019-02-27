<template>
  <div class="content">
    <div class="announces">
      <router-link to="/announcement" style="color:#ff9463">
        <i class="fa fa-thumb-tack" style="margin-right: 5px"></i>关于本站对浏览器兼容的说明
      </router-link>
      <Loading v-if="this.loading" style="height: 6.667rem;"/>
      <router-link v-for="an in ans"
          v-if="ans.length"
          :key="`an${an.Id}`" v-html="isTop(an.type) + an.title"
          :style="anStyle(an.type)" to="/announcement">
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name:"Announce",
    data(){
      return{
        ans:[],
        loading:true
      }
    },
    computed:{
      anStyle(){
        return (type)=>{
          return {'color':(type==='置顶' ? '#ff9463' : '') }
        }
      },
      isTop(){ return (type)=> type==='置顶' ? '<i class="fa fa-thumb-tack" style="margin-right: 5px"></i>' : '' }
    },
    methods:{
      ansSort(arr){ // 重排序，置顶优先显示
        let temp=[];
        arr.forEach((an)=>{
          an.type==='置顶' ? temp.unshift(an) : temp.push(an);
        });
        return temp;
      },
      showAlert(msg){ this.$root.store.show.call(this.$root.store, msg) },
      getAns(){
        this.$axios.get(`${this.$root.cors}/latestAns?count=5`)
            .then(resp => {
              this.loading=false;
              if(Array.isArray(resp.data))this.ans=this.ansSort(resp.data);
              else this.showAlert('天啦，出bug啦，赶紧点那边的联系方式让人来修~')
            }).catch(err => this.showAlert('可能是服务器正在定期重启，等下刷新试试？'));
      }
    },
    created(){ this.getAns() }
  }
</script>

<style scoped>
  .announces a{
    display: block;
    font-size: 0.833rem;
    color:#666;
    width:100%;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.333rem;
  }
  .announces a:hover{
    color:#099!important;
  }
</style>
