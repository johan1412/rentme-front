<template>
  <base-layout>
    <div>
      <h1>Welcome !</h1>
      <router-link to="/login">LOGIN</router-link><br />
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from "../components/layouts/BaseLayout.vue";
export default {
  name: "Home",
};
</script>
