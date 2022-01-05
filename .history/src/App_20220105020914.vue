<template>
    <router-view :user="user" />
</template>
<script>
import AuthService from "./services/AuthService";
export default {

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


