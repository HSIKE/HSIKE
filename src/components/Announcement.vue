<template>
  <div class="content">
    <div class="announces">
      <router-link :to="`/announce/1`" style="color:#ff9463">
        关于网站浏览器兼容的说明
      </router-link>
      <Loading v-if="this.loading" style="height:100px"/>
      <router-link v-if="ans.length && an.Id!=1"
          v-for="an in ans" :key="`an${an.Id}`" v-text="an.title"
          :style="anStyle(an.type)" :to="`/announce/${an.Id}`">
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name:"Announcement",
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
        this.$axios.get(`${this.$root.cors}/latestAns`)
            .then(resp => {
              this.loading=false;
              if(Array.isArray(resp.data))
                resp.data.length
                ? this.ans=this.ansSort(resp.data)
                : this.showAlert('没有新动态...');
              else this.showAlert('抱歉，服务器被玩坏了...获取数据失败...')
            }).catch(err => this.showAlert(err));
      }
    },
    created(){ this.getAns() }
  }
</script>

<style scoped>
  .announces a{
    display: block;
    font-size: 0.833rem;
    width:100%;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 20px;
  }
  .announces a:hover{
    color:#099!important;
  }
</style>
