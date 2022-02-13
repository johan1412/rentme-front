<template>
  <div>
    <h1>Mes annonces</h1>
    <h2>Test</h2>
    <Products-list :products=this.$store.getters.user.products  />
  </div>
</template>
<script>
import ProductsList from "../../layout/ProductsList.vue";
export default {
  components: {
    ProductsList,
  },
  name: "RenterProductsPage",
};
</script>

