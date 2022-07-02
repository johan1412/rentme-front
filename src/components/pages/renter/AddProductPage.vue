<template>
<div class="container">
    <h1 class="h3 mt-5">Creation d'une annonce</h1>
    <hr><br>
    <AddProductForm />
</div>
</template>
<script>
import AddProductForm from '../../form/AddProductForm';

export default {
    components: { 
        AddProductForm
    },
  name: "AddProductPage",
  mounted() {
    const renterPermission = this.$store.getters.renterPermission
    if(!renterPermission){
      this.$router.push('/')
    }
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
