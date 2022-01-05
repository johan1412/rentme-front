<template>
  <div>
    <NavBar :user="user" />
    <slot></slot>
    <Footer />
  </div>
</template>
<script>
import NavBar from "../layout/NavBar.vue";
import Footer from "../layout/Footer.vue";
import AuthService from "../../services/AuthService";
export default {
  name: "BaseLayout",
  components: {
    NavBar,
    Footer
  },
  created() {
    AuthService.getUser(localStorage.getItem('userId'))
        .then((response) => {
          this.$store.dispatch('user',response)
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },
};
</script>