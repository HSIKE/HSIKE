<template>
  <div class="noResult">
    <div class="box">
      <p class="tips">
        Oops, 404 Not Found<br />
        Required Resource<br />
        Does Not Exists<br />
        It Might Have Been Removed.<br />
        Or Not Uploaded Yet.<br />
        <br />
        ← Try
        <span style="font-style: italic;color:#999">Contact Me</span> There
        <br />
        Or
      </p>
      <button @click="$router.back()" title="返回之前的页面">
        back to the last page you visited</button
      ><br />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoResult"
};
</script>

<style scoped>
.noResult {
  text-align: center;
  color: #666;
  height: 100%;
}
.box {
  position: relative;
  top: 50%;
  padding: 1.667rem 0;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}
.tips {
  line-height: 1.667rem;
}
button {
  font-size: 1rem;
  margin-top: 0.556rem;
  color: #099;
  cursor: pointer;
}
button:hover {
  color: darkorange;
}
</style>
