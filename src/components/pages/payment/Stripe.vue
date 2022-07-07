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
        .then((response) => {
          if(response.data['message'] == 'creation stripe external account is successfully completed') {
            this.$root.$bvToast.toast('Votre inscriptio a été effectué avec succès', {
              title: 'Merci !',
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-top-full',
              autoHideDelay: 5000
            })
          }
        })
        .catch((e) => {
          if(e.response.data['message'] == 'Access denied') {
            this.$router.push('/error-403')
          }
          if(e.response.data['hydra:description'] == 'Not Found') {
            this.$router.push('/error-404')
          }
        })

  }
};

</script>
