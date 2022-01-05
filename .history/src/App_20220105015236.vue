<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>
<script>
import BaseLayout from "./components/layout/BaseLayout.vue";
import AuthService from "../../services/AuthService";

export default {
  components: { BaseLayout },
  name: "App",
  data: () => ({
    user: null,
  }),
  created: () async => {
    if(localStorage.getItem("token") !== null){
      this.$router.push('/')
    }
  },
};
</script>


