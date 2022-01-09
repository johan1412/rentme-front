<template>
  <div>
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
  created: async function() {
    if(this.$store.getters.user){
      const response  = await AuthService.getUser(localStorage.getItem('userId'))
      this.$store.dispatch('user',response.data)
      console.log(response.data);
    }
  },
};
</script>