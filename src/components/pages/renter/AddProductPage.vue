<template>
<div class="container">
    <div class='text-center' v-if="!hasStripeAccount">
      <h3 class="m-auto">Veuillez renseigner vos coordonnées bancaires en cliquant sur le lien au dessous</h3>
      <a :href="stripeRoot" class="btn"><u> Cliquer ici </u></a>
    </div>
  <div v-else>
    <h1 class="h3 mt-5">Creation d'une annonce</h1>
    <hr><br>
    <AddProductForm />
  </div>
</div>
</template>
<script>
import AddProductForm from '../../form/AddProductForm';
import {mapGetters} from "vuex";
import AuthService from "@/services/AuthService";

export default {
    components: { 
        AddProductForm
    },
  name: "AddProductPage",
  data: () => ({
    hasStripeAccount: false,
  }),
  computed: {
    ...mapGetters(["user"]),
    stripeRoot(){
      return process.env.VUE_APP_STRIPE
    }
  },
  mounted() {
    const renterPermission = this.$store.getters.renterPermission
    if(!renterPermission){
      this.$router.push('/')
    }
    AuthService.renterCheckStripeAccount(localStorage.getItem('token')).then(response => {
          this.hasStripeAccount = response.data
    }
    ).catch(e => console.log(e))
  },

};
</script>

<style>
@media screen and (max-width: 768px) {

    .container {
        width: 100%;
        max-width: 100% !important;
        padding: 0px 0px 40px 0px;
    }

    .container h1 {
      font-size: 20px;
      margin-top: 0px !important;
    }

    .frame-address-form-input {
      display: flex;
      flex-direction: column;
      align-items: flex-start  !important;
    }

    .frame-address-form-input span {
      margin-top: 5px;
    }

}

@media screen and (max-width: 576px) {

  .bloc-category label,
  .bloc-category select {
    font-size: 12px;
  }

  .bloc-category .form-error {
    font-size: 10px;
  }

  .submit-button-create-product {
    font-size: 12px !important;
  }

}
</style>
