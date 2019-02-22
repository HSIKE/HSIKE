<template>
  <div class="noResult">
    <div class="box">
      <p class="tips">
        Sorry, Note Required<br/>
        Was Not Found<br/>
        It Might Have Been Removed.<br/>
        Or Not Uploaded Yet.<br/>
        <br/>
        ← Try <span style="font-style: italic;color:#999">Contact Me</span> There ?<br/>
        Or
      </p>
      <button @click="$router.back()">back to the last page you visited</button><br/>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoResult'
  }
</script>

<style scoped>

</style>
