<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>
<script>
import BaseLayout from "./components/layout/BaseLayout.vue";
import AuthService from "../services/AuthService";

export default {
  components: { BaseLayout },
  name: "App",
  data: () => ({
    user: null,
  }),
  created: () => {
    AuthService.login({ email: this.email, password: this.password })
        .then((response) => {
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("userRole",response.data.data.roles)
          this.$router.push(this.$route.query.redirect || '/')
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },
};
</script>


