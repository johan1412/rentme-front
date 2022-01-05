<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>
<script>
import BaseLayout from "./components/layout/BaseLayout.vue";
import AuthService from "./services/AuthService";

export default {
  components: { BaseLayout },
  name: "App",
  data: () => ({
    user: null,
  }),
  created: () => {
    AuthService.getUser(localStorage.getItem('userId'))
        .then((response) => {
          this.user = response.data
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },
};
</script>


