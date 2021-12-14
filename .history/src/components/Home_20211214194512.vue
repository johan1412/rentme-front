<template>
<div>
        <nav-bar />
<div class="containert m-auto">
  <h1 class="text-center">Je suis dans la page home</h1>
</div>
</div>
</template>
<script>
import NavBar from './layouts/NavBar.vue';
export default {
  name: "Home",
  components:{
    NavBar
  }
};
</script>
