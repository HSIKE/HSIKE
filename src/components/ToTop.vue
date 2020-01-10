<template>
  <button @click="backToTop" class="back-to-top" ref="top">
    <i class="fa fa-angle-double-up"></i>
  </button>
</template>

<script>
export default {
  name: "ToTop",
  methods: {
    backToTop() {
      window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  },
  created() {
    window.addEventListener("scroll", () => {
      let top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.$refs.top.style.right = top > 500 ? "10px" : "";
    });
  }
};
</script>

<style scoped>
.back-to-top {
  width: 40px;
  height: 40px;
  font-size: 40px;
  position: fixed;
  bottom: 10px;
  right: -50px;
  cursor: pointer;
  color: white;
  background: #c6c6c6;
  z-index: 1;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}
.back-to-top:hover {
  background: #a5a5a5;
}
</style>
