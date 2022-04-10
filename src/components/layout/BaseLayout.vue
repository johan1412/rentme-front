<template>
  <div class="app">
    <NavBar/>
    <div class="alert alert-success text-center mt-5 p-3" v-if="messageNotification">
      {{ messageNotification }}
    </div>
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
  data: () => ({
    messageNotification: null,
  }),
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
    if(localStorage.getItem("successMessage")) {
      this.messageNotification = localStorage.getItem("successMessage");
    }
  },
  watch: {
    '$route.query': {
      immediate: false,
      handler() {
        window.scrollTo(0, 0);
        if(this.$route.fullPath != "/login") {
          if(localStorage.getItem("successMessage")) {
            this.messageNotification = null;
            localStorage.removeItem("successMessage");
          }
        } else {
          if(localStorage.getItem("successMessage")) {
            this.messageNotification = localStorage.getItem("successMessage");
          }
        }
      }
    }
  }
};
</script>

<style>
.app {
  background-color: #f0f0f0;
  font-family: 'Roboto';
}
</style>