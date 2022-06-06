<template>
  <div class="container">
    <h1 class="h3 mt-5">Mes annonces</h1>
    <hr>
    <Products-list />
  </div>
</template>
<script>
import ProductsList from "../../layout/ProductsList.vue";


export default {
  components: {
    ProductsList,
  },
  name: "RenterProductsPage"

};
</script>

