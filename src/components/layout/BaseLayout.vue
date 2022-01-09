<template>
  <div class="app">
    <NavBar/>
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
    if(this.$store.getters.user){
      AuthService.getUser(localStorage.getItem('userId'))
        .then((response) => {
          this.$store.dispatch('user',response.data)
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
};
</script>

<style>
.app {
  background-color: #f0f0f0;
  font-family: 'Roboto';
}
</style>