<template>
  <div class="text-center mt-5 text-success">
  </div>
</template>

<script>

import AuthService from "@/services/AuthService";
import {mapGetters} from "vuex";
export default {
  name: "Stripe",
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    const renterPermission = this.$store.getters.renterPermission
    if(!renterPermission || !this.$route.query.code){
      this.$router.push('/')
    }
    AuthService.createExternalStripeAccount(this.$route.query.code,this.user.id,localStorage.getItem('token'))
        .then((response) => console.log(response))
        .catch((e) => console.log(e))

  }
};

</script>
