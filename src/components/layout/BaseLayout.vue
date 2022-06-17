<template>
  <div class="app">
    <NavBar/>
    <MainMenu v-if="mainMenu" />
    <CommonMenu v-else />
    <slot></slot>
    <Footer />
  </div>
</template>

<script>
import NavBar from "../layout/NavBar.vue";
import Footer from "../layout/Footer.vue";
import MainMenu from "../layout/MainMenu.vue";
import CommonMenu from "../layout/CommonMenu.vue";
import AuthService from "../../services/AuthService";

export default {
  name: "BaseLayout",
  data: () => ({
    mainMenu: false,
  }),
  components: {
    NavBar,
    Footer,
    MainMenu,
    CommonMenu,
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
    this.$route.fullPath == "/" ? this.mainMenu = true : this.mainMenu = false;
    if(localStorage.getItem("successMessage")) {
      this.messageNotification = localStorage.getItem("successMessage");
    }
  },
  watch: {
    '$route.query': {
      immediate: false,
      handler() {
        window.scrollTo(0, 0);
        this.$route.fullPath == "/" ? this.mainMenu = true : this.mainMenu = false;
        if(this.$route.fullPath != "/login") {
          if(localStorage.getItem("successMessage")) {
            this.$bvToast.toast(localStorage.getItem('successMessage'), {
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-top-full',
              noAutoHide: true,
            });
            localStorage.removeItem("successMessage");
          }
          if(localStorage.getItem("errorMessage")) {
            this.$bvToast.toast(localStorage.getItem('errorMessage'), {
              variant: 'danger',
              solid: true,
              toaster: 'b-toaster-top-full',
              noAutoHide: true,
            });
            localStorage.removeItem("errorMessage");
          }
        } else {
          if(localStorage.getItem("successMessage")) {
            this.$bvToast.toast(localStorage.getItem('successMessage'), {
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-top-full',
              noAutoHide: true,
            });
            localStorage.removeItem("successMessage");
          }
          if(localStorage.getItem("errorMessage")) {
            this.$bvToast.toast(localStorage.getItem('errorMessage'), {
              variant: 'danger',
              solid: true,
              toaster: 'b-toaster-top-full',
              noAutoHide: true,
            });
            localStorage.removeItem("errorMessage");
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

.alert-message {
  width: fit-content;
  min-width: 150px;
  margin: auto;
}

#b-toaster-top-full .b-toaster-slot .b-toast,
#b-toaster-top-full .b-toaster-slot .b-toast .toast {
  height: 200px;
  font-size: 18px;
}
</style>