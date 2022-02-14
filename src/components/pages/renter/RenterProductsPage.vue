<template>
  <div class="container">
    <h1 class="title mt-5">Mes annonces</h1>
    <hr>
    <Products-list :productsProps="productsProps"  />
  </div>
</template>
<script>
import ProductsList from "../../layout/ProductsList.vue";
export default {
  components: {
    ProductsList,
  },
  name: "RenterProductsPage",
  data() {
    return {
      productsProps: [],
    }
  },
  mounted() {
    if (this.$store.getters.user && this.$store.getters.user.products) {
      this.productsProps = this.$store.getters.user.products;
    }
  }
};
</script>

