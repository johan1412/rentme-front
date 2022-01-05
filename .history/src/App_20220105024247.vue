<template>
  <base-layout :user="user">
    <router-view />
  </base-layout>
</template>
<script>
import BaseLayout from "./components/layout/BaseLayout.vue";
import BaseLayout from "./components/layout/NavBar.vue";
import AuthService from "./services/AuthService";

export default {
  components: { BaseLayout,NavBar },
  name: "App",
  data() {
    return  {
    user: null,
  }
  },
  created() {
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


