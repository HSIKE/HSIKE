<template>
  <div class="error">
    <p style="text-align: center;color:black;font-size: 30px">
      {{ $route.params.errMsg }}
    </p>
  </div>
</template>

<script>
  export default {
    name:"Error"
  }
</script>

<style scoped>

</style>
