<template>
  <div class="container">
    <h1 class="h3 mt-5">Mes annonces</h1>
    <hr>
    <Products-list :products="products" />
  </div>
</template>
<script>
import ProductsList from "../../layout/ProductsList.vue";
import authService from "@/services/AuthService";


export default {
  components: {
    ProductsList,
  },
  data() {
    return {
      products: [],
    }
  },
  name: "RenterProductsPage",
  methods: {

  },
  async created() {
    const user = await authService.getUser(this.$store.getters.user["@id"].split("/")[2])
    this.products = user.data.products
  }

};
</script>

